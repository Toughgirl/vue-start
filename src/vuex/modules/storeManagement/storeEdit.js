/**
 * Created by Jing on 2017/1/9.
 */

$(function(){
  $("#fileUp").change(function(){
    uploadMutli("fileUp","imgShow","imgsrc")
  })
  $("#fileUpA").change(function(){
    uploadMutli('fileUpA','imgShowA','imgsrcA')
  })
  $("#fileUpB").change(function(){
    uploadMutli("fileUpB","imgShowB","imgsrcB")
  })
//



  /**
   * Created by Jing on 2017/1/9.
   */

    

})


window.upload_serving="http://192.168.0.163:1702";
//sort 表示序号 01-平台，02-门店，03-供应商，04-运营
//isBackcall 1表示 需要调用方法，0 表示不需要调用
function uploadHead(fileId,imgId,retValId,sort,isBackcall){
  auth_upload.uploadChange(fileId,imgId,"/ImageUpload","/callback",retValId,'false',sort,isBackcall);
};

//保存

