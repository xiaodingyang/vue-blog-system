<template>
	<el-form
		:model="form"
		:rules="rules"
		ref="form"
		size="medium"
		label-width="150px"
		label-position="left"
		class="form"
	>
		<el-form-item label="新密码" prop="password1">
			<el-input
				v-model="form.password1"
				type="password"
				placeholder="请输入"
			></el-input>
		</el-form-item>
		<el-form-item label="再次输入密码" prop="password2">
			<el-input
				type="password"
				v-model="form.password2"
				placeholder="请输入"
			></el-input>
		</el-form-item>
		<el-button
			type="main"
			style="width:100%"
			@click="submitForm"
			:loading="buttonLoading"
			icon="el-icon-upload"
			>提交</el-button
		>
		<el-button icon="el-icon-s-help" @click="resetForm" style="width:100%"
			>重置</el-button
		>
	</el-form>
</template>

<script>
import { sourceCopy } from '@/utils'
import { removeToken } from '@/utils/auth'

export default {
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	props: {
        data: {
			type: Object,
			required: true,
			default: () => {},
		},
    },
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	components: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	data() {
		return {
			buttonLoading: false,
			form: {},
			originForm: {},
			rules: {
				password1: [
					{
						required: true,
						message: '请输入',
						trigger: 'blur',
					},
				],
				password2: [
					{
						required: true,
						trigger: 'blur',
						validator: this.validatePass,
					},
				],
			},
		}
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	methods: {
		validatePass(rule, value, callback) {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value !== this.form.password1) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		},

		submitForm() {
			this.buttonLoading = true
			this.$refs.form.validate((valid) => {
				if (valid) {
					if (this.form.password1) {
						this.form.password = this.form.password1
						delete this.form.password1
						delete this.form.password2
					} else {
						delete this.form.password
					}
					console.log('form', this.form)

					this.$api.system
						.addUser(this.form)
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
							this.buttonLoading = false
						})
						.catch((err) => (this.buttonLoading = false))
				} else {
					this.buttonLoading = false
					return false
				}
			})
		},
		resetForm() {
			this.form = {}
			this.$refs.form.clearValidate()
		},
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐mounted方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	mounted() {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐created方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	created() {
        this.form = { ...this.originForm, ...sourceCopy(this.data) }
    },
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐watch监听属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	watch: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐computed计算属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	computed: {},
}
</script>

<style scoped lang="scss">
.el-button + .el-button {
	margin-top: 15px;
	margin-left: 0;
}
.icon {
	font-size: 25px;
	cursor: pointer;
}
</style>
