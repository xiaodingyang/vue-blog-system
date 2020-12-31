export default [
  {
    path: "/system",
    label: "系统管理",
    name: "system",
    component: () => import("@/views/system/index.vue"),
  },
  {
    path: "/system/menu",
    label: "菜单管理",
    name: "menu",
    component: () => import("@/views/system/menu/index.vue"),
  },
  {
    path: "/system/user",
    label: "用户管理",
    name: "user",
    component: () => import("@/views/system/user/index.vue"),
  },
];
