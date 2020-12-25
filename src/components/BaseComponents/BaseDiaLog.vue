<template>
	<el-dialog
		v-if="dialogVisible"
		:title="title"
		:visible.sync="dialogVisible"
		:width="width"
		:close-on-click-modal="false"
		@close="onClose"
		:destroy-on-close="true"
	>
		<slot></slot>
		<span slot="footer" class="dialog-footer">
			<el-button  @click="onClose">取 消</el-button>
			<el-button  type="primary" @click="handleSubmit"
				>确 定</el-button
			>
		</span>
	</el-dialog>
</template>

<script>
export default {
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	props: {
		title: {
			type: String,
			default: '提示',
		},
		width: {
			type: String,
			default: '30%',
		},
		handleSubmit: {
			type: Function,
			default: () => {},
		},
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	components: {},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	data() {
		return {
			dialogVisible: false,
		}
	},
	//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
	methods: {
		onClose(callBack) {
            // 在父组件可以调用此回调函数，并且传入回调函数执行
            this.dialogVisible = false
            callBack&&callBack()
		},
		onOpen() {
			this.dialogVisible = true
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
/deep/.el-dialog__header {
    border-bottom: 1px solid #eee;
    background:#F8F8F8;
    span{
        color:#333;
        font-size:16px;
    }
}
/deep/.el-dialog__footer{
background:#f0f4f7;
border-top: 1px #c7c7c7 solid;
padding:10px 20px;
}
/deep/.el-dialog{
    border-radius: 5px;
}

</style>
