<template>

  <div>

    <div class="index-page">
      <BaseNavBar ref="menu"></BaseNavBar>
      <div class="main">
        <div>
          <BaseHeader :menuIsOpen="menuIsOpen"></BaseHeader>
          <Breadcrumb></Breadcrumb>
        </div>
        <div class="content"
             ref="content">

          <router-view></router-view>

        </div>
        <BaseFooter></BaseFooter>
      </div>
    </div>

  </div>

</template>

<script>
import BaseFooter from './footer';
import BaseNavBar from './nav-bar';
import BaseHeader from './header';
import Breadcrumb from './Breadcrumb';
export default {
  props: [],
  data () {
    return {};
  },
  methods: {
    menuIsOpen () {
      return this.$refs.menu.menuIsOpen();
    },
  },
  computed: {},
  components: { BaseHeader, BaseNavBar, BaseFooter, Breadcrumb },
};
</script>

<style scoped lang="scss">
.index-page {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    width: 100%;
    .content {
      padding: 15px;
    }
  }
}
</style>
