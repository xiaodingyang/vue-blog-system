<template>
	<div class="home">
		首页
	</div>
</template>

<script>
export default {
	data() {
		return {
			data: [],
		}
	},
	methods: {

		handleClick(e) {
			console.log('e', e) // content标签
		},
	},
	created() {
    },
}
</script>

<style scoped lang="scss">
.home {
	@include font($s: 25px, $c: red);
	@include vh($h: 50vh);
}
</style>
