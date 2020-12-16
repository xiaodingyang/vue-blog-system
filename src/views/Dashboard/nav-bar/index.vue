<script>

import { navMap } from '@/router/navMap';
export default {

  data () {
    return {
      isCollapse: false,
    };
  },
  render (h) {
    return (
      <div class="menu">
        <div class="menu-header">{this.isCollapse ? '' : '管理系统'}</div>
        <el-menu
          default-active={this.$route.path}
          class="el-menu-vertical-demo"
          collapse={this.isCollapse}
          text-color="#999"
          active-text-color="#fff"
          background-color="#0D141F"
          router={true}
        >
          {this.loopList(navMap)}
        </el-menu>
      </div>
    );
  },
  methods: {
    menuIsOpen () {
      const isCollapse = this.isCollapse;
      this.isCollapse = !isCollapse;
    },
    isOpen () {
      return this.isCollapse
    },
    loopList (nav) {
      return nav.map((item) => {
        if (item.label) {
          if (item.children) {
            return (
              <el-submenu index="1">
                <template slot="title">
                  <i class={item.icon}></i>
                  <span slot="title">{item.label}</span>
                </template>
                {this.loopList(item.children)}
              </el-submenu>
            );
          } else {
            return (
              <el-menu-item index={item.path}>
                <i class={item.icon}></i>
                <span slot="title">{item.label}</span>
              </el-menu-item>
            );
          }
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.menu {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .menu-header {
    padding: 15px 0;
    text-align: center;
    background: $menuColor;
    color: #fff;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}
.el-menu-vertical-demo {
  //   min-height: 100vh;
}
/deep/.el-menu-item,
/deep/.el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
}
/deep/ .el-menu-item:hover,
/deep/ .el-submenu__title:hover {
  background-color: #000 !important;
  color: #fff !important;
}
/deep/.el-menu-item.is-active {
  background-color: $baseColor !important;
  color: #fff !important;
}

/deep/.el-menu {
  border-right: none;
  height: 100%;
}
</style>
