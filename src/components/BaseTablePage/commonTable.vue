<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    tableColumn: {
      type: Array,
      default: () => [],
    },
    operation: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    multiple: {
      type: Boolean,
      default: () => false,
    },
    // 刷新列表
    refreshTable: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      currentPage: 10,
      multipleSelection: [],
    };
  },
  watch: {},
  methods: {
    // 多选框选择函数
    handleSelectionChange(val) {
      this.$emit("selectChange", val);
    },
    // 删除函数
    handleDel(func, id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          func({ id }).then((res) => {
            if (res && res.status) {
              this.refreshTable();
              this.$message({
                message: "删除成功！",
                type: "success",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "danger",
            message: "已取消删除",
          });
        });
    },
    // 所有列渲染
    renderColumn(h, item, row) {
      return item.formatter ? item.formatter(h, row) : row[item.key];
    },
    // 操作栏渲染
    renderOperation(h, row) {
      return (
        <div className="operation">
          {/*当操作列表不大于2的时候*/}
          {this.operation1.map((item) => {
            return this.setOperation(h, item, row);
          })}
          {/*当操作列表大于2的时候*/}
          {this.operation2.length > 0 ? (
            <el-dropdown style={{ marginLeft: "10px" }}>
              <el-button type="main" size="mini">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                {this.operation2.map((item) => {
                  return (
                    <el-dropdown-item style={{ textAlign: "center" }}>
                      {this.setOperation(h, item, row)}
                    </el-dropdown-item>
                  );
                })}
              </el-dropdown-menu>
            </el-dropdown>
          ) : (
            ""
          )}
        </div>
      );
    },
    // 操作栏解析
    setOperation(h, item, row) {
      // 给button添加图标
      let icon;
      if (item.icon) {
        icon = item.icon;
      } else if (item.label.includes("编辑")) {
        icon = "el-icon-edit-outline";
      } else if (item.label.includes("删除")) {
        icon = "el-icon-delete";
      } else {
        icon = "el-icon-s-operation";
      }
      return (
        <el-button
          disabled={item.disabled && item.disabled(row)}
          icon={icon}
          size="mini"
          type={item.type || "main"}
          onClick={() =>
            item.label === "删除"
              ? this.handleDel(item.func, row.id)
              : item.func(row)
          }
        >
          {item.formatter ? item.formatter(h, row) : item.label}
        </el-button>
      );
    },
  },
  created() {},
  computed: {
    operation1() {
      return this.operation.button.filter((item, idx) => idx < 2);
    },
    operation2() {
      return this.operation.button.filter((item, idx) => idx >= 2);
    },
  },
  render(h) {
    return (
      <div>
        <el-table
          ref="table"
          data={this.tableData}
          stripe
          row-key="id"
          tree-props={{ children: "children", hasChildren: "hasChildren" }}
          style={{ maxWidth: "100%" }}
          header-cell-style={{ background: "#e5e5e5", color: "#666" }}
          selection-change={this.handleSelectionChange}
        >
          {/*多选项*/}
          {this.multiple ? (
            <el-table-column type="selection"></el-table-column>
          ) : (
            ""
          )}
          {this.tableColumn.map((item) => {
            return (
              <el-table-column
                key={item.key}
                prop={item.key}
                label={item.label}
                width={item.width}
                show-overflow-tooltip
                formatter={(row) => this.renderColumn(h, item, row)}
              ></el-table-column>
            );
          })}
          {this.operation ? (
            <el-table-column
              label="操作"
              width="270px"
              formatter={(row) => this.renderOperation(h, row)}
            ></el-table-column>
          ) : (
            ""
          )}
        </el-table>
      </div>
    );
  },
};
</script>
<style lang="less" scoped>
/deep/ .el-table-column--selection .cell {
  padding: 0 10px;
}
.operation {
  display: flex;
  justify-content: space-between;
}
</style>
