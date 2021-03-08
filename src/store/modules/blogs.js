import api from '@/request/api/blog'

const blogList = {
	state: {
		blogList: [], 
		blogClass: [], 
	},

	mutations: {
		SET_BLOG_LIST: (state, blogList) => {
			state.blogList = blogList
		},
		SET_BLOG_CLASS: (state, blogClass) => {
			state.blogClass = blogClass
		},
	},

	actions: {
		getBlog({ commit, state },params) {
            return new Promise((resolve,reject)=>{
                api.getBlog(params).then(res=>{
                    commit('SET_BLOG_LIST',res.list)
                    resolve(res.list)
                })
            })
		},
		getClass({ commit, state },params) {
            return new Promise((resolve,reject)=>{
                api.getClass(params).then(res=>{
                    commit('SET_BLOG_CLASS',res.list)
                    resolve(res.list)
                })
            })
		},
	},
}

export default blogList
