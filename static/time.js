/**
 * Created by Jing on 2017/2/22.
 */
function getServiceTime(){
  var time ='';
  $.ajax({
    type : "POST",
    url : $CURL+"/system/now",
    async : false,
    success : function(data) {
      time = data;
    }
  });
  return time;
}
function timer(intDiff,obj){
  setInterval(function(){
    var day=0,
      hour=0,
      minute=0,
      second=0;
    var htm='';
    if(intDiff > 0){
      day = Math.floor(intDiff/1000/60/60/24);
      hour = Math.floor(intDiff/1000/60/60%24);
      minute = Math.floor(intDiff/1000/60%60);
      second = Math.floor(intDiff/1000%60);
      if (minute <= 9) minute = '0' + minute;
      if (second <= 9) second = '0' + second;
      htm += day+" 天 "+hour+" 时 "+minute+" 分 "+second+" 秒 ";
    }else{
      htm+='已超时';
    }
    $(obj).html(htm);
    intDiff=intDiff-1000;
  }, 1000)
}

function ShowTime(){
  $(".timedele").each(function(){
    var nowtime =  $(this).attr("data-servnowTime");
    var endtime = $(this).attr("data-endTime");
    var fomart = $(this).attr("data-fomart");
    var mm = new Date(Date.parse(endtime.replace(/-/g, "/")));
    var t =mm.getTime() - new Date(nowtime).getTime();
    timer(t,this);
  })
}
$(function(){
  setTimeout(ShowTime,100);
});
