<script>
import navMap from '@/router/navMap'
export default {
	data() {
		return {
			isCollapse: true,
		}
	},
	render(h) {
		return (
			<div>
				<div class="open" onClick={this.menuIsOpen}>
					<el-button plain icon="el-icon-s-unfold">
						MENU
					</el-button>
				</div>

				<div class="menu">
					<div
						class="bg"
						style={{
							background: `url(${this.img})no-repeat center/cover`,
						}}
					></div>
					<div class="close" onClick={this.menuIsOpen}>
						<span class="el-icon-close"></span>
					</div>
					<div class="header">
						<div class="logo">
							<div class="content">
								<div
									class="img"
									style={{
										background: `url(${this.headImg}) no-repeat center/cover`,
									}}
								></div>
								<p class="title">SILENCE</p>
							</div>
						</div>
					</div>
					<el-menu
						default-active={this.$route.path}
						class="el-menu-vertical-demo"
						collapse={this.isCollapse}
						text-color="#909399"
						active-text-color="#fff"
						router={true}
					>
						{this.loopList(navMap)}
					</el-menu>
				</div>
			</div>
		)
	},
	computed: {
		imgList() {
			return this.$store.getters.imgList
		},
		img() {
			if (this.imgList.length > 0) {
				const url = this.imgList.filter(
					(item) => item.imgKey === 'navImg'
				)[0]
				if (url) return url.imgList[0].url
			}
		},
		headImg() {
			if (this.imgList.length > 0) {
				const url = this.imgList.filter(
					(item) => item.imgKey === 'headImg'
				)[0]
				if (url) return url.imgList[0].url
			}
		},
	},
	created() {
    },
	watch: {},
	methods: {
		menuIsOpen() {
			const isCollapse = this.isCollapse
			this.isCollapse = !isCollapse
		},

		loopList(nav) {
			return nav.map((item) => {
				//   0为普通路由，1 为菜单栏路由
				if (item.meta) {
					return (
						<el-menu-item index={item.path}>
							<i class={item.meta.icon}></i>
							<span slot="title">{item.meta.title}</span>
						</el-menu-item>
					)
				} else if (item.children) {
					return this.loopList(item.children)
				}
			})
		},
	},
}
</script>

<style scoped lang="scss">
.menu {
	height: 100vh;
	display: flex;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
	display: inline-block;
	overflow: hidden;
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		width: 101%;
		height: 100%;
		-webkit-filter: blur(3px);
		filter: (5px);
	}
	.header {
		position: absolute;
		left: 0;
		top: 0;
        width: 100%;
		.img {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			margin: auto;
			margin-top: 20px;
            cursor:pointer;
            transition: 1s;
            &:hover{
                transform: rotate(45deg);
            }
		}
		.title {
			font-size: 25px;
			color: #00a7eb;
			background-image: -webkit-linear-gradient(#79f1a4, #0e5cad);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			text-align: center;
			margin: 20px 0;

		}
	}
	.close {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
		color: #fff;
		background: -webkit-linear-gradient(#79f1a4, #0e5cad);
		padding: 2px 5px;
		cursor: pointer;
	}
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 250px;
}
.el-menu--collapse {
	width: 0;
	overflow: hidden;
}
.open {
	position: absolute;
	left: 100px;
	top: 20px;
	z-index: 1;
}
/deep/.el-button {
	background: transparent;
	color: #fff;
}
/deep/.el-button.is-plain:focus,
.el-button.is-plain:hover {
	background: transparent;
}
/deep/.el-menu-item,
/deep/.el-submenu__title {
	height: 40px !important;
	line-height: 40px !important;
}

/deep/.el-menu {
    margin-top:200px;
    padding: 40px 0;
	border-right: none;
	background-color: rgba(0, 0, 0, 0.6);
    /deep/.el-menu-item:focus, .el-menu-item:hover,.is-active{
        background: -webkit-linear-gradient(#79F1A4, #0E5CAD);
        color:#fff!important;
        i{
            color:#fff;
        }
    }
}
</style>
