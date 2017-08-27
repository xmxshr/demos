
  var Waterfall = (function(){
    function _Waterfall($ct){
      this.$ct = $ct
      this.init()
      this.getNews()
      this.bind()
    }
    _Waterfall.prototype = {
      init: function(){
        this.$item = this.$ct.find($('.item'))
        this.$newsCt = this.$ct.find($('.news-ct'))
        this.$loadMore = this.$ct.find($('.load-more p'))
        this.perPageCount = 10
        this.curPage = 1
        this.isDataArrive = true
        this.nodeWidth = this.$item.outerWidth(true)
        this.newsCount = parseInt(this.$newsCt.width()/this.nodeWidth)
        this.colSumHeight =[]
        var _this = this
        for(i=0; i<this.newsCount; i++){ 
          _this.colSumHeight[i] = 0
        }
      },
      bind: function(){
        var _this = this
        this.$loadMore.click(function(){
          _this.getNews()
        })
      },
      getNews: function(){
        var _this = this
        this.getData(function(newsList){
          console.log(newsList)
          _this.isDataArrive = true
          $.each(newsList, function(index, news){
            var $node =_this.getNode(news)
            $node.find('img').on('load',function(){
              _this.$newsCt.append($node)
              _this.waterFall($node)
            })
          })
        })
        this.isDataArrive = false
      },
      getData: function(callback){
        var _this = this
        $.ajax({
          url: 'https://platform.sina.com.cn/slide/album_tech',
          dataType: 'jsonp',
          jsonp: 'jsoncallback',
          data: {
            app_key: '1271687855',
            num: _this.perPageCount,
            page: _this.curPage
          }
        }).done(function(ret){
            if(ret && ret.status && ret.status.code ==='0'){
              callback(ret.data)
              _this.curPage++
              console.log('get data')
            }else{
              console.log('error')
            }
          })
      },
      getNode: function(item){
        var html = ''
        html += '<li class="item">'
        html += '<a href="'+ item.url +'">' 
        html += '<img src="'+ item.img_url +'" alt=""></a>'
        html += '<h4 class="news-header">' + item.short_name + '</h4>'
        html += '<p class="news-content">' + item.short_intro + '</p>' 
        html += '</li>'
        
        return $(html)
      },
      waterFall: function($node){
        var _this = this 
        var minValue = Math.min.apply(null, _this.colSumHeight)
        var minIndex = this.colSumHeight.indexOf(minValue)
        $node.css({
          left: _this.nodeWidth * minIndex,
          top: _this.colSumHeight[minIndex],
          opacity: 1
        })
        this.colSumHeight[minIndex] += $node.outerHeight(true)
        this.$newsCt.height(Math.max.apply(null, _this.colSumHeight))   
      },
    }
    return {
      init: function($ct){
        $ct.each(function(index,node){
          new _Waterfall($(node))
        })
      }
    }
  })()

  
  module.exports = Waterfall


    
