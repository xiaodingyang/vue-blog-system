<template>
  <div class="login-page">
    <div class="bg"></div>
    <div class="login">
      <h1>博客系统</h1>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        size="mini"
        label-width="70px"
        label-position="left"
      >
        <el-form-item label="用户" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="identifying">
          <div style="display:flex">
            <el-input
              v-model="loginForm.identifying"
              class="identifying-input"
              placeholder="验证码"
              @keyup.enter.native="submitForm"
            ></el-input>
            <span
              v-html="identifying"
              class="identifying-icon"
              @click="getcaptcha"
            ></span>
          </div>
        </el-form-item>
      </el-form>
      <div class="login-button">
        <el-button
          size="mini"
          type="main"
          @click="submitForm"
          :loading="loading"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { stringQuery } from "@/utils";
export default {
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  props: [],
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  components: {},
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  data() {
    return {
      loading: false,
      loginForm: {
        username: "",
        password: "",
        identifying: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        identifying: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
      identifying: "",
    };
  },
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  methods: {
    submitForm() {
      this.loading = true;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$api.user
            .login(this.loginForm)
            .then((res) => {
              if (res) {
                this.loading = false;
                this.$cookie.set("token", res.token);
                this.$store.dispatch("getUserInfo"); // 登录成功重新获取userinfo
                let path = "/";
                // 拿到上次离开时的路由
                const prePath = localStorage.getItem("prePath");
                if (prePath && prePath !== "/login") {
                  this.$router.push(prePath);
                } else {
                  this.$router.push("/");
                }
              } else {
                this.loading = false;
                this.getcaptcha();
                this.loginForm.identifying = "";
              }
            })
            .catch((err) => (this.loading = false));
        } else {
          this.loading = false;
        }
      });
    },
    getcaptcha() {
      this.$api.user.captcha().then((res) => {
        if (res) this.identifying = res;
      });
    },
  },
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐mounted方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  mounted() {},
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐created方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  created() {
    this.getcaptcha();
  },
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐watch监听属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  watch: {},
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐computed计算属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  computed: {},
};
</script>

<style scoped lang="scss">
.login-page {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  .bg {
    margin-top: -10px;
    margin-left: -10px;
    width: 101vw;
    height: 101vh;
    background: url("https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/myBlog/shizi.jpg")
      no-repeat center/cover;
    filter: blur(5px);
  }
  h1 {
    font-size: 20px;
    color: #fff;
    text-align: center;
    padding: 20px 0 40px;
  }
  .login {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 11;
    width: 300px;
    height: 400px;
    margin: auto;
    padding: 20px;
    box-shadow: 0 0 3px 0 #000;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.8);
    .login-button {
      text-align: center;
      margin-top: 40px;
      button {
        width: 100%;
      }
    }
    .identifying-input {
      width: 100%;
    }
    .identifying-icon {
      cursor: pointer;
      height: 30px;
    }
  }
}
/deep/.el-input--mini .el-input__icon {
  color: rgb(103, 194, 58);
  height: auto;
}
/deep/.el-form-item.is-error .el-input__validateIcon {
  color: #f56c6c;
}
/deep/.el-form-item__label {
  color: #fff;
}
</style>
