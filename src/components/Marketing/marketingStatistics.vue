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
              营销管理
            </li>
            <li>
              购销数据统计
            </li>
          </ol>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="wrapper wrapper-content">
            <div class="ibox">
              <div class="ibox-title">
                <div class="row">
                  <div class="form-group col-lg-12 col-sm-12">
                    <h2>活动数据</h2>
                  </div>
                  <div class="form-group col-lg-5 col-sm-10 col-xs-12">
                    <div class="input-group">
                      <div class="input-group-addon">所属区域：</div>
                      <div class="form-control region" style="padding: 0;border: none;">
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
                  <div class="form-group col-lg-3 col-sm-2 col-xs-12">
                    <button class="btn btn-info" id="searchList1">查询</button>
                  </div>
                </div>
              </div>
              <div class="ibox-content">
                <div class="row">
                  <div class="col-md-5 col-lg-5 col-sm-12 col-xs-12">
                      <div class="ibox float-e-margins">
                        <div class="ibox-title text-center">
                          <h3 class="font-bold">门店数量比例</h3>
                          <div>总门店数：{{data.total}}</div>
                        </div>
                        <div class="ibox-content">
                          <div id="storeProportion" style="width:100%;height:400px;"></div>
                        </div>
                      </div>
                  </div>
                  <div class="col-md-5 col-lg-5 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1">
                    <div class="ibox float-e-margins">
                      <div class="ibox-title text-center">
                        <h3 class="font-bold">销售比例</h3>
                        <div>总目标销售量：{{list.sales}}</div>
                      </div>
                      <div class="ibox-content">
                        <div id="salesProportion" style="width:100%;height:400px;"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-lg-2 col-sm-4">
                    <h3>财务数据</h3>
                  </div>
                  <div class="col-lg-2 col-sm-4">已结账门店：{{list1.num1}} </div>
                  <div class="col-lg-2 col-sm-4">已结账总额：{{list1.num2}} 元</div>
                </div>
                <br>
                <div class="row">
                  <div class="form-group col-lg-5 col-sm-12">
                    <div class="input-group">
                      <div class="input-group-addon">所属区域：</div>
                      <div class="form-control region2" style="padding: 0;border: none;">
                        <region-picker :province="region.province" :city="region.city" :district="region.district"
                                       :placeholder="{province: '选择省份', city: '选择市', district: '选择地区'}"
                                       @onchange="change">
                        </region-picker>
                        <input type="hidden" id="province2">
                        <input type="hidden" id="city2">
                        <input type="hidden" id="district2">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-lg-2 col-sm-8 col-xs-12">
                    <input type="text" class="form-control" placeholder="请输入门店名称" id="storeName">
                  </div>
                  <div class="form-group col-lg-3 col-sm-4 col-xs-12">
                    <button class="btn btn-red" id="clearCondition">清除条件</button>
                    <button class="btn btn-info" id="searchList">查询</button>
                  </div>
                  <div class="form-group col-lg-12 col-sm-12 col-xs-12">
                    <table class="table table-bordered" width="100%" id="marketingStatistics">
                      <thead>
                      <tr>
                        <th>结账门店名称</th>
                        <th>结账金额（元）</th>
                        <th>结账时间</th>
                      </tr>
                      </thead>
                      <tbody>

                      </tbody>
                    </table>
                  </div>
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
  import store from 'src/vuex/store.js'
  import CHINA_REGION from 'china-area-data'
  import inspinia from 'src/assets/js/inspinia.js'
  import nav_active from 'src/assets/js/nav.js'
  import echarts from 'echarts'
  Vue.use(RegionPicker, {
    region: CHINA_REGION,
    vueVersion: 2
  })
  export default {
    data(){
    return{
      list: '',
      list1: '',
      data: '',
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
      $("#district1").val($(".region .district-select").val().split(",")[0]);
      $("#district2").val($(".region2 .district-select").val().split(",")[0]);
      return s
    },
    openImageProxy: function (event) {
      if (event.target.nodeName === 'BUTTON') {
        var $html= event.target;
        var SettlementId = $($html).attr("SettlementId");
        this.$router.replace({ path: '/SettlementDetail/' + SettlementId})
        event.stopPropagation();
      }
    }

  },
  mounted:function () {
    inspinia();
    nav_active();

    function clearCondition(){
      $("#storeName").val("");
      $(".region2 .province-select").val("");
      $(".region2 .city-select").val("");
      $(".region2 .district-select").val("");
      $("#district2").val("");
    };

    $("#clearCondition").click(function(){
      clearCondition();
      searchList();
    });
    searchList1();
    $("#searchList1").click(function(){
      searchList1();
    });
    var self = this;
    function searchList1(){
      var param = new Object();
      var regionId = $("#district1").val();
      param.access_token = store.state.user.access_token;
      param.user_id = store.state.user.userId;
      var request_parames = new Object();
      request_parames.regionId = regionId;
      param.request_parames=request_parames;
      var json = JSON.stringify(param);
      //饼状图
      $.ajax({
        url:store.state.baseUrl.data_serv_url+"/system/activityInst/statistics",
        data:{parameter:json},
        type:"post",
        dataType:"json",
        success:function (data) {
          self.list = eval('(' + data.hmac + ')');
          self.data = self.list.data;
          if(self.list.c < 0){
            self.list.c = 0;
          }
          var myChart = echarts.init(document.getElementById('storeProportion'));
          var option = {
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
              {
                name: '门店数比例',
                type: 'pie',
                radius : '35%',
                center: ['50%', '60%'],
                data:[
                  {value:self.list.data.STOP, name:'暂停门店数'},
                  {value:self.list.data.regular, name:'进行中门店数'},
                  {value:self.list.data.over, name:'结束门店数'}
                ],
                itemStyle: {
                  normal:{
                    label:{
                      show: true,
                      formatter: '{b} : {c} ({d}%)'
                    },
                    labelLine :{show:true}
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          myChart.setOption(option);

          var myChart1 = echarts.init(document.getElementById('salesProportion'));
          var option1 = {
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
              {
                name: '销售比例',
                type: 'pie',
                radius : '35%',
                center: ['50%', '60%'],
                data:[
                  {value:self.list.c, name:'未完成销售量'},
                  {value:self.list.a, name:'已完成销售量'},
                ],
                itemStyle: {
                  normal:{
                    label:{
                      show: true,
                      formatter: "{b} : {c} ({d}%)"
                    },
                    labelLine :{show:true}
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          myChart1.setOption(option1);
        },
        error:function () {

        }
      });
    }
//
    var param1 = new Object();
    param1.access_token = store.state.user.access_token
    param1.user_id = store.state.user.userId
    var storeName =$("#storeName").val();
    var regionId = $("#district2").val();
    var request_parames1 = new Object();
    request_parames1.status = status;
    request_parames1.keywords = storeName;
    request_parames1.regionId = regionId;
    param1.request_parames=request_parames1;
    var json1 = JSON.stringify(param1);

    $.ajax({
      url:store.state.baseUrl.data_serv_url+"/system/activityInst/Totals",
      data:{parameter:json1},
      type:"post",
      dataType:"json",
      success:function (data) {
        self.list1 = data.hmac;
      },
      error:function () {

      }
    });

    $("#marketingStatistics").dataTable({
      "bAutoWidth": false,
      "processing": true,
      "serverSide": true,//服务器分页
      "iDisplayLength": 10,//首次加载的数据条数
      "ajax": {
        //"url": "/SettlementList",
        "url": store.state.baseUrl.data_serv_url+"/system/activityInst/statisticalPage",
        "type": "POST",
        "dataSrc": "hmac.data",//默认data，也可以写其他的，格式化table的时候取里面的数据
        "data":function (d) {//d 是原始的发送给服务器的数据，默认很长。
          var param = new Object();
          param.access_token = store.state.user.access_token
          param.user_id = store.state.user.userId
          var storeName =$("#storeName").val();
          var regionId = $("#district2").val();
          var request_parames = new Object();
          request_parames.start = d.start;
          request_parames.pageSize = d.length;
          request_parames.keywords = storeName;
          request_parames.regionId = regionId;
          param.request_parames=request_parames;
          var data = JSON.stringify(param);
          var obj = {};
          obj.parameter=data
          return obj;
        }



      },
      "columns": [
        { "data": "company_name" },
        { "data": "sett_amount" },
        { "data": "conf_time" }
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
      $('#marketingStatistics').DataTable().draw();
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



