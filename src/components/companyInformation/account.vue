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
            账户中心
          </li>
          <li>
            公司信息
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
                      <h5>公司信息</h5>
                      <div class="ibox-tools">
                        <a class="collapse-link" href="#/accountEdit">
                          <button class="btn btn-info btn-xs">编辑公司信息</button>
                        </a>
                      </div>
                    </div>
                    <div class="ibox-content ">
                      <table class="table table-bordered"  >
                        <tbody>
                          <tr>
                            <td class="gray-bg">营业执照注册号：</td>
                            <td><span>{{list.operation_no}}</span></td>
                            <td class="gray-bg">公司名称：</td>
                            <td><span>{{list.company_name}}</span></td>
                          </tr>
                          <tr>
                            <td class="gray-bg">法人代表姓名：</td>
                            <td><span>{{list.legal_person}}</span></td>
                            <td class="gray-bg">法人身份证号码：</td>
                            <td><span>{{list.legal_person_idno}}</span></td>
                          </tr>
                          <tr>
                            <td class="gray-bg">注册资本：</td>
                            <td><span>{{list.registered_capital}}</span></td>
                            <td class="gray-bg">成立日期：</td>
                            <td><span>{{list.establish_time}}</span></td>
                          </tr>
                          <tr>
                            <td class="gray-bg">营业期限：</td>
                            <td><span>{{list.business_time}}</span></td>
                            <td class="gray-bg">注册地址：</td>
                            <td><span>{{list.org_address}}</span></td>
                          </tr>
                          <tr>
                            <td class="gray-bg">营业执照：</td>
                            <td>
                              <div class="accountImg">
                                <img :src="baseImgUrl+list.yPic">
                              </div>
                            </td>
                            <td class="gray-bg">法人身份证照片：</td>
                            <td>
                              <div class="accountImg left"><img :src="baseImgUrl+list.zPic"></div>
                              <div class="accountImg left"><img :src="baseImgUrl+list.fPic"></div>
                            </td>
                          </tr>
                        </tbody>

                      </table>
                    </div>
                    <div class="ibox-title" style="border-top: none;">
                      <h5>合作信息</h5>
                    </div>
                    <div class="ibox-content form-horizontal accountContent" >
                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">合同编号：</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10"><span>{{list.contract_no}}</span></div>
                        <div class="clearfix"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">区域范围：</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                          <span>{{list.area}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="ibox-title" style="border-top: none;">
                      <h5>账户信息</h5>
                    </div>
                    <div class="ibox-content form-horizontal accountContent">
                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">卡号：</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                          <span v-if="list.bank_card_num">{{list.bank_card_num}}</span>
                          <span v-else>无</span>
                        </div>
                        <div class="clearfix"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">开户银行：</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                          <span v-if="list.bank_type">{{list.bank_type}}</span>
                          <span v-else>无</span>
                        </div>
                        <div class="clearfix"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">支行名称：</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                          <span v-if="list.bank_name">{{list.bank_name}}</span>
                          <span v-else>无</span>
                        </div>
                        <div class="clearfix"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">持卡人：</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                          <span v-if="list.bank_card_name">{{list.bank_card_name}}</span>
                          <span v-else>无</span>
                        </div>
                        <div class="clearfix"></div>
                      </div>
                    </div>
                    <div class="ibox-title" style="border-top: none;">
                      <h5>其他信息</h5>
                    </div>
                    <div class="ibox-content form-horizontal accountContent">
                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">公司地址：</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                        <span>{{array1[0]}}{{array1[1]}}{{array1[2]}}</span><br>
                        <span>{{array[1]}}</span>
                        </div>
                        <div class="clearfix"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">手机号码：</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                          <span>{{list.phone}}</span>
                        </div>
                        <div class="clearfix"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">邮政编码：</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                          <span v-if="list.zip">{{list.zip}}</span>
                          <span v-else>无</span>
                        </div>
                        <div class="clearfix"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">传真号码：</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                          <span v-if="list.fax">{{list.fax}}</span>
                          <span v-else>无</span>
                        </div>
                        <div class="clearfix"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">电子邮箱：</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                          <span v-if="list.email">{{list.email}}</span>
                          <span v-else>无</span>
                        </div>
                        <div class="clearfix"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">客服QQ：</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                          <span v-if="list.qq">{{list.qq}}</span>
                          <span v-else>无</span>
                        </div>
                        <div class="clearfix"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">公司座机：</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                          <span v-if="list.landline">{{list.landline}}</span>
                          <span v-else>无</span>
                        </div>
                        <div class="clearfix"></div>
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
    require('src/vuex/modules/account/account.js')
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
      date: '',
      date1: '',
      region: {},
      list:"",
      array:[],
      array1:[],
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

                },
        beforeCreate:function () {
                             var self = this;
                             var param = new Object();
                             param.access_token = store.state.user.access_token
                             param.user_id = store.state.user.userId
                             var data = JSON.stringify(param);

                             $.ajax({
//                                 url:"/company",
                                 url:store.state.baseUrl.data_serv_url+"/system/company",
                                 data:{parameter:data},
                                 type:"post",
                                 dataType:"json",
                                 success:function (data) {
                                     self.list = eval('(' + data.hmac + ')');
//                                     console.log(self.list)
                                     self.array=self.list.address.split(",");
                                     self.array1=(self.array)[0].split("/");
                                 },
                                 error:function () {

                                 }
                             })
        },
        components:{
          HtmlFooter,
            HtmlHeader
        },
        mounted:function () {
          inspinia();
          nav_active();
        }

    }

</script>



