import debounce from "./debounce";
import changeHtml from "./html";
// 自定义指令
const directives = {
    debounce,changeHtml
  }
  
  export default {
    install(Vue) {
      Object.keys(directives).forEach((key) => {
        Vue.directive(key, directives[key])
      })
    },
  }