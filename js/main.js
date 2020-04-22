/*
* WEB Dev/Dsgn TSG
* Build Date: April 2020
* Last Update: April 2020
* Author: Jhon's Code
* Copyright (C) 2019-2XXX Jhon's Code
*/

/*  CONTENTS
    ---------------------------
    1. Iniciando / Abriendo
    2. FullPage init
    3. Deslizamineto animado fade adding
    4. Menu Botones
    5. Transiciones para nav & posicionamiento de logo
    6. Rotador de Texto on Inicio de pantalla
    7. Newsletter init
*/

/* ------------------------------------- */
/* 1. Iniciando / Abriendo ................ */
/* ------------------------------------- */

$(window).on('load', function () {
    "use strict";

    var $logoloading = document.getElementById('loading_img');

    $("#loading").addClass('show').delay(800).queue(function(){
        $logoloading.style.opacity = "0.9";
    });

    setTimeout(function(){
        $("#loading").addClass('hide');
        $('#fullpage .section.fp-table').css('opacity','1');
    },3400);

    
    $('.fade_entrance').fadeTo(0,0).each(function(i) {//initial fadeout, then blink loop
        var bk = $(this);//can i get a blink?
        if ($('.load-0').length) { bk = $('.load-'+i); }//load ordering support
        setTimeout(function() {
            bk.delay(i*300).animate({opacity: '1'}, 500);//animate [delay,opacity,duration]
        },4000);
    });

    setTimeout(function(){
        $("#loading").remove();
    },4000);

});

