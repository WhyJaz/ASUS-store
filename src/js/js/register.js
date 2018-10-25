var tips = {
    username:$("#username"),
    password:$("#password"),
    repeatword:$("#repeatword"),
    email:$("#email"),
    init:function(){
        //输入用户名时
        this.username.on("blur",$.proxy(this.blur));//失去焦点时，校验输入框中的值格式是否正确
        this.username.on("focus",$.proxy(this.focus));//聚焦时，如果内容是错误信息，清空，并改变边框颜色为正常
        this.username.on("input",$.proxy(this.input));//当手动删除完输入框的值时，改变边框颜色
        // 输入密码时
        this.password.on("blur",$.proxy(this.blur));
        this.password.on("focus",$.proxy(this.focus));
        this.password.on("input",$.proxy(this.input));
        //输入重复密码时
        this.repeatword.on("blur",$.proxy(this.blur));
        this.repeatword.on("focus",$.proxy(this.focus));
        this.repeatword.on("input",$.proxy(this.input));
        //输入邮箱时
        this.email.on("blur",$.proxy(this.blur));
        this.email.on("focus",$.proxy(this.focus));
        this.email.on("input",$.proxy(this.input));
    },
    blur:function(){
        var reg = /^[a-zA-Z_]\w{5,15}$/;
        var inpVal = $(this).val();
        if(inpVal){//当输入框有值才进行判断
            //输入是用户名时
            if($(this).attr("id")=="username"){
                if(!reg.test(inpVal)){
                    $(this).val("用户名以字母下划线开头，6到15位");
                    $(this).css({"border-color":"red","color":"red"});
                }else{
                    $(this).css("border-color","#2DC000");
                }
               
            }
            //输入是密码时
            if($(this).attr("id")=="password"){
                if(!reg.test(inpVal)){
                    $(this).prop("type","text").val("密码以字母下划线开头，至少6位");
                    $(this).css({"border-color":"red","color":"red"});
                }else{
                    $(this).css("border-color","#2DC000");   
                }
            }
            //输入是重复密码时
            if($(this).attr("id")=="repeatword"){
                var prevword = $(this).parent().prev().children().eq(1).val();
                if(prevword==inpVal){
                    $(this).css("border-color","#2DC000");   
                }else{
                    $(this).prop("type","text").val("你输入的密码与上面的密码不一致");
                    $(this).css({"border-color":"red","color":"red"});
                }
            }
            //输入是邮箱时
            if($(this).attr("id")=="email"){
                var reg = /^\w+@[a-zA-Z0-9]+\.(com|cn)$/;
                if(!reg.test(inpVal)){
                    $(this).val("邮箱格式以.com结尾，例如163.com");
                    $(this).css({"border-color":"red","color":"red"});
                }else{
                    $(this).css("border-color","#2DC000");
                }
            }
        }
    },
    focus:function(){
        if($(this).val() == "用户名以字母下划线开头，6到15位" || $(this).val() =="密码以字母下划线开头，至少6位" || 
        $(this).val() =="邮箱格式以.com结尾，例如163.com" || $(this).val() =="你输入的密码与上面的密码不一致"){
            $(this).css({"border-color":"#CCCCCC","color":"black"});
            if($(this).val() =="密码以字母下划线开头，至少6位" || $(this).val() == "你输入的密码与上面的密码不一致"){
                $(this).prop("type","password");
            }
            $(this).val("");
        }
    },
    input:function(){
        if(!$(this).val()){
            $(this).css("border-color","#CCCCCC");
        }
    }
}
tips.init();