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
              门店销量统计
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
                    <h2>门店销量统计</h2>
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
                  <div class="form-group col-lg-3 col-md-6 col-sm-8 col-xs-12">
                    <input class="form-control" placeholder="请输入门店名称进行搜索" id="storeName">
                  </div>
                  <div class="form-group col-lg-3 col-md-3 col-sm-4 col-xs-12">
                    <button class="btn btn-red" id="clearCondition">清除条件</button>
                    <button class="btn btn-info" id="searchList1">查询</button>
                  </div>
                </div>
              </div>
              <div class="ibox-content">
                <div class="row">
                  <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                      <div class="ibox float-e-margins">
                        <div id="storeProportion" style="width:100%;height:400px;"></div>
                      </div>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="form-group col-lg-6 col-sm-12">
                    <div class="input-group">
                      <div class="input-group-addon">统计日期：</div>
                      <div style="width: 100%;float: left;height: 32px;">
                        <div class="row">
                          <div class="form-group col-lg-5 col-sm-5 col-xs-5"><input type="text"style="height:32px;" class="Wdate form-control"  placeholder="选择开始时间" readonly="readonly" name="dateStart" id="dateStart" onfocus="WdatePicker({minDate:'2017-01-01',dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'dateEnd\')}',maxDate:'%y-%M-{%d-30}'})"></div>
                          <div class="form-group col-lg-1 col-sm-1 col-xs-1 text-center" style="line-height:32px;">-</div>
                          <div class="form-group col-lg-5 col-sm-5 col-xs-5"><input type="text" style="height:32px;" class="Wdate form-control"  placeholder="选择结束时间" readonly="readonly" name="dateEnd" id="dateEnd" onfocus="WdatePicker({maxDate:'%y-%M-{%d-30}',dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'dateStart\')}'})"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-lg-3 col-sm-4 col-xs-12">
                    <button class="btn btn-info" id="searchList">查询</button>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-lg-12 col-sm-12 col-xs-12">
                    <table class="table table-bordered" width="100%" id="storeSaleStatistics">
                      <thead>
                      <tr>
                        <th>序号</th>
                        <th>门店名称</th>
                        <th>实际采购总额（元）<span class="fa fa-sort orderTag" aria-valuenow=""></span></th>
                        <th>退货总额（元）<span class="fa fa-sort returnTag" aria-valuenow=""></span></th>
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
      region: {
        "province": [ 510000, "四川省" ]
      },

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
      $("#district1").val($(".district-select").val().split(",")[0]);
      return s
    },
  },
  mounted:function () {
    $(".province-select").attr("disabled","disabled");
    inspinia();
    nav_active();
    searchList1();
    function clearCondition(){
      $("#storeName").val("");
      $(".province-select").val("");
      $(".city-select").val("");
      $(".district-select").val("");
      $("#district1").val("");
      $("#dateStart").val("");
      $("#dateEnd").val("");
    };

    $("#clearCondition").click(function(){
      clearCondition();
      searchList1();
      searchList();
    });
    $("#searchList1").click(function(){
      searchList1();
      searchList();
    });
    var self = this;
    function searchList1(){
      var param = new Object();
      var storeName =$("#storeName").val();
      var regionId = $("#district1").val();
      param.access_token = store.state.user.access_token;
      param.user_id = store.state.user.userId;
      var request_parames = new Object();
      request_parames.keywords = storeName;
      request_parames.regionId = regionId;
      param.request_parames=request_parames;
      var json = JSON.stringify(param);
      var income_total_moms=[];
      var return_goods_totals=[];
      var purchase_totals=[];
      var return_goods_total_moms=[];
      var purchase_rates=[];
      var retrun_rates=[];
      //饼状图
      $.ajax({
        url:store.state.baseUrl.data_serv_url+"/system/censusPurchaseMonthSales/salesTotal",
        data:{parameter:json},
        type:"post",
        dataType:"json",
        success:function (data) {
          self.list = data.hmac;
          for(var i=0;i<self.list.length;i++) {
            income_total_moms.push(self.list[i].income_total_mom);
            return_goods_totals.push(self.list[i].return_goods_total);
            purchase_totals.push(self.list[i].purchase_total);
            return_goods_total_moms.push(self.list[i].return_goods_total_mom);
            purchase_rates.push(self.list[i].purchase_rate);
            retrun_rates.push(self.list[i].retrun_rate);
          }
          var myChart = echarts.init(document.getElementById('storeProportion'));
          var option = {
            tooltip : {
              trigger: 'axis'
            },
            toolbox: {
              show : true,
              feature : {
                mark : {show: true}
              }
            },
            calculable : true,
            legend: {
              data:['实际采购总额','退货总额','采购增长额','退货增长额','退货增长率','采购增长率']
            },
            xAxis : [
              {
                type : 'category',
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
              }
            ],
            yAxis : [
              {
                type : 'value',
                name : '元',
                axisLabel : {
                  formatter: '{value}'
                }
              },
              {
                type : 'value',
                name : '%',
                axisLabel : {
                  formatter: '{value}'
                }
              }
            ],
            series : [
              {
                name:'实际采购总额',
                type:'line',
                data:purchase_totals,
                itemStyle:{
                  normal: {
                    color: '#f44336'
                    }
                }
              },
              {
                name:'退货总额',
                type:'line',
                data:return_goods_totals,
                itemStyle:{
                  normal: {
                    color: '#2196f3'
                  }
                }
              },
              {
                name:'采购增长额',
                type:'line',
                data:income_total_moms,
                itemStyle:{
                  normal: {
                    color: '#673ab7'
                  }
                }
              },
              {
                name:'退货增长额',
                type:'line',
                data:return_goods_total_moms,
                itemStyle:{
                  normal: {
                    color: '#795548'
                  }
                }
              },
              {
                name:'退货增长率',
                type:'line',
                yAxisIndex: 1,
                data:retrun_rates,
                itemStyle:{
                  normal: {
                    color: '#4caf50'
                  }
                }
              },
              {
                name:'采购增长率',
                type:'line',
                yAxisIndex: 1,
                data:purchase_rates,
                itemStyle:{
                  normal: {
                    color: '#FCCE10'
                  }
                }
              }
            ]
          };
          myChart.setOption(option);
        },
        error:function () {

        }
      });
    }
    $(".orderTag").click(function(){
      $(".returnTag").removeClass("fa-caret-down fa-caret-up").addClass("fa-sort");
      $(".returnTag").attr('aria-valuenow',"");
      if($(this).hasClass("fa-caret-down")){
        $(".orderTag").removeClass("fa-caret-down fa-sort").addClass("fa-caret-up");
        $(".orderTag").attr('aria-valuenow',"0");
      }else if($(this).hasClass("fa-caret-up")){
        $(".orderTag").removeClass("fa-caret-up").addClass("fa-caret-down");
        $(".orderTag").attr('aria-valuenow',"1");
      }else{
        $(".orderTag").removeClass("fa-sort").addClass("fa-caret-down");
        $(".orderTag").attr('aria-valuenow',"1");
      }
      searchList();
    });
    $(".returnTag").click(function(){
      $(".orderTag").removeClass("fa-caret-down fa-caret-up").addClass("fa-sort");
      $(".orderTag").attr('aria-valuenow',"");
      if($(this).hasClass("fa-caret-down")){
        $(".returnTag").removeClass("fa-caret-down fa-sort").addClass("fa-caret-up");
        $(".orderTag").attr('aria-valuenow',"0");
      }else if($(this).hasClass("fa-caret-up")){
        $(".returnTag").removeClass("fa-caret-up").addClass("fa-caret-down");
        $(".orderTag").attr('aria-valuenow',"1");
      }else{
        $(".returnTag").removeClass("fa-sort").addClass("fa-caret-down");
        $(".orderTag").attr('aria-valuenow',"1");
      }
      searchList();
    });
    $("#storeSaleStatistics").dataTable({
      "bAutoWidth": false,
      "processing": true,
      "serverSide": true,
      "iDisplayLength": 10,
      "ajax": {
        "url": store.state.baseUrl.data_serv_url+"/system/censusPurchaseMonthSales/findPage",
        "type": "POST",
        "dataSrc": "hmac.data",//默认data，也可以写其他的，格式化table的时候取里面的数据
        "data":function (d) {//d 是原始的发送给服务器的数据，默认很长。
          var param = new Object();
          param.access_token = store.state.user.access_token
          param.user_id = store.state.user.userId
          var storeName =$("#storeName").val();
          var orderTag = $(".orderTag").attr('aria-valuenow');
          var returnTag = $(".returnTag").attr('aria-valuenow');
          var regionId = $("#district1").val();
          var dateStart =$("#dateStart").val();
          var dateEnd =$("#dateEnd").val();
          var request_parames = new Object();
          request_parames.curPage = d.start;
          request_parames.pageSize = d.length;
          request_parames.keywords = storeName;
          request_parames.regionId = regionId;
          request_parames.orderTag = orderTag;
          request_parames.returnTag = returnTag;
          request_parames.dateStart = dateStart;
          request_parames.dateEnd = dateEnd;
          param.request_parames=request_parames;
          var data = JSON.stringify(param);
          var obj = {};
          obj.parameter=data
          return obj;
        }



      },
      "columns": [
        {"data": "i"},
        { "data": "company_name" },
        {
          "data": "income_total",//json
          "render": function (data,type,full,callback) {
            var income_total=data.toFixed(2);
            return income_total
          }
        },
        {
          "data": "return_goods_total",//json
          "render": function (data,type,full,callback) {
            var return_goods_total=data.toFixed(2);
            return return_goods_total
          }
        },

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
      "bFilter": false, //过滤功能
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
      $('#storeSaleStatistics').DataTable().draw();
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



