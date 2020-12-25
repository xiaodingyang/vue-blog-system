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
			<el-form
				ref="form"
				:model="form"
				:disabled="disabled"
				:rules="rules"
				label-position="left"
                label-width="150px"
			>
				<el-row>
					<el-col
						:span="item.span"
						v-for="item in formColumn"
						:key="item.key"
					>
						<BaseFormRender
							:form="form"
							:item="item"
							:formWidth="formWidth"
						></BaseFormRender>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleCancel" size="mini">取 消</el-button>
				<el-button type="success" @click="handleSubmit" size="mini"
					>确 定</el-button
				>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { sourceCopy } from '@/utils'
export default {
	props: {
		//   编辑数据
		editData: {
			type: Object,
			default: () => {},
		},
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
		// 规则项
		rules: {
			type: Object,
			default: () => {},
		},

		// form 宽度
		formWidth: {
			type: String,
			default: '',
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
		}
	},
	watch: {
		editData: {
			immediate: true,
			handler() {
				this.form = sourceCopy(this.editData) // 深度克隆
			},
		},
	},
	methods: {
		onClose() {
			this.form = {}
		},
		handleOpen() {
			this.dialogFormVisible = true
		},
		handleCancel() {
			this.dialogFormVisible = false
		},
		handleSubmit() {
            const params = sourceCopy(this.form)
            // 过滤掉无值属性
            for (const k in params) {
                if(!params[k]&&this.form[k]!==0)delete params[k]
            }
            console.log('params',params);
			this.submitFunc(params)
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
