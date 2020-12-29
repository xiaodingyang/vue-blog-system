<template>
	<div class="role-page">
		<BaseTablePage
			ref="table"
			:tableColumn="tableColumn"
			:tableSearch="tableSearch"
			:operation="operation"
			:dataFunc="dataFunc"
		></BaseTablePage>
		<BaseEditPage
			ref="edit"
			:editData="editData"
			:formColumn="formColumn"
			:title="editTitle"
			:refreshTable="refreshTable"
			:submitFunc="submitFunc"
		></BaseEditPage>
		
	</div>
</template>
<script>
import BaseTablePage from '@/components/BaseTablePage/index'
export default {
	props: [],
	data() {
		return {
			dataFunc: this.$api.system.getUserList,
			editData: {},
			editTitle: '',
			submitFunc: null,
			/* 表格渲染项 */
			tableColumn: [
				{
					key: 'headImg',
					label: '头像',
					formatter(h, row) {
						if (row.headImg && row.headImg[0]) {
							return <img src={row.headImg[0].url} width="30px" />
						}
					},
				},
				{ key: 'realname', label: '昵称' },
				{ key: 'username', label: '用户名' },
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
				{ key: 'createTime', label: '创建时间' },
			],
			/* 操作项 */
			operation: {
				width: '200',
				button: [
					{ label: '编辑', func: this.handelEdit },
					{
						label: '删除',
						type: 'danger',
						func: this.$api.system.userDel,
					},
					
				],
			},
			/* 搜索项 */
			tableSearch: {
				form: [
					{ key: 'realname', label: '昵称', type: 'input' },
					{ key: 'username', label: '用户名', type: 'input' },
					{
						key: 'roleId',
						label: '权限',
						type: 'select',
						options: [
							{ label: '普通用户', value: 1 },
							{ label: '管理员', value: 2 },
						],
					},
				],
				button: [
					{
						label: '新增',
						icon: 'el-icon-plus',
						func: this.handleAdd,
					},
				],
			},
			/* 表单渲染项 */
			formColumn: [
				{ key: 'headImg', label: '头像', type: 'input' },
				{ key: 'realName', label: '昵称', type: 'input' },
				{ key: 'username', label: '用户名', type: 'input' },
				{ key: 'auth', label: '权限', type: 'input' },
			],
		}
	},
	computed: {},
	methods: {
		// 编辑
		handelEdit(row) {
			this.editData = row
			this.editTitle = '编辑审核人'
			this.submitFunc = this.$api.system.userEdit
			this.$refs.edit.handleOpen()
		},
		// 刷新列表
		refreshTable(params) {
			return this.$refs.table.getData(params)
		},
		handleAdd() {
			this.editTitle = '新增审核人'
			this.editData = {}
			this.submitFunc = this.$api.system.userAdd
			this.$refs.edit.handleOpen()
		},

		// 编辑导航
		handelEditNav(row) {
			this.$refs.log.onOpen()
		},
		handleNavSubmit() {},
	},
	created() {},
	components: { BaseTablePage },
}
</script>
<style scoped lang="less"></style>
