jQuery(function($) {
	//contact.html
	var formContactForm = $('#contact-form');
	if (formContactForm.length){
		formContactForm.validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				email: {
					required: true,
					email: true
				},
				message: {
					required: true,
				}
			},
			messages: {
				name: {
					required: "Please enter your name",
					minlength: "Your name must consist of at least 2 characters"
				},
				email: {
					required: "Please enter your email"
				},
				message: {
					required: "Please enter your message"
				}
			},
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					type:"POST",
					data: $(form).serialize(),
					url:"external/form/contact-form.php",
					success: function() {
						$('#success').fadeIn();
						formContactForm.each(function(){
							this.reset();
						});
					},
					error: function() {
						formContactForm.fadeTo( "slow", 1, function() {
							$('#error').fadeIn();
						});
					}
				});
			}
		});
	};
	//newsletterform (footer)
	var subscribeform = $('#subscribeform');
	if (subscribeform.length){
		subscribeform.validate({
			rules: {
				email: {
					required: true,
					email: true
				}
			},
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					type:"POST",
					data: $(form).serialize(),
					url:"external/form/newsletter-form.php",
					success: function() {
						  $('#success').fadeIn();
				subscribeform.each(function(){this.reset();});
					},
					error: function() {
						subscribeform.fadeTo( "slow", 1, function() {
							$('#error').fadeIn();
						});
					}
				});
			}
		});
	};
	//jsFormRequestQuote
	var formModal = $('#jsFormRequestQuote');
	if (formModal.length){
		formModal.validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				email: {
					required: true,
					email: true
				},
				message: {
					required: true,
				}
			},
			messages: {
				name: {
					required: "Please enter your name",
					minlength: "Your name must consist of at least 2 characters"
				},
				email: {
					required: "Please enter your email"
				},
				message: {
					required: "Please enter your message"
				}
			},
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					type:"POST",
					data: $(form).serialize(),
					url:"external/form/modal-request-quote.php",
					success: function(){
						$('#success').fadeIn();
						formModal.each(function(){this.reset();});
					},
					error: function() {
						formModal.fadeTo( "slow", 1, function(){
							$('#error').fadeIn();
						});
					}
				});
			}
		});
	};
	//blog-item.html
	var formCommentForm = $('#feedbackComment');
	if (formCommentForm.length){
		formCommentForm.validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				email: {
					required: true,
					email: true
				},
				message: {
					required: true,
				}
			},
			messages: {
				name: {
					required: "Please enter your name",
					minlength: "Your name must consist of at least 2 characters"
				},
				email: {
					required: "Please enter your email"
				},
				message: {
					required: "Please enter your message"
				}
			},
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					type:"POST",
					data: $(form).serialize(),
					url:"external/form/comment-form.php",
					success: function() {
						$('#success').fadeIn();
						formCommentForm.each(function(){
							this.reset();
						});
					},
					error: function() {
						formCommentForm.fadeTo( "slow", 1, function() {
							$('#error').fadeIn();
						});
					}
				});
			}
		});
	};
});