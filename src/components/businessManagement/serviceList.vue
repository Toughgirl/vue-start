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
            服务单
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
                               <div class="form-group col-lg-2 col-md-6 col-sm-4 col-xs-12">
                                   <div class="input-group">
                                       <div class="input-group-addon">状态：</div>
                                     <select class="form-control" id="status">
                                       <option selected="" value="">全部</option>
                                       <option value="DQR">待确认</option>
                                       <option value="FWZ">服务中</option>
                                       <option value="DYS">待验收</option>
                                       <option value="DZF">待支付</option>
                                       <option value="YWC">已完成</option>
                                       <option value="YSX">已失效</option>
                                     </select>

                                   </div>
                               </div>
                               <div class="form-group col-lg-3 col-md-6 col-sm-8 col-xs-12">
                                       <input class="form-control" placeholder="输入服务门店/服务车辆/车主ID/注册手机号码进行查询" id="storeName">
                               </div>

                                <div class="form-group col-lg-5 col-md-8 col-sm-8 col-xs-12">
                                    <div class="input-group">
                                        <div class="input-group-addon">创建时间：</div>
                                        <div style="width: 100%;float: left;height: 32px;">
                                                                                   <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%" placeholder="选择开始时间" readonly="readonly" name="dateStart" id="dateStart" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'dateEnd\')}'})">
                                                                                   <span style="float: left;width: 4%;margin: 0 1%;text-align: center;line-height: 32px;">--</span>
                                                                                   <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%" placeholder="选择结束时间" readonly="readonly" name="dateEnd" id="dateEnd" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'dateStart\')}'})">
                                                                                </div>
                                    </div>
                               </div>
                                <div class="form-group col-lg-2 col-md-4 col-sm-4 col-xs-12">
                                    <button class="btn btn-red" id="clearCondition">清除条件</button>
                                    <button class="btn btn-info" id="searchList">查询</button>
                                </div>
                            </div>

            </div>
            <div class="ibox-content" v-on:click="openImageProxy($event)">
                <div class="container-fluid">
                  <table id="DataTable" class="table  table-bordered" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                    <th>服务单号</th>
                    <th>服务门店</th>
                    <th>服务车辆</th>
                    <th>车主ID</th>
                    <th>注册手机号码</th>
                    <th>总金额（元）</th>
                    <th>创建时间</th>
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

                  openImageProxy: function (event) {
                    if (event.target.nodeName === 'BUTTON') {
                      var $html= event.target;
                      var custOrderNum = $($html).attr("custOrderNum");
                      var order_id = $($html).attr("order_id");
                      var order = custOrderNum+"\\"+order_id
                      this.$router.replace({ path: '/serviceDetail/'+ order })
                      event.stopPropagation();
                    }
                  },


        },
        mounted:function () {
          function clearCondition(){
            $("#status").val("");
            $("#storeName").val("");
            $("#dateStart").val("");
            $("#dateEnd").val("");
          };
          $("#clearCondition").click(function(){
            clearCondition();
            searchList();
          });
          inspinia();
          nav_active();
//服务单列表
          var self = this;
          $("#DataTable").dataTable({
            "bAutoWidth": false,
            "processing": true,
            "serverSide": true,//服务器分页
            "iDisplayLength": 10,//首次加载的数据条数
            "ajax": {
//              "url": "/customerOrder",
              "url": store.state.baseUrl.data_serv_url+"/vip/cappServOrder/findPage",
              "type": "POST",
              "dataSrc": "hmac.data",//默认data，也可以写其他的，格式化table的时候取里面的数据
              "data":function (d) {//d 是原始的发送给服务器的数据，默认很长。
                var param = new Object();
                param.access_token = store.state.user.access_token
                param.user_id = store.state.user.userId
                var status =$("#status").val();
                var storeName =$("#storeName").val();
                var dateStart =$("#dateStart").val();
                var dateEnd =$("#dateEnd").val();
                var request_parames = new Object();
                request_parames.curPage = d.start;
                request_parames.pageSize = d.length;
                request_parames.status = status;
                request_parames.dateStart = dateStart;
                request_parames.dateEnd = dateEnd;
                request_parames.keywords = storeName;
                param.request_parames=request_parames;
                var data = JSON.stringify(param);
                var obj = {};
                obj.parameter=data
                return obj;
              }



            },
            "columns": [
              { "data": "order_num" },
              { "data": "cust_company_name" },
              { "data": "car_num" },
              { "data": "cust_vip_num" },
              { "data": "cust_vip_mobile" },
              {
                "data": "amount",//json
                "render": function (data,type,full,callback) {
                  var amount=data.toFixed(2);
                  return amount
                }
              },
              { "data": "add_time" },
              { "data": "status_name" },
              //操作列
              {
                "data": "",//json
                "render": function (data,type,full,callback) {
                  var datahtml='';
                  datahtml+='<button class="btn btn-info btn-xs" custOrderNum="'+full.cust_company_id+'" order_id="'+full.order_id+'">详情</button>'
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
        }
    }

</script>



