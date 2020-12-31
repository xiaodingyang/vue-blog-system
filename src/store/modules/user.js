// import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import api from '@/request/api/user'
import navMap from '@/router/navMap'

const user = {
	state: {
		userInfo: null,
		sourceRoutes: [], // 接口获取的原始路由
		addRoutes: [], // 动态添加的路由
		sidebarRouters: [], // 菜单栏的路由
	},

	mutations: {
		SET_USER_INFO: (state, info) => {
			state.userInfo = info
		},
		SET_MENU_LIST: (state, menu) => {
			state.sourceRoutes = menu.sourceRoutes
			state.addRoutes = menu.addRoutes
			state.sidebarRouters = menu.sidebarRouters
		},
	},

	actions: {
		// 获取用户信息
		getUserInfo({ commit, state }) {
			// 使用promise为了在使用dispatch的时候可以写回调
			return new Promise((resolve, reject) => {
				api.info().then((res) => {
					if (res) {
						commit('SET_USER_INFO', res)
						resolve(res) // promise返回结果
					}
				})
			})
		},
		// 获取路由信息
		getMenuList({ commit, state }, auth) {
			// 使用promise为了在使用dispatch的时候可以写回调
			return new Promise((resolve, reject) => {
				api.getMenu({ auth }).then((res) => {
					if (res) {
                        const addRoutes = setAddRoutes(JSON.parse(JSON.stringify(res.list))) // 动态添加路由
                        const sidebarRouters = setSidebarRouters(JSON.parse(JSON.stringify(res.list))) // 菜单栏路由
                        const menu = {sourceRoutes:res.list,addRoutes,sidebarRouters}
						commit('SET_MENU_LIST', menu)
						resolve(menu) // promise返回结果
					}
				})
			})
		},
	},
}

// 匹配路由组件
function setComponent(data) {
	return data.map((item) => {
		if (item.children) setComponent(item.children)
		item.component = loadView(item.component)
		return item
	})
}
// 路由懒加载
function loadView(path) {
	return (resolve) => require([`@/${path}`], resolve)
}
//   设置动态添加路由
function setAddRoutes(data) {
    const routes = setComponent(data)
    const route = [
        {
            path: '/',
            component: () => import('@/views/Dashboard/index.vue'),
            children: routes
        }
    ]
	return route
}
// 设置菜单栏路由
function setSidebarRouters(data){
    return setComponent(data)
}
export default user
