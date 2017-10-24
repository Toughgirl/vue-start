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
            <a href="#/SettledList_">结算管理</a>
          </li>
          <li>
            结算详情
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
              <h5>门店名称：{{list.company_name}}</h5>
            </div>
            <div class="ibox-content">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><label>结算单号：</label>
                    <span>{{list.company_settlement_num}}</span>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><label>采购总额：</label>
                    <span>{{list.payable_amount}}元</span>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><label>退货总额：</label>
                    <span>{{list.receive_amount}}元</span>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><label>滞纳金：</label>
                    <span>{{list.late_fee}}元</span>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><label>应付货款：</label>
                    <span v-if="list.YAmount"><span class="YAmount">{{list.YAmount}}</span>元</span>
                    <span v-else>0元</span>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><label>已付货款：</label>
                    <span v-if="list.pay_amount">{{list.pay_amount}}元</span>
                    <span v-else>0元</span>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><label>剩余货款：</label>
                    <span v-if="list.nopay">{{list.nopay}}</span>
                    <span v-else>0元</span>
                  </div>
                </div>
              </div>
            </div>
            <div id="payLog"></div>
            <div class="ibox-content">
              <h4>业务明细</h4>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" tab_="tab1" value="1" class="tab btn btn-white active">采购订单</button>
                <button type="button" tab_="tab2" value="2" class="tab btn btn-white">退货完成明细</button>
                <button type="button" tab_="tab3" value="3" class="tab btn btn-white">未结算退货明细</button>
              </div>
              <br><br>
              <div class="row tab_ tab1">
                <div class="form-group col-lg-5 col-md-12 col-sm-12">
                  <div class="row">
                    <label class="text-right col-lg-2 col-md-3 col-sm-12" style="line-height: 32px;width: 100px;">收货时间：</label>
                    <div  class="col-lg-9.5 col-md-9 col-sm-12" style="height: 32px;">
                      <div class="row">
                        <div class="form-group col-lg-5 col-sm-5 col-xs-5"><input type="text"style="height:32px;" class="Wdate form-control"  placeholder="选择开始时间" readonly="readonly" name="dateStart1" id="dateStart1" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'dateEnd1\')}'})"></div>
                        <div class="form-group col-lg-1 col-sm-1 col-xs-1 text-center" style="line-height:32px;">-</div>
                        <div class="form-group col-lg-5 col-sm-5 col-xs-5"><input type="text" style="height:32px;" class="Wdate form-control"  placeholder="选择结束时间" readonly="readonly" name="dateEnd1" id="dateEnd1" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'dateStart1\')}'})"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group col-lg-2 col-md-2 col-sm-6 col-xs-12">
                  <input type="text" class="form-control" placeholder="输入采购单号进行搜索" id="storeName1">
                </div>
                <div class="form-group col-lg-2 col-md-3 col-sm-6 col-xs-12">
                  <button class="btn btn-red" id="clearCondition1">清除条件</button>
                  <button class="btn btn-info" id="searchList1">查询</button>
                </div>
                <div class="form-group col-lg-2 col-md-2 col-sm-4 col-xs-6">
                  <div class="" style="line-height: 32px;" v-if="list_">采购总额：{{list_}}元</div>
                  <div class="" style="line-height: 32px;" v-else>采购总额：0元</div>
                </div>
                <div class="form-group col-lg-1 col-md-1 col-sm-4 col-xs-6">
                  <button class="btn btn-info text-right" id="export1">导出</button>
                </div>
              </div>
              <div class="row tab_ tab2" style="display: none;">
                <div class="form-group col-lg-5 col-md-12 col-sm-12">
                  <div class="row">
                    <label class="text-right col-lg-2 col-md-3 col-sm-12" style="line-height: 32px;width: 100px;">完成时间：</label>
                    <div  class="col-lg-9.5 col-md-9 col-sm-12" style="height: 32px;">
                      <div class="row">
                        <div class="form-group col-lg-5 col-sm-5 col-xs-5"><input type="text"style="height:32px;" class="Wdate form-control"  placeholder="选择开始时间" readonly="readonly" name="dateStart2" id="dateStart2" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'dateEnd2\')}'})"></div>
                        <div class="form-group col-lg-1 col-sm-1 col-xs-1 text-center" style="line-height:32px;">-</div>
                        <div class="form-group col-lg-5 col-sm-5 col-xs-5"><input type="text" style="height:32px;" class="Wdate form-control"  placeholder="选择结束时间" readonly="readonly" name="dateEnd2" id="dateEnd2" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'dateStart2\')}'})"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group col-lg-2 col-md-2 col-sm-6 col-xs-12">
                  <input type="text" class="form-control" placeholder="输入退货单号进行搜索" id="storeName2">
                </div>
                <div class="form-group col-lg-2 col-md-3 col-sm-6 col-xs-12">
                  <button class="btn btn-red" id="clearCondition2">清除条件</button>
                  <button class="btn btn-info" id="searchList2">查询</button>
                </div>
                <div class="form-group col-lg-2 col-md-2 col-sm-4 col-xs-6">
                  <div class="" style="line-height: 32px;" v-if="list_">已退货总额：{{list_}}元</div>
                  <div class="" style="line-height: 32px;" v-else>已退货总额：0元</div>
                </div>
                <div class="form-group col-lg-1 col-md-1 col-sm-4 col-xs-6">
                  <button class="btn btn-info text-right" id="export2">导出</button>
                </div>
              </div>
              <div class="row tab_ tab3" style="display: none;">
                <div class="form-group col-lg-5 col-md-12 col-sm-12">
                  <div class="row">
                    <label class="text-right col-lg-2 col-md-3 col-sm-12" style="line-height: 32px;width: 100px;">提交时间：</label>
                    <div  class="col-lg-9.5 col-md-9 col-sm-12" style="height: 32px;">
                      <div class="row">
                        <div class="form-group col-lg-5 col-sm-5 col-xs-5"><input type="text"style="height:32px;" class="Wdate form-control"  placeholder="选择开始时间" readonly="readonly" name="dateStart3" id="dateStart3" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'dateEnd3\')}'})"></div>
                        <div class="form-group col-lg-1 col-sm-1 col-xs-1 text-center" style="line-height:32px;">-</div>
                        <div class="form-group col-lg-5 col-sm-5 col-xs-5"><input type="text" style="height:32px;" class="Wdate form-control"  placeholder="选择结束时间" readonly="readonly" name="dateEnd3" id="dateEnd3" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'dateStart3\')}'})"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group col-lg-2 col-md-2 col-sm-6 col-xs-12">
                  <input type="text" class="form-control" placeholder="输入退货单号进行搜索" id="storeName3">
                </div>
                <div class="form-group col-lg-2 col-md-3 col-sm-6 col-xs-12">
                  <button class="btn btn-red" id="clearCondition3">清除条件</button>
                  <button class="btn btn-info" id="searchList3">查询</button>
                </div>
                <div class="form-group col-lg-2 col-md-2 col-sm-4 col-xs-6">
                  <div class="" style="line-height: 32px;" v-if="list_">退货中总额：{{list_}}元</div>
                  <div class="" style="line-height: 32px;" v-else>退货中总额：0元</div>
                </div>
                <div class="form-group col-lg-1 col-md-1 col-sm-4 col-xs-6">
                  <button class="btn btn-info text-right" id="export3">导出</button>
                </div>
              </div>
              <br>
              <div class="clearfix"></div>
              <table class="table tab_ table-bordered tab1" width="100%" id="settledDetail1">
                <thead>
                <tr>
                  <th>采购单号</th>
                  <th>商品名称</th>
                  <th>适用车型</th>
                  <th>流通渠道</th>
                  <th>商品数量</th>
                  <th>商品总额</th>
                  <th>收货时间</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <table class="table tab_ table-bordered tab2" width="100%" id="settledDetail2" style="display: none;">
                <thead>
                <tr>
                  <th>退货单号</th>
                  <th>商品名称</th>
                  <th>适用车型</th>
                  <th>流通渠道</th>
                  <th>商品数量</th>
                  <th>商品总额</th>
                  <th>申请时间</th>
                  <th>完成时间</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <table class="table tab_ table-bordered tab3" width="100%" id="settledDetail3" style="display: none;">
                <thead>
                <tr>
                  <th>退货单号</th>
                  <th>商品名称</th>
                  <th>适用车型</th>
                  <th>流通渠道</th>
                  <th>商品数量</th>
                  <th>商品总额</th>
                  <th>申请时间</th>
                  <th>退货状态</th>
                  <th>完成时间</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
            <div class="ibox-content">
              <div class="form-group">
                <a href="#/SettledList_">
                  <button class="btn btn-white">返回</button>
                </a>
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
    import HtmlFooter from 'src/components/footer.vue'
    import HtmlHeader from 'src/components/header.vue'
    import 'babel-polyfill';
    import store from 'src/vuex/store.js'
    import inspinia from 'src/assets/js/inspinia.js'
    import nav_active from 'src/assets/js/nav.js'
    import laypage from 'laypage'
    let Base64 = require('js-base64').Base64;
    export default {
        data(){
          return{
            list:"",
            list_:"",
            list1:"",
            }
        },
        computed: mapState({ user: state => state.user }),
        methods: {
                    ...mapActions([USER_SIGNOUT]),
                    logOut() {
                        this.USER_SIGNOUT()
        				        this.$router.replace({ path: '/login' })
                    },
        },
        mounted:function () {
          inspinia();
          nav_active();
          //          菜单切换
          $(".tab").click(function(){
            $(".tab").removeClass("active");
            $(this).addClass("active");
            var $tab = $(this).attr("tab_");
            $(".tab_").hide();
            $("."+$tab).show();
            var value= $(this).attr("value");
            $(".dataTables_wrapper").hide();
            $("#settledDetail"+value+"_wrapper").show();
            $('#settledDetail'+value).DataTable().draw();
            if(value==1){
              total1();
            }
            if(value==2){
              total2();
            }
            if(value==3){
              total3();
            }
          });

        //非列表
          var self = this;
          var param = new Object();
          param.access_token = store.state.user.access_token;
          param.user_id = store.state.user.userId;
          var request_parames = new Object();
          var $href = (window.location.href).split("/");
          var id= $href[$href.length-1];
          request_parames.id = id;
          param.request_parames=request_parames;
          var json = JSON.stringify(param);
          $.ajax({
            url:store.state.baseUrl.data_serv_url+"/system/companySettlement/detail",
            data:{parameter:json},
            type:"post",
            dataType:"json",
            success:function (data) {
              self.list = eval('(' + data.hmac + ')')
              var format = function(time, format){
                var t = new Date(time);
                var tf = function(i){return (i < 10 ? '0' : '') + i};
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                  switch(a){
                    case 'yyyy':
                      return tf(t.getFullYear());
                      break;
                    case 'MM':
                      return tf(t.getMonth() + 1);
                      break;
                    case 'mm':
                      return tf(t.getMinutes());
                      break;
                    case 'dd':
                      return tf(t.getDate());
                      break;
                    case 'HH':
                      return tf(t.getHours());
                      break;
                    case 'ss':
                      return tf(t.getSeconds());
                      break;
                  };
                });
              };
              if(self.list.pay_date == null){
                self.list.pay_date="无";
              }else{
                self.list.pay_date = format(self.list.pay_date, 'yyyy-MM-dd HH:mm:ss');
              }


            },
            error:function () {

            }
          });
