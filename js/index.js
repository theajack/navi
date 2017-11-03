
var offsetHeight=120;
var item=$(".item");
var wrapper=$(".wrapper");
var naviLis=$(".navi-li");
var naviUl=$(".navi-ul");
var view=$(".navi-li.view");
var foot=$(".footer");
var widthType=0;//当前宽度类型，为了不让onresize 频繁触发修改页面的方法
var WIDTH_FULL=1;
var perWidth;
var curIndex=0;
//420px 5 
//700px 7 
//>700px 全部
if(location.hash!=""){
  for(var i=0;i<naviLis.length;i++){
    if($(naviLis[i]).children().eq(0).attr("href")==location.hash){
      naviTo(i,true);
      break;
    }
  }
}
checkWidth();
$(function(){
  $(window).scroll(function(){
    var top = $("body").scrollTop()+offsetHeight;
    if(foot.offset().top<=top||$(item[0]).offset().top>top){
      wrapper.hide();
    }else{
      wrapper.show();
      for(var i=item.length-1;i>=0;i--){
        if($(item[i]).offset().top<=top){
          curIndex=i;
          $(active($(naviLis[i])));
          history.replaceState({},"","#"+$(naviLis[i]).find(".li-text").text());
          checkNaviScroll(i);
          break;
        }
      }
    }
  });
  naviLis.click(function(){
    var item=$(this);
    if(item.hasClass("view")){
      if(item.hasClass("less")){
        item.removeClass("less");
        item.find(".li-text").text("More");
        naviUl.css("width",perWidth*naviLis.length+"px");
        if(naviUl.data("left")){
          naviUl.css("left",naviUl.data("left"));
        }
      }else{
        item.addClass("less");
        item.find(".li-text").text("Less");
        naviUl.css("width",perWidth*widthType+"px")
        .data("left",naviUl.css("left")).css("left","0px");
      }
    }else{
      naviTo(item.index());
    }
  });
});
function resetNaviUl(){
  naviUl.css({
    left:0,
    position:"relative"
  })
}
function active(item){
  $(".navi-li.active").removeClass("active");
  item.addClass("active");
}
function naviTo(index,jump){
  curIndex=index;
  var top=($(item[index]).offset().top-offsetHeight);
  if(jump===true){
    $("body")[0].scrollTop=top;
  }else{
    $("body").animate({scrollTop:top+"px"},200);
  }
}
function checkNaviScroll(i){
  if(widthType!=WIDTH_FULL&&!view.hasClass("less")){//导航栏滑动
    if(i+1>=widthType){
      setNaviUlLeft(i);
    }
  }
}
function setNaviUlLeft(index){
  var left=((widthType-2-index)*perWidth);
  if(left>0){
    left=0;
  }
  naviUl.css("left",left+"px")
}
function checkWidth(){
  var width=document.documentElement.clientWidth;
  var n=naviLis.length;
  if(width<420){
    widthType=5;
    perWidth=width/5;
    naviLis.css("width",perWidth+"px");
    setNaviUlLeft(curIndex);
    checkIsLess();
  }else if(width<700){
    widthType=7;
    perWidth=width/7;
    naviLis.css("width",perWidth+"px");
    setNaviUlLeft(curIndex);
    checkIsLess();
  }else{
    if(widthType!=WIDTH_FULL){
      widthType=WIDTH_FULL;
      perWidth=100/(n-1);
      naviLis.css("width",perWidth+"%");
      resetNaviUl();
    }
  }
  if(widthType!=WIDTH_FULL){
    if(!view.hasClass("less")){
      naviUl.css("width",perWidth*n+"px");
    }
    view.css("display","inline-block");
  }else{
    naviUl.css("width","100%");
    view.css("display","none");
  }
}
function checkIsLess(){
  if(view.hasClass("less")){
    naviUl.css("width",perWidth*widthType+"px").css("left","0px");
  }
}
window.onresize=checkWidth;