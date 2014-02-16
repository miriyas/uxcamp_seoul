//= require jquery

$('.event .title').hover(function(){
  $(this).toggleClass("hover");
  $(this).parent().children('.shade').toggleClass("hover");
})