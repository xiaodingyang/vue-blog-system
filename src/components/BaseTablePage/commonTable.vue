<template>
  <div>
    <el-table ref="table"
              :data="tableData"
              v-loading="loading"
              stripe
              style="max-width: 100%;"
              :header-cell-style="{ background: '#e5e5e5', color: '#666' }"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       v-if="multiple"></el-table-column>
      <el-table-column v-for="row in tableColumn"
                       :key="row.key"
                       :prop="row.key"
                       :label="row.label"
                       :width="row.width"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <!--formatter Function 自定义列显示内容，一般用于转译-->
          <span>{{
            row.formatter ? row.formatter(scope.row) : scope.row[row.key]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       v-if="operation && operation.button.length > 0"
                       :width="operation.width ? operation.width : ''">
        <template slot-scope="scope">
          <span v-for="(item, idx) in operation.button"
                :key="idx"
                style="margin-right: 10px;">
            <el-button v-if="item.label==='删除'"
                       plain
                       size="mini"
                       type="danger"
                       @click="()=>handleDel(item.func,scope.row.id|| scope.row.ssoId)">删除</el-button>
            <!--isHidden Function 操作按钮是否隐藏，false 不隐藏，true 隐藏-->
            <!--formatter Function 操作按钮label可自定义，一般用于启用禁用-->
            <el-button v-else
                       :disabled="item.isHidden&&item.isHidden(scope.row)"
                       plain
                       size="mini"
                       :type="item.type || 'success'"
                       @click="() => item.func(scope.row)">{{
              item.formatter ? item.formatter(scope.row) : item.label
            }}</el-button>
          </span>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableColumn: {
      type: Array,
      default: () => []
    },
    operation: {
      type: Object,
      default: () => { }
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    multiple: {
      type: Boolean,
      default: () => false
    },
    // 刷新列表
    refreshTable: {
      type: Function,
      default: () => { }
    }
  },
  data () {
    return {
      currentPage: 10,
      multipleSelection: []
    };
  },
  watch: {},
  methods: {
    handleSelectionChange (val) {
      this.$emit("selectChange", val);
    },
    handleDel (func, id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('id', id);

        func(id).then(res => {
          if (res) {
            this.refreshTable()
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'danger',
          message: '已取消删除'
        });
      });
    }

  },
  created () {

  }
};
</script>
<style lang="less" scoped>
/deep/ .el-table-column--selection .cell {
  padding: 0 10px;
}
</style>
