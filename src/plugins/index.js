import api from '@/request/api';
import Cookie from 'js-cookie'
export default {
  install(Vue, options) {
    Vue.prototype.$api = api; // 将api挂载到全局
    Vue.prototype.$cookie = Cookie; // 将cookie挂载到全局
  },
};
