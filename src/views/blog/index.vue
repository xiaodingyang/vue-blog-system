<template>
	<div class="role-page">
		<x-table
			ref="table"
			:columns="columns"
			:search="search"
			:operation="operation"
			:dataFunc="dataFunc"
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
export default {
	props: [],
	data() {
		return {
			dataFunc: this.$api.system.getMenuList,
			submitFunc: this.$api.system.saveMenu,
			editProps: {
				diaTitle: '编辑用户',
			},
			parentList: [],
			/* 表格渲染项 */
			columns: [
				{
					key: 'label',
					label: '菜单名称',
					formatter(h, row) {
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
					formatter(h, row) {
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
					formatter(h, row) {
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
			/* 表单渲染项 */
			rule: [
				{
					type: 'radio',
					title: '菜单类型',
					field: 'type',
					options: [
						{ label: '按钮路由', value: 0 },
						{ label: '菜单目录', value: 1 },
					],
					validate: [
						{
							type: 'string',
							required: true,
							message: '请选择菜单类型',
						},
					],
				},
				{
					type: 'cascader',
					field: 'parentId',
					title: '上级菜单',
					props: {
						placeholder: '请输入上级菜单',
					},
				},

				{
					type: 'input',
					title: '菜单名称',
					field: 'label',
					props: {
						placeholder: '请输入菜单名称',
					},
                },
				{
					type: 'input',
					title: '排序',
					field: 'sort',
					validate: [
						{
							required: true,
							message: '请输入排序',
						},
					],
					props: {
						placeholder: '请输入排序',
					},
				},
				{
					type: 'input',
					title: '路由名称',
					field: 'name',
					validate: [
						{
							type: 'string',
							required: true,
							message: '请输入路由名称',
						},
					],
					props: {
						placeholder: '请输入路由名称',
					},
				},
				{
					type: 'input',
					title: '路由地址',
					field: 'path',
					validate: [
						{
							type: 'string',
							required: true,
							message: '请输入路由地址',
						},
					],
					props: {
						placeholder: '请输入路由地址',
					},
				},
				{
					type: 'input',
					title: '组件路径',
					field: 'component',
					validate: [
						{
							type: 'string',
							required: true,
							message: '请输入组件地址',
						},
					],
					props: {
						placeholder: '请输入组件地址',
					},
				},
				{
					type: 'select',
					field: 'auth',
					title: '访问权限',
					value: 0,
					options: [
						{ label: '公共', value: 0 },
						{ label: '普通用户', value: 1 },
						{ label: '管理员', value: 2 },
					],
					validate: [
						{
							type: 'number',
							required: true,
							message: '请选择访问权限',
						},
					],
					props: {
						placeholder: '请选择访问权限',
					},
				},
				{
					type: 'input',
					title: '图标',
					field: 'icon',

					props: {
						placeholder: '请输入图标',
					},
				},
			],
		}
	},
	computed: {},
	methods: {
		// form改变时执行
		handleChange($f) {
            // 菜单类型改变
			if ($f.form.type === 0) {
				$f.hidden(true, ['sort', 'icon'])
			}else{
				$f.hidden(false, ['sort', 'icon'])
			}
		},
		// 编辑
		handelEdit(row) {
			this.$refs.edit.handleOpen(row)
			this.$set(this.editProps, 'diaTitle', '编辑菜单')
		},

		handleAdd() {
			this.$refs.edit.handleOpen()
			this.$set(this.editProps, 'diaTitle', '新增菜单')
		},

		afterSubmit(data) {
			// 提交以后，刷新表格
            setTimeout(()=>{
                location.reload()
            },500)
		},
		beforeSubmit(data) {
			// 提交之前
		},
		// 获取所有菜单
		getMenu() {
			this.$api.system.getMenu().then((res) => {
				this.rule = this.rule.map((item) => {
					if (item.field === 'parentId')
						item = {
							type: 'cascader',
							field: 'parentId',
							title: '上级菜单',
							props: {
								options: res.list,
								placeholder: '请选择上级菜单',
								clearable: true,
								filterable: true,
								emitPath: true,
								props: {
									value: 'id',
									emitPath: false,
									checkStrictly: true,
								},
							},
						}
					return item
				})
			})
		},
	},
	created() {
		this.getMenu()
	},
	components: {},
}
</script>
<style scoped lang="less"></style>
