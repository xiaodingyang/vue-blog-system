<template>
  <div class="nav-bar">
    <div class="nav-icon">
      <i class="el-icon-s-fold"
         style="font-size: 20px;color:#fff;cursor: pointer;"
         @click="menuIsOpen"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuIsOpen: {
      type: Function,
      default: () => { },
    },
  },
  data () {
    return {};
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang="scss">
.nav-bar {
  padding: 15px;
  background: $menuColor;
}
</style>
