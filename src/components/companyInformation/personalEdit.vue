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
            <a href="#/personal">个人中心</a>
          </li>
          <li>
            修改资料
          </li>
        </ol>
      </div>
      <div class="col-lg-2"></div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="wrapper wrapper-content accountContent">
          <div class="ibox">
          <div class="ibox-title">
            <h5>修改资料</h5>
          </div>
            <div class="ibox-content">
              <form method="get" class="form-horizontal">
                <div class="form-group">
                  <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label"></label>
                  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                    <input type="hidden" id="imgsrc" value="/upload/pt/2016/12/09/e5b1311448114100a604147b4bca776d.jpg">
                    <span v-if="list.portrait">
                       <img :src="baseImgUrl+list.portrait" class="img-circle img-inline imgShow left" width="100" id="imgShow">
                    </span>
                    <span v-else>
                       <img src="http://192.168.0.163:1702/upload/pt/2016/12/09/e5b1311448114100a604147b4bca776d.jpg" class="img-circle img-inline imgShow left" width="100" id="imgShow">
                    </span>
                    <div class="upfilebox left">
                      <small class="restSmall">上传图片支持 jpg、jpeg、png 格式,图片不超过1M。</small>
                      <div class="UpImg">
                        <p class="fileUpCopy">修改头像</p>
                        <input type="file" name="fileUp" class="fileUp fileUpCopy" id="fileUp" onchange="uploadHead('fileUp','imgShow','imgsrc','04','0')">
                      </div>
                    </div>
                    <div class="clearfix"></div>
                  </div>

                </div>
                <div class="hr-line-dashed"></div>
                <div class="form-group"><label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">用户名：</label>

                  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10"><span class="">{{list.userName}}</span></div>
                </div>
                <div class="hr-line-dashed"></div>
                <div class="form-group"><label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">运营商编号：</label>

                  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10"><span class="">{{list.runNumber}}</span></div>
                </div>
                <div class="hr-line-dashed"></div>
                <div class="form-group">
                  <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">法人姓名：</label>
                  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                    <span class="">{{list.legalName}}</span>
                  </div>
                </div>
                <div class="hr-line-dashed"></div>
                <div class="form-group">
                  <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">手机号码：</label>
                  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                    <span class="">{{list.phone}}</span>
                  </div>
                </div>
                <div class="hr-line-dashed"></div>
                <div class="form-group">
                  <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label">邮箱：</label>
                  <div class="col-lg-3 col-md-3 col-sm-5 col-xs-10">
                    <input type="email" class="form-control" v-model="list.email" id="email">
                  </div>
                </div>
                <div class="hr-line-dashed"></div>
                <div class="form-group">
                  <label class="col-lg-1 col-md-2 col-sm-2 col-xs-2 control-label"></label>
                  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                    <a class="btn btn-success" v-on:click="savePersonal()">保存</a>
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
    require('src/vuex/modules/account/personal.js')
    import 'babel-polyfill'
    import store from 'src/vuex/store.js'
    import inspinia from 'src/assets/js/inspinia.js'
    import nav_active from 'src/assets/js/nav.js'
    export default {
    data(){
    return{
      date: '',
      date1: '',
      list:'',
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
                    change:function(s){
//                    console.log(s)
                    },
                    //保存
                    savePersonal:function(){
                      var self = this;
                      var param = new Object();
                      param.access_token = store.state.user.access_token
                      param.user_id = store.state.user.userId
                      var portrait = $("#imgsrc").val();
                      var email = $("#email").val();
//                       console.log(portrait);
                      var request_parames = new Object();
                      request_parames.portrait=portrait;
                      request_parames.email=email;
                      param.request_parames=request_parames;
                      var json = JSON.stringify(param);


                      $.ajax({
//                        url:"/personalSave",
                        url:store.state.baseUrl.data_serv_url+"/system/custUser/saveUser",
                        data:{parameter:json},
                        type:"post",
                        dataType:"json",
                        success:function (data) {
//                          console.log(data)
                          if(data.code=="OK"){
                          self.$router.replace({ path: '/personal' });
                          }else{
                          }
                        },
                        error:function () {

                        }
                      })
                    },



        },
        beforeCreate:function () {
          var self = this;
          var param = new Object();
          param.access_token = store.state.user.access_token
          param.user_id = store.state.user.userId
          var data = JSON.stringify(param);

          $.ajax({
//            url:"/personalShow",
            url:store.state.baseUrl.data_serv_url+"/system/custUser/user",
            data:{parameter:data},
            type:"post",
            dataType:"json",
            success:function (data) {
              self.list = eval('(' + data.hmac + ')');
//              console.log(self.list)

            },
            error:function () {

            }
          })
        },
    components:{
      HtmlFooter,
        HtmlHeader
    },
    mounted:function(){
      inspinia();
      nav_active();

    }

    }

</script>



