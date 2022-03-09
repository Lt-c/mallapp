<template >
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 未登录 -->
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!-- 已登录 -->
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>

          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" title="尚品汇" href="/" target="_blank">
          <img src="./images/logo.png" alt="" />
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="getSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>
<script >
// import VueRouter from 'vue-router';
export default {
  data() {
    return {
      // 用于接收 search 中传递的数据
      keyword: "",
    };
  },
  // 路由组件接受props参数
  methods: {
    getSearch() {
      // console.log(this.$router) // VueRouter {....}  //这是一个VueRouter的实例方法
      // console.log(VueRouter.prototype.push===this.$router.push) // true
      // console.log(VueRouter.prototype.hasOwnProperty('push')) // true
      // 编程式导航
      // params 传递参数
      // 方式一 ：字符串传递参数,
      // this.$router.push(
      //   "/search/" + this.keyword + "?k=" + this.keyword.toLowerCase()
      // );
      // 方式二 ： 对象的写法
      // this.$router.push({
      // name: "search",
      // path:'/search',
      // 当params参数传递空字符串时候，会出现问题，此时可以使用undefined解决
      // params: { keyword: this.keyword }, // http://localhost:8080/#/?keyword=
      // params: { keyword: this.keyword || undefined }, //http://localhost:8080/#/search?keyword=
      // query: { keyword: this.keyword},//将面试题时的案例
      // });

      //   this.$router.push返回一个promise
      // 路由传递参数，对象的写法 path方法不能与params参数一起使用
      if (this.$route.query) {
        // 判断是否有 query 参数
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    // 退出登录
    async logout() {
      try {
        // 清除用户数据并回到主页
        await this.$store.dispatch("userLogout");
        this.$router.push('/home')
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  mounted() {
    // 通过全局事件总线，清楚 keyword
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
    // this.$router.push({ path: 'search'})
    
  },
  computed: {
    // 用户名信息
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
};
</script>
<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>