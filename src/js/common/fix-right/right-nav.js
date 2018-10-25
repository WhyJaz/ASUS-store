function Right_nav(container){
    this.el = container;
}

Right_nav.Template = `<a href="##"><img src="../img/im.png" alt="">
    <div>
        <p>联系客服</p>
        <img src="../img/pre-sales.png" alt="">
        <img src="../img/service.png" alt="">
        <img src="../img/tecolo.png" alt="">
        <img src="../img/3b3b2afc0bdb40379cdf118309224acffce8a46e.png" alt="">
        <div>商城微信客服</div>
    </div>
    </a>
    <a href="##"><img src="../img/right.jpg" alt=""></a>`;

$.extend(Right_nav.prototype,{
    init:function(){
        this.createRight_nav();
    },
    createRight_nav:function(){
        var content = $("<div class='right-nav'></div>");
        content.html(Right_nav.Template);
        this.el.append(content);
    }
})