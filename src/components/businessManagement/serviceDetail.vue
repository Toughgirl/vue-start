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
          <a href="#/serviceList">服务单</a>
        </li>
        <li>
          服务单详情
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
              <h5>服务单详情</h5>&nbsp;&nbsp;&nbsp;&nbsp;<span class="check-error">{{serviceOrder.status_name}}</span>
            </div>
            <div class="ibox-content">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-2" valign="top">
                    <div class="row">
                      <div class="col-lg-12"><label>服务单号：</label>
                        <span>{{serviceOrder.order_num}}</span>
                      </div>
                      <div class="col-lg-12"><label>服务费：</label>
                        <span v-if="serviceOrder.service_money">{{serviceOrder.service_money | currency}}</span>
                        <span v-else>0.00</span>
                      </div>
                      <div class="col-lg-12"><label>车主ID：</label>
                        <span v-if="serviceOrder.cust_vip_num">{{serviceOrder.cust_vip_num}}</span>
                        <span v-else>无</span>
                      </div>
                      <div class="col-lg-12"><label>车主姓名：</label>
                        <span>{{cappServOrderCar.workOrderRealName}}</span>
                      </div>
                      <div class="col-lg-12"><label>车辆颜色：</label>
                        <span v-if="cappServOrderCar.carColor">{{cappServOrderCar.carColor}}</span>
                        <span v-else>无</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3" valign="top">
                    <div class="row">
                      <div class="col-lg-12"><label>创建时间：</label>
                        <span>{{serviceOrder.add_time}}</span>
                      </div>
                      <div class="col-lg-12"><label>总金额：</label>
                        <span>{{serviceOrder.amount | currency}}</span>
                      </div>
                      <div class="col-lg-12"><label>注册手机号码：</label>
                        <span>{{serviceOrder.cust_vip_mobile}}</span>
                      </div>
                      <div class="col-lg-12"><label>车主电话：</label>
                        <span>{{cappServOrderCar.carOwnerPhone}}</span>
                      </div>
                      <div class="col-lg-12"><label>入厂油量：</label>
                        <span v-if="cappServOrderCar.inFactoryOil">{{cappServOrderCar.inFactoryOil}}</span>
                        <span v-else>无</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4" valign="top">
                    <div class="row">
                      <div class="col-lg-12"><label>服务车辆：</label><span>{{serviceOrder.car_num}}</span></div>
                      <div class="col-lg-12">
                        <label>服务门店：</label>
                        <span>{{serviceOrder.cust_company_name}}</span>
                      </div>
                      <div class="col-lg-12">
                        <label>送修人：</label><span>{{cappServOrderCar.repairName}}</span>
                      </div>
                      <div class="col-lg-12">
                        <label>车辆型号：</label>
                        <span>{{cappServOrderCar.carName | unescape}}</span>
                      </div>
                      <div class="col-lg-12">
                        <label>入厂里程数：</label>
                        <span>{{cappServOrderCar.inFactoryMileage}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3" valign="top">
                    <div class="row">
                      <div class="col-lg-12"><label>零件费：</label>
                        <span>{{serviceOrder.parts_money | currency}}</span>
                      </div>
                      <div class="col-lg-12"><label>服务顾问：</label>
                        <span v-if="serviceOrder.cust_user_real_name">{{serviceOrder.cust_user_real_name}}</span>
                        <span v-else>无</span>
                      </div>
                      <div class="col-lg-12"><label>送修电话：</label>
                        <span>{{cappServOrderCar.repairPhone}}</span>
                      </div>
                      <div class="col-lg-12"><label>车架号（VIN码）：</label>
                        <span>{{cappServOrderCar.vinNum}}</span>
                      </div>
                      <div class="col-lg-12"><label>联系地址：</label>
                        <span v-if="cappServOrderCar.repairAddress">{{cappServOrderCar.repairAddress}}</span>
                        <span v-else>无</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
            <div class="ibox-title">
              <h5>服务项目</h5>
            </div>
            <div class="ibox-content">
              <table id="returnOrderDetail" class="table table-bordered" width="100%">

              </table>
            </div>
            <div class="ibox-content">
              <div class="form-group">
                  <a href="#/serviceList"><button class="btn btn-white">返回</button></a>
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
    import store from 'src/vuex/store.js'
    import inspinia from 'src/assets/js/inspinia.js'
    import nav_active from 'src/assets/js/nav.js'
    export default {
        data(){
          return{
            list:"",
            serviceOrder:"",
            cappServOrderCar:"",
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
//                      console.log(s)
                    },
        },
        mounted:function () {
          inspinia();
          nav_active();
          //非列表
          var self = this;
          var param = new Object();
          param.access_token = store.state.user.access_token
          param.user_id = store.state.user.userId
          var request_parames = new Object();
          var $href = (window.location.href).split("/")
          var customerOrderId= $href[$href.length-1];
          var paramesId = customerOrderId.split("\\")
          request_parames.cust_company_id = paramesId[0];
          request_parames.order_id = paramesId[1];
          param.request_parames=request_parames;
          var json = JSON.stringify(param);
          $.ajax({
            url:store.state.baseUrl.data_serv_url+"/vip/cappServOrder/details_v",
            data:{parameter:json},
            type:"post",
            dataType:"json",
            success:function (data) {
              self.list = data.hmac;
              self.serviceOrder = self.list.serviceOrder;
              self.cappServOrderCar = self.list.cappServOrderCar;
              listShow(self.list.workPartsListJson);
            },
            error:function () {

            }
          });
          //列表组
          function listShow(data) {
            var param = eval('(' + data + ')');
            var page_data_html = '<thead>'+
                '<tr>' +
                '<th>工单类型</th>' +
                '<th>工单名称</th>' +
                '<th>所需工时</th>' +
                '<th>工时费</th>' +
                '<th>总金额</th>' +
                '<th>状态</th>' +
                '</tr>' +
                '</thead>';
            for (var i = 0; i < param.length; i++) {
              page_data_html += '<tbody style="width: 100%;border-collapse:collapse;"><tr>' +
                '<td>' + param[i].type_name + '</td>' +
                '<td>' + param[i].service_name + '</td>' +
                '<td>' + param[i].service_hour + '</td>' +
                '<td>' + param[i].service_money.toFixed(2) + '</td>' +
                '<td>' + param[i].amount.toFixed(2) + '</td>' +
                '<td>' + param[i].status_name + '</td>';
              page_data_html += '</tr>';
              var param1 = eval('(' + param[i].parts_json + ')');
              for (var j = 0; j < param1.length; j++) {
                page_data_html += '<tr><td colspan="6">' +
                  '<div class="col-md-5 text-left">' + param1[j].parts_name + '</div>' +
                  '<div class="col-md-2 text-left">数量：' + param1[j].quantity + '</div>' +
                  '<div class="col-md-2 text-left">单价：' + param1[j].parts_money + '</div>' +
                  '<div class="col-md-2 text-left">合计：' + param1[j].price + '</div>';
                page_data_html += '</td></tr>';
              }
              page_data_html += '</tbody>';
            }
            $('#returnOrderDetail').html(page_data_html);
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
          },
          unescape:function (value) {
            if (!value) return
            value = value.replace(/&gt;/g, ">")
            return value
          }
        }

    }

</script>



