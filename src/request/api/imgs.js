import { baseAxios } from '../http'
import { queryString } from '@/utils'
export default {
	// 获取图片列表
	getImgs(params) {
		return baseAxios.get('/imgs/list', { params })
	},
	// 更新图片
	saveImgs(params) {
		return baseAxios.post('/imgs/save', params)
	},
	// 删除图片
	deleteImgs(params) {
		return baseAxios.post('/imgs/delete', params)
	},
}
