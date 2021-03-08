<template>
	<div class="home">
		<el-row>
			<el-col :span="16" :offset="4">
				<div class="header">
					<h2>Hi，欢迎你</h2>
					<div class="line"></div>
					<div class="text ">
						海到尽头天作岸，山登绝顶我为峰。
					</div>
					<div class=" search"></div>
				</div>

				<div class="body">
					<el-row>
						<el-col :span="17">
							<div class="banner">
								<el-carousel
									indicator-position="outside"
									:interval="4000"
									height="400px"
								>
									<el-carousel-item
										v-for="(item, idx) in banner"
										:key="idx"
									>
										<img :src="item" alt="" width="100%" />
									</el-carousel-item>
								</el-carousel>
							</div>
							<div
								class="blog-list"
								v-loading="loading"
								element-loading-text="拼命加载中"
								element-loading-spinner="el-icon-loading"
								element-loading-background="rgba(0, 0, 0, 0.8)"
							>
								<BlogItem
									:data="item"
									v-for="(item, idx) in blogList"
									:key="idx"
								></BlogItem>
								<div style="text-align: center;">
									<el-button
										:loading="buttonLoading"
										style="width: 250px;margin: 20px 0;"
										type="primary"
										@click="loadMore"
										>加载更多</el-button
									>
								</div>
							</div>
						</el-col>
						<el-col :span="6" :offset="1">
							<RightBar></RightBar>
						</el-col>
					</el-row>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { getImg } from '@/utils'
import RightBar from '../right-bar'
import BlogItem from '../blog-item'
export default {
	components: { RightBar, BlogItem },
	data() {
		return {
			blogList: [],
			loading: true,
			buttonLoading: false,
			curPage: 0,
		}
	},
	methods: {
		getBlog(params) {
			this.buttonLoading = true
			this.$store.dispatch('getBlog', params).then((res) => {
				if (res) {
					this.loading = false
					this.buttonLoading = false
					this.blogList.push(...res)
				}
			})
		},
		loadMore() {
			this.curPage++
			this.getBlog({ curPage: this.curPage, pageSize: 5 })
		},
	},
	created() {
		this.loadMore()
        this.$store.dispatch('getClass')
	},
	computed: {
		banner() {
			const imgList = getImg('swiperImg')
			return imgList && imgList.map((item) => item.url)
		},
	},
}
</script>

<style scoped lang="scss">
.home {
	width: 100vw;
	height: 100vh;
	.header {
		text-align: center;
		h2 {
			color: #fff;
			font-size: 30px;
			padding: 20px 0;
		}
		.line {
			height: 2px;
			width: 100%;
			background: -webkit-linear-gradient(left, #70df00, #44bffa);
		}
		.text {
			color: #fff;
			padding: 20px 0;
		}
	}
	.body {
		.blog-list {
			min-height: 300px;
			// background:#fff;
		}
	}
}
</style>
