import { baseAxios } from '../http';
export default {
  // 获取基础简历
  getBaseList(params) {
    return baseAxios.get('/resume/base/list',{params});
  },
  // 经验简历
  exList(params) {
    return baseAxios.get('/resume/experience/list',{params});
  },
 
};
