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
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><label>门店名称：</label>
                    <span>{{list.companyName}}</span>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><label>门店编号：</label>
                    <span>{{list.companyNo}}</span>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><label>加盟日期：</label>
                    <span>{{list.createTime}}</span>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><label>负责人：</label>
                    <span>{{list.adminName}}</span>
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><label>联系电话：</label>
                    <span>{{list.number}}</span>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><label>联系地址：</label>
                    <span>{{list.address}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="ibox-content">
              <div class="isAccount"></div>
              <br><br>
              <div class="tab_ tab0">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-3 col-sm-6 font-bold text-danger form-group">采购总计：<span v-if="list1.receive_total">{{list1.receive_total | currency}}</span><span v-else>0.00</span>元</div>
                    <div class="col-lg-3 col-sm-6 font-bold text-danger form-group">退货总计：<span v-if="list1.return_total">{{list1.return_total | currency}}</span><span v-else>0.00</span>元</div>
                    <div class="col-lg-3 col-sm-6 font-bold text-danger form-group">应付货款总计：<span v-if="list1.amount_total">{{list1.amount_total | currency}}</span><span v-else>0.00</span>元</div>
                    <div class="col-lg-3 col-sm-6 font-bold text-danger form-group">剩余货款总计：<span v-if="list1.no_pay_total">{{list1.no_pay_total | currency}}</span><span v-else>0.00</span>元</div>
                    <div class="form-group col-lg-5 col-md-12 col-sm-12">
                      <div class="row">
                        <div class="input-group">
                          <div class="input-group-addon">结算时间：</div>
                          <div style="width: 100%;float: left;height: 32px;">
                            <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                                   placeholder="选择开始时间" readonly="readonly" name="dateStart0" id="dateStart0"
                                   onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'dateEnd0\')}'})">
                            <span style="float: left;width: 4%;margin: 0 1%;text-align: center;line-height: 32px;">-</span>
                            <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                                   placeholder="选择结束时间" readonly="readonly" name="dateEnd0" id="dateEnd0"
                                   onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'dateStart0\')}'})">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-lg-2 col-sm-12">
                      <div class="input-group">
                        <div class="input-group-addon">支付状态：</div>
                        <select class="form-control" id="status0">
                          <option value="">全部</option>
                          <option value="100">待支付</option>
                          <option value="150">部分支付</option>
                          <option value="200">已支付</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group col-lg-2 col-md-3 col-sm-6 col-xs-12">
                      <button class="btn btn-red" id="clearCondition0">清除条件</button>
                      <button class="btn btn-info" id="searchList0">查询</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class=" tab_ tab1" style="display: none;">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-12 col-sm-12 font-bold text-danger form-group">总额总计：<span v-if="list_.total_amount">{{list_.total_amount | currency}}</span><span v-else>0.00</span>元</div>
                    <div class="form-group col-lg-5 col-md-12 col-sm-12">
                      <div class="row">
                      <select class="form-control" id="timeType1" style="width:20%;float: left;height: 32px;">
                        <option value="2">下单时间</option>
                        <option value="1" selected>完成时间</option>
                      </select>
                      <div style="width: 80%;float: left;height: 32px;">
                        <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                               placeholder="选择开始时间" readonly="readonly" name="dateStart1" id="dateStart1"
                               onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'dateEnd1\')}'})">
                        <span style="float: left;width: 4%;margin: 0 1%;text-align: center;line-height: 32px;">-</span>
                        <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                               placeholder="选择结束时间" readonly="readonly" name="dateEnd1" id="dateEnd1"
                               onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'dateStart1\')}'})">
                      </div>
                      </div>
                    </div>
                    <div class="form-group col-lg-2 col-sm-12">
                      <div class="input-group">
                        <div class="input-group-addon">状态：</div>
                        <select class="form-control" id="status1">
                          <option value="">全部</option>
                          <option value="1">已完成</option>
                          <option value="0">待发货</option>
                          <option value="0">待收货</option>
                        </select>
                      </div>
                    </div>
                    <div class=" col-lg-2 col-sm-8 col-xs-12">
                      <input type="text" class="form-control" placeholder="输入采购单号/商品名称" id="storeName1">
                    </div>
                    <div class="form-group col-lg-2 col-md-3 col-sm-6 col-xs-12">
                      <button class="btn btn-red clearCondition" id="clearCondition1" data-clear="1">清除条件</button>
                      <button class="btn btn-info searchList" id="searchList1" data-search="1">查询</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class=" tab_ tab2" style="display: none;">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-12 col-sm-12 font-bold text-danger form-group">总额总计：<span v-if="list_.total_amount">{{list_.total_amount | currency}}</span><span v-else>0.00</span>元</div>
                    <div class="form-group col-lg-5 col-md-12 col-sm-12">
                      <div class="row">
                        <select class="form-control" id="timeType2" style="width:20%;float: left;height: 32px;">
                          <option value="1" selected>完成时间</option>
                          <option value="2">提交时间</option>
                        </select>
                        <div style="width: 80%;float: left;height: 32px;">
                          <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                                 placeholder="选择开始时间" readonly="readonly" name="dateStart2" id="dateStart2"
                                 onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'dateEnd2\')}'})">
                          <span style="float: left;width: 4%;margin: 0 1%;text-align: center;line-height: 32px;">-</span>
                          <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                                 placeholder="选择结束时间" readonly="readonly" name="dateEnd2" id="dateEnd2"
                                 onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'dateStart2\')}'})">
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-lg-2 col-sm-12">
                      <div class="input-group">
                        <div class="input-group-addon">状态：</div>
                        <select class="form-control" id="status2">
                          <option value="">全部</option>
                          <option value="1">已完成</option>
                          <option value="0">处理中</option>
                        </select>
                      </div>
                    </div>
                    <div class=" col-lg-2 col-sm-8 col-xs-12">
                      <input type="text" class="form-control" placeholder="请输入退货单号/商品名称" id="storeName2">
                    </div>
                    <div class="form-group col-lg-2 col-md-3 col-sm-6 col-xs-12">
                      <button class="btn btn-red clearCondition" id="clearCondition2" data-clear="2">清除条件</button>
                      <button class="btn btn-info searchList" id="searchList2" data-search="2">查询</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class=" tab_ tab3" style="display: none;">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-12 col-sm-12 font-bold text-danger form-group">总额总计：<span v-if="list_.total_amount">{{list_.total_amount | currency}}</span><span v-else>0.00</span>元</div>
                    <div class="form-group col-lg-5 col-md-12 col-sm-12">
                      <div class="row">
                        <select class="form-control" id="timeType3" style="width:20%;float: left;height: 32px;">
                          <option value="2">下单时间</option>
                          <option value="1" selected>完成时间</option>
                        </select>
                        <div style="width: 80%;float: left;height: 32px;">
                          <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                                 placeholder="选择开始时间" readonly="readonly" name="dateStart3" id="dateStart3"
                                 onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'dateEnd3\')}'})">
                          <span style="float: left;width: 4%;margin: 0 1%;text-align: center;line-height: 32px;">-</span>
                          <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                                 placeholder="选择结束时间" readonly="readonly" name="dateEnd3" id="dateEnd3"
                                 onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'dateStart3\')}'})">
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-lg-2 col-sm-12">
                      <div class="input-group">
                        <div class="input-group-addon">状态：</div>
                        <select class="form-control" id="status3">
                          <option value="">全部</option>
                          <option value="1">已完成</option>
                          <option value="0">待发货</option>
                          <option value="0">待收货</option>
                        </select>
                      </div>
                    </div>
                    <div class=" col-lg-2 col-sm-8 col-xs-12">
                      <input type="text" class="form-control" placeholder="输入采购单号/商品名称" id="storeName3">
                    </div>
                    <div class="form-group col-lg-2 col-md-3 col-sm-6 col-xs-12">
                      <button class="btn btn-red clearCondition" id="clearCondition3" data-clear="3">清除条件</button>
                      <button class="btn btn-info searchList" id="searchList3" data-search="3">查询</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class=" tab_ tab4" style="display: none;">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-12 col-sm-12 font-bold text-danger form-group">总额总计：<span v-if="list_.total_amount">{{list_.total_amount | currency}}</span><span v-else>0.00</span>元</div>
                    <div class="form-group col-lg-5 col-md-12 col-sm-12">
                      <div class="row">
                        <select class="form-control" id="timeType4" style="width:20%;float: left;height: 32px;">
                          <option value="1" selected>完成时间</option>
                          <option value="2">提交时间</option>
                        </select>
                        <div style="width: 80%;float: left;height: 32px;">
                          <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                                 placeholder="选择开始时间" readonly="readonly" name="dateStart4" id="dateStart4"
                                 onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'dateEnd4\')}'})">
                          <span style="float: left;width: 4%;margin: 0 1%;text-align: center;line-height: 32px;">-</span>
                          <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                                 placeholder="选择结束时间" readonly="readonly" name="dateEnd4" id="dateEnd4"
                                 onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'dateStart4\')}'})">
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-lg-2 col-sm-12">
                      <div class="input-group">
                        <div class="input-group-addon">状态：</div>
                        <select class="form-control" id="status4">
                          <option value="">全部</option>
                          <option value="1">已完成</option>
                          <option value="0">处理中</option>
                        </select>
                      </div>
                    </div>
                    <div class=" col-lg-2 col-sm-8 col-xs-12">
                      <input type="text" class="form-control" placeholder="请输入退货单号/商品名称" id="storeName4">
                    </div>
                    <div class="form-group col-lg-2 col-md-3 col-sm-6 col-xs-12">
                      <button class="btn btn-red clearCondition" id="clearCondition4" data-clear="4">清除条件</button>
                      <button class="btn btn-info searchList" id="searchList4" data-search="4">查询</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="clearfix"></div>
              <table class="table tab_ table-bordered tab0" width="100%" id="settledDetail0" v-on:click="openImageProxy($event)">
                <thead>
                <tr>
                  <th>结算时间</th>
                  <th>采购总额</th>
                  <th>退货总额</th>
                  <th>应付货款</th>
                  <th>已付货款</th>
                  <th>剩余货款</th>
                  <th>滞纳金</th>
                  <th>支付状态</th>
                  <th>支付时间</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <table class="table tab_ table-bordered tab1" width="100%" id="settledDetail1" style="display: none;">
                <thead>
                <tr>
                  <th>采购单号</th>
                  <th>商品名称</th>
                  <th>适用车型</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>总额</th>
                  <th>下单时间</th>
                  <th>状态</th>
                  <th>完成时间</th>
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
                  <th>单价</th>
                  <th>数量</th>
                  <th>总额</th>
                  <th>提交时间</th>
                  <th>状态</th>
                  <th>完成时间</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
              <table class="table tab_ table-bordered tab3" width="100%" id="settledDetail3" style="display: none;">
                <thead>
                <tr>
                  <th>采购单号</th>
                  <th>商品名称</th>
                  <th>适用车型</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>总额</th>
                  <th>下单时间</th>
                  <th>状态</th>
                  <th>完成时间</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
              <table class="table tab_ table-bordered tab4" width="100%" id="settledDetail4" style="display: none;">
                <thead>
                <tr>
                  <th>退货单号</th>
                  <th>商品名称</th>
                  <th>适用车型</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>总额</th>
                  <th>提交时间</th>
                  <th>状态</th>
                  <th>完成时间</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
            <input type="hidden" hidden style="display: none" id="queryType">
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
    <div  class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-backdrop fade in"></div>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!--Header-->
          <div class="modal-header">
            <a type="button" class="close" data-dismiss="modal" aria-hidden="true">x</a>
            <h4 class="modal-title">
              支付记录
            </h4>
          </div>
          <div class="modal-body">
            <div id="reason">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-white _close" data-dismiss="modal">确定</button>
          </div>
        </div>
      </div>
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
          openImageProxy: function (event) {
            if (event.target.nodeName === 'BUTTON') {
              var $html= event.target;
              var settid = $($html).attr("settid");
              var tag = $($html).attr("tag");
              if(tag==1){
                this.$router.replace({ path: '/purchaseRecord/' + settid})
              }else if(tag==2){
                this.$router.replace({ path: '/returnRecord/' + settid})
              }
              else if(tag==3){
                var param = new Object();
                param.access_token = store.state.user.access_token;
                param.user_id = store.state.user.userId;
                var request_parames = new Object();
                request_parames.settId = settid;
                param.request_parames=request_parames;
                var json = JSON.stringify(param);
                $.ajax({
                  url:store.state.baseUrl.data_serv_url+"/system/companySettlement/settPayLog",
                  data:{parameter:json},
                  type:"post",
                  dataType:"json",
                  success:function (data) {
//                    console.log(data.hmac);
                    console.log(data.hmac)

                    var $HTML='';
                        if(data.hmac!=""){
                          for(var i=0;i<data.hmac.length;i++){
                            $HTML += '<div class="col-md-4">支付时间：'+data.hmac[i].pay_time+'</div>'+
                              '<div class="col-md-4">支付金额：'+data.hmac[i].amount+'</div>'+
                              '<div class="col-md-4">支付方式：'+data.hmac[i].pay_type_config_name+'</div><br>';
                          }
                        }else{
                          $HTML +='<div class="col-md-12 text-center">暂无记录</div>'
                        }

                    $("#reason").html($HTML);
                    $("#myModal").attr("aria-hidden","false").addClass("in").show();
                    function close(){
                      $("#myModal").attr("aria-hidden","true").removeClass("in").fadeOut("100");
                    }
                    $(".close").click(function(){
                      close();
                    })
                    $("._close").click(function(){
                      close();
                    })

                  },
                  error:function () {

                  }
                });
              }
              else if(tag==4){
                var param = new Object();
                param.access_token = store.state.user.access_token;
                param.user_id = store.state.user.userId;
                var request_parames = new Object();
                request_parames.settId = settid;
                param.request_parames=request_parames;
                var json = JSON.stringify(param);
                var json = Base64.encode(JSON.stringify(param));
                window.location.href=store.state.baseUrl.data_serv_url+"/system/companySettlement/exports?parameter="+json;
              }
              event.stopPropagation();
            }
          }
        },
        mounted:function () {
          inspinia();
          nav_active();
//门店相关数据
          var self = this;
          var param = new Object();
          param.access_token = store.state.user.access_token;
          param.user_id = store.state.user.userId;
          var request_parames = new Object();
          var $href = (window.location.href).split("/");
          var id= $href[$href.length-1];
          request_parames.company_id = id;
          param.request_parames=request_parames;
          var json = JSON.stringify(param);
          $.ajax({
            url:store.state.baseUrl.data_serv_url+"/system/companySettlement/cg_detail",
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
              if(self.list.createTime == null){
                self.list.createTime="无";
              }else{
                self.list.createTime = format(self.list.createTime, 'yyyy-MM-dd HH:mm:ss');
              }
              var isAccount=""
              if(self.list.isAccount==1){
                isAccount+='<div class="btn-group" role="group">'+
                  '<button type="button" tab_="tab0" value="0" class="tab btn btn-white active">账期结算</button>'+
                  '<button type="button" tab_="tab1" value="1" class="tab btn btn-white">未结算采购</button>'+
                  '<button type="button" tab_="tab2" value="2" class="tab btn btn-white">未结算退货</button>'+
                  '<button type="button" tab_="tab3" value="3" class="tab btn btn-white">现金采购</button>'+
                  '<button type="button" tab_="tab4" value="4" class="tab btn btn-white">现金退货</button>'+
                  '</div>';
              }else{
                isAccount+='<div class="btn-group" role="group">'+
                  '<button type="button" tab_="tab3" value="3" class="tab btn btn-white active">现金采购</button>'+
                  '<button type="button" tab_="tab4" value="4" class="tab btn btn-white">现金退货</button>'+
                  '</div>';
              }
              $(".isAccount").html(isAccount);

              //          菜单切换
              $(".tab").click(function(){
                $(".tab").removeClass("active");
                $(this).addClass("active");
                var $tab = $(this).attr("tab_");
                $(".tab_").hide();
                $("."+$tab).show();
                var value= $(this).attr("value");
                if(value!=0){
                  $(".dataTables_wrapper").hide();
                  $("#queryType").val(value);
                  $("#settledDetail"+value+"_wrapper").show();
                  listData_total(value);
                  $('#settledDetail'+value).DataTable().draw();
                }else{
                  $(".dataTables_wrapper").hide();
                  $("#settledDetail"+value+"_wrapper").show();
                  $('#settledDetail'+value).DataTable().draw();
                }


              });
            },
            error:function () {

            }
          });


