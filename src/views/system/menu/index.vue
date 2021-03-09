<template>
	<div class="role-page">
		<x-table
			ref="table"
			stripe
			:columns="columns"
			:search="search"
            :isPagination="false"
			:operation="operation"
			:dataFunc="dataFunc"
			row-key="id"
			:header-cell-style="{
				background: '#e5e5e5',
				color: '#666',
			}"
			:tree-props="{ hasChildren: 'hasChildren', children: 'children' }"
		>
       
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
			dataFunc: this.$api.system.getMenuList,
			submitFunc: this.$api.system.saveMenu,
            searchForm:{},
			/* 表格渲染项 */
			columns: [
				{
					key: 'label',
					label: '菜单名称',
					formatter: (row) => {
						return (
							<span>
								<span class={row.icon}></span>{' '}
								<span>{row.label}</span>
							</span>
						)
					},
				},
				{ key: 'sort', label: '排序' },
				{ key: 'name', label: '路由名称' },
				{ key: 'path', label: '路由地址' },
				{ key: 'component', label: '组件路径' },
				{
					key: 'type',
					label: '类型',
					formatter: (row) => {
						let str = '',
							type = 'main'
						if (row.type === 1) str = '菜单目录'
						if (row.type === 0) {
							str = '按钮路由'
							type = 'success'
						}
						return (
							<el-tag size="mini" effect="dark" type={type}>
								{str}
							</el-tag>
						)
					},
				},
				{
					key: 'auth',
					label: '权限',
					formatter: (row) => {
						let str = ''
						if (row.auth === 0) str = '公共'
						if (row.auth === 1) str = '普通用户'
						if (row.auth === 2) str = '管理员'
						return (
							<el-tag size="mini" effect="dark" type="main">
								{str}
							</el-tag>
						)
					},
				},
			],
			/* 操作项 */
			operation: {
				width: '200',
				button: [
					{ label: '编辑', func: this.handelEdit },
					{
						label: '删除',
						type: 'danger',
						func: this.$api.system.deleteMenu,
					},
				],
			},
			/* 搜索项 */
			search: {
				form: [
					{
						type: 'input',
						field: 'label',
						props: {
							placeholder: '菜单名称',
						},
					},
					{
						type: 'input',
						field: 'name',
						props: {
							placeholder: '路由名称',
						},
					},
					{
						type: 'select',
						field: 'auth',
						props: {
							placeholder: '权限',
						},
						options: [
							{ label: '公共', value: 0 },
							{ label: '普通用户', value: 1 },
							{ label: '管理员', value: 2 },
						],
					},
				],
				button: [{ label: '新增菜单', func: this.handleAdd }],
			},
			
		}
	},
	computed: {},
	methods: {
		// 刷新列表函数
		refreshTable(params) {
			this.$refs.table.getData(params)
		},

		// 编辑
		handelEdit(row) {
			this.$refs.edit.handleOpen(row)
		},

		handleAdd() {
			this.$refs.edit.handleOpen()
		},
		
	},
}
</script>
<style scoped lang="less"></style>
