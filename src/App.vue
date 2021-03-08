<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>

export default {
	name: 'App',
	components: {},
	data() {
		return {}
	},
	methods: {},
	created() {
		this.$store.dispatch('getImgs')
	},
}
</script>

<style lang="scss" scope></style>
