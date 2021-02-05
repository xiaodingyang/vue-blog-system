<template>
	<el-dialog
		:title="title"
		:visible.sync="dialogFormVisible"
		:close-on-click-modal="false"
		width="80%"
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
			<el-form-item label="公司名称" prop="companyName">
				<el-input
					v-model="form.companyName"
					placeholder="请输入"
				></el-input>
			</el-form-item>
			<el-form-item label="时间段" prop="timeList">
				<el-date-picker
					style="width:50%"
					v-model="form.timeList"
					type="daterange"
					align="right"
					unlink-panels
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:picker-options="pickerOptions"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="薪资" prop="salary">
				<el-input v-model="form.salary" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="项目经验" prop="experience">
				<el-form-item
					style="margin-bottom: 15px;"
					v-for="(domain, idx) in form.experience"
					:key="idx"
					:rules="{
						required: true,
						message: '项目名称',
						trigger: 'blur',
					}"
				>
					<el-row>
						<el-col :span="4">
							<el-input
								v-model="domain.projectName"
								placeholder="请输入项目名称"
							></el-input>
						</el-col>
                        <el-col :span="9" style="margin-left:15px;">
							<vue-editor id="editor" v-model="domain.jobDescription" placeholder="请输入项目描述..."/>
						</el-col>
						<el-col :span="9" style="margin-left:15px;">
							<vue-editor id="editor" v-model="domain.skills" placeholder="请输入项目技能..."/>
						</el-col>
						<el-col :span="1">
							<span
								class="el-icon-remove-outline icon"
								@click.prevent="removeDomain(domain)"
							></span>
							<span
								class="el-icon-circle-plus-outline icon"
								@click="addDomain"
							></span>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form-item>

			<el-button
				type="main"
				style="width:100%"
				@click="submitForm"
				:loading="buttonLoading"
				>提交</el-button
			>
			<el-button @click="resetForm" style="width:100%">重置</el-button>
		</el-form>
	</el-dialog>
</template>

<script>
import { sourceCopy,dateFormat } from '@/utils'
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
			dialogFormVisible: false,
			buttonLoading: false,
			form: {},
			originForm: {
				experience: [
					{
						projectName: '',
						jobDescription: '',
						skills: '',
					},
				],
			},
			rules: {
				companyName: [
					{
						required: true,
						message: '请输入',
						trigger: 'blur',
					},
				],
				timeList: [
					{
						required: true,
						message: '请选择',
						trigger: 'blur',
					},
				],
				salary: [
					{
						required: true,
						message: '请输入',
						trigger: 'blur',
					},
				],
			},
			pickerOptions: {
				shortcuts: [
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 7
							)
							picker.$emit('pick', [start, end])
						},
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 30
							)
							picker.$emit('pick', [start, end])
						},
					},
					{
						text: '最近三个月',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 90
							)
							picker.$emit('pick', [start, end])
						},
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
                    this.form.timeList=this.form.timeList.map(item=>{
                        item = dateFormat(item,'yyyy-MM-dd')
                        return item
                    })
					console.log('form', this.form)
					this.submitFunc(this.form).then((res) => {
						if (res.status) {
							this.dialogFormVisible = false
                            this.$message.success('操作成功！')
                            this.refreshTable()
						}
						this.buttonLoading = false
					}).catch(err=>this.buttonLoading = false)
				} else {
					this.buttonLoading = false
					return false
				}
			})
		},
		resetForm() {
			this.form = this.originForm
		},
		removeDomain(item) {
			var index = this.form.experience.indexOf(item)
			if (index !== -1) {
				this.form.experience.splice(index, 1)
			}
		},
		addDomain() {
			this.form.experience.push({
				value: '',
				key: Date.now(),
			})
		},
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐mounted方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	mounted() {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐created方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	created() {},
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
