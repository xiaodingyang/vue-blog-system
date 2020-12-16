// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 用于导航栏 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
export const navMap = [
  {
    path: '/',
    name: 'index',
    label: '首页',
    alias: '/index',
    icon: 'el-icon-menu',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/account',
    label: '用户管理',
    name: 'account',
    icon: 'el-icon-menu',
    notTo:true,
    component: () => import('@/views/account/index.vue'),
    children: [
      {
        path: '/',
        name: 'account',
        component: () => import('@/views/account/admin/index.vue'),
      },
      {
        path: '/account/admin',
        name: 'admin',
        icon: 'el-icon-menu',
        label: '管理员管理',
        component: () => import('@/views/account/admin/index.vue'),
      },
      {
        path: '/account/else',
        name: 'else',
        icon: 'el-icon-menu',
        label: '其他管理',
        component: () => import('@/views/Home/index.vue'),
      },
    ],
  },
];
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 只用于路由注册，不用于导航 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
export const routes = [
  ...navMap,
  {
    path: '*',
    name: '404',
    component: () => import('@/components/404.vue'),
  },
];

// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 获取纯路由数组 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ //
const getNav = (arr, data) => {
  data.forEach((item) => {
    if (item.label) {
      if (item.children) {
        getNav(arr, item.children);
      }
      arr.push({
        label: item.label,
        name: item.name,
      });
    }
  });
};
export const getNavArr = () => {
  let arr = [];
  getNav(arr, navMap);
  return arr;
};
