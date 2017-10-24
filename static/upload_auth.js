/**
 * 认证图片插件
 */
var auth_upload = {
		/**fileId:文件上传file的id
		 * imgId:图片回显id
		 * url:图片上传地址
		 * backUrl：图片上传回调地址
		 * retValId:回填值id
		 * sort:判断存储路径的位置
		 * isBackcall:是否执行自定义回调函数 true执行 false 不执行
		 */
	uploadChange : function(fileId,imgId,url,backUrl,retValId,multiple,sort,isBackcall){
		var filepath = $("#"+fileId).val();
		var point = filepath.lastIndexOf(".");
		var type = filepath.substr(point);
		if(type==".jpg"||type==".gif"||type==".png"||type==".bmp"||type==".jpeg"||type==".JPG"||type==".GIF"||type==".PNG"||type==".BMP"||type==".JPEG"){
      ajaxFileUpload()
      function ajaxFileUpload(){
        $.ajaxFileUpload({
          url: url, //用于文件上传的服务器端请求地址
          secureuri: false, //是否需要安全协议，一般设置为false
          fileElementId: fileId, //文件上传域的ID
          dataType: 'json', //返回值类型 一般设置为json
          data:{backUrl:backUrl,showId:imgId,retValId:retValId,multiple:multiple,sort:sort,isBackcall:isBackcall},
          success: function (data, status)  //服务器成功响应处理函数
          {
            var src = decodeURIComponent(data.url);
            $("#"+imgId).attr("src",src);
          },
          error : function(data, status, e)//服务器响应失败处理函数
          {

          }
        });
        return false;
      }
		}else{
			 alert("文件格式不正确，请重新选择文件!");
		}
	}
};

function uploadCallBack(url,show,back,multiple,isBackcall){
	var src = window.upload_serving + url;
  //alert(url);
	if(typeof(multiple) != "undefined" && multiple == 'true'){
		addImage2($("#"+show),url,src);
	}else{
		$("#"+show).attr('src',src);
		$("#"+back).val(url);
		if (isBackcall == '1') {
			uploadSuccess(url);
		}
	}
}

function ajaxFileUpload(fileId,imgId,url,backUrl,retValId,multiple,sort,isBackcall){

}
