<template>
	<div class="card-item">
		<div class="title">{{ title }}</div>
		<div class="content"><slot></slot></div>
	</div>
</template>

<script>
export default {
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	props: {
		title: {
			type: String,
			default: '',
		},
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	components: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	data() {
		return {}
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	methods: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐mounted方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	mounted() {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐created方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	created() {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐watch监听属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	watch: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐computed计算属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	computed: {},
}
</script>

<style scoped lang="scss">
.card-item {
	padding: 15px;
	background: #fff;
	border-radius: 5px;
	margin-top: 30px;
	.title {
		border-left: 3px solid #04ac71;
		padding-left: 10px;
		margin-bottom: 20px;
		font-size: 18px;
		color: #000;
	}
}
</style>
