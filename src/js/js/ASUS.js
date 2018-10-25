var car_Num = {
    init:function(){
        var car_num = $(".car_num");
        car_num.text(localStorage.sum);
    }
}
car_Num.init();



//   鼠标放入购物车时
  var car = {
      car:$(".car"),
      carDes:$(".carDes"),
      init:function(){
        this.car.mouseover($.proxy(this.over,this));
        this.car.mouseout($.proxy(this.out,this));
        this.showContent();
      },
      over:function(){
        this.carDes.css("display","block");
      },
      out:function(){
          this.carDes.css("display","none");
      },
      showContent:function(){
          var span = this.carDes.prev().children().eq(0);
          var num = Number(span.text());
          if(num<=0){
                this.carDes.children().eq(0).text("购物车还没有商品，赶紧选购吧");
          }else{
                this.carDes.children().eq(0).text("现在就去购买");
                this.carDes.children().eq(0).attr("href","cart.html");
          }
      }
  }
  car.init();


  //渲染数据到爆款清单、笔记本专区、ROG电竞专区、整机专区、DIY外设专区、手机专区中
  var explode_list = {
    products_list:$(".products-list"),
    notebook:$(".notebook"),
    race:$(".race"),
    init:function(){
        var _this = this;
        $.ajax({
            type:"get",
            url:"/search?market=10&question=%E7%AC%94%E8%AE%B0%E6%9C%AC%E7%94%B5%E8%84%91&deliv=0&pzin=v4&pzpq=0&facets=15KP15KP&page=1&bws=0&type=json&rank=1",
            dateType:"json",
            success:function(data){
                var data =data.content.prodInfo.products;
                console.log(data);
                var str = "";
                var count = 0;
                //爆款清单
                for(var key in data){
                    count++;
                    if(count>10){
                        break;
                    }
                    var price = data[key].skuNo.slice(5);
                    if(price[0]<=4){
                        price = 5+price.slice(1);
                    }
                    str+=`<li >
                    <a href="##" class="toCar" data-id="${data[key].pId}"><img src="${data[key].sImg}" alt="${data[key].alt}">
                    <p>${data[key].alt}</p></a>
                    <span>￥${price}</span>
                    </li>`;
                    
                }
                _this.products_list.html(str);

                var arr = [".notebook",".competion",".complete",".DIY",".phone"];
                var aa = -7;
                for(var i=0; i<arr.length; i++){
                    var prod_list = $(arr[i]+" .title .prod-list");
                    aa +=7;
                    prod_list.each(function(j){
                        if(j==0){
                            //当前是第一个选项卡时，需要添加一个轮播图
                        var banner = $(this).parent();
                        var str1 = `<div class="swiper-container">
                                <div class="swiper-wrapper">
                                <a href="##" class="swiper-slide"><img  src="../img/pc-banner1.jpg" alt=""></a>
                                <a href="##" class="swiper-slide"><img  src="../img/pc-banner2.jpg" alt=""></a>
                                <a href="##" class="swiper-slide"><img  src="../img/pc-banner3.jpg" alt=""></a>
                                </div> 
                                <div class="swiper-pagination"></div>
                                <div class="swiper-button-prev"></div>
                                <div class="swiper-button-next"></div>
                            </div>`;
                        $(this).before(str1);
                            var str = "";
                            var desc = "";
                            for(var key=aa; key<aa+3; key++){
                                if(data[key].promoDesc == ""){
                                    desc = "华硕(ASUS) 灵耀2代 S5300 15.6英寸三面微边轻薄笔记本电脑";
                                }else{
                                    desc = data[key].promoDesc.split("【")[0];
                                }
                                var price = data[key].skuNo.slice(5);
                                if(price[0]<=4){
                                    price = 5+price.slice(1);
                                }
                                str+=`<li >
                                <a href="##" class="toCar" data-id="${data[key].pId}"><img src="${data[key].sImg}" alt="${data[key].alt}">
                                <p>${desc}</p></a>
                                <span>￥${price}</span>
                                </li>`;
                            }
                            $(this).html(str);
                        }else{
                            var str = "";
                            var desc = "";
                            for(var key=aa+6*j-3; key<aa+6*j+3; key++){
                                if(data[key].promoDesc == ""){
                                    desc = "华硕(ASUS) 灵耀2代 S5300 15.6英寸三面微边轻薄笔记本电脑";
                                }else{
                                    desc = data[key].promoDesc.split("【")[0];
                                }
                                var price = data[key].skuNo.slice(5);
                                if(price[0]<=4){
                                    price = 5+price.slice(1);
                                }
                                str+=`<li >
                                <a href="##" class="toCar" data-id="${data[key].pId}"><img src="${data[key].sImg}" alt="${data[key].alt}">
                                <p>${desc}</p></a>
                                <span>￥${price}</span>
                                </li>`;
                            }
                            $(this).html(str);
                        }

                    })
                }
                //因为在异步代码里进行了插入轮播图，所以需要从新实例化一个swiper，来获取当前的图片
                var mySwiper = new Swiper ('.swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    autoplay: true,
                    autoplay:{
                        disableOnInteraction: false,
                    },
                    // 如果需要分页器
                    pagination: {
                    el: '.swiper-pagination',
                    clickable :true,
                    },
                    navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    },
                })

                // 点击商品跳转到对应的详情页
                var toCar = $(".toCar");
                toCar.click($.proxy(_this.car));
            },
            error:function(e){
                console.log(e);
            }
        })
    },
    car:function(){
        var id = $(this).attr("data-id").slice(9);
        location.href = "detail.html?id="+id;
    }
  }
  explode_list.init();



