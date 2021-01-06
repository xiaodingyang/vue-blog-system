import router from './router/index'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import store from './store'
import { Message } from 'element-ui'


/**********************登录权限验证，动态添加路由*************************/

const whiteList = ['/login', '/', '/index'] // 白名单
router.beforeEach((to, from, next) => {
	NProgress.start()
	// 登录控制，如果没有token且进入的路由不是login则跳转到login，如果有token则正常跳转
	if (getToken()) {
		// 如果是调到登录页则不需要动态加载路由
		if (to.path === '/login') {
			next()
		} else {
			if (store.getters.addRoutes.length > 0) {
				next()
			} else {
				store.dispatch('getUserInfo').then((res) => {
					//根据获取的用户权限动态加载路由
					const auth = res.auth
					store.dispatch('getMenuList', auth).then((menu) => {
						// 这里需要注意，404需要放在addRoute，如果放在公共路由，则 next({ ...to, replace: true }) 不会循环
						router.addRoutes([
							...menu.addRoutes,
							{
								path: '*',
								name: '404',
								component: () => import('@/components/404.vue'),
							},
						])
						/*
                        其实next({ ...to })的执行很简单，它会判断： 如果参数to不能找到对应的路由的话，就再执行一次beforeEach((to, from, next)直到其中的next({ ...to})能找到对应的路由为止
                        */

						next({ ...to, replace: true }) // 确保addRoutes()时动态添加的路由已经被完全加载上去
					})
				})
			}
		}
	} else {
		if (whiteList.includes(to.path)) {
			next()
		} else {
			if (!to.path.includes('login')) {
				Message.error('登录已过期，请重新登录！')
				setTimeout(() => {
					next({
						path: '/login',
						query: {
							fromPath: to.path,
						},
					})
				}, 800)
			}
		}
	}
	// next()
})
router.afterEach(() => {
	NProgress.done()
})
