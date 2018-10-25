function Page(){
	this.header = $("#header");
	this.right_nav = $("#right-nav");
	this.footer = $("#footer");
}
$.extend(Page.prototype,{
	init:function(){
		new Header(this.header).init();
		new Right_nav(this.right_nav).init();
		new Footer(this.footer).init();
	}
})
new Page().init();
