<template>
	<el-dialog
		:title="title"
		:visible.sync="dialogFormVisible"
		:close-on-click-modal="false"
		width="50%"
	>
		<el-form
			:model="form"
			:rules="rules"
			ref="form"
			size="medium"
			label-width="150px"
			label-position="left"
			class="form"
		>
			<el-form-item label="菜单类型" prop="type">
				<el-radio-group v-model="form.type">
					<el-radio :label="0">按钮路由</el-radio>
					<el-radio :label="1">菜单目录</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item
				label="上级菜单"
				prop="parentId"
				v-if="form.type === 1"
			>
				<el-cascader
					placeholder="请选择上级菜单"
					v-model="form.parentId"
					:options="treeOptions"
					:props="{
						checkStrictly: true,
						expandTrigger: 'hover',
						value: 'id',
					}"
					clearable
				></el-cascader>
			</el-form-item>
			<el-form-item label="菜单名称" prop="label">
				<el-input v-model="form.label" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input v-model="form.sort" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="路由名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="路由URL" prop="path">
				<el-input v-model="form.path" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="组件路径" prop="component">
				<el-input
					v-model="form.component"
					placeholder="请输入"
				></el-input>
			</el-form-item>
			<el-form-item label="访问权限" prop="auth">
				<el-select v-model="form.auth" filterable placeholder="请选择">
					<el-option label="公共" :value="0"></el-option>
					<el-option label="普通用户" :value="1"></el-option>
					<el-option label="管理员" :value="2"> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="图标" prop="icon" v-if="form.type === 1">
				<el-input v-model="form.icon" placeholder="请输入"></el-input>
			</el-form-item>
			<el-button
            icon="el-icon-upload"
				type="main"
				style="width:100%"
				@click="submitForm"
				:loading="buttonLoading"
				>提交</el-button
			>
			<el-button icon="el-icon-s-help" @click="resetForm" style="width:100%">重置</el-button>
		</el-form>
	</el-dialog>
</template>

<script>
import { sourceCopy } from '@/utils'
export default {
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	props: {
		submitFunc: {
			type: Function,
			required: true,
			default: () => {},
		},
		refreshTable: {
			type: Function,
			required: true,
			default: () => {},
		},
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	components: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	data() {
		return {
			title: '编辑',
			treeOptions: [],
			dialogFormVisible: false,
			buttonLoading: false,
			form: {},
			originForm: {
				type: 0,
				auth: 0,
			},
			rules: {
				type: [
					{
						required: true,
						message: '请输入',
						trigger: 'blur',
					},
				],
				label: [
					{
						required: true,
						message: '请输入',
						trigger: 'blur',
					},
				],
				sort: [
					{
						required: true,
						message: '请输入',
						trigger: 'blur',
					},
				],
				name: [
					{
						required: true,
						message: '请输入',
						trigger: 'blur',
					},
				],
				component: [
					{
						required: true,
						message: '请输入',
						trigger: 'blur',
					},
				],
				auth: [
					{
						required: true,
						message: '请输入',
						trigger: 'blur',
					},
				],
				path: [
					{
						required: true,
						message: '请输入',
						trigger: 'blur',
					},
				],
			},
		}
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	methods: {
		handleOpen(row) {
			this.dialogFormVisible = true
			this.$nextTick(() => {
				this.form = { ...this.originForm, ...sourceCopy(row) }
			})
		},
		submitForm() {
			this.buttonLoading = true
			this.$refs.form.validate((valid) => {
				if (valid) {
                    // 清除多余字段
					for (const k in this.form) {
						if (
							this.form[k] === null ||
							this.form[k] === 'undefined'
						)
                            delete this.form[k]
                            if(this.form.children)delete this.form.children
                    }
                    
					console.log('form', this.form)
					this.submitFunc(this.form)
						.then((res) => {
							if (res.status) {
								this.dialogFormVisible = false
								this.$message.success('操作成功！')
								setTimeout(()=>{
                                    location.reload()
                                },1000)
							}
							this.buttonLoading = false
						})
						.catch((err) => (this.buttonLoading = false))
				} else {
					this.buttonLoading = false
					return false
				}
			})
		},
		resetForm() {
			this.form = this.originForm
		},
		// 获取所有菜单
		getMenu() {
			this.$api.system.getMenu().then((res) => {
				this.treeOptions = res.list
			})
		},
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐mounted方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	mounted() {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐created方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	created() {
		this.getMenu()
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐watch监听属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	watch: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐computed计算属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	computed: {},
}
</script>

<style scoped lang="scss">
.el-button + .el-button {
	margin-top: 15px;
	margin-left: 0;
}
.icon {
	font-size: 25px;
	cursor: pointer;
}
</style>
