const asus = "https://www.asus.com.cn";

var search = {
    el:$(".login>button"),
    init:function(){
        this.mousedown();
    },
    mousedown:function(){
        this.el.mousedown($.proxy(this.down,this))
    },
    down:function(){
        this.el.css("background","#fff");
    }
}
search.init();


// 轮播swiper
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
	autoplay: true,
    // 如果需要分页器
    pagination: {
	  el: '.swiper-pagination',
	  clickable :true,
    },
  })


// 点击搜索时,调整banner的margin-top值
var clickSearch = {
    search:$(".btn-primary"),
    banner:$(".banner"),
    init:function(){
        var _this = this;
        this.search.click($.proxy(this.mouseClick,this));
    },
    mouseClick:function(){
        var mTop = this.banner.css("margin-top");
        if(mTop=="20px"){
            this.banner.css("margin-top","0");
        }else{
                this.banner.css("margin-top","20px");
        }
    }
}
clickSearch.init();


//正向代理获取ROG 冰刃3的图片
var rogIce3 = { 
    rogIce3:$(".rogIce3"),
    init:function(){
        var _this = this;
        $.ajax({
            type:"get",
            url:"/OfficialSiteAPI.asmx/GetBanner?WebsiteId=9&ProductLevel2Id=0&ProductLevel3Id=0",
            dataType:"json",
            success:function(data){
                var imgSrc = data.Result.SubHeroPD.Banner.Banners["0"].item["0"].content.desktop;
                var a = _this.rogIce3.parent();
                a.attr("href",data.Result.SubHeroPD.Banner.Banners["0"].link);
                _this.rogIce3.attr({
                    src:asus+imgSrc,
                    alt:data.Result.SubHeroPD.Banner.Banners["0"].alt
                })
            }
         })
    }
} 
rogIce3.init();