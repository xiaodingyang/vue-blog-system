import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import myPlugins from "./plugins";
import "./permission"; // 权限拦截
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import vhCheck from "vh-check";
import Directives from "@/directives";
// import formCreate from '@form-create/element-ui'
import upperFirst from "lodash/upperFirst"; //应用模块
import camelCase from "lodash/camelCase"; //转为驼峰命名
import xdy from "xdy-example-vue";
import "xdy-example-vue/lib/xdy.css";
import Vue2Editor from "vue2-editor";

// 自定义指令
Vue.use(Directives);
// 进度条
vhCheck("browser-address-bar");

Vue.use(ElementUI);

Vue.use(myPlugins);
Vue.use(xdy);
Vue.use(Vue2Editor);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
