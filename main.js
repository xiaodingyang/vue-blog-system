import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import myPlugins from './plugins'
import  './permission' // 权限拦截
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vhCheck from 'vh-check'
import Directives from '@/directives'
// import formCreate from '@form-create/element-ui'
import upperFirst from 'lodash/upperFirst' //应用模块
import camelCase from 'lodash/camelCase' //转为驼峰命名
import xdy from 'xdy-example-vue' 
import  'xdy-example-vue/lib/xdy.css' 
import Vue2Editor  from "vue2-editor";

// 自定义指令
Vue.use(Directives)
// 进度条
vhCheck('browser-address-bar')

Vue.use(ElementUI)

Vue.use(myPlugins)
Vue.use(xdy)
Vue.use(Vue2Editor);
// form-create
// Vue.use(formCreate) // 全局挂载，vue组件中可以使用 this.$formCreate 获取

// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ ⭐⭐⭐ ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 全局自动化注册组件 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ ⭐⭐⭐ ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //

/***********全局导入组件***********/
const requireComponent = require.context(
	'@/components/BaseComponents', // 其组件目录的相对路径
	false, // 是否查询其子目录
	/Base[A-Z]\w+\.(vue|js)$/ // 匹配基础组件文件名的正则表达式，这里可以匹配的文件名为BaseXxxx.vue格式
)
requireComponent.keys().forEach((fileName) => {
	// 获取组件配置
	const componentConfig = requireComponent(fileName)

	// 获取组件的 PascalCase 命名
	const componentName = upperFirst(
		camelCase(
			// 剥去文件名开头的 `'./` 和结尾的扩展名
			fileName
				.split('/')
				.pop()
				.replace(/\.\w+$/, '')
		)
	)

	Vue.config.productionTip = false

	// 全局注册组件
	Vue.component(
		componentName,
		// 如果这个组件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		componentConfig.default || componentConfig
	)
})

new Vue({
	router,
    store,
	render: (h) => h(App),
}).$mount('#app')
