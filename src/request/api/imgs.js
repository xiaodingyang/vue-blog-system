import { baseAxios } from '../http'
import { queryString } from '@/utils'
export default {
	// 获取图片列表
	getImgs(params) {
		return baseAxios.get('/imgs/list', { params })
	},
	
}
