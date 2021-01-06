<template>
	<div class="nav-bar">
		<div class="left">
			<div class="nav-icon">
				<i
					class="el-icon-s-fold"
					style="font-size: 20px;color:#fff;cursor: pointer;"
					@click="menuIsOpen"
					v-if="!isOpen()"
				></i>
				<i
					v-else
					class="el-icon-s-unfold"
					style="font-size: 20px;color:#fff;cursor: pointer;"
					@click="menuIsOpen"
				></i>
			</div>
			<Breadcrumb class="bread"></Breadcrumb>
		</div>
		<div class="right">
			<el-dropdown v-if="userInfo">
				<span class="el-dropdown-link">
					<img :src="headeImg" alt="" width="30" />
					<span
						>{{ userInfo.realname
						}}<i class="el-icon-arrow-down el-icon--right"></i
					></span>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>个人中心</el-dropdown-item>
					<el-dropdown-item 
						><span @click="setLayout">布局设置</span></el-dropdown-item
					>
					<el-dropdown-item
						><span @click="loginout"
							>退出登录</span
						></el-dropdown-item
					>
				</el-dropdown-menu>
			</el-dropdown>
			<div v-else class="login">
				请 <router-link to="/login">登录</router-link>
			</div>
		</div>
		<el-dialog
			title=""
			:visible.sync="dialogVisible"
			width="30%"
            :show-close="false"
		>
			<RightBar></RightBar>
		</el-dialog>
	</div>
</template>

<script>
import Breadcrumb from '@/views/Dashboard/Breadcrumb'
import RightBar from '@/components/rightBar'
import { removeToken } from '@/utils/auth'
export default {
	props: {
		menuIsOpen: {
			type: Function,
			default: () => {},
		},
		isOpen: {
			type: Function,
			default: () => {},
		},
	},
	data() {
		return {
            userInfo: {},
            dialogVisible:false
		}
	},
	methods: {
		loginout() {
			removeToken()
			this.$router.push('/login')
		},
		setLayout() {
            this.dialogVisible=true
        },
	},
	components: { Breadcrumb,RightBar },
	created() {
		this.userInfo = this.$store.getters.userInfo
	},
	computed: {
		headeImg() {
			if (this.userInfo) {
				return JSON.parse(this.userInfo.headImg).url
			}
		},
	},
}
</script>

<style scoped lang="scss">
.nav-bar {
	display: flex;
	padding: 10px 0;
	background: $menuBgColor;
	justify-content: space-between;
	.left {
		display: flex;
		i {
			line-height: 31px;
		}
		.bread {
			margin-top: 8px;
		}
	}
	.right {
		display: flex;
		padding-right: 15px;
		img {
			border-radius: 30px;
			cursor: pointer;
			transition: 1s;
			&:hover {
				transform: rotate(45deg);
			}
		}
		.el-dropdown-link {
			display: flex;
			cursor: pointer;
			span {
				line-height: 30px;
				color: #fff;
				margin-left: 10px;
			}
		}
		.login {
			font-size: 14px;
			line-height: 30px;
			color: #fff;
			a {
				color: $light-blue;
			}
		}
	}
}
/deep/.el-dialog{
    position: absolute;
    right:0!important;
    margin:0!important;
}
</style>
