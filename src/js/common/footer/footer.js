function Footer(container){
    this.el = container;
}

Footer.Template = `<div class="footer-head">
<div class="sevenDay">
    <ul>
        <li>七天无理由退货</li>
        <li>15天免费换货</li>
        <li>满69元包邮</li>
        <li>预定维修服务</li>
        <li>支持支付宝&花呗分期</li>
    </ul>
</div>
</div>    
<div class="foot-service">
<ul>
    <li><a href="##">公司介绍</a></li>
    <li><a href="##">关于华硕</a></li>
    <li><a href="##">华硕承诺</a></li>
    <li><a href="##">交易条款</a></li>
    <li><a href="##">特别提醒</a></li>
</ul>
<ul>
    <li><a href="##">购物指南</a></li>
    <li><a href="##">订单说明</a></li>
    <li><a href="##">会员注册</a></li>
    <li><a href="##">会员账户安全与信息</a></li>
    <li><a href="##">购物流程</a></li>
    <li><a href="##">积分使用说明</a></li>
    <li><a href="##">优惠券使用说明</a></li>
    <li><a href="##">常见问题</a></li>
    <li><a href="##">华硕商城服务协议说明</a></li>
    <li><a href="##">授权服务店服务说明</a></li>
</ul>
<ul>
    <li><a href="##">配送与付款</a></li>
    <li><a href="##">发货与签收规范</a></li>
    <li><a href="##">配送运费说明</a></li>
    <li><a href="##">配送常见问题</a></li>
    <li><a href="##">配送异常</a></li>
    <li><a href="##">付款咨询</a></li>
    <li><a href="##">发票说明</a></li>
    <li><a href="##">发票常见问题</a></li>
    <li><a href="##">蚂蚁花呗常见问题</a></li>
</ul>
<ul>
    <li><a href="##">服务与支持</a></li>
    <li><a href="##">华硕授权实体门店查询</a></li>
    <li><a href="##">华硕智汇家</a></li>
    <li><a href="##">ZenCare</a></li>
    <li><a href="##">ZenTalk硕粉俱乐部</a></li>
    <li><a href="##">Giftbox</a></li>
</ul>
</div>
<div class="police">
<p>有任何购物问题请联系商城客服 | 电话：400-091-9520</p>
<p>公司名称：华硕电脑（上海）有限公司 | 电话：021-31270606</p>
<p>地址：上海市闵行区金都路5077号</p>
<p>沪ICP备11025349号-3 │ ASUSTeK Computer Inc. All Rights Reserved.</p>
<p><a href="##">沪公网安备 31011202002313号</a></p>
</div>`;

$.extend(Footer.prototype,{
    init:function(){
       this.createFooter();
    },
    createFooter:function(){
        var content = $("<div class='footer'></div>");
        content.html(Footer.Template);
        this.el.append(content);
    }
})