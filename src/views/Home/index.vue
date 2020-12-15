<template>
  <div class="home">首页</div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.home {
@include font($s:25px,$c:red);
@include vh($h:50vh);
}
</style>
