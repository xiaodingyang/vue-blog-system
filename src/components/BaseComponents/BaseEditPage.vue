<template>
	<div>
		<el-dialog
			:title="title"
			:visible.sync="dialogFormVisible"
			v-if="dialogFormVisible"
			:close-on-click-modal="false"
			:width="width || '50%'"
			@close="onClose"
		>
			<form-create
				:option="option"
				v-model="form"
				:rule="formColumn"
				@on-submit="handleSubmit"
			></form-create>
		</el-dialog>
	</div>
</template>

<script>
import { sourceCopy } from '@/utils'
export default {
	props: {
		// 表单项
		formColumn: {
			type: Array,
			require: true,
			default: () => [],
		},
		// 编辑标题
		title: {
			type: String,
			default: '',
		},
		// dialog 宽度
		width: {
			type: String,
			default: '',
		},
		// 提交函数
		submitFunc: {
			type: Function,
			require: true,
			default: () => {},
		},
		// 刷新列表
		refreshTable: {
			type: Function,
			require: true,
			default: () => {},
		},
		// form 宽度
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	components: {},
	data() {
		return {
			dialogFormVisible: false,
            form: {},
            editData:{},
			option: {
				form: {
					//行内表单模式
					inline: false,
					//表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
					labelPosition: 'left',
					//表单域标签的后缀
					labelSuffix: undefined,
					//是否显示必填字段的标签旁边的红色星号
					hideRequiredAsterisk: false,
					//表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
					labelWidth: '150px',
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
                submitBtn:{
                    icon:'',
                    type:'success'
                }
			},
		}
	},
	watch: {},
	methods: {
		onClose() {
			// this.form.destroy()
		},
		handleOpen(data) {
            this.dialogFormVisible = true
            this.editData=data
			this.$nextTick(()=>{
                if (this.form.setValue&&data) this.form.setValue(data)
            })
		},
		
		handleSubmit(formData) {
			// 过滤掉无值属性
			for (const k in formData) {
				if (!formData[k] && formData[k] !== 0) delete formData[k]
			}
            if(this.editData&&this.editData.id)formData.id=this.editData.id
            console.log('formData', formData)
			this.submitFunc(formData)
				.then((res) => {
					console.log('res', res)
					if (res) {
						this.$message({
							type: 'success',
							message: '操作成功！',
						})
						this.refreshTable()
						this.dialogFormVisible = false
					}
				})
				.catch((err) => {
					this.dialogFormVisible = false
				})
		},
	},
}
</script>
<style lang="less" scoped></style>
