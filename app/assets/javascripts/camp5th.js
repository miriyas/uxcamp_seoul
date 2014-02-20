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
