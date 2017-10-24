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
            公司信息编辑
          </li>
        </ol>
      </div>
      <div class="col-lg-2"></div>
    </div>
    <div class="row">
      <div class="col-lg-12">
         <div class="wrapper wrapper-content">
            <div class="ibox">
              <div class="ibox-content form-horizontal accountContent">
                  <form id="form" @submit.prevent="validateBeforeSubmit">
                   <div class="form-group">
                     <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">公司地址：</label>
                     <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                       <div class="input-group">
                           <region-picker :province="region.province" :city="region.city" :district="region.district" :placeholder="{province: ''+array1[0]+'', city: ''+array1[1]+'', district: ''+array1[2]+''}" @onchange="change" >
                           </region-picker>
                            <input type="hidden" id="province1">
                            <input type="hidden" id="city1" >
                            <input type="hidden" id="district1">
                         <input type="text" class="form-control defaultInput left {'input': true, 'is-danger': errors.has('email') }" v-model="array[1]" name="address" id="address" placeholder="请输入详细地址" v-validate="'required'">
                         <span v-show="errors.has('address')" class="left text-danger" >{{ errors.first('address') }}</span>
                       </div>
                     </div>
                     <div class="clearfix"></div>
                   </div>
                   <div class="form-group">
                     <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">手机号码：</label>
                     <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                       <div class="input-group">
                         <input type="text" class="form-control  left" v-model="list.phone"  v-validate="'required|phone'" name="phone" id="phone" placeholder="请输入负责人手机">
                         <span v-show="errors.has('phone')" class="left text-danger" >{{ errors.first('phone') }}</span>
                       </div>
                     </div>
                     <div class="clearfix"></div>
                   </div>
                   <div class="form-group">
                    <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">邮政编码：</label>
                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="list.zip" id="zip"
                               onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="6">
                      </div>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                   <div class="form-group">
                     <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">传真号码：</label>
                     <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                       <div class="input-group">
                         <input type="text" class="form-control left" v-model="list.fax" id="fax"  name="fax" v-validate="'fax'">
                         <span v-show="errors.has('fax')" class="left text-danger" >{{ errors.first('fax') }}</span>
                       </div>
                     </div>
                     <div class="clearfix"></div>
                   </div>
                   <div class="form-group">
                     <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">电子邮箱：</label>
                     <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                       <div class="input-group">
                         <input type="text" class="form-control   left" v-model="list.email" id="email"  name="email" placeholder="请输入电子邮箱" v-validate="'required|email'">
                         <span v-show="errors.has('email')" class="left text-danger" >{{ errors.first('email') }}</span>
                       </div>
                     </div>
                     <div class="clearfix"></div>
                   </div>
                   <div class="form-group">
                     <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">客服QQ：</label>
                     <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                       <div class="input-group">
                         <!--<input type="text" class="form-control" v-model="list.qq" id="qq" onkeyup="value=value.replace(/[^\d]/g,'')">-->
                         <input type="text" class="form-control" v-model="list.qq" id="qq" name="qq" v-validate="'qq'">
                         <span v-show="errors.has('qq')" class="left text-danger" >{{ errors.first('qq') }}</span>
                       </div>
                     </div>
                     <div class="clearfix"></div>
                   </div>
                   <div class="form-group">
                     <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">公司座机：</label>
                     <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                       <div class="input-group">
                         <input type="text" class="form-control left" v-model="list.landline" id="landline" name="landline" v-validate="'landline'">
                         <span v-show="errors.has('landline')" class="left text-danger" >{{ errors.first('landline') }}</span>
                       </div>
                     </div>
                     <div class="clearfix"></div>
                   </div>
                   <div class="form-group">
                       <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label"></label>
                       <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                         <button class="btn btn-success"  type="submit">保存</button>
                         <button class="btn btn-white" onclick="window.history.go(-1)">返回</button>
                       </div>
                   </div>
                  </form>
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
           list:"",
           _s:"",
           array:[],
           array1:[],
           region: {
                province: $("#province1").val(),
                city: $("#city1").val(),
                district: $("#district1").val()
           },
        }
    },
    computed:mapState({user: state => state.user,}),
    methods: {
      ...mapActions([USER_SIGNOUT]),
      logOut() {
          this.USER_SIGNOUT()
          this.$router.replace({ path: '/login' })
      },
      change:function(s){
        $("#province1").val(s.province)
        $("#city1").val(s.city)
        $("#district1").val(s.district)
        return s
      },
      saveCompany:function(){
        var self = this;
        var param = new Object();
        param.access_token = store.state.user.access_token
        param.user_id = store.state.user.userId
        var Addre =$("#province1").val()+"/"+$("#city1").val()+"/"+$("#district1").val() ;
        var address =$("#address").val();
        var phone =$("#phone").val();
        var zip =$("#zip").val();
        var fax =$("#fax").val();
        var email =$("#email").val();
        var qq =$("#qq").val();
        var landline =$("#landline").val();
        var request_parames = new Object();
        request_parames.addre=Addre;
        request_parames.address=address;
        request_parames.phone=phone;
        request_parames.zip=zip;
        request_parames.email=email;
        request_parames.fax=fax;
        request_parames.qq=qq;
        request_parames.landline=landline;
        param.request_parames=request_parames;
        var json = JSON.stringify(param);
        $.ajax({
          url:store.state.baseUrl.data_serv_url+"/system/saveCompany",
          data:{parameter:json},
          type:"post",
          dataType:"json",
          success:function (data) {
            if(data.code=="OK"){
//                  self.$router.replace("/account")
              window.location.href="#/account"
            }else{

            }
          },
          error:function () {

          }
        })
      },
      validateBeforeSubmit() {
        this.$validator.validateAll().then(result => {
          if (result==false) {
                return;
            }else{
                this.saveCompany();
            }

      });
      }

    },
    beforeCreate:function () {
      var self = this;
      var param = new Object();
      param.access_token = store.state.user.access_token
      param.user_id = store.state.user.userId
      var data = JSON.stringify(param);
      $.ajax({
        url:store.state.baseUrl.data_serv_url+"/system/company",
        data:{parameter:data},
        type:"post",
        dataType:"json",
        success:function (data) {
          self.list = eval('(' + data.hmac + ')');
          //console.log(self.list)
          self.array=self.list.address.split(",");
          self.array1=self.list.address.split(",")[0].split("/");
          $("#province1").val(self.array1[0])
          $("#city1").val(self.array1[1])
          $("#district1").val(self.array1[2])
          $(".province-select").click(function(){
            $(this).find("option:eq(0)").html("")
            $(".city-select").find("option:eq(0)").html("");
            $(".district-select").find("option:eq(0)").html("");
          })
          $(".city-select").click(function(){
            $(".province-select").find("option:eq(0)").html("");
            $(".district-select").find("option:eq(0)").html("");
            $(this).find("option:eq(0)").html("");
          })
          $(".district-select").click(function(){
            $(".province-select").find("option:eq(0)").html("");
            $(".city-select").find("option:eq(0)").html("");
            $(this).find("option:eq(0)").html("");
          })

        },
        error:function () {

        }
      })
    },
    mounted:function(){
      inspinia();
      nav_active();


    },
    components:{
      HtmlFooter,
        HtmlHeader
    }
    }

</script>



