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
							:src="userInfo.headImg"
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
							<form-create
								:option="option"
								v-model="form1"
								:rule="formColumn1"
								@on-submit="handleSubmit1"
								@change="handleChange1"
							></form-create>
						</el-tab-pane>
						<el-tab-pane label="修改密码" name="second">
							<form-create
								:option="option"
								v-model="form2"
								:rule="formColumn2"
								@on-submit="handleSubmit2"
								@change="handleChange2"
							></form-create>
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
import { uploadFun } from '@/utils'
import { removeToken } from '@/utils/auth'

export default {
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	props: [],
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	components: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	data() {
		return {
			activeName: 'first',
			password: '',
			file: '',
			form1: {},
			form2: {},
			option: {
				form: {
					//行内表单模式
					inline: false,
					//表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
					labelPosition: 'right',
					//表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
					labelWidth: '90px',
					//用于控制该表单内组件的尺寸 medium / small / mini
					size: 'medium',
				},
				submitBtn: {
					// icon: '',
					type: 'main',
				},
			},
			formColumn1: [
				{
					type: 'upload',
					field: 'headImg',
					title: '头像',
					value: [],
					props: {
						limit: 1,
						uploadType: 'image',
						action: process.env.VUE_APP_BASE_API + '/blog/upload',
						beforeUpload: this.beforeUpload,
						onSuccess: this.onSuccess,
					},
				},
				{
					type: 'input',
					field: 'realname',
					title: '昵称',
					props: {
						placeholder: '请输入昵称',
						clearable: true,
					},
					validate: [
						{
							required: true,
							message: '请输入昵称',
							trigger: 'blur',
						},
					],
				},
				{
					type: 'input',
					field: 'phone',
					title: '电话',
					props: {
						placeholder: '请输入电话',
						clearable: true,
					},
				},
				{
					type: 'input',
					field: 'email',
					title: '邮箱',
					props: {
						placeholder: '请输入邮箱',
						clearable: true,
					},
				},
			],
			formColumn2: [
				{
					type: 'input',
					field: 'password1',
					title: '新密码',
					props: {
                        type:'password',
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
                        type:'password',
						placeholder: '请再次输入密码',
						clearable: true,
					},
					validate: [
						{
							validator: this.validatePass,
							trigger: 'blur',
							required: true,
						},
					]
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
		async beforeUpload(file) {
			await uploadFun(file).then((res) => {
				this.file = res
				//    this.form.setValue({headImg:[res]})
			})
		},
		onSuccess(res, file, fileList) {
			file.url = this.file.url
		},
		handleClick() {},
		handleChange1() {},
		handleChange2() {},
		handleSubmit1(data) {
			this.submit(data, this.form1)
		},
		handleSubmit2(data) {
			this.submit(data, this.form2)
		},
		submit(data, $f) {
            $f.submitBtnProps({ loading: true })
            data.id = this.userInfo.id
            if(data.password1){
                data.password = data.password1
                delete data.password1
                delete data.password2
            }
			this.$api.system
				.addUser(data)
				.then((res) => {
					if (res.status) {
						this.$message({
							type: 'warning',
							message: '操作成功，请重新登录！',
						})
						setTimeout(() => {
							removeToken()
							this.$router.push('/login')
						}, 1000)
					}
					$f.submitBtnProps({ loading: false })
				})
				.catch((err) => $f.submitBtnProps({ loading: false }))
		},
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐mounted方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	mounted() {
		this.form1.setValue(this.userInfo)
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
