/**
 * Created by Jing on 2017/1/4.
 */
import login from '../store/login'
import forgetPassword from '../store/user/forgetPassword.vue'
//import index from '../store/index'
import index from '../components/index'
import _storeList from '../components/storeManagement/_storeList.vue'
import storeDetail from '../components/storeManagement/storeDetail.vue'
import storeEdit from '../components/storeManagement/storeEdit.vue'
import storeNew from '../components/storeManagement/storeNew.vue'
//门店新修改
import storeNew_ from '../components/storeManagement/storeNew_.vue'
import storeEdit_ from '../components/storeManagement/storeEdit_.vue'
import storeDetail_ from '../components/storeManagement/storeDetail_.vue'

import returnList from '../components/businessManagement/returnList_.vue'
import ReturnOrderDetail from '../components/businessManagement/returnDetail.vue'

import purchaseList from '../components/businessManagement/purchaseList.vue'
import purchaseDetail from '../components/businessManagement/purchaseDetail.vue'

import carParts from '../components/businessManagement/carParts.vue'
import carPartsDetail from '../components/businessManagement/carPartsDetail.vue'

import serviceList from '../components/businessManagement/serviceList.vue'
import serviceDetail from '../components/businessManagement/serviceDetail.vue'





import account from '../components/companyInformation/account.vue'
import accountEdit from '../components/companyInformation/accountEdit.vue'
import personal from '../components/companyInformation/personal.vue'
import personalEdit from '../components/companyInformation/personalEdit.vue'
import callback from '../components/companyInformation/callback.vue'
import changePassWord from '../components/companyInformation/changePassWord.vue'


//业务管理财务
import SettledList from '../components/financialManagement/SettledList.vue'
import SettledDetail from '../components/financialManagement/SettledDetail.vue'

import SettledList_ from '../components/financialManagement/SettledList_.vue'
import SettledDetail_ from '../components/financialManagement/SettledDetail_.vue'

import TransactionList from '../components/financialManagement/TransactionList.vue'
import TransactionDetail from '../components/financialManagement/transcationDetail.vue'
import serviceSettleList from '../components/financialManagement/serviceSettleList.vue'
import serviceSettleDetail from '../components/financialManagement/serviceSettleDetail.vue'
//业务管理，财务结算统计
import statisticsList from '../components/financialManagement/statisticsList.vue'
import statisticsDetail from '../components/financialManagement/statisticsDetail.vue'

//财务管理
import settlementList from '../components/selfFinancial/settlementList.vue'
import selfTranscationList from '../components/selfFinancial/selfTranscationList.vue'
import settlementDetail from '../components/selfFinancial/settlementDetail.vue'
import selftranscationDetail from '../components/selfFinancial/selftranscationDetail.vue'

//营销管理
//购销活动
import marketingList from '../components/Marketing/marketingList.vue'
import marketingDetail from '../components/Marketing/marketingDetail.vue'
import marketingStatistics from '../components/Marketing/marketingStatistics.vue'
import signUpStore from '../components/Marketing/signUpStore.vue'
import storeSaleStatistics from '../components/Marketing/storeSaleStatistics.vue'
import achievements from '../components/Marketing/achievements.vue'



import messageList from '../components/message/messageList.vue'
//路由规则设置
// auth true登录才能访问，false不需要登录，默认true

