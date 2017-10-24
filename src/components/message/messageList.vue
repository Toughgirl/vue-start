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
            消息中心
          </li>
          <li>
            消息管理
          </li>
        </ol>
      </div>
      <div class="col-lg-2"></div>
    </div>
    <div class="wrapper wrapper-content">
    <div class="row">
      <div class="col-lg-12 animated fadeInRight">
        <div class="mail-box-header">
          <div class="btn-group pull-right">
            <button class="btn btn-primary btn-sm" id="AllRead">全部标记为已读</button>
            <button class="btn btn-white btn-sm" id=AllDelete>全部删除</button>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="mail-box">

          <table class="table table-hover table-mail">
            <tbody id="query_content">

            </tbody>
          </table>
          <!-- 分页页码-->
          <hr>
          <div class="text-right" id="query_number_list">
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
                region:{},
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
            mounted:function () {
              inspinia();
              nav_active();
              getDetailContent(null);
              function getDetailContent(curr){
                if(curr==null) {curr=1;}
                var pageSize = 5;
                var param = new Object();
                param.access_token = store.state.user.access_token
                param.user_id = store.state.user.userId

                var request_parames = new Object();
                request_parames.pageSize = pageSize;
                request_parames.curPage = curr;

                param.request_parames=request_parames;
                var json = JSON.stringify(param);
                //console.log(json);
                $.ajax({
                  type : "POST",
//                  url : "/MessagePage",
                  url : store.state.baseUrl.data_serv_url+"/system/hintMessage/page",
                  data :{parameter:json},
                  async : false,
                  success : function(data) {
                    var datas = eval(data);

                    //var list = datas.hmac.page.list
                    if (datas.code=="OK") {
                      query(curr, pageSize, datas.hmac.page);
                    }
                  }
                });
              };

              function thisDate(data) {
                var page_data_html = '';
                for (var i = 0 ; i < data.length; i++) {
                page_data_html +='<tr><td class=""><div class="icheckbox_square-green checked">';
                  if(data[i].status==1){
                   page_data_html += '<i class="fa fa-envelope"></i>'
                  }else if(data[i].status==2){
                    page_data_html += '<i class="fa fa-envelope-o"></i>'
                  }
                page_data_html +='</div></td>'+
                '<td class="mail-ontact"><a href="Javascript:;">来源： 精优车服</a><span class="label label-info pull-right">'+data[i].hint_message_title+'</span></td>'+
                '<td class="mail-subject"><a href="Javascript:;">'+data[i].message_conent+'</a></td>'+
                '<td class="mail-date"  style="width:150px">'+data[i].create_date+'</td>'+
                '<td style="width:200px" class="messageId"  messageId='+data[i].hint_message_id+'>';
                if(data[i].status==1){
                  page_data_html += '<button class="btn btn-info btn-sm IRead">标记为已读</button>&nbsp;'
                }else if(data[i].status==2){
                  page_data_html += '<button class="btn btn-info btn-sm" disabled="disabled">已读</button>&nbsp;'
                }
                page_data_html += '<button class="btn btn-info btn-sm deleteMessage">删除</button></td>';

                page_data_html +='</tr>';

                }
                window.page_html=page_data_html;
                //console.log(page_data_html)
                return page_data_html;
              };
              //调用分页
              function query(curr, pageSize, data) {
                var pageData = data.list;
                //console.log(pageData)
                //分页内容处理
                thisDate(pageData);
                //调用分页
                laypage({
                  cont: 'query_number_list',//容器。值支持id名、原生dom对象，jquery对象,【如该容器为】：<div id="query_number_list"></div>，或者使用$('#query_number_list')
                  curr: curr || 1,//当前页
                  pages: data.totalPage,//总页数
                  groups: pageSize, //连续分页数，默认为5
                  skip: false, //是否开启跳页
                  first: 1, //将首页显示为数字1，或者显示自定义内容：如'首页'。若不显示，设置false即可
                  last: data.totalPage, //将尾页显示为总页数，或者显示自定义内容：如'尾页'。若不显示，设置false即可
                  prev: '上一页', //若不显示，设置false即可，或者显示自定义内容：如'上一页'
                  next: '下一页', //若不显示，设置false即可，或者显示自定义内容：如'下一页'
                  skin: '#FF6600',//加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                  jump: function (obj, first) { //触发分页后的回调
                    if (!first) {
                      getDetailContent(obj.curr)
                    }
                    else
                    {
                      $('#query_content').html(page_html);
                      $(".deleteMessage").bind("click",function(){
                        var hint_message_id = $(this).parent().attr("messageid");
                        deleteMessage(hint_message_id)
                      });
                      $(".IRead").bind("click",function(){
                        var hint_message_id = $(this).parent().attr("messageid");
                        IRead(hint_message_id)
                      })

                    }
                  }
                })
              };
              $("#AllDelete").bind("click",function(){
                var hint_message_id = $(this).parent().attr("messageid");
                AlldeleteMessage(hint_message_id)
              })
              $("#AllRead").bind("click",function(){
                var hint_message_id = $(this).parent().attr("messageid");
                AllIRead(hint_message_id)
              })
              function deleteMessage(hid){
                var param = new Object();
                param.access_token = store.state.user.access_token
                param.user_id = store.state.user.userId
                param.hid = hid
                var json = JSON.stringify(param);
                $.ajax({
                  type : "POST",
//                  url : "/removeStatus",
                  url : store.state.baseUrl.data_serv_url+"/system/hintMessage/removeStatus",
                  data : {parameter:json},
                  async : false,
                  success : function(data) {
                    if (data.code=='OK') {
                      getDetailContent(null);
                    }else{
                      alert(data.message);
                    }
                  }
                });
              }
              function IRead(hid){
                var param = new Object();
                param.access_token = store.state.user.access_token;
                param.user_id = store.state.user.userId;
                param.hid = hid;
                var json = JSON.stringify(param);
                $.ajax({
                  type : "POST",
//                  url : "/updateStatus",
                  url : store.state.baseUrl.data_serv_url+"/system/hintMessage/updateStatus",
                  data : {parameter:json},
                  async : false,
                  success : function(data) {
                    if (data.code=='OK') {
                      //如果标记已读成功，刷新表格
                      getDetailContent(null);
                    }else{
                      alert(data.message);
                    }
                  }
                });
              }
              function AlldeleteMessage(hid){
                var param = new Object();
                param.access_token = store.state.user.access_token
                param.user_id = store.state.user.userId
                var arr = new Array();
                $(".messageId").each(function() {
                  var obj = new Object();
                  obj.HintMessageId = $(this).attr("messageId");
                  arr.push(obj);
                });
                var request_parames = new Object();
                request_parames.HintMessageId = arr
                param.request_parames=request_parames;
                var json = JSON.stringify(param);
                $.ajax({
                  type : "POST",
//                  url : "/removeStatuss",
                  url : store.state.baseUrl.data_serv_url+"/system/hintMessage/removeStatuss",
                  data : {parameter:json},
                  async : false,
                  success : function(data) {
                    if (data.code=='OK') {
                      getDetailContent(null);
                    }else{
                      alert(data.message);
                    }
                  }
                });
              }
              function AllIRead(hid){
                var param = new Object();
                param.access_token = store.state.user.access_token
                param.user_id = store.state.user.userId
                var arr = new Array();
                $(".messageId").each(function() {
                  var obj = new Object();
                  obj.HintMessageId = $(this).attr("messageId");
                  arr.push(obj);
                });
                var request_parames = new Object();
                request_parames.HintMessageId = arr
                param.request_parames=request_parames;
                var json = JSON.stringify(param);
                $.ajax({
                  type : "POST",
//                  url : "/updateStatuss",
                  url : store.state.baseUrl.data_serv_url+"/system/hintMessage/updateStatuss",
                  data : {parameter:json},
                  async : false,
                  success : function(data) {
                    if (data.code=='OK') {
                      //如果标记已读成功，刷新表格
                      getDetailContent(null);
                    }else{
                      alert(data.message);
                    }
                  }
                });
              }


            },
    components:{
      HtmlFooter,
        HtmlHeader
    },

        }
</script>
