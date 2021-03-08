<template>
	<div class="right-bar">
		<div class="search">
			<el-input
				placeholder="想了解什么？"
				v-model="searchForm"
				class="input-search"
				size="mini"
			>
			</el-input>
			<span class="el-icon-search"></span>
		</div>
		<div class="card">
			<Card title="前端交流群">
				<div class="web">
					<p style="font-size: 14px;">web前端技术交流群 共同学习，共同进步，共同成长！</p>
					<p style="margin-top: 30px;"><el-button type="primary">QQ 交流群</el-button></p>
				</div>
			</Card>
			<Card title="最新文章">
				<div
					class="blog-item"
					v-for="(item, idx) in blogList"
					:key="idx"
				>
					<div class="img">
						<img
							v-if="item.src && item.src[0] && item.src[0].url"
							:src="item.src[0].url"
							height="50"
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
								height="50"
							/>
						</div>
					</div>
					<div class="content">
						<h3>{{ item.title }}</h3>
						<div class="bottom">
							<p class="read">
								<a href="/blog/detail">阅读全文</a>
							</p>
							<p class="time">
								{{
									item.updateTime &&
										item.updateTime.split(' ')[0]
								}}
							</p>
						</div>
					</div>
				</div>
			</Card>
			<Card title="天气预报">
				<iframe
					title="天气预报"
					scrolling="no"
					src="https://tianqiapi.com/api.php?style=ts&skin=pitaya&column=2&city=上海"
					frameBorder="0"
					width="100%"
					height="230"
					:allowtransparency="true"
				></iframe>
			</Card>
			<Card title="文章分类">
				<div
					class="article"
					v-loading="classLoading"
					element-loading-text="拼命加载中"
					element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(0, 0, 0, 0.8)"
				>
					<el-row>
						<el-col
							:span="6"
							v-for="(item, idx) in blogClass"
							:key="idx"
							:style="
								`background:rgba(${Math.floor(
									Math.random() * 250
								)}, ${Math.floor(
									Math.random() * 256
								)}, ${Math.floor(Math.random() * 250)}, 0.8)`
							"
						>
							<p class="tag-item" style="">
								{{ item.name }}
							</p>
						</el-col>
					</el-row>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
import Card from '../right-card'
export default {
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	props: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	components: { Card },
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	data() {
		return {
			searchForm: '',
			classLoading: true,
		}
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	methods: {
		
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
		blogList() {
			return this.$store.getters.blogList.filter((item, idx) => idx < 3)
		},
        blogClass(){
            const blogClass = this.$store.getters.blogClass
            if(blogClass){
                this.classLoading=false
                return [{ code: 0, name: '全部' },...blogClass]
            }   
        }
	},
}
</script>

<style scoped lang="scss">
.right-bar {
	height: 100vh;
	/deep/.el-input--mini .el-input__inner {
		height: 30px;
		line-height: 30px;
		background: transparent;
		color: #fff;
	}
	.search {
		position: relative;
		.el-icon-search {
			position: absolute;
			right: 10px;
			top: 5px;
			font-size: 20px;
			color: #fff;
			cursor: pointer;
			&:hover {
				color: #409eff;
			}
		}
	}
	.blog-item {
		display: flex;
		margin-bottom: 20px;
		.img {
			position: relative;
			width: 120px;
			height: 50px;
			overflow: hidden;
			text-align: center;
			margin-right: 20px;
			/deep/.el-image {
				width: 120px;
				background: #eee;
				.image-slot {
					display: flex;
					width: 100%;
					align-items: center;
					height: 50px;
					i {
						font-size: 20px;
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
		.content {
			width: 56%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			h3 {
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 16px;
				font-weight: normal;
				margin-bottom: 10px;
			}
			.bottom {
				display: flex;
				-webkit-box-pack: justify;
				justify-content: space-between;
				.read {
					margin-right: 10px;
					font-size: 12px;
					color: #04ac71;
				}
				.time {
					font-size: 12px;
				}
			}
		}
	}
	.card {
		.tag-item {
			color: #fff;
			text-align: center;
			font-size: 12px;
		}
		.el-col {
			margin: 10px;
			padding: 8px 2px;
			cursor: pointer;
		}
		.article {
			min-height: 100px;
		}
        .web{
            height:180px;
            background:url('../../../assets/imgs/jiaoliu.png') no-repeat center/cover;
            background-clip: border-box;
        }
	}
}
</style>
