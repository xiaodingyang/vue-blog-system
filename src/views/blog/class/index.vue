<template>
	<div class="role-page">
		<x-table
			ref="table"
			stripe
			:isPagination="false"
			:columns="columns"
			:operation="operation"
			:search="search"
			:dataFunc="dataFunc"
			:props="tableProps"
			:header-cell-style="{
				background: '#e5e5e5',
				color: '#666',
			}"
		></x-table>
        <Edit :submitFunc="submitFunc" ref="edit" :refreshTable="refreshTable"></Edit>
	</div>
</template>
<script>
import Edit from "./edit";
export default {
	props: [],
	data() {
		return {
			dataFunc: this.$api.blog.getClass,
			submitFunc: this.$api.blog.saveClass,
			tableProps: {
			},
			editProps: {
				diaTitle: '编辑分类',
			},
			parentList: [],
			/* 表格渲染项 */
			columns: [
				{ key: 'code', label: '分类代码' },
				{ key: 'name', label: '分类名称' },
			],
			/* 操作项 */
			operation: {
				width: '200',
				button: [
					{ label: '编辑', func: this.handelEdit },
					{
						label: '删除',
						type: 'danger',
						func: this.$api.blog.deleteClass,
					},
				],
			},
			/* 搜索项 */
			search: {
				button: [{ label: '新增分类', func: this.handleAdd }],
			},
		}
	},
	computed: {},
	methods: {
		// 编辑
		handelEdit(row) {
			this.$refs.edit.handleOpen(row)
		},
		// 新增用户
		handleAdd() {
			this.$refs.edit.handleOpen()
		},
		// 刷新列表函数
		refreshTable(params) {
			this.$refs.table.getData(params)
		},
	},
	created() {},
	components: {Edit},
}
</script>
<style scoped lang="less"></style>
