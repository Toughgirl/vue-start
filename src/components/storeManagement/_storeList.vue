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
            门店管理
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
                <div class="form-group col-lg-2 col-sm-12">
                  <div class="input-group">
                    <div class="input-group-addon">状态：</div>
                    <select class="form-control" id="status">
                      <option value="">全部</option>
                      <option value="2">解约</option>
                      <option value="1">正常</option>
                      <option value="0">冻结</option>
                      <option value="5">驳回</option>
                      <option value="4">审核中</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-lg-2 col-sm-12">
                  <div class="input-group">
                    <div class="input-group-addon">类型：</div>
                    <select class="form-control" id="gradeType">
                      <option value="">全部</option>
                      <option value="一类">一类</option>
                      <option value="二类">二类</option>
                      <option value="三类">三类</option>
                      <option value="个体">个体</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-lg-2 col-sm-12">
                  <div class="input-group">
                    <div class="input-group-addon">账期：</div>
                    <select class="form-control" id="paymentStatus">
                      <option value="">请选择账期状态</option>
                      <option value="1">开启</option>
                      <option value="0">关闭</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-lg-5 col-sm-12">
                  <div class="input-group">
                    <div class="input-group-addon">提交日期：</div>
                    <div style="width: 100%;float: left;height: 32px;">
                      <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                             placeholder="选择开始时间" readonly="readonly" name="dateStart" id="dateStart"
                             onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'dateEnd\')}'})">
                      <span style="float: left;width: 4%;margin: 0 1%;text-align: center;line-height: 32px;">--</span>
                      <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                             placeholder="选择结束时间" readonly="readonly" name="dateEnd" id="dateEnd"
                             onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'dateStart\')}'})">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-lg-5 col-sm-12">
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
                <div class="form-group col-lg-2 col-sm-4">
                  <div class="input-group">
                    <input class="form-control" placeholder="输入门店名称/负责人手机号" id="storeName">
                  </div>
                </div>
                <div class="form-group col-lg-4 col-sm-8">
                  <button class="btn btn-red" id="clearCondition">清除条件</button>
                  <button class="btn btn-info" id="searchList">查询</button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <!--<a href="#/storeNew">-->
                    <button class="btn btn-warning" data-region1="" data-region2="" id="addNewStore" v-on:click="openNew($event)">新增门店</button>
                  <!--</a>-->
                </div>
              </div>
            </div>
            <div class="ibox-content" v-on:click="openImageProxy($event)">
                <div class="container-fluid">
                  <table id="DataTable" class="table  table-bordered" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                    <th>门店编号</th>
                    <th>门店类型</th>
                    <th>负责人手机号</th>
                    <th>门店名称</th>
                    <th>所属区域</th>
                    <th>提交时间</th>
                    <!--<th>合同编号</th>-->
                    <!--<th>加盟日期</th>-->
                    <th>门店状态</th>
                    <th>账期状态</th>
                    <th>操作</th>
                    </tr>
                    </thead>

                  </table>
                </div>
            </div>
          </div>
        </div>
      </div>
      <HtmlFooter></HtmlFooter>
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
      _s:"",
      date: "",
      date1: "",
      region: {
        "province":["510000"],
        "city":[]
      },
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

                  change:function(s){
                     $("#district1").val($(".district-select").val().split(",")[0])
                    $("#city1").val($(".city-select").val().split(",")[0]);
                     return s
                  },
                  openImageProxy: function (event) {
                    if (event.target.nodeName === 'BUTTON') {
                      var $html= event.target;
                      var storeId = $($html).attr("storeId");
//                      var storecomplete = $($html).attr("storecomplete");
//                      if(storecomplete==1){
//                        this.$router.replace({ path: '/storeDetail_/' + storeId})
//                      }else{
//                        this.$router.replace({ path: '/storeDetail/' + storeId})
//                      }
                      this.$router.replace({ path: '/storeDetail_/' + storeId});

                      event.stopPropagation();
                    }
                  },
                  openNew:function(event){
                    if (event.target.nodeName === 'BUTTON') {
                      var $html= event.target;
                      var region1 = $("#addNewStore").attr("data-region1");
                      var region2 = $("#addNewStore").attr("data-region2");
                      this.$router.replace({ path: '/storeNew_/' + region1+region2})
                      event.stopPropagation();
                    }
                  }
        },
        mounted:function () {
          $(".province-select").css("max-width","160px");
          $(".city-select").css("max-width","160px");
          $(".district-select").css("max-width","160px");
          inspinia();
          nav_active();


          var self = this;
          //              运营商地址限制
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
//              var arr1=[self.region2];
//              $(self.$data.region).attr("province",arr1);
              $(self.$data.region).attr("city",arr2);
              $("#city1").val(self.region1)
              $("#addNewStore").attr("data-region1",self.region1);
              $("#addNewStore").attr("data-region2",self.region2);
              $(".province-select").attr("disabled","disabled");
              $(".city-select").attr("disabled","disabled");
              searchList();
            },
            error:function () {

            }
          });

          function clearCondition(){
            $("#status").val("");
            $("#storeName").val("");
            $("#gradeType").val("");
            $("#paymentStatus").val("");
            $("#dateStart").val("");
            $("#dateEnd").val("");
            $("#district1").val("");
            $(".district-select").val("");
          }
          $("#clearCondition").click(function(){
            clearCondition();
            searchList();
          });

          $("#DataTable").dataTable({
            "bAutoWidth": false,
            "processing": true,
            "serverSide": true,//服务器分页
            "iDisplayLength": 10,//首次加载的数据条数
            "ajax": {
//              "url": "/storeList",
              "url": store.state.baseUrl.data_serv_url+"/system/store/page",
              "type": "POST",
              "dataSrc": "hmac.data",//默认data，也可以写其他的，格式化table的时候取里面的数据
              "data":function (d) {//d 是原始的发送给服务器的数据，默认很长。
                var param = new Object();
                param.access_token = store.state.user.access_token
                param.user_id = store.state.user.userId
                var status =$("#status").val();
                var regionId="";
                if($("#district1").val()==""){
                  regionId=$("#city1").val();
                }else{
                  regionId =$("#district1").val();
                }
                var gradeType =$("#gradeType").val();
                var keywords =$("#storeName").val();
                var dateStart =$("#dateStart").val();
                var dateEnd =$("#dateEnd").val();
                var paymentStatus =$("#paymentStatus").val();
                var request_parames = new Object();
                request_parames.start = d.start;
                request_parames.pageSize = d.length;
                request_parames.status = status;
                request_parames.regionId = regionId;
                request_parames.gradeType = gradeType;
                request_parames.payment = paymentStatus;
                request_parames.keywords = keywords;
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
              { "data": "company_no" },
              { "data": "gradeType" },
              { "data": "phone" },
              { "data": "company_name" },
              { "data": "regionas" },
              { "data": "create_time" },
              {
                "data": "status",
                "render": function (data, type, full, callback) {
                  var datahtml = "";
                  if (data == 1) {
                    datahtml += "正常";
                  } else if (data == 0) {
                    datahtml += "冻结";
                  } else if (data == 2) {
                    datahtml += "解约";
                  } else if (data == 4) {
                    datahtml += "审核中";
                  } else if (data == 5) {
                    datahtml += "驳回";
                  }
                  return datahtml;
                }
              },
              {
                "data": "dj",
                "render": function (data,type,full,callback) {
                  var datahtml="";
                  if(data==1){
                    datahtml+="开启";
                  }else {
                    datahtml+="关闭";
                  }
                  return datahtml;
                }
              },
              //操作列
              {
                "data": "",//json
                "render": function (data,type,full,callback) {
                  var datahtml='';
                  datahtml+='<button class="btn btn-info btn-xs" storeComplete="'+full.is_complete+'" storeId="'+full.id+'" storeStatus = "'+full.status+'">详情</button>'
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
    }

</script>



