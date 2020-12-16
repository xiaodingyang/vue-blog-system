<template>
  <div class='breadcrumb'>
    <div class="wrap">
        <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: item.notTo&&item.name }"
                          v-for="item in breadArr"
                          :key="item.name">{{item.label}}</el-breadcrumb-item>

    </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import { getNavArr } from "@/router/navMap";
export default {
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐props⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  props: [],
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐组件注册⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  components: {},
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐data数据⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  data () {
    return {
      breadArr: [],
    }
  },
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐method方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  methods: {
    //   获取面包屑渲染数组
    getBreadArr (path) {
      if (path === '/') {
        this.breadArr = [{ label: '首页', path: '/' }]
      } else {
        const pathArr = path.slice(1).split('/')
        pathArr.forEach(item => {
          getNavArr().forEach(_item => {
            if (item === _item.name) this.breadArr.push(_item)

          })
        })
      }
    }
  },
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐mounted方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  mounted () {

  },
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐created方法⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  created () {

  },
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐watch监听属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  watch: {
    '$route': {
      immediate: true,
      deep: true,
      handler (value) {
        this.breadArr = []
        this.getBreadArr(value.path)
      }
    }
  },
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐computed计算属性⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//
  computed: {

  },
}
</script>

<style scoped lang='scss'>
.breadcrumb {
  @include bg($bg:#fff);
  margin: 15px;
  .wrap{
      box-shadow: 0 0 3px 0 #000;
      padding: 10px;
      border-radius: 3px;
  }
}
</style>
