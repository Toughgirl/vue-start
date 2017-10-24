<template>
<div class="gray-bg" style="height:100%">
<div class="passwordBox animated fadeInDown">
  <div class="row">
    <div class="col-md-12">
      <div class="ibox-content">
        <form>

          <div class="login-header text-center">
            <br>
            <br>
            <h1>忘记密码</h1>
            <div class="form-group">
              <span class="errorInfo"></span>
            </div>
          </div>
          <div class="form-group form-validate">
            <input type="text" class="form-control input-dark " name="telephone" id="telephone" autocomplete="off" placeholder="请输入手机号">
            <i class="fa fa-check rightIcon"></i>
            <input type="hidden" id="telephoneS" coding="" phone="">
          </div>
          <div class="form-group form-validate">
            <input type="text" class="form-control input-dark" name="getCoding" id="getCoding" style="width: 48%;float:left;margin-right: 4%"  placeholder="请输入验证码">
            <input type="button" value="获取验证码" class="btn btn-primary block m-b" style="width: 48%;float:left" id="getCodingBtn" v-on:click="getCoding()">
            <i class="fa fa-check rightIcon"></i>
            <div class="clearfix"></div>
          </div>
          <div class="form-group form-validate">
            <input type="password" class="form-control input-dark" name="newPasswd" id="newPasswd" autocomplete="off"  placeholder="请输入新密码">
            <i class="fa fa-check rightIcon"></i>
          </div>
          <div class="form-group">
            <input  type="button" class="btn btn-primary block full-width m-b" v-on:click="submit()"  value="确认">
          </div>
        </form>
        <a href="#/login" class="text-navy">&lt;&lt;返回登录</a>
      </div>

    </div>
  </div>
</div>
</div>
</template>

