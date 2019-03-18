// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import './assets/bootstrap/css/bootstrap.min.css'
//import './assets/bootstrap/js/bootstrap.min'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store/store'
import axios from 'axios'
import global_ from './components/Public/Global' //引用文件
import VideoPlayer from 'vue-video-player'
import echarts from 'echarts' //引入echarts

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)
Vue.use(iView)
Vue.prototype.$ajax = axios
Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
Vue.prototype.$echarts = echarts //引入组件
Vue.config.productionTip = false

//获取Token
let Token = localStorage.getItem('Token');
axios.defaults.headers.common['Token'] = Token;

//判断Token是否有效，如果失效跳转到登录页面
var url = "/Api/Check/UserToken"
axios.get(url).then(response => {
    console.log(response);
    if (response.data.status == Vue.prototype.GLOBAL.Success) {
        console.log("login");
    } else if (response.data == Vue.prototype.GLOBAL.TokenError) {
        console.log("out");
        Vue.prototype.GLOBAL.IsLogin = 0
        localStorage.removeItem('Token');
        axios.defaults.headers.common['Token'] = "";
        localStorage.removeItem('LoginValue');
        router.push({ path: '/Login' });
    }
}, response => {
    console.log(response);
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})