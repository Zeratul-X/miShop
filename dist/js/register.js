"use strict";var isVerify=0,hasName=0;$("#name").on("keyup",function(){var e=$("#name").val();$.get({url:"../php/verifyUser.php",data:{username:e},success:function(e){0==JSON.parse(e).code?(hasName=0,$("#nameSpan").html("抱歉用户名已存在，请重新输入")):(hasName=1,$("#nameSpan").html("恭喜，用户名可用"))}})}),$("#pass").on("keyup",function(){6<=$("#pass").val().length?$("#passSpan").html(""):$("#passSpan").html("密码长度必须大于6")}),$("#repass").on("keyup",function(){var e=$("#pass").val(),a=$("#repass").val();e.length<=a.length?e==a?$("#repassSpan").html(""):$("#repassSpan").html("验证成功！"):$("#repassSpan").html("两次输入密码不一致，请检查重新输入！")}),$("#verifyPanel").codeVerify({type:1,width:"200px",height:"50px",fontSize:"30px",codeLength:6,btnId:"registerBtn",ready:function(){},success:function(){return isVerify=0,$("#verifySpan").html("验证成功")},error:function(){return isVerify=1,$("#verifySpan").html("验证失败")}}),$("#registerBtn").click(function(){var e=$("#name").val(),a=$("#pass").val(),s=$("#tel").val();$.ajax({url:"http://localhost/MiShop/src/php/register.php",type:"post",dataType:"json",data:{username:e,password:a,tel:s,isVerify:isVerify,hasName:hasName},success:function(e){}})}),lazyLoadInit({offsetBottom:0,offsetTopm:0,showTime:1100});