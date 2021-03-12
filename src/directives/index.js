import changeHtml from "./html";
// 自定义指令
const directives = {
  changeHtml,
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
