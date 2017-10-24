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
                  <div v-if="companys.status==5">
                    <div class="ibox-title">
                      <h5>公司信息</h5>&nbsp;&nbsp;<span class="text-danger">驳回</span>
                      <div class="ibox-tools">
                        <a class="collapse-link" v-on:click="_href()">
                          <button class="btn btn-info btn-xs">编辑公司信息</button>
                        </a>
                      </div>
                    </div>
                    <div class="ibox-content">
                    <p v-if="companys.reason">驳回原因:{{companys.reason}}</p>
                    <p v-else>驳回原因:无</p>
                    <p>驳回时间:{{companys.update_time}}</p>
                    </div>
                  </div>
                  <div v-if="companys.status==2">
                    <div class="ibox-title">
                      <h5>公司信息</h5>&nbsp;&nbsp;<span class="text-danger">解约</span>
                    </div>
                    <div class="ibox-content">
                      <p>解约时间:{{companys.update_time}}</p>
                    </div>
                  </div>
                  <div v-if="companys.status==0">
                    <div class="ibox-title">
                      <h5>公司信息</h5>&nbsp;&nbsp;<span class="text-danger">冻结</span>
                    </div>
                    <div class="ibox-content">
                      <p v-if="companys.update_time">冻结时间:{{companys.update_time}}</p>
                      <p v-else>冻结时间:无</p>
                      <p v-if="companys.sysUserName">操作人员:{{companys.sysUserName}}</p>
                      <p v-else>操作人员:无</p>
                    </div>
                  </div>
                  <div v-if="companys.status==1||companys.status==4">
                    <div class="ibox-title">
                      <h5>公司信息</h5>
                    </div>
                  </div>
                  <div class="ibox-content">
                    <table class="table table-bordered ">
                      <tbody>
                      <tr>
                        <td class="gray-bg">营业执照注册号：</td>
                        <td>{{companys.operation_no}}</td>
                        <td class="gray-bg">公司名称：</td>
                        <td>{{companys.company_name}}</td>
                      </tr>
                      <tr>
                        <td class="gray-bg">法人代表姓名：</td>
                        <td>{{companys.legal_person}}</td>
                        <td class="gray-bg">法人身份证号码：</td>
                        <td>{{companys.legal_person_idno}}</td>
                      </tr>
                      <tr>
                        <td class="gray-bg">注册资本：</td>
                        <td>{{companys.registered_capital}}</td>
                        <td class="gray-bg">成立日期：</td>
                        <td>{{companys.establish_time}}</td>
                      </tr>
                      <tr>
                        <td class="gray-bg">营业期限：</td>
                        <td>{{companys.business_time}}</td>
                        <td class="gray-bg">注册地址：</td>
                        <td>{{companys.org_address}}</td>
                      </tr>
                      <tr>
                        <td class="gray-bg">营业执照：</td>
                        <td>
                        <div class="accountImg"><img :src="baseImgUrl+companys.business_pic"></div>

                        </td>
                        <td class="gray-bg">法人身份证照片：</td>
                        <td>
                        <div class="accountImg left"><img :src="baseImgUrl+companys.idCard_due"></div>
                        <div class="accountImg left"><img :src="baseImgUrl+companys.idCard_reverse"></div>
                        </td>
                      </tr>
                      </tbody>

                    </table>
                  </div>
                  <div class="ibox-title" style="border-top: none;">
                    <h5>合作信息</h5>
                  </div>
                  <div class="ibox-content form-horizontal accountContent">
                    <div v-if="companys.status!=4">

                      <div class="form-group">
                        <label class="col-lg-1 col-md-2 col-sm-2 control-label">顶级账号：</label>
                        <div class="col-sm-10"><span>{{companys.user_name}}</span></div>
                        <div class="clearfix"></div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">合同编号：</label>
                      <div class="col-sm-10"><span>{{companys.contract_no}}</span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">门店别名：</label>
                      <div class="col-sm-10"><span>{{companys.alias_name}}</span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div v-if="companys.status==5||companys.status==4"></div>
                    <div class="form-group" v-else>
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">是否账期：</label>
                      <div class="col-sm-10"><span>{{companys.pay_type}}</span></div>
                      <div class="clearfix"></div>
                    </div>
                    <!--<div class="form-group">-->
                      <!--<label class="col-lg-1 col-md-2 col-sm-2 control-label">结算方式：</label>-->
                      <!--<div class="col-sm-10"><span id="pay_type"></span></div>-->
                      <!--<div class="clearfix"></div>-->
                    <!--</div>-->
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">滞纳金比例：</label>
                      <div class="col-sm-10"><span>{{companys.late_rate}}</span>%</div>
                      <div class="clearfix"></div>
                    </div>
                    <!--<div class="form-group">-->
                      <!--<label class="col-lg-1 col-md-2 col-sm-2 control-label">全车件返利比例：</label>-->
                      <!--<div class="col-sm-10"><span>{{companys.sales_price_ratio}}</span>%</div>-->
                      <!--<div class="clearfix"></div>-->
                    <!--</div>-->
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">是否提供会员服务：</label>
                      <div class="col-sm-10"><span>{{companys.is_vip_service}}</span>
                      </div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group" v-if="companys.serviceRatio">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">服务单结算比例：</label>
                      <div class="col-sm-10"><span>{{companys.serviceRatio}}</span>%</div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">负责人姓名：</label>
                      <div class="col-sm-10"><span>{{companys.real_name}}</span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">负责人手机：</label>
                      <div class="col-sm-10"><span>{{companys.phone}}</span></div>
                      <div class="clearfix"></div>
                    </div>

                  </div>
                  <div class="ibox-title" style="border-top: none;">
                    <h5>服务信息</h5>
                  </div>
                  <div class="ibox-content form-horizontal accountContent">
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">门店类型：</label>
                      <div class="col-sm-10"><span id="repGrade"></span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">主修车系：</label>
                      <div class="col-sm-10">
                        <span id="mainCar"></span>
                      </div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">门店地址：</label>
                      <div class="col-sm-10"><span id="storeAdd"></span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">邮政编码：</label>
                      <div class="col-sm-10"><span id="postCode"></span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">传真号码：</label>
                      <div class="col-sm-10"><span id="foxNum"></span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">电子邮箱：</label>
                      <div class="col-sm-10"><span id="email"></span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">客服QQ：</label>
                      <div class="col-sm-10"><span id="qq"></span></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-2 col-sm-2 control-label">联系电话：</label>
                      <div class="col-sm-10">
                        <div class="row" id="tel">
                        </div>
                      </div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-1 col-md-1 col-sm-2 control-label">其他信息：</label>
                      <div class="col-sm-10">
                        <div class="row" id="other">
                        </div>
                      </div>
                      <div class="clearfix"></div>
                    </div>

                  </div>
                  <div class="ibox-title" style="border-top: none;">
                    <h5>公司介绍</h5>
                  </div>
                  <div class="ibox-content form-horizontal">
                    <div class="form-group">
                      <div class="col-sm-12">{{companys.comn}}</div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="form-group">
                      <div class="summernote">
                        <div class="col-sm-12" id="pics">

                        </div>
                    </div>
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
    <input type="hidden" data-region1="" data-region2="" hidden style="display: none" id="EditStore">
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
          date: '',
          date1: '',
          region1:"",
          region2:"",
          logisticsPoint:"",
          companys:"",
          serviceAttrs:"",
          serviceAttrs:[],
          pay_type:[],
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
                          //console.log(s)
                        },
                        _href: function (event) {
                            var $href = (window.location.href).split("/");
                            var storeId= $href[$href.length-1];
                            var region1 = $("#EditStore").attr("data-region1");
                            var region2 = $("#EditStore").attr("data-region2");
                            this.$router.replace({ path: '/storeEdit/' + storeId+region1+region2+''})
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
//                url:"/_storeDetail",
                url:store.state.baseUrl.data_serv_url+"/system/store/edit",
                data:{parameter:json},
                type:"post",
                dataType:"json",
                success:function (data) {
                    var arr=[];
                    self.list = eval('(' + data.hmac + ')');
                    self.companys = self.list.companys
                    if(self.companys.is_vip_service==1){
                      self.companys.is_vip_service="是";
                    }else{
                      self.companys.is_vip_service="否";
                    }
                    self.pay_type = self.list.companys.pay_type.split(",");
                    arr= self.pay_type;
                    if($.inArray("1", arr)=="-1"){
                      self.companys.pay_type="否";
                    }else{
                      self.companys.pay_type="是";
                    }
//                  for (var i=0;i<self.pay_type.length;i++)
//                  {
//                      if(self.pay_type[i]==1){
//                        self.pay_type[i]="月结"
//                      }else if(self.pay_type[i]==5){
//                        self.pay_type[i]="钱包"
//                      }else if(self.pay_type[i]==9){
//                        self.pay_type[i]="在线支付"
//                      }
//                     //console.log(self.pay_type[i])
//                     $("#pay_type").append(self.pay_type[i]+",")
//                  }

                  var format = function(time, format){
                    var t = new Date(time);
                    var tf = function(i){return (i < 10 ? '0' : '') + i};
                    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                      switch(a){
                        case 'yyyy':
                          return tf(t.getFullYear());
                          break;
                        case 'MM':
                          return tf(t.getMonth() + 1);
                          break;
                        case 'mm':
                          return tf(t.getMinutes());
                          break;
                        case 'dd':
                          return tf(t.getDate());
                          break;
                        case 'HH':
                          return tf(t.getHours());
                          break;
                        case 'ss':
                          return tf(t.getSeconds());
                          break;
                      };
                    });
                  };
                  self.companys.update_time = format(self.companys.update_time , 'yyyy-MM-dd HH:mm:ss')

