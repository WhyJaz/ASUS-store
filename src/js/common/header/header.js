
function Header(container){
	this.el = container;
}
Header.Template1 = `<div class="nav">
	<ul class="left">
		<li><a href="index.html">华硕官网</a></li>
		<li><a href="##">服务支持</a></li>
		<li><a href="##">驱动下载</a></li>
		<li><a href="##">ZenCare</a></li>
	</ul>
	<ul class="right">
		<li><a href="login.html">登录</a></li>
		<li><a href="register.html">注册</a></li>
		<li><a href="##">消息</a></li>
		<li><a href="##">我的订单</a></li>
		<li class="car"><a href="cart.html">购物车 ( <span class="car_num">0</span> )</a>
			<div class="carDes">
				<a href=""></a>
			</div>
		</li>
	</ul>
	</div>`;

Header.Template2 = `<div class="logo left"><a href="ASUS.html"><img src="../img/logo.png" alt=""></a></div>
<div class="recommend left">
	<a href="##">【灵耀X Pro】 美薄奢雅 智触未来</a>
	<a href="##">a豆 四面窄13寸笔记本</a>
	<a href="##">新机租赁 3.5元/天起</a>
</div>
<div class="search">
	 <div class="input-group right">
		<input type="text" class="form-control" placeholder="ASUS华硕商城">
		<span class="input-group-btn">
			<button class="btn btn-default " type="button">
				<span class="glyphicon glyphicon-search"></span>
			</button>
		</span>
	</div>
	<p class="left"><a href="##">玩家游戏本</a><a href="##">轻薄时尚本</a></p>
</div>`;

$.extend(Header.prototype,{
	init:function(){
		this.createTopbar();
		this.createSearch();
	},
	createTopbar:function(){
		var content = $("<div class='topbar'></div>");
		content.html(Header.Template1);
		this.el.append(content);
	},
	createSearch:function(){
		var content = $("<div class='logo-search'></div>");
		content.html(Header.Template2);
		this.el.append(content);
	}
})

