//= require jquery

$('.event .title').hover(function(){
  $(this).toggleClass("hover");
  $(this).parent().parent().children('.cover, .shade').toggleClass("hover");
})


//= require jquery

$(window).bind('scroll', function(event) {
  var $register = $('#another');
	var scrtop = $(window).scrollTop();
  var woffset = scrtop + $(window).height() - 57;

  var docheight = $(document).height();
  var regtop = $('#another').offset().top;

  if (docheight <= (regtop+330)) {
    $('.another_wrap').addClass("scroll");
  } else {
    $('.another_wrap').removeClass("scroll");
  }
});