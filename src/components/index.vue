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
            首页
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
              <h5>你好，{{user.userName}}</h5>
              <i class="fa fa-volume-up left" style="margin-left:20px;"></i>
              <div class="scrollNews left">

                  <ul>
                      <li v-if="Procurement">{{Procurement.company_name}}于{{Procurement.create_date}}采购一笔！</li>
                      <li v-if="Return">{{Return.company_name}}于{{Return.create_date}}退货一笔！</li>
                      <li v-if="parts">{{parts.company_name}}于{{parts.create_date}}购买全车件！</li>
                      <li v-else class="text-danger">没有最新消息</li>
                  </ul>
              </div>
            </div>
            <div class="ibox-content">
                <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-2">
                         <img src="../assets/logo.png" width="100" class="img-circle img-inline">
                      </div>
                      <div class="col-lg-10">
                        <div class="row">
                          <br>
                          <div class="col-md-12"><p class=""><strong>运营商名称：</strong>{{list.companyName}}</p></div>
                          <br><br>
                          <div class="col-md-12"><p class=""><strong>运营商编号：</strong>{{list.companyNo}}</p></div>
                        </div>
                      </div>
                    </div>
                </div>
              <hr>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="widget navy-bg p-xl">
                        <div>
                          <img src="../assets/img/index1.png" width="50" class="left">

                          <h2 class="left" style="line-height:50px;">采购</h2>

                          <div class="clearfix"></div>
                        </div>
                        <ul class="list-unstyled m-t-md">

                          <li>
                            <label>采购单量:</label>
                            {{ProcurementTotal.CNum}}
                          </li>
                          <li>
                            <label>采购金额:</label>
                            <span v-if="ProcurementTotal.total_amounts">{{ProcurementTotal.total_amounts | currency}}元</span>
                            <span v-else>0元</span>
                          </li>
                          <li><label>&nbsp;</label>
                            &nbsp;</li>
                          <li><label>&nbsp;</label>
                            &nbsp;</li>
                        </ul>
                        <div class="clearfix"></div>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="widget red-bg p-xl">
                        <div>
                          <img src="../assets/img/index3.png" width="50" class="left">

                          <h2 class="left" style="line-height:50px;">退货</h2>

                          <div class="clearfix"></div>
                        </div>
                        <ul class="list-unstyled m-t-md">
                          <li>
                            <label>退货单量:</label>
                            {{ReturnTotal.RNum}}
                          </li>
                          <li>
                            <label>退货金额:</label>
                            <span v-if="ReturnTotal.amount">{{ReturnTotal.amount | currency}}元</span>
                            <span v-else>0元</span>
                          </li>
                          <li><label>&nbsp;</label>
                            &nbsp;</li>
                          <li><label>&nbsp;</label>
                            &nbsp;</li>
                        </ul>
                        <div class="clearfix"></div>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="widget lazur-bg p-xl">
                        <div>
                          <img src="../assets/img/index2.png"  width="50" class="left">
                          <h2 class="left" style="line-height:50px;">门店</h2>
                          <div class="clearfix"></div>
                        </div>
                        <ul class="list-unstyled m-t-md">
                          <li><label>总门店数：</label>
                            {{CompanyTotal.qb}}</li>
                          <li><label>正常门店：</label>
                            {{CompanyTotal.cj}}</li>
                          <li><label>解约门店：</label>
                            {{CompanyTotal.jy}}</li>
                          <li><label>冻结门店：</label>
                            {{CompanyTotal.dj}}</li>
                        </ul>
                        <div class="clearfix"></div>

                      </div>
                    </div>

                    <div class="col-lg-3">
                      <div class="widget yellow-bg p-xl">
                        <div>
                          <img src="../assets/img/index4.png"  width="50" class="left">
                          <h2 class="left" style="line-height:50px;">结算</h2>
                          <div class="clearfix"></div>
                        </div>
                        <ul class="list-unstyled m-t-md">
                          <li><label>已结单量：</label>
                            {{SettlementTotal.TotalNum}}</li>
                          <li><label>已结算未支付单量：</label>
                            {{SettlementTotal.NoNum}}</li>
                          <li><label>已结算已支付单量：</label>
                            {{SettlementTotal.Num}}</li>
                          <li><label>&nbsp;</label>
                            &nbsp;</li>
                        </ul>
                        <div class="clearfix"></div>
                      </div>
                    </div>

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
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    import { USER_SIGNOUT } from 'src/store/user/login'
    import store from 'src/vuex/store.js'
    import inspinia from 'src/assets/js/inspinia.js'
    import nav_active from 'src/assets/js/nav.js'
    import HtmlFooter from 'src/components/footer.vue'
    import HtmlHeader from 'src/components/header.vue'
    export default {
        data(){
              return{
                list:"",
                ReturnTotal:"",
                ProcurementTotal:"",
                CompanyTotal:"",
                SettlementTotal:"",
                Procurement:"",
                Return:"",
                parts:"",
                baseImgUrl:store.state.baseUrl.img_upload_url,
              }
        },
        computed: mapState({ user: state => state.user }),
        methods: {
                    ...mapActions([USER_SIGNOUT]),
                    logOut() {
                        this.USER_SIGNOUT()
        				        this.$router.replace({ path: '/login' })
                    }

        },
        mounted:function () {
                inspinia();
                nav_active();
                //非列表
                  var self = this;
                  var param = new Object();
                  param.access_token = store.state.user.access_token
                  param.user_id = store.state.user.userId
                  var json = JSON.stringify(param);
                  $.ajax({
//                    url:"/total",
                    url:store.state.baseUrl.data_serv_url+"/total",
                    data:{parameter:json},
                    type:"post",
                    dataType:"json",
                    success:function (data) {
                      self.list =data.hmac
                      self.ReturnTotal = self.list.ReturnTotal
                      self.ProcurementTotal = self.list.ProcurementTotal
                      self.CompanyTotal = self.list.CompanyTotal
                      self.SettlementTotal = self.list.SettlementTotal

                      self.Procurement = self.list.Procurement
                      self.Return = self.list.Return
                      self.parts = self.list.parts

                    },
                    error:function () {

                    }
                  });


                var settime;
                $(".scrollNews").hover(function () {
                  clearInterval(settime);
                }, function () {
                  settime = setInterval(function () {
                    var $first = $(".scrollNews ul:first");
                    var height = $first.find("li:first").height();
                    $first.animate({ "marginTop": -height + "px" }, 600, function () {
                      $first.css({ marginTop: 0 }).find("li:first").appendTo($first);
                    });
                  }, 3000);
                }).trigger("mouseleave");
        },
        components: {
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