<script>
  import store from 'src/vuex/store.js'
    export default {
      data(){
        return{
        list:"",
        }
      },
      methods: {
        getCoding:function () {
          var param = new Object();
          param.access_token = null;
          var request_parames = new Object();
          request_parames.phone =$("#telephone").val()
          param.request_parames = request_parames;
          var data = JSON.stringify(param);
          var phone =/^1[34578]\d{9}$/
          if($('#telephone').val()==""){
              var errorMsg = '请输入手机号码';
              $('#telephone').siblings(".rightIcon").hide()
              $('#telephone').attr("placeholder",errorMsg).addClass("wrongInput");
          }else if($('#telephone').val() !="" && !(phone.test($('#telephone').val()))){
              $('#telephone').siblings(".rightIcon").hide()
              $('#telephone').addClass("wrongInput");
              $(".errorInfo").html("请输入正确的手机号码")
          }else{
            $.ajax({
              type: 'GET',
              url: store.state.baseUrl.data_serv_url+'/system/custUser/coding',
              data:{parameter:data},
              async:false,
              success:function(data) {
              if(data.code=="OK"){
                setTimeout(function() {
                   time()
                },500)
                var wait=60;
                function time(){
                  if (wait == 0) {
                    $("#getCodingBtn").removeAttr("disabled");
                    $("#getCodingBtn").val("重新获取验证码");
                    wait = 60;
                  } else {
                    $("#getCodingBtn").val("重新发送(" + wait + ")");
                    $("#getCodingBtn").attr("disabled", "true");
                    wait--;
                    setTimeout(function() {
                        time()
                      },
                      1000)
                  }
                }
                    self.list = eval('(' + data.hmac + ')')
                    $("#telephoneS").attr("coding",self.list.coding)
                    $("#telephoneS").attr("phone",self.list.phone)

              }else{
                  var errorMsg = data.message;
                    $(".errorInfo").html(data.message)
                    $('#telephone').addClass("wrongInput")
                    $('#telephone').siblings(".rightIcon").hide()
              }

              },
              error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);

              }

            })
          }
        },
        submit:function () {
          function showMessage(showMessage){
            var html = ''
                html +='<div class="showMessage-dialog">'
                  +'<div class="showMessage-content">'
                  +'<p>'+showMessage+'</p>'
                  +'</div>'
                  +'</div>'
                  +'<div class="modal-backdrop fade in"></div>';
              $("body").append(html);
            setTimeout(function(){
              $(".showMessage-dialog").hide();
              $(".modal-backdrop").hide();
            }, 1000);
          }
          var self = this;
          var param = new Object();
          param.access_token = null;
          var request_parames = new Object();
          request_parames.phone =$("#telephone").val()
          request_parames.userCoing =$("#telephoneS").attr("coding")
          request_parames.userPhone =$("#telephoneS").attr("phone")
          request_parames.password =$("#newPasswd").val()
          request_parames.coding =$("#getCoding").val()
          param.request_parames = request_parames;
          var data = JSON.stringify(param);
            var telephone = $('#telephone').val()
            var getCoding = $('#getCoding').val()
            var newPasswd = $('#newPasswd').val()
            var phone =/^1[34578]\d{9}$/
            var password = /^[\w.]{6,20}$/;
            if( telephone == ""){
              var errorMsg = '请输入手机号码';
              $('#telephone').siblings(".rightIcon").hide()
              $('#telephone').attr("placeholder",errorMsg).addClass("wrongInput");
            }else if(!(phone.test(telephone))){
              $('#telephone').siblings(".rightIcon").hide()
              $('#telephone').addClass("wrongInput");
              $(".errorInfo").html("请输入正确的手机号码")
            }else if(getCoding==""){
              $('#getCoding').addClass("wrongInput");
            }else if(newPasswd==""){
              var errorMsg = '请输入新密码';
              $('#newPasswd').attr("placeholder",errorMsg).addClass("wrongInput");
              $('#newPasswd').siblings(".rightIcon").hide()
            }else if(!(password.test(newPasswd))){
              $('#newPasswd').siblings(".rightIcon").hide()
              $('#newPasswd').addClass("wrongInput");
              $(".errorInfo").html("请输入6-20位英文、数字、符号")
            }else{
              $.ajax({
                          type: 'GET',
                          url: store.state.baseUrl.data_serv_url+'/system/custUser/check',
                          data:{parameter:data},
                          async:false,
                          success:function(data) {
                            if(data.code=="OK"){
                              showMessage("保存成功")
                              setTimeout(function(){
                                 self.$router.replace({ path: '/login' })
                              }, 1500);

                            }else{
                              alert("保存失败")

                            }

                          },
                          error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);

                          }

                        })
            }

        },

      },
      mounted:function () {
        checkAll();
        function checkAll(){
          var phone =/^1[34578]\d{9}$/;
          var password = /^[\w.]{6,20}$/;
          $('form :input').blur(function(){
            if( $(this).is('#telephone') ){
              if( this.value==""){
                var errorMsg = '请输入手机号码';
                $(this).siblings(".rightIcon").hide()
                $(this).attr("placeholder",errorMsg).addClass("wrongInput");
              }else if(!(phone.test(this.value))){
                $(this).siblings(".rightIcon").hide()
                $(this).addClass("wrongInput");
                $(".errorInfo").html("请输入正确的手机号码")
              }else{
                $(this).siblings(".rightIcon").show()
                $(this).removeClass("wrongInput");
              }
            }
            if( $(this).is('#newPasswd') ){
              if( this.value==""){
                var errorMsg = '请输入新密码';
                $(this).siblings(".rightIcon").hide()
                $(this).attr("placeholder",errorMsg).addClass("wrongInput");
              }else if(!(password.test(this.value))){
                $(this).siblings(".rightIcon").hide()
                $(this).addClass("wrongInput");
                $(".errorInfo").html("请输入6-20位英文、数字、符号")
              }else{
                $(this).siblings(".rightIcon").show()
                $(this).removeClass("wrongInput");
              }
            }


          }).focus(function(){
            $(".errorInfo").html("")
            $('form :input').removeClass("wrongInput")
          })

        }





      },
      components:{
      }
    }

</script>
