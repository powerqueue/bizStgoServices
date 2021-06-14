$(function () {
    // Get the form.
    // alert("in script tag");

    var form = $('#ajax-contact');
    var question = $('#contactform');
    var appointment = $('#appointmentform');
    var appointment2 = $('#appointmentform2');
    var newsletter = $('#newsletter_form');

    // Get the messages div.
    var formMessages = $('#form-messages');
    var questionResult = $('#question-result');
    var appointmentResult = $('#appointment-result');
    var appointmentResult2 = $('#appointment2-result');
    var newsletterResult = $('#newsletter-result');

    // Set up an event listener for the contact form.
    $(form).submit(function (event) {
        // Stop the browser from submitting the form.
        event.preventDefault();
        // alert("in form.submit");

        // TODO
        // Serialize the form data.
        var formData = $(form).serialize();

        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            // data: formData
            data: JSON.stringify(jQFormSerializeArrToJson(JSON.parse(JSON.stringify(jQuery('#ajax-contact').serializeArray()))))
        }).done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#form_name').val('');
            $('#form_phone').val('');
            $('#form_email').val('');
            $('#form_message').val('');

            $(formMessages).text("We'll be in touch soon!");
        }).fail(function (data) {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });

    $(question).submit(function (event) {
        // Stop the browser from submitting the form.
        event.preventDefault();
        // alert("in form.submit");

        // TODO
        // Serialize the form data.
        var formData = $(question).serialize();

        $.ajax({
            type: 'POST',
            url: $(question).attr('action'),
            // data: formData
            data: JSON.stringify(jQFormSerializeArrToJson(JSON.parse(JSON.stringify(jQuery('#contactform').serializeArray()))))
        }).done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            $(questionResult).removeClass('error');
            $(questionResult).addClass('success');

            // Set the message text.
            $(questionResult).text(response);

            // Clear the form.
            $('#form_name').val('');
            $('#form_phone').val('');
            $('#form_email').val('');
            $('#form_message').val('');

            $(questionResult).text("Thank you for your question. We'll be in touch soon!");
        }).fail(function (data) {
            // Make sure that the formMessages div has the 'error' class.
            $(questionResult).removeClass('success');
            $(questionResult).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(questionResult).text(data.responseText);
            } else {
                $(questionResult).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });

    $(appointment).submit(function (event) {
        // Stop the browser from submitting the form.
        event.preventDefault();
        // alert("in form.submit");

        // TODO
        // Serialize the form data.
        var formData = $(appointment).serialize();

        $.ajax({
            type: 'POST',
            url: $(appointment).attr('action'),
            // data: formData
            data: JSON.stringify(jQFormSerializeArrToJson(JSON.parse(JSON.stringify(jQuery('#appointmentform').serializeArray()))))
        }).done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            $(appointmentResult).removeClass('error');
            $(appointmentResult).addClass('success');

            // Set the message text.
            $(appointmentResult).text(response);

            // Clear the form.
            $('#form_name').val('');
            $('#form_phone').val('');
            $('#form_email').val('');
            $('#form_message').val('');
            $('#form_address').val('');
            $('#form_rq_service').val('');
            $('#form_rq_date').val('');
            $('#form_time_svs').val('');

            $(appointmentResult).text("Thank you for your service request. We'll be in touch soon!");
        }).fail(function (data) {
            // Make sure that the formMessages div has the 'error' class.
            $(appointmentResult).removeClass('success');
            $(appointmentResult).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(appointmentResult).text(data.responseText);
            } else {
                $(appointmentResult).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });

    $(appointment2).submit(function (event) {
        // Stop the browser from submitting the form.
        event.preventDefault();
        // alert("in form.submit");

        // TODO
        // Serialize the form data.
        var formData = $(appointment2).serialize();

        $.ajax({
            type: 'POST',
            url: $(appointment).attr('action'),
            // data: formData
            data: JSON.stringify(jQFormSerializeArrToJson(JSON.parse(JSON.stringify(jQuery('#appointmentform2').serializeArray()))))
        }).done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            $(appointmentResult2).removeClass('error');
            $(appointmentResult2).addClass('success');

            // Set the message text.
            $(appointmentResult2).text(response);

            // Clear the form.
            $('#form_name').val('');
            $('#form_phone').val('');
            $('#form_email').val('');
            $('#form_message').val('');
            $('#form_address').val('');
            $('#form_rq_service').val('');
            $('#form_date').val('');
            $('#form_time_svs').val('');

            $(appointmentResult2).text("Thank you for your service request. We'll be in touch soon!");
        }).fail(function (data) {
            // Make sure that the formMessages div has the 'error' class.
            $(appointmentResult2).removeClass('success');
            $(appointmentResult2).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(appointmentResult2).text(data.responseText);
            } else {
                $(appointmentResult2).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });

    $(newsletter).submit(function (event) {
        // Stop the browser from submitting the form.
        event.preventDefault();
        // alert("in form.submit");

        // TODO
        // Serialize the form data.
        var formData = $(newsletter).serialize();

        $.ajax({
            type: 'POST',
            url: $(newsletter).attr('action'),
            // data: formData
            data: JSON.stringify(jQFormSerializeArrToJson(JSON.parse(JSON.stringify(jQuery('#newsletter_form').serializeArray()))))
        }).done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            $(newsletterResult).removeClass('error');
            $(newsletterResult).addClass('success');

            // Set the message text.
            $(newsletterResult).text(response);

            // Clear the form.
            $('#form_email').val('');

            $(newsletterResult).text("Thank you for subscribing!");
        }).fail(function (data) {
            // Make sure that the formMessages div has the 'error' class.
            $(newsletterResult).removeClass('success');
            $(newsletterResult).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(newsletterResult).text(data.responseText);
            } else {
                $(newsletterResult).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });

    function jQFormSerializeArrToJson(formSerializeArr){
        var jsonObj = {};
        jQuery.map( formSerializeArr, function( n, i ) {
            jsonObj[n.name] = n.value;
        });
       
        return jsonObj;
       }
});