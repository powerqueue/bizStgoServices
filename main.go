package main

import (
	"bytes"
	"context"
	"crypto/aes"
	"crypto/cipher"
	"crypto/md5"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"io/ioutil"
	"mime/quotedprintable"
	"net/http"
	"net/smtp"
	"os"
	"os/signal"
	"strings"
	"sync"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"

	_ "github.com/jinzhu/gorm/dialects/mssql"
)

//Post struct
type Post struct {
	// gorm.Model
	ID          int    `json:"ID,omitempty"`
	Title       string `json:"Title,omitempty"`
	Description string `json:"Description,omitempty"`
	HTMLContent []byte `json:"HTMLContent,omitempty"`
}

// Templates
var indexHTML string
var indexTpl *template.Template
var servicesHTML string
var servicesTPL *template.Template
var aboutHTML string
var aboutTPL *template.Template
var galleryHTML string
var galleryTPL *template.Template
var contactHTML string
var contactTPL *template.Template

func init() {

	data, err := ioutil.ReadFile("HTML/index.html")
	if err != nil {
		fmt.Println("File reading error: index", err)
		return
	}
	indexHTML = string(data)
	indexTpl = template.Must(template.New("index").Parse(indexHTML))

	data, err = ioutil.ReadFile("HTML/services_page.html")
	if err != nil {
		fmt.Println("File reading error: services", err)
		return
	}
	servicesHTML = string(data)
	servicesTPL = template.Must(template.New("services").Parse(servicesHTML))

	data, err = ioutil.ReadFile("HTML/about_page.html")
	if err != nil {
		fmt.Println("File reading error: about", err)
		return
	}
	aboutHTML = string(data)
	aboutTPL = template.Must(template.New("about").Parse(aboutHTML))

	data, err = ioutil.ReadFile("HTML/gallery_page.html")
	if err != nil {
		fmt.Println("File reading error: gallery", err)
		return
	}
	galleryHTML = string(data)
	galleryTPL = template.Must(template.New("gallery").Parse(galleryHTML))

	data, err = ioutil.ReadFile("HTML/contact_page.html")
	if err != nil {
		fmt.Println("File reading error: contact", err)
		return
	}
	contactHTML = string(data)
	contactTPL = template.Must(template.New("contact").Parse(contactHTML))
}

func main() {

	serverCfg := Config{
		Host:         ":8083",
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}

	htmlServer := Start(serverCfg)
	defer htmlServer.Stop()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt)
	<-sigChan

	fmt.Println("main : shutting down")
}

// Config provides basic configuration
type Config struct {
	Host         string
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
}

// HTMLServer represents the web service that serves up HTML
type HTMLServer struct {
	server *http.Server
	wg     sync.WaitGroup
}

// Start launches the HTML Server
func Start(cfg Config) *HTMLServer {

	// Setup Context
	_, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Setup Handlers
	router := mux.NewRouter()

	router.HandleFunc("/", indexHandler)
	router.HandleFunc("/index", indexHandler)
	router.HandleFunc("/services", servicesHandler)
	router.HandleFunc("/about", aboutHandler)
	router.HandleFunc("/gallery", galleryHandler)
	router.HandleFunc("/contact", contactHandler)

	router.PathPrefix("/HTML/assets/").Handler(http.StripPrefix("/HTML/assets/", http.FileServer(http.Dir("./HTML/assets"))))

	router.HandleFunc("/sendEmail", contactSubmitHandler).Methods("POST")

	// Create the HTML Server
	htmlServer := HTMLServer{
		server: &http.Server{
			Addr:           cfg.Host,
			Handler:        router,
			ReadTimeout:    cfg.ReadTimeout,
			WriteTimeout:   cfg.WriteTimeout,
			MaxHeaderBytes: 1 << 20,
		},
	}

	// Add to the WaitGroup for the listener goroutine
	htmlServer.wg.Add(1)

	// Start the listener
	go func() {
		fmt.Printf("\nHTMLServer : Service started : Host=%v\n", cfg.Host)
		htmlServer.server.ListenAndServe()
		htmlServer.wg.Done()
	}()

	return &htmlServer
}

//Exception struct for jwt auth
type Exception struct {
	Message string `json:"message"`
}

