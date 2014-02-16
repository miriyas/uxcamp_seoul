//= require jquery

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


$(window).bind('scroll', function(event) {
	var $register = $('#register'),
		$body = $('body'),
		$window = $(this),
		y = $window.scrollTop();

	if ($register.length === 0) {
		return;
	}

	if (!$register.attr('original_top')) {
		$register.attr('original_top', $register.offset().top);
	}

	if (y >= 133) {
		$register.addClass("scroll");
	} else {
		$register.removeClass("scroll");
	}
});


$('.session').hover(
	function(){ $(this).children('.more_info').show(); },
	function(){ $(this).children('.more_info').hide(); }
)
$('.more_info').hover(
	function(){ $(this).hide(); }
)

$(".gnb a").click(function(e) {
	var target = $($(e.target).attr("href"));
	$.scrollTo(target, 500);
});
