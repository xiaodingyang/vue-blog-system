import debounce from "./debounce";
// 自定义指令
const directives = {
    debounce
  }
  
  export default {
    install(Vue) {
      Object.keys(directives).forEach((key) => {
        Vue.directive(key, directives[key])
      })
    },
  }