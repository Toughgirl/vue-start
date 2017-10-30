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
            采购明细
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
                <div class="form-group col-lg-5 col-md-8 col-sm-8 col-xs-12">
                  <div class="input-group">
                    <div class="input-group-addon">完成时间：</div>
                    <div style="width: 100%;float: left;height: 32px;">
                      <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                             placeholder="选择开始时间" readonly="readonly" name="dateStart" id="dateStart"
                             onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'dateEnd\')}'})">
                      <span style="float: left;width: 4%;margin: 0 1%;text-align: center;line-height: 32px;">--</span>
                      <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                             placeholder="选择结束时间" readonly="readonly" name="dateEnd" id="dateEnd"
                             onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'dateStart\')}'})">
                    </div>
                  </div>
                </div>
                <div class="form-group col-lg-3 col-md-6 col-sm-8 col-xs-12">
                  <input class="form-control" placeholder="输入采购单号/商品名称" id="storeName">
                </div>
                <div class="form-group col-lg-2 col-md-4 col-sm-4 col-xs-12">
                  <button class="btn btn-red" id="clearCondition">清除条件</button>
                  <button class="btn btn-info" id="searchList">查询</button>
                </div>
              </div>

            </div>
            <div class="ibox-content">
              <div class="form-group">
                <div class="text-danger col-lg-12 col-md-12 col-sm-12 col-xs-12">总额总计:<span v-if="list">{{list | currency}}</span><span v-else>0.00</span>元</div>
              </div>
            </div>
            <div class="ibox-content">
              <div class="container-fluid">
                <table id="DataTable" class="table  table-bordered" cellspacing="0" width="100%">
                  <thead>
                  <tr>
                    <th>采购单号</th>
                    <th>商品名称</th>
                    <th>适用车型</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>总额</th>
                    <th>完成时间</th>
                  </tr>
                  </thead>
                </table>
              </div>
            </div>
            <div class="ibox-content">
              <div class="form-group">
                <a class="back" v-on:click="_back">
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
//采购统计
          total();
          var self = this;
          function total(){
            var param = new Object();
            param.access_token = store.state.user.access_token;
            param.user_id = store.state.user.userId;
            var storeName =$("#storeName").val();
            var dateStart =$("#dateStart").val();
            var dateEnd =$("#dateEnd").val();
            var $href = (window.location.href).split("/");
            var id= $href[$href.length-1];
            var request_parames = new Object();
            request_parames.settleNo = storeName;
            request_parames.tag = 1;
            request_parames.id = id;
            request_parames.startTime = dateStart;
            request_parames.endTime = dateEnd;
            request_parames.queryType = 1;
            param.request_parames=request_parames;
            var json = JSON.stringify(param);
            $.ajax({
              url:store.state.baseUrl.data_serv_url+"/system/companySettlement/totals1",
              data:{parameter:json},
              type:"post",
              dataType:"json",
              success:function (data) {
                self.list = eval('(' + data.hmac + ')')
                self.list= parseFloat(self.list);
              },
              error:function () {

              }
            });
          }
          $("#DataTable").dataTable({
            "bAutoWidth": false,
            "processing": true,
            "serverSide": true,//服务器分页
            "iDisplayLength": 10,//首次加载的数据条数
            "ajax": {
//              "url": "/customerOrder",
              "url": store.state.baseUrl.data_serv_url+"/system/companySettlement/page_sett_new",
              "type": "POST",
              "dataSrc": "hmac.data",//默认data，也可以写其他的，格式化table的时候取里面的数据
              "data":function (d) {//d 是原始的发送给服务器的数据，默认很长。
                var param = new Object();
                param.access_token = store.state.user.access_token
                param.user_id = store.state.user.userId
                var storeName =$("#storeName").val();
                var dateStart =$("#dateStart").val();
                var dateEnd =$("#dateEnd").val();
                var $href = (window.location.href).split("/");
                var id= $href[$href.length-1];
                var request_parames = new Object();
                request_parames.start = d.start;
                request_parames.pageSize = d.length;
                request_parames.settleNo = storeName;
                request_parames.tag = 1;
                request_parames.id = id;
                request_parames.startTime = dateStart;
                request_parames.endTime = dateEnd;
                request_parames.queryType = 1;
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
              { "data": "car_name" },

              {
                "data": "sell_price",//json
                "render": function (data,type,full,callback) {
                  var sell_price=data.toFixed(2);
                  return sell_price
                }
              },
              { "data": "quantity" },
              {
                "data": "amount",//json
                "render": function (data,type,full,callback) {
                  var amount=data.toFixed(2);
                  return amount;
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



//清空搜索1
          function clearCondition(){
            $("#storeName").val("");
            $("#dateStart").val("");
            $("#dateEnd").val("");
          };
          $("#clearCondition").click(function(){
            clearCondition();
            total();
            $('#DataTable').DataTable().draw();
          });
          $("#searchList").click(function(){
            total();
            $('#DataTable').DataTable().draw();
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