//支付方式
          $.ajax({
            url:store.state.baseUrl.data_serv_url+"/system/companySettlement/paymentHistory",
            data:{parameter:json},
            type:"post",
            dataType:"json",
            success:function (data) {
              self.list1 = eval('(' + data.hmac + ')');
              self.list2 = self.list1.list;
              var data_html='<div class="ibox-content"><h4>结款信息</h4><br><div class="container-fluid"><div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
              if(self.list1.money>0){
                for (var i=0;i<self.list2.length;i++){
                  data_html +='<div style="margin-bottom: 10px;"><div class="col-md-2">结款时间：'+self.list2[i].pay_time+'</div>';
                  data_html +='<div class="col-lg-offset-1 col-md-2">结款金额：'+self.list2[i].amount+'元</div>';
                  if(self.list2[i].pay_method==9){
                    data_html +='<div class="col-lg-offset-1 col-md-4">结款方式：由结算单<span class="text-navy">'+self.list2[i].pay_settlement_num+'</span>退款系统自动抵扣</div><div class="clearfix"></div></div>';
                  }else{
                    data_html +='<div class="col-lg-offset-1 col-md-4">结款方式：'+self.list2[i].method+'</div><div class="clearfix"></div></div>';
                  }
                }
                data_html +=' </div></div></div></div>';
              }else{
                  data_html +='<div style="margin-bottom: 10px;">';
                for (var i=0;i<self.list2.length;i++){
                  if(self.list2[i].pay_method==9){
                    data_html +='<div class="col-md-12">结款时间：'+self.list2[i].pay_time+'抵扣结算单<span class="text-navy">'+self.list2[i].pay_settlement_num+'</span>货款<span class="text-danger">'+self.list2[i].amount+'</span>元</div></div>';
                  }else if(self.list2[i].pay_method==1&&self.list2[i].money<0){
                    data_html +='<div class="col-md-12">结款时间：'+self.list2[i].pay_time+'退货钱包<span class="text-danger">'+self.list2[i].amount+'</span>元</div></div>';
                  }
                }
                data_html +=' </div></div></div></div>';
              }
              if(self.list2.length>0){
                $("#payLog").html(data_html);
              }
            },
            error:function () {

            }
          });



          table1();
          table2();
          table3();
          total1();
          $("#settledDetail2_wrapper").hide();
          $("#settledDetail3_wrapper").hide();

        //列表
          function table1(){
            $("#settledDetail1").dataTable({
              "bAutoWidth": false,
              "processing": true,
              "serverSide": true,//服务器分页
              "iDisplayLength": 10,//首次加载的数据条数
              "ajax": {
                "url": store.state.baseUrl.data_serv_url+"/system/companySettlement/pages1",
                "type": "POST",
                "dataSrc": "hmac.data",
                "data":function (d) {
                  var param = new Object();
                  param.access_token = store.state.user.access_token
                  param.user_id = store.state.user.userId
                  var settleNo =$("#storeName1").val();
                  var startTime =$("#dateStart1").val();
                  var endTime =$("#dateEnd1").val();
                  var request_parames = new Object();
                  request_parames.settleNo = settleNo;
                  request_parames.startTime = startTime;
                  request_parames.start = endTime;
                  request_parames.start = d.start;
                  request_parames.pageSize = d.length;
                  var $href = (window.location.href).split("/");
                  var id= $href[$href.length-1];
                  request_parames.id = id;
                  param.request_parames=request_parames;
                  var data = JSON.stringify(param);
                  var obj = {};
                  obj.parameter=data
                  return obj;
                }



              },
              "columns": [
                { "data": "onum" },
                { "data": "pname" },
                {
                  "data": "car_class_name",//json
                  "render": function (data,type,full,callback) {
                    var datahtml='';
                    if(data!=null){
                      datahtml+=data;
                    }else{
                      datahtml+="--";
                    }
                    return datahtml;
                  }
                },
                {
                  "data": "product_channel",//json
                  "render": function (data,type,full,callback) {
                    var datahtml='';
                    if(data!=0){
                      datahtml+=data;
                    }else{
                      datahtml+="--";
                    }
                    return datahtml;
                  }
                },
                { "data": "quantity" },
                {
                  "data": "amount",//json
                  "render": function (data,type,full,callback) {
                    var amount=data.toFixed(2);
                    return amount
                  }
                },
                { "data": "atime" }


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
          }
          function table2(){
            //        列表2
            $("#settledDetail2").dataTable({
              "bAutoWidth": false,
              "processing": true,
              "serverSide": true,//服务器分页
              "iDisplayLength": 10,//首次加载的数据条数
              "ajax": {
                "url": store.state.baseUrl.data_serv_url+"/system/companySettlement/pages2",
                "type": "POST",
                "dataSrc": "hmac.data",
                "data":function (d) {
                  var param = new Object();
                  param.access_token = store.state.user.access_token
                  param.user_id = store.state.user.userId
                  var settleNo =$("#storeName2").val();
                  var startTime =$("#dateStart2").val();
                  var endTime =$("#dateEnd2").val();
                  var request_parames = new Object();
                  request_parames.settleNo = settleNo;
                  request_parames.startTime = startTime;
                  request_parames.start = endTime;
                  request_parames.start = d.start;
                  request_parames.pageSize = d.length;
                  var $href = (window.location.href).split("/");
                  var id= $href[$href.length-1];
                  request_parames.id = id;
                  param.request_parames=request_parames;
                  var data = JSON.stringify(param);
                  var obj = {};
                  obj.parameter=data
                  return obj;
                }



              },
              "columns": [
                { "data": "onum" },
                { "data": "pname" },
                {
                  "data": "car_class_name",//json
                  "render": function (data,type,full,callback) {
                    var datahtml='';
                    if(data!=null){
                      datahtml+=data;
                    }else{
                      datahtml+="--";
                    }
                    return datahtml;
                  }
                },
                {
                  "data": "product_channel",//json
                  "render": function (data,type,full,callback) {
                    var datahtml='';
                    if(data!=0){
                      datahtml+=data;
                    }else{
                      datahtml+="--";
                    }
                    return datahtml;
                  }
                },
                { "data": "quantity" },
                {
                  "data": "amount",//json
                  "render": function (data,type,full,callback) {
                    var amount=data.toFixed(2);
                    return amount
                  }
                },
                { "data": "ctime" },
                { "data": "atime" }


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
          }
          function table3(){
//            列表3
          $("#settledDetail3").dataTable({
              "bAutoWidth": false,
              "processing": true,
              "serverSide": true,//服务器分页
              "iDisplayLength": 10,//首次加载的数据条数
              "ajax": {
                "url": store.state.baseUrl.data_serv_url+"/system/companySettlement/pages3",
                "type": "POST",
                "dataSrc": "hmac.data",
                "data":function (d) {
                  var param = new Object();
                  param.access_token = store.state.user.access_token
                  param.user_id = store.state.user.userId
                  var settleNo =$("#storeName3").val();
                  var startTime =$("#dateStart3").val();
                  var endTime =$("#dateEnd3").val();
                  var request_parames = new Object();
                  request_parames.settleNo = settleNo;
                  request_parames.startTime = startTime;
                  request_parames.start = endTime;
                  request_parames.start = d.start;
                  request_parames.pageSize = d.length;
                  var $href = (window.location.href).split("/");
                  var id= $href[$href.length-1];
                  request_parames.id = id;
                  param.request_parames=request_parames;
                  var data = JSON.stringify(param);
                  var obj = {};
                  obj.parameter=data
                  return obj;
                }



              },
              "columns": [
                { "data": "onum" },
                { "data": "pname" },
                {
                  "data": "car_class_name",//json
                  "render": function (data,type,full,callback) {
                    var datahtml='';
                    if(data!=null){
                      datahtml+=data;
                    }else{
                      datahtml+="--";
                    }
                    return datahtml;
                  }
                },
                {
                  "data": "product_channel",//json
                  "render": function (data,type,full,callback) {
                    var datahtml='';
                    if(data!=0){
                      datahtml+=data;
                    }else{
                      datahtml+="--";
                    }
                    return datahtml;
                  }
                },
                { "data": "quantity" },
                {
                  "data": "amount",//json
                  "render": function (data,type,full,callback) {
                    var amount=data.toFixed(2);
                    return amount
                  }
                },
                { "data": "atime" },
                { "data": "STATUS" },
                {"data": "sdate"}
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
          }
//        统计
          function total1(){
            var param = new Object();
            param.access_token = store.state.user.access_token;
            param.user_id = store.state.user.userId;
            var settleNo =$("#storeName1").val();
            var startTime =$("#dateStart1").val();
            var endTime =$("#dateEnd1").val();
            var tag = 1;
            var request_parames = new Object();
            var $href = (window.location.href).split("/");
            var id= $href[$href.length-1];
            request_parames.id = id;
            request_parames.tag = tag;
            request_parames.settleNo = settleNo;
            request_parames.startTime = startTime;
            request_parames.start = endTime;
            param.request_parames=request_parames;
            var json = JSON.stringify(param);
            $.ajax({
              url:store.state.baseUrl.data_serv_url+"/system/companySettlement/totals",
              data:{parameter:json},
              type:"post",
              dataType:"json",
              success:function (data) {
//                console.log(data)

                self.list_ = eval('(' + data.hmac + ')')
//                console.log(self.list_)
              },
              error:function () {

              }
            });
          }
          function total2(){
            var param = new Object();
            param.access_token = store.state.user.access_token;
            param.user_id = store.state.user.userId;
            var settleNo =$("#storeName2").val();
            var startTime =$("#dateStart2").val();
            var endTime =$("#dateEnd2").val();
            var tag = 2;
            var request_parames = new Object();
            var $href = (window.location.href).split("/");
            var id= $href[$href.length-1];
            request_parames.id = id;
            request_parames.tag = tag;
            request_parames.settleNo = settleNo;
            request_parames.startTime = startTime;
            request_parames.start = endTime;
            param.request_parames=request_parames;
            var json = JSON.stringify(param);
            $.ajax({
              url:store.state.baseUrl.data_serv_url+"/system/companySettlement/totals",
              data:{parameter:json},
              type:"post",
              dataType:"json",
              success:function (data) {
                self.list_ = eval('(' + data.hmac + ')')
              },
              error:function () {

              }
            });
          }
          function total3(){
            var param = new Object();
            param.access_token = store.state.user.access_token;
            param.user_id = store.state.user.userId;
            var settleNo =$("#storeName3").val();
            var startTime =$("#dateStart3").val();
            var endTime =$("#dateEnd3").val();
            var tag = 3;
            var request_parames = new Object();
            var $href = (window.location.href).split("/");
            var id= $href[$href.length-1];
            request_parames.id = id;
            request_parames.tag = tag;
            request_parames.settleNo = settleNo;
            request_parames.startTime = startTime;
            request_parames.start = endTime;
            param.request_parames=request_parames;
            var json = JSON.stringify(param);
            $.ajax({
              url:store.state.baseUrl.data_serv_url+"/system/companySettlement/totals",
              data:{parameter:json},
              type:"post",
              dataType:"json",
              success:function (data) {
                self.list_ = eval('(' + data.hmac + ')')
              },
              error:function () {

              }
            });
          }
//清空搜索1
          function clearCondition1(){
            $("#storeName1").val("");
            $("#dateStart1").val("");
            $("#dateEnd1").val("");
          };
          $("#clearCondition1").click(function(){
            clearCondition1();
            total1()
            $('#settledDetail1').DataTable().draw();
          });
          $("#searchList1").click(function(){
            total1()
            $('#settledDetail1').DataTable().draw();
          });
//清空搜索2
          function clearCondition2(){
            $("#storeName2").val("");
            $("#dateStart2").val("");
            $("#dateEnd2").val("");
          };
          $("#clearCondition2").click(function(){
            clearCondition2();
            total2()
            $('#settledDetail2').DataTable().draw();
          });
          $("#searchList2").click(function(){
            total2()
            $('#settledDetail2').DataTable().draw();
          });
//清空搜索3
          function clearCondition3(){
            $("#storeName3").val("");
            $("#dateStart3").val("");
            $("#dateEnd3").val("");
          };
          $("#clearCondition3").click(function(){
            clearCondition3();
            total3()
            $('#settledDetail3').DataTable().draw();
          });
          $("#searchList3").click(function(){
            total3()
            $('#settledDetail3').DataTable().draw();
          });

//          导出
          function _export(tag){
            var param = new Object();
            param.access_token = store.state.user.access_token;
            param.user_id = store.state.user.userId;
            var request_parames = new Object();
            var $href = (window.location.href).split("/");
            var id= $href[$href.length-1];
            var tag = tag;
            request_parames.id = id;
            request_parames.tag = tag;
            param.request_parames=request_parames;
            var json = Base64.encode(JSON.stringify(param));
            window.location.href=store.state.baseUrl.data_serv_url+"/system/companySettlement/export?parameter="+json;
          }
          $("#export1").click(function(){
            _export(1);
          })
          $("#export2").click(function(){
            _export(2);
          })
          $("#export3").click(function(){
            _export(3);
          })
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



