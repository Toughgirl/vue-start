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
              <h5>注册信息</h5>(<span class="check-error">*</span>为必填项)
            </div>
            <div class="ibox-content">
              <table class="table table-bordered ">
                <tbody>
                <tr>
                  <td class="gray-bg"><span class="check-error">*</span>营业执照注册号：</td>
                  <td>
                    <input type="text" class="form-control left defaultInput " placeholder="请输入营业执照注册号" id="operationNo" name="operationNo" v-validate="'required|operationNo'">
                    <span v-show="errors.has('operationNo')" class="left text-danger lineHeight32" >{{ errors.first('operationNo') }}</span>
                  </td>
                  <td class="gray-bg"><span class="check-error">*</span>公司名称：</td>
                  <td><input type="text" class="form-control left defaultInput" placeholder="请输入公司名称" id="companyName" name="companyName" v-validate="'required'">
                    <span v-show="errors.has('companyName')" class="left text-danger lineHeight32" >{{ errors.first('companyName') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="gray-bg"><span class="check-error">*</span>法人代表姓名：</td>
                  <td>
                    <input type="text" class="form-control left defaultInput" placeholder="请输入法人代表姓名" id="legalPerson" name="legalPerson" v-validate="'required|onlyName'">
                    <span v-show="errors.has('legalPerson')" class="left text-danger lineHeight32" >{{ errors.first('legalPerson') }}</span>
                  </td>
                  <td class="gray-bg"><span class="check-error">*</span>法人身份证号码：</td>
                  <td>
                    <input type="text" class="form-control left defaultInput required" placeholder="请输入身份证号码" id="legalersonIdno" name="IdentityCodeValid" v-validate="'required|IdentityCodeValid'">
                    <span v-show="errors.has('IdentityCodeValid')" class="left text-danger lineHeight32" >{{ errors.first('IdentityCodeValid') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="gray-bg"><span class="check-error">*</span>注册资本：</td>
                  <td>
                    <input type="text" class="form-control left defaultInput required" placeholder="请输入注册资本" id="registeredCapital" name="registeredCapital" v-validate="'required|onlyInt'">
                    <span v-show="errors.has('registeredCapital')" class="left text-danger lineHeight32" >{{ errors.first('registeredCapital') }}</span>
                  </td>
                  <td class="gray-bg"><span class="check-error">*</span>成立日期：</td>
                  <td>
                    <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%" placeholder="请选择成立日期" readonly="readonly" name="establishTime" id="establishTime"  v-validate="'required'" onfocus="WdatePicker({dateFmt:'yyyy年MM月dd日'})">
                    <span v-show="errors.has('establishTime')" class="left text-danger lineHeight32" >{{ errors.first('establishTime') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="gray-bg"><span class="check-error">*</span>营业期限：</td>
                  <td>
                    <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%" placeholder="请选择开始日期" readonly="readonly" name="dateStart" id="dateStart" v-validate="'required'" onfocus="WdatePicker({dateFmt:'yyyy年MM月dd日',maxDate:'#F{$dp.$D(\'dateEnd\')}'})">
                    <span class="left" style="margin:0 1%;line-height:32px;">-</span>
                    <input type="text" class="Wdate form-control" style="float: left;height: 32px;width:40%" placeholder="请选择结束日期" readonly="readonly" name="dateEnd" id="dateEnd" v-validate="'required'" onfocus="WdatePicker({dateFmt:'yyyy年MM月dd日',minDate:'#F{$dp.$D(\'dateStart\')}'})">
                  </td>
                  <td class="gray-bg"><span class="check-error">*</span>注册地址：</td>
                  <td>
                    <input type="text" class="form-control left defaultInput" placeholder="请输入注册地址" id="orgAddress" name="orgAddress" v-validate="'required'">
                    <span v-show="errors.has('orgAddress')" class="left text-danger lineHeight32" >{{ errors.first('orgAddress') }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="gray-bg"><span class="check-error">*</span>营业执照：</td>
                  <td>
                    <div class="accountImg left">
                      <input type="hidden" id="imgsrc">
                      <img  class="accountImgB" width="100" id="imgShow" src="../../assets/img/upfile.png">
                      <input type="file" name="fileUpA" class="accountImgC" id="fileUp" onchange="uploadHead('fileUp','imgShow','imgsrc','04','0')">
                    </div>
                  </td>
                  <td class="gray-bg"><span class="check-error">*</span>法人身份证照片：</td>
                  <td>
                    <div class="accountImg left">
                      <input type="hidden" id="imgsrcA" >
                      <img  class="accountImgB" width="100" id="imgShowA" src="../../assets/img/upfile.png">
                      <input type="file" name="fileUpA" class="accountImgC" id="fileUpA" onchange="uploadHead('fileUpA','imgShowA','imgsrcA','04','0')">
                    </div>
                    <div class="accountImg left">
                      <input type="hidden" id="imgsrcB" >
                      <img  class="accountImgB" width="100" id="imgShowB" src="../../assets/img/upfile.png">
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
                  <input type="text" class="form-control defaultInput left" placeholder="请输入合同编号" id="contractNo" name="ContractNumber" v-validate="'required|isNumber'">
                  <span v-show="errors.has('ContractNumber')" class="left text-danger lineHeight32" >{{ errors.first('ContractNumber') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>门店别名：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput required left" placeholder="请输入门店别名" id="aliasName" name="aliasName" v-validate="'required'">
                  <span v-show="errors.has('aliasName')" class="left text-danger lineHeight32" >{{ errors.first('aliasName') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <!--<div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>结算方式：</label>
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10" id="payType">
                  <div class="left" style="margin-right:20px;"><input type="checkbox" value="1" name="checkbox" class="pay_type" v-validate="'required'">月结</div>
                  <div class="left" style="margin-right:20px;"><input type="checkbox" value="5" name="checkbox" class="pay_type"  v-validate="'required'">钱包</div>
                  <div class="left" style="margin-right:20px;"><input type="checkbox" value="9" name="checkbox" class="pay_type" v-validate="'required'">在线支付</div>
                  <span v-show="errors.has('checkbox')" class="left text-danger lineHeight32" >请选择结算方式</span>
                </div>
                <div class="clearfix"></div>
              </div>-->
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>滞纳金比例：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput left" placeholder="请输滞纳金比例" id="lateRate" name="lateRate" v-validate="'required|onlyDecimals'"><div class="col-sm-1" style="line-height: 32px;">%</div>
                  <span v-show="errors.has('lateRate')" class="left text-danger lineHeight32" >{{ errors.first('lateRate') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <!--<div class="form-group">-->
                <!--<label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">全车件返利比例：</label>-->
                <!--<div class="col-lg-5 col-md-5 col-sm-10 col-xs-10"><input type="text" class="form-control defaultInput left" placeholder="请输入全车件返利比例" id="salesPriceRatio"><div class="col-sm-3" style="line-height: 32px;">%</div></div>-->
                <!--<div class="clearfix"></div>-->
              <!--</div>-->
              <div class="form-group">
                <label class="col-sm-2 control-label"><span class="check-error">*</span>是否提供会员服务：</label>
                <div class="col-sm-5" style="line-height: 32px;">
                  <input type="radio" name="isVipService" value="1" v-validate="'required'"> 是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="radio" name="isVipService" value="0" v-validate="'required'"> 否
                  <span v-show="errors.has('isVipService')" class="text-danger lineHeight32">请选择是否提供会员服务</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group" id="isVipServiceShow" style="display: none;">
                <label class="col-sm-2 control-label">服务单结算比例：</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control defaultInput left" placeholder="请输入服务单结算比例" id="VipService" name="VipService" v-validate="'onlyDecimals'"><div class="col-sm-1" style="line-height: 32px;">%</div>
                  <span v-show="errors.has('VipService')" class="left text-danger lineHeight32" >{{ errors.first('VipService') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>

              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>负责人姓名：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput left" placeholder="请输入负责人姓名" id="names" name="names" v-validate="'required|onlyName'">
                  <span v-show="errors.has('names')" class="text-danger lineHeight32 left">{{ errors.first('names') }}</span>
                  <div class="col-lg-4 col-md-4 col-sm-10 col-xs-10" style="line-height: 32px;">（即顶级账户管理员）</div>
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
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10" id="">
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="德系" class="demioCheckbox" v-validate="'required'">德系</div>
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="美系" class="demioCheckbox" v-validate="'required'">美系</div>
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="法系" class="demioCheckbox" v-validate="'required'">法系</div>
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="日系" class="demioCheckbox" v-validate="'required'">日系</div>
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="韩系" class="demioCheckbox" v-validate="'required'">韩系</div>
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="豪华品牌" class="demioCheckbox" v-validate="'required'">豪华品牌</div>
                  <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"><input type="checkbox" name="mainCarClass" value="其他" class="demioCheckbox" v-validate="'required'">其他</div>
                  <span v-show="errors.has('mainCarClass')" class="left text-danger lineHeight32" >请选择主修车系</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <!--<div class="form-group">-->
                <!--<label class="col-sm-2 control-label">是否营业：</label>-->
                <!--<div class="col-sm-5"><input type="radio" name="vipSer"> 是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="vipSer"> 否</div>-->
                <!--<div class="clearfix"></div>-->
              <!--</div>-->
              <!--<div class="form-group">-->
                <!--<label class="col-sm-2 control-label">营业时间：</label>-->
                <!--<div class="col-sm-5"><input type="text" class="Wdate form-control" style="height: 32px;width:50%"  readonly="readonly" name="dateStart" id="dateStart" onfocus="WdatePicker({dateFmt:'yyyy年MM月dd日',maxDate:'#F{$dp.$D(\'dateEnd\')}'})"></div>-->
                <!--<div class="clearfix"></div>-->
              <!--</div>-->
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
                  <input type="text" class="form-control defaultInput left" placeholder="请输入详细地址" id="storeAdd" name="orgAddress" v-validate="'required'">
                  <span v-show="errors.has('orgAddress')" class="left text-danger lineHeight32" >{{ errors.first('orgAddress') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>联系电话：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10" id="tel">
                  <div class="row br">
                    <div class="col-lg-4 col-md-4 col-sm-4">
                      <select class="form-control relationSelect">
                        <option>请选择电话类型</option>
                        <option>服务咨询电话</option>
                        <option>车辆急救电话</option>
                        <option>投诉电话</option>
                        <option>保养预约</option>
                      </select>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4"><input type="text" class="form-control relationInput"></div>
                    <div class="col-lg-4 col-md-4 col-md-4" style="line-height: 32px;"><a class="relationA">删除号码</a></div>
                    <div  class="clearfix"></div>
                  </div>
                </div>
                <div  class="clearfix"></div>
                <div class="form-group" style="margin-top: 10px;">
                  <label class="col-sm-2 control-label"></label>
                  <div class="col-sm-10">
                    <a class="btn btn-primary numderPlus">+添加号码</a>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">邮政编码：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput left" placeholder="请输入邮政编码"  id="postCode" name="isZip" v-validate="'isZip'">
                  <span v-show="errors.has('isZip')" class="left text-danger lineHeight32" >{{ errors.first('isZip') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">传真号码：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput left" placeholder="请输入传真号码" id="foxNum" name="fax" v-validate="'fax'">
                  <span v-show="errors.has('fax')" class="left text-danger lineHeight32" >{{ errors.first('fax') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label"><span class="check-error">*</span>电子邮箱：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control left defaultInput" placeholder="请输入电子邮箱" id="email" name="email"  v-validate="'email'">
                  <span v-show="errors.has('email')" class="left text-danger lineHeight32" >{{ errors.first('email') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">客服QQ：</label>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-10">
                  <input type="text" class="form-control defaultInput left" placeholder="请输入客服QQ" id="qq" name="qq" v-validate="'qq'">
                  <span v-show="errors.has('qq')" class="left text-danger lineHeight32" >{{ errors.first('qq') }}</span>
                </div>
                <div class="clearfix"></div>
              </div>

              <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">其他信息：</label>
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                      <div class="row">
                        <div class="col-md-4 col-sm-3 control-label">
                          服务顾问：
                        </div>
                        <div class="col-md-6 col-sm-4">
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
                        <div class="col-md-4 col-sm-3 control-label">
                          钣金喷漆工：
                        </div>
                        <div class="col-md-6 col-sm-4">
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
                        <div class="col-md-4 col-sm-3 control-label">
                          电器维修：
                        </div>
                        <div class="col-md-6 col-sm-4">
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
                        <div class="col-md-4 col-sm-3 control-label">
                          机修工：
                        </div>
                        <div class="col-md-6 col-sm-4">
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
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 form-group">
                      <div class="row">
                        <div class="col-md-4 col-sm-3 control-label">
                          占地面积：
                        </div>
                        <div class="col-md-6 col-sm-4">
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
                        <div class="col-md-4 col-sm-3 control-label" >
                          接待面积：
                        </div>
                        <div class="col-md-6 col-sm-4">
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
                        <div class="col-md-4 col-sm-3 control-label">
                          维修区面积：
                        </div>
                        <div class="col-md-6 col-sm-4">
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
                        <div class="col-md-4 col-sm-3 control-label">
                          停车区：
                        </div>
                        <div class="col-md-6 col-sm-4">
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
                          <textarea class="form-control" style="height:300px;" id="comn" >

                          </textarea>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="form-group">
                <div>上传图片支持 jpg、jpeg、png 格式，最多上传5张图片，单张图片不超过1M。</div>
                <div class="summernote">
                  <div class="imagesContent">
                    <ul class="fileImg" id="fileImgs">
                    </ul>
                    <div class="upfilebox left" id="upfilebox" style="height:150px;">
                      <img class="addPicture" src="../../assets/img/moreImg.png" onclick=";">
                      <input class="file-btn" type="file" name="file" id="uploadfile5" onchange="uploadMore('uploadfile5','fileImgs','02')"/>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="clearfix"></div>
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
              saveCompany:function(){
                var self = this;
                var param = new Object();
                param.access_token = store.state.user.access_token
                param.user_id = store.state.user.userId
                var request_parames = new Object();
                var operationNo= $("#operationNo").val();
                var aliasName= $("#aliasName").val();
                var companyName= $("#companyName").val();
                var legalPerson= $("#legalPerson").val();
                var legalersonIdno= $("#legalersonIdno").val();
                var registeredCapital= $("#registeredCapital").val();
                var establishTime= $("#establishTime").val();
                var isVipService= $("input[name='isVipService']:checked").val();
                var businessTime= $("#dateStart").val()+"-"+$("#dateEnd").val();
                var comn= $("#comn").val();
                var contractNo= $("#contractNo").val();
                var orgAddress= $("#orgAddress").val();
//                var salesPriceRatio= $("#salesPriceRatio").val();
                var regionaId= $("#district1").val();
                if(operationNo==""){
                  $("#operationNo").focus()
                  return false
                }
                if(companyName==""){
                  $("#companyName").focus()
                  return false
                }
                if(legalPerson==""){
                  $("#legalPerson").focus()
                  return false
                }
                if(legalersonIdno==""){
                  $("#legalersonIdno").focus()
                  return false
                }
                if(registeredCapital==""){
                  $("#registeredCapital").focus()
                  return false
                }
                if(orgAddress==""){
                  $("#orgAddress").focus()
                  return false
                }
                if(establishTime==""){
                  $("#establishTime").focus()
                  return false
                }
                if(contractNo==""){
                  $("#contractNo").focus()
                  return false
                }

                var company = new Object();
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
//                company.salesPriceRatio = salesPriceRatio
                company.regionaId = regionaId
                company = JSON.stringify(company);

                var license= $("#imgsrc").val()
                var idCardDue= $("#imgsrcA").val()
                var idCardReverse= $("#imgsrcB").val()
                var lateRate= $("#lateRate").val()
                var names= $("#names").val()
                var adminPhone= $("#adminPhone").val()
//                var payType=""
//                $(".pay_type").each(function(){
//                  if($(this).is(':checked')) {
//                    payType += $(this).val()+','
//                  }
//                })

//                if(aliasName==""){
//                  $("#aliasName").focus()
//                  return false
//                }
//                if(lateRate==""){
//                  $("#lateRate").focus()
//                  return false
//                }
//                if(names==""){
//                  $("#names").focus()
//                  return false
//                }
//                if(adminPhone==""){
//                  $("#adminPhone").focus()
//                  return false
//                }

                request_parames.company = company
                request_parames.license = license
                request_parames.idCardDue = idCardDue
                request_parames.idCardReverse = idCardReverse
                request_parames.lateRate = lateRate
                request_parames.names = names
                request_parames.adminPhone = adminPhone
//                request_parames.payType = payType


                //servicesArr

                var servicesArr = new Array();
                var type = new Object()
                type.title = "门店类型";
                type.value = $("#repGrade").val()
//                if(type.value==""){
//                  alert("门店类型不能为空")
//                  return false
//                }
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
//                if(mainCarValue==""){
//                  alert("主修车系不能为空")
//
//                }
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
//                if(email.value==''){
//                  $("#email").focus();
//                  return false
//                }
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
                if(servicesArr==""){
                  alert("必须有一个联系电话")
                }
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
                        self.$router.replace({ path: '/_storeList'})
                      }else{
                        alert(data.message);
                        return false;

                      }
                    },
                    error:function () {

                    }
                  })
                }else{
                  alert("证件照片不能为空!")
                  return false;
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
              $("input[name='isVipService']").click(function(){
                if($(this).val()==1){
                  $("#isVipServiceShow").show();
                }else{
                  $("#isVipServiceShow").hide();
                }
              });

            function words_deal(){
               var curLength=$("#comn").val().length;
               if(curLength>2000){
                var num=$("#comn").val().substr(0,2000);
                $("#comn").val(num);
                alert("超过字数限制，多出的字将被截断！" );
              }else{
                $("#textLength").html(2000-$("#comn").val().length);
              }
            }
            $("#comn").keydown(function(){
            words_deal();
            })
            $(".numderPlus").click(function(){
                var relationSelect = $(".relationSelect").length;
                if(relationSelect<4){
                  addNumber(this);
                  relationSelect++
                  if(relationSelect==4){
                    $(".numderPlus").hide();
                  }
                }else{
                  $(".numderPlus").hide();
                }
              })
              $(".relationA").click(function(){
                removeRow(this);
                $(".numderPlus").show();
                })
              function removeRow(obj){
                var relationSelect = $(".relationSelect").length;
//                console.log(relationSelect)
                if(relationSelect>1){
                  $(obj).parent().parent().remove()
                }else{
                  alert("至少保留一个电话号码！")
                 return false;
                }
              }

              function addNumber(){
                $(".numderPlus").show();
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
                $(".relationA").unbind("click").bind("click",function(){
                    removeRow(this);
                    $(".numderPlus").show();
                  })
              }
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



