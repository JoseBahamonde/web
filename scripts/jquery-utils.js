/**
 * @author: Jose Bahamonde Cordeiro
 *	Helper functions for JQuery
 */

/** Scroll event duration */
var scrollDuration = 1000;
/** Fade events duration */
var fadeDuration = 500;

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
 *	Regist event handlers when the document is loaded
 */
$(document).ready(function() {
	$(smoothScroll);
	
	 // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });
    
    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#main-nav').affix({
        offset: {
            top: 100
        }
    })
});