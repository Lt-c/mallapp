<template>
  <div id="app">
    <div class="outer">
      <Header />
      <router-view></router-view>
      <Footer v-show="$route.meta.isShow" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
// import Home from "@/views/Home";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Header,
    // Home,
    Footer,
  },
  mounted() {
    //   // console.log(this.$route.meta.isShow)// 查看路由元信息控制底部footer组件是否显示
    //   console.log(reqCategoryList());

    //   // console.log(this.$router.__proto__)

    // 通知 Vuex 发请求，获取资源，存储于仓库中
    this.$store.dispatch("getCategory");
  },
};
</script>

<style lang="less" scoped>
</style>>