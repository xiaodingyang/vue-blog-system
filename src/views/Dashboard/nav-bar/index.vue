<script>
import navMap from "@/router/navMap";
export default {
	data() {
		return {
			isCollapse: false,
			navList: [],
		}
	},
	render(h) {
        const bgColor = this.$store.getters.theme.bgcolor
        const bgactivecolor = this.$store.getters.theme.bgactivecolor
        const textcolor = this.$store.getters.theme.textcolor
        const textactivecolor = this.$store.getters.theme.textactivecolor
        console.log('bg',bgColor);
		return (
			<div class="menu">
				<div class="menu-header">
					{this.isCollapse ? '' : '管理系统'}
				</div>
				<el-menu
					default-active={this.$route.path}
					class="el-menu-vertical-demo"
					collapse={this.isCollapse}
					background-color={bgColor}
					text-color={textcolor}
					active-text-color={textactivecolor}
					router={true}
				>
					{this.loopList(this.navList)}
				</el-menu>
			</div>
		)
	},
	created() {
		this.getNavData()
	},
	methods: {
		getNavData() {
			const navList = this.$store.getters.sidebarRouters
			if (navList) {
				this.navList = navList
			}
		},
		menuIsOpen() {
			const isCollapse = this.isCollapse
			this.isCollapse = !isCollapse
		},
		isOpen() {
			return this.isCollapse
		},
		loopList(nav) {
			return nav.map((item) => {
				//   1 为菜单栏路由，0为普通路由
				if (item.meta&&item.meta.type) {
					if (item.children) {
						return (
							<el-submenu index="1">
								<template slot="title">
									<i class={item.meta.icon}></i>
									<span slot="title">{item.meta.title}</span>
								</template>
								{this.loopList(item.children)}
							</el-submenu>
						)
					} else {
						return (
							<el-menu-item index={item.path}>
								<i class={item.meta.icon}></i>
								<span slot="title">{item.meta.title}</span>
							</el-menu-item>
						)
					}
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
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	.menu-header {
		padding: 15px 0;
		text-align: center;
		background: $menuBgColor;
		color: #fff;
	}
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 250px;
}
.el-menu-vertical-demo {
	//   min-height: 100vh;
}
/deep/.el-menu-item,
/deep/.el-submenu__title {
	height: 40px !important;
	line-height: 40px !important;
}
/deep/ .el-menu-item:hover,
/deep/ .el-submenu__title:hover {
	background-color: $menuBgColor !important;
	color: #fff !important;
}
/deep/.el-menu-item.is-active {
	background-color: $green !important;
	color: #fff !important;
}

/deep/.el-menu {
	border-right: none;
	height: 100%;
}
</style>