//isAuthorized function
func isAuthorized(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		if req.Header["Token"] != nil {
			token, err := jwt.Parse(req.Header["Token"][0], func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("There was an error")
				}
				return mySigningKey, nil
			})

			if err != nil {
				json.NewEncoder(w).Encode(Exception{Message: err.Error()})
				return
			}
			if token.Valid {
				// context.Set(req, "decoded", token.Claims)
				next(w, req)
			} else {
				json.NewEncoder(w).Encode(Exception{Message: "Invalid authorization token"})
			}

		} else {
			fmt.Fprintf(w, "Not Authorized")
		}
	})
}

var mySigningKey = []byte("mysupersecretphrase")

// Stop turns off the HTML Server
func (htmlServer *HTMLServer) Stop() error {
	// Create a context to attempt a graceful 5 second shutdown.
	const timeout = 5 * time.Second
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	fmt.Printf("\nHTMLServer : Service stopping\n")

	// Attempt the graceful shutdown by closing the listener
	// and completing all inflight requests
	if err := htmlServer.server.Shutdown(ctx); err != nil {
		// Looks like we timed out on the graceful shutdown. Force close.
		if err := htmlServer.server.Close(); err != nil {
			fmt.Printf("\nHTMLServer : Service stopping : Error=%v\n", err)
			return err
		}
	}

	// Wait for the listener to report that it is closed.
	htmlServer.wg.Wait()
	fmt.Printf("\nHTMLServer : Stopped\n")
	return nil
}

// Push the given resource to the client.
func push(w http.ResponseWriter, resource string) {
	pusher, ok := w.(http.Pusher)
	if ok {
		if err := pusher.Push(resource, nil); err == nil {
			return
		}
	}
}

// indexHandler renders the dashboard template
func indexHandler(w http.ResponseWriter, r *http.Request) {
	push(w, "../HTML/assets/css/custom.css")
	push(w, "../HTML/assets/css/custom-rtl.css")
	push(w, "../HTML/assets/css/style.css")
	push(w, "../HTML/assets/css/style-rtl.css")
	// push(w, "../now-ui/assets/css/now-ui-dashboard.css?v=1.0.1")
	w.Header().Set("Content-Type", "text/html; charset=utf-8")

	fullData := map[string]interface{}{
		"NavigationBar": template.HTML(indexHTML),
	}
	render(w, r, indexTpl, "index", fullData)
}

// servicesHandler renders the dashboard template
func servicesHandler(w http.ResponseWriter, r *http.Request) {
	push(w, "../HTML/assets/css/custom.css")
	push(w, "../HTML/assets/css/custom-rtl.css")
	push(w, "../HTML/assets/css/style.css")
	push(w, "../HTML/assets/css/style-rtl.css")
	// push(w, "../now-ui/assets/css/now-ui-dashboard.css?v=1.0.1")
	w.Header().Set("Content-Type", "text/html; charset=utf-8")

	fullData := map[string]interface{}{
		"NavigationBar": template.HTML(servicesHTML),
	}
	render(w, r, servicesTPL, "services", fullData)
}

// aboutHandler renders the dashboard template
func aboutHandler(w http.ResponseWriter, r *http.Request) {
	push(w, "../HTML/assets/css/custom.css")
	push(w, "../HTML/assets/css/custom-rtl.css")
	push(w, "../HTML/assets/css/style.css")
	push(w, "../HTML/assets/css/style-rtl.css")
	// push(w, "../now-ui/assets/css/now-ui-dashboard.css?v=1.0.1")
	w.Header().Set("Content-Type", "text/html; charset=utf-8")

	fullData := map[string]interface{}{
		"NavigationBar": template.HTML(aboutHTML),
	}
	render(w, r, aboutTPL, "about", fullData)
}

// galleryHandler renders the dashboard template
func galleryHandler(w http.ResponseWriter, r *http.Request) {
	push(w, "../HTML/assets/css/custom.css")
	push(w, "../HTML/assets/css/custom-rtl.css")
	push(w, "../HTML/assets/css/style.css")
	push(w, "../HTML/assets/css/style-rtl.css")
	// push(w, "../now-ui/assets/css/now-ui-dashboard.css?v=1.0.1")
	w.Header().Set("Content-Type", "text/html; charset=utf-8")

	fullData := map[string]interface{}{
		"NavigationBar": template.HTML(galleryHTML),
	}
	render(w, r, galleryTPL, "gallery", fullData)
}

