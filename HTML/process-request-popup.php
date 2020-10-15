<?php

	$to = "";  // Your email here
	$from = $_REQUEST['email'];
	$name = $_REQUEST['name'];
	$phone = $_REQUEST['phone'];
	$city = $_REQUEST['city'];
	$address = $_REQUEST['address'];
	$date = $_REQUEST['date'];
	$time = $_REQUEST['time'];
	$message = $_REQUEST['message'];
	$headers = "Request: $from";
	$subject = "Request Form from Electricity Website";

	$fields = array();
	$fields{"name"} = "Name";
	$fields{"email"} = "Email";
	$fields{"phone"} = "Phone";
	$fields{"city"} = "City";
	$fields{"address"} = "Address";
	$fields{"date"} = "Date";
	$fields{"time"} = "Time";
	$fields{"message"} = "Message";

	$body = "Here is what was sent:\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); }

	$send = mail($to, $subject, $body, $headers);

?>
