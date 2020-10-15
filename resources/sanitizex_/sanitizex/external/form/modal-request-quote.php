<?php

	// youremail here
	$to = "youremail@gmail.com";
	$from = 'email';

	$name = 'name';
	$headers = "From: $from";
	$subject = "You have a message.";

	$fields = array();

	$fields{"name"} = "Your name";
	$fields{"email"} = "E-mail";
	$fields{"phone"} = "Phone";
	$fields{"modalAddress"} = "Address";
	$fields{"typeofholiday"} = "Services";
	$fields{"date"} = "Date of visit";
	$fields{"message"} = "Message";
	$body = "Here is what was sent Sanitizex, form Modal 'Request a Quote':\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s:%s\n",$b,$_REQUEST[$a]); }

	$send = mail($to, $subject, $body, $headers, $message);

?>
