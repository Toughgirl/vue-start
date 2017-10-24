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
          <a href="#/purchaseList">采购业务</a>
        </li>
        <li>
          采购详情
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
              <h5>{{customerOrderInfo.status}}</h5>
            </div>
            <div class="ibox-content">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12 col-lg-12 col-sm-12">
                    <div class="row">
                      <div class="col-lg-4"><label>采购单号：</label>
                        <span>{{customerOrderInfo.cust_order_num}}</span>
                      </div>
                      <div class="col-lg-4"><label>商品总数：</label>
                        <span>{{customerOrderInfo.total_quantity}}</span>
                      </div>
                      <!--<div class="col-lg-12"><label>返利金额：</label>-->
                        <!--<span v-if="customerOrderInfo.total_rebate">{{customerOrderInfo.total_rebate | currency}}</span>-->
                        <!--<span v-else>无</span>-->
                      <!--</div>-->
                      <div class="col-lg-4"><label>收货地址：</label>
                        <span v-if="customerOrderInfo.addr">{{customerOrderInfo.addr}}</span>
                        <span v-else>无</span>
                      </div>
                      <div class="col-lg-4"><label>门店名称：</label>
                        <span>{{customerOrderInfo.company_name}}</span>
                      </div>
                      <div class="col-lg-4"><label>商品金额：</label>
                        <span>{{customerOrderInfo.no_discount_total | currency}}</span>
                      </div>
                      <div class="col-lg-4"><label>联系人姓名：</label>
                        <span>{{customerOrderInfo.consignee}}</span>
                      </div>
                      <div class="col-lg-4"><label>下单时间：</label><span>{{customerOrderInfo.create_date}}</span></div>
                      <div class="col-lg-4">
                        <label>优惠金额：</label>
                        <span v-if="customerOrderInfo.discount_total">{{customerOrderInfo.discount_total | currency}}</span>
                        <span v-else>无</span>
                      </div>
                      <div class="col-lg-4"><label>联系人电话：</label><span>{{customerOrderInfo.phone_nbr}}</span></div>
                      <div class="col-lg-4" v-if="carClass"><label>适用车型：</label><span>{{carClass}}</span></div>
                      <div class="col-lg-4" v-else></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="ibox-content">
              <table  class="table table-bordered" width="100%">
              <thead>
              <tr>
              <th>商品信息</th>
                <th v-if="carClass">流通渠道</th>
              <th>单价</th>
              <th>数量</th>
              <th>优惠金额</th>
              <th>总计</th>
              <th>状态</th>
              </tr>
              </thead>
              <tbody id="returnOrderDetail">

              </tbody>
              </table>
              <div id="query_number_list"></div>
            </div>
            <div class="ibox-content">
              <div class="form-group">
                  <a href="#/purchaseList"><button class="btn btn-white">返回</button></a>
              </div>
            </div>
        </div>
      </div>

    </div>
    <HtmlFooter></HtmlFooter>
      <div  class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <!--Header-->
            <div class="modal-header">
              <a type="button" class="close" data-dismiss="modal" aria-hidden="true">x</a>
              <h4 class="modal-title">
                <div id="title"></div>
              </h4>
            </div>
            <div class="modal-body">
              <div id="reason"></div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-white" data-dismiss="modal">确定</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>
</div>
<
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
            customerOrderInfo:"",
            carClass:"",
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
//
                    },
