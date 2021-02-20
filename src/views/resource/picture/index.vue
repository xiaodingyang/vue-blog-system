<template>
	<div class="role-page">
		<x-table
			ref="table"
			stripe
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
        <Edit :submitFunc="submitFunc" ref="edit" :refreshTable="refreshTable" :typeOptions="typeOptions"></Edit>
	</div>
</template>
<script>
import Edit from "./edit";
export default {
	props: [],
	data() {
		return {
			dataFunc: this.$api.blog.getBlog,
			submitFunc: this.$api.blog.saveBlog,
			tableProps: {
			},
			editProps: {
				diaTitle: '编辑用户',
			},
			parentList: [],
			typeOptions: [],
			/* 表格渲染项 */
			columns: [
				{ key: 'src', label: '图片',width:'100px',formatter:(row)=>{
                    
                    if(row.src&&row.src[0]&&row.src[0].url){
                        const url = row.src[0].url
                        return <el-image
									style="width: 40px;"
									src={url}
									preview-src-list={[url]}
								></el-image>
                        }
                } },
				{ key: 'title', label: '标题' },
				{ key: 'type', label: '类型',formatter:(row)=>{
                    let str=''
                    this.typeOptions.forEach(item=>{
                        if(item.code===row.type) str = item.name
                    })
                    return str
                } },
				{ key: 'description', label: '描述' },
				{ key: 'createdTime', label: '创建时间' },
				{ key: 'updateTime', label: '更新时间' },
				{ key: 'author', label: '创建者' },
			],
			/* 操作项 */
			operation: {
				width: '200',
				button: [
					{ label: '编辑', func: this.handelEdit },
					{
						label: '删除',
						type: 'danger',
						func: this.$api.blog.deleteBlog,
					},
				],
			},
			/* 搜索项 */
			search: {
				button: [{ label: '新增博客', func: this.handleAdd }],
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
	created() {
        this.$api.blog.getClass().then(res=>{
            if(res&&res.list) this.typeOptions = res.list
        })
    },
	components: {Edit},
}
</script>
<style scoped lang="less"></style>
