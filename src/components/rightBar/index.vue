<template>
	<div class="right-bar">
		<div class="theme">
			<h3>主题风格设置</h3>
			<div class="box">
				<el-radio-group v-model="radio" @change="handleChange">
					<el-radio
						:label="item.value"
						v-for="item in themeList"
						:key="item.color"
						><p :style="`background:${item.color}`"></p
					></el-radio>
				</el-radio-group>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	props: [],
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	components: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	data() {
		return {
			radio: 0,
			themeList: [
				{ bgcolor: 'rgb(13, 20, 31)', bgactivecolor: '#30b08f',textcolor:'rgb(153, 153, 153)',textactivecolor:'#fff', value: 0 },
				{ color: '#1890ff', active: 'rgb(45,61,81)', value: 1 },
			],
		}
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	methods: {
        handleChange(val){
            this.$store.commit('SET_LAYOUT_THEME',this.themeList[val])
        }
    },
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐mounted方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	mounted() {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐created方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	created() {
    },
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐watch监听属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	watch: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐computed计算属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	computed: {},
}
</script>

<style scoped lang="scss">
h3 {
	font-size: 16px;
	color: #000;
	margin-bottom: 20px;
}
.box {
	display: flex;
	p {
		width: 50px;
		height: 50px;
		border-radius: 5px;
		box-shadow: 0 0 2px 0 #000;
		cursor: pointer;
	}
}
</style>