//                    cancel:function (){
//                      $(".modal").hide();
//                    },

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
          request_parames.customerOrderId = customerOrderId;
          param.request_parames=request_parames;
          var json = JSON.stringify(param);
          $.ajax({
//            url:"/detailCustomerOrder",
            url:store.state.baseUrl.data_serv_url+"/system/store/details",
            data:{parameter:json},
            type:"post",
            dataType:"json",
            success:function (data) {
              self.list = data.hmac
              //console.log(self.list)
              self.carClass = self.list.carClass
              self.customerOrderInfo = self.list.customerOrderInfo
              if(self.customerOrderInfo.status=='101300'){
                  self.customerOrderInfo.status="待审核"
              }else if(self.customerOrderInfo.status=='201400'){
                 self.customerOrderInfo.status="采购中"
              }else if(self.customerOrderInfo.status=='101200'){
                 self.customerOrderInfo.status="待支付"
              }else if(self.customerOrderInfo.status=='401600'){
                self.customerOrderInfo.status="已失效"
              }else if(self.customerOrderInfo.status=='402300'){
                self.customerOrderInfo.status="已完成"
              }
              //console.log(self.customerOrderInfo)

            },
            error:function () {

            }
          });
          //列表组

        function getDetailContent(curr){
          if(curr==null) {curr=1;}
          var pageSize = 15;
          var param = new Object();
          param.access_token = store.state.user.access_token
          param.user_id = store.state.user.userId

          var request_parames = new Object();
          request_parames.pageSize = pageSize;
          request_parames.curPage = curr;
          var $href = (window.location.href).split("/")
          var custOrderId= $href[$href.length-1];
          request_parames.custOrderId = custOrderId;

          param.request_parames=request_parames;
          var json = JSON.stringify(param);
          //console.log(json);
          $.ajax({
            type : "POST",
//            url : "/ByPageCustomerOrderDetail",
            url : store.state.baseUrl.data_serv_url+"/system/store/customerOrder/findOrderItemByPage",
            data :{parameter:json},
            async : false,
            success : function(data) {
              var datas = eval(data);
//              console.log(datas)
              if (datas.code=="OK") {
                query(curr, pageSize, datas.hmac);
              }
            }
          });
        };

        function thisDate(data) {
          var page_data_html = '';
          for (var i = 0 ; i < data.length; i++) {
            page_data_html += '<tr>'+
              '<td>'+data[i].prod_offer_name+'</td>';
            if(data[i].product_channel!=0){
              page_data_html+=  '<td>'+data[i].product_channel+'</td>';
            }

              page_data_html+=  '<td>'+data[i].price.toFixed(2)+'</td>'+
              '<td>'+data[i].total_quantity+'</td>'+
              '<td>'+data[i].discount_total.toFixed(2)+'</td>'+
              '<td>'+data[i].total_amount.toFixed(2)+'</td>';
              if(data[i].status=="402250"){
                page_data_html+='<td><a class="aaa"  data-toggle="modal" data-target="#myModal" order_item_id="'+data[i].order_item_id+'">'+data[i].status_name+'</a></td>';
              }
              else if(data[i].status=="401400"){
                page_data_html+='<td><a class="aaa"  data-toggle="modal" data-target="#myModal"  order_item_id="'+data[i].order_item_id+'">'+data[i].status_name+'</a></td>';
              }
              else if(data[i].status=="402300"){
                page_data_html+='<td><a class="aaa"  data-toggle="modal" data-target="#myModal"  order_item_id="'+data[i].order_item_id+'">'+data[i].status_name+'</a></td>';
              }
              else if(data[i].status=="401300"){
                page_data_html+='<td><a class="aaa"  data-toggle="modal" data-target="#myModal"  order_item_id="'+data[i].order_item_id+'">'+data[i].status_name+'</a></td>';
              }else{
                page_data_html+='<td>'+data[i].status_name+'</td>';
              }


            page_data_html +='</tr>';

          }
          window.page_html=page_data_html;
          return page_data_html;
        };
        var baseImgUrl =store.state.baseUrl.img_upload_url;
        function query(curr, pageSize, data) {
          var pageData = data.data;
          //分页内容处理
          thisDate(pageData,baseImgUrl);
          //调用分页
          laypage({
            cont: 'query_number_list',//容器。值支持id名、原生dom对象，jquery对象,【如该容器为】：<div id="query_number_list"></div>，或者使用$('#query_number_list')
            curr: curr || 1,//当前页
            pages: data.totalPage,//总页数
            groups: pageSize, //连续分页数，默认为5
            skip: false, //是否开启跳页
            first: 1, //将首页显示为数字1，或者显示自定义内容：如'首页'。若不显示，设置false即可
            last: data.totalPage, //将尾页显示为总页数，或者显示自定义内容：如'尾页'。若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可，或者显示自定义内容：如'上一页'
            next: '下一页', //若不显示，设置false即可，或者显示自定义内容：如'下一页'
            skin: '#FF6600',//加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
            jump: function (obj, first) { //触发分页后的回调
              if (!first) {
                getDetailContent(obj.curr)
              }
              else
              {
                $('#returnOrderDetail').html(page_html);

              }
            }
          })
        };
        getDetailContent(null);

        function getReason(obj){
          var param = new Object();
          param.access_token = store.state.user.access_token
          param.user_id = store.state.user.userId
          var request_parames = new Object();
          var order_item_id= $(obj).attr("order_item_id");
          request_parames.order_item_id = order_item_id;
          param.request_parames=request_parames;
          var json = JSON.stringify(param);
          $.ajax({
            url:store.state.baseUrl.data_serv_url+"/system/store/findOrderItemByInfo",
            data:{parameter:json},
            type:"post",
            dataType:"json",
            success:function (data) {
              self.list= data.hmac
              var reason = "";
              var title = "";
              if(self.list.status=="401400"){
                title+="订单关闭";
                reason+="关闭原因："+self.list.rtn_reason;
              }
              if(self.list.status=="402250"){
                title+="订单拒收";
                reason+="拒收原因："+self.list.reject_reason;
              }
              if(self.list.status=="401300"){
                title+="订单取消";
                reason+="取消原因："+self.list.comn;
              }
              if(self.list.status=="402300"){
                title+="订单完成";
                reason+="签收人："+self.list.user_name;
                reason+="<br>签收时间："+self.list.update_date;
              }
              $("#title").html(title);
              $("#reason").html(reason);
            },
            error:function () {

            }
          });
        }

          $(".aaa").click(function(){
            getReason(this);
          })

        },
        components:{
          HtmlFooter,
            HtmlHeader,
        },
        filters: {
          currency: function (value) {
            if (!value) return
            value = value.toFixed(2)
            return value
          }
        },
    }

</script>






