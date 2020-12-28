<template>
  <div class="index-page">
    <BaseNavBar ref="menu" id="menu"></BaseNavBar>
    <div id="main">
      <div id="header">
        <BaseHeader :menuIsOpen="menuIsOpen" :isOpen="isOpen"></BaseHeader>
      </div>
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
      <Footer />
    </div>
  </div>
</template>

<script>
import BaseNavBar from "./nav-bar";
import BaseHeader from "./header";
import Footer from "./footer";

export default {
  props: [],
  components: { BaseHeader, BaseNavBar, Footer },
  data() {
    return {};
  },
  methods: {
    menuIsOpen() {
      return this.$refs.menu.menuIsOpen();
    },
    isOpen() {
      return this.$refs.menu.isOpen();
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style scoped lang="scss">
.index-page {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  box-sizing: border-box;
  #main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    @include bg($bg: rgb(241, 244, 249));
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
