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
            <a>门店编辑</a>
          </li>
        </ol>
      </div>
      <div class="col-lg-2">

      </div>
    </div>
    <form @submit.prevent="validateBeforeSubmit" method="post">
    <div class="row">
      <div class="col-lg-12">
        <div class="wrapper wrapper-content">
          <div class="ibox">
            <div class="ibox-title">
              <h5>注册信息</h5>(<span class="check-error">*</span>为必填项)
            </div>
            <div class="ibox-content">
              <table class="table table-bordered ">
                <tbody>
                <tr>
                  <td class="gray-bg"><span class="check-error">*</span>营业执照注册号：</td>
                  <td>
                    <input type="text" class="form-control  left defaultInput" placeholder="请输入营业执照注册号" v-model="companys.operation_no" id="operationNo" name="operationNo" v-validate="'required|operationNo'">
                    <span v-show="errors.has('operationNo')" class="left text-danger lineHeight32" >{{ errors.first('operationNo') }}</span></td>
                  <td class="gray-bg"><span class="check-error">*</span>公司名称：</td>
                  <td>
                    <input type="text" class="form-control  left defaultInput" placeholder="请输入公司名称"  v-model="companys.company_name" id="companyName" name="companyName" v-validate="'required'">
                    <span v-show="errors.has('companyName')" class="left text-danger lineHeight32" >{{ errors.first('companyName') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="gray-bg"><span class="check-error">*</span>法人代表姓名：</td>
                  <td>
                    <input type="text" class="form-control  left defaultInput" placeholder="请输入法人代表姓名" v-model="companys.legal_person" id="legalPerson"  name="legalPerson" v-validate="'required|onlyName'">
                    <span v-show="errors.has('legalPerson')" class="left text-danger lineHeight32" >{{ errors.first('legalPerson') }}</span>
                  </td>
                  <td class="gray-bg"><span class="check-error">*</span>法人身份证号码：</td>
                  <td>
                    <input type="text" class="form-control left defaultInput" placeholder="请输入法人代表身份证号码" id="legalersonIdno" v-model="companys.legal_person_idno" name="IdentityCodeValid" v-validate="'required|IdentityCodeValid'">
                    <span v-show="errors.has('IdentityCodeValid')" class="left text-danger lineHeight32" >{{ errors.first('IdentityCodeValid') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="gray-bg"><span class="check-error">*</span>注册资本：</td>
                  <td>
                    <input type="text" class="form-control left defaultInput" placeholder="请输入注册资本" v-model="companys.registered_capital" id="registeredCapital" name="registeredCapital" v-validate="'required|onlyInt'">
                    <span v-show="errors.has('registeredCapital')" class="left text-danger lineHeight32" >{{ errors.first('registeredCapital') }}</span>
                  </td>
                  <td class="gray-bg"><span class="check-error">*</span>成立日期：</td>
                  <td>
                    <input type="text" class="form-control left defaultInput Wdate" placeholder="请选择成立日期" v-model="companys.establish_time" id="establishTime"  name="establishTime"  v-validate="'required'"  onfocus="WdatePicker({dateFmt:'yyyy年MM月dd日'})">
                    <span v-show="errors.has('establishTime')" class="left text-danger lineHeight32" >请选择成立日期</span>
                  </td>
                </tr>
                <tr>
                  <td class="gray-bg"><span class="check-error">*</span>营业期限：</td>
                  <td>
                  <!--<input type="text" class="form-control" placeholder="请输入营业期限" v-model="companys.business_time" id="businessTime">-->
                    <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%" placeholder="请选择开始日期" readonly="readonly" name="dateStart" id="dateStart" v-model="business_time[0]" v-validate="'required'" onfocus="WdatePicker({dateFmt:'yyyy年MM月dd日',maxDate:'#F{$dp.$D(\'dateEnd\')}'})">
                    <span class="left" style="margin:0 1%;line-height:32px;">-</span>
                    <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%" placeholder="请选择结束日期" readonly="readonly" name="dateEnd" id="dateEnd" v-model="business_time[1]" v-validate="'required'" onfocus="WdatePicker({dateFmt:'yyyy年MM月dd日',minDate:'#F{$dp.$D(\'dateStart\')}'})">
                  </td>
                  <td class="gray-bg"><span class="check-error">*</span>注册地址：</td>
                  <td>
                    <input type="text" class="form-control left defaultInput" placeholder="请输入注册地址"  v-model="companys.org_address" id="orgAddress" name="orgAddress" v-validate="'required'">
                    <span v-show="errors.has('orgAddress')" class="left text-danger lineHeight32" >{{ errors.first('orgAddress') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="gray-bg"><span class="check-error">*</span>营业执照：</td>
                  <td>
                    <div class="accountImg left">
                      <input type="hidden" id="imgsrc" v-model="companys.business_pic">
                      <img :src="baseImgUrl+companys.business_pic" class="accountImgB" width="100" id="imgShow">
                      <input type="file" name="fileUpA" class="accountImgC" id="fileUp" onchange="uploadHead('fileUp','imgShow','imgsrc','04','0')">
                    </div>
                  </td>
                  <td class="gray-bg"><span class="check-error">*</span>法人身份证照片：</td>
                  <td>
                    <div class="accountImg left">
                    <input type="hidden" id="imgsrcA" v-model="companys.idCard_due">
                    <img :src="baseImgUrl+companys.idCard_due" class="accountImgB" width="100" id="imgShowA">
                    <input type="file" name="fileUpA" class="accountImgC" id="fileUpA" onchange="uploadHead('fileUpA','imgShowA','imgsrcA','04','0')">
                    </div>
                    <div class="accountImg left">
                    <input type="hidden" id="imgsrcB" v-model="companys.idCard_reverse">
                    <img :src="baseImgUrl+companys.idCard_reverse" class="accountImgB" width="100" id="imgShowB">
                    <input type="file" name="fileUpA" class="accountImgC" id="fileUpB" onchange="uploadHead('fileUpB','imgShowB','imgsrcB','04','0')">
                    </div>
                  </td>
                </tr>
                </tbody>

              </table>
            </div>
            <div class="ibox-title" style="border-top: none;">
              <h5>合作信息</h5>
            </div>
            <div class="ibox-content form-horizontal">
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>合同编号：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control left defaultInput" placeholder="请输入合同编号" v-model="companys.contract_no" id="contractNo" name="ContractNumber" v-validate="'required|isNumber'">
                  <span v-show="errors.has('ContractNumber')" class="left text-danger lineHeight32" >{{ errors.first('ContractNumber') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>门店别名：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control left defaultInput" placeholder="请输入门店别名" v-model="companys.alias_name" id="aliasName" name="aliasName" v-validate="'required'">
                  <span v-show="errors.has('aliasName')" class="left text-danger lineHeight32" >{{ errors.first('aliasName') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>

              <!--<div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>结算方式：</label>

                <div class="col-sm-10" id="payType">
                  <div class="left" style="margin-right:20px;line-height: 32px;"><input type="checkbox" id="pay_typeA" value="1" name="checkbox" class="pay_type" v-validate="'required'">月结</div>
                  <div class="left" style="margin-right:20px;line-height: 32px;"><input type="checkbox" id="pay_typeB" value="5" name="checkbox" class="pay_type" v-validate="'required'">钱包</div>
                  <div class="left" style="margin-right:20px;line-height: 32px;"><input type="checkbox" id="pay_typeC" value="9" name="checkbox" class="pay_type" v-validate="'required'">在线支付</div>
                  <span v-show="errors.has('checkbox')" class="left text-danger lineHeight32" >请选择结算方式</span>
                </div>
                <div class="clearfix"></div>
              </div>-->
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>滞纳金比例：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput left required" placeholder="请输滞纳金比例" v-model="companys.late_rate" id="lateRate" name="lateRate" v-validate="'required|onlyDecimals'"><div class="col-sm-1" style="line-height: 32px;">%</div>
                  <span v-show="errors.has('lateRate')" class="left text-danger lineHeight32" >{{ errors.first('lateRate') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <!--<div class="form-group">-->
                <!--<label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">全车件返利比例：</label>-->

                <!--<div class="col-lg-5 col-md-5 col-sm-10 col-xs-10"><input type="text" class="form-control defaultInput left" placeholder="请输入全车件返利比例"-->
                                             <!--v-model="companys.sales_price_ratio" id="salesPriceRatio"><div class="col-sm-3" style="line-height: 32px;">%</div></div>-->

                <!--<div class="clearfix"></div>-->
              <!--</div>-->

              <div class="form-group">
                <label class="col-sm-2 control-label"><span class="check-error">*</span>提供会员服务：</label>
                <div class="col-sm-5">
                  <input type="radio" name="isVipService" value="1" v-validate="'required'"> 是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="radio" name="isVipService" value="0" v-validate="'required'"> 否
                  <span v-show="errors.has('isVipService')" class="text-danger lineHeight32">请选择是否提供会员服务</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group" id="isVipServiceShow" style="display: none;">
                <label class="col-sm-2 control-label">服务单结算比例：</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control defaultInput left" placeholder="请输入服务单结算比例" id="VipService" v-model="companys.serviceRatio" name="VipService" v-validate="'onlyDecimals'"><div class="col-sm-1" style="line-height: 32px;">%</div>
                  <span v-show="errors.has('VipService')" class="left text-danger lineHeight32" >{{ errors.first('VipService') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>负责人姓名：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control left defaultInput" placeholder="请输入负责人姓名" v-model="companys.real_name" id="names" name="names" v-validate="'required|onlyName'">
                  <div class="col-lg-4 col-md-4 col-sm-10 col-xs-10" style="line-height: 32px;">（即顶级账户管理员）</div>
                  <span v-show="errors.has('names')" class="text-danger lineHeight32 left">{{ errors.first('names') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>负责人手机：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control left defaultInput" placeholder="请输入负责人手机" v-model="companys.phone" id="adminPhone" name="adminPhone" v-validate="'required|phone'">
                  <span v-show="errors.has('adminPhone')" class="left text-danger lineHeight32" >{{ errors.first('adminPhone') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>

            </div>
            <div class="ibox-title" style="border-top: none;">
              <h5>服务信息</h5>
            </div>
            <div class="ibox-content form-horizontal">
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
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>主修车系：</label>

                <div class="col-sm-10">
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="德系" class="demioCheckbox" v-validate="'required'">德系
                  </div>
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="美系" class="demioCheckbox" v-validate="'required'">美系
                  </div>
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="法系" class="demioCheckbox" v-validate="'required'">法系
                  </div>
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="日系" class="demioCheckbox" v-validate="'required'">日系
                  </div>
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="韩系" class="demioCheckbox" v-validate="'required'">韩系
                  </div>
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="豪华品牌" class="demioCheckbox" v-validate="'required'">豪华品牌
                  </div>
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="其他" class="demioCheckbox" v-validate="'required'">其他
                  </div>
                  <span v-show="errors.has('mainCarClass')" class="left text-danger lineHeight32" >请选择主修车系</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>门店地址：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <region-picker :province="region.province" :city="region.city" :district="region.district"
                                 class="left"
                                 :placeholder="{province: '', city: '', district: ''+array1[2]+''}"
                                 @onchange="change" id="regionaId"></region-picker>
                  <input type="hidden" id="province1" name="province1" v-validate="'required'">
                  <input type="hidden" id="city1" name="city1" v-validate="'required'">
                  <input type="hidden" id="district1" name="district1" v-model="companys.regiona_id"
                         v-validate="'required'">
                  <input type="hidden" id="district2" name="district2" v-validate="'required'">
                  <span v-show="errors.has('district2')" class="left text-danger lineHeight32">请选择正确的地址</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>详细地址：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput left" placeholder="请输入详细地址" id="storeAdd"  name="orgAddress" v-validate="'required'">
                  <span v-show="errors.has('orgAddress')" class="left text-danger lineHeight32" >{{ errors.first('orgAddress') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">联系电话：</label>

                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10" id="tel">


                </div>
                <div class="clearfix"></div>
                <div id="button">

                </div>

              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">邮政编码：</label>

                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput " placeholder="请输入邮政编码" id="postCode"  name="isZip" v-validate="'isZip'">
                  <span v-show="errors.has('isZip')" class="left text-danger lineHeight32" >{{ errors.first('isZip') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">传真号码：</label>

                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput " placeholder="请输入传真号码" id="foxNum" name="fax" v-validate="'fax'">
                  <span v-show="errors.has('fax')" class="left text-danger lineHeight32" >{{ errors.first('fax') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>电子邮箱：</label>

                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control  left defaultInput" placeholder="请输入电子邮箱" id="email" name="email"  v-validate="'email'">
                  <span v-show="errors.has('email')" class="left text-danger lineHeight32" >{{ errors.first('email') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">客服QQ：</label>

                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput " placeholder="请输入客服QQ" id="qq" name="qq" v-validate="'qq'">
                  <span v-show="errors.has('qq')" class="left text-danger lineHeight32" >{{ errors.first('qq') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>

              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">其他信息：</label>
                <div class="col-sm-10">
                  <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                      <div class="row">
                        <div class="col-md-6 col-sm-4 control-label">
                          服务顾问：
                        </div>
                        <div class="col-md-4 col-sm-3">
                          <select id="serviceAssistant" class="form-control restSelect">
                            <option>请选择</option>
                            <option>1-5</option>
                            <option>6-10</option>
                            <option>11-20</option>
                            <option>21-50</option>
                            <option>大于50</option>
                          </select>
                        </div>
                        <div class="col-md-1 col-sm-1 control-label">人</div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                      <div class="row">
                        <div class="col-md-6 col-sm-4 control-label">
                          钣金喷漆工：
                        </div>
                        <div class="col-md-4 col-sm-3">
                          <select id="paintWorkNum" class="form-control restSelect">
                            <option>请选择</option>
                            <option>1-5</option>
                            <option>6-10</option>
                            <option>11-20</option>
                            <option>21-50</option>
                            <option>大于50</option>
                            </select>
                        </div>
                        <div class="col-md-1 col-sm-1 control-label">人</div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                      <div class="row">
                        <div class="col-md-6 col-sm-4 control-label">
                          电器维修：
                        </div>
                        <div class="col-md-4 col-sm-3">
                          <select id="electricalNum" class="form-control restSelect">
                            <option>请选择</option>
                            <option>1-5</option>
                            <option>6-10</option>
                            <option>11-20</option>
                            <option>21-50</option>
                            <option>大于50</option>
                            </select>
                        </div>
                        <div class="col-md-1 col-sm-1 control-label">人</div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                      <div class="row">
                        <div class="col-md-6 col-sm-4 control-label">
                          机修工：
                        </div>
                        <div class="col-md-4 col-sm-3">
                          <select id="mechanicNum" class="form-control restSelect">
                            <option>请选择</option>
                            <option>1-5</option>
                            <option>6-10</option>
                            <option>11-20</option>
                            <option>21-50</option>
                            <option>大于50</option>
                            </select>
                        </div>
                        <div class="col-md-1 col-sm-1 control-label">人</div>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-12 form-group">
                      <div class="row">
                        <div class="col-md-6 col-sm-4 control-label">
                          占地面积：
                        </div>
                        <div class="col-md-4 col-sm-3">
                          <select id="coverArea" class="form-control restSelect">
                            <option>请选择</option>
                            <option>低于50</option>
                            <option>50-70</option>
                            <option>71-150</option>
                            <option>151-200</option>
                            <option>201-250</option>
                            <option>251-300</option>
                            <option>超过300</option>
                            </select>
                        </div>
                        <div class="col-md-1 col-sm-1 control-label">㎡</div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                      <div class="row">
                        <div class="col-md-6 col-sm-4 control-label" >
                          接待面积：
                        </div>
                        <div class="col-md-4 col-sm-3">
                          <select id="serviceArea" class="form-control restSelect">
                            <option>请选择</option>
                            <option>低于50</option>
                            <option>50-70</option>
                            <option>71-150</option>
                            <option>151-200</option>
                            <option>201-250</option>
                            <option>251-300</option>
                            <option>超过300</option>
                            </select>
                        </div>
                        <div class="col-md-1 col-sm-1 control-label">㎡</div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                      <div class="row">
                        <div class="col-md-6 col-sm-4 control-label">
                          维修区面积：
                        </div>
                        <div class="col-md-4 col-sm-3">
                          <select id="repairArea" class="form-control restSelect">
                            <option>请选择</option>
                            <option>低于50</option>
                            <option>50-70</option>
                            <option>71-150</option>
                            <option>151-200</option>
                            <option>201-250</option>
                            <option>251-300</option>
                            <option>超过300</option>
                            </select>
                        </div>
                        <div class="col-md-1 col-sm-1 control-label">㎡</div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                      <div class="row">
                        <div class="col-md-6 col-sm-4 control-label">
                          停车区：
                        </div>
                        <div class="col-md-4 col-sm-3">
                          <select id="parkingArea" class="form-control restSelect">
                            <option>请选择</option>
                            <option>低于50</option>
                            <option>50-70</option>
                            <option>71-150</option>
                            <option>151-200</option>
                            <option>201-250</option>
                            <option>251-300</option>
                            <option>超过300</option>
                            </select>
                        </div>
                        <div class="col-md-1 col-sm-1 control-label">㎡</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>


            </div>
            <div class="ibox-title" style="border-top: none;">
              <h5>公司介绍</h5>（最多可填写2000字）还可以输入<span id="textLength">2000</span>字
            </div>
            <div class="ibox-content form-horizontal">
              <div class="form-group">
                <div class="col-sm-12">
                 <textarea class="form-control" style="height:300px;" id="comn" v-model="companys.comn">
                 </textarea>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <div class="summernote">
                  <div class="imagesContent">
                    <ul class="fileImg" id="fileImgs">
                    </ul>
                    <div class="upfilebox left" id="upfilebox" style="height:150px;">
                      <img class="addPicture" src="../../assets/img/moreImg.png">
                      <input class="file-btn" type="file" name="file" id="uploadfile5" onchange="uploadMore('uploadfile5','fileImgs','02')"/>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="ibox-content">
              <div class="form-group">
                  <button class="btn btn-success" type="submit">保存</button>
                  <button class="btn btn-white" v-on:click="_href()">返回</button>
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
    require('static/ajaxfileupload.js')
    require('static/upload_auth.js')
    require('src/vuex/modules/storeManagement/storeEdit.js')
    import 'babel-polyfill';
    import RegionPicker from 'vue-region-picker'
    import CHINA_REGION from 'china-area-data'
    import store from 'src/vuex/store.js'
    import inspinia from 'src/assets/js/inspinia.js'
    import nav_active from 'src/assets/js/nav.js'
    import HtmlFooter from 'src/components/footer.vue'
    import HtmlHeader from 'src/components/header.vue'

    Vue.use(RegionPicker, {
      region: CHINA_REGION,
      vueVersion: 2
    })
    export default {
            data(){
              return{
                list:"",
                logisticsPoint:"",
                companys:"",
                serviceAttrs:"",
                serviceAttrs:[],
                array:[],
                business_time:[],
                array1:[],
                baseImgUrl:store.state.baseUrl.img_upload_url,
                region:{
                  "province": [(window.location.href).split("/")[(window.location.href).split("/").length-1].split("\\")[2]],
                  "city": [(window.location.href).split("/")[(window.location.href).split("/").length-1].split("\\")[1]]
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
                          //console.log(s)
                          $("#province1").val(s.province)
                          $("#city1").val(s.city)
                          $("#district1").val($(".district-select").val().split(",")[0])
                          $("#district2").val(s.district)
                        },
                        _href:function(){
                          var $href = (window.location.href).split("/");
                          var storeId= $href[$href.length-1].split("\\")[0];
                          this.$router.replace({ path: '/storeDetail/' + storeId})
                        },
                        saveCompany:function(){
                          var self = this;
                          var param = new Object();
                          param.access_token = store.state.user.access_token
                          param.user_id = store.state.user.userId
                          var request_parames = new Object();
                          var $href = (window.location.href).split("/");
                          var id= $href[$href.length-1].split("\\")[0];
                          var operationNo= $("#operationNo").val();
                          var isVipService= $("input[name='isVipService']:checked").val();
                          var companyName= $("#companyName").val();
                          var legalPerson= $("#legalPerson").val();
                          var legalersonIdno= $("#legalersonIdno").val();
                          var registeredCapital= $("#registeredCapital").val();
                          var establishTime= $("#establishTime").val();
                          var businessTime= $("#dateStart").val()+"-"+$("#dateEnd").val();
                          var comn= $("#comn").val();
                          var aliasName= $("#aliasName").val();
                          var contractNo= $("#contractNo").val();
                          var orgAddress= $("#orgAddress").val();
//                          var salesPriceRatio= $("#salesPriceRatio").val();
                          var regionaId= $("#district1").val();
                          var company = new Object();
                          company.id = id
                          company.operationNo = operationNo
                          company.aliasName = aliasName
                          company.isVipService = isVipService
                          company.companyName = companyName
                          company.legalPerson = legalPerson
                          company.legalersonIdno = legalersonIdno
                          company.registeredCapital = registeredCapital
                          company.establishTime = establishTime
                          company.businessTime = businessTime
                          company.comn = comn
                          company.contractNo = contractNo
                          company.orgAddress = orgAddress
//                          company.salesPriceRatio = salesPriceRatio
                          company.regionaId = regionaId
                          company = JSON.stringify(company);

                          var license= $("#imgsrc").val()
                          var idCardDue= $("#imgsrcA").val()
                          var idCardReverse= $("#imgsrcB").val()
                          var lateRate= $("#lateRate").val()
                          var names= $("#names").val()
                          var adminPhone= $("#adminPhone").val()
//                          var payType=""
//                          $(".pay_type").each(function(){
//                            if($(this).is(':checked')) {
//                                payType += $(this).val()+','
//                            }
//                          })
                          request_parames.company = company
                          request_parames.license = license
                          request_parames.idCardDue = idCardDue
                          request_parames.idCardReverse = idCardReverse
                          request_parames.lateRate = lateRate
                          request_parames.names = names
                          request_parames.adminPhone = adminPhone
//                          request_parames.payType = payType


                          //servicesArr

                          var servicesArr = new Array();
                          var type = new Object()
                          type.title = "门店类型";
                          type.value = $("#repGrade").val()
                          servicesArr.push(type)

                          var VipService = new Object()
                          VipService.title = "服务单结算比例";
                          VipService.value = $("#VipService").val()
                          if(isVipService==1&&VipService.value==""){
                            $("#VipService").focus()
                            return false
                          }

                          servicesArr.push(VipService)

                          var mainCar = new Object()
                          mainCar.title = "主修车系";
                          var mainCarValue = ""
                          $(".demioCheckbox").each(function(){
                            if($(this).is(':checked')) {
                              mainCarValue += $(this).val()+','
                            }
                          })
                          mainCar.value = mainCarValue;
                          servicesArr.push(mainCar)

                          var adress = new Object()
                          adress.title = "门店地址";
                          if($("#storeAdd").val()==""){
                            $("#storeAdd").focus();
                            return false;
                          }
                          adress.value = $("#province1").val()+$("#city1").val()+$("#district2").val()+$("#storeAdd").val()
                          servicesArr.push(adress)

                          var adressA = new Object()
                          adressA.title = "门店地址A";
                          adressA.value = $("#province1").val()+"/"+$("#city1").val()+"/"+$("#district2").val()+","+$("#storeAdd").val();
                          servicesArr.push(adressA)

                          var postalCode = new Object()
                          postalCode.title = "邮政编码";
                          postalCode.value = $("#postCode").val()
                          servicesArr.push(postalCode)

                          var foxNum = new Object()
                          foxNum.title = "传真号码";
                          foxNum.value = $("#foxNum").val()
                          servicesArr.push(foxNum)

                          var email = new Object()
                          email.title = "电子邮箱";
                          email.value = $("#email").val()
                          servicesArr.push(email)

                          var qq = new Object()
                          qq.title = "客户QQ";
                          qq.value = $("#qq").val()
                          servicesArr.push(qq)
                          function subStr(str){
                            var str = $.trim(str)
                            var lastIndex = str.lastIndexOf("：");
                            if(lastIndex>0){
                              str=str.substring(0, lastIndex);
                            }
                            return str;
                          }
                          //其他信息
                          $(".restSelect").each(function(){
                            var v = $(this).find("option:selected").text();
                            if(typeof(v) != "undefined" && v !=null && v !="" && v != '请选择'){
                              var obj = new Object();
                              obj.title = subStr($(this).parent().prev().text());
                              obj.value = v;
                              servicesArr.push(obj);
                            }
                          });

                          var _st="";
                          $(".relationSelect").each(function(){
                          			var v = $(this).find("option:selected").val();
                          			if(typeof(v) != "undefined" && v !=null && v !="" && v != '-1'){
                          				var obj = new Object();
                          				obj.title = $(this).find("option:selected").text();
                          				obj.value = $(this).parent().next().find(".relationInput").val();
                          				servicesArr.push(obj);
                          				_st+=obj.value;
                          			}
                          });
                          request_parames.servicesArr = servicesArr

                          var pic = new Array()
                              $("#fileImgs li").each(function(){
                                var m = new Object();
                                m.picUrl=$(this).find("input[name='picUrl']").val();
                                m.picName=$(this).find("input[name='picName']").val();
                                pic.push(m);
                              });

                          request_parames.pic = pic

                          param.request_parames=request_parames;
                          var json = JSON.stringify(param);
                          if(license !=""&& idCardDue !="" && idCardDue !=""){
                            $.ajax({
//                              url:"/storeSave",
                              url:store.state.baseUrl.data_serv_url+"/system/store/save",
                              data:{parameter:json},
                              type:"post",
                              dataType:"json",
                              success:function (data) {
                                if(data.code=="OK"){
                                  var $href = (window.location.href).split("/");
                                  var storeId= $href[$href.length-1].split("\\")[0];
                                  self.$router.replace({ path: '/storeDetail/' + storeId+''})
                                }else{
                                  alert(data.message)
                                  return false;

                                }
                              },
                              error:function () {

                              }
                            })
                          }else{
                            alert("证件照片不能为空!")
                          }
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
              //              服务单结算比例
              $("input[name='isVipService']").click(function(){
                if($(this).val()==1){
                  $("#isVipServiceShow").show();
                }else{
                  $("#isVipServiceShow").hide();
                }
              });
              function words_deal() {
                var curLength = $("#comn").val().length;
                if (curLength > 2000) {
                  var num = $("#comn").val().substr(0, 2000);
                  $("#comn").val(num);
                  alert("超过字数限制，多出的字将被截断！");
                } else {
                  $("#textLength").html(2000 - $("#comn").val().length);
                }
              }

              $("#comn").keydown(function () {
                words_deal();
              })

            //非列表
              var self = this;
              var param = new Object();
              param.access_token = store.state.user.access_token
              param.user_id = store.state.user.userId
              var request_parames = new Object();
              var $href = (window.location.href).split("/");
              var storeId= $href[$href.length-1].split("\\")[0];
              request_parames.id = storeId;
              param.request_parames=request_parames;
              var json = JSON.stringify(param);
              $.ajax({
//                url:"/_storeDetail",
                url:store.state.baseUrl.data_serv_url+"/system/store/edit",
                data:{parameter:json},
                type:"post",
                dataType:"json",
                success:function (data) {
                  self.list = eval('(' + data.hmac + ')')
                  self.companys = self.list.companys
                  self.business_time = self.list.companys.business_time.split("-");
                  if(self.companys.is_vip_service==1){
                    $("input[name='isVipService']:eq(0)").attr("checked",'checked');
                    $("#isVipServiceShow").show();
                  }else{
                    $("input[name='isVipService']:eq(1)").attr("checked",'checked');
                    $("#isVipServiceShow").hide();
                  }
                  //console.log(self.list.companys)
//                  var pay_type= self.list.companys.pay_type.split(",")
//                  for (var i=0;i<pay_type.length;i++)
//                  {
//                    if(pay_type[i]==1){
//                      $("#pay_typeA").prop('checked', 'checked');
//                    }else if(pay_type[i]==5){
//                      $("#pay_typeB").prop('checked', 'checked');
//                    }else if(pay_type[i]==9){
//                      $("#pay_typeC").prop('checked', 'checked');
//                    }
//                  }

                },
                error:function () {

                }

              });
              //服务信息
              $.ajax({
//                url:"/serviceInfo",
                url:store.state.baseUrl.data_serv_url+"/system/store/serviceInfo",
                data:{parameter:json},
                type:"post",
                dataType:"json",
                success:function (data) {
                  self.list = eval('(' + data.hmac + ')')
                  self.serviceAttrs = self.list.serviceAttrs
                  self.servicePics = self.list.servicePics
                  var servicePicsImg = ""
                  var baseImgUrl =store.state.baseUrl.img_upload_url
                  for(var i=0;i<(self.servicePics).length;i++){
                      servicePicsImg+="<li>"+
                        "<span onclick='closeImg(this)' class='closeImgA'>删除</span>"+
                        "<img height='165' width='100%' class='input upload-path-img display-photo' src='"+baseImgUrl+self.servicePics[i].picUrl+"'>"+
                        "<input name='picUrl' value='"+self.servicePics[i].picUrl+"' type='hidden'><br>"+
                        "<input type='text' name='picName' value='"+self.servicePics[i].picName+"'>"+
                        "</li>"
                  }
                  if(self.servicePics.length>=5){
                    $("#fileImgs").append(servicePicsImg);
                    $("#upfilebox").hide()
                  }else{
                    $("#fileImgs").append(servicePicsImg);
                    $("#upfilebox").show()
                  }

                  var sum = 0;
                  var tel = "";
                  var button = "";
                  for(var i=0;i<(self.serviceAttrs).length;i++){
                    if("门店类型" == self.serviceAttrs[i].attrName){
                      $("#repGrade").val(self.serviceAttrs[i].attrValue);
                      continue;
                    }
                    if("门店地址A" == self.serviceAttrs[i].attrName){
                      self.array=self.serviceAttrs[i].attrValue.split(",");
                      self.array1=self.array[0].split("/");
                      $("#storeAdd").val(self.array[1])
                      $("#province1").val(self.array1[0])
                      $("#city1").val(self.array1[1])
                      $("#district2").val(self.array1[2])
//                      $(".province-select").click(function(){
//                        $(this).find("option:eq(0)").html("")
//                        $(".city-select").find("option:eq(0)").html("");
//                        $(".district-select").find("option:eq(0)").html("");
//                      })
//                      $(".city-select").click(function(){
//                        $(".province-select").find("option:eq(0)").html("");
//                        $(".district-select").find("option:eq(0)").html("");
//                        $(this).find("option:eq(0)").html("");
//                      })
//                      $(".district-select").click(function(){
//                        $(".province-select").find("option:eq(0)").html("");
//                        $(".city-select").find("option:eq(0)").html("");
//                        $(this).find("option:eq(0)").html("");
//                      })

                     // $(".province-select").val("选择省份")
                     // $(".city-select").val("选择省份")
                     // $(".district-select").val("选择省份")
                      continue;
                    }
                    if("主修车系" == self.serviceAttrs[i].attrName){
                      var mainCarClas = self.serviceAttrs[i].attrValue;
                      var arr = mainCarClas.split(",");
                      for(var j=0;j<arr.length;j++){
                        $("input[name='mainCarClass']").each(function(){
                          if($(this).attr("value") == arr[j]){
                            this.checked="checked";
                            return false;//跳出当前each循环
                          }
                        });
                      }
                      continue;
                    }
                    if("邮政编码" == self.serviceAttrs[i].attrName){
                      $("#postCode").val(self.serviceAttrs[i].attrValue);
                      continue;
                    }
                    if("传真号码" == self.serviceAttrs[i].attrName){
                      $("#foxNum").val(self.serviceAttrs[i].attrValue);
                      continue;
                    }
                    if("电子邮箱" == self.serviceAttrs[i].attrName){
                      $("#email").val(self.serviceAttrs[i].attrValue);
                      continue;
                    }
                    if("客户QQ" == self.serviceAttrs[i].attrName){
                      $("#qq").val(self.serviceAttrs[i].attrValue);
                      continue;
                    }
                    if("服务咨询电话" == self.serviceAttrs[i].attrName){
                      sum+=1;
                      tel +="<div class=\"row br\">"+
                        "<div class=\"col-lg-4 col-md-4 col-sm-4\">"+
                        "<select class=\"relationSelect form-control\">"+
                        "<option value=\"-1\">请选择电话类型</option>"+
                        "<option value=\"0\" selected=\"selected\">服务咨询电话</option>"+
                        "<option value=\"1\">车辆急救电话</option>"+
                        "<option value=\"2\">投诉电话</option>"+
                        "<option value=\"3\">保养预约</option>"+
                        "</select>"+
                        "</div>"+
                        "<div class='col-lg-4 col-md-4 col-sm-4'><input type=\"text\" value=\""+ self.serviceAttrs[i].attrValue +"\"  class=\"relationInput form-control\"></div>"+
                        "<div class='col-lg-4 col-md-4 col-sm-4' style='line-height: 32px;'><a class=\"relationA\"> 删除号码</a></div>"+
                        "<div class='clear'></div>"+
                        "</div>"
                        continue;
                    }
                    if("保养预约" == self.serviceAttrs[i].attrName){
                      sum+=1;
                      tel +="<div class=\"row br\">"+
                        "<div class=\"col-lg-4 col-md-4 col-sm-4\">"+
                        "<select class=\"relationSelect form-control\">"+
                        "<option value=\"-1\">请选择电话类型</option>"+
                        "<option value=\"0\">服务咨询电话</option>"+
                        "<option value=\"1\">车辆急救电话</option>"+
                        "<option value=\"2\">投诉电话</option>"+
                        "<option value=\"3\" selected=\"selected\">保养预约</option>"+
                        "</select>"+
                        "</div>"+
                        "<div class='col-lg-4 col-md-4 col-sm-4'><input type=\"text\" value=\""+ self.serviceAttrs[i].attrValue +"\"  class=\"relationInput form-control\"></div>"+
                        "<div class='col-lg-4 col-md-4 col-sm-4' style='line-height: 32px;'><a class=\"relationA\"> 删除号码</a></div>"+
                        "</div>"
                      continue;
                    }
                    if("车辆急救电话" == self.serviceAttrs[i].attrName){
                      sum+=1;
                      tel +="<div class=\"row br\">"+
                        "<div class=\"col-lg-4 col-md-4 col-sm-4\">"+
                        "<select class=\"relationSelect form-control\">"+
                        "<option value=\"-1\">请选择电话类型</option>"+
                        "<option value=\"0\">服务咨询电话</option>"+
                        "<option value=\"1\" selected=\"selected\">车辆急救电话</option>"+
                        "<option value=\"2\">投诉电话</option>"+
                        "<option value=\"3\">保养预约</option>"+
                        "</select>"+
                        "</div>"+
                        "<div class='col-lg-4 col-md-4 col-sm-4'><input type=\"text\" value=\""+ self.serviceAttrs[i].attrValue +"\"  class=\"relationInput form-control\"></div>"+
                        "<div class='col-lg-4 col-md-4 col-sm-4' style='line-height: 32px;'><a class=\"relationA\"> 删除号码</a></div>"+
                        "</div>"
                      continue;
                    }
                    if("投诉电话" == self.serviceAttrs[i].attrName){
                      sum+=1;
                      tel +="<div class=\"row br\">"+
                        "<div class=\"col-lg-4 col-md-4 col-sm-4\">"+
                        "<select class=\"relationSelect form-control\">"+
                        "<option value=\"-1\">请选择电话类型</option>"+
                        "<option value=\"0\">服务咨询电话</option>"+
                        "<option value=\"1\">车辆急救电话</option>"+
                        "<option value=\"2\" selected=\"selected\">投诉电话</option>"+
                        "<option value=\"3\">保养预约</option>"+
                        "</select>"+
                        "</div>"+
                        "<div class='col-lg-4 col-md-4 col-sm-4'><input type=\"text\" value=\""+ self.serviceAttrs[i].attrValue +"\"  class=\"relationInput form-control\"></div>"+
                        "<div class='col-lg-4 col-md-4 col-sm-4' style='line-height: 32px;'><a class=\"relationA\"> 删除号码</a></div>"+
                        "</div>"
                      continue;
                    }
                    //其他信息
                    if("服务顾问" == self.serviceAttrs[i].attrName){
                      $("#serviceAssistant option").each(function(){
                        var t = $(this).text();
                        if(t==self.serviceAttrs[i].attrValue){
                          $(this).attr("selected",true);
                          return false;
                        }
                      });
                      continue;
                    }
                    if("钣金喷漆工" == self.serviceAttrs[i].attrName){
                      $("#paintWorkNum option").each(function(){
                        var t = $(this).text();
                        if(t==self.serviceAttrs[i].attrValue){
                          $(this).attr("selected",true);
                          return false;
                        }
                      });
                      continue;
                    }
                    if("电器维修" == self.serviceAttrs[i].attrName){
                      $("#electricalNum option").each(function(){
                        var t = $(this).text();
                        if(t==self.serviceAttrs[i].attrValue){
                          $(this).attr("selected",true);
                          return false;
                        }
                      });
                      continue;
                    }
                    if("机修工" == self.serviceAttrs[i].attrName){
                      $("#mechanicNum option").each(function(){
                        var t = $(this).text();
                        if(t==self.serviceAttrs[i].attrValue){
                          $(this).attr("selected",true);
                          return false;
                        }
                      });
                      continue;
                    }
                    if("占地面积" == self.serviceAttrs[i].attrName){
                      $("#coverArea option").each(function(){
                        var t = $(this).text();
                        if(t==self.serviceAttrs[i].attrValue){
                          $(this).attr("selected",true);
                          return false;
                        }
                      });
                      continue;
                    }
                    if("接待面积" == self.serviceAttrs[i].attrName){
                      $("#serviceArea option").each(function(){
                        var t = $(this).text();
                        if(t==self.serviceAttrs[i].attrValue){
                          $(this).attr("selected",true);
                          return false;
                        }
                      });
                      continue;
                    }
                    if("维修区面积" == self.serviceAttrs[i].attrName){
                      $("#repairArea option").each(function(){
                        var t = $(this).text();
                        if(t==self.serviceAttrs[i].attrValue){
                          $(this).attr("selected",true);
                          return false;
                        }
                      });
                      continue;
                    }
                    if("停车区面积" == self.serviceAttrs[i].attrName){
                      $("#parkingArea option").each(function(){
                        var t = $(this).text();
                        if(t==self.serviceAttrs[i].attrValue){
                          $(this).attr("selected",true);
                          return false;
                        }
                      });
                      continue;
                    }


                  }
                  $("#tel").append(tel);
                  button += "<div class=\"form-group numderPlusDIV\" style=\"margin-left: 0;margin-top: 10px;\">"+
                    "<label class='col-sm-2 control-label'></label>"+
                    "<div class='col-lg-4 col-md-4 col-sm-4'><a class=\"btn btn-primary numderPlus\">+添加号码</a></div>"+
                    "</div>"
                  $("#button").append(button);
                  if(sum<2||sum==2){
                    $(".numderPlusDIV").show()
                  }else{
                    $(".numderPlusDIV").hide()
                  }

                  function removeRow(obj){
                    var relationSelect = $(".relationSelect").length;
//                    console.log(relationSelect)
                    if(relationSelect>1){
                      $(obj).parent().parent().remove();
                      $(".numderPlusDIV").show();
                    }else{
//                      alert("至少保留一个电话号码!")
                      return false;
                    }
                  }
                  function addNumber(){
                    $(".numderPlusDIV").show();
                    $(".relationA").show();
                    var html = "<div class=\"row br\">"+
                      "<div class=\"col-lg-4 col-md-4 col-sm-4\">"+
                      "<select class=\"relationSelect form-control\">"+
                      "<option value=\"-1\" selected=\"selected\">请选择电话类型</option>"+
                      "<option value=\"0\">服务咨询电话</option>"+
                      "<option value=\"1\">车辆急救电话</option>"+
                      "<option value=\"2\">投诉电话</option>"+
                      "<option value=\"3\">保养预约</option>"+
                      "</select>"+
                      "</div>"+
                      "<div class='col-lg-4 col-md-4 col-sm-4'><input type=\"text\"  class=\"relationInput form-control\"></div>"+
                      "<div class='col-lg-4 col-md-4 col-sm-4' style='line-height: 32px;'><a class=\"relationA\"> 删除号码</a></div>"+
                      "</div>";
                    $("#tel").append(html);
                    $(".relationA").click(function(){
                      removeRow(this);
                      $(".numderPlusDIV").show();
                    })
                  }
                  $(".relationA").click(function(){
                    removeRow(this)
                    $(".numderPlusDIV").show();
                  });

                  $(".numderPlus").click(function(){
                    var relationSelect = $("#tel .row").length;
                    if(relationSelect<3){
                      addNumber(this);
                      var relationSelect = $("#tel .row").length;
                      if(relationSelect==3){
                        $(".numderPlusDIV").hide();
                      }
                    }else{
                      $(".numderPlusDIV").hide();
                    }
                  })


                  function check_tel(obj){
                    var v = $(obj).val();
                    $(obj).parent().find("span").remove();
                    if(typeof(v) != "undefined" && v !=null && v !=""){
                      if(!isTel(v)){
                        $(obj).parent().append("<span style='color: red;font-size: 12px;margin-left: 20px;'>请填写正确的电话号码</span>");
                        $(obj).val("");
                      }
                    }
                  }

                },
                error:function () {

                }
              });
            },
            components: {
              HtmlFooter,
                HtmlHeader
            },
            filters: {
                currency: function (value) {
                  if (!value) return
                 value = value.toFixed(2)
                 return value
                }
            }
        }
</script>



