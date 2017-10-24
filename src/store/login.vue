<template>
<div style="height:100%;background:#fff;min-width:1200px;">
            <div class="operatorHD1">
                <div class="operatorHDimg left"></div><div class="operatorH left">运营商管理平台</div>
                <div class="clearfix"></div>
            </div>
            <div class="operatorCenter">
                <div class="operatorCenter1">
                    <div class="operatorCenter2"></div>
                    <div class="supplierMenuRight">
                        <div class="supplierRightHd"></div>
                        <form class="supplierRightForm">
                          <div class="supplierFormError form-group">
                             <span class="errorInfo"></span>
                          </div>
                            <div class="supplierRightFormDiv form-group form-validate">
                                <label>用户名：</label>
                                <input type="text" name="username" id="username" class="supplierRightFormInput input-dark" autocomplete="off" placeholder="用户名" v-model="form.username">
                            </div>
                            <div class="supplierRightFormDiv form-group form-validate">
                                <label>密 &nbsp; 码：</label>
                                <input type="text" placeholder="请输入密码" name="password" class="supplierRightFormInput input-dark"  onfocus="this.type='password'"  id="password" autocomplete="off" v-model="form.password">
                            </div>
                            <div class="supplierRightFormDiv supplierRightFormDiv2">
                                <label>验证码：</label>
                                <input type="text" placeholder="请输入验证码" class="supplierRightFormInput2" id="getEncode"><img class="supplierRightFormSpan" id="encode"  src="" />
                            </div>
                            <div class="form-group text-right">
                                <a href="#/forgetPassword">忘记密码？</a>
                            </div>
                                <button type="button" class=" supplierRightFormSubmit" id="login" v-on:click="submit()">登录</button>
                        </form>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        <div class="supplierFooterCenter">
            <p>服务热线：400-961-2012</p>
            <p>版权所有@ 2017 jingycf.com Inc.All Rights    &nbsp;&nbsp;&nbsp;成都市车车一二零网络科技有限公司 </p>
        </div>
</div>
</template>
<style>
  body{
      background-color: #fff;
      }
</style>
<script>
import { mapActions } from 'vuex'
import { USER_SIGNIN } from 'src/store/user/login'
import store from 'src/vuex/store.js'
export default {
        data() {
          return {
            btn: false,
            form: {
               username: '',
               password: ''
            }
          }
		    },
		    methods: {
		    ...mapActions([USER_SIGNIN]),
          submit() {
            this.btn = true
            var param = new Object();
            param.access_token = null;
            var uuid =  $("#encode").attr("src").split("=");
            var request_parames = new Object();
            request_parames.userName = $("#username").val();
            request_parames.password = $("#password").val();
            request_parames.codeing = $("#getEncode").val();
            request_parames.uuid = uuid[1];

            param.request_parames=request_parames;
            var json = JSON.stringify(param);
            var $url = store.state.baseUrl.data_serv_url;

            var flag=false;
            var userInfo=""
            if($('#username').val()==""||$('#password').val()==""){
              $(".errorInfo").html("请填写正确的用户名或密码！")
            }else if($("#getEncode").val()==""){
              $(".errorInfo").html("验证码不能为空！")
            }else{
              $.ajax({
                type: 'GET',
                url: $url+"/login",
//                url: "/loginparam",
                data:{parameter:json},
                async:false,
                success:function(data) {
                  if (data.code =="OK"){
                    flag=true
                    userInfo= eval('(' + data.hmac + ')')
                  }else{
                    function guid() {
                      function S4() {
                        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                      }
                      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
                    }
                    var $url = store.state.baseUrl.data_serv_url;
                    var uuid =  guid();
                    $("#encode").attr("src",$url+"/code?uuid="+uuid);
                    $(".errorInfo").html(data.message)
                  }

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                  alert(errorThrown);
                }

              })
              if(flag){
                //console.log(userInfo)
                this.USER_SIGNIN(userInfo)
                this.$router.replace({ path: '/index' })
              }
            }
          },
		    },

		    mounted:function (){
		      function guid() {
              function S4() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
              }
              return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
          }
          var $url = store.state.baseUrl.data_serv_url;
          var uuid =  guid();
          $("#encode").attr("src",$url+"/code?uuid="+uuid);
          $("#encode").click(function(){
              var uuid =  guid();
          	  $("#encode").attr("src",$url+"/code?uuid="+uuid);
          });

          $('form :input').blur(function(){
            //验证用户名
            if( $(this).is('#username') ){
              if( this.value==""  ){
                var errorMsg = '请输入用户名';
                $(this).siblings(".rightIcon").hide()
                $(this).attr("placeholder",errorMsg).addClass("wrongInput");
              }else{
                $(this).siblings(".rightIcon").show()
                $(this).removeClass("wrongInput");
              }
            }
            //
            if( $(this).is('#password') ){
              if( this.value==""){
                var errorMsg = '请输入密码';
                $(this).attr("placeholder",errorMsg).addClass("wrongInput");
              }else{
                $(".rightIcon").show()
                $(this).removeClass("wrongInput");
              }
            }
          }).focus(function(){
            $(".errorInfo").html("")
            $(this).removeClass("wrongInput")
          });


          $("#username").on("keydown",function(e){
              if(e.keyCode==13){
                $("#password").trigger("focus");
              }
            });
            $("#password").on("keydown",function(e){
              if(e.keyCode==13){
                $("#getEncode").trigger("focus");
              }
            });
            $("#getEncode").on("keydown",function(e){
                          if(e.keyCode==13){
                         $("#login").trigger("click");
              }
            });

		    },
    }
</script>
