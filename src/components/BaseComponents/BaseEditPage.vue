<template>
	<el-dialog
		:title="title"
		:visible.sync="dialogFormVisible"
		:close-on-click-modal="false"
		:width="props.diaWidth"
	>
		<form-create
			:option="option"
			v-model="form"
			:rule="formColumn"
			@on-submit="handleSubmit"
			@change="handleChange"
		></form-create>
	</el-dialog>
</template>

<script>
import { removeToken } from '@/utils/auth'
export default {
	props: {
		// 表单项
		formColumn: {
			type: Array,
			require: true,
			default: () => [],
		},
		
		props: {
			type: Object,
			default: {
                diaWidth: '50px',
                labelWidth: '150px',
                labelPosition: 'left',
                disabled:false
            },
		},
	
	},
	components: {},
	data() {
		return {
			submitFunc: Function, // 提交表单api
			refreshTable: Function, // 刷新table函数
			title: '', // 弹窗标题
			dialogFormVisible: false,
			form: {},
			editId: '',
			option: {
				form: {
					//行内表单模式
					inline: false,
					//表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
					labelPosition: this.props.labelPosition,
					//表单域标签的后缀
					labelSuffix: undefined,
					//是否显示必填字段的标签旁边的红色星号
					hideRequiredAsterisk: false,
					//表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
					labelWidth: this.props.labelWidth,
					//是否显示校验错误信息
					showMessage: true,
					//是否以行内形式展示校验信息
					inlineMessage: false,
					//是否在输入框中显示校验结果反馈图标
					statusIcon: false,
					//是否在 rules 属性改变后立即触发一次验证
					validateOnRuleChange: true,
					//是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
					disabled: false,
					//用于控制该表单内组件的尺寸 medium / small / mini
					size: 'medium',
				},
				// global: {
				// 	//设置所有组件
				// 	'*': {
				// 		col: {
				// 			span: 10,
				// 			offset: 1,
				// 		},
				// 	},
				// },
				submitBtn: {
					// icon: '',
					type: 'main',
				},
			},
		}
	},
	watch: {},
	methods: {
		//   组件内部值发生改变
		handleChange(filed, value, $f) {
			this.$emit('formChange', $f)
		},
		handleOpen({ title, submitFunc, refreshTable, row }) {
			this.dialogFormVisible = true
			this.title = title // 弹窗标题
			this.submitFunc = submitFunc // 提交函数
			this.refreshTable = refreshTable // 刷新table函数

			this.$nextTick(() => {
				if (this.form && row) {
					this.editId = row.id // 编辑id
					this.form.setValue(row)
				} else {
					// this.form.form = {}
					// this.form.resetFields()
				}
				this.$emit('formChange', this.form) // 初始化change
			})
		},

		handleSubmit(formData) {
			this.form.submitBtnProps({ loading: true })
			// 过滤掉无值属性
			for (const k in formData) {
				if (!formData[k] && formData[k] !== 0) delete formData[k]
			}
			if (this.editId) formData.id = this.editId
			console.log('params', formData)
			// callBack为回调函数，在上层组件中可以重新设置formData值
			this.submitFunc((func, callback) => {
				callback && callback(formData)
				func(formData)
					.then((res) => {
						if (res) {
							// 如果修改的用户信息为当前登录用户，则提示重新登录，并跳转到登录页
							if (
								this.$store.getters.userInfo.id === this.editId
							) {
								this.$message({
									type: 'warning',
									message: '操作成功，请重新登录！',
								})
								setTimeout(() => {
									removeToken()
									this.$router.push('/login')
								}, 1000)
							} else {
								this.$message({
									type: 'success',
									message: '操作成功！',
								})
								this.refreshTable()
							}

							this.dialogFormVisible = false
						}
						// 操作成功以后关闭提交加载按钮
						this.form.submitBtnProps({ loading: false })
					})
					.catch((err) => {
						this.dialogFormVisible = false
						this.form.submitBtnProps({ loading: false })
					})
			})
		},
	},
}
</script>
<style lang="less" scoped></style>
