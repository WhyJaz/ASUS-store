// function randomCode (n) {
//     var str = "";
//     for(var i=0;i<n;i++){
//         var num = parseInt(48+Math.random()*(122-48+1));
//         while((num>=58&& num<=64) || (num>=91&&num<=96)){
//             num = parseInt(48+Math.random()*(122-48+1));
//         }
//         str+=String.fromCharCode(num);
//     }
//     return str;
// }
// var a = randomCode(4);
// console.log(a);

var tips = {
    username:$(".username"),
    password:$(".password"),
    init:function(){
        //输入用户名时
        this.username.on("blur",$.proxy(this.blur));//失去焦点时，校验输入框中的值格式是否正确
        this.username.on("focus",$.proxy(this.focus));//聚焦时，如果内容是错误信息，清空，并改变边框颜色为正常
        this.username.on("input",$.proxy(this.input));//当手动删除完输入框的值时，改变边框颜色
        // 输入密码时
        this.password.on("blur",$.proxy(this.blur));//失去焦点时，校验输入框中的值格式是否正确
        this.password.on("focus",$.proxy(this.focus));//聚焦时，如果内容是错误信息，清空，并改变边框颜色为正常
        this.password.on("input",$.proxy(this.input));
    },
    blur:function(){
        var reg = /^[a-zA-Z_]\w{5,15}$/;
        var inpVal = $(this).val();
        if(inpVal){
            var flag = reg.test(inpVal);
            if(flag){
                $(this).css("border-color","#2DC000")
            }else{
                $(this).val("用户名以字母下划线开头，6到15位");
                $(this).css({"border-color":"red","color":"red"});
                if($(this).prop("type")=="password"){ 
                    $(this).prop("type","text").val("你输入的密码格式不对");
                }
            }
        }
        
    },
    focus:function(){
        if($(this).val() == "用户名以字母下划线开头，6到15位" || $(this).val() =="你输入的密码格式不对"){
            $(this).css({"border-color":"#CCCCCC","color":"black"});
            if($(this).val() =="你输入的密码格式不对"){
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