//                  区域限制
                  self.region1=self.list.regionId;
                  self.region2=self.list.regionId.substr(0, 2)+'0000';
                  $("#EditStore").attr("data-region1","\\"+self.region1);
                  $("#EditStore").attr("data-region2","\\"+self.region2);

                },
                error:function () {

                }
              });
              $.ajax({
//                url:"/serviceInfo",
                url:store.state.baseUrl.data_serv_url+"/system/store/serviceInfo",
                data:{parameter:json},
                type:"post",
                dataType:"json",
                success:function (data) {
//                  console.log(data)
                  self.list = eval('(' + data.hmac + ')')
                  self.serviceAttrs = self.list.serviceAttrs;
                  self.servicePics = self.list.servicePics;
                  //console.log(self.servicePics)
                  //电话,在for循环里面动态添加
                  var tel = "";
                  //其他信息,在for循环里面动态添加
                  var other = "";
                  var pics = "";

                  for(var i=0;i<(self.serviceAttrs).length;i++){
                    if(self.serviceAttrs[i].attrValue==""){
                      self.serviceAttrs[i].attrValue="无"
                    }
                    if("门店类型" == self.serviceAttrs[i].attrName){
                      $("#repGrade").html(self.serviceAttrs[i].attrValue);
                      continue;
                    }
                    if("门店地址" == self.serviceAttrs[i].attrName){
                      $("#storeAdd").append(self.serviceAttrs[i].attrValue);
                      continue;
                    }
                    if("主修车系" == self.serviceAttrs[i].attrName){
                      $("#mainCar").html(self.serviceAttrs[i].attrValue);
                      continue;
                    }
                    if("邮政编码" == self.serviceAttrs[i].attrName){
                      $("#postCode").html(self.serviceAttrs[i].attrValue);
                      continue;
                    }
                    if("传真号码" == self.serviceAttrs[i].attrName){
                      $("#foxNum").html(self.serviceAttrs[i].attrValue);
                      continue;
                    }
                    if("电子邮箱" == self.serviceAttrs[i].attrName){
                      $("#email").html(self.serviceAttrs[i].attrValue);
                      continue;
                    }
                    if("客户QQ" == self.serviceAttrs[i].attrName){
                      $("#qq").html(self.serviceAttrs[i].attrValue);
                      continue;
                    }
                    if("服务咨询电话" == self.serviceAttrs[i].attrName){
                      tel += "<div class=\"col-md-3 col-sm-6 colspan\">服务咨询电话："+self.serviceAttrs[i].attrValue+"</div>"
                      continue;
                    }
                    if("保养预约" == self.serviceAttrs[i].attrName){
                      tel += "<div class=\"col-md-3 col-sm-6 colspan\">保养预约:"+self.serviceAttrs[i].attrValue+"</div>"
                      continue;
                    }
                    if("车辆急救电话" == self.serviceAttrs[i].attrName){
                      tel += "<div class=\"col-md-3 col-sm-6 colspan\">车辆急救电话:"+self.serviceAttrs[i].attrValue+"</div>"
                      continue;
                    }
                    if("投诉电话" == self.serviceAttrs[i].attrName){
                      tel += "<div class=\"col-md-3 col-sm-6 colspan\">投诉电话:"+self.serviceAttrs[i].attrValue+"</div>"
                      continue;
                    }
                    if("钣金喷漆工" == self.serviceAttrs[i].attrName){
                      other += "<div class=\"col-md-3 col-sm-6 colspan\">钣金喷漆工："+ self.serviceAttrs[i].attrValue +"人</div>"
                      continue;
                    }
                    if("服务顾问" == self.serviceAttrs[i].attrName){
                      other += "<div class=\"col-md-3 col-sm-6 colspan\">服务顾问："+ self.serviceAttrs[i].attrValue +"人</div>"
                      continue;
                    }
                    if("电器维修" == self.serviceAttrs[i].attrName){
                      other += "<div class=\"col-md-3 col-sm-6 colspan\">电器维修："+ self.serviceAttrs[i].attrValue +"人</div>"
                      continue;
                    }
                    if("机修工" == self.serviceAttrs[i].attrName){
                      other += "<div class=\"col-md-3 col-sm-6 colspan\">机修工："+ self.serviceAttrs[i].attrValue +"人</div>"
                      continue;
                    }
                    if("占地面积" == self.serviceAttrs[i].attrName){
                      other += "<div class=\"col-md-3 col-sm-6 colspan\">占地面积："+ self.serviceAttrs[i].attrValue +"㎡</div>"
                      continue;
                    }
                    if("接待面积" == self.serviceAttrs[i].attrName){
                      other += "<div class=\"col-md-3 col-sm-6 colspan\">接待面积："+ self.serviceAttrs[i].attrValue +"㎡</div>"
                      continue;
                    }
                    if("维修区面积" == self.serviceAttrs[i].attrName){
                      other += "<div class=\"col-md-3 col-sm-6 colspan\">维修区面积："+ self.serviceAttrs[i].attrValue +"㎡</div>"
                      continue;
                    }
                    if("停车区面积" == self.serviceAttrs[i].attrName){
                      other += "<div class=\"col-md-3 col-sm-6 colspan\">停车区面积："+ self.serviceAttrs[i].attrValue +"㎡</div>"
                      continue;
                    }
                  }
                  //电话号码
                  if(tel==""){
                    $("#tel").append('<div class="col-md-3">无</div>');
                  }else{
                    $("#tel").append(tel);
                  }

                  //其他信息
                  if(other==""){
                    $("#other").append('<div class="col-md-3">无</div>');
                  }else{
                    $("#other").append(other);
                  }


                  //图片
                  var baseImgUrl=store.state.baseUrl.img_upload_url;
                  for(var i = 0;i < self.servicePics.length; i++) {
                    //console.log(self.servicePics[i].picUrl)
                    pics+="<div class='col-sm-2 text-center'><img src="+baseImgUrl+self.servicePics[i].picUrl+" width='100%'height='200'><p>"+self.servicePics[i].picName+"</p></div>"
                    //console.log(pics)
                  }

                  $("#pics").append(pics);


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



