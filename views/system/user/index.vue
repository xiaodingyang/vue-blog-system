<template>
	<div class="role-page">
		<x-table
			ref="table"
			stripe
			:columns="columns"
			:button="button"
			:operation="operation"
			:dataFunc="dataFunc"
			:props="tableProps"
			:header-cell-style="{
				background: '#e5e5e5',
				color: '#666',
			}"
		>
			<template v-slot:search>
				<el-form
					:model="searchForm"
					ref="form"
					size="mini"
					:inline="true"
				>
					<el-form-item>
						<el-input
							v-model="searchForm.username"
							placeholder="用户名"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-input
							v-model="searchForm.realname"
							placeholder="昵称"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							icon="el-icon-search"
							type="main"
							@click="onSearch"
							>搜索</el-button
						>
					</el-form-item>
					<el-form-item>
						<el-button @click="reset" icon="el-icon-setting"
							>重置</el-button
						>
					</el-form-item>
				</el-form>
			</template>
		</x-table>
		<Edit
			:submitFunc="submitFunc"
			ref="edit"
			:refreshTable="refreshTable"
		></Edit>
	</div>
</template>
<script>
import Edit from './edit'
export default {
	components: { Edit },
	props: [],
	data() {
		return {
			tableProps: {},
			dataFunc: this.$api.system.getUserList,
			submitFunc: this.$api.system.addUser,
			form: {},
			searchForm: {},
			file: {},

			/* 表格渲染项 */
			columns: [
				{
					key: 'headImg',
					label: '头像',
					formatter: (row) => {
						if (row.headImg && row.headImg[0]) {
							return (
								<el-image
									style="width: 30px;"
									src={row.headImg[0].url}
									preview-src-list={[row.headImg[0].url]}
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
					formatter: (row) => {
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
			/* 功能按钮 */
			button: [{ label: '新增用户', func: this.handleAdd }],
		}
	},
	computed: {},
	methods: {
		onSearch() {
			this.refreshTable(this.searchForm)
		},
		reset() {
			this.searchForm = {}
		},
		// 刷新列表函数
		refreshTable(params) {
			this.$refs.table.getData(params)
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
		},
		// 新增用户
		handleAdd() {
			this.$refs.edit.handleOpen()
		},
	},
	created() {},
}
</script>
