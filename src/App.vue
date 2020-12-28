<template>
	<div id="app">
		<el-scrollbar style="height:100%;height:100%;">
			<router-view></router-view>
		</el-scrollbar>
	</div>
</template>

<script>
import Dashboard from '@/views/Dashboard'

export default {
	name: 'App',
	components: { Dashboard },
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
<style lang="scss">

</style>
