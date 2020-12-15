<template>
  <div class="role-page">
    <BaseTablePage ref="table"
                   :tableColumn="tableColumn"
                   :tableSearch="tableSearch"
                   :operation="operation"
                   :dataFunc="dataFunc"></BaseTablePage>
    <BaseEditPage ref="edit"
                  :editData="editData"
                  :formColumn="formColumn"
                  :title="editTitle"
                  :refreshTable="refreshTable"
                  :submitFunc="submitFunc"></BaseEditPage>
  </div>
</template>
<script>
import BaseTablePage from "@/components/BaseTablePage/index";
export default {
  props: [],
  data () {
    return {
      dataFunc: this.$api.system.getUserList,
      editData: {},
      editTitle: "",
      submitFunc: null,
      /* 表单渲染项 */
      formColumn: [
        { key: "realName", label: "姓名", type: 'input' },
        { key: "ssoId", label: "工号", type: 'input' },
        {
          key: "roleId",
          label: "角色名称",
          type: 'select',
          options: []
        },
        { key: "expiryDate", label: "有效期", type: 'datetime' },
      ],
      /* 表格渲染项 */
      tableColumn: [
        { key: "name", label: "姓名（工号）", formatter (row) { return `${row.realName}（${row.ssoId}）` } },
        { key: "roleName", label: "角色名称", },
        { key: "expiryDate", label: "有效期" },
        { key: "createDate", label: "创建时间" }],
      /* 操作项 */
      operation: {
        width: "200",
        button: [{ label: "编辑", func: this.handelEdit }, { label: "删除", func: this.$api.system.userDel }]      },
      /* 搜索项 */
      tableSearch: {
        form: [{ key: "realName", label: "姓名（工号）", type: "input" }, { key: "roleId", label: "角色名称", type: "select", options: [] }],
        button: [
          { label: '新增用户', func: this.handleAdd }]
      },
    };
  },
  computed: {
  },
  methods: {
    // 编辑    
    handelEdit (row) {
      this.editData = row
      this.editTitle = "编辑审核人"
      this.submitFunc = this.$api.system.userEdit
      this.$refs.edit.handleOpen()
    },
    // 刷新列表    
    refreshTable () {
      return this.$refs.table.getData()
    },
    handleAdd () {
      this.editTitle = "新增审核人"
      this.editData = {}
      this.submitFunc = this.$api.system.userAdd
      this.$refs.edit.handleOpen()
    },
  },
  created () {
    console.log('aaaaaaa', this.$api.system);
  },
  components: { BaseTablePage }};
</script>
<style scoped lang="less"></style>