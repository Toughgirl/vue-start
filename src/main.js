// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//引用路由插件
import VueRouter from 'vue-router'
//引入路由配置文件
import routes from './config/routes'
//加载vuex的 store
//import store from './store/user/user.js'
import store from './vuex/store.js'
//加载公共组件
//import components from './components/'
import $ from 'jquery'
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'
import './assets/css/animate.css'
import './assets/css/plugins/dataTables/dataTables.bootstrap.css'
import './assets/css/style.css'
import './assets/js/plugins/metisMenu/jquery.metisMenu.js'
import './assets/js/plugins/slimscroll/jquery.slimscroll.min.js'
import './assets/js/inspinia.js'
import './assets/js/jquery-ui-1.10.4.min.js'
import './assets/js/plugins/dataTables/jquery.dataTables.js'
import './assets/js/plugins/dataTables/dataTables.bootstrap.js'
import './assets/js/plugins/dropzone/dropzone.js'
import './assets/js/validate.js'

require('../node_modules/font-awesome/css/font-awesome.min.css');

import echarts from 'echarts'

Vue.prototype.$echarts = echarts




// 试用路由插件
Vue.use(VueRouter)

// 使用配置文件规则
const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: routes })



//登录
router.beforeEach(({meta, path}, from, next) =>  {
  var { auth = true } = meta
  // 假设这里 有一个vuex getter isLogin 来表示登陆状态
  var isLogin = Boolean(store.state.user.access_token) //true用户已登录， false用户未登录
if (!auth && !isLogin && path !== '/login'&& path !== '/forgetPassword') {
  return next({ path: '/login' })
}else if(path == '/forgetPassword'){
    next()
}else {
  var param = new Object();
  param.access_token = store.state.user.access_token
  param.user_id = store.state.user.userId
  var json = JSON.stringify(param);
  $.ajax({
    url:store.state.baseUrl.data_serv_url+"/isValid",
    data:{parameter:json},
    type:"post",
    dataType:"json",
    success:function (data) {
      if(data.code=="FAILURE"){
        setTimeout(next({ path: '/login' }),1);

      }else{

      }
    }
  });
  next()

}

})


const app = new Vue({
    store:store,
    router: router,
    render: h => h(App)
}).$mount('#app')







