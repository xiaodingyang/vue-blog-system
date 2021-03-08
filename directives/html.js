// 防抖
const changeHtml = {
	inserted: function(el, binding) {
        el.innerHTML += binding.value
	},
}


export default changeHtml
