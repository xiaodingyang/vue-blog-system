export default [
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
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login'),
    },
   
]
