/**
 * Created by Jing on 2017/1/9.
 */
import Vue from 'vue'
import Vuex from 'vuex'
//import user from './login'
import user from '../store/user/login.js'
Vue.use(Vuex)



const baseurl = {
    state: { "data_serv_url":"/jingycfOperator","img_upload_url":"http://192.168.0.163:1702","img_show_url":"http://192.168.0.163:1702"},
    mutations: {  },
    actions: {  },
    getters: {  }
}



export default new Vuex.Store({
  //strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
  modules: {
    user,
    baseUrl:baseurl
    //state,
    //mutations
  }
})



function showMessage(showMessage){
  var html = ''
  html=+'<div id="modal-form" class="modal fade in" aria-hidden="false" style="display: block;">'
        +'<div class="modal-dialog">'
        +'<div class="modal-content">'
        +'<div class="modal-body">'
        +'<div class="row">'
        +'<div class="col-sm-6 b-r"><h3 class="m-t-none m-b">Sign in</h3>'
        +'<p>'+showMessage+'</p>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'<div class="modal-backdrop fade in"></div>';
    $("body").append(html);
  setTimeout(function(){
    $("body").remove(html);
  }, 2000);
}



