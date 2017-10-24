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
            修改密码
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
            <h5>修改密码</h5>
          </div>
            <div class="ibox-content">
              <form class="form-horizontal">
                <div class="hr-line-dashed"></div>
                <div class="form-group"><label class="col-lg-1 col-md-2 col-sm-2 col-xs-12 control-label">用户名：</label>

                  <div class="col-lg-3 col-md-3 col-sm-5 col-xs-12"><span class="">{{list.userName}}</span></div>
                </div>
                <div class="hr-line-dashed"></div>
                <div class="form-group "><label class="col-lg-1 col-md-2 col-sm-2 col-xs-12 control-label">旧密码：</label>
                  <div class="col-lg-3 col-md-3 col-sm-5 col-xs-3 editDiv"><input type="password" id="password" class="form-control"></div><div class="col-sm-3"><span class="errorSpan"></span></div>
                </div>
                <div class="hr-line-dashed"></div>
                <div class="form-group">
                  <label class="col-lg-1 col-md-2 col-sm-2 col-xs-12 control-label">新密码：</label>
                  <div class="col-lg-3 col-md-3 col-sm-5 col-xs-12 editDiv"><input type="password" id="newPassword" class="form-control"></div><div class="col-sm-3"><span class="errorSpan"></span></div>
                </div>
                <div class="hr-line-dashed"></div>
                <div class="form-group">
                  <div class="col-sm-10 col-lg-11 col-md-10 col-xs-10 col-sm-offset-2 col-xs-offset-2 col-md-offset-2 col-lg-offset-1"><p>密码由6-16个字符组成,可使用数字、英文字母、下划线，密码区分大小写</p></div>
                  <label class="col-lg-1 col-md-2 col-sm-2 col-xs-12 control-label">密码强度：</label>
                  <div class="col-lg-3 col-md-3 col-sm-5 col-xs-12">
                    <div class="pwd_from_grade">
                      <div class="pwd_from_grade_div ">
                        <div id="pwd_from_grade_div" class="pwd_grade pwd_grade_grey"></div>
                        <p class="pwd_grade_p">低</p>
                      </div>
                      <div class="pwd_from_grade_div2">
                        <div id="pwd_from_grade_div2" class="pwd_grade pwd_grade_grey"></div>
                        <p class="pwd_grade_p">中</p>
                      </div>
                      <div class="pwd_from_grade_div3">
                        <div id="pwd_from_grade_div3" class="pwd_grade pwd_grade_grey"></div>
                        <p class="pwd_grade_p">高</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-10 col-lg-11 col-md-10 col-xs-10 col-sm-offset-2 col-xs-offset-2 col-md-offset-2 col-lg-offset-1"><p>为了提升您的密码安全性，建议使用英文字母加数字或符号的混合密</p></div>
                </div>
                <div class="hr-line-dashed"></div>
                <div class="form-group">
                  <label class="col-lg-1 col-md-2 col-sm-2 col-xs-12 control-label">确认新密码：</label>
                 <div class="col-lg-3 col-md-3 col-sm-5 col-xs-12 editDivs"><input type="password" id="newPasswordTwo" class="form-control"></div><div class="col-sm-3"><span class="errorSpan"></span></div>
                </div>
                <div class="hr-line-dashed"></div>
                <div class="form-group">
                   <div class="col-sm-10 col-lg-11 col-md-10 col-xs-10 col-sm-offset-2 col-xs-offset-2 col-md-offset-2 col-lg-offset-1">
                     <button class="btn btn-success pwd_form_submit" v-on:click="savePassword()" disabled>保存</button>
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
    require('../../vuex/modules/account/changePassWord.js');
    import HtmlFooter from 'src/components/footer.vue'
    import HtmlHeader from 'src/components/header.vue'
    import store from 'src/vuex/store.js'
    import inspinia from 'src/assets/js/inspinia.js'
    import nav_active from 'src/assets/js/nav.js'
    export default {
    data(){
      return{
        list:"",
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
                    savePassword:function () {
                              var self = this;
                              var param = new Object();
                              param.access_token = store.state.user.access_token
                              param.user_id = store.state.user.userId
                              var request_parames = new Object();
                              request_parames.oldPassword =$("#password").val()
                              request_parames.newPassword =$("#newPassword").val()
                              request_parames.newPasswords =$("#newPasswordTwo").val()
                              param.request_parames = request_parames;
                              var data = JSON.stringify(param);
//                              console.log(data)
                              $.ajax({
                                type: 'GET',
//                                url: '/savePassWord',
                                url: store.state.baseUrl.data_serv_url+'/system/custUser/savePassWord',
                                data:{parameter:data},
                                async:false,
                                success:function(data) {
                                  if(data.code=="OK"){
                                    alert("保存成功!")
                                    self.USER_SIGNOUT();
                                    self.$router.replace({ path: '/login' });
                                  }else{
                                    alert(data.message)
                                  }

                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                  alert(errorThrown);

                                }

                              })
                            },

        },
        mounted:function () {
          inspinia();
          nav_active();


          $(function(){
            $('#newPassword').focus(function () {

              $('#pwd_from_grade_div').attr('class', 'pwd_grade');
              $('#newPassword').keyup();
            });

            $('#newPassword').keyup(function () {
              var __th = $(this);

              if (!__th.val()) {
                $('.pwd_form_hint').hide();
                $('.pwd_form_hint').show();
                Primary();
                return;
              }
              if (__th.val().length < 6) {
                $('.pwd_form_hint').hide();
                $('.pwd_form_hint').show();
                Weak();
                return;
              }
              var _r = checkPassword(__th);
              if (_r < 1) {
                $('.pwd_form_hint').hide();
                $('.pwd_form_hint').show();
                Primary();
                return;
              }

              if (_r > 0 && _r < 2) {
                Weak();
              } else if (_r >= 2 && _r < 4) {
                Medium();
              } else if (_r >= 4) {
                Tough();
              }

              $('.pwd_form_hint').hide();
              $('.pwd_form_hint').hide();
            });


            var ok1 = false;
            var ok2 = false;
            $("#password").blur(function(){
              var $password = $("#password").val();
              var pwd = /^[a-zA-Z0-9_-]{6,16}$/;
              if($password == ""){
                $(this).css({borderColor:"red"});
                $(this).parent().siblings().find(".errorSpan").addClass("check-error").html("&nbsp;密码不能为空");
                return false;
              }
              if($password && pwd.test($password)){
                $(this).css({borderColor:"#ddd"});
                $(this).parent().siblings().find(".errorSpan").addClass("check-right").html("");
                ok1=true;
              }else{
                $(this).css({borderColor:"red"});
                $(this).parent().siblings().find(".errorSpan").addClass("check-error").html("&nbsp;密码长度6-16位且不能输入非法字符");
                return false;
              }
            }).focus(function(){
              $(this).css({borderColor:"#ddd"});
              $(this).parent().siblings().find(".errorSpan").removeClass("check-error").html("");
            });

            $("#newPassword").blur(function(){

              var $newPassword = $("#newPassword").val();
              var pwd = /^[a-zA-Z0-9_-]{6,16}$/;
              if($newPassword == ""){
                $(this).css({borderColor:"red"});
                $(this).parent().siblings().find(".errorSpan").addClass("check-error").html("&nbsp;密码不能为空");
                return false;
              }
              if($newPassword && pwd.test($newPassword)){
                $(this).css({borderColor:"#ddd"});
                $(this).parent().siblings().find(".errorSpan").addClass("check-right").html("");
              }else{
                $(this).css({borderColor:"red"});
                $(this).parent().siblings().find(".errorSpan").addClass("check-error").html("&nbsp;密码长度6-16位且不能输入非法字符");
                return false;
              }
            }).focus(function(){
              $(this).css({borderColor:"#ddd"});
              $(this).parent().siblings().find(".errorSpan").removeClass("check-error").html("");
            });
            $("#newPasswordTwo").blur(function() {

              var $newPassword = $("#newPassword").val();
              var $newPasswordTwo = $("#newPasswordTwo").val();
              var pwd = /^[a-zA-Z0-9_-]{6,16}$/;
              if($newPasswordTwo == ""){
                $(this).css({borderColor:"red"});
                $(this).parent().siblings().find(".errorSpan").addClass("check-error").html("&nbsp;密码不能为空");
                return false;
              }
              if ($newPasswordTwo != $newPassword) {
                $(this).css({borderColor:"red"});
                $(this).parent().siblings().find(".errorSpan").addClass("check-error").html("&nbsp;密码不一致");
                return false;
              }
              if($newPasswordTwo == $newPassword&& pwd.test($newPasswordTwo) ) {
                $(this).css({borderColor:"#ddd"});
                $(this).parent().siblings().find(".errorSpan").addClass("check-right").html("");
                ok2 = true;
                if(ok1&&ok2){
                  $('.pwd_form_submit').attr("disabled", false);
                }
              }else{
                $(this).css({borderColor:"red"});
                $(this).parent().siblings().find(".errorSpan").addClass("check-error").html("&nbsp;密码长度6-16位且不能输入非法字符");
                return false;
              }
            }).focus(function(){
              $(this).css({borderColor:"#ddd"});
              $(this).parent().siblings().find(".errorSpan").removeClass("check-error").html("");
            });


          })




          function Primary() {
            $('#pwd_from_grade_div').attr('class', 'pwd_grade pwd_grade_grey');
            $('#pwd_from_grade_div2').attr('class', 'pwd_grade pwd_grade_grey');
            $('#pwd_from_grade_div3').attr('class', 'pwd_grade pwd_grade_grey');
          }

          function Weak() {
            $('#pwd_from_grade_div').attr('class', 'pwd_grade');
            $('#pwd_from_grade_div2').attr('class', 'pwd_grade pwd_grade_grey');
            $('#pwd_from_grade_div3').attr('class', 'pwd_grade pwd_grade_grey');
          }

          function Medium() {
            $('#pwd_from_grade_div').attr('class', 'pwd_grade');
            $('#pwd_from_grade_div2').attr('class', 'pwd_grade');
            $('#pwd_from_grade_div3').attr('class', 'pwd_grade pwd_grade_grey');
          }

          function Tough() {
            $('#pwd_from_grade_div').attr('class', 'pwd_grade');
            $('#pwd_from_grade_div2').attr('class', 'pwd_grade');
            $('#pwd_from_grade_div3').attr('class', 'pwd_grade');
          }


          function checkPassword(pwdinput) {
            var maths, smalls, bigs, corps, cat, num;
            var str = $(pwdinput).val();
            var len = str.length;

            var cat = /.{16}/g;
            if (len == 0) return 1;
            if (len > 16) {
              //console.log(str.match(cat)[0]);
              $(pwdinput).val(str.match(cat)[0]);
            }
            cat = /.*[\u4e00-\u9fa5]+.*$/;
            if (cat.test(str)) {
              return -1;
            }
            cat = /\d/;
            maths = cat.test(str);
            cat = /[a-z]/;
            smalls = cat.test(str);
            cat = /[A-Z]/;
            bigs = cat.test(str);
            corps = corpses(pwdinput);
            num = maths + smalls + bigs + corps;
            //console.log(num);

            if (len < 6) {
              return 1;
            }

            if (len >= 6 && len <= 8) {
              if (num == 1) return 1;
              if (num == 2 || num == 3) return 2;
              if (num == 4) return 3;
            }

            if (len > 8 && len <= 11) {
              if (num == 1) return 2;
              if (num == 2) return 3;
              if (num == 3) return 4;
              if (num == 4) return 5;
            }

            if (len > 11) {
              if (num == 1) return 3;
              if (num == 2) return 4;
              if (num > 2) return 5;
            }
          }

          function corpses(pwdinput) {
            var cat = /./g
            var str = $(pwdinput).val();
            var sz = str.match(cat)
            for (var i = 0; i < sz.length; i++) {
              cat = /\d/;
              var maths_01 = cat.test(sz[i]);
              cat = /[a-z]/;
              var smalls_01 = cat.test(sz[i]);
              cat = /[A-Z]/;
              var bigs_01 = cat.test(sz[i]);
              if (!maths_01 && !smalls_01 && !bigs_01) {
                return true;
              }
            }
            return false;
          }


//大写锁定判断
          (function ($) {
            $.fn.extend({
              capsLockTip: function (divTipID) {
                return this.each(function () {
                  //创建对象实例并保存。
                  //获取实例对象：var api = $("#txtPWD").data("txtPWD");
                  var ins = new $.CapsLockTip($(this));
                  $(this).data(this.id, ins);
                });
              }
            });
            //创建一个实例。
            //___target jq目标对象。
            //___divTipID   显示提示文本的div。
            $.CapsLockTip = function (___target) {
              //设置当前实例的配置参数。
              this.target = ___target;
              var _this = this;

              $(document).ready(function () {
                //创建显示大写锁定的div。
                if(null == $.fn.capsLockTip.divTip){
                  $("body").append("<span class='CapsLock' style='display:none;'></span>");
                  $.fn.capsLockTip.divTip = $(".CapsLock");
                }

                _this.target.bind("keypress", function (_event) {
                  var e = _event || window.event;
                  var kc = e.keyCode || e.which;
                  var isShift = e.shiftKey || (kc == 16) || false;
                  $.fn.capsLockTip.capsLockActived = false;
                  if ((kc >= 65 && kc <= 90 && !isShift) || (kc >= 97 && kc <= 122 && isShift))
                    $.fn.capsLockTip.capsLockActived = true;
                  _this.showTips($.fn.capsLockTip.capsLockActived);
                });

                _this.target.bind("keydown", function (_event) {
                  var e = _event || window.event;
                  var kc = e.keyCode || e.which;
                  if (kc == 20 && null != $.fn.capsLockTip.capsLockActived){
                    $.fn.capsLockTip.capsLockActived = !$.fn.capsLockTip.capsLockActived;
                    _this.showTips($.fn.capsLockTip.capsLockActived);
                  }
                });

                _this.target.bind("focus", function (_event) {
                  if (null != $.fn.capsLockTip.capsLockActived)
                    _this.showTips($.fn.capsLockTip.capsLockActived);
                });

                _this.target.bind("blur", function (_event) {
                  _this.showTips(false);
                });
              });

              //显示或隐藏大写锁定提示。
              this.showTips = function (display) {
                if (display) {
                  var offset = _this.target.offset();
                  $.fn.capsLockTip.divTip.css("left", offset.left + "px");
                  $.fn.capsLockTip.divTip.css("top", offset.top + _this.target[0].offsetHeight + 3 + "px");
                  $.fn.capsLockTip.divTip.show();
                }
                else {
                  $.fn.capsLockTip.divTip.hide();
                }
              };

              //jq控件公用静态对象。

              //提示框。
              $.fn.capsLockTip.divTip = null;
              //大写锁定键状态
              $.fn.capsLockTip.capsLockActived = null;
            };
          })(jQuery);
          $("#oldPassword").capsLockTip();




        },
        beforeCreate:function () {
          var self = this;
          var param = new Object();
          param.access_token = store.state.user.access_token
          param.user_id = store.state.user.userId
          var data = JSON.stringify(param);

          $.ajax({
//            url:"/passWord",
            url:store.state.baseUrl.data_serv_url+"/system/custUser/passWord",
            data:{parameter:data},
            type:"post",
            dataType:"json",
            success:function (data) {
              self.list = eval('(' + data.hmac + ')');

            },
            error:function () {

            }
          })
        },
    components:{
      HtmlFooter,
        HtmlHeader
    },

    }

</script>



