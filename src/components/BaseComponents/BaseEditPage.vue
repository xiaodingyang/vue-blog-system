<template>
  <div>
    <el-dialog :title="title"
               :visible.sync="dialogFormVisible"
               v-if="dialogFormVisible"
               :width="width || '50%'" @close="onClose">
      <BaseFormRender :formColumn="formColumn"
                      :form="form"></BaseFormRender>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="handleCancel"
                   size="mini">取 消</el-button>
        <el-button type="success"
                   @click="handleSubmit"
                   size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  props: {
    //   编辑数据
    editData: {
      type: Object,
      default: () => { }
    },
    // 表单项
    formColumn: {
      type: Array,
      require: true,
      default: () => []
    },
    // 编辑标题
    title: {
      type: String,
      default: ""
    },
    // dialog 宽度
    width: {
      type: String,
      default: ""
    },
    // 提交函数
    submitFunc: {
      type: Function,
      require: true,
      default: () => { }
    },
    // 刷新列表
    refreshTable: {
      type: Function,
      require: true,
      default: () => { }
    }
  },
  components: {},
  data () {
    return {
      dialogFormVisible: false,
      form: {}
    };
  },
  watch: {
    editData: {
      immediate: true,
      handler () {
        this.form = this.$xdy.sourceCopy(this.editData) // 深度克隆
      }
    }
  },
  methods: {
      onClose(){
          this.form={}
      },
    handleOpen () {
      this.dialogFormVisible = true;
    },
    handleCancel () {
      this.dialogFormVisible = false;
    },
    handleSubmit (callBack) {
      const params = this.$xdy.sourceCopy(this.form)
      //重构menuPermissionList的值
      if (params.menuPermissionList) {
        params.menuPermissionList = params.menuPermissionList.map(item => {
          return { id: item }
        })
      }
      this.submitFunc(params)
        .then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          }
          this.refreshTable()
          this.dialogFormVisible = false;
        })
        .catch(err => {
          this.dialogFormVisible = false;
        });
    }
  }
};
</script>
<style lang="less" scoped></style>
