import Vue from 'vue'
import router from './router'
import store from './store'
import Resource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'
import elementUI from 'element-ui'
import App from './App'


import $ from 'jquery'
import Cookie from 'js-cookie'
Vue.prototype.cookies=Cookie;

Vue.use(Resource);
Vue.use(elementUI);
Vue.config.productionTip = false;

// 引入mint-ui框架
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 引入mui的样式
import './style/css/mui.min.css'
//import fastclick from 'fastclick'
//fastclick.attach(document.body)

import './style/css/app.css'
import './style/css/media.css'
import './style/css/calendar.css'
import './style/css/root.css'
import './style/fonts/mui.ttf'


 let vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

/*设置全局的请求超时方法*/
/*Vue.http.interceptors.push((request, next) => {
  let timeout;
  // 這裡改用 _timeout
  if (request._timeout) {
    timeout = setTimeout(() => {
      //自定义响应体 status:408,statustext:"请求超时"，并返回给下下边的next
      next(request.respondWith(request.body, {
        status: 408,
        statusText: '请求超时'
      }));

    }, request._timeout);
  }
  next((response) => {
    console.log(response.status)//如果超时输出408
    return response;
  })
})*/




Vue.http.interceptors.push((request, next) => {
  console.log(this)//此处this为请求所在页面的Vue实例
  // modify request
  //request.method = 'POST';//在请求之前可以进行一些预处理和配置

  // continue to next interceptor
  next((response)=>{//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法

    console.log('返回响应===》')
    console.log(this)
    console.log(response)
    if(response.status == '200'){
      return response;
    }else if(response.status == '400'){
      vm.$message({
        showClose: true,
        message: '错误请求，请您稍后再试！',
        type: 'warning',
        duration:2000
      });
    }else if(response.status == '401'){
      vm.$message({
        showClose: true,
        message: '未授权，请您重新登录！',
        type: 'warning',
        duration:2000
      });
    }else if(response.status == '403'){
      vm.$message({
        showClose: true,
        message: '服务器拒绝访问，请您稍后再试！',
        type: 'warning',
        duration:2000
      });
    }else if(response.status == '404'){
      vm.$message({
        showClose: true,
        message: '请求错误，未找到该资源，请您稍后再试！',
        type: 'warning',
        duration:2000
      });
    }else if(response.status == '405'){
      vm.$message({
        showClose: true,
        message: '请求方法未允许，请您稍后再试！',
        type: 'warning',
        duration:2000
      });
    }else if(response.status == '408'){
      vm.$message({
        showClose: true,
        message: '请求超时，请您稍后再试！',
        type: 'warning',
        duration:2000
      });
    }else if(response.status == '500'){
      vm.$message({
        showClose: true,
        message: '服务器端出错，请您稍后再试！',
        type: 'warning',
        duration:2000
      });
    }else if(response.status == '501'){
      vm.$message({
        showClose: true,
        message: '网络未实现，请您稍后再试！',
        type: 'warning',
        duration:2000
      });
    }else if(response.status == '502'){
      vm.$message({
        showClose: true,
        message: '网络错误，请您稍后再试！',
        type: 'warning',
        duration:2000
      });
    }else if(response.status == '503'){
      vm.$message({
        showClose: true,
        message: '服务不可用，请您稍后再试！',
        type: 'warning',
        duration:2000
      });
    }else if(response.status == '504'){
      vm.$message({
        showClose: true,
        message: '网络超时，请您稍后再试！',
        type: 'warning',
        duration:2000
      });
    }else if(response.status == '505'){
      vm.$message({
        showClose: true,
        message: 'http版本不支持该请求，请您稍后再试！',
        type: 'warning',
        duration:2000
      });
    }else if(response.status == '999'){
      vm.$message({
        showClose: true,
        message: '连接超时，请重新登录！',
        type: 'warning',
        duration:2000
      });
      vm.$router.push('/')
      /*alert('账号异常，请重新登录！')
      window.location.href ='http://localhost:8082/#/'*/
    }else{
      vm.$message({
        showClose: true,
        message:'出错了，请您稍后再试！',
        type: 'warning',
        duration:2000
      });
    }


  });
});


