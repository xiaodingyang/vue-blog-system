<template>
  <div class="base-page">
    <div class="search"
         v-show="tableSearch.form">
      <el-form ref="form"
               :model="form"
               :inline="true">
        <el-form-item v-for="item in tableSearch.form"
                      :key="item.key">
          <el-input v-if="item.type === 'input'"
                    v-model="form[item.key]"
                    :placeholder="item.label"
                    style="width: 150px"
                    size="mini"></el-input>
          <el-select v-else-if="item.type === 'select'"
                     v-model="form[item.key]"
                     :placeholder="`请选择${item.label}`"
                     style="width: 150px"
                     size="mini">
            <el-option v-for="option in item.options"
                       :label="option.label"
                       :value="option.value"
                       :key="option.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success"
                     v-debounce="onSearch"
                     size="mini">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="form = {}"
                     size="mini">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table">
      <div class="button"
           v-show="tableSearch.button">
        <el-form>
          <el-form-item>
            <el-button :type="item.type || 'success'"
                       @click="item.func"
                       size="mini"
                       v-for="item in tableSearch.button"
                       :key="item.label">{{ item.label }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <CommonTable :tableData="tableData"
                   :tableColumn="tableColumn"
                   :operation="operation"
                   :loading="loading"
                   :multiple="multiple"
                   @selectChange="selectChange"
                   :refreshTable="getData"></CommonTable>
      <div class="pagination"
           v-show="isPagination">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pagination.currentPage"
                       :page-sizes="[10, 20, 30]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pagination.total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
/*
@ tableData 表格数据
@ tableColumn 表格字段与对应中文
@ operation 表格操作栏
@ tableSearch 表格搜索栏，form表示搜索框，button表示按钮
*/
import CommonTable from "./commonTable";
export default {
  components: { CommonTable },
  props: {
    //   表格列
    tableColumn: {
      type: Array,
      default: () => []
    },
    // 操作项
    operation: {
      type: Object,
      default: () => { }
    },
    // 搜索项
    tableSearch: {
      type: Object,
      default: () => {
        return {
          button: [],
          form: []
        };
      }
    },
    // 通过调用方法获取tableData，可以实现分页
    dataFunc: {
      type: Function,
      default: () => function () { }
    },
    // 直接传入tableData，无法实现分页
    hasData: {
      type: Array,
      default: () => []
    },
    // 是否多选，默认不多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否需要分页，默认需要
    isPagination: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tableData: [],
      form: {},
      currentPage: 10,
      pagination: {},
      curPage: 1,
      pageSize: 10,
      loading: false
    };
  },
  created () {
    //   当直接传入data时，直接将值赋值给tableData，否则调用 getData
    if (this.hasData.length > 0) {
      this.tableData = this.hasData;
    } else {
      this.getData({
        pageSize: this.pageSize,
        curPage: this.curPage
      });
    }
  },
  methods: {
    //   勾选改变
    selectChange (val) {
      this.$emit("selectChange", val);
    },
    // 搜索
    onSearch () {
      this.getData({
        ...this.form,
        pageSize: this.pageSize,
        curPage: this.curPage
      });
    },
    // 每页条数改变
    handleSizeChange (val) {
      this.pageSize = val;
      this.getData({
        ...this.form,
        pageSize: this.pageSize,
        curPage: this.curPage
      });
    },
    // 页码改变
    handleCurrentChange (val) {
      this.curPage = val;
      this.getData({
        ...this.form,
        pageSize: this.pageSize,
        curPage: this.curPage
      });
    },
    // 获取数据
    getData (params) {
      this.loading = true;
      this.dataFunc(params)
        .then(res => {
          if (res.list) {
            this.tableData = res.list;
            this.pagination = {
              total: res.total, // 总数
              pageSize: res.pageSize, // 一页多少条
              currentPage: res.curPage // 当前第多少页
            };
          }
          this.loading = false;
        })
        .catch(err => (this.loading = false));
    }
  }
};
</script>

<style lang="less" scoped>
.base-page {
  .search {
    border-radius: 5px;
    background: #fff;
    padding-bottom: 10px;
  }
}
.el-form-item /deep/ {
  margin-bottom: 0;
}
.pagination {
  text-align: right;
  background: #fff;
  padding: 10px;
}
.table {
  background: #fff;
  border-radius: 5px;
}
/deep/ .el-table {
  height: 580px;
}
/deep/ .el-table__empty-text {
  line-height: 580px;
}
</style>
