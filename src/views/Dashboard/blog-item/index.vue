<template>
	<div class="blog-item">
		<div class="img">
			<img
				v-if="data.src && data.src[0]&&data.src[0].url"
				:src="data.src[0].url"
				height="140"
			/>
			<el-image v-else>
				<div slot="error" class="image-slot">
					<i class="el-icon-picture-outline"></i>
				</div>
			</el-image>
			<div class="cover">
				<img
					src="https://www.mybj123.com/wp-content/themes/ripro2/assets/images/svg/rings.svg"
					width="50"
					height="50px"
				/>
			</div>
		</div>
		<div class="body">
			<div class="header">
				<div class="author">
					<span class="el-icon-s-custom" style="color:#04ac71"></span>
					<span style="font-size: 13px;">{{ data.author }}</span>
				</div>
				<div class="type">
					<span class="el-icon-s-flag" style="color:#04ac71"></span>
					<span style="font-size: 13px;">{{ type(data.type) }}</span>
				</div>
			</div>
			<div class="title">{{ data.title }}</div>
			<div class="description">{{ data.description }}</div>
			<el-divider></el-divider>
			<div class="footer">
				<div class="time">
					<span class="el-icon-time"></span>
					<span>{{ data.updateTime }}</span>
				</div>
				<p class="read"><router-link :to="{
                    path: '/blog/detail',
                    query:{
                        id: data.id
                    }
                }">阅读全文 &gt;</router-link></p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	props: {
		data: {
			type: Object,
			default: () => {},
		},
		
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	components: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	data() {
		return {
			errorHandler: false,
		}
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	methods: {
		type(data) {
			let str = ''
            console.log('aaaaa',this.blogClass)
			this.blogClass.forEach((item) => {
				if (item.code === data) str = item.name
			})
			return str
		},
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
        blogClass(){
            return this.$store.getters.blogClass
        }
    },
}
</script>

<style scoped lang="scss">
.blog-item {
	display: flex;
	height: 140px;
	padding: 15px;
	box-shadow: 0 0 5px 0 #000;
	border-radius: 5px;
	background: #fff;
	& + .blog-item {
		margin-top: 20px;
	}
	.img {
		position: relative;
		width: 220px;
		height: 140px;
		overflow: hidden;
		text-align: center;
		/deep/.el-image {
			width: 220px;
			background: #eee;
			.image-slot {
				display: flex;
				width: 100%;
				align-items: center;
				height: 140px;
				i {
					font-size: 30px;
					margin: auto;
				}
			}
		}
		.cover {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			background: rgba(0, 0, 0, 0.45);
			height: 100%;
			color: #fff;
			text-shadow: 1px 1px 3px #000;
			font-size: 25px;
			border-radius: 4px 4px 0 0;
			opacity: 0;
			img {
				margin: auto;
			}
		}
	}
	&:hover {
		.cover {
			opacity: 1;
		}
	}
	.body {
		width: 70%;
		margin-left: 20px;
		.header {
			display: flex;
			color: #aaa;
			.type {
				margin-left: 30px;
			}
		}
		.title {
			font-weight: bold;
			margin: 15px 0;
		}
		.description {
			width: 300px;
			font-size: 13px;
			color: #aaa;
			margin-bottom: 20px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		.footer {
			display: flex;
			justify-content: space-between;
			margin-top: 13px;
			.time {
				font-size: 13px;
			}
			.read {
				a {
					color: #04ac71;
				}
			}
		}
	}
	/deep/.el-divider--horizontal {
		margin: 10px 0;
	}
}
</style>
