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
            新增门店
          </li>
        </ol>
      </div>
      <div class="col-lg-2"></div>
    </div>
    <form @submit.prevent="validateBeforeSubmit" method="post">
      <div class="row">
      <div class="col-lg-12">
        <div class="wrapper wrapper-content">
          <div class="ibox">
            <div class="ibox-title">
              <h5>新增门店</h5>(<span class="check-error">*</span>为必填项)
            </div>
            <div class="ibox-content form-horizontal">
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>门店名称：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput required left" placeholder="请输入门店名称" id="storeName" name="storeName" v-validate="'required'">
                  <span v-show="errors.has('storeName')" class="left text-danger lineHeight32" >{{ errors.first('storeName') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>负责人姓名：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput left" placeholder="请输入负责人姓名" id="names" name="names" v-validate="'required|onlyName'">
                  <span v-show="errors.has('names')" class="text-danger lineHeight32 left">{{ errors.first('names') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>负责人手机：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput left" placeholder="请输入负责人手机" id="adminPhone" name="adminPhone" v-validate="'required|phone'">
                  <span v-show="errors.has('adminPhone')" class="left text-danger lineHeight32" >{{ errors.first('adminPhone') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>门店类型：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <select class="form-control defaultInput left" id="repGrade" name="repGrade" v-validate="'required'">
                    <option value="">请选择门店类型</option>
                    <option value="一类">一类</option>
                    <option value="二类">二类</option>
                    <option value="三类">三类</option>
                    <option value="个体">个体</option>
                  </select>
                  <span v-show="errors.has('repGrade')" class="left text-danger lineHeight32" >请选择门店类型</span>
                </div>

                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>门店地址：</label>
                <div class="col-lg-5 col-md-10 col-sm-10 col-xs-10">
                  <region-picker :province="region.province" :city="region.city" :district="region.district"  class="left" :placeholder="{province: '选择省', city: '选择市', district: '选择地区'}" @onchange="change" ></region-picker>
                  <input type="hidden" id="province1" name="province1" v-validate="'required'">
                  <input type="hidden" id="city1" name="city1" v-validate="'required'">
                  <input type="hidden" id="district1" name="district1" v-validate="'required'">
                  <input type="hidden" id="district2" name="district2" v-validate="'required'">
                  <span v-show="errors.has('district2')" class="left text-danger lineHeight32">请选择正确的地址</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>详细地址：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput left" placeholder="请输入详细地址" id="orgAddress" name="orgAddress" v-validate="'required'">
                  <span v-show="errors.has('orgAddress')" class="left text-danger lineHeight32" >{{ errors.first('orgAddress') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>是否需要发票：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10"  style="line-height: 32px;">
                  <input type="radio" name="isPartsTax" value="1" v-validate="'required'"> 是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="radio" name="isPartsTax" value="0" v-validate="'required'" checked> 否
                  <span v-show="errors.has('isPartsTax')" class="text-danger lineHeight32">请选择是否需要发票</span>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
            <div class="ibox-content form-horizontal">
              <div class="form-group">
                <div class="col-sm-12">
                  <button class="btn btn-success" type="submit">保存</button>
                  <button class="btn btn-white" onclick="window.history.go(-1)">返回</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
    <HtmlFooter></HtmlFooter>
  </div>
</div>
</template>
<style>
  @import '../../../static/css/validate.css';
</style>
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
    import RegionPicker from 'vue-region-picker'
    import CHINA_REGION from 'china-area-data'
    Vue.use(RegionPicker, {
      region: CHINA_REGION,
      vueVersion: 2
    })
    export default {
            data(){
              return{
                region1:"",
                region2:"",
                region:{
                  "province": [(window.location.href).split("/")[(window.location.href).split("/").length-1].substr(6,6)],
                  "city": [(window.location.href).split("/")[(window.location.href).split("/").length-1].substr(0,6)]
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
                          $("#province1").val(s.province)
                          $("#city1").val(s.city)
                          $("#district1").val($(".district-select").val().split(",")[0])
                          $("#district2").val(s.district)
                        },
              saveCompany:function() {
                var self = this;
                var param = new Object();
                param.access_token = store.state.user.access_token
                param.user_id = store.state.user.userId
                var request_parames = new Object();
                var companyName = $("#storeName").val();
                var names = $("#names").val();
                var adminPhone = $("#adminPhone").val();
                var type = $("#repGrade").val();
                var regionid = $("#district1").val();
                var address = $("#orgAddress").val();
                var isPartsTax = $("input[name='isPartsTax']:checked").val();
                var regiona = $("#province1").val()+"/"+$("#city1").val()+"/"+$("#district2").val();
                request_parames.companyName=companyName;
                request_parames.id="";
                request_parames.names=names;
                request_parames.adminPhone=adminPhone;
                request_parames.type=type;
                request_parames.regionid=regionid;
                request_parames.address=address;
                request_parames.regiona=regiona;
                request_parames.isPartsTax=isPartsTax;
                param.request_parames = request_parames;
                var json = JSON.stringify(param);
                $.ajax({
                  url: store.state.baseUrl.data_serv_url + "/system/store/save2",
                  data: {parameter: json},
                  type: "post",
                  dataType: "json",
                  success: function (data) {
                    if (data.code == "OK") {
                      self.$router.replace({path: '/_storeList'})
                      return false;
                    } else {
                      alert(data.message);
                      return false;
                    }
                  },
                  error: function () {

                  }
                })
              },
              validateBeforeSubmit() {
                this.$validator.validateAll().then(result => {
//                  console.log(result)
                  if (result==false) {
                    return;
                  }else{
                    this.saveCompany();
                  }
                });
              }
            },
            mounted:function () {
              nav_active();
              inspinia();
              $(".province-select").attr("disabled","disabled");
              $(".city-select").attr("disabled","disabled");
              $(".province").css("width","25%");
              $(".city").css("width","25%");
            },
            components: {
              HtmlFooter,
                HtmlHeader
            }
        }
</script>



