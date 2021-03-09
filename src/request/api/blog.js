import { baseAxios } from '../http'
import { queryString } from '@/utils'
export default {
	// 获取分类
	getClass(params) {
		return baseAxios.get('/blogClass/list', { params })
	},
	// 删除分类
	deleteClass(params) {
		return baseAxios.post('/blogClass/delete', params)
	},
	// 更新分类
	saveClass(params) {
		return baseAxios.post('/blogClass/save', params)
	},
	// 获取博客
	getBlog(params) {
		return baseAxios.get('/blog/list', {params})
	},
	// 更新博客
	saveBlog(params) {
		return baseAxios.post('/blog/save', params)
	},
	// 删除博客
	deleteBlog(params) {
		return baseAxios.post('/blog/delete', params)
	},
}
