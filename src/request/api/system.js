import { baseAxios } from '../http';
import { queryString } from '@/utils';
export default {
  // 获取审核人列表
  getUserList(params) {
    return baseAxios.post(
      'customer/selectCustomerListPage',
      queryString(params)
    );
  },
  // 删除审核人
  userDel(id) {
    return baseAxios.post('/customer/delete/' + id);
  },
  //   更新审核人
  userEdit(params) {
    return baseAxios.post('/customer/updateCustomer', params);
  },
  //   新增审核人
  userAdd(params) {
    return baseAxios.post('/customer/addCustomer', params);
  },
};