//   点击爆款清单栏左右按钮切换数据
var changeData = {
    prev:$(".prev"),
    next:$(".next"),
    products_list:$(".products-list"),
    init:function(){
        this.prev.click($.proxy(this.prevClick,this));
        this.next.click($.proxy(this.nextClick,this));
    },
    prevClick:function(){
        var ll = parseInt(this.products_list.css('left'));
        var l = parseInt(this.products_list.css('left'))+1200;
        l = l>=0?0:l;
        if(ll!=l){
            this.next.css("color","#000");
            this.prev.css("color","#ccc");
            this.products_list.stop(true).animate({
                left:l
            },1000);
        }
    },
    nextClick:function(){
        var ll = this.products_list.css('left');
        var l = parseInt(this.products_list.css('left'))-1200;
        l = l<=-1200?-1200:l;
        if(ll!=l){
            this.prev.css("color","#000");
            this.next.css("color","#ccc");
            this.products_list.stop(true).animate({
                left:l
            },1000);
        }
    }
}
changeData.init();


//切换选项卡
var tab = {
    aLi:$(".title>li"),
    init:function(){
        this.aLi.mouseover($.proxy(this.over));
    },
    over:function(){
        //让对应的子盒子内容显示出来
        $(this).children().addClass("d-show")
        $(this).siblings().children().removeClass("d-show");
        // 更换背景颜色
        $(this).addClass("bgcolor").siblings().removeClass("bgcolor");
        // 更换字体颜色
        $(this).children().eq(0).addClass("fcolor");
        $(this).siblings().children().removeClass("fcolor");
        
    }
}
tab.init();

// 渲染二级菜单
var secondMenu = {
    aLi:$(".banner-center>ul>li"),
    init:function(){
        this.aLi.each($.proxy(this.addMenu));
    },
    addMenu:function(){
        var str = `<ul>
        <li>
            <img src="../img/lyD-1.jpg" alt=""><span>灵耀轻薄本</span>
            <a href="##">灵耀3系列</a><a href="##">灵耀U系列</a><a href="##">灵耀S系列</a>
        </li>
        <li>
            <img src="../img/fx86-1.jpg" alt=""><span>玩家国度</span>
            <a href="##">玩家国度</a><a href="##">游戏笔记本</a>
        </li>
        <li>
            <img src="../img/K5-1.jpg" alt=""><span>游戏笔记本</span>
            <a href="##">灵耀顽石-FL/YX系列</a><a href="##">飞行堡垒-FX/ZX系列</a>
        </li>
        <li>
            <img src="../img/Y4-1.jpg" alt=""><span>办公娱乐本</span>
            <a href="##">效能先锋-A/K/X系列</a><a href="##">学生助手-E系列</a><a href="##">大屏影音-N/V系列</a>
        </li>
        <li>
            <img src="../img/TP-1.jpg" alt=""><span>商用笔记本</span>
            <a href="##">稳定便携P系列</a><a href="##">高端商务B系列</a><a href="##">主流办公Pro系列</a>
        </li>
        <li>
            <img src="../img/lyU4-1.jpg" alt=""><span>翻转变形本</span>
            <a href="##">T/TP系列</a>
        </li>
    </ul>`;
    $(this).append(str);

    }
}
secondMenu.init();