/**
 * @author: Jose Bahamonde Cordeiro
 *	Helper functions for JQuery events. Bootstrap configuration. ScrollReveal configuration.
 */

var scrollDuration = 1000;
var fadeDuration = 500;
var scrollSpyOffset = 51;
var navbarTopFix = 100;
var scrollRevealDuration = 1000;
var scrollRevealButtonDuration = 2000;

/**
 *	Implements smoth scroll over internal page links using jquery
 */  
function smoothScroll() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, scrollDuration);
          return false;
        }
      }
    });
}

/**
 * Hightlights the top nav items when scrolling on a section
 */
function registScrollSpy() {
	$('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: scrollSpyOffset
    });
}

/**
 * Closes nav responsive menu event
 */
function registResponsiveMenuToggle() {
	$('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });
}

/**
 * Fixes top navbar after scroll down
 */
function registFixTopMenu() {
	$('#main-nav').affix({
        offset: {
            top: navbarTopFix
        }
    });
}

function registScrollRevealConfig() {
	window.sr = ScrollReveal();
    sr.reveal('.scroll-reveal-about', {
        duration: scrollRevealDuration,
        scale: 0.3,
        distance: '0px'
    }, 200);
    
    sr.reveal('.scroll-reveal-contact', {
        duration: scrollRevealDuration,
        scale: 0.3,
        distance: '0px'
    }, 200);
    
    sr.reveal('.scroll-reveal-button', {
        duration: scrollRevealButtonDuration,
        scale: 0.3,
        distance: '0px'
    }, 200);
}

 /**
 *	Regist event handlers when the document is loaded
 */
$(document).ready(function() {
	$(smoothScroll);
	
	registScrollSpy();
    
    registResponsiveMenuToggle();

    registFixTopMenu();
    
    registScrollRevealConfig();
});