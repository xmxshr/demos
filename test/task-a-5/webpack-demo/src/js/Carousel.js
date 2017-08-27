
var Carousel = (function(){
    function _Carousel($ct){
      this.$ct = $ct
      this.init()
      this.bind()
      this.autoPlay()
    }

    _Carousel.prototype.init = function(){
      var $imgCt = this.$imgCt = this.$ct.find('.img-ct'),
          $imgs = this.$imgs = this.$ct.find('.img-ct li'),
          $preBtn = this.$preBtn = this.$ct.find('.pre'),
          $nextBtn = this.$nextBtn = this.$ct.find('.next'),
          $bullets = this.$bullets = this.$ct.find('.bullet li')

      this.pageIndex = 0
      this.isAnimating = false

      this.imgCount = $imgs.length,
      this.imgWidth = $imgs.width()    

      this.$imgCt.append($imgs.first().clone())
      this.$imgCt.prepend($imgs.last().clone())
      this.$imgCt.width((this.imgCount + 2) * this.imgWidth)
      this.$imgCt.css({left: -this.imgWidth})

      var _this = this

      $(window).resize(function(){
        _this.imgCount = $imgs.length,
        _this.imgWidth = $imgs.width() 
        _this.$imgCt.width((_this.imgCount + 2) * _this.imgWidth)
        _this.$imgCt.css({left: -_this.imgWidth})
      })
    }

    _Carousel.prototype.bind = function(){
      var _this = this
      this.$preBtn.click(function(){
        _this.playPre(1)
      })        
      this.$nextBtn.click(function(){
        _this.playNext(1)
      })
      this.$bullets.click(function(){
        var index = $(this).index()
        if(index > _this.pageIndex){
          _this.playNext(index-_this.pageIndex)
        }else if(index < _this.pageIndex){
          _this.playPre(_this.pageIndex-index)
        }
      })
    }

    _Carousel.prototype.playPre = function(len){
      var _this = this
      if(this.isAnimating){
        return
      }
      this.isAnimating = true
      this.$imgCt.animate({
        left: '+=' + len*_this.imgWidth
      },function(){
        _this.pageIndex -= len
        if(_this.pageIndex === -1){
          _this.pageIndex = _this.imgCount-1
          _this.$imgCt.css({
              left: -(_this.imgCount*_this.imgWidth)
            })
        }
        _this.isAnimating = false
        _this.setBullets()
      })   
    }

    _Carousel.prototype.playNext = function(len){
      var _this = this
      if(_this.isAnimating){
        return
      }
      this.isAnimating = true
      this.$imgCt.animate({
        left: '-=' + len*_this.imgWidth
      },function(){
        _this.pageIndex+=len
        if(_this.pageIndex === _this.imgCount){
          _this.pageIndex = 0
          _this.$imgCt.css({left: -_this.imgWidth})
        }
        _this.isAnimating = false
        _this.setBullets()
      })
    }

    _Carousel.prototype.setBullets = function(){
      var _this = this
      this.$bullets.removeClass('active').eq(_this.pageIndex).addClass('active')
    }

    _Carousel.prototype.autoPlay = function(){
      var me = this;
      this.clock = setInterval( function(){
        me.playNext(1);
      }, 3000 );
    }

    return {
      init: function($ct){
        $ct.each(function(index, node){
          new _Carousel($(node))
        })
      }
    }
  })()

  


module.exports = Carousel








