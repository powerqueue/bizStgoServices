$(window).on("load", function() {
    "use strict";

	// ========================= TAB SELECTORS ================================ 

    $('.tbs-list li, .faqs_tab li').on("click touchstart", function(){
        var tab_id = $(this).attr('data-tab');
        $('.tbs-list li, .faqs_tab li').removeClass('active');
        $('.tb-details, .ht-accordion, .sdbr-list .wegts-links').removeClass('active animated fadeIn');
        $(this).addClass('active');
        $("#"+tab_id).addClass('active animated fadeIn');
        return false;
    });

    $('.servies_page .tabs_list li').on("click touchstart", function(){
        var tab_id = $(this).attr('data-tab');
        $('.servies_page .tabs_list li').removeClass('active');
        $('.servies_row').removeClass('active animated fadeIn');
        $(this).addClass('active');
        $("#"+tab_id).addClass('active animated fadeIn');
        return false;
    });

    $('.gallery-sec .tabs_list li').on("click touchstart", function(){
        var tab_id = $(this).attr('data-tab');
        $('.gallery-sec .tabs_list li').removeClass('active');
        $('.gallery-tab').removeClass('active animated fadeIn');
        $(this).addClass('active');
        $("#"+tab_id).addClass('active animated fadeIn');
        return false;
    });

	$('.price-sec .tabs_list li').on("click touchstart", function(){
        var tab_id = $(this).attr('data-tab');
        $('.price-sec .tabs_list li').removeClass('active');
        $('.price_sec_text').removeClass('active animated fadeIn');
        $(this).addClass('active');
        $("#"+tab_id).addClass('active animated fadeIn');
        return false;
    });    

    $('.side_bar .tabs_list li').on("click touchstart", function(){
        var tab_id = $(this).attr('data-tab');
        $('.side_bar .tabs_list li').removeClass('active');
        $('.sdbr-list .wegts-links').removeClass('active animated fadeIn');
        $(this).addClass('active');
        $("#"+tab_id).addClass('active animated fadeIn');
        return false;
    });

    $('.choose_services_sec .tabs_list li').on("click touchstart", function(){
        var tab_id = $(this).attr('data-tab');
        $('.choose_services_sec .tabs_list li').removeClass('active');
        $('.choose_services_sec .srvs_slider').removeClass('active animated fadeIn');
        $(this).addClass('active');
        $("#"+tab_id).addClass('active animated fadeIn');
        return false;
    });

    $('.tbss-list li').on("click touchstart", function(){
        var tab_id = $(this).attr('data-tab');
        $('.tbss-list li').removeClass('active');
        $('.tbb-details').removeClass('active animated fadeIn');
        $(this).addClass('active');
        $("#"+tab_id).addClass('active animated fadeIn');
        return false;
    });

    $('.svss_list li').on("click touchstart", function(){
        var tab_id = $(this).attr('data-tab');
        $('.svss_list li').removeClass('active');
        $('.tab_content').removeClass('active animated fadeIn');
        $(this).addClass('active');
        $("#"+tab_id).addClass('active animated fadeIn');
        return false;
    });



});


    

