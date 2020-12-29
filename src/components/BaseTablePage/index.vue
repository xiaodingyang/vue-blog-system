<template>
  <div class="base-page">
    <div class="search" v-show="tableSearch.form">
      <form-create
        :option="option"
        v-model="form"
        :rule="tableSearch.form"
      ></form-create>
      <el-button
        icon="el-icon-search"
        type="cyan"
        v-debounce="onSearch"
        size="mini"
        >搜索</el-button
      >
      <el-button @click="form = {}" size="mini" icon="el-icon-setting"
        >重置</el-button
      >
    </div>

    <div class="table">
      <div class="button" v-show="tableSearch.button">
        <el-form>
          <el-form-item>
            <el-button
              :type="item.type || 'primary'"
              @click="item.func"
              :icon="setIcon(item)"
              size="mini"
              v-for="item in tableSearch.button"
              :key="item.label"
              >{{ item.label }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <CommonTable
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :tableData="tableData"
        :tableColumn="tableColumn"
        :operation="operation"
        :multiple="multiple"
        @selectChange="selectChange"
        :refreshTable="getData"
      ></CommonTable>
      <div class="pagination" v-show="isPagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
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
      default: () => [],
    },
    // 操作项
    operation: {
      type: Object,
      default: () => {},
    },
    // 搜索项
    tableSearch: {
      type: Object,
      default: () => {
        return {
          button: [],
          form: [],
        };
      },
    },
    // 通过调用方法获取tableData，可以实现分页
    dataFunc: {
      type: Function,
      default: () => function() {},
    },
    // 直接传入tableData，无法实现分页
    hasData: {
      type: Array,
      default: () => [],
    },
    // 是否多选，默认不多选
    multiple: {
      type: Boolean,
      default: false,
    },
    // 是否需要分页，默认需要
    isPagination: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tableData: [],
      form: {},
      currentPage: 10,
      pagination: {},
      curPage: 1,
      pageSize: 10,
      loading: true,
      option: {
        form: {
          //行内表单模式
          inline: true,
          //表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
          labelPosition: "left",
          //表单域标签的后缀
          labelSuffix: undefined,
          //是否显示必填字段的标签旁边的红色星号
          hideRequiredAsterisk: false,
          //表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
          labelWidth: "70px",
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
          size: "mini",
        },
        submitBtn: {
          show: false,
        },
        resetBtn: {
          show: false,
        },
      },
    };
  },
  created() {
    //   当直接传入data时，直接将值赋值给tableData，否则调用 getData
    if (this.hasData.length > 0) {
      this.tableData = this.hasData;
    } else {
      this.getData({
        pageSize: this.pageSize,
        curPage: this.curPage,
      });
    }
  },
  methods: {
    //   勾选改变
    selectChange(val) {
      this.$emit("selectChange", val);
    },
    // 搜索
    onSearch() {
      this.form.submit((data) => {
        this.getData({
          ...data,
          pageSize: this.pageSize,
          curPage: this.curPage,
        });
      });
    },
    // 每页条数改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData({
        ...this.form,
        pageSize: this.pageSize,
        curPage: this.curPage,
      });
    },
    // 页码改变
    handleCurrentChange(val) {
      this.curPage = val;
      this.getData({
        ...this.form,
        pageSize: this.pageSize,
        curPage: this.curPage,
      });
    },
    // 获取数据
    getData(params) {
      this.loading = true;
      this.dataFunc(params)
        .then((res) => {
          if (res.list) {
            this.tableData = res.list;
            this.pagination = {
              total: res.total, // 总数
              pageSize: res.pageSize, // 一页多少条
              currentPage: res.curPage, // 当前第多少页
            };
          }
          this.loading = false;
        })
        .catch((err) => (this.loading = false));
    },
    // 设置按钮图标
    setIcon(item) {
      let icon;
      if (item.label.includes("新增")) {
        icon = "el-icon-plus";
      } else {
        icon = "el-icon-s-operation";
      }
      return icon;
    },
  },
};
</script>

<style lang="less" scoped>
.base-page {
  .search {
    display: flex;
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
/deep/.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0;
}
</style>
