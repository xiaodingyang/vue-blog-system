<template>
	<div class="role-page">
		<x-table
			ref="table"
			stripe
			:isPagination="false"
			:columns="columns"
			:operation="operation"
			:dataFunc="dataFunc"
			:button="button"
			:props="tableProps"
			:header-cell-style="{
				background: '#e5e5e5',
				color: '#666',
			}"
		>
			<template v-slot:expand="slotProps">
				<el-form label-position="left" inline class="demo-table-expand">
					<el-row>
						<div v-for="(item, idx) in columns" :key="idx">
							<el-col :span="12" v-if="item.key === 'skillList'">
								<div class="container">
									<el-form-item
										:label="item.label"
										label-width="100px"
									>
										<el-row>
											<el-col
												:span="12"
												v-for="(_item, idx) in slotProps
													.props.skillList"
												:key="idx"
											>
												<el-form-item
													:label="_item.tag"
													label-width="200px"
												>
													<span>{{
														_item.value
													}}</span>
												</el-form-item>
											</el-col>
										</el-row>
									</el-form-item>
								</div>
							</el-col>
							<el-col
								:span="12"
								v-else-if="item.key === 'aboutMe'"
							>
								<div class="container">
									<el-form-item
										label="关于我"
										label-width="100px"
									>
										<p v-html="slotProps.props.aboutMe"></p>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="8" v-else>
								<div class="container">
									<el-form-item
										:label="item.label"
										:label-width="
											(item.props &&
												item.props.labelWidth) ||
												'100px'
										"
									>
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
	props: [],
	data() {
		return {
			dataFunc: this.$api.resume.getBaseList,
			submitFunc: this.$api.resume.baseSave,
			tableProps: {
				expand: true,
			},
			/* 表格渲染项 */
			columns: [
				{ key: 'expectedJob', label: '期望工作' },
				{ key: 'expectedAddress', label: '期望地址' },
				{ key: 'expectedSalary', label: '期望薪资' },
				{ key: 'currentStatus', label: '目前状态' },
				{ key: 'schoolName', label: '毕业院校' },
				{ key: 'schoolNature', label: '学校性质' },
				{ key: 'schoolHonou', label: '获取荣誉' },
				{ key: 'jobExperience', label: '工作经验' },
				{
					key: 'aboutMe',
					label: '关于我',
					// formatter: (row) => {
					// 	// 在vue的jsx中使用domPropsInnerHTML解析html字符串
					// 	return <div domPropsInnerHTML={row.aboutMe}></div>
					// },
					props: {
						inDetail: true,
					},
				},
				{
					key: 'skillList',
					label: '熟练技能',
					props: {
						inDetail: true,
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
						func: this.$api.resume.baseDel,
					},
				],
			},
			button: [{ label: '新增简历', func: this.handleAdd }]
		}
	},
	computed: {},
	methods: {
		// 编辑
		handelEdit(row) {
			this.$refs.edit.handleOpen(row)
		},
		// 新增简历
		handleAdd() {
			this.$refs.edit.handleOpen()
		},
		// 刷新列表函数
		refreshTable(params) {
			this.$refs.table.getData(params)
		},
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
