<template>
	<div class="right-bar">
		<div class="theme">
			<h3>主题风格设置</h3>
			<div class="box">
				<el-radio-group v-model="radio" @change="handleChange">
					<el-radio
						:label="item.label"
						v-for="item in theme"
						:key="item.label"
						><p :style="`background:${item.color}`"></p
					></el-radio>
				</el-radio-group>
			</div>
		</div>
	</div>
</template>

<script>
import variables from "@/assets/styles/variables.scss";

export default {
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	props: [],
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	components: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	data() {
		return {
			radio: 'theme1',
			
		}
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	methods: {
        handleChange(val){
            this.$store.dispatch('setTheme',val)
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
	computed: {
        theme(){
            const arr = []
            for (const k in variables) {
               arr.push({
                   label:k,
                   color:variables[k].split(',')[0]
               })
            }
            console.log('aaa',arr);
            return arr
        }
    },
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
