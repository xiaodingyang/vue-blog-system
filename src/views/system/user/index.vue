<template>
	<div class="role-page">
		<x-table
			ref="table"
			:columns="columns"
			:search="search"
			:operation="operation"
			:dataFunc="dataFunc"
			:props="props"
		></x-table>
		<x-edit
			ref="edit"
			:rule="rule"
			:props="editProps"
			:submitFunc="submitFunc"
			@change="handleChange"
			@beforeSubmit="beforeSubmit"
			@afterSubmit="afterSubmit"
		></x-edit>
	</div>
</template>
<script>
import { uploadFun } from '@/utils'
export default {
	props: [],
	data() {
		return {
			props: {},
			dataFunc: this.$api.system.getUserList,
			submitFunc: this.$api.system.addUser,
			editData: {},
			form: {},
			file: {},
			editProps: {
				labelWidth: '100px',
				diaTitle: '编辑用户',
			},
			/* 表格渲染项 */
			columns: [
				{
					key: 'headImg',
					label: '头像',
					formatter(h, row) {
						if (row.headImg) {
							return (
								<el-image
									style="width: 30px;"
									src={row.headImg}
									preview-src-list={[row.headImg]}
								></el-image>
							)
						}
					},
				},
				{ key: 'username', label: '用户名' },
				{ key: 'realname', label: '昵称' },
				{
					key: 'auth',
					label: '权限',
					formatter(h, row) {
						let str = '',
							color = 'success'
						if (row.auth === 1) {
							str = '普通用户'
						}
						if (row.auth === 2) {
							str = '管理员'
							color = 'danger'
						}
						return (
							<el-tag size="mini" type={color} effect="dark">
								{str}
							</el-tag>
						)
					},
				},
				{ key: 'phone', label: '电话' },
				{ key: 'email', label: '邮箱' },
				{ key: 'createdTime', label: '创建时间' },
				{ key: 'updateTime', label: '更新时间' },
			],
			/* 操作项 */
			operation: {
				width: '200',
				button: [
					{ label: '编辑', func: this.handelEdit },
					{
						label: '删除',
						type: 'danger',
						func: this.$api.system.delUser,
					},
				],
			},
			/* 搜索项 */
			search: {
				form: [
					{
						type: 'input',
						field: 'realname',
						props: {
							placeholder: '昵称',
						},
					},
					{
						type: 'input',
						field: 'username',
						props: {
							placeholder: '用户名',
						},
					},
					{
						type: 'select',
						field: 'auth',
						props: {
							placeholder: '权限',
						},
						options: [
							{ label: '普通用户', value: 1 },
							{ label: '管理员', value: 2 },
						],
					},
				],
				button: [{ label: '新增用户', func: this.handleAdd }],
			},
			/* 表单渲染项 */
			rule: [
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
						onPreview: this.onPreview,
					},
				},
				{
					type: 'input',
					field: 'username',
					title: '用户名',
					props: {
						placeholder: '请输入用户名',
						clearable: true,
					},
					validate: [
						{
							required: true,
							message: '请输入用户名',
							trigger: 'blur',
						},
					],
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
					field: 'password1',
					title: '密码',
					props: {
						placeholder: '请输入密码',
						type: 'password',
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
					title: '再次输入密码',
					props: {
						placeholder: '请再次输入密码',
						type: 'password',
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
				{
					type: 'select',
					field: 'auth',
					title: '权限',
					options: [
						{ label: '普通用户', value: 1 },
						{ label: '管理员', value: 2 },
					],
					validate: [
						{
							required: true,
							message: '请选择',
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
						type: 'tel',
						clearable: true,
					},
				},
				{
					type: 'input',
					field: 'email',
					title: '邮箱',
					props: {
						placeholder: '请输入邮箱',
						type: 'email',
						clearable: true,
					},
				},
			],
		}
	},
	computed: {},
	methods: {
		onPreview() {},
		async beforeUpload(file) {
			await uploadFun(file).then((res) => {
				this.file = res
				//    this.form.setValue({headImg:[res]})
			})
		},
		onSuccess(res, file, fileList) {
			file.url = this.file.url
		},
		handleChange($f) {
			this.form = $f
		},
		validatePass(rule, value, callback) {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value !== this.$refs.edit.form.form.password1) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		},
		// 编辑
		handelEdit(row) {
			this.$refs.edit.handleOpen(row)
			this.$nextTick(() => {
				this.$refs.edit.form.hidden(true, ['password1', 'password2'])
			})
		},
		// 新增用户
		handleAdd() {
			this.$refs.edit.handleOpen()
		},
		beforeSubmit(data) {
			if (data.password1) {
				data.password = data.password1
				delete data.password1
				delete data.password2
			}
		},
		afterSubmit(data) {
			// 提交以后，刷新表格
			this.$refs.table.getData()
		},
	},
	created() {},
	components: {},
}
</script>
