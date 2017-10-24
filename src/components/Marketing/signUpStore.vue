<template>
<div id="wrapper">
  <HtmlHeader></HtmlHeader>

  <div id="page-wrapper" class="gray-bg dashbard-1">
    <div class="row border-bottom">
      <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
          <a class="navbar-minimalize minimalize-styl-2 btn btn-primary "><i class="fa fa-bars"></i> </a>
        </div>
        <ul class="nav navbar-top-links navbar-right">
          <li class="text-navy">{{user.userName}}</li>
          <li class="text-navy">
            <a href="#" v-on:click="logOut" style="
            color:#23c6c8">
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
            签约门店统计
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
               <div class="form-group col-lg-2 col-md-4 col-sm-4 col-xs-12">
                 <button class="btn btn-red" id="clearCondition">清除条件</button>
                 <button class="btn btn-info" id="searchList">查询</button>
               </div>
             </div>
           </div>
           <div class="ibox-content">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-12 font-bold text-center">
                <div class="widget navy-bg p-xl">
                  <h2 v-if="list.sign_quantity">签约总家数：{{list.sign_quantity}}</h2>
                  <h2 v-else>签约总家数：0</h2>
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12 font-bold text-center">
                <div class="widget lazur-bg p-xl">
                  <h2 v-if="list.earnings_quantity">收益门店数：{{list.earnings_quantity}}</h2>
                  <h2 v-else>收益门店数：0</h2>
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12 font-bold text-center">
                <div class="widget yellow-bg p-xl">
                  <h2 v-if="list.activity_quantity">购销活动签约数：{{list.activity_quantity}}</h2>
                  <h2 v-else>购销活动签约数：0</h2>
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
          region: {
            "province": [ 510000, "四川省" ]
          },
          list:""
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
                $("#district1").val($(".district-select").val().split(",")[0]);
                $("#city1").val($(".city-select").val().split(",")[0]);
                return s
              },
    },
    mounted:function () {
      $(".province-select").attr("disabled","disabled");
      inspinia();
      nav_active();
      total();
      var self = this;
      function total(){
        var param = new Object();
        param.access_token = store.state.user.access_token
        param.user_id = store.state.user.userId
        var regionId="";
        if($("#city1").val()==""){
          regionId="510000";
        }
        else if($("#district1").val()==""){
          regionId=$("#city1").val();
        }else{
          regionId =$("#district1").val();
        }
        var request_parames = new Object();
        request_parames.regionId = regionId;
        param.request_parames=request_parames;
        var json = JSON.stringify(param);
        $.ajax({
          url:store.state.baseUrl.data_serv_url+"/signTotal",
          data:{parameter:json},
          type:"post",
          dataType:"json",
          success:function (data) {
            self.list = data.hmac
          },

          error:function () {

          }
        })
      }
      $("#searchList").click(function(){
        total();
      });
      function clearCondition(){
        $("#district1").val("");
        $(".city-select").val("");
        $(".district-select").val("");
      }
      $("#clearCondition").click(function(){
        location.reload()
      });

    },
    components:{
      HtmlFooter,
        HtmlHeader,
    },

    }

</script>



