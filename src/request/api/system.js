import { baseAxios } from '../http'
import { queryString } from '@/utils'
export default {
    /*********************************用户管理管理开始******************************************/
	// 获取用户列表
	getUserList(params) {
		return baseAxios.get('/user/list', {params})
    },
    // 新增用户
	addUser(params) {
		return baseAxios.post('/user/save', params)
    },
    // 删除用户
	delUser(params) {
		return baseAxios.post('/user/delete', params)
    },
    /*********************************用户管理开始******************************************/
	/*********************************菜单管理开始******************************************/

    // 获取菜单列表
    // 分页
	getMenuList(params) {
		return baseAxios.get('/menu/list', {params})
    },
    // 不分页
	getMenu(params) {
		return baseAxios.get('/menu/tree', {params})
	},
    // 更新菜单
	saveMenu(params) {
		return baseAxios.post('/menu/save', params)
	},
    // 删除菜单
	deleteMenu(params) {
		return baseAxios.post('/menu/delete', params)
	},
	/*********************************菜单管理结束******************************************/
}
