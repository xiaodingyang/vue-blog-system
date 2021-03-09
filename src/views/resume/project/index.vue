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
		>
			<template v-slot:default="slotProps">
				<el-form
					label-position="left"
					inline
					class="demo-table-expand"
					label-width="100px"
				>
					<el-row>
						<div v-for="(item, idx) in columns" :key="idx">
							<el-col :span="8" v-if="item.key === 'timeList'">
								<el-form-item :label="item.label">
									<span
										>{{ slotProps.props.timeList[0] }} 至
										{{ slotProps.props.timeList[0] }}</span
									>
								</el-form-item>
							</el-col>
							<el-col
								:span="24"
								v-else-if="item.key === 'experience'"
							>
								<div class="container">
									<el-card class="box-card">
										<div slot="header" class="clearfix">
											<span>{{item.label}}</span>
										</div>
										<div
										v-for="(_item, idx) in slotProps
													.props.experience"
												:key="idx"
											class="text item"
										>
											<el-col :span="4">
													<el-form-item
														label="项目名称"
													>
														<p
															v-html="
																_item.projectName
															"
														></p>
													</el-form-item>
												</el-col>
                                                <el-col :span="10">
													<el-form-item
														label="项目描述"
													>
														<p
															v-html="
																_item.jobDescription
															"
														></p>
													</el-form-item>
												</el-col>
												<el-col :span="10">
													<el-form-item
														label="项目技能"
													>
														<p
															v-html="
																_item.skills
															"
														></p>
													</el-form-item>
												</el-col>
												
										</div>
									</el-card>
									
								</div>
							</el-col>
							<el-col :span="8" v-else>
								<div class="container">
									<el-form-item :label="item.label">
										<el-tooltip
											class="item"
											effect="dark"
											:content="slotProps.props[item.key]"
											placement="bottom"
										>
											<p
												v-html="
													slotProps.props[item.key]
												"
												style="max-width:330px;"
												class="over-text"
											></p>
										</el-tooltip>
									</el-form-item>
								</div>
							</el-col>
						</div>
					</el-row>
				</el-form>
			</template>
		</x-table>
		<Edit :submitFunc="submitFunc" ref="edit" :refreshTable="refreshTable"></Edit>
	</div>
</template>
<script>
import Edit from './edit'
export default {
	props: [],
	data() {
		return {
			dataFunc: this.$api.resume.exList,
			submitFunc: this.$api.resume.exSave,
			tableProps: {
				expand: true,
			},
			editProps: {
				diaTitle: '编辑用户',
			},
			parentList: [],
			/* 表格渲染项 */
			columns: [
				{ key: 'companyName', label: '公司名称' },
				{
					key: 'timeList',
					label: '时间段',
					formatter: (row) => {
						return row.timeList.join(' 至 ')
					},
				},
				{ key: 'salary', label: '薪资' },
				{
					key: 'experience',
					label: '项目经验',
					props: {
						inDetail: true,
					},
				},
			],
			/* 操作项 */
			operation: {
				width: '200',
				button: [{ label: '编辑', func: this.handelEdit },{ label: '删除',type:'danger', func: this.$api.resume.exDel }],
            },
            /* 搜索项 */
			search: {
				button: [{ label: '新增经验', func: this.handleAdd }],
			}
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
        refreshTable(params){
            this.$refs.table.getData(params)
        }
	},
	created() {},
	components: { Edit },
}
</script>
<style lang="scss" scoped>
.container {
	width: 90%;
}
/deep/.el-form-item__label {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
