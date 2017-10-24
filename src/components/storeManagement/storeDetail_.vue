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
              <a href="#/_storeList">门店管理</a>
            </li>
            <li>
              门店详情
            </li>
          </ol>
        </div>
        <div class="col-lg-2"></div>
      </div>
      <div class="row">
            <div class="col-lg-12">
              <div class="wrapper wrapper-content">
                <div class="ibox">
                  <div v-if="list.status==5">
                    <div class="ibox-title">
                      <h5>公司信息</h5>&nbsp;&nbsp;<span class="text-danger">驳回</span>
                      <div class="ibox-tools">
                        <a class="collapse-link" v-on:click="_href()">
                          <button class="btn btn-info btn-xs">编辑公司信息</button>
                        </a>
                      </div>
                    </div>
                    <div class="ibox-content">
                    <p v-if="list.reason">驳回原因:{{list.reason}}</p>
                    <p v-else>驳回原因:无</p>

                    <p>驳回时间:{{list.data}}</p>
                    </div>
                  </div>
                  <div v-if="list.status==2">
                    <div class="ibox-title">
                      <h5>公司信息</h5>&nbsp;&nbsp;<span class="text-danger">解约</span>
                    </div>
                    <div class="ibox-content">
                      <p>解约时间:{{list.data}}</p>
                    </div>
                  </div>
                  <div v-if="list.status==0">
                    <div class="ibox-title">
                      <h5>公司信息</h5>&nbsp;&nbsp;<span class="text-danger">冻结</span>
                    </div>
                    <div class="ibox-content">
                      <p v-if="list.data">冻结时间:{{list.data}}</p>
                      <p v-else>冻结时间:无</p>
                      <p v-if="list.sysUserName">操作人员:{{list.sysUserName}}</p>
                      <p v-else>操作人员:无</p>
                    </div>
                  </div>
                  <div v-if="list.status==1||list.status==4">
                    <div class="ibox-title">
                      <h5>公司信息</h5>
                    </div>
                  </div>
                  <div class="ibox-content form-horizontal accountContent">
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">门店名称：</label>
                      <div class="col-sm-10"><span>{{list.companyName}}</span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">负责人姓名：</label>
                      <div class="col-sm-10"><span>{{list.names}}</span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">负责人手机：</label>
                      <div class="col-sm-10"><span>{{list.adminPhone}}</span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">门店类型：</label>
                      <div class="col-sm-10"><span>{{list.type}}</span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">门店地址：</label>
                      <div class="col-sm-10"><span>{{address}}</span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group" v-if="list.dj=='是'">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">是否开启账期：</label>
                      <div class="col-sm-10"><span>{{list.dj}}</span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group" v-if="list.dj=='是'">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">滞纳金比例：</label>
                      <div class="col-sm-10"><span>{{list.late_rate}}%</span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">是否需要发票：</label>
                      <div class="col-sm-10"><span>{{list.is_parts_tax}}</span></div>
                      <div class="clearfix"></div>
                    </div>
                  </div>
                  <div class="ibox-content">
                    <div class="form-group">
                      <a href="#/_storeList"><button class="btn btn-white">返回</button></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    <input type="hidden" data-region1="" data-region2="" data-region3="" hidden style="display: none" id="EditStore">
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
          list: '',
          date1: '',
          region1:"",
          region2:"",
          address:"",
          baseImgUrl:store.state.baseUrl.img_upload_url,

        }
        },
            computed: mapState({ user: state => state.user }),
            methods: {
                        ...mapActions([USER_SIGNOUT]),
                        logOut() {
                            this.USER_SIGNOUT()
            				        this.$router.replace({ path: '/login' })
                        },
                        _href: function (event) {
                            var $href = (window.location.href).split("/");
                            var storeId= $href[$href.length-1];
                            var region1 = $("#EditStore").attr("data-region1");
                            var region2 = $("#EditStore").attr("data-region2");
                            var region3 = $("#EditStore").attr("data-region3");
                            this.$router.replace({ path: '/storeEdit_/' + storeId+"\\"+region1+"\\"+region2+"\\"+region3+''})
                        }

            },
            mounted:function () {
              nav_active();
              inspinia();
              //非列表
              var self = this;
              var param = new Object();
              param.access_token = store.state.user.access_token
              param.user_id = store.state.user.userId
              var request_parames = new Object();
              var $href = (window.location.href).split("/");
              var id= $href[$href.length-1];
              request_parames.id = id;
              param.request_parames=request_parames;
              var json = JSON.stringify(param);
              $.ajax({
                url:store.state.baseUrl.data_serv_url+"/system/store/edit2",
                data:{parameter:json},
                type:"post",
                dataType:"json",
                success:function (data) {
                  self.list = eval('(' + data.hmac + ')');
                  if(self.list.is_parts_tax==1){
                    self.list.is_parts_tax="是"
                  }else{
                    self.list.is_parts_tax="否"
                  }
                  if(self.list.dj==1){
                    self.list.dj="是"
                  }

                  var address1 = self.list.address.split(",")[0].split("/");
                  var address2 = self.list.address.split(",")[1];
                  self.address= address1[0]+address1[1]+address1[2]+address2;
                  self.region1=self.list.regionaId.substr(0, 2)+'0000';
                  self.region2=self.list.regionaId.substr(0, 4)+'00';
                  $("#EditStore").attr("data-region1",self.region1);
                  $("#EditStore").attr("data-region2",self.region2);
                  $("#EditStore").attr("data-region3",self.list.regionaId);
                },
                error:function () {

                }
              });
            },
    components:{
      HtmlFooter,
        HtmlHeader
    },
        }

</script>



