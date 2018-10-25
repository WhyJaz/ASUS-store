var car_Num = {
    init:function(){
        var car_num = $(".car_num");
        car_num.text(localStorage.sum);
    }
}
car_Num.init();

// 渲染商品到购物车栏
$.ajax({
    type:"get",
    url:"../json/detail.json",
    dataType:"json",
    success:function(data){
        var str = "";
        var main = $(".main");
        for(var i=0; i<data.length; i++){
            for(var key in localStorage){
                if(key == data[i].proId){
                    var price = parseInt(data[i].price);
                    var val = Number(localStorage[key]);
                    str += `<ul>
                    <li><input type="checkbox" class="single-check">
                        <a href="##" class="toDetail" data-id="${data[i].proId}">
                            <img src="${data[i].img[0]}" alt="">
                            <span>${data[i].desc}</span>
                        </a>
                    </li>
                    <li class="price">${data[i].price}</li>
                    <li>
                        <div class="input-group">
                            <span class="input-group-addon sub">-</span>
                            <input type="text" class="form-control num" value="${val}">
                            <span class="input-group-addon add">+</span>
                        </div>
                    </li>
                    <li>￥0</li>
                    <li class="integral">${price*val}</li>
                    <li class="single-total-price">${"￥"+price*val+".00"}</li>
                    <li><span class="del" data-id="${data[i].proId}">X</span></li>
                    
                </ul>`
                }
            }
        }
        main.append(str); 
        var sub = $(".sub");
        var add = $(".add");
        //商品加减
        changeVal.init(sub,add); 
        //商品全选与反选
        var single_check = $(".single-check");
        check.init(single_check);
        //商品删除
        var del = $(".del");
        dele.init(del);
        //商品从购物车跳转到详情页
        var toDetail = $(".toDetail");
        carTo_detail.init(toDetail);
    }
})


// 商品从购物车跳转到详情页
var carTo_detail = {
    init:function(toDetail){
        this.toDetail = toDetail;
        this.toDetail.click($.proxy(this.click));
    },
    click:function(){
        var id = $(this).attr("data-id");
        location.href = "detail.html?id="+id;
    }
}

//删除操作
var dele = {
    init:function(del){
        this.del = del;
        this.del.click($.proxy(this.remove));
    },
    remove:function(){
        var totalPrice = $("#totalPrice");
        var totalNum = $("#totalNum");

        var id = Number($(this).attr("data-id"));
        var val = Number(localStorage[id]);
        var car_num = $(".car_num");
        //选中商品数量和总价减
        if($(this).parent().parent().children().eq(0).children().eq(0).prop("checked")){
            //选中数量减
            totalNum.text(Number(totalNum.text())-val);
            //总价减
            var single_total_price = Number($(this).parent().prev().text().slice(1));
            var total_price = Number(totalPrice.text().slice(1));
            totalPrice.text("￥"+ (total_price-single_total_price)+".00");
        }
        //删除localstorage里的数据，并且总量相应的减值
        localStorage.removeItem(id);
        localStorage.sum = Number(localStorage.sum) - val;
        car_num.text(localStorage.sum);
        $(this).parent().parent().remove();
        //如果localstorage里面没有数据，就隐藏购买栏，显示空空栏
        if(localStorage.length<=1){
            var all = $(".all");
            all.prop("checked",false);
            var main = $(".main");
            var buy = $(".buy");
            var empty = $(".empty");
            main.css("display","none");
            buy.css("display","none");
            empty.css("display","block");
        }
    }
}

//购物车没有商品时，切换显示
var emptyCar = {
    main:$(".main"),
    buy:$(".buy"),
    empty:$(".empty"),
    init:function(){
        if(localStorage.length<=1){
            this.main.css("display","none");
            this.buy.css("display","none");
            this.empty.css("display","block");
        }
        
    }
}
emptyCar.init();

