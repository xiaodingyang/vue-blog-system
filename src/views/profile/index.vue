<template>
	<div class="profile df">
		<div class="card">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>个人信息</span>
				</div>
				<div class="content">
					<div class="head-s">
						<img
							v-if="userInfo.headImg"
							:src="userInfo.headImg[0].url"
							alt=""
							width="150"
						/>
					</div>
					<div class="content-list">
						<div>
							<el-divider></el-divider>
							<div class="clearfix">
								<span class="fl">用户名称</span
								><span class="fr">{{ userInfo.username }}</span>
							</div>
							<el-divider></el-divider>
							<div class="clearfix">
								<span class="fl">用户昵称</span
								><span class="fr">{{ userInfo.realname }}</span>
							</div>
							<el-divider></el-divider>
							<div class="clearfix">
								<span class="fl">用户权限</span
								><span class="fr">{{ auth }}</span>
							</div>
							<el-divider></el-divider>
							<div class="clearfix">
								<span class="fl">用户电话</span
								><span class="fr">{{ userInfo.phone }}</span>
							</div>
							<el-divider></el-divider>
							<div class="clearfix">
								<span class="fl">用户邮箱</span
								><span class="fr">{{ userInfo.email }}</span>
							</div>
							<el-divider></el-divider>
							<div class="clearfix">
								<span class="fl">创建时间</span
								><span class="fr">{{
									userInfo.createdTime
								}}</span>
							</div>
							<el-divider></el-divider>
						</div>
					</div>
				</div>
			</el-card>
		</div>
		<div class="message ml-15">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>编辑资料</span>
				</div>
				<div class="content">
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane label="基本资料" name="first">
							<Base :data="userInfo"/>
						</el-tab-pane>
						<el-tab-pane label="修改密码" name="second">
							<Pwd :data="userInfo"/>
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>

import Base from './base'
import Pwd from './pwd'

export default {
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	props: [],
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	components: { Base,Pwd },
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	data() {
		return {
			activeName: 'first',
			password: '',
			file: '',
			form1: {},
			form2: {},
			
			formColumn2: [
				{
					type: 'input',
					field: 'password1',
					title: '新密码',
					props: {
						type: 'password',
						placeholder: '请输入密码',
						clearable: true,
					},
					validate: [
						{
							required: true,
							message: '请输入密码',
							trigger: 'blur',
						},
					],
				},
				{
					type: 'input',
					field: 'password2',
					title: '确认密码',
					props: {
						type: 'password',
						placeholder: '请再次输入密码',
						clearable: true,
					},
					validate: [
						{
							validator: this.validatePass,
							trigger: 'blur',
							required: true,
						},
					],
				},
			],
		}
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	methods: {
		validatePass(rule, value, callback) {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value !== this.form2.form.password1) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		},
		
		handleClick() {},
		
		
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐mounted方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	mounted() {
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐created方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	created() {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐watch监听属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	watch: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐computed计算属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	computed: {
		auth() {
			if (this.userInfo.auth === 1) return '普通用户'
			if (this.userInfo.auth === 2) return '管理员'
		},
		userInfo() {
			return this.$store.getters.userInfo
		},
	},
}
</script>

<style scoped lang="scss">
.profile {
	.card {
		width: 450px;
	}
	.head-s {
		width: 150px;
		height: 150px;
		margin: 20px auto;
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;
		transition: 1s;
		text-align: center;
		&:hover {
			transform: rotate(45deg);
		}
	}
	.content-list {
		font-size: 13px;
	}
	.message {
		width: 100%;
	}
}
</style>
