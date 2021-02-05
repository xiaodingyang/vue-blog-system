import { baseAxios } from '../http';
export default {
  // 获取基础简历
  getBaseList(params) {
    return baseAxios.get('/resume/base/list',{params});
  },
  // 更新基础简历
  baseSave(params) {
    return baseAxios.post('/resume/base/save',params);
  },
  // 删除基础简历
  baseDel(params) {
    return baseAxios.post('/resume/base/delete',params);
  },
  // 经验简历
  exList(params) {
    return baseAxios.get('/resume/experience/list',{params});
  },
  // 保存经验
  exSave(params) {
    return baseAxios.post('/resume/experience/save',params);
  },
  // 删除经验
  exDel(params) {
    return baseAxios.post('/resume/experience/delete',params);
  },
};
