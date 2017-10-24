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
            <a href="#/carParts">退货业务</a>
          </li>
          <li>
            退货详情
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
              <h5>{{returnOrder.status}}</h5>
            </div>
            <div class="ibox-content">
              <table class="table table-bordered">
                <tbody>
                <tr>
                  <td class="col-md-4" valign="top">
                    <h3>退货信息</h3>

                    <div class="row">
                      <div class="col-lg-12"><label>退货单号：</label>
                        <span>{{returnOrder.goods_return_no}}</span>
                      </div>
                      <div class="col-lg-12"><label>申请人：</label>
                        <span>{{custOrder.user_name}}({{custOrder.real_name}})</span>
                      </div>
                      <div class="col-lg-12"><label>申请时间：</label>
                        <span>{{custOrder.create_date}}</span>
                      </div>
                      <div class="col-lg-12"><label>商品总数：</label>
                        <span>{{returnOrder.total_quantity}}</span>
                      </div>
                      <div class="col-lg-12"><label>商品总额：</label>
                        <span>{{returnOrder.return_total_amount | currency}}</span>
                      </div>
                      <div class="col-lg-12"><label>退款金额：</label>
                        <span>{{returnOrder.return_total_amount | currency}}</span>
                      </div>
                      <!--<div class="col-lg-12"><label>扣除返利：</label>-->
                        <!--<span v-if="returnOrder.retota">{{returnOrder.retota | currency}}</span>-->
                        <!--<span v-else>无</span>-->
                      <!--</div>-->
                      <div class="col-lg-12"><label>退货原因：</label>
                        <span v-if="returnOrder.return_reason">{{returnOrder.return_reason}}</span>
                        <span v-else>无</span>
                      </div>
                      <div class="col-lg-12"><label>详细说明：</label>
                        <span v-if="returnOrder.return_comn">{{returnOrder.return_comn}}</span>
                        <span v-else>无</span>
                      </div>
                    </div>
                  </td>
                  <td class="col-md-4" valign="top">
                    <h3>退货地址</h3>

                    <div class="row">
                      <div class="col-lg-12"><label>退货地址：</label>
                        <span>{{logisticsPoint.regionaName}}{{logisticsPoint.address}}</span>
                      </div>
                      <div class="col-lg-12"><label>收件人：</label>
                        <span>{{logisticsPoint.name}}</span>
                      </div>
                      <div class="col-lg-12"><label>联系电话：</label>
                        <span>{{logisticsPoint.phone}}</span>
                      </div>
                      <div class="col-lg-12"><label>邮政编码：</label>
                        <span>{{logisticsPoint.postalCode}}</span>
                      </div>
                    </div>
                  </td>
                  <td class="col-md-4" valign="top">
                    <h3>订单信息</h3>
                    <div class="row">
                      <div class="col-lg-12"><label>采购单号：</label><span>{{custOrder.cust_order_num}}</span></div>
                      <div class="col-lg-12"><label>商品总数：</label><span>{{custOrder.total_quantity}}</span></div>
                      <div class="col-lg-12"><label>商品总额：</label><span>{{custOrder.total_amount | currency}}</span></div>
                      <div class="col-lg-12"><label>总优惠：</label><span>{{custOrder.discount_total}}</span></div>
                      <div class="col-lg-12"><label>实付款：</label><span>{{custOrder.pay_money | currency}}</span></div>
                      <div class="col-lg-12"><label>成交时间：</label><span>{{custOrder.pay_date}}</span></div>
                      <div class="col-lg-12" v-if="carClass"><label>适用车型：</label><span>{{carClass}}</span></div>
                      <div class="col-lg-12" v-else></div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <table class="table table-bordered" width="100%">
                <thead>
                <tr>
                  <th>商品信息</th>
                  <th>退订单号</th>
                  <th v-if="carClass">流通渠道</th>
                  <th>单价</th>
                  <th>退货数量</th>
                  <th>总计</th>
                  <th>退货图片</th>
                  <th>退货原因</th>
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
                <a href="#/returnList"><button class="btn btn-white">返回</button></a>
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
            custOrder:"",
            logisticsPoint:"",
            returnOrder:"",
            carClass:""
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
        },
        mounted:function () {
          inspinia();
          nav_active();
          var self = this;
          var param = new Object();
          param.access_token = store.state.user.access_token
          param.user_id = store.state.user.userId
          var request_parames = new Object();
          var $href = (window.location.href).split("/");
          var goodsreturnid= $href[$href.length-1];
          request_parames.goodsReturnId = goodsreturnid;
          param.request_parames=request_parames;
          var json = JSON.stringify(param);
          $.ajax({
//            url:"/detailReturnOrder",
            url:store.state.baseUrl.data_serv_url+"/system/goodsReturnOrder/detail",
            data:{parameter:json},
            type:"post",
            dataType:"json",
            success:function (data) {
              self.list = eval('(' + data.hmac + ')')
              self.carClass = self.list.carClass
              self.custOrder = self.list.custOrder
              self.logisticsPoint = self.list.logisticsPoint
              self.returnOrder = self.list.returnOrder
              //console.log(data.hmac)
              //console.log(self.list)

              if(self.returnOrder.status=="500000") {
                self.returnOrder.status="处理中";
              }else if(self.returnOrder.status=="504000"){
                self.returnOrder.status="已失效";
              }else if(self.returnOrder.status=="600000"){
                self.returnOrder.status="已完成";
              }
              var format = function(time, format){
                var t = new Date(time);
                var tf = function(i){return (i < 10 ? '0' : '') + i};
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                  switch(a){
                    case 'yyyy':
                      return tf(t.getFullYear());
                      break;
                    case 'MM':
                      return tf(t.getMonth() + 1);
                      break;
                    case 'mm':
                      return tf(t.getMinutes());
                      break;
                    case 'dd':
                      return tf(t.getDate());
                      break;
                    case 'HH':
                      return tf(t.getHours());
                      break;
                    case 'ss':
                      return tf(t.getSeconds());
                      break;
                  };
                });
              };
              self.custOrder.create_date = format(self.list.custOrder.create_date, 'yyyy-MM-dd HH:mm:ss')
              self.custOrder.pay_date = format(self.list.custOrder.pay_date, 'yyyy-MM-dd HH:mm:ss')

            },
            error:function () {

            }
          });
          function getServiceTime(){
            var time ='';
            var param = new Object();
            param.access_token = store.state.user.access_token
            param.user_id = store.state.user.userId
            var data = JSON.stringify(param)
            $.ajax({
              type : "POST",
//              url : "/servnowTime",
              url : store.state.baseUrl.data_serv_url+"/nowTime",
              data:{parameter:data},
              type:"post",
              async: false,
              dataType:"json",
              success : function(data) {
                time = data;
              }
            });
            return time;
          }
          var $NOWTIME = getServiceTime().hmac.nowTime


          function getDetailContent(curr){
              if(curr==null) {curr=1;}
              var pageSize = 15;
              var param = new Object();
              param.access_token = store.state.user.access_token
              param.user_id = store.state.user.userId

              var request_parames = new Object();
              request_parames.pageSize = pageSize;
              request_parames.curr = curr;
              var $href = (window.location.href).split("/");
              var goodsreturnid= $href[$href.length-1];
              request_parames.goodsReturnId = goodsreturnid;

              param.request_parames=request_parames;
              var json = JSON.stringify(param);
              //console.log(json);
            	 $.ajax({
                 type : "POST",
//                 url : "/pageAReturnOrder",
                 url : store.state.baseUrl.data_serv_url+"/system/goodsReturnOrder/detail_page",
                 data :{parameter:json},
                 async : false,
                 success : function(data) {
                   var datas = eval(data);
                   if (datas.code=="OK") {
                     query(curr, pageSize, datas.hmac);
                   }
                 }
                 });
          };
          function thisDate(data,baseImgUrl) {
            var page_data_html = '';
            for (var i = 0 ; i < data.length; i++) {
                page_data_html += '<tr>';
//              console.log(data[i].pic_url)
                    if(data[i].pic_url==null){
                      page_data_html += '<td><img src="'+ baseImgUrl +'" width="50"><a href="javascript:;" title="' + data[i].proname + '">' + data[i].prod_offer_name +'</a></td>';
                    } else {
                      page_data_html += '<td><img src="' + baseImgUrl + data[i].pic_url + '" width="50"><a href="javascript:;" title="' + data[i].proname + '">' + data[i].prod_offer_name + '</a></td>';
                    }
              page_data_html +='<td>'+data[i].goods_return_item_no+'</td>';
              if(data[i].product_channel!=0){
                page_data_html+='<td>'+data[i].product_channel+'</td>';
              }
              page_data_html+='<td>'+data[i].sale_price.toFixed(2)+'</td>'+
                  '<td>'+data[i].quantity+'</td>'+
                  '<td>'+data[i].totl.toFixed(2)+'</td>';
                page_data_html +='<td>';
                  if(data[i].pu && data[i].pu != '' && data[i].pu !=null ){
                   var pics = data[i].pu.split(",");
                   for(var k =0;k<pics.length;k++){
                       page_data_html +='<img class="img" width="50" height="50"  src="'+baseImgUrl+pics[k]+'">';
                   }
                  }else{
                    page_data_html +='暂无图片'
                  }
                page_data_html +='</td><td>';
                if(data[i].return_reason != ''){
                  page_data_html += data[i].return_reason;
                }else{
                  page_data_html += "无";
                }
                page_data_html +='</td><td>';

                  if(data[i].status=="500000"){
                    page_data_html +='待审核'
                  }else if(data[i].status=="501000"){
                    page_data_html +='已驳回'
                  }else if(data[i].status=="502000"){
                    page_data_html +='待退货<br><span class="text-danger">退货倒计时：<span data-endTime="'+data[i].turn_off_time+'" data-servnowTime="'+$NOWTIME+'" class="timedele" data-fomart="dd天hh小时mm分ss秒"></span></span>'
                  }else if(data[i].status=="503000"){
                    page_data_html +='待收货<br><span class="text-danger">退货倒计时：<span data-endTime="'+data[i].turn_off_time+'" data-servnowTime="'+$NOWTIME+'" class="timedele" data-fomart="dd天hh小时mm分ss秒"></span></span>'
                  }else if(data[i].status=="504000"){
                    page_data_html +='已失效'
                  }else if(data[i].status=="505000"){
                    page_data_html +='已收货、待检测'
                  }else if(data[i].status=="505050"){
                    page_data_html +='供应商待确认'
                  }else if(data[i].status=="506000"){
                    page_data_html +='已撤销'
                  }else if(data[i].status=="507000"){
                    page_data_html +='有异议'
                  }else if(data[i].status=="508000"){
                    page_data_html +='已入库'
                  }else if(data[i].status=="509000"){
                    page_data_html +='已关闭'
                  }else if(data[i].status=="600000"){
                    page_data_html +='已完成'
                  }else{
                    datahtm +='无';
                  }
                page_data_html +='</td></tr>';

                function timer(intDiff,obj){
                setInterval(function(){
                  var day=0,
                    hour=0,
                    minute=0,
                    second=0;
                  var htm='';
                  if(intDiff > 0){
                    day = Math.floor(intDiff/1000/60/60/24);
                    hour = Math.floor(intDiff/1000/60/60%24);
                    minute = Math.floor(intDiff/1000/60%60);
                    second = Math.floor(intDiff/1000%60);
                    if (minute <= 9) minute = '0' + minute;
                    if (second <= 9) second = '0' + second;
                    htm += day+" 天 "+hour+" 时 "+minute+" 分 "+second+" 秒 ";
                  }else{
                    htm+='已超时';
                  }
                  $(obj).html(htm);
                  intDiff=intDiff-1000;
                }, 1000)
                }

                function ShowTime(){
                $(".timedele").each(function(){
                  var nowtime =  $(this).attr("data-servnowTime");
                  var endtime = $(this).attr("data-endTime");
                  var fomart = $(this).attr("data-fomart");
                  var mm = new Date(Date.parse(endtime.replace(/-/g, "/")));
                  var t =mm.getTime() - new Date(nowtime).getTime();
                  timer(t,this);
                })
                }
                $(function(){
                setTimeout(ShowTime,0);
                });

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



