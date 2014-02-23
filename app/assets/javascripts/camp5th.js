//= require jquery

$(window).bind('scroll', function(event) {
  var $register = $('#register');
	var scrtop = $(window).scrollTop();
  var woffset = scrtop + $(window).height() - 57;

  var docheight = $(document).height();
  var regtop = $('#register').offset().top;

  if (docheight <= (regtop+330)) {
    $('.register_wrap').addClass("scroll");
  } else {
    $('.register_wrap').removeClass("scroll");
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
  // only works at desktop mode
	function(){
    if ($('#dimension').width() == (5 || 4)) {
      $(this).children('.more_info').show();
    }
  },
	function(){
    if ($('#dimension').width() == (5 || 4)) {
      $(this).children('.more_info').hide();
    }
  }
)
$('.more_info').hover(
  // only works at desktop mode
	function(){
    if ($('#dimension').width() == (5 || 4)) {
      $(this).hide();
    }
  }
)

$('.head').click(function(){
  // only works at mobile mode
  if ($('#dimension').width() < 4 && $(this).parent().children('.more_info').length > 0 ) {
    $('#more_info_shader').show();
    $(this).parent().children('.more_info').show();
  }
});
$('#more_info_shader, .more_info .close').click(function(){
  $('.more_info').hide();
  $('#more_info_shader').hide();
})


$(".gnb a").click(function(e) {
	var target = $($(e.target).attr("href"));
	$.scrollTo(target, 500);
});