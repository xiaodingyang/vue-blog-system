<template>
	<el-dialog
		:title="title"
		:visible.sync="dialogFormVisible"
		:close-on-click-modal="false"
		width="50%"
        @closed="handleClose"
	>
		<el-form
			:model="form"
			:rules="rules"
			ref="form"
			size="medium"
			label-width="150px"
			label-position="left"
			class="form"
		>
			<el-form-item label="头像" prop="type">
				<el-upload
					class="upload-demo"
					:action="url"
					:on-success="handleSuccess"
					:before-upload="beforeUpload"
					:file-list="form.headImg"
					:limit="1"
					list-type="picture-card"
				>
					<i slot="default" class="el-icon-plus"></i>
				<div slot="file" slot-scope="{ file }">
					<img
						class="el-upload-list__item-thumbnail"
						:src="file.url"
						alt=""
					/>
					<span class="el-upload-list__item-actions">
						<span
							class="el-upload-list__item-preview"
							@click="handlePictureCardPreview(file)"
						>
							<i class="el-icon-zoom-in"></i>
						</span>
						
						<span
							class="el-upload-list__item-delete"
							@click="handleRemove(file)"
						>
							<i class="el-icon-delete"></i>
						</span>
					</span>
				</div>
				</el-upload>
			</el-form-item>
			<el-form-item label="用户名" prop="username">
				<el-input
					v-model="form.username"
					placeholder="请输入"
				></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="realname">
				<el-input
					v-model="form.realname"
					placeholder="请输入"
				></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password1" v-if="!form.id">
				<el-input
					v-model="form.password1"
					type="password"
					placeholder="请输入"
				></el-input>
			</el-form-item>
			<el-form-item label="再次输入密码" prop="password2" v-if="!form.id">
				<el-input
					type="password"
					v-model="form.password2"
					placeholder="请输入"
				></el-input>
			</el-form-item>
			<el-form-item label="权限" prop="auth">
				<el-select v-model="form.auth" filterable placeholder="请选择">
					<el-option label="普通用户" :value="1"></el-option>
					<el-option label="管理员" :value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="电话" prop="phone">
				<el-input v-model="form.phone" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="form.email" placeholder="请输入"></el-input>
			</el-form-item>
			<el-button
            icon="el-icon-upload"
				type="main"
				style="width:100%"
				@click="submitForm"
				:loading="buttonLoading"
				>提交</el-button
			>
			<el-button icon="el-icon-s-help" @click="resetForm" style="width:100%">重置</el-button>
		</el-form>
	</el-dialog>
</template>

<script>
import { sourceCopy } from '@/utils'
import { uploadFun, downLoad, deleteFunc } from '@/utils'
import { removeToken } from '@/utils/auth'

export default {
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	props: {
		submitFunc: {
			type: Function,
			required: true,
			default: () => {},
		},
		refreshTable: {
			type: Function,
			required: true,
			default: () => {},
		},
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	components: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	data() {
		return {
			title: '编辑',
			url: process.env.VUE_APP_BASE_API + '/blog/upload',
			dialogFormVisible: false,
			buttonLoading: false,
			form: {},
			originForm: {
				auth: 1,
				headImg: [],
			},
			rules: {
				username: [
					{
						required: true,
						message: '请输入',
						trigger: 'blur',
					},
				],
				realname: [
					{
						required: true,
						message: '请输入',
						trigger: 'blur',
					},
				],
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
				auth: [
					{
						required: true,
						message: '请选择',
						trigger: 'blur',
					},
				],
			},
		}
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	methods: {
        handleClose(){
            this.form=this.originForm
        },
		validatePass(rule, value, callback) {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value !== this.form.password1) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		},
		// 使用async 保证异步执行完以后才执行上传的下一步
		async beforeUpload(file) {
			await uploadFun(file).then((res) => {
				this.form.headImg = [res]
			})
		},
		handleSuccess(res, file, fileList) {
			file.url = this.form.headImg[0].url
			this.$message.success('上传成功！')
		},
		handleOpen(row) {
			this.dialogFormVisible = true
			this.$nextTick(() => {
				this.resetForm()
				this.form = { ...this.originForm, ...sourceCopy(row) }
				this.title = row && row.id ? '编辑' : '新增'
			})
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
					this.submitFunc(this.form)
						.then((res) => {
							if (res.status) {
								this.dialogFormVisible = false
								// 修改的当前用户，需要重新登录
								if (
									this.form.id &&
									this.form.id ===
										this.$store.getters.userInfo.id
								) {
									this.$message.success(
										'修改当前用户，需要重新登录！'
									)
									setTimeout(() => {
										removeToken()
										this.$router.push('/login')
									}, 1000)
								} else {
									this.$message.success('操作成功！')
									this.refreshTable()
								}
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
			this.form = this.originForm
			this.$refs.form.clearValidate()
			// this.$refs.form.resetFields()
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url
			this.dialogVisible = true
		},
	
		handleRemove(file) {
            deleteFunc(file)
			this.form.headImg = []
		},
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐mounted方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	mounted() {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐created方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	created() {},
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
