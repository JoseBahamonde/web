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
 *	Implements back to top functionality over elements with class .back-to-top
 */
function backToTop() {
	$(window).scroll(function() {
		var header = $("basic-info");
		var headerPosition = header.height && header.offset() ? header.height() + header.offset().top : window.innerHeight; 
      if (jQuery(this).scrollTop() > headerPosition) {
          jQuery('.back-to-top').fadeIn(fadeDuration);
      } else {
          jQuery('.back-to-top').fadeOut(fadeDuration);
      }
    });
    
    $('.back-to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, scrollDuration);
        return false;
    });
 }
 
 /**
 *	Regist event handlers when the document is loaded
 */
$(document).ready(function() {
    backToTop();
	$(smoothScroll);
});