// contactHandler renders the dashboard template
func contactHandler(w http.ResponseWriter, r *http.Request) {
	push(w, "../HTML/assets/css/custom.css")
	push(w, "../HTML/assets/css/custom-rtl.css")
	push(w, "../HTML/assets/css/style.css")
	push(w, "../HTML/assets/css/style-rtl.css")
	// push(w, "../now-ui/assets/css/now-ui-dashboard.css?v=1.0.1")
	w.Header().Set("Content-Type", "text/html; charset=utf-8")

	fullData := map[string]interface{}{
		"NavigationBar": template.HTML(contactHTML),
	}
	render(w, r, contactTPL, "contact", fullData)
}

// Render a template, or server error.
func render(w http.ResponseWriter, r *http.Request, tpl *template.Template, name string, data interface{}) {
	buf := new(bytes.Buffer)
	if err := tpl.ExecuteTemplate(buf, name, data); err != nil {
		fmt.Printf("\nRender Error: %v\n", err)
		return
	}
	w.Write(buf.Bytes())
}

func createHash(key string) string {

	hasher := md5.New()

	hasher.Write([]byte(key))

	return hex.EncodeToString(hasher.Sum(nil))

}

func encrypt(data []byte, passphrase string) []byte {
	block, _ := aes.NewCipher([]byte(createHash(passphrase)))
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		panic(err.Error())
	}
	// nonce := make([]byte, gcm.NonceSize())
	nonce := make([]byte, 12)
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		panic(err.Error())
	}

	ciphertext := gcm.Seal(nonce, nonce, data, nil)
	return ciphertext
}

func decrypt(data []byte, passphrase string) []byte {
	key := []byte(createHash(passphrase))
	block, err := aes.NewCipher(key)
	if err != nil {
		panic(err.Error())
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		panic(err.Error())
	}
	// nonceSize := gcm.NonceSize()
	nonceSize := 12
	nonce, ciphertext := data[:nonceSize], data[nonceSize:]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		panic(err.Error())
	}
	return plaintext
}

// smtpServer data to smtp server
type smtpServer struct {
	host string
	port string
}

// Address URI to smtp server
func (s *smtpServer) Address() string {
	return s.host + ":" + s.port
}

//ContactMessage struct for jwt auth
type ContactMessage struct {
	Name     string `json:"name"`
	Phone    string `json:"phone"`
	Email    string `json:"email"`
	Interest string `json:"interest"`
	Message  string `json:"message"`
}

//contactSubmitHandler - handler for contact form email submission
func contactSubmitHandler(w http.ResponseWriter, r *http.Request) {

	enableCors(&w)

	buf := new(bytes.Buffer)
	buf.ReadFrom(r.Body)
	newStr := buf.String()
	fmt.Println(newStr)

	r.ParseForm()

	var msg ContactMessage
	byt := []byte(strings.TrimSpace(newStr))
	err2 := json.Unmarshal(byt, &msg)
	if err2 != nil {
		http.Error(w, err2.Error(), 500)
		return
	}

	// Sender data.
	from := "operations@powerqueue.io"
	// password := "dszsbluxtxsvmlpi"
	password := "vzneckonvorqwdlv"

	smtpServer := smtpServer{host: "smtp.gmail.com", port: "587"}
	// Message.
	message := "<h2>Name: </h2>" + msg.Name + "<br/><h2>Phone: </h2>" + msg.Phone + "<br/><h2>Interest: </h2>" + msg.Interest + "<br/><h2>Message: </h2>" + msg.Message
	// Authentication.
	auth := smtp.PlainAuth("", from, password, smtpServer.host)

	header := make(map[string]string)
	toEmail := "nestor.david@powerqueue.io"
	header["From"] = from
	header["To"] = toEmail
	header["Subject"] = "Newsletter Request"

	header["MIME-Version"] = "1.0"
	header["Content-Type"] = fmt.Sprintf("%s; charset=\"utf-8\"", "text/html")
	header["Content-Disposition"] = "inline"
	header["Content-Transfer-Encoding"] = "quoted-printable"

	headerMessage := ""
	for key, value := range header {
		headerMessage += fmt.Sprintf("%s: %s\r\n", key, value)
	}

	// body := "<h1>" + message + "</h1>"
	body := message
	var bodyMessage bytes.Buffer
	temp := quotedprintable.NewWriter(&bodyMessage)
	temp.Write([]byte(body))
	temp.Close()

	finalMessage := headerMessage + "\r\n" + bodyMessage.String()

	// Sending email.
	err := smtp.SendMail(smtpServer.Address(), auth, from, []string{toEmail}, []byte(finalMessage))
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Email Sent!")

	return
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
