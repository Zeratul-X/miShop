"use strict";for(var url=location.search,urlArr=url.split("?"),idstr="",colorArr=[],chooseContent=Array(),i=0;i<urlArr.length;i++)urlArr[i]&&(idstr=urlArr[i].toString());var mySwiper=new Swiper(".swiper-container",{direction:"horizontal",loop:!1,autoplay:!0,pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});function loadData(s){$("#goodstitle").html(s[s.length-2]),$("#goodsName").html(s[s.length-2]),$("#goodsContent").html(s[s.length-1]),$("#goodsPrice").html(s[0][3]+"元"),$("#singleContent").html(s[s.length-2]+" 全网通版 "+s[0][2]+" "+s[0][1]),$("#singleprice").html(s[0][3]+" 元"),$("#total").html("总计："+s[0][3]+" 元");for(var o=0;o<3;o++)o%2==0?$("#goodsEdition").append("<div class='banben fl' style='dlsplay:inline;' id='edition"+o+"'><a><span>全网通版 "+s[o][2]+"</span><span>"+s[o][3]+"元</span></a></div>"):$("#goodsEdition").append("<div class='banben fr' style='dlsplay:inline;' id='edition"+o+"'><a><span>全网通版 "+s[o][2]+"</span><span>"+s[o][3]+"元</span></a></div>");for(o=0;o<s.length-2;o++)-1==colorArr.indexOf(s[o][1])&&colorArr.push(s[o][1]);for(var n=0;n<colorArr.length;n++)n%2==0?$("#goodsColor").append("<div class='banben fl' id='color"+n+"'><a></span><span class ='yanse' id='colorName'>"+colorArr[n]+"</span></a></div>"):$("#goodsColor").append("<div class='banben fr' id='color"+n+"'><a><span class ='yanse' id='colorName'>"+colorArr[n]+"</span></a></div>"),$("#color"+n).bind("click",{index:n,color:colorArr[n]},function(o){for(var n=new Array,t=o.data.color,e=0;e<s.length-2;e++)s[e][1]==t&&(n[e]=s[e]);var a=Object.keys(n);$("#img1").attr("src",n[a[0]][5]),$("#img2").attr("src",n[a[0]][6]),$("#img3").attr("src",n[a[0]][7]),$("#img4").attr("src",n[a[0]][8]),mySwiper.init(),n=n.filter(function(o){return o}),$("#goodsEdition").html("");for(var i=0;i<n.length;i++)i%2==0?($("#goodsPrice").html(n[0][3]+"元"),$("#goodsEdition").append("<div class='banben fl' style='dlsplay:inline;' id='edition"+i+"'><a><span>全网通版 "+n[i][2]+"</span><span>"+n[i][3]+"元</span></a></div>")):($("#goodsPrice").html(n[0][3]+"元"),$("#goodsEdition").append("<div class='banben fr' style='dlsplay:inline;' id='edition"+i+"'><a><span>全网通版 "+n[i][2]+"</span><span>"+n[i][3]+"元</span></a></div>")),$("#edition"+i).bind("click",{index:i},function(o){$("#goodsPrice").html(n[o.data.index][3]+"元"),$("#singleContent").html(s[s.length-2]+" 全网通版 "+n[o.data.index][2]+" "+n[o.data.index][1]),$("#singleprice").html(n[o.data.index][3]+" 元"),$("#total").html("总计："+n[o.data.index][3]+" 元"),chooseContent.goodsId=n[o.data.index][9],chooseContent.goodsName=s[s.length-2],chooseContent.goodsEdition=n[o.data.index][2],chooseContent.goodsColor=n[o.data.index][1],chooseContent.singlePrice=n[o.data.index][3],chooseContent.imgUrl=n[o.data.index][8]})})}function insertDataToDataBase(o){o.totalPrice=o.singlePrice,o.number=1,$.ajax({url:"../php/addToShopCarNoInfo.php",type:"post",dataType:"json",data:{goodsId:o.goodsId,goodsName:o.goodsName,userName:o.username,number:o.number,goodsEdition:o.goodsEdition,goodsColor:o.goodsColor,totalPrice:o.totalPrice,singlePrice:o.singlePrice,imgUrl:o.imgUrl},success:function(o){}})}$(window).load(function(){$.ajax({url:"../php/detailInfo.php",type:"post",dataType:"json",async:!1,data:{idstr:idstr},success:function(o){$("#img1").attr("src",o[1][5]),$("#img2").attr("src",o[1][6]),$("#img3").attr("src",o[1][7]),$("#img4").attr("src",o[1][8]),loadData(o)}}),mySwiper.init()}),$("#goodsColor").html(""),$("#addToCar").on("click",function(){var o=$.cookie().uname;chooseContent.username=o,chooseContent.username&&$.ajax({url:"../php/checkShopCar.php",type:"post",dataType:"json",data:{username:chooseContent.username},success:function(o){if(1==o.code||0==o.code)insertDataToDataBase(chooseContent),alert("添加购物车成功");else{for(var n=!1,t=!1,e=0;e<o.length;e++){if(o[e][1]==chooseContent.goodsId&&o[e][4]==chooseContent.username&&o[e][6]==chooseContent.goodsEdition&&o[e][7]==chooseContent.goodsColor)return n=!0,void alert("当前选中的商品已存在购物车中，请前往购物车查看");t=!n}t&&insertDataToDataBase(chooseContent)}}})});