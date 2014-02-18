//= require jquery

$('.event .title').hover(function(){
  $(this).toggleClass("hover");
  $(this).parent().parent().children('.cover, .shade').toggleClass("hover");
})