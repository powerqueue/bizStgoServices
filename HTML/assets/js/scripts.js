$(window).on("load", function() {
    "use strict";


	// ======================== ACCORDION FAQs TABS ========================

	$(".toggle").each(function(){
	    $(this).find('.content').hide();
	    $(this).find('h2:first').addClass('active').next().slideDown(500).parent().addClass("activate");
	    $('h2', this).on("click touchstart", function() {
	        if ($(this).next().is(':hidden')) {
	            $(this).parent().parent().find("h2").removeClass('active').next().slideUp(500).removeClass('animated fadeInUp').parent().removeClass("activate");
	            $(this).toggleClass('active').next().slideDown(500).addClass('animated fadeInUp').parent().toggleClass("activate");
	        }
	    });
	});


	// ======================== RESPONSIVE MOBILE MENU ========================

	$(".menu_btn").on("click touchstart", function() {
		$(".responsive-menu").toggleClass("active");
		return false;
	});
    $("html").on("click", function() {
        $(".responsive-menu").removeClass("active");
    });
	$(".close-mobile-menu").on("click touchstart", function() {
		$(".responsive-menu").removeClass("active");
		return false;
	});
    $('.responsive-menu, .menu_btn').on("click", function(e) {
        e.stopPropagation();
    });

	// ======================== SEARCH FORM TOGGLE ========================


	$(".search_icon svg").on("click touchstart", function() {
		$(".searchh_form").slideToggle();
	});

	$("html").on("click touchstart", function() {
		$(".searchh_form").fadeOut();
	});
	$(".search_icon").on("click touchstart", function(e) {
		e.stopPropagation();
	});

    // ======================== TOP BAR TOGGLE ON RESPONSIVE ========================

	$(".remove_top_bar").on("click", function() {
		$(".top_header").slideToggle();
		$(this).toggleClass("rotate");
	});


	//  ==================== STICKY HEADER  ====================

    $(window).on("scroll", function() {
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
        	$(".responsive-header, .hd_opts").addClass("sticky animated slideInDown");
            $(".scrollTop").addClass("active");
        } else if (scroll < 600) {
            $(".responsive-header, .hd_opts").removeClass("sticky animated slideInDown");
            $(".scrollTop").removeClass("active");
        }
    });

    // ======================== SCROLL TO TOP ========================

    $(".scrollTop").on("click touchstart", function(){
        $("html, body").animate({scrollTop : 0},1000);
        return false;
    });

    // ======================== POPUP FORM ========================

    $(".apt_form_btn").on("click touchstart", function() {
    	$(".appint_form").addClass("open");
    	$("body").addClass("overlay_bg no-scroll");
    	return false;
    });
    $(".close_apt_form").on("click touchstart", function() {
    	$(".appint_form").removeClass("open");
    	$("body").removeClass("overlay_bg no-scroll");
    	return false;
    });

    // ======================== DIRECTION MAP POPUP ========================

    $(".direction_map_btn").on("click touchstart", function() {
    	$(".direction_form").addClass("open");
    	$("body").addClass("overlay_bg");
    	return false;
    });
    $(".close_apt_form").on("click touchstart", function() {
    	$(".direction_form").removeClass("open");
    	$("body").removeClass("overlay_bg");
    	return false;
    });

    // ======================== CONTACT POPUP ========================

    $(".contact_popup_btn").on("click touchstart", function() {
    	$(".contact_popup").addClass("open");
    	$("body").addClass("overlay_bg");
    	return false;
    });
    $(".close_apt_form").on("click touchstart", function() {
    	$(".contact_popup").removeClass("open");
    	$("body").removeClass("overlay_bg");
    	return false;
    });

    // ======================== INITILAZING SLIDER IN RESPONSVE VERSION ========================

    if ($(window).width() < 991) {
        $(".price-table-sec .row").addClass("sli_der");
        $(".tbb_content .tb-details .row").addClass("coup_slider");
        $(".adds_services .row").addClass("coup_slider");
    }

    // ======================== LOADER UNTIL TAB OPEN ========================

    $(".maintaince_sec .tbs-list li, .maintaince_sec #proj-plan .tbss-list li").on("click touchstart", function() {
    	$(".tb-details, .price-table-sec").addClass("loading").delay(2000).queue(function(){
		   $(this).removeClass("loading"); 
		   $(this).dequeue();
		});
    });

    $(".hd_opts li").on("click touchstart", function() {
    	$(this).addClass("active").siblings().removeClass("active");
    });

    // ======================== RESPONSIVE MOBILE MENU ========================

    $(".responsive_header_navigations nav ul ul").parent().addClass("has-menu");
    $(".responsive-menu ul ul").parent().addClass("has-menu");


    $(".responsive-menu ul li a").on("click", function() {
        $(this).parent().toggleClass("active").siblings().removeClass("active");
        $(this).next("ul").slideToggle().parent().siblings().find("ul").slideUp();
    });



});


    

