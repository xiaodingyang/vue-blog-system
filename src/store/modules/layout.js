// import api from '@/request/api/user'

const layout = {
	state: {
		theme: { bgcolor: 'rgb(13, 20, 31)', bgactivecolor: '#30b08f',textcolor:'rgb(153, 153, 153)',textactivecolor:'#fff', value: 0 }, // 主题色
	},

	mutations: {
		SET_LAYOUT_THEME: (state, theme) => {
			state.theme = theme
		},
	},

	actions: {
		// get({ commit, state }) {
		// 	// 使用promise为了在使用dispatch的时候可以写回调
		// 	return new Promise((resolve, reject) => {
		// 		api.info().then((res) => {
		// 			if (res) {
		// 				commit('SET_USER_INFO', res)
		// 				resolve(res) // promise返回结果
		// 			}
		// 		})
		// 	})
		// },
	},
}

export default layout
