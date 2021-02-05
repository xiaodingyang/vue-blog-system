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
			<el-form-item label="期望工作" prop="expectedJob">
				<el-input v-model="form.expectedJob" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="期望地址" prop="expectedAddress">
				<el-input v-model="form.expectedAddress" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="期望薪资" prop="expectedSalary">
				<el-input v-model="form.expectedSalary" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="目前状态" prop="currentStatus">
				<el-input v-model="form.currentStatus" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="毕业院校" prop="schoolName">
				<el-input v-model="form.schoolName" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="学校性质" prop="schoolNature">
				<el-input v-model="form.schoolNature" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="获得荣誉" prop="schoolHonou">
				<el-input v-model="form.schoolHonou" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="工作经验" prop="jobExperience">
				<el-input v-model="form.jobExperience" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="关于我" prop="aboutMe" >
				<vue-editor id="editor" v-model="form.aboutMe" placeholder="请输入内容..."/>
			</el-form-item>
			
			<el-form-item label="擅长技能" props="skillList">
				<el-form-item
					style="margin-bottom: 15px;"
					v-for="(domain) in form.skillList"
					:key="domain.key"
					:rules="{
						required: true,
						message: '技能不能为空',
						trigger: 'blur',
					}"
				>
					<el-input
						v-model="domain.tag"
                        placeholder="请输入技能"
						style="width:35%;margin-right: 15px;"
					></el-input>
					<el-input
                    placeholder="请输入熟练度"
						v-model="domain.value"
						style="width:50%;margin-right: 15px;"
					></el-input
					><span
						class="el-icon-remove-outline icon"
						@click.prevent="removeDomain(domain)"
					></span>
					<span
						class="el-icon-circle-plus-outline icon"
						@click="addDomain"
					></span>
				</el-form-item>
			</el-form-item>

			<el-button type="main" style="width:100%" @click="submitForm" :loading="buttonLoading"
				>提交</el-button
			>
			<el-button @click="resetForm" style="width:100%">重置</el-button>
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
            dialogFormVisible: false,
            buttonLoading:false,
            form:{},
			originForm: {
				skillList: [
					{
                        value: '',
                        tag:''
					},
				],
			},
			rules: {
				expectedJob: [
					{
						required: true,
						message: '请输入期望工作',
						trigger: 'blur',
					},
				],
				expectedAddress: [
					{
						required: true,
						message: '请输入期望地址',
						trigger: 'blur',
					},
				],
				expectedSalary: [
					{
						required: true,
						message: '请输入期望薪资',
						trigger: 'blur',
					},
				],
				currentStatus: [
					{
						required: true,
						message: '请输入目前状态',
						trigger: 'blur',
					},
				],
				schoolName: [
					{
						required: true,
						message: '请输入毕业院校',
						trigger: 'blur',
					},
				],
				schoolNature: [
					{
						required: true,
						message: '请输入学校性质',
						trigger: 'blur',
					},
				],
				schoolHonou: [
					{
						required: true,
						message: '请输入获得荣誉',
						trigger: 'blur',
					},
				],
				jobExperience: [
					{
						required: true,
						message: '请输入工作经验',
						trigger: 'blur',
					},
				],
				aboutMe: [
					{
						required: true,
						message: '请输入关于我',
						trigger: 'blur',
					},
				],
				skillList: [
					{
						required: true,
						message: '请输入熟练技能',
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
            this.buttonLoading=true
			this.$refs.form.validate((valid) => {
				if (valid) {
                    console.log('form', this.form)
					this.submitFunc(this.form).then((res) => {
                        if(res.status){
                            this.dialogFormVisible = false
                            this.$message.success('操作成功！')
                            this.refreshTable()
                        }
                        this.buttonLoading=false
					}).catch(err=>this.buttonLoading=false)
				} else {
                    this.buttonLoading=false
					return false
                }
                
			})
		},
		resetForm() {
			// this.$refs.form.resetFields()
			this.form = this.originForm
		},
		removeDomain(item) {
			var index = this.form.skillList.indexOf(item)
			if (index !== -1) {
				this.form.skillList.splice(index, 1)
			}
		},
		addDomain() {
			this.form.skillList.push({
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
