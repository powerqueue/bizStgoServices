<?php

	// youremail here
	$to = "dogotar777@gmail.com";
	$from = 'email';

	$name = 'name';
	$headers = "From: $from";
	$subject = "You have a message.";

	$fields = array();

	$fields{"name"} = "Name";
	$fields{"email"} = "Email address";
	$fields{"phone"} = "Phone number";
	$fields{"typeofholiday"} = "Services";
	$fields{"date"} = "Date of visit";
	$fields{"message"} = "Message";
	$body = "Here is what was sent Electron, form Modal 'Make an Appointment':\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s:%s\n",$b,$_REQUEST[$a]); }

	$send = mail($to, $subject, $body, $headers, $message);

?>
