<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 使用时间代理，控制 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="category">
          <div class="sort" v-show="show">
            <!-- 利用事件代理+编程式导航实现路由的跳转和传递 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >
                    {{ c1.categoryName }}
                  </a>
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >
                          {{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >
                            {{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import _ from "lodash"; //这种方式是把lodash的所有功能函数引入
import throttle from "lodash/throttle"; // 最好的办法还是按需引入
export default {
  name: "TypeNav",
  data() {
    return {
      //存储鼠标在以及目录的哪一个分类
      currentIndex: -1,
      show: true, //控制TypeNav显示元素
    };
  },
  methods: {
    // 鼠标进入一级分类修改响应式数据currentIndex
    // changeIndex(index) {
    //   this.currentIndex = index;
    // },
    // 节流的写法
    // changeIndex: _.throttle(function (index) {//全局引入
    changeIndex: throttle(function (index) {
      // 按需引入
      this.currentIndex = index;
    }, 50),
    // 一级分类移出的事件回调
    leaveIndex() {
      // 使currentIndex修改为初始值
      this.currentIndex = -1;
    },
    // 路由跳转的事件回调
    goSearch(event) {
      // 三级联动的跳转最好的方式：编程式导航+事件委派
      // 存在的问题 1、需要判断点击的标签是否为 a 标签
      //     2、确定是 a 标签后，如何去区分具体是一级、二级、三级

      // 第一个问题：在子节点中的a标签，我加上自定义属性data-categoryName, 其余节点都是没有的
      let ele = event.target; // 获取点击事件的节点
      // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } = ele.dataset;
      // 有categoryname就一定是a标签
      if (categoryname) {
        // 整理路由传递的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 一级分类、二级分类、三级分类分类的a标签
        if (category1id) {
          //一级
          query.category1Id = category1id;
        } else if (category2id) {
          // 二级
          query.category2Id = category2id;
        } else {
          // 三级
          query.category3Id = category3id;
        }
        // 判断路由是否有params参数
        if (this.$route.params) {
          location.params = this.$route.params;
          // 动态的给loction添加query属性
        }
        location.query = query;
        // 路由跳转
        this.$router.push(location);
      }
    },
    // 鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      this.show = true;
    },
    leaveShow() {
      this.currentIndex = -1;
      // 是search组件才会生效
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
  computed: {
    // 对象的写法
    ...mapState({
      // 注入一个state，此为大仓库中的数据
      categoryList: (state) => state.home.categroyList,
    }),
  },
  mounted() {
    // // 通知 Vuex 发请求，获取资源，存储于仓库中，
    // this.$store.dispatch("category");// 优化方案，放到 APP.vue 中发送请求，如此切换组件就只发送一次请求，减轻服务器压力

    // 使用路由路径判断，如果不是Home组件，就对TypeNav默认隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
};
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    // 过渡动画开始
    .category-enter {
      opacity: 0;
    }
    // 过渡动画时间，效果
    .category-enter-active {
      transition: opacity 0.5s linear;
    }

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 29px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   // //可以使用这种方式
          //   // background: skyblue;
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: skyblue;
        }
      }
    }
  }
}
</style>