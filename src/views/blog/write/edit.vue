<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="80%"
    @closed="handleClose"
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
      <el-form-item label="图片" prop="type">
        <el-upload
          class="upload-demo"
          :action="url"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :file-list="form.src"
          :limit="1"
          list-type="picture-card"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>

              <span
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" filterable placeholder="请选择">
          <el-option
            :label="item.name"
            :value="item.code"
            v-for="(item, idx) in typeOptions"
            :key="idx"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="form.description"
          placeholder="请输入"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <MarkdownPro v-model="form.content" theme="dark" />
      </el-form-item>

      <el-button
        type="main"
        style="width: 100%"
        @click="submitForm"
        :loading="buttonLoading"
        >提交</el-button
      >
      <el-button @click="resetForm" style="width: 100%">重置</el-button>
    </el-form>
  </el-dialog>
</template>

<script>
import { sourceCopy } from "@/utils";
import { uploadFun } from "@/utils";
import { MarkdownPro } from "vue-meditor";

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
    typeOptions: {
      type: Array,
      default: () => [],
    },
    searchForm: {
      type: Object,
      default: () => {},
    },
  },
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  components: { MarkdownPro },
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  data() {
    return {
      title: "编辑",
      dialogFormVisible: false,
      buttonLoading: false,
      url: process.env.VUE_APP_BASE_API + "/blog/upload",
      form: {},
      originForm: {},
      rules: {
        code: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  methods: {
    handleClose() {
      this.form = this.originForm;
    },
    // 使用async 保证异步执行完以后才执行上传的下一步
    async beforeUpload(file) {
      await uploadFun(file).then((res) => {
        this.form.src = [res];
      });
    },
    handleSuccess(res, file, fileList) {
      file.url = this.form.src[0].url;
      this.$message.success("上传成功！");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleRemove(file, fileList) {
      this.form.src = fileList;
    },
    handleOpen(row) {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.form = { ...this.originForm, ...sourceCopy(row) };
      });
    },
    submitForm() {
      this.buttonLoading = true;
      this.$refs.form.validate((valid) => {
        if (valid) {
          const author = this.$store.getters.userInfo.username;
          this.form.author = author;
          console.log("form", this.form);
          this.submitFunc(this.form)
            .then((res) => {
              if (res.status) {
                this.dialogFormVisible = false;
                this.$message.success("操作成功！");
                this.refreshTable(this.searchForm);
              }
              this.buttonLoading = false;
            })
            .catch((err) => (this.buttonLoading = false));
        } else {
          this.buttonLoading = false;
          return false;
        }
      });
    },
    resetForm() {
      this.form = this.originForm;
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
};
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
/deep/.ql-editor {
  height: 300px;
}
</style>
