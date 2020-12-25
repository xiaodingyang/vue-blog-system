// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 用于导航栏 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
export default [
    {
		path: '/',
		component: () => import('@/views/Dashboard/index.vue'),
    },
    {
		path: '/login',
		component: () => import('@/views/login'),
    },
	{
		path: '/index',
		component: () => import('@/views/Dashboard/Home/index.vue'),
    },
	{
		path: '/system',
		component: () => import('@/views/Dashboard/system/index.vue'),
	},
	{
		path: '/system/menu',
		component: () => import('@/views/system/menu/index.vue'),
	},
	{
		path: '/system/user',
		component: () => import('@/views/system/user/index.vue'),
	},
]

export const navMap = [
	{
		path: '/',
		name: 'index',
		label: '首页',
		alias: '/index',
		icon: 'el-icon-menu',
		component: () => import('@/views/Dashboard/Home/index.vue'),
	},
	{
		path: '/system',
		label: '系统管理',
		name: 'system',
		icon: 'el-icon-menu',
		notTo: true,
		component: () => import('@/views/Dashboard/system/index.vue'),
		children: [
			{
				path: '/',
				name: 'nav',
				meta: {
					requireAuth: true,
				},
				component: () => import('@/views/system/menu/index.vue'),
			},
			{
				path: '/system/menu',
				name: 'menu',
				icon: 'el-icon-menu',
				label: '菜单管理',
				meta: {
					requireAuth: true,
				},
				component: () => import('@/views/system/menu/index.vue'),
			},
			{
				path: '/system/user',
				name: 'user',
				icon: 'el-icon-menu',
				label: '用户管理',
				meta: {
					requireAuth: true,
				},
				component: () => import('@/views/system/user/index.vue'),
			},
		],
	},
]

// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 只用于路由注册，不用于导航 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
export const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login'),
	},
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/Dashboard/index.vue'),
		children: [...navMap],
	},
	{
		path: '*',
		name: '404',
		component: () => import('@/components/404.vue'),
	},
]

// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 获取纯路由数组 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
const getNav = (arr, data) => {
	data.forEach((item) => {
		if (item.label) {
			if (item.children) {
				getNav(arr, item.children)
			}
			arr.push({
				label: item.label,
				name: item.name,
			})
		}
	})
}
export const getNavArr = () => {
	let arr = []
	getNav(arr, navMap)
	return arr
}
