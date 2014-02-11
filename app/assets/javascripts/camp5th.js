//= require jquery
//= require jquery_ujs
//= require turbolinks

(function($){
  var container = $("#parrellex");
  var topEl = $(".ly_top", container);
  var bottomEl = $(".ly_bottom", container);

  function combineTitle(){
    topEl.removeClass("hidden");
    bottomEl.removeClass("hidden");
    topEl.addClass("visible");
    bottomEl.addClass("visible");
  }

  function divideTitle(){
    topEl.removeClass("visible");
    bottomEl.removeClass("visible");
    topEl.addClass("hidden");
    bottomEl.addClass("hidden");
  }

  function afterScroll(){
    if($(document).scrollTop() >= 400 ){
      divideTitle();
    } else {
      combineTitle();
    }
  }

  window.onload = function(){
    combineTitle();
    $(document).on("scroll", afterScroll);
  }
}(jQuery));

$('.session').hover(
	function(){ $(this).children('.more_info').show(); },
	function(){ $(this).children('.more_info').hide(); }
)
$('.more_info').hover(
	function(){ $(this).hide(); }
)
