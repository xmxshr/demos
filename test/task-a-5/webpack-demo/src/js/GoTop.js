


  function GoTop(){
    this.init()
    this.createNode()
    this.bind()
  }
  GoTop.prototype.init = function(){
    this.$target = $('<div class="go-top">回到顶部</div>')
    this.$target.css({
      height: '60px',
      width: '60px',
      padding: '10px',
      position: 'fixed',
      right: '100px',
      bottom: '100px',
      backgroundColor: '#f88192',
      borderRadius: '3px',
      cursor: 'pointer',
      textAlign: 'center',
      lineHeight: '20px',
      color: '#fff'
    })
  }
  GoTop.prototype.createNode = function(){
    $('body').append(this.$target)
    this.$target.hide()
  }
  GoTop.prototype.bind = function(){
    var _this = this
    $(window).scroll(function(){
      if( $(window).scrollTop() > 150 ){
        _this.$target.show()
      }else{
        _this.$target.hide()
      }
    })
    this.$target.click(function(){
      $(window).scrollTop(0)
    })
  }



module.exports = GoTop







