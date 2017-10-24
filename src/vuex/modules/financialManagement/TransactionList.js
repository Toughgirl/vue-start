/**
 * Created by Jing on 2017/1/9.
 */
$(function(){
  $("#example-5").dataTable({
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

  //加载第一级区域信息


})

