function getStorage(t){return"undefined"!=typeof Storage&&(value=localStorage.getItem(t))&&(value=JSON.parse(value))?value:void 0}function setStorage(t,e){try{return"undefined"==typeof Storage?!1:(localStorage.setItem(t,JSON.stringify(e)),!0)}catch(a){return console.error("設定 storage 失敗！",error),!1}}window.storage={},window.storage.country={cacheTime:6e4,storageKey:"cura.country",set:function(t){return setStorage(this.storageKey,{t:(new Date).getTime(),v:t})},get:function(t){var e=getStorage(this.storageKey);return"undefined"!=typeof e&&"undefined"!=typeof e.t&&"undefined"!=typeof e.v&&e.t+this.cacheTime>(new Date).getTime()&&("jp"===e.v||"tc"===e.v||"en"===e.v)?e.v:"undefined"==typeof t?"":t}},window.storage.contact={cacheTime:1e4,storageKey:"cura.contact",set:function(){return setStorage(this.storageKey,(new Date).getTime())},get:function(){var t=getStorage(this.storageKey);return t&&!isNaN(t)&&t+this.cacheTime>(new Date).getTime()}},$(function(){$("#cholang select").each(function(){var t=location.pathname.substr(location.pathname.lastIndexOf("/")+1);$(this).change(function(){var e=location.pathname.split("/").filter(function(t){return t.length}),a=$(this).val();"jp"===a.split("/")[0]||"tc"===a.split("/")[0]||"en"===a.split("/")[0]?window.storage.country.set(a.split("/")[0]):window.storage.country.set("en"),window.location.assign(("cura"===e[0]?"/cura":"")+"/"+a+"/welcome/"+t)})}),"undefined"!=typeof imgLiquid&&$("._ic").imgLiquid({verticalAlign:"center"}),$(".banner_boxs").each(function(){var t=$(this),e=$(this).find(".pagination").empty();e.append($("<div />").append(Array.apply(null,Array($(this).find(">.bbox").length)).map(function(){return $("<a />").click(function(){$(this).addClass("a").siblings().removeClass("a"),t.attr("class","banner_boxs b"+$(this).index())})}))),e.find("a").first().click(),setInterval(function(){e.find("a.a").next().length?e.find("a.a").next().click():e.find("a").first().click()},7e3)}),$(".feature_boxs").each(function(){var t=$(this).find(".features");$(this).find(".tag_boxs > div").click(function(){t.attr("class","features n"+$(this).index()),$(this).addClass("tag_ac").siblings().removeClass("tag_ac")})}),$(".left2select").each(function(){$("<div />").addClass("select").append($("<select />").append($(this).find(">a").map(function(){return $("<option />").text($(this).text()).val($(this).attr("href")).prop("selected",$(this).hasClass("type_ac"))}).toArray()).change(function(){window.location.assign($(this).val())})).prependTo($(this))}),$(".oa-min-pic").each(function(){var t=$(this).prev().find("img");$(this).find("a").click(function(){$(this).addClass("s_pic_ac").siblings().removeClass("s_pic_ac"),t.attr("src",$(this).find("img").attr("src"))})}),$("#contact_send").each(function(){var t=$(this);t.find("button").click(function(){if(t.attr("data-tip","").removeClass("e"),window.storage.contact.get())return t.attr("data-tip","Please try again after 30 seconds！"),!1;if("We have received your message！"==t.attr("data-tip"))return!1;var e=t.find('input[name="name"]'),a=t.find('input[name="phone"]'),n=t.find('input[name="email"]'),i=t.find('textarea[name="content"]'),s=e.length?e.val().trim():!1,r=a.length?a.val().trim():!1,o=n.length?n.val().trim():!1,c=i.length?i.val().trim():!1;s!==!1&&r!==!1&&o!==!1&&c!==!1&&o.length&&/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(o)?$.ajax({url:"http://curatech.jp/mail.php",data:{name:s,phone:r,email:o,content:c},async:!0,cache:!1,dataType:"json",type:"POST"}).complete(function(){t.attr("data-tip","Your message has been sent to our support staff, we will get back to you ASAP!"),window.storage.contact.set(),e.val(""),a.val(""),n.val(""),i.val("")}):t.attr("data-tip","Please input correct Email address").addClass("e")})})});