//          账期结算非表格
          sett_page_total();
          function sett_page_total(){
            var param = new Object();
            param.access_token = store.state.user.access_token;
            param.user_id = store.state.user.userId;
            var request_parames = new Object();
            var $href = (window.location.href).split("/");
            var id= $href[$href.length-1];
            var payStatus =$("#status0").val();
            var dateStart =$("#dateStart0").val();
            var dateEnd =$("#dateEnd0").val();
            request_parames.companyId = id;
            request_parames.startTime = dateStart;
            request_parames.endTime = dateEnd;
            request_parames.payStatus = payStatus;
            param.request_parames=request_parames;
            var json = JSON.stringify(param);
            $.ajax({
              url:store.state.baseUrl.data_serv_url+"/system/companySettlement/sett_page_total",
              data:{parameter:json},
              type:"post",
              dataType:"json",
              success:function (data) {
                self.list1 = data.hmac

              },
              error:function () {

              }
            });
          }
//          账期表格
          table1()
          function table1(){
            $("#settledDetail0").dataTable({
              "bAutoWidth": false,
              "processing": true,
              "serverSide": true,//服务器分页
              "iDisplayLength": 10,//首次加载的数据条数
              "ajax": {
                "url": store.state.baseUrl.data_serv_url+"/system/companySettlement/sett_page",
                "type": "POST",
                "dataSrc": "hmac.data",
                "data":function (d) {
                  var param = new Object();
                  param.access_token = store.state.user.access_token;
                  param.user_id = store.state.user.userId;
                  var request_parames = new Object();
                  var $href = (window.location.href).split("/");
                  var id= $href[$href.length-1];
                  var payStatus =$("#status0").val();
                  var dateStart =$("#dateStart0").val();
                  var dateEnd =$("#dateEnd0").val();
                  request_parames.start = d.start;
                  request_parames.pageSize = d.length;
                  request_parames.companyId = id;
                  request_parames.startTime = dateStart;
                  request_parames.endTime = dateEnd;
                  request_parames.payStatus = payStatus;
                  param.request_parames=request_parames;
                  var data = JSON.stringify(param);
                  var obj = {};
                  obj.parameter=data
                  return obj;
                }



              },
              "columns": [
                { "data": "sett_date" },
                {
                  "data": "buy",//json
                  "render": function (data,type,full,callback) {
                    var buy=data.toFixed(2);
                    return buy;
                  }
                },
                {
                  "data": "rtn",//json
                  "render": function (data,type,full,callback) {
                    var rtn=data.toFixed(2);
                    return rtn;
                  }
                },
                {
                  "data": "amount",//json
                  "render": function (data,type,full,callback) {
                    var amount=data.toFixed(2);
                    return amount;
                  }
                },
                {
                  "data": "pay_amount",//json
                  "render": function (data,type,full,callback) {
                    var pay_amount=data.toFixed(2);
                    return pay_amount;
                  }
                },
                {
                  "data": "no_pay_amount",//json
                  "render": function (data,type,full,callback) {
                    var no_pay_amount=data.toFixed(2);
                    return no_pay_amount;
                  }
                },
                {
                  "data": "late_fee",//json
                  "render": function (data,type,full,callback) {
                    var late_fee=data.toFixed(2);
                    return late_fee;
                  }
                },
                {
                  "data": "status",//json
                  "render": function (data,type,full,callback) {
                    var status=data;
                    if(status==100){
                      status="待支付"
                    }else if(status==150){
                      status="部分支付"
                    }else{
                      status="已支付"
                    }
                    return status;
                  }
                },
                {
                  "data": "pay_time",//json
                  "render": function (data,type,full,callback) {
                    var datahtml=data;
                    if(datahtml==""){
                      datahtml="--";
                    }else{
                      datahtml=data;
                    }
                    return datahtml;
                  }
                },
                {
                  "data": "",//json
                  "render": function (data,type,full,callback) {
                    var datahtml='';
                    datahtml+='<button class="btn btn-info btn-xs purchaseRecord" tag="1" settId="'+full.id+'" >采购明细</button>&nbsp;&nbsp;' +
                      '<button class="btn btn-info btn-xs returnRecord" tag="2" settId="'+full.id+'">退货明细</button>&nbsp;&nbsp;' +
                      '<button class="btn btn-info btn-xs aaa" tag="3"  data-toggle="modal" data-target="#myModal" settId="'+full.id+'">支付记录</button>&nbsp;&nbsp;' +
                      '<button class="btn btn-info btn-xs" tag="4"  settId="'+full.id+'">导出</button>';
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
          }
//清空搜索1
          function clearCondition0(){
            $("#status0").val("");
            $("#dateStart0").val("");
            $("#dateEnd0").val("");
          };
          $("#clearCondition0").click(function(){
            clearCondition0();
            sett_page_total();
            $('#settledDetail0').DataTable().draw();
          });
          $("#searchList0").click(function(){
            sett_page_total();
            $('#settledDetail0').DataTable().draw();
          });

//          其余菜单的查询
          function listData_total(obj){
            var param = new Object();
            param.access_token = store.state.user.access_token;
            param.user_id = store.state.user.userId;
            var request_parames = new Object();
            var $href = (window.location.href).split("/");
            var id= $href[$href.length-1];
            var keyWords =$("#storeName"+obj).val();
            var status =$("#status"+obj).val();
            var timeType =$("#timeType"+obj).val();
            var dateStart =$("#dateStart"+obj).val();
            var dateEnd =$("#dateEnd"+obj).val();
            var queryType =$("#queryType").val();
            request_parames.companyId = id;
            request_parames.startTime = dateStart;
            request_parames.endTime = dateEnd;
            request_parames.timeType = timeType;
            request_parames.keyWords = keyWords;
            request_parames.status = status;
            request_parames.queryType = queryType;
            param.request_parames=request_parames;
            var json = JSON.stringify(param);
            $.ajax({
              url:store.state.baseUrl.data_serv_url+"/system/companySettlement/listData_total",
              data:{parameter:json},
              type:"post",
              dataType:"json",
              success:function (data) {
                self.list_ = data.hmac

              },
              error:function () {

              }
            });

          }
//          其余菜单的列表
          listData(1);
          listData(2);
          listData(3);
          listData(4);
          $("#settledDetail1_wrapper").hide();
          $("#settledDetail2_wrapper").hide();
          $("#settledDetail3_wrapper").hide();
          $("#settledDetail4_wrapper").hide();
          function listData(obj){
            var queryType =obj;
            $("#settledDetail"+obj).dataTable({
              "bAutoWidth": false,
              "processing": true,
              "serverSide": true,//服务器分页
              "iDisplayLength": 10,//首次加载的数据条数
              "ajax": {
                "url": store.state.baseUrl.data_serv_url+"/system/companySettlement/listData",
                "type": "POST",
                "dataSrc": "hmac.data",
                "data":function (d) {
                  var param = new Object();
                  param.access_token = store.state.user.access_token
                  param.user_id = store.state.user.userId
                  var $href = (window.location.href).split("/");
                  var id= $href[$href.length-1];
                  var keyWords =$("#storeName"+queryType).val();
                  var status =$("#status"+queryType).val();
                  var timeType =$("#timeType"+queryType).val();
                  var dateStart =$("#dateStart"+queryType).val();
                  var dateEnd =$("#dateEnd"+queryType).val();
                  var request_parames = new Object();
                  request_parames.companyId = id;
                  request_parames.startTime = dateStart;
                  request_parames.endTime = dateEnd;
                  request_parames.timeType = timeType;
                  request_parames.keyWords = keyWords;
                  request_parames.status = status;
                  request_parames.queryType = queryType;
                  request_parames.start = d.start;
                  request_parames.pageSize = d.length;
                  param.request_parames=request_parames;
                  var data = JSON.stringify(param);
                  var obj = {};
                  obj.parameter=data
                  return obj;
                }



              },
              "columns": [
                { "data": "num" },
                { "data": "prod_offer_name" },
                { "data": "car_name" ,
                  "render": function (data,type,full,callback) {
                    var car_name=data;
                    if(car_name=="   "){
                      car_name="--"
                    }else{
                      car_name=data;
                    }
                    return car_name;
                  }
                },
                {"data": "sell_price",//json
                  "render": function (data,type,full,callback) {
                    var sell_price=data.toFixed(2);
                    return sell_price;
                  }

                },
                { "data": "quantity" },
                {"data": "amount",//json
                  "render": function (data,type,full,callback) {
                    var amount=data.toFixed(2);
                    return amount;
                  }

                },
                { "data": "apply_time" },
                { "data": "status" },
                { "data": "complete_time",
                  "render": function (data,type,full,callback) {
                    var complete_time=data;
                    if(complete_time==""){
                      complete_time="--"
                    }else{
                      complete_time=data;
                    }
                    return complete_time;
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
          }

////其余清空搜索
          function clearCondition(obj){
            $("#status"+obj).val("");
            $("#storeName"+obj).val("");
            $("#dateStart"+obj).val("");
            $("#dateEnd"+obj).val("");
          };
          $(".clearCondition").click(function(){
            var tag= $(this).attr("data-clear");
            clearCondition(tag)
            listData_total(tag);
            $("#settledDetail"+tag).DataTable().draw();
          });
          $(".searchList").click(function(){
            var tag= $(this).attr("data-search");
            listData_total(tag);
            $("#settledDetail"+tag).DataTable().draw();
          });

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



