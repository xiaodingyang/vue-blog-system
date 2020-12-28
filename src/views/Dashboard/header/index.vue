<template>
	<div class="nav-bar">
		<div class="nav-icon">
			<i
				class="el-icon-s-fold"
				style="font-size: 20px;color:#fff;cursor: pointer;"
				@click="menuIsOpen"
				v-if="!isOpen()"
			></i>
			<i
				v-else
				class="el-icon-s-unfold"
				style="font-size: 20px;color:#fff;cursor: pointer;"
				@click="menuIsOpen"
			></i>
		</div>
		<Breadcrumb></Breadcrumb>
	</div>
</template>

<script>
import Breadcrumb from '@/views/Dashboard/Breadcrumb'

export default {
	props: {
		menuIsOpen: {
			type: Function,
			default: () => {},
		},
		isOpen: {
			type: Function,
			default: () => {},
		},
	},
	data() {
		return {}
	},
	methods: {},
	components: { Breadcrumb },
}
</script>

<style scoped lang="scss">
.nav-bar {
	display: flex;
	padding: 15px 0;
	background: $menuColor;
}
</style>
