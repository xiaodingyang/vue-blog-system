import { baseAxios } from '../http'
import { queryString } from '@/utils'
export default {
	// 获取分类
	getClass(params) {
		return baseAxios.get('/blogClass/list', { params })
	},
	// 获取博客
	getBlog(params) {
		return baseAxios.get('/blog/list', {params})
	},
	
}
