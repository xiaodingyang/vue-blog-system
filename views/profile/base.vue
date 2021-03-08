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
		<el-form-item label="昵称" prop="realname">
			<el-input v-model="form.realname" placeholder="请输入"></el-input>
		</el-form-item>

		<el-form-item label="电话" prop="phone">
			<el-input v-model="form.phone" placeholder="请输入"></el-input>
		</el-form-item>
		<el-form-item label="邮箱" prop="email">
			<el-input v-model="form.email" placeholder="请输入"></el-input>
		</el-form-item>
		<el-button
			type="main"
			style="width:100%"
			@click="submitForm"
			:loading="buttonLoading"
            icon="el-icon-upload"
			>提交</el-button
		>
		<el-button icon="el-icon-s-help" @click="resetForm" style="width:100%">重置</el-button>
        <el-dialog :visible.sync="dialogVisible" title="预览">
					<img width="100%" :src="dialogImageUrl" alt="" />
				</el-dialog>
	</el-form>
</template>

<script>
import { sourceCopy } from '@/utils'
import { uploadFun, downLoad, deleteFunc } from '@/utils'
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
			url: process.env.VUE_APP_BASE_API + '/blog/upload',
			dialogVisible: false,
			buttonLoading: false,
			dialogImageUrl: '',
			form: {},
			originForm: {
				headImg: [],
			},
			rules: {
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

		submitForm() {
			this.buttonLoading = true
			this.$refs.form.validate((valid) => {
				if (valid) {
                    console.log('form', this.form)
                    if(this.form.password)delete this.form.password
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
			this.form = this.originForm
			this.$refs.form.clearValidate()
			// this.$refs.form.resetFields()
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url
			this.dialogVisible = true
		},
	
		handleRemove(file, fileList) {
            deleteFunc(file)
			this.form.headImg = fileList
		},
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐mounted方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	mounted() {
		
	},
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
