// 防抖
const debounce = {
	inserted: function(el, binding) {
        let timer
		// binding.arg 为指令参数，指定为什么事件类型，默认为click
		el.addEventListener(binding.arg || 'click', (e) => {
            if (timer) clearTimeout(timer)
			if (binding.modifiers.immediate && !timer) {
				binding.value(e)
			}
			timer = setTimeout(() => {
				binding.value(e)
			}, 500)
		})
	},
}


export default debounce
