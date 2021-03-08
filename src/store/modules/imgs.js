import api from '@/request/api/imgs'

const imgs = {
	state: {
		imgList: [], 
	},

	mutations: {
		SET_IMGS_LIST: (state, imgList) => {
			state.imgList = imgList
		},
	},

	actions: {
		getImgs({ commit, state },theme) {
            return new Promise((resolve,reject)=>{
                api.getImgs().then(res=>{
                    commit('SET_IMGS_LIST',res.list)
                    resolve(res.list)
                })
            })
            
		},
	},
}

export default imgs
