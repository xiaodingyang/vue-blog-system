<template>
  <div class="role-page">
    <x-table
      ref="table"
      stripe
      :columns="columns"
      :operation="operation"
      :button="button"
      :dataFunc="dataFunc"
      :props="tableProps"
      :header-cell-style="{
        background: '#e5e5e5',
        color: '#666',
      }"
    >
      <template v-slot:search>
        <el-form :model="searchForm" ref="form" size="mini" :inline="true">
          <el-form-item>
            <el-input
              v-model="searchForm.imgKey"
              placeholder="图片标识"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="main" @click="onSearch"
              >搜索</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button @click="reset" icon="el-icon-setting">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </x-table>
    <Edit
      :submitFunc="submitFunc"
      ref="edit"
      :refreshTable="refreshTable"
      :typeOptions="typeOptions"
    ></Edit>
  </div>
</template>
<script>
import Edit from "./edit";
export default {
  props: [],
  data() {
    return {
      dataFunc: this.$api.imgs.getImgs,
      submitFunc: this.$api.imgs.saveImgs,
      tableProps: {},
      editProps: {
        diaTitle: "编辑用户",
      },
      searchForm: {},
      parentList: [],
      typeOptions: [],
      /* 表格渲染项 */
      columns: [
        { key: "imgKey", label: "图片标识", width: "200px" },
        { key: "description", label: "图片描述" },
        {
          key: "imgList",
          label: "图片列表",
          formatter: (row) => {
            const url = row.imgList;
            if (url && url.length > 0) {
              return url.map((item) => {
                return (
                  <el-image
                    style="width: 40px;"
                    src={item.url}
                    preview-src-list={url.map((item) => item.url)}
                  ></el-image>
                );
              });
            }
          },
        },
      ],
      /* 操作项 */
      operation: {
        width: "200",
        button: [
          { label: "编辑", func: this.handelEdit },
          {
            label: "删除",
            type: "danger",
            func: this.$api.imgs.deleteImgs,
          },
        ],
      },
      button: [{ label: "新增图片", func: this.handleAdd }],
    };
  },
  computed: {},
  methods: {
    onSearch() {
      this.refreshTable(this.searchForm);
    },
    reset() {
      this.searchForm = {};
    },
    // 编辑
    handelEdit(row) {
      this.$refs.edit.handleOpen(row);
    },
    // 新增用户
    handleAdd() {
      this.$refs.edit.handleOpen();
    },
    // 刷新列表函数
    refreshTable(params) {
      this.$refs.table.getData(params);
    },
  },
  created() {
    this.$api.blog.getClass().then((res) => {
      if (res && res.list) this.typeOptions = res.list;
    });
  },
  components: { Edit },
};
</script>
<style scoped lang="less">
/deep/.el-image + {
  margin-left: 10px;
}
</style>