export default [
  {
    path: '/login', //登录
    meta: { auth: false },
    component:  login
  },
  {
    path: '/forgetPassword', //忘记密码
    meta: { auth: true},
    component:  forgetPassword
  },
  {
    path: '/index', //首页
    meta: { auth: false },
    component:  index
  },
  {
    path: '/returnList',//退货管理
    meta: { auth: false },
    component:  returnList
  },
  {
    path: '/ReturnOrderDetail/:id',//退货详情
    meta: { auth: false },
    component:  ReturnOrderDetail
  },
  {
    path: '/carParts',//全车件管理
    meta: { auth: false },
    component:  carParts
  },
  {
    path: '/carPartsDetail/:id',//全车件详情
    meta: { auth: false },
    component:  carPartsDetail
  },
  {
    path: '/purchaseList',//采购管理
    meta: { auth: false },
    component: purchaseList
  },
  {
    path: '/purchaseDetail/:id',//采购详情
    meta: { auth: false },
    component: purchaseDetail
  },
  {
    path: '/serviceList',//服务单列表
    meta: { auth: false },
    component: serviceList
  },
  {
    path: '/serviceDetail/:id',//服务单详情
    meta: { auth: false },
    component: serviceDetail
  },
  {
    path: '/_storeList',//门店管理
    meta: { auth: false },
    component:  _storeList
  },
  {
    path: '/storeDetail/:id',//门店管理
    meta: { auth: false },
    component:  storeDetail
  },
  {
    path: '/storeEdit/:id',//门店管理
    meta: { auth: false },
    component:  storeEdit
  },
  {
    path: '/account',//运营商信息
    meta: { auth: false },
    component: account
  },
  {
    path: '/accountEdit',//运营商信息
    meta: { auth: false },
    component: accountEdit
  },
  {
    path: '/personal',//个人中心
    meta: { auth: false },
    component: personal
  },
  {
    path: '/personalEdit',//个人中心修改资料
    meta: { auth: false },
    component: personalEdit
  },
  {
    path: '/changePassWord',//修改密码
    meta: { auth: false },
    component: changePassWord
  },
  {
    path: '/TransactionList',//交易明细
    meta: { auth: false },
    component: TransactionList
  },
  {
    path: '/TransactionDetail/:id',//结算管理详情
    meta: { auth: false },
    component: TransactionDetail
  },
  {
    path: '/storeNew/:id',//结算管理详情
    meta: { auth: false },
    component: storeNew
  },
  {
    path: '/SettledList',//结算管理
    meta: { auth: false },
    component: SettledList
  },
  {
    path: '/SettledDetail/:id',//结算管理详情
    meta: { auth: false },
    component: SettledDetail
  },
  {
    path: '/serviceSettleList',//服务单结算
    meta: { auth: false },
    component: serviceSettleList
  },
  {
    path: '/serviceSettleDetail/:id',//服务单结算详情
    meta: { auth: false },
    component: serviceSettleDetail
  },
  {
    path: '/SettledDetail/:id',//结算管理详情
    meta: { auth: false },
    component: SettledDetail
  },
  {
    path: '/SettledList_',//新结算管理
    meta: { auth: false },
    component: SettledList_
  },
  {
    path: '/SettledDetail_/:id',//新结算管理详情
    meta: { auth: false },
    component: SettledDetail_
  },
  {
    path: '/callback',//信息管理
    meta: { auth: false },
    component: callback
  },
  {
    path: '/messageList',//信息管理
    meta: { auth: false },
    component: messageList
  },
  {
    path: '/settlementList',//信息管理
    meta: { auth: false },
    component: settlementList
  },
  {
    path: '/settlementDetail/:id',
    meta: { auth: false },
    component: settlementDetail
  },
  {
    path: '/selfTranscationList',//信息管理
    meta: { auth: false },
    component: selfTranscationList
  },
  {
    path: '/selftranscationDetail/:id',//信息管理
    meta: { auth: false },
    component: selftranscationDetail
  },
  {
    path: '/marketingList',//营销管理
    meta: { auth: false },
    component: marketingList
  },
  {
    path: '/marketingDetail/:id',//营销管理详情
    meta: { auth: false },
    component: marketingDetail
  },
  {
    path: '/marketingStatistics',//营销数据统计
    meta: { auth: false },
    component: marketingStatistics
  },
  {
    path: '/statisticsList',//门店结算统计
    meta: { auth: false },
    component: statisticsList
  },
  {
    path: '/statisticsDetail/:id',//门店结算统计详情
    meta: { auth: false },
    component: statisticsDetail
  },
  {
    path: '/storeSaleStatistics',//门店销量统计
    meta: { auth: false },
    component: storeSaleStatistics
  },
  {
    path: '/signUpStore',//签约门店统计
    meta: { auth: false },
    component: signUpStore
  },
  //门店修改
  {
    path: '/storeNew_/:id',//结算管理详情
    meta: { auth: false },
    component: storeNew_
  },
  {
    path: '/storeEdit_/:id',//门店管理
    meta: { auth: false },
    component:  storeEdit_
  },
  {
    path: '/storeDetail_/:id',//门店管理
    meta: { auth: false },
    component:  storeDetail_
  },
  {
    path: '/achievements',//签约门店统计
    meta: { auth: false },
    component: achievements
  },
  {
    path: '*', //其他页面，强制跳转到登录页面
    redirect: '/login'
  }
]

