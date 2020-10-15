<?php

	$to = "";  // Your email here
	$from = $_REQUEST['email'];
	$name = $_REQUEST['name'];
	$message = $_REQUEST['message'];
	$headers = "Contact Form: $from";
	$subject = "Contact Form from Electricity Website";

	$fields = array();
	$fields{"name"} = "Name";
	$fields{"email"} = "Email";
	$fields{"message"} = "Message";

	$body = "Here is what was sent:\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); }

	$send = mail($to, $subject, $body, $headers);

?>
