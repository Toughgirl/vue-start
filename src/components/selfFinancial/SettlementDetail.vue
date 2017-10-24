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
            财务管理
          </li>
          <li>
            <a href="#/settlementList">已结算</a>
          </li>
          <li>
            结算单详情
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
              <h5>已结算详情</h5>
            </div>
            <div class="ibox-content">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-4"><label>结算时间：</label>
                    <span>{{list.create_date}}</span>
                  </div>
                  <div class="col-lg-4"><label>结算金额：</label>
                    <span>{{list.amount | currency}}元</span>
                  </div>
                  <div class="col-lg-4"><label>支付状态：</label>
                    <span>{{list.status_name}}</span>
                  </div>
                  <div class="col-lg-4"><label>支付时间：</label>
                    <span>{{list.pay_date}}</span>
                  </div>
                  <div class="col-lg-4"><label>应付总额：</label>
                    <span v-if="list.payable_amount">{{list.payable_amount | currency}}元</span>
                    <span v-else>0.00元</span>
                  </div>
                  <div class="col-lg-4"><label>应收总额：</label>
                    <span v-if="list.receive_amount">{{list.receive_amount| currency}}元</span>
                    <span v-else>0.00元</span>
                  </div>
                  <!--<div class="col-lg-4"><label>合计金额：</label>-->
                    <!--<span v-if="list.sum">{{list.sum | currency}}元</span>-->
                    <!--<span v-else>0.00元</span>-->
                  <!--</div>-->
                </div>
              </div>
              <br>
              <h4>业务明细</h4>
              <hr>
              <table class="table table-bordered" width="100%" id="settledDetail">
                <thead>
                <tr>
                  <th>业务单号</th>
                  <th>应付/应收</th>
                  <th>总金额</th>
                  <th>时间</th>
                  <th>所属门店</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
              </table>

            </div>
            <div class="ibox-content">
              <div class="form-group">
                <a href="#/settlementList">
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
                    },
        },
        mounted:function () {
          inspinia();
          nav_active();
        //非列表
          var self = this;
          var param = new Object();
          param.access_token = store.state.user.access_token;
          param.user_id = store.state.user.userId;
          var request_parames = new Object();
          var $href = (window.location.href).split("/");
          var id= $href[$href.length-1];
          request_parames.operator_settlement_id = id;
          param.request_parames=request_parames;
          var json = JSON.stringify(param);
          $.ajax({
//            url:"/SettlementDetail",
            url:store.state.baseUrl.data_serv_url+"/system/operatorSettlement/detail",
            data:{parameter:json},
            type:"post",
            dataType:"json",
            success:function (data) {
              self.list = eval('(' + data.hmac + ')')
//              console.log(data.hmac)
//              console.log(self.list)
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
              self.list.create_date= format(self.list.create_date, 'yyyy-MM-dd HH:mm:ss');
//              self.list.pay_date = format(self.list.pay_date, 'yyyy-MM-dd HH:mm:ss');
              if(self.list.pay_date == null){
                self.list.pay_date="无";
              }else{
                self.list.pay_date = format(self.list.pay_date, 'yyyy-MM-dd HH:mm:ss');
              }
            },
            error:function () {

            }
          });
        //列表
          $("#settledDetail").dataTable({
            "bAutoWidth": false,
            "processing": true,
            "serverSide": true,//服务器分页
            "iDisplayLength": 10,//首次加载的数据条数
            "ajax": {
              "url": store.state.baseUrl.data_serv_url+"/system/operatorSettlement/ByPage",
              "type": "POST",
              "dataSrc": "hmac.data",
              "data":function (d) {
                var param = new Object();
                param.access_token = store.state.user.access_token
                param.user_id = store.state.user.userId
                var request_parames = new Object();
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
              { "data": "busNo" },
              { "data": "busName" },
              { "data": "amount" },
              { "data": "getTime" },
              { "data": "companyName" }


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



