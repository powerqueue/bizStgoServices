
$(document).ready(function() {


"use strict";

var $document = $(document),
	$window = $(window),
	plugins = {
		contactForm: $('#contactform'),
		contactFormBox: $('#contactformBox'),
		requestForm: $('#requestform'),
		requestFormPopup: $('#requestformPopup'),
		orderFormPopup: $('.orderForm'),
	}

	// Contact page form
	var $contactform = plugins.contactForm;
	$contactform.validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			message: {
				required: true,
				minlength: 20
			},
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			name: {
				required: "Please enter your name",
				minlength: "Your name must consist of at least 2 characters"
			},
			message: {
				required: "Please enter message",
				minlength: "Your message must consist of at least 20 characters"
			},
			email: {
				required: "Please enter your email"
			}
		},
		submitHandler: function (form) {
			$(form).ajaxSubmit({
				type: "POST",
				data: $(form).serialize(),
				url: "process-contact.php",
				success: function () {
					$('#success').fadeIn();
					$('#contactform').reset();
				},
				error: function () {
					$('#error').fadeIn();
				}
			});
		}
	});

// Contact page form
	var $contactFormBox = plugins.contactFormBox;
	$contactFormBox.validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			message: {
				required: true,
				minlength: 20
			},
			email: {
				required: true,
				email: true
			}

		},
		messages: {
			name: {
				required: "Please enter your name",
				minlength: "Your name must consist of at least 2 characters"
			},
			message: {
				required: "Please enter message",
				minlength: "Your message must consist of at least 20 characters"
			},
			email: {
				required: "Please enter your email"
			}
		},
		submitHandler: function (form) {
			$(form).ajaxSubmit({
				type: "POST",
				data: $(form).serialize(),
				url: "process-contact-box.php",
				success: function () {
					$('#successBox').fadeIn();
					$('#contactformBox').reset();
				},
				error: function () {
					$('#errorBox').fadeIn();
				}
			});
		}
	});

// Request page form
	var $requestForm = plugins.requestForm;
	$requestForm.validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			}

		},
		messages: {
			name: {
				required: "Please enter your name",
				minlength: "Your name must consist of at least 2 characters"
			},
			email: {
				required: "Please enter your email"
			}
		},
		submitHandler: function (form) {
			$(form).ajaxSubmit({
				type: "POST",
				data: $(form).serialize(),
				url: "process-request.php",
				success: function () {
					$('#requestSuccess').fadeIn();
					$('#requestform').reset();
				},
				error: function () {
					$('#requestError').fadeIn();
				}
			});
		}
	});
// Request page form
	var $requestFormPopup = plugins.requestFormPopup;
	$requestFormPopup.validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			}

		},
		messages: {
			name: {
				required: "Please enter your name",
				minlength: "Your name must consist of at least 2 characters"
			},
			email: {
				required: "Please enter your email"
			}
		},
		submitHandler: function (form) {
			$(form).ajaxSubmit({
				type: "POST",
				data: $(form).serialize(),
				url: "process-request-popup.php",
				success: function () {
					$('#requestSuccessPopup').fadeIn();
					$('#requestform').each(function () {
						this.reset();
					});
				},
				error: function () {
					$('#requestErrorPopup').fadeIn();
					$('#requestformPopup').each(function () {
						this.reset();
					});
				}
			});
		}
	});
// Request page form
	var $orderFormPopup = plugins.orderFormPopup;
	$orderFormPopup.each(function () {
		var $form = $(this);
		$form.validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Please enter your name",
					minlength: "Your name must consist of at least 2 characters"
				},
				email: {
					required: "Please enter your email"
				}
			},
			submitHandler: function (form) {
				$(form).ajaxSubmit({
					type: "POST",
					data: $(form).serialize(),
					url: "process-order-popup.php",
					success: function () {
						$('.successform', $form).fadeIn();
						$form[0].reset();
					},
					error: function () {
						$('.errorform', $form).fadeIn();
						$form[0].reset();
					}
				});
			}
		});
	})
	


});    



// ======================== PRELOADER ========================


$(document).ready(function() {
    window.onload = function () {
    $(".preloader").fadeOut(500, function(){ $(".preloader").remove(); } );
    }
});