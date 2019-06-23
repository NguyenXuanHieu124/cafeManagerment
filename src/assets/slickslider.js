$('.slider-nav').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
  centerMode: true,
  focusOnSelect: true
});
 $('.slider-nav').on('click', '.slick-slide', function(event) {
 	event.preventDefault();
   var goToSingleSlide = $(this).data('slick-index')
});