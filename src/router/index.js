import Vue from 'vue'
import Cookie from 'js-cookie'
import VueRouter from 'vue-router'
// import { publicNav } from './navMap'
import routeList from './navMap'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import api from '@/request/api/system'
Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	// routes,
})
// 设置路由
const setComponent = (data) => {
	data.forEach((item) => {
		if (item.children) setComponent(item.children)
		routeList.forEach((_item) => {
			if (item.path === _item.path) {
				for (const k in _item) {
					item[k] = _item[k]
				}
			}
		})
	})
	return data
}
api.getMenu().then((res) => {
	const routes = setComponent(res.list)
    Cookie.set('navList', routes)
    const addroutes = [
        {
			path: '/',
            component: () => import('@/views/Dashboard/index.vue'),
            children: [
                {
                    path: '/',
                    name: 'index',
                    component: () => import('@/views/Dashboard/Home/index.vue'),
                },
                {
                    path: '/index',
                    label: '首页',
                    name: 'index',
                    component: () => import('@/views/Dashboard/Home/index.vue'),
                },
                ...routes
            ]
		},
		{
			path: '/login',
			component: () => import('@/views/login'),
		},
		{
			path: '*',
			name: '404',
			component: () => import('@/components/404.vue'),
		},
    ]
    console.log('adddd',addroutes);
	router.addRoutes(addroutes)
})
// 白名单
const whiteList = ['/login', '/', '/index']
router.beforeEach((to, from, next) => {
	NProgress.start()
	// 登录控制，如果没有token且进入的路由不是login则跳转到login，如果有token则正常跳转
	const token = Cookie.get('token')
	if (token) {
		next()
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
// 解决ElementUI导航栏中重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}
export default router