// 全选反选
var check = {
    all:$(".all"),
    totalPrice:$("#totalPrice"),
    totalNum:$("#totalNum"),
    init:function(single_check){
        this.single_check = single_check;
        var _this = this;

        // 全选按钮
        this.all.click(function(){
            var flag = $(this).prop("checked");
            _this.all.prop("checked",flag);
            _this.single_check.prop("checked",flag);
            if(flag){
                _this.totalNum.text(0);
            }
           //如果localstorage里没有数据了，则不允许进行总数量和总价的操作   
            if(localStorage.length>1){
                for(var i=0; i<_this.single_check.length; i++){
                    var total_num = Number(_this.totalNum.text());
                    if(flag){
                        var single_total_price = Number($(_this.single_check[i]).parent().parent().children().eq(5).text().slice(1));
                        var total_price = Number(_this.totalPrice.text().slice(1));
                        _this.totalPrice.text("￥"+(total_price + single_total_price)+".00");
                        // input输入框的值
                        var inpVal = Number($(_this.single_check[i]).parent().parent().children().eq(2).children().eq(0).children().eq(1).val());
                        // 设置选中商品的总数量
                        _this.totalNum.text(total_num+inpVal);
                    }else{
                        _this.totalPrice.text("￥"+0.00);
                        _this.totalNum.text(0);
                    }
                }
            }
        });
        // 商品选中子按钮
        this.single_check.click(function(){
            var flag = true;
            var index = $(this).index();
            var inpVal = Number($(this).parent().parent().children().eq(2).children().eq(0).children().eq(1).val());
            for(var i=0; i<_this.single_check.length; i++){
                if(_this.single_check.eq(i).prop("checked")==false){
                    flag = false;
                    break;
                }
            }
            if(flag){
                _this.all.eq(0).prop("checked",flag);
                _this.all.eq(1).prop("checked",flag);
            }else{
                _this.all.eq(0).prop("checked",flag);
                _this.all.eq(1).prop("checked",flag);
            }
            var single_total_price = Number($(this).parent().parent().children().eq(5).text().slice(1));
            var total_price = Number(_this.totalPrice.text().slice(1));
            var total_num = Number(_this.totalNum.text());
            if($(this).prop("checked")){
                _this.totalPrice.text("￥"+(total_price + single_total_price)+".00");
                _this.totalNum.text(total_num + inpVal);
            }else{
                _this.totalPrice.text("￥"+(total_price - single_total_price)+".00");
                _this.totalNum.text(total_num - inpVal);
            }
        });
    }
    
}

//点击加减时改变对应数量，单品总价，并改变localstorage里面的商品数量值
var changeVal = {
    init:function(sub,add){
        this.sub = sub;
        this.add = add;
        this.sub.click($.proxy(this.subVal));
        this.add.click($.proxy(this.addVal));
    },
    subVal:function(){
        var totalPrice = $("#totalPrice");
        var totalNum = $("#totalNum");
        var flag = $(this).parent().parent().parent().children().eq(0).children().eq(0).prop("checked");
        //点击减号时
        var inp = $(this).next();
        //该商品的单价
        var priceVal = Number($(this).parent().parent().prev().text());
        //获取当前输入框的值
        var num = Number(inp.val());
         // 页面头部的商品数量总数
        var car_num = $(".car_num");
        //计算选中的总商品总价计算
        var total_price = Number(totalPrice.text().slice(1));
        var total_num = Number(totalNum.text());
        if(flag){
            if(num>1){
                totalPrice.text("￥"+(total_price - priceVal)+".00");
                totalNum.text(total_num - 1);
            }
        }
        if(num<=1){
            num=1;
        }else{
            num--;
            localStorage.sum = Number(localStorage.sum) - 1;
        }
        car_num.text(localStorage.sum);
        //数量，单品总价和积分的计算
        var span = $(this).parent().parent().parent().children().eq(6).children().eq(0);
        var id = span.attr("data-id");
        localStorage[id] = num;
        inp.val(num);
        //积分计算
        $(this).parent().parent().parent().children().eq(4).text(priceVal*num);
        // 总价计算
        $(this).parent().parent().parent().children().eq(5).text("￥"+priceVal*num+".00");
    },
    addVal:function(){
        var totalPrice = $("#totalPrice");
        var totalNum = $("#totalNum");
        var flag = $(this).parent().parent().parent().children().eq(0).children().eq(0).prop("checked");
        // 点击加号时
        var inp = $(this).prev();
        var priceVal = Number($(this).parent().parent().prev().text());
        var num = Number(inp.val());
        //数量，单品总价和积分的计算
        var span = $(this).parent().parent().parent().children().eq(6).children().eq(0);
        var id = span.attr("data-id");
        // 页面头部的商品数量总数
        var car_num = $(".car_num");
        //计算选中的总商品总价计算
        var total_price = Number(totalPrice.text().slice(1));
        var total_num = Number(totalNum.text());
        if(flag){
            totalPrice.text("￥"+ (total_price + priceVal)+".00");
            totalNum.text(total_num + 1);
        }
        localStorage[id] = num+1;
        localStorage.sum = Number(localStorage.sum) + 1;
        car_num.text(localStorage.sum);

        inp.val(++num);
        $(this).parent().parent().parent().children().eq(4).text(priceVal*num);
        $(this).parent().parent().parent().children().eq(5).text("￥"+priceVal*num+".00");
    }
}
