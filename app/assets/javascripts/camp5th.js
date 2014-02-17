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



var regtop = $("#register").offset().top + $("#register").height() - 30;
var regtop_origin = $("#register").offset().top;
$(window).bind('scroll', function(event) {
	var $register = $('#register');
	var scrtop = $(window).scrollTop();
  var woffset = scrtop + $(window).height() - 57;

  if ((regtop+30+30) < $(window).height()) {
  	if ((regtop+30) < woffset) {
  		$register.addClass("scroll");
      $register.css("top", regtop_origin);
      $register.css("bottom", "");
  	} else {
      $register.removeClass("scroll");
      $register.css("top", "");
      $register.css("bottom", "");
  	}
  } else {
  	if ((regtop+30) < woffset) {
      $register.css("top", "");
      $register.css("bottom", "");
  		$register.addClass("scroll");
  	} else {
      $register.css("top", "");
      $register.css("bottom", "");
      $register.removeClass("scroll");
  	}
  }
  
  var $gnb = $('#header'),
    $contents = $('#section_uxcamp');
  if (scrtop >= 1) {
    $gnb.addClass("scroll");
    $contents.addClass("scroll");
  } else {
    $gnb.removeClass("scroll");
    $contents.removeClass("scroll");
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

// 금방 지우자 이건
$('#register').click(function(){
	alert("아직 준비중입니다.")
})