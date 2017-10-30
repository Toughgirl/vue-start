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
              财务管理
            </li>
            <li>
              已结算
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
                  <div class="col-lg-2 col-sm-6 font-bold text-danger form-group">账期采购总计：{{list.cashPurchAmount | currency}}元</div>
                  <div class="col-lg-2 col-sm-6 font-bold text-danger form-group">账期退货总计：{{list.monReturnAmount | currency}}元</div>
                  <div class="col-lg-2 col-sm-6 font-bold text-danger form-group">剩余货款总计：{{list.monPurchNoPayAmount | currency}}元</div>
                  <div class="col-lg-2 col-sm-6 font-bold text-danger form-group">现金采购总计：{{list.cashPurchAmount | currency}}元</div>
                  <div class="col-lg-2 col-sm-6 font-bold text-danger form-group">现金退货总计：{{list.cashReturnAmount | currency}}元</div>
                </div>
              </div>
              <div class="ibox-content">
                <div class="row">
                  <div class="form-group col-lg-4 col-md-12 col-xs-12 col-sm-12">
                    <div class="input-group">
                      <div class="input-group-addon">所属区域：</div>
                      <div class="form-control" style="padding: 0;border: none;">
                        <region-picker :province="region.province" :city="region.city" :district="region.district"
                                       :placeholder="{province: '选择省份', city: '选择市', district: '选择地区'}"
                                       @onchange="change">
                        </region-picker>
                        <input type="hidden" id="province1">
                        <input type="hidden" id="city1">
                        <input type="hidden" id="district1">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-lg-2 col-sm-12">
                    <div class="input-group">
                      <div class="input-group-addon">账期状态：</div>
                      <select class="form-control" id="monPayStatus">
                        <option value="">全部</option>
                        <option value="1">开启</option>
                        <option value="0">关闭</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group col-lg-2 col-sm-12">
                    <div class="input-group">
                      <div class="input-group-addon">公司状态：</div>
                      <select class="form-control" id="status">
                        <option value="">全部</option>
                        <option value="1">正常</option>
                        <option value="0">冻结</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group col-lg-2 col-sm-8 col-xs-12">
                    <input type="text" class="form-control" placeholder="请输入门店名称" id="storeName">
                  </div>
                  <div class="form-group col-lg-2 col-sm-4 col-xs-12">
                    <button class="btn btn-red" id="clearCondition">清除条件</button>
                    <button class="btn btn-info" id="searchList">查询</button>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="ibox-content" v-on:click="openImageProxy($event)">
                <div class="container-fluid">
                  <table id="DataTable" class="table  table-bordered" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                      <th>排行</th>
                      <th>门店编号</th>
                      <th>门店名称</th>
                      <th>账期采购总额（元）</th>
                      <th>账期退货总额（元）</th>
                      <th>剩余货款合计（元）</th>
                      <th>现金采购总额（元）</th>
                      <th>现金退货总额（元）</th>
                      <th>门店状态</th>
                      <th>账期状态</th>
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
  require('src/vuex/modules/financialManagement/SettledList.js')
  import HtmlFooter from 'src/components/footer.vue'
  import HtmlHeader from 'src/components/header.vue'
  import 'babel-polyfill';
  import RegionPicker from 'vue-region-picker'
  import store from 'src/vuex/store.js'
  import CHINA_REGION from 'china-area-data'
  import inspinia from 'src/assets/js/inspinia.js'
  import nav_active from 'src/assets/js/nav.js'
  Vue.use(RegionPicker, {
    region: CHINA_REGION,
    vueVersion: 2
  })
  export default {
    data(){
    return{
      list:"",
      region: {
        "province":["510000"],
        "city":[]
      }

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
        var SettlementId = $($html).attr("SettlementId");
        this.$router.replace({ path: '/SettledDetail_/' + SettlementId})
        event.stopPropagation();
      }
    }

  },
  mounted:function () {
    $(".province").css("max-width","130px");
    $(".city").css("max-width","130px");
    $(".district").css("max-width","140px");
    function clearCondition(){
      $("#status").val("");
      $("#storeName").val("");
      $("#district1").val("");
      $(".title").val("");
      $("#dateStart").val("");
      $("#dateEnd").val("");
      $(".district-select").val("");
    };
    $("#clearCondition").click(function(){
      clearCondition();
      searchList();
    });
    inspinia();
    nav_active();
    var self = this;
    //              运营商地址限制
    var param = new Object();
    param.access_token = store.state.user.access_token
    param.user_id = store.state.user.userId
    var json = JSON.stringify(param);
    $.ajax({
      url:store.state.baseUrl.data_serv_url+"/system/check_region",
      data:{parameter:json},
      type:"post",
      dataType:"json",
      success:function (data) {
        self.region1=data.hmac;
        self.region2=data.hmac.substr(0, 2)+'0000';
        var arr2=[self.region1];
        $(self.$data.region).attr("city",arr2);
        $("#city1").val(self.region1)
        $(".province-select").attr("disabled","disabled");
        $(".city-select").attr("disabled","disabled");
        DelayedLoading();
      },
      error:function () {

      }
    });
    var defer = $.Deferred();
    var DelayedLoading= function(defer){
      var total = function(){
        var param = new Object();
        param.access_token = store.state.user.access_token
        param.user_id = store.state.user.userId
        var json = JSON.stringify(param);
        $.ajax({
          url:store.state.baseUrl.data_serv_url+"/system/companySettlement/store_purc_ins_list_total",
          data:{parameter:json},
          type:"post",
          dataType:"json",
          success:function (data) {
            self.list = data.hmac
            self.list.cashPurchAmount=parseFloat(self.list.cashPurchAmount);
            self.list.cashReturnAmount=parseFloat(self.list.cashReturnAmount);
            self.list.monPurchAmount=parseFloat(self.list.monPurchAmount);
            self.list.monPurchNoPayAmount=parseFloat(self.list.monPurchNoPayAmount);
            self.list.monReturnAmount=parseFloat(self.list.monReturnAmount);
          },
          error:function () {

          }
        })
      }
      setTimeout(total,1);
      return defer;
    };
    $("#DataTable").dataTable({
      "bAutoWidth": false,
      "processing": true,
      "serverSide": true,//服务器分页
      "iDisplayLength": 10,//首次加载的数据条数
      "ajax": {
        //"url": "/SettlementList",
        "url": store.state.baseUrl.data_serv_url+"/system/companySettlement/store_purc_ins_list_page",
        "type": "POST",
        "dataSrc": "hmac.data",//默认data，也可以写其他的，格式化table的时候取里面的数据
        "data":function (d) {//d 是原始的发送给服务器的数据，默认很长。
          var param = new Object();
          param.access_token = store.state.user.access_token
          param.user_id = store.state.user.userId
          var storeName =$("#storeName").val();
          var status =$("#status").val();
          var monPayStatus =$("#monPayStatus").val();
          var regionId="";
          if($("#district1").val()==""){
            regionId=$("#city1").val();
          }else{
            regionId =$("#district1").val();
          }
          var request_parames = new Object();
          request_parames.start = d.start;
          request_parames.pageSize = d.length;
          request_parames.regionId = regionId;
          request_parames.status = status;
          request_parames.monPayStatus = monPayStatus;
          request_parames.keywords = storeName;
          param.request_parames=request_parames;
          var data = JSON.stringify(param);
          var obj = {};
          obj.parameter=data
          return obj;
        }



      },
      "columns": [
        {
          "data" : null,
          "render" : function(data, type, full, meta){
            return meta.row + 1 + meta.settings._iDisplayStart;
          }
        },
        { "data": "company_no" },
        { "data": "company_name" },
        {
          "data": "mon_purch_amount",//json
          "render": function (data,type,full,callback) {
            var mon_purch_amount=data.toFixed(2);
            return mon_purch_amount;
          }
        },
        {
          "data": "mon_return_amount",//json
          "render": function (data,type,full,callback) {
            var mon_return_amount=data.toFixed(2);
            return mon_return_amount;
          }
        },
        {
          "data": "mon_purch_no_pay_amount",//json
          "render": function (data,type,full,callback) {
            var mon_purch_no_pay_amount=data.toFixed(2);
            return mon_purch_no_pay_amount;
          }
        },
        {
          "data": "cash_purch_amount",//json
          "render": function (data,type,full,callback) {
            var cash_purch_amount=data.toFixed(2);
            return cash_purch_amount;
          }
        },
        {
          "data": "cash_return_amount",//json
          "render": function (data,type,full,callback) {
            var cash_return_amount=data.toFixed(2);
            return cash_return_amount;
          }
        },
        {
          "data": "status",//json
          "render": function (data,type,full,callback) {
            var status=data;
            if(status==0){
              status="冻结"
            }else if(status==1){
              status="正常"
            }
            return status;
          }
        },
        {
          "data": "mon_pay_status",//json
          "render": function (data,type,full,callback) {
            var mon_pay_status=data
            if(mon_pay_status==0){
              mon_pay_status="关闭"
            }else if(mon_pay_status==1){
              mon_pay_status="开启"
            }
            return mon_pay_status;
          }
        },
        //操作列
        {
          "data": "",//json
          "render": function (data,type,full,callback) {
            var datahtml='';
            datahtml+='<button class="btn btn-info btn-xs" SettlementId="'+full.company_id+'">详情</button>'
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
      $('#DataTable').DataTable().draw();
    }
  },
  components:{
    HtmlFooter,
      HtmlHeader
  },
  filters: {
    currency: function (value) {
      if (!value) return
      value = value.toFixed(2)
      return value
    }
  }
  }

</script>



