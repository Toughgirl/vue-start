<template>
<div id="wrapper">
  <HtmlHeader></HtmlHeader>

  <div id="page-wrapper" class="gray-bg dashbard-1">
    <div class="row border-bottom">
      <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
          <a class="navbar-minimalize minimalize-styl-2 btn btn-primary "><i class="fa fa-bars"></i> </a>
        </div>
        <ul class="nav navbar-top-links navbar-right">
          <li class="text-navy">{{user.userName}}</li>
          <li class="text-navy">
            <a href="#" v-on:click="logOut" style="
            color:#23c6c8">
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
            门店应付款统计
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
               <div class="form-group col-lg-5 col-md-6 col-sm-12">
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
               <div class="form-group col-lg-3 col-md-6 col-sm-8 col-xs-12">
                 <input class="form-control" placeholder="请输入门店名称进行搜索" id="storeName">
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
                <span v-if="list.tamount">应付货款：{{list.tamount }}元</span>
                <span v-else>应付货款：0.00元</span>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-6 font-bold text-danger">
                <span v-if="list.tamount">滞纳金：{{list.tlate}}元</span>
                <span v-else>滞纳金：0.00元</span>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-6 font-bold text-danger">
                <span v-if="list.payAmount">实付款：{{list.payAmount}}元</span>
                <span v-else>实付款：0.00元</span>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-6 font-bold text-danger">
                <span v-if="list.noPayAmount">应付余额：{{list.noPayAmount}}元</span>
                <span v-else>应付余额：0.00元</span>
              </div>
            </div>
          </div>
           <div class="ibox-content" v-on:click="openImageProxy($event)">
              <div class="container-fluid">
                <table id="DataTable" class="table  table-bordered" cellspacing="0" width="100%">
                  <thead>
                  <tr>
                    <th>门店排序</th>
                    <th>门店名称</th>
                    <th>应付余额（元）</th>
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
          region: {
            "province": [ 510000, "四川省" ]
          },
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
              change:function(s){
                $("#district1").val($(".district-select").val().split(",")[0]);
                $("#city1").val($(".city-select").val().split(",")[0]);
                return s
              },
              openImageProxy: function (event) {
                if (event.target.nodeName === 'BUTTON') {
                  var $html= event.target;
                  var statisticsId = $($html).attr("statisticsId");
                  this.$router.replace({ path: '/statisticsDetail/'+ statisticsId})
                  event.stopPropagation();
                }
              },


    },
    mounted:function () {
      $(".province-select").attr("disabled","disabled");
      inspinia();
      nav_active();
      total();
      var self = this;
      function total(){
        var param = new Object();
        param.access_token = store.state.user.access_token
        param.user_id = store.state.user.userId
        var regionId="";
        if($("#district1").val()==""){
          regionId=$("#city1").val();
        }else{
          regionId =$("#district1").val();
        }
        var storeName =$("#storeName").val();
        var request_parames = new Object();
        request_parames.regionId = regionId;
//        console.log(request_parames.regionId);
        request_parames.keywords = storeName;
        param.request_parames=request_parames;
        var json = JSON.stringify(param);
        $.ajax({
          url:store.state.baseUrl.data_serv_url+"/system/companySettlement/settlementTotal",
          data:{parameter:json},
          type:"post",
          dataType:"json",
          success:function (data) {
            self.list = data.hmac
          },
          error:function () {

          }
        })
      }
      $("#DataTable").dataTable({
        "bAutoWidth": false,
        "processing": true,
        "serverSide": true,//服务器分页
        "iDisplayLength": 10,//首次加载的数据条数
        "ajax": {
          "url": store.state.baseUrl.data_serv_url+"/system/companySettlement/settlementPage",
          "type": "POST",
          "dataSrc": "hmac.data",//默认data，也可以写其他的，格式化table的时候取里面的数据
          "data":function (d) {//d 是原始的发送给服务器的数据，默认很长。
            var param = new Object();
            param.access_token = store.state.user.access_token
            param.user_id = store.state.user.userId
            var regionId="";
            if($("#district1").val()==""){
              regionId=$("#city1").val();
            }else{
              regionId =$("#district1").val();
            }
            var regionId =regionId;
            var storeName =$("#storeName").val();
            var request_parames = new Object();
            request_parames.start  = d.start;
            request_parames.pageSize = d.length;
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
          { "data": "company_name" },
          {
            "data": "money",//json
            "render": function (data,type,full,callback) {
              var money=data.toFixed(2);
              return money
            }
          },
          //操作列
          {
            "data": "",
            "render": function (data,type,full,callback) {
              var datahtml='';
              datahtml+='<button class="btn btn-info btn-xs"  statisticsId="'+full.id+'">详情</button>'
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
      function clearCondition(){
        $("#status").val("");
        $("#storeName").val("");
        $("#district1").val("");
        $(".province-select").val("");
        $(".city-select").val("");
        $(".district-select").val("");
      }
      // 搜索
      function searchList(){
        total();
        $('#DataTable').DataTable().draw();
      }
      $("#clearCondition").click(function(){
//        clearCondition();
//        searchList();
        location.reload()
      });

    },
    components:{
      HtmlFooter,
        HtmlHeader,
    },
    }

</script>