$(document).ready(function(){
    "use strict";

    /* ------------------------------------- */
    /* 2. FullPage init .................... */
    /* ------------------------------------- */

    $('#fullpage').fullpage();

    /* ------------------------------------- */
    /* 3. Trabajos carousel ................... */
    /* ------------------------------------- */

    $('.works_slider').slick({
        dots: true,
        infinite: true,
        draggable: true,
        loop: true,
        speed: 550,
        centerMode: false,
        variableWidth: true,
        arrows: true,
        autoplay: false,
        swipeToSlide: true,
        slidesToShow: 3
    });

    /* ------------------------------------- */
    /* 4. Servicios carousel ................ */
    /* ------------------------------------- */

    $("#myCarousel").on("touchstart", function(event){

        var yClick = event.originalEvent.touches[0].pageY;
        $(this).one("touchmove", function(event){

            var yMove = event.originalEvent.touches[0].pageY;
            if( Math.floor(yClick - yMove) > 1 ){
                $(".carousel").carousel('next');
            }
            else if( Math.floor(yClick - yMove) < -1 ){
                $(".carousel").carousel('prev');
            }
        });
        $(".carousel").on("touchend", function(){
            $(this).off("touchmove");
        });
    });

    /* ------------------------------------- */
    /* 5. Bloque de Boletin informativo ................. */
    /* ------------------------------------- */
       
    var $button = $('#button-newsletter');
    var $tooltip = $('.footer-newsletter');
    var $navMain = $(".navbar-collapse a");

    $('#button-newsletter').on( "click", function() {
        
        if ($tooltip.attr('data-name') === 'news') {

            (this).innerHTML = "Close";

            $('.footer-newsletter, footer').addClass('showing').delay(50).queue(function( next ){
                $('.footer-newsletter').addClass('show_newsletter');
                next();
            });
            $("body").addClass("elmt_hovr"); 
            $tooltip.removeAttr('data-name');
            return $button.attr('aria-expanded', true);

        } else {

            (this).innerHTML = "Subscribe now";

            $('.footer-newsletter').removeClass('show_newsletter').delay(200).queue(function( next ){
                $('.footer-newsletter, footer').removeClass('showing');
                $tooltip.attr('data-name', 'news');
                next();
            });
            $("body").removeClass("elmt_hovr"); 
            
            return $button.attr('aria-expanded', false);
        }
    });

    $('.navbar-nav>li>a, .navbar .brand-logo, .navbar-nav>li>a, .navbar .brand-logo-no-change').on('click', function(){
        $('.navbar-collapse').collapse('hide');
        $('.navbar-toggler').removeClass('collapsed');
        $('.navbar-toggler-icon').removeClass('opened-close');
        $("body").removeClass("elmt_hovr"); 

        document.getElementById("button-newsletter").innerHTML = "Subscribe now";

        $('.footer-newsletter').removeClass('show_newsletter').delay(200).queue(function( next ){
            $('.footer-newsletter, footer').removeClass('showing');
            $tooltip.attr('data-name', 'news');
            next();
        });

        
        return $button.attr('aria-expanded', false);
    });

    /* ------------------------------------- */
    /* 6. Menu hamburger animacion ......... */
    /* ------------------------------------- */

    var btnEl = document.getElementsByClassName('navbar-toggler');

    Array.prototype.forEach.call(btnEl, function(button) {
      button.addEventListener('click', function() {
        $("body").toggleClass("elmt_hovr"); 
        var menuEl = this.querySelectorAll('.navbar-toggler-icon')[0];
        var openedClassname = menuEl.dataset.toggled;
        menuEl.classList.toggle(openedClassname);
      });
    });

    /* ------------------------------------- */
    /* 7. Formularios ............................ */
    /* ------------------------------------- */

    $("#contact-form").on('submit', function(e){
        e.preventDefault();
        var form = $(this);
        var btn = document.getElementById('valid-form');

        form.parsley().validate();

        btn.disabled = true;
        btn.innerText='Sending…';

        if (form.parsley().isValid()){

            $.ajax({
                url:'php/contact_form.php',
                data:$(this).serialize(),
                type:'POST',

                success:function(data){
                    console.log(data);
                    $('#contact-form .row, #contact-form button').fadeOut(200);
                    setTimeout(function(){
                        $('.sub_validated').removeClass('d-none');
                    },225);

                    setTimeout(function(){
                        $('.sub_validated').css('opacity','1');
                    },300);
                },

                error:function(data){
                    $('#contact-form .row, #contact-form button').fadeOut(200);
                    setTimeout(function(){
                        $('.sub_error').removeClass('d-none');
                    },225);

                    setTimeout(function(){
                        $('.sub_error').css('opacity','1');
                    },300);
                }
            });  
        }
    });

    $("#newsletter-form").on('submit', function(e){
        e.preventDefault();
        var newsform = $(this);
        var newsbtn = document.getElementById('get_notified');

        newsform.parsley().validate();

        newsbtn.disabled = true;
        newsbtn.innerText='Sending…';

        if (newsform.parsley().isValid()){

            $.ajax({
                // Default solution (Email into your inbox)
                url:'php/newsletter_form.php',

                // Mailchimp of file storage solution
                // url:'php/newsletter_form_mailchimp.php',

                data:$(this).serialize(),
                type:'POST',

                success:function(data){
                    console.log(data);

                    setTimeout(function(){
                        $('.news_validated').removeClass('d-none');
                    },225);

                    setTimeout(function(){
                        $('.news_validated').attr("style", "opacity: 1; bottom: 0;");
                    },300);

                    setTimeout(function(){
                        if ($(window).width() > 1024) {
                            $('.footer-newsletter').fadeOut(200);
                            $('#button-newsletter').addClass('d-none');
                        }
                    },5000);
                },

                error:function(data){

                    setTimeout(function(){
                        $('.news_error').removeClass('d-none');
                    },225);

                    setTimeout(function(){
                        $('.news_error').attr("style", "opacity: 1; bottom: 0;");
                    },300);

                    setTimeout(function(){
                        if ($(window).width() > 1024) {
                            $('.footer-newsletter').fadeOut(200);
                            $('#button-newsletter').addClass('d-none');
                        }
                    },5000);
                }
            });  
        }
    });

    $('body').on('click', '.parsley-errors-list', function() {
        $(this).removeClass('filled');
    });

});