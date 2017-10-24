/**
 * Created by Jing on 2017/1/9.
 */
$(function(){
  $("#example-3").dataTable({
    "bLengthChange": false,
    "bInfo": false,
    "bFilter": false,
    "bSort": false,
    "sPaginationType": "full_numbers",
    "oLanguage": {
      "oPaginate": {
        "sFirst": "首页",
        "sPrevious": "前一页",
        "sNext": "后一页",
        "sLast": "尾页"
      }
    },
    "ajax": {
      "url": "/data",
      "dataSrc": ""

    },
    "columns": [
      { "data": "name" },
      { "data": "position" },
      { "data": "office" },
      { "data": "extn" },
      { "data": "start_date" },
      { "data": "salary" }
    ]
  });

  //选择车系查询车型
  //function combo_seriesed(o){
  //  var serieId = $("option:selected",o).val();
  //  var htm = '<select id="model_select" class="combo-select form-control left" onchange="combo_modeled(this);" style="width: 25%;">'+
  //    '<option value="">年款排量</option>';
  //  if(serieId!=""){
  //    $.ajax({
  //      type : "POST",
  //      url : $CURL+"/system/dictcarclassification/model",
  //      data : {
  //        serieId : serieId
  //      },
  //      async : false,
  //      success : function(data) {
  //        for (var i = 0; i < data.length; i++) {
  //          htm +='<option value="'+data[i].id+'">'+data[i].model+'</option>';
  //        }
  //      }
  //    });
  //  }
  //  htm +='</select>';
  //  $("#dd_model").html(htm);
  //  $("#model_select").comboSelect();
  //  //刷新表格
  //  queryData();
  //}



})

