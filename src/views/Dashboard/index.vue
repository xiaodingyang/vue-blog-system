<template>

  <div>

    <div class="index-page">
      <BaseNavBar ref="menu" id="menu"></BaseNavBar>
      <div id="main">
        <div id="header">
          <BaseHeader :menuIsOpen="menuIsOpen" :isOpen="isOpen"></BaseHeader>
          <Breadcrumb></Breadcrumb>
        </div>
        <div id="content"
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
   components: { BaseHeader, BaseNavBar, BaseFooter, Breadcrumb },
  data () {
    return {};
  },
  methods: {
    menuIsOpen () {
      return this.$refs.menu.menuIsOpen();
    },
    isOpen () {
      return this.$refs.menu.isOpen();
    },
  },
  computed: {},
 mounted(){

 }
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
    overflow:hidden;
    width: 100%;
    box-sizing: border-box;
    @include bg($bg:rgb(241,244,249));
    #content {
            box-sizing: border-box;
      padding: 15px;
      margin: 15px;
      margin-top: 0;
      box-shadow: 0 0 3px 0 #000;
      @include bg($bg:#fff);
      border-radius: 3px;
    }
  }
}
</style>
