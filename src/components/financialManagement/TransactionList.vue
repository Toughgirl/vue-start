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
            交易明细
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
                               <div class="form-group col-lg-6 col-md-6 col-sm-12">
                                    <div class="input-group">
                                      <div class="input-group-addon">交易日期：</div>
                                      <div style="width: 100%;float: left;height: 32px;">
                                        <div class="row">
                                          <div class="form-group col-lg-5 col-sm-5 col-xs-5"><input type="text"style="height:32px;" class="Wdate form-control"  placeholder="选择开始时间" readonly="readonly" name="dateStart" id="dateStart" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'dateEnd\')}'})"></div>
                                          <div class="form-group col-lg-1 col-sm-1 col-xs-2 text-center" style="line-height:32px;">-</div>
                                          <div class="form-group col-lg-5 col-sm-5 col-xs-5"><input type="text" style="height:32px;" class="Wdate form-control"  placeholder="选择结束时间" readonly="readonly" name="dateEnd" id="dateEnd" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'dateStart\')}'})"></div>
                                        </div>
                                      </div>
                                    </div>
                               </div>
                               <div class="form-group col-lg-2 col-md-6 col-sm-5">
                                 <div class="input-group">
                                   <div class="input-group-addon">业务类型：</div>
                                   <select class="form-control" id="status">
                                     <option value="">全部</option>
                                     <option value="采购">采购</option>
                                     <option value="退货">退货</option>
                                   </select>
                                 </div>
                               </div>
                               <div class="form-group col-lg-2 col-md-6 col-sm-7 col-xs-12">
                                 <input type="text" class="form-control" placeholder="请输入业务单号/门店名称" id="storeName">
                               </div>

                               <div class="form-group col-lg-2 col-md-6 col-sm-5">
                                 <button class="btn btn-red" id="clearCondition">清除条件</button>
                                 <button class="btn btn-info" id="searchList">查询</button>
                               </div>

                           </div>
                            <div class="row">


                            </div>

            </div>
            <div class="ibox-content">
                <div class="container-fluid" v-on:click="openImageProxy($event)">
                  <table id="DataTable" class="table  table-bordered" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                    <th>所属门店</th>
                    <th>业务单号</th>
                    <th>业务类型</th>
                    <th>数量</th>
                    <th>应付/应收款（元）</th>
                  <th>交易日期</th>

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
    require('src/vuex/modules/financialManagement/TransactionList.js')
    import HtmlFooter from 'src/components/footer.vue'
    import HtmlHeader from 'src/components/header.vue'
    import 'babel-polyfill';
    import store from 'src/vuex/store.js'
    import RegionPicker from 'vue-region-picker'
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
      date: '',
      date1: '',
      region: {}

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
                        var SettlementType = $($html).attr("SettlementType");
                        //console.log(SettlementType)
                        if(SettlementType=="采购"){
                          SettlementType='\\1';
                        }else if(SettlementType=="退货"){
                        SettlementType='\\2';
                        }
                        this.$router.replace({ path: '/TransactionDetail/' + SettlementId+SettlementType})
                        event.stopPropagation();
                      }
                    }


        },
        mounted:function () {
        function clearCondition(){
                            $("#status").val("");
                            $("#storeName").val("");
                            $(".title").val("");
                            $("#dateStart").val("");
                            $("#dateEnd").val("");
                            $(".province-select").val("");
                            $(".city-select").val("");
                            $(".district-select").val("");
                            };
                            $("#clearCondition").click(function(){
                                        clearCondition();
                                        searchList();
                                      });
        inspinia();
         nav_active();
          $("#DataTable").dataTable({
            "bAutoWidth": false,
            "processing": true,
            "serverSide": true,//服务器分页
            "iDisplayLength": 10,//首次加载的数据条数
            "ajax": {
              //"url": "/transactionList",
              "url": store.state.baseUrl.data_serv_url+"/system/store/transactionDetail",
              "type": "POST",
              "dataSrc": "hmac.data",//默认data，也可以写其他的，格式化table的时候取里面的数据
              "data":function (d) {//d 是原始的发送给服务器的数据，默认很长。
                var param = new Object();
                param.access_token = store.state.user.access_token
                param.user_id = store.state.user.userId
                var status =$("#status").val();
                //if(status=="采购"){
                //   status='1';
                //  }else if(status=="退货"){
                //   status='2';
                // }
                var storeName =$("#storeName").val();
                var dateStart =$("#dateStart").val();
                var dateEnd =$("#dateEnd").val();
                var request_parames = new Object();
                request_parames.start = d.start;
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
              { "data": "company_name" },
              { "data": "cust_order_num" },
              { "data": "type" },
              { "data": "total_quantity" },
              {
                        "data": "total_amount",//json
                        "render": function (data,type,full,callback) {
                          var total_amount=data.toFixed(2);
                          return total_amount
                        }
                      },
              { "data": "create_date" },
              //操作列
              {
                "data": "",//json
                "render": function (data,type,full,callback) {
                  var datahtml='';
                  datahtml+='<button class="btn btn-info btn-xs" SettlementId="'+full.id+'" SettlementType="'+full.type+'">详情</button>'
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



