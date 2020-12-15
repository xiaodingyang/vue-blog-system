import xdy from './xdy.js';
import api from '@/request/api';
export default {
  install(Vue, options) {
    Vue.prototype.$xdy = xdy; // 将常用方法挂载到vue原型上
    Vue.prototype.$api = api; // 将api挂载到全局
    // 常用颜色
    Vue.prototype.$baseColor = '#67c23a';
    Vue.prototype.$menuColor = '#0D141F';
    Vue.prototype.$fontColor = '#666';
    Vue.prototype.$menuFontColor = '#999';
  },
};
