<template>
	<div id="app">
		<el-scrollbar style="height:100%;height:100%;">
			<router-view></router-view>
		</el-scrollbar>
	</div>
</template>

<script>
import Dashboard from '@/views/Dashboard'
import { sourceCopy } from '@/utils'
export default {
	name: 'App',
	components: { Dashboard },
	created() {
		//在页面加载时读取sessionStorage里的状态信息

		// if (sessionStorage.getItem('store')) {
		// 	this.$store.replaceState(
		// 		Object.assign(
		// 			{},
		// 			this.$store.state,
		// 			JSON.parse(sessionStorage.getItem('store'))
		// 		)
		// 	)
		// 	sessionStorage.removeItem('store')
		// }
		//在页面刷新时将vuex里的信息保存到sessionStorage里
		window.addEventListener('beforeunload', (e) => {
			// (e || window.event).returnValue = '页面正在进行操作,确定离开此页吗？';
			// console.log('cccc',this.$store.state);
			// console.log('ccccc',this.$store.state);
			// sessionStorage.setItem('store', JSON.stringify(this.$store.state))
		})
	},
}
</script>

<style lang="scss">
#app {
	height: 100vh;
	width: 100vw;
	.el-scrollbar__wrap {
		overflow-x: hidden; /*去除x轴滚动条*/
		white-space: nowrap; /*字体不换行，出现横向滚动条*/
	}
}
</style>
<style lang="scss"></style>
