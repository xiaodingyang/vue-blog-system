<template>
	<div class="index">
		<Rain :bg="bgImg"></Rain>
		<div class="main">
			<h1>Hello, I'm Silence.</h1>
			<h2>欢迎来到我的个人博客，我是一名前端工程师。</h2>
			<el-button plain @click="onClick">点击进入我的博客</el-button>
		</div>
	</div>
</template>

<script>
import Rain from '@/components/rain'
import { getImg } from "@/utils";

export default {
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	props: [],
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	components: { Rain },
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	data() {
		return {}
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	methods: {
        onClick(){
            this.$router.push('/blog')
        }
    },
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐mounted方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	mounted() {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐created方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	created() {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐watch监听属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	watch: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐computed计算属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	computed: {
		bgImg() {
            const imgList = getImg('webHomeImg')
            return imgList&&imgList[0].url
		},
	},
}
</script>

<style scoped lang="scss">
.main {
	position: absolute;
	left: 50%;
    top:50%;
	transform: translate(-50%,-50%);
	width: 60%;
	padding: 35px;
	border-radius: 10px;
	box-shadow: 0 0 10px 0 #000;
	transition: 0.5s;
	box-sizing: border-box;
	&:hover {
		transform: translate(-50%,-50%) scale(1.1);
	}
	text-align: center;

	h1 {
		font-size: 50px;
		color: #fff;
		background-image: -webkit-linear-gradient(#fff, #0e5cad);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	h2 {
		font-size: 25px;
		color: #fff;
		padding: 40px;
	}
	/deep/.el-button {
		color: #fff;
		background: transparent;
	}
}
</style>
