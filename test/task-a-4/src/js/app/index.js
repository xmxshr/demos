define(['jquery','com/Carousel','com/GoTop','com/Waterfall'], function($,Carousel,GoTop,Waterfall){
  Carousel.init($('.carousel'))
  Waterfall.init($('.waterfall'))
  new GoTop()
})