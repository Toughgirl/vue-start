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
              <a href="#/statisticsList">门店应付款统计</a>
            </li>
            <li>
              门店应付款统计详情
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
                <h5>{{list.companyName}}</h5>
              </div>
              <div class="ibox-content">
                <div class="row">
                  <div class="form-group col-lg-2 col-md-6 col-sm-4 col-xs-12">
                    <div class="input-group">
                      <div class="input-group-addon">状态：</div>
                      <select class="form-control" id="status">
                        <option value="">请选择支付状态</option>
                        <option value="200">已支付</option>
                        <option value="150">支付中</option>
                        <option value="100">待支付</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group col-lg-5 col-md-8 col-sm-8 col-xs-12">
                    <div class="input-group">
                      <div class="input-group-addon">下单时间：</div>
                      <div style="width: 100%;float: left;height: 32px;">
                        <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                               placeholder="选择开始时间" readonly="readonly" name="dateStart" id="dateStart"
                               onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'dateEnd\')}'})">
                        <span style="float: left;width: 4%;margin: 0 1%;text-align: center;line-height: 32px;">--</span>
                        <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                               placeholder="选择结束时间" readonly="readonly" name="dateEnd" id="dateEnd"
                               onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'dateStart\')}'})">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-lg-3 col-md-6 col-sm-8 col-xs-12">
                    <input class="form-control" placeholder="请输入结算单号进行搜索" id="storeName">
                  </div>
                  <div class="form-group col-lg-2 col-md-4 col-sm-4 col-xs-12">
                    <button class="btn btn-red" id="clearCondition">清除条件</button>
                    <button class="btn btn-info" id="searchList">查询</button>
                  </div>
                </div>
              </div>
              <div class="ibox-content">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-6 font-bold text-danger">
                    <span v-if="list.tamount">应付货款：{{list.tamount}}</span>
                    <span v-else>应付货款：0.00</span>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 font-bold text-danger">
                    <span v-if="list.tamount">滞纳金：{{list.tlate}}</span>
                    <span v-else>滞纳金：0.00</span>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 font-bold text-danger">
                    <span v-if="list.payAmount">实付款：{{list.payAmount}}</span>
                    <span v-else>实付款：0.00</span>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 font-bold text-danger">
                    <span v-if="list.noPayAmount">应付余额：{{list.noPayAmount}}</span>
                    <span v-else>应付余额：0.00</span>
                  </div>
                </div>
              </div>
              <div class="ibox-content">
                <div class="container-fluid">
                  <table id="DataTable" class="table  table-bordered" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                      <th>结算单号</th>
                      <th>应付货款（元）</th>
                      <th>滞纳金（元）</th>
                      <th>实付款（元）</th>
                      <th>应付余额（元）</th>
                      <th>结算日期</th>
                      <th>支付状态</th>
                    </tr>
                    </thead>
                  </table>
                </div>
              </div>
              <div class="ibox-content">
                <div class="form-group">
                  <a href="#/statisticsList"><button class="btn btn-white">返回</button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HtmlFooter></HtmlFooter>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { mapState } from 'vuex'
  import { mapActions } from 'vuex'
  import { USER_SIGNOUT } from 'src/store/user/login'
  import HtmlFooter from 'src/components/footer.vue'
  import HtmlHeader from 'src/components/header.vue'
  import 'babel-polyfill';
  import store from 'src/vuex/store.js'
  import inspinia from 'src/assets/js/inspinia.js'
  import nav_active from 'src/assets/js/nav.js'
  export default {
    data(){
    return{
      list:"",
    }
  },
  computed: mapState({ user: state => state.user }),
  methods: {
  ...mapActions([USER_SIGNOUT]),
      logOut() {
      this.USER_SIGNOUT()
      this.$router.replace({ path: '/login' })
    }
  },
  mounted:function () {
    inspinia();
    nav_active();
//    清空条件
    $("#clearCondition").click(function(){
      clearCondition();
      searchList();
    });
    function clearCondition(){
      $("#status").val("");
      $("#storeName").val("");
      $("#dateStart").val("");
      $("#dateEnd").val("");
    };
    //非列表
    var self = this;
    var param = new Object();
    param.access_token = store.state.user.access_token
    param.user_id = store.state.user.userId
    var status =$("#status").val();
    var storeName =$("#storeName").val();
    var startTime =$("#dateStart").val();
    var endTime =$("#dateEnd").val();
    var $href = (window.location.href).split("/")
    var companyId= $href[$href.length-1];
    var request_parames = new Object();
    request_parames.companyId = companyId;
    request_parames.status = status;
    request_parames.keywords = storeName;
    request_parames.startTime = startTime;
    request_parames.endTime = endTime;
    param.request_parames=request_parames;
    var json = JSON.stringify(param);
    $.ajax({
      url:store.state.baseUrl.data_serv_url+"/system/companySettlement/settlementTotal2",
      data:{parameter:json},
      type:"post",
      dataType:"json",
      success:function (data) {
        self.list = data.hmac;
      },
      error:function () {

      }
    });
    //列表组
    $("#DataTable").dataTable({
      "bAutoWidth": false,
      "processing": true,
      "serverSide": true,//服务器分页
      "iDisplayLength": 10,//首次加载的数据条数
      "ajax": {
        "url": store.state.baseUrl.data_serv_url+"/system/companySettlement/settlementPage2",
        "type": "POST",
        "dataSrc": "hmac.data",
        "data":function (d) {//d 是原始的发送给服务器的数据，默认很长。
          var param = new Object();
          param.access_token = store.state.user.access_token
          param.user_id = store.state.user.userId
          var status =$("#status").val();
          var storeName =$("#storeName").val();
          var startTime =$("#dateStart").val();
          var endTime =$("#dateEnd").val();
          var $href = (window.location.href).split("/")
          var companyId= $href[$href.length-1];
          var request_parames = new Object();
          request_parames.companyId  = companyId;
          request_parames.start  = d.start;
          request_parames.pageSize = d.length;
          request_parames.status = status;
          request_parames.keywords = storeName;
          request_parames.startTime = startTime;
          request_parames.endTime = endTime;
          param.request_parames=request_parames;
          var data = JSON.stringify(param);
          var obj = {};
          obj.parameter=data
          return obj;
        }



      },
      "columns": [
        { "data": "company_settlement_num" },
        {
          "data": "amount",//json
          "render": function (data,type,full,callback) {
            var amount=data.toFixed(2);
            return amount
          }
        },
        {
          "data": "late_fee",//json
          "render": function (data,type,full,callback) {
            var late_fee=data.toFixed(2);
            return late_fee
          }
        },
        {
          "data": "payMoeny",//json
          "render": function (data,type,full,callback) {
            var payMoeny=data.toFixed(2);
            return payMoeny
          }
        },
        {
          "data": "noPayMoeny",//json
          "render": function (data,type,full,callback) {
            var noPayMoeny=data.toFixed(2);
            return noPayMoeny
          }
        },
        { "data": "sett_date" },
        { "data": "status" }
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
    function searchList() {
      $('#DataTable').DataTable().draw();
      var param = new Object();
      param.access_token = store.state.user.access_token
      param.user_id = store.state.user.userId
      var status =$("#status").val();
      var storeName =$("#storeName").val();
      var startTime =$("#dateStart").val();
      var endTime =$("#dateEnd").val();
      var $href = (window.location.href).split("/")
      var companyId= $href[$href.length-1];
      var request_parames = new Object();
      request_parames.companyId = companyId;
      request_parames.status = status;
      request_parames.keywords = storeName;
      request_parames.startTime = startTime;
      request_parames.endTime = endTime;
      param.request_parames=request_parames;
      var json = JSON.stringify(param);
      $.ajax({
        url:store.state.baseUrl.data_serv_url+"/system/companySettlement/settlementTotal2",
        data:{parameter:json},
        type:"post",
        dataType:"json",
        success:function (data) {
          self.list = data.hmac;
        },
        error:function () {

        }
      });
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
    },
    unescape:function (value) {
      if (!value) return
      value = value.replace(/&gt;/g, ">")
      return value
    }
  }

  }

</script>



