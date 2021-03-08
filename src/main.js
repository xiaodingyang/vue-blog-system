import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import myPlugins from './plugins'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';

import vhCheck from 'vh-check'
import Directives from '@/directives'
import Vue2Editor from 'vue2-editor'
import VueParticles from 'vue-particles'
// 粒子特效
Vue.use(VueParticles)
// 自定义指令
Vue.use(Directives)
// 进度条
vhCheck('browser-address-bar')

Vue.use(ElementUI)

Vue.use(myPlugins)
// 富文本
Vue.use(Vue2Editor)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
