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
              绩效统计
            </li>
          </ol>
        </div>
        <div class="col-lg-2"></div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="wrapper wrapper-content">
            <div class="ibox">
              <div class="ibox-content">
                <div class="row">
                  <div class="form-group col-lg-5 col-sm-9 col-xs-12">
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
                  <div class="form-group col-lg-2 col-sm-3 col-xs-12">
                    <select class="form-control" id="month">
                      <option value="">请选择月份</option>
                      <option value="01">一月</option>
                      <option value="02">二月</option>
                      <option value="03">三月</option>
                      <option value="04">四月</option>
                      <option value="05">五月</option>
                      <option value="06">六月</option>
                      <option value="07">七月</option>
                      <option value="08">八月</option>
                      <option value="09">九月</option>
                      <option value="10">十月</option>
                      <option value="11">十一月</option>
                      <option value="12">十二月</option>

                    </select>
                  </div>
                  <div class="form-group col-lg-2 col-sm-8 col-xs-12">
                    <input type="text" class="form-control" placeholder="输入门店名称进行搜索" id="storeName">
                  </div>
                  <div class="form-group col-lg-3 col-sm-4 col-xs-12">
                    <button class="btn btn-red" id="clearCondition">清除条件</button>
                    <button class="btn btn-info" id="searchList">查询</button>
                  </div>

                </div>
              </div>
              <div class="ibox-content">
                <div class="row">
                  <div class="col-lg-3 col-sm-6 font-bold text-danger" v-if="list.received_money">回款总计：{{list.received_money}}元</div>
                  <div class="col-lg-3 col-sm-6 font-bold text-danger" v-else>回款总计：0.00元</div>
                  <div class="col-lg-3 col-sm-6 font-bold text-danger" v-if="list.total">采购总额总计：{{list.total}}元</div>
                  <div class="col-lg-3 col-sm-6 font-bold text-danger" v-else>采购总额总计：0.00元</div>
                  <div class="col-lg-3 col-sm-6 font-bold text-danger" v-if="list.is_lively_cust">活跃门店总计：{{list.is_lively_cust}}个</div>
                  <div class="col-lg-3 col-sm-6 font-bold text-danger" v-else>活跃门店总计：0个</div>
                  <div class="col-lg-3 col-sm-6 font-bold text-danger" v-if="list.overdue_number">门店逾期次数总计：{{list.overdue_number}}次</div>
                  <div class="col-lg-3 col-sm-6 font-bold text-danger" v-else>门店逾期次数总计：0次</div>
                </div>
              </div>
              <div class="ibox-content">
                <div class="container-fluid">
                  <table id="achievements" class="table  table-bordered" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                      <th>排名</th>
                      <th>门店名称</th>
                      <th>回款（元）</th>
                      <th>实际采购总额（元）</th>
                      <th>活跃门店</th>
                      <th>门店逾期次数（次）</th>
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
      region:{
        "province": [ 510000, "四川省" ],
//        "city": [ 511700, "达州市" ],
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
      $("#district1").val($(".district-select").val().split(",")[0])
      return s
    },
  },
  mounted:function () {
    inspinia();
    nav_active();
    /*Object.assign(this.$data, this.$options.data())*/

//    var arr=[ 510000, "四川省" ];

    function clearCondition(){
      $("#month").val("");
      $("#storeName").val("");
      $(".district-select").val("");
      $("#district1").val("");
    };
    $("#clearCondition").click(function(){
      clearCondition();
      searchList();
      DelayedLoading();
    });
    var self = this;
//区域
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
        var arr1=[self.region2];
//        console.log(self.$options.data())
//        $(self.$data.region).attr("province",arr1);
        $(self.$data.region).attr("city",arr2);
//        console.log(self.$data.region)
        $(".province-select").attr("disabled","disabled");
        $(".city-select").attr("disabled","disabled");
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
        var month =$("#month").val();
        var storeName =$("#storeName").val();
        var regionId=$("#district1").val();
        var request_parames = new Object();
        request_parames.month = month;
        request_parames.regionId = regionId;
        request_parames.keywords = storeName;
        param.request_parames=request_parames;
        var json = JSON.stringify(param);

        $.ajax({
          url:store.state.baseUrl.data_serv_url+"/system/salesPerformance/total",
          data:{parameter:json},
          type:"post",
          dataType:"json",
          success:function (data) {
            self.list = eval('(' + data.hmac + ')');
            //console.log(self.list.is_lively_cust)
          },
          error:function () {

          }
        })
      }
      setTimeout(total,1);
      return defer;
    };
    DelayedLoading();
    $("#achievements").dataTable({
      "bAutoWidth": false,
      "processing": true,
      "serverSide": true,//服务器分页
      "iDisplayLength": 10,//首次加载的数据条数
      "ajax": {
        "url": store.state.baseUrl.data_serv_url+"/system/salesPerformance/page",
        "type": "POST",
        "dataSrc": "hmac.data",//默认data，也可以写其他的，格式化table的时候取里面的数据
        "data":function (d) {//d 是原始的发送给服务器的数据，默认很长。
          var param = new Object();
          param.access_token = store.state.user.access_token
          param.user_id = store.state.user.userId
          var month =$("#month").val();
          var storeName =$("#storeName").val();
          var regionId=$("#district1").val();
          var request_parames = new Object();
          request_parames.start  = d.start;
          request_parames.pageSize = d.length;
          request_parames.month = month;
          request_parames.regionId = regionId;
          request_parames.keywords = storeName;
          param.request_parames=request_parames;
          var data = JSON.stringify(param);
          var obj = {};
          obj.parameter=data
          return obj;
        }
      },
      "columns": [
        { "data": "i" },
        { "data": "cust_company_name" },
        {
          "data": "received_money",//json
          "render": function (data,type,full,callback) {
            var received_money=data.toFixed(2);
            return received_money
          }
        },
        {
          "data": "total",//json
          "render": function (data,type,full,callback) {
            var total=data.toFixed(2);
            return total
          }
        },
        { "data": "is_lively_cust" },
        { "data": "overdue_number" }
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



    date();
    function date(){
      var myDate = new Date();
      var date=""
      if(myDate.getMonth()<10&&myDate.getMonth()!=0){
        date = "0"+myDate.getMonth();
      }
      else if(myDate.getMonth()==0){
        date = "12";
      }
      $("#month").val(date);
      searchList();
      DelayedLoading();
    }


    $("#searchList").click(function(){
      searchList();
      DelayedLoading();
    });

    // 搜索
    function searchList(){
      $('#achievements').DataTable().draw();
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



