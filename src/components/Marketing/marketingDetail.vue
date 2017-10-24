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
            <a href="#/marketingList">购销活动</a>
          </li>
          <li>
            购销活动详情
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
              <div v-if="map.status==1"><span class=" font-bold text-danger">进行中</span>&nbsp;&nbsp;&nbsp;{{map.company_name}}</div>
              <div v-if="map.status==2"><span class=" font-bold text-danger">暂停</span>&nbsp;&nbsp;&nbsp;{{map.company_name}}</div>
              <div v-if="map.status==3"><span class=" font-bold text-danger">关闭</span>&nbsp;&nbsp;&nbsp;{{map.company_name}}</div>
              <div v-if="map.status==4"><span class=" font-bold text-danger">结束</span>&nbsp;&nbsp;&nbsp;{{map.company_name}}</div>
            </div>
            <div class="ibox-content">
              <div class="container-fluid">
                <div v-if="list.listSize == 0 && list.close ==''"></div>
                <div v-else>
                  <div id="OperationRecord"></div>
                  <div id="closeRecord"></div>
                </div>

                <br>
                <div class="row">
                  <h3>基础信息</h3>
                  <div class="col-lg-12"><label>合同编号：</label>
                    <span>{{map.contract_num}}</span>
                  </div>
                  <div class="col-lg-12"><label>签约人：</label>
                    <span>{{map.attr_value}}</span>
                  </div>
                  <div class="col-lg-12"><label>活动开始时间：</label>
                    <span>{{map.start_time}}</span>
                  </div>
                  <div class="col-lg-12"><label>活动结束时间：</label>
                    <span>{{map.end_time}}</span>
                  </div>
                  <div class="col-lg-12"><label>目标销量：</label>
                    <span>{{map.target_sale_amount}}万</span>
                  </div>
                  <div class="col-lg-12"><label>实际销量：</label>
                    <span>{{map.amount}}万</span>
                  </div>
                  <div class="col-lg-12"><label>奖金比例：</label>
                    <span>{{map.bonus_rate | currency}}%</span>
                  </div>
                </div>
                <br>
                <div v-if="map.is_settlement== 1">
                  <div class="row">
                    <h3>结账信息</h3>
                    <div class="col-lg-12"><label>结账时间段：</label>
                      <span>{{map.start_time}}</span>
                      <span>至</span>
                      <span v-if="map.end_time">{{map.end_time}}</span>
                      <span v-else>{{map.close_end_time}}</span>
                    </div>
                    <div class="col-lg-12"><label>结账奖金比例：</label>
                      <span>{{map.bonus_rates}}%</span>
                    </div>
                    <div class="col-lg-12"><label>结账销量：</label>
                      <span>{{map.sale_amounts}}万</span>
                    </div>
                    <div class="col-lg-12"><label>结账金额：</label>
                      <span v-if="map.sett_amounts">{{map.sett_amounts}}元</span>
                      <span v-else>0元</span>
                    </div>
                    <div class="col-lg-12"><label>结账时间：</label>
                      <span v-if="map.conf_time">{{map.conf_time}}</span>
                      <span v-else>无</span>
                    </div>
                  </div>
                </div>
                <br><br>
              </div>
              <div class="col-lg-12"  v-if="map.status==1||map.status==2"><label>距离目标销量差：</label>
                <span v-if="difference>0">{{difference | currency}}元</span>
                <span v-else>0元</span>
              </div>
              <br><br>

              <hr>
              <h3>销量明细</h3>
              <div class="row">
                <div class="form-group col-lg-12 col-md-12 col-sm-12">
                  <div class="input-group left" style="width: 250px;line-height: 32px;">
                    <ul class="dateChoose">
                      <li><button class="btn btn-info btn-xs" name="1">全部</button></li>
                      <li><button class="btn btn-info btn-xs" name="2">今天</button></li>
                      <li><button class="btn btn-info btn-xs" name="3">昨天</button></li>
                      <li><button class="btn btn-info btn-xs" name="4">近一周</button></li>
                      <li><button class="btn btn-info btn-xs" name="5">近一个月</button></li>
                    </ul>
                    <div class="clearfix"></div>
                  </div>
                  <div class="input-group left" style="min-width: 500px;">
                    <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                           placeholder="选择开始时间" readonly="readonly" name="dateStart" id="dateStart"
                           onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'dateEnd\')}'})">
                    <span style="float: left;width: 4%;margin: 0 1%;text-align: center;line-height: 32px;">--</span>
                    <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%"
                           placeholder="选择结束时间" readonly="readonly" name="dateEnd" id="dateEnd"
                           onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'dateStart\')}'})">
                    <button class="btn btn-info left"  style="margin-left: 10px;"  id="searchList">查询</button>
                  </div>

                </div>
              </div>
              <br>
              <table class="table table-bordered" width="100%" id="marketingDetail">
                <thead>
                <tr>
                  <th>实际销量（元）</th>
                  <th>采购总额（元）</th>
                  <th>退货总额（元）</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
              </table>

            </div>
            <div class="ibox-content">
              <div class="form-group">
                <a href="#/marketingList">
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
    export default {
        data(){
          return{
            list:"",
            map:"",
            difference:"",
            }
        },
        computed: mapState({ user: state => state.user }),
        methods: {
                    ...mapActions([USER_SIGNOUT]),
                    logOut() {
                        this.USER_SIGNOUT()
        				        this.$router.replace({ path: '/login' })
                    },

                    findAmount:function (){
                      alert(0);
                    }

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
          request_parames.id = id;
          param.request_parames=request_parames;
          var json = JSON.stringify(param);
          $.ajax({
            url:store.state.baseUrl.data_serv_url+"/system/activityInst/edit",
            data:{parameter:json},
            type:"post",
            dataType:"json",
            success:function (data) {
              self.list = eval('(' + data.hmac + ')')
              self.map =self.list.map
              self.map.target_sale_amount = self.map.target_sale_amount/10000;
              self.difference = self.map.poor - self.map.amount
              self.map.sale_amounts = self.map.sale_amounts/10000
              self.map.amount = self.map.amount/10000
              self.map.bonus_rates = self.map.bonus_rates*100
              self.map.bonus_rate = self.map.bonus_rate*100
              var OperationRecord = "";
              var closeRecord = "";
              for(var i=0;i<(self.list.list).length;i++){
//                2017-06-25
//                暂停原因：门店违规操作未按时结算4月货款
//                暂停活动时间：2018-02-30
                OperationRecord+=self.list.list[i].ct+"<br>";
                if(self.list.list[i].remark!=""){
                  OperationRecord+=self.list.list[i].text+"原因："+self.list.list[i].remark+"<br>";
                }
                OperationRecord+=self.list.list[i].text+"活动时间："+self.list.list[i].t+"<br><br>";

              }
              $("#OperationRecord").html("<div class='row'><h3>操作记录</h3>"+OperationRecord+"</div>");
              if(self.list.close!=null){
                closeRecord+=self.list.close.modify_time+"<br>";
                closeRecord+="关闭原因："+self.list.close.close_remark+"<br>";
                closeRecord+="关闭时间："+self.list.close.close_end_time;
                $("#closeRecord").html("<div class='row'>"+closeRecord+"</div>");
              }else{
                $("#closeRecord").html("");
              }

            },
            error:function () {

            }
          });
        //列表
          $("#marketingDetail").dataTable({
            "bAutoWidth": false,
            "processing": true,
            "serverSide": true,//服务器分页
            "iDisplayLength": 10,//首次加载的数据条数
            "ajax": {
              "url": store.state.baseUrl.data_serv_url+"/system/activityInst/dealPage",
              "type": "POST",
              "dataSrc": "hmac.data",
              "data":function (d) {
                var param = new Object();
                param.access_token = store.state.user.access_token
                param.user_id = store.state.user.userId
                var dateStart =$("#dateStart").val();
                var dateEnd =$("#dateEnd").val();
                var request_parames = new Object();
                request_parames.start = d.start;
                request_parames.pageSize = d.length;
                request_parames.startTime = dateStart;
                request_parames.endTime = dateEnd;
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
              { "data": "amount" },
              { "data": "saleAmount" },
              { "data": "returnAmount" }


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
            $('#marketingDetail').DataTable().draw();
          }

//          选择时间
          var myDate = new Date();
          var yesT = new Date(myDate.getTime() - 86400000);
          var LastW = new Date(myDate.getTime() - 7 * 24 * 3600 * 1000);
          var NearlyM = new Date(myDate.getTime() - 30 * 24 * 3600 * 1000);
          function formatterDate(date) {
            var datetime = date.getFullYear()
              + "-"// "年"
              + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
              + (date.getMonth() + 1))
              + "-"// "月"
              + (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate());
            return datetime;
          }

          $(".dateChoose li").click(function(){
            $(".dateChoose li").find("button").removeClass("active");
            $(this).find("button").addClass("active");
            var flag = $(this).find("button").attr("name");
            if(flag==1){
              $("#dateStart").val("");
              $("#dateEnd").val("");
            }
            if(flag==2){
              $("#dateStart").val(formatterDate(myDate));
              $("#dateEnd").val(formatterDate(myDate));
            }
            if(flag==3){
              $("#dateStart").val(formatterDate(yesT));
              $("#dateEnd").val(formatterDate(yesT));
            }
            if(flag==4){
              $("#dateStart").val(formatterDate(LastW));
              $("#dateEnd").val(formatterDate(myDate));
            }
            if(flag==5){
              $("#dateStart").val(formatterDate(NearlyM));
              $("#dateEnd").val(formatterDate(myDate));
            }
            searchList();
          })
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



