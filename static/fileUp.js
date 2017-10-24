/**
 * Created by Jing on 2017/2/15.
 */
var ImageUpload = "http://192.168.0.163:1702/ImageUpload";
var callback = "http://192.168.0.55:8080/callback";
//var callback = "http://192.168.0.163:8080/callback";
function uploadMutli(fileId,imgId,retValId){
  auth_upload.uploadChange(fileId,imgId,ImageUpload,callback,retValId,'false');
};
function uploadHead(fileId,imgId,retValId,sort,isBackcall){
  auth_upload.uploadChange(fileId,imgId,ImageUpload,callback,retValId,'false',sort,isBackcall);
};

var maxSize = 1*1024*1024; //图片大小不超过1M;
var errMsgA = "上传的附件文件不能超过1M！！！";
var errMsgB = "请选择正确的图片格式上传！";
var tipMsg = "您的浏览器暂不支持计算上传文件的大小，确保上传文件不要超过1M，建议使用IE、FireFox、Chrome浏览器。";
function uploadMore(fileId,fileImgs,sort){
  var explorer = navigator.userAgent;
  var imgSrc = $("#"+fileId)[0].value;
  if(!/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/.test(imgSrc)){
    alert(errMsgB);
    return false;
  }
  var dom = document.getElementById(fileId);
  var filesize = dom.files[0].size;
  if(filesize>maxSize){
    alert(errMsgA);
    return false;
  }
  var date = new Date();
  var time = date.pattern("yyyyMMddHHmmss");
  var html =  '<li><span onclick="closeImg(this)" class="closeImgA">删除</span>'+
    '<img id="headUrl_'+time+'" height="165" width="100%" class="input upload-path-img display-photo" src="" />'+
    '<input id="imgUrl_'+time+'" name="picUrl" value="" type="hidden" />'+
    '<br/><input type="text" name="picName" maxlength="10"></li>';
  $("#"+fileImgs).append(html);
  if($("#"+fileImgs).find("li").length>=5){
    $("#upfilebox").hide();
  }
  //本地使用
//		auth_upload.uploadChange(fileId,"headUrl_"+time,$uploadServing+"/"+$uploadMethod,$uploadCallBack,"imgUrl_"+time,'false',sort,'0');
  //线上使用
  auth_upload.uploadChange(fileId,"headUrl_"+time,ImageUpload,callback,"imgUrl_"+time,'false',sort,'0');
}
function closeImg(o){
  $(o).parent().remove();
  if($("#fileImgs").find("li").length<5){
    $("#upfilebox").show();
  }
}
//日期格式转化

Date.prototype.pattern=function(fmt) {
  var o = {
    "M+" : this.getMonth()+1, //月份
    "d+" : this.getDate(), //日
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
    "H+" : this.getHours(), //小时
    "m+" : this.getMinutes(), //分
    "s+" : this.getSeconds(), //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S" : this.getMilliseconds() //毫秒
  };
  var week = {
    "0" : "/u65e5",
    "1" : "/u4e00",
    "2" : "/u4e8c",
    "3" : "/u4e09",
    "4" : "/u56db",
    "5" : "/u4e94",
    "6" : "/u516d"
  };
  if(/(y+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  if(/(E+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
  }
  for(var k in o){
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}
