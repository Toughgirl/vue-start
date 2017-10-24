<template>
  <div id="wrapper">
    <HtmlHeader></HtmlHeader>
    <div id="page-wrapper" class="gray-bg dashbard-1">
      <!-- 顶部栏-->
      <div class="row border-bottom">
        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
          <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary "><i class="fa fa-bars"></i> </a>
          </div>
          <ul class="nav navbar-top-links navbar-right">
            <li class="text-navy">{{user.userName}}</li>
            <li class="text-navy">
              <a href="#" v-on:click="logOut" style="color:#23c6c8">
                <i class="fa fa-sign-out text-navy"></i>退出
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-lg-10">
          <h2></h2>
          <ol class="breadcrumb">
            <li>
              客户管理
            </li>
            <li>
              业务管理
            </li>
            <li>
              全车件
            </li>
          </ol>
        </div>
        <div class="col-lg-2"></div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="wrapper wrapper-content">
            <div class="ibox">
              <div class="ibox-title">
                <div class="row">
                  <div class="form-group col-lg-2 col-sm-12">
                    <div class="input-group">
                      <div class="input-group-addon">状态：</div>
                      <select class="form-control" id="status">
                        <option value="">全部</option>
                        <option value="报价中">报价中</option>
                        <option value="已报价">已报价</option>
                        <option value="已购买">已购买</option>
                        <option value="已失效">已失效</option>
                        <option value="已驳回">已驳回</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group col-lg-5 col-sm-12">
                    <div class="input-group">
                      <div class="input-group-addon">提交时间：</div>
                      <div style="width: 100%;float: left;height: 32px;">
                        <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%" placeholder="选择开始时间" readonly="readonly" name="dateStart" id="dateStart" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'dateEnd\')}'})">
                        <span style="float: left;width: 4%;margin: 0 1%;text-align: center;line-height: 32px;">--</span>
                        <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%" placeholder="选择结束时间" readonly="readonly" name="dateEnd" id="dateEnd" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'dateStart\')}'})">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-lg-5 col-sm-12">
                    <div class="input-group">
                      <div class="input-group-addon">车型：</div>
                      <div class="form-control" style="padding: 0;border: none;">
                                                    <span id="dd_brand">
                                                           <select id="brand_select"  class="combo-select form-control left" style="width: 25%;margin-right: 1%;">

                                                           </select>
                                               			</span>
                                               			<span id="dd_series">
                                                           <select id="serie_select" class="combo-select form-control left" style="width: 25%;margin-right: 1%;">
                                                             <option value="">车系</option>
                                                           </select>
                                               			</span>
                                               			<span id="dd_model">
                                                           <select id="model_select" class="combo-select form-control left"  style="width: 25%">
                                                             <option value="">年款排量</option>
                                                           </select>
                                               			</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-lg-2 col-sm-6">
                    <div class="input-group">
                      <input class="form-control" placeholder="请输入门店名称/申请单号" id="storeName">
                    </div>
                  </div>

                  <div class="form-group col-lg-6 col-sm-6">
                    <button class="btn btn-red" id="clearCondition">清除条件</button>
                    <button class="btn btn-info" id="searchList">查询</button>
                  </div>
                </div>

              </div>
              <div class="ibox-content" v-on:click="openImageProxy($event)">
                <div class="container-fluid">
                  <table id="carParts" class="table  table-bordered" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                      <th>申请单号</th>
                      <th>门店名称</th>
                      <th>车型</th>
                      <th>预购数量</th>
                      <th>提交时间</th>
                      <th>状态</th>
                      <th>操作</th>
                    </tr>
                    </thead>

                  </table>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <HtmlFooter></HtmlFooter>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { mapState } from 'vuex'
  import { mapActions } from 'vuex'
  import { USER_SIGNOUT } from 'src/store/user/login'
  require('src/vuex/modules/businessManagement/purchaseList.js')
  import HtmlFooter from 'src/components/footer.vue'
  import HtmlHeader from 'src/components/header.vue'
  import 'babel-polyfill';
  import RegionPicker from 'vue-region-picker'
  import CHINA_REGION from 'china-area-data'
  import store from 'src/vuex/store.js'
  import inspinia from 'src/assets/js/inspinia.js'
  import nav_active from 'src/assets/js/nav.js'
  Vue.use(RegionPicker, {
    region: CHINA_REGION,
    vueVersion: 2
  })
  export default {
    data(){
    return{
      date: '',
      date1: '',
      region: {},
      list:""

    }
  },
  computed: mapState({ user: state => state.user }),
  methods: {
  ...mapActions([USER_SIGNOUT]),
      logOut() {
      this.USER_SIGNOUT()
      this.$router.replace({ path: '/login' })
    },
    change:function(s){
      //console.log(s)
    },
    openImageProxy: function (event) {
      if (event.target.nodeName === 'BUTTON') {
        var $html= event.target;
        var partsOrderId = $($html).attr("partsOrderId");
        this.$router.replace({ path: '/carPartsDetail/'+ partsOrderId })
        event.stopPropagation();
      }
    }

  },
  mounted:function () {
    function clearCondition(){
      $("#status").val("");
      $("#storeName").val("");
      $("#dateStart").val("");
      $("#dateEnd").val("");
      $("#brand_select").val("车辆品牌");
      $("#serie_select").val("车系");
      $("#model_select").val("年款排量");
    }
    $("#clearCondition").click(function(){
      clearCondition();
      searchList();
    });
    inspinia();
    nav_active();
    //车型
    brand_select()
    $("#brand_select").change(function(){
      var brandId = $('#brand_select option:selected').attr("bid");
      series_select(brandId)
    })
    $("#serie_select").change(function(){
      var serieId = $('#serie_select option:selected').attr("cid");
      model_select(serieId)
    })

    function brand_select(){
      var brand_option = "<option>车辆品牌</option>";
      var param = new Object();
      param.access_token = store.state.user.access_token
      param.user_id = store.state.user.userId
      var data = JSON.stringify(param);
      $.ajax({
        type : "POST",
        // url : "/carBrand",
        url : store.state.baseUrl.data_serv_url+"/parts/partsOrder/carBrand",
        data : {parameter:data},
        success : function(data) {
          var arr = data.hmac
          for (var i = 0 ; i < arr.length; i++) {
            brand_option+="<option bid='"+arr[i].bid+"'>"+arr[i].name+"</option>"
          }
          $("#brand_select").html(brand_option)
        }
      });
    }

    function series_select(brandId){
      var series_option = "<option>车系</option>";
      var param = new Object();
      param.access_token = store.state.user.access_token
      param.user_id = store.state.user.userId
      var request_parames = new Object();
      request_parames.brandId = brandId
      param.request_parames=request_parames;
      var data = JSON.stringify(param);
      $.ajax({
        type : "POST",
        //url : "/carSeries",
        url : store.state.baseUrl.data_serv_url+"/parts/partsOrder/series",
        data : {parameter:data},
        success : function(data) {
          var arr = data.hmac
          for (var i = 0 ; i < arr.length; i++) {
            series_option+="<option cid='"+arr[i].cid+"'>"+arr[i].cname+"</option>"
          }
          $("#serie_select").html(series_option)
        }
      });
    }

    function model_select(serieId){
      var model_option = "<option>年款排量</option>";
      var param = new Object();
      param.access_token = store.state.user.access_token
      param.user_id = store.state.user.userId
      var request_parames = new Object();
      request_parames.serieId = serieId
      param.request_parames=request_parames;
      var data = JSON.stringify(param);
      $.ajax({
        type : "POST",
        //url : "/carModel",
        url : store.state.baseUrl.data_serv_url+"/parts/partsOrder/model",
        data : {parameter:data},
        success : function(data) {
          var arr = data.hmac
          for (var i = 0 ; i < arr.length; i++) {
            model_option+="<option id='"+arr[i].id+"'>"+arr[i].model+"</option>"
          }
          $("#model_select").html(model_option)
        }
      });
    }

    var self = this;
    $("#carParts").dataTable({
      "bAutoWidth": false,
      "processing": true,
      "serverSide": true,//服务器分页
      "iDisplayLength": 10,//首次加载的数据条数
      "ajax": {
        //"url": "/partsOrderList",
        "url": store.state.baseUrl.data_serv_url+"/parts/partsOrder/page",
        "type": "POST",
        "dataSrc":"hmac.data",//默认data，也可以写其他的，格式化table的时候取里面的数据
        "data":function (d) {//d 是原始的发送给服务器的数据，默认很长。
          var param = new Object();
          param.access_token = store.state.user.access_token
          param.user_id = store.state.user.userId
          var status =$("#status").val();
          var brandId = $('#brand_select option:selected').attr("bid");
          var serieId = $('#serie_select option:selected').attr("cid");
          var modelId = $('#model_select option:selected').attr("id");
          var storeName =$("#storeName").val();
          var dateStart =$("#dateStart").val();
          var dateEnd =$("#dateEnd").val();
          var request_parames = new Object();
          request_parames.start = d.start;
          request_parames.pageSize = d.length;
          request_parames.brandId = brandId;
          request_parames.serieId = serieId;
          request_parames.modelId = modelId;
          request_parames.startTime = dateStart;
          request_parames.endTime = dateEnd;
          request_parames.keyWords = storeName;
          request_parames.status = status;
          param.request_parames=request_parames;
          var data = JSON.stringify(param);
          var obj = {};
          obj.parameter=data
          return obj;
        }
      },
      "columns": [
        { "data": "parts_order_no" },
        { "data": "company_name" },
        { "data": "car_class_name" },
        { "data": "parts_order_quantity_total" },
        { "data": "create_date" },
        { "data": "statusName" },
        //操作列
        {
          "data": "",//json
          "render": function (data,type,full,callback) {
            var datahtml='';
            datahtml+='<button class="btn btn-info btn-xs" partsOrderId="'+full.parts_order_id+'">详情</button>'
            return datahtml;
          }
        }


      ],
      "language": {
        "lengthMenu": "每页 _MENU_ 条记录",
        "zeroRecords": " ",
        "info": "当前 _START_ 条 到 _END_条 共_TOTAL_条",
        "infoEmpty": "暂无记录",
        "infoFiltered": "",
        "search":"搜索",
        "processing" : "加载中",
        "paginate" : {
          "first" : "首页",
          "previous" : "上一页",
          "next" : "下一页",
          "last" : "尾页"
        }
      },
      "oPaginate" : {
        "sFirst" : "首页",
        "sPrevious" : "上一页",
        "sNext" : "下一页",
        "sLast" : "末页"
      },
      "paging":   true,//分页
      "ordering": false,//排序
      "bFilter": false,     //过滤功能
      "searching": false,//去掉默认的搜索框
      "info":     true,//信息
      "pagingType":   "full_numbers",
      "lengthChange": false,
      "bStateSave": true


    });

    $("#searchList").click(function(){
      searchList();
    });

    // 搜索
    function searchList(){
      $('#carParts').DataTable().draw();
    }
  },
  components:{
    HtmlFooter,
    HtmlHeader
  }
  }

</script>



