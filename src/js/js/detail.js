var car_Num = {
    init:function(){
        var car_num = $(".car_num");
        car_num.text(localStorage.sum);
    }
}
car_Num.init();
             
     
// 加减时改变数量
var changeVal = {
    sub:$(".sub"),
    add:$(".add"),
    init:function(){
        this.inp = this.sub.next();
        this.sub.click($.proxy(this.subVal,this));
        this.add.click($.proxy(this.addVal,this));
    },
    subVal:function(){
        var num = this.inp.val();
        if(num<=1){
            num=1;
        }else{
            num--;
        }
        this.inp.val(num);
    },
    addVal:function(){
        var num = this.inp.val();
        this.inp.val(++num);
    }
}
changeVal.init();


// 点击加入购物车操作
var addCar = {
    btn:$(".addCar"),
    inp:$(".num"),
    desc:$(".desc>h2"),
    car_num:$(".car_num"),
    nowBuy:$(".nowBuy"),
    init:function(){
        this.btn.click($.proxy(this.add,this));
        this.nowBuy.click($.proxy(this.toCar));
    },
    toCar:function(){
        location.href = "cart.html";
    },
    add:function(){
        var num = Number(this.inp.val());
        var id = this.desc.attr("data-id");
        if(localStorage[id]){
            var idNum = parseInt(localStorage[id]);
            localStorage[id] = num + idNum;
            localStorage.sum = parseInt(localStorage.sum) + num;
            this.car_num.text(localStorage.sum);
        }else{
            //如果有localStorage.sum属性，则在原有基础上加，否则，定义一个localstorage.sum，并赋值
            if(localStorage.sum){
                localStorage.sum = parseInt(localStorage.sum) + num;
            }else{
                localStorage.sum = num;
            }
            localStorage[id] = num;
            this.car_num.text(localStorage.sum);
        }
        layer.open({
            title: '添加提示',
            content: '成功添加&nbsp;'+num+"&nbsp;件商品"
        }); 
    }
}
addCar.init();


$.ajax({
    type:"get",
    url:"../json/detail.json",
    dataType:"json",
    success:function(data){
        var id = parseInt(location.href.split("?")[1].split("=")[1]);
        //把所有的操作方法，封装在ajax请求外，然后数据在ajax里面获取，通过调用函数传参
        //的形式让异步获取的数据实现在ajax外，也能实现数据的获取和操作
        addInfo.init(data,id);
        var sImg = $(".smallimg>img");
        var mImg = $(".middleimg>img");
        var bImg = $(".bigimg>img");
        //鼠标放入时，切换小图和对应大图中图        
        changeSimg.init(sImg,mImg,bImg);
        // 放大镜
        scale.init();
        //设置初始图片
        var src = sImg.eq(0).attr("src");
        mImg.attr("src",src);
        bImg.attr("src",src);
    }
})

// 渲染对应id的商品到详情页
var addInfo = {
    sImg:$(".smallimg"),
    desc:$(".desc>h2"),
    price:$(".discounts>p>span"),
    init:function(data,id){
        for(var i=0; i<data.length; i++){
            if(data[i].proId==id){
                var img = ""
                for(var j=0; j<data[i].img.length; j++){
                    img +=`<img src="${data[i].img[j]}">`;
                }
                this.sImg.html(img);
                this.desc.text(data[i].desc);
                this.desc.attr("data-id",id);
                this.price.html("￥"+data[i].price);
                break;
            }
        }
    }
}

// 鼠标放入小图时，切换大图和中图
var changeSimg = {
    init:function(sImg,mImg,bImg){
        this.sImg = sImg;
        this.mImg = mImg;
        this.bImg = bImg;
        var _this = this;
        this.sImg.eq(0).css("border-bottom","1px solid #0095f3");
        // 需要对象的this和当前事件对象的this，proxy该怎么做？
        this.sImg.mouseover(function(){
            var src = $(this).attr("src");
            _this.bImg.attr("src",src);    
            _this.mImg.attr("src",src); 
            //添加下划线样式
            $(this).css("border-bottom","1px solid #0095f3").siblings()
            .css("border-bottom","none");
            $(this).css("cursor","pointer");
        }); 
    }
}

// 放大镜
var scale = {
    filter:$(".filter"),
    bigimg:$(".bigimg"),
    smallimg:$(".smallimg"),
    middleimg:$(".middleimg"),
    init:function(){
        this.img = this.middleimg.children().eq(0);
        this.bigimg.mouseover($.proxy(this.show,this));
        this.bigimg.mouseout($.proxy(this.hide,this));
    },
    show:function(){
        this.bigimg.css("cursor","move");
        this.filter.show();
        this.middleimg.show();
        this.bigimg.mousemove($.proxy(this.move,this));
    },
    hide:function(){
        this.filter.hide();
        this.middleimg.hide();
    },
    move:function(){
        var e = e || event;
        var mt = this.bigimg.offset().top;
        var ml = this.bigimg.offset().left;
        var l = e.pageX - parseInt(this.filter.css("width"))/2-ml;
        var t = e.pageY - parseInt(this.filter.css("height"))/2-mt;
        var ll = parseInt(this.bigimg.css("width"))-parseInt(this.filter.css("width"));
        var tt = parseInt(this.bigimg.css("height"))-parseInt(this.filter.css("height"));

        l = l>ll?ll:(l<0?0:l);
        t = t>tt?tt:(t<0?0:t);

        this.filter.css("left",l);
        this.filter.css("top",t);

        this.img.css("left",-1.6*l);
        this.img.css("top",-1.6*t);
    }
}