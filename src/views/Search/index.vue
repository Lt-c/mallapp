<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖属性的展示的面包屑 -->
            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index" >
              {{ prop.split(":")[1] }}<i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrsInfo="attrsInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }" ></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank" >
                      <img :src="good.defaultImg" /></a> -->
                      <!-- 路由跳转时，需要携带参数 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器测试用 -->
          <!-- <Pagination :pageNo="13" :pageSize="5" :total="81" :continues="5"/> -->
          <Pagination 
          :pageNo="searchParams.pageNo" 
          :pageSize="searchParams.pageSize" 
          :total="total" 
          :continues="5"
          @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  // components: { SearchSelector },
  //  路由组件传参
  // props:['keyword'] //路由组件中的props 设为true
  // props:['a','b'] //路由组件中的props 设为对象，传递静态数据
  // props:['keyword','k','a']
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序：初始值应该是 综合|降序
        order: "1:desc",
        // 页码
        pageNo: 1,
        // 单页展示数量
        pageSize: 10,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    // Object.assign 用于合并参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 至少执行一次
    this.getData();
  },
  methods: {
    // 将搜索封装成函数，以便于多次发送
    getData() {
      this.$store.dispatch("getSearchInfo", this.searchParams);
    },
    // 删除CategoryName面包屑
    removeCategoryName() {
      // 带给服务器的参数是可有可无的，如果设置为空字符串，还是会传递给服务器
      // 如果设置为undefined ，那么就不会发送给服务器
      this.searchParams.categoryName = undefined; // 置空categoryName
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData(); // 发送请求
      // 路由也需要修改，向自己跳转
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 删除keyword面包屑
    removeKeyword() {
      this.searchParams.keyword = undefined; // 置空keyword
      this.getData(); // 发送请求
      // 通知兄弟组件header清除关键字
      this.$bus.$emit("clear");
      // 路由也需要修改，向自己跳转
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 删除Trademark面包屑
    removeTrademark() {
      this.searchParams.trademark = undefined; // 将品牌信息置空
      this.getData();
    },
    // 删除Props中的数组
    removeProp(index) {
      // 删除具体的数组,就是再次整理数据
      // this.searchParams.props.splice(this.searchParams.props.indexOf(prop),1)
      this.searchParams.props.splice(index, 1);
      console.log(index);
      this.getData();
    },
    // 自定义事件回调,收集:品牌名称
    tradeMarkInfo(trademark) {
      // 整理品牌字段参数 "ID:品牌名称"
      // console.log(trademark);
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 在此发送请求，获取search模块列表数据进行展示
      // console.log(this.searchParams.trademark);
      this.getData();
    },
    // 修改排序
    changeOrder(flag) {
      // 点击时，最初的状态
      let originFlag = this.searchParams.order.split(":")[0];//原始排序种类
      let originSort = this.searchParams.order.split(":")[1];//原始排序方式

      // 准备一个新的order值
      let newOrder = '';
      // 当点击是已经选中的排序方式，就修改升降序
      if (originFlag == flag) {
        newOrder = `${originFlag}:${originSort=='desc'?'asc':'desc'}`;
        // this.searchParams.order.splice(0,1,newOrder)
      } else {
        // 综合和价格排序之间的切换
        newOrder = `${flag}:${'desc'}`;
      }
      // 将newOrder赋给原有的order
      this.searchParams.order = newOrder
      this.getData()
    },
    // 自定义事件，收集attrinfo
    attrsInfo(attr, value) {
      //  ["属性ID:属性值:属性名"]
      // console.log(attr,value);
      // 整理参数
      let props = `${attr.attrId}:${value}:${attr.attrName}`;
      // 数组去重的方式
      if (!this.searchParams.props.includes(props)) {
        // 将props参数push进searchParams中
        this.searchParams.props.push(props);
        // 在此发送请求
        this.getData();
        // console.log(props)
      }
    },
    // 自定义事件，获取当前页码
    getPageNo(pageNo){
      console.log(pageNo);
      // 整理数据
      this.searchParams.pageNo = pageNo;
      this.getData();// 在此发请求
    }

  },
  computed: {
    ...mapGetters({
      goodsList: "goodsList",
    }),
    // 获取search模块展示的total数据
    ...mapState({
      total:state => state.search.searchInfo.total
    })
    ,
    isOne() {
      return this.searchParams.order.indexOf("1") !== -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") !== -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") !== -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") !== -1;
    },
  },
  // 数据监听，监听组件实例身上的属性值变化
  watch: {
    // 监听属性
    $route() {
      // 发送请求之前，需要再次整理数据
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // console.log(this.searchParams);
      // 再次发起请求
      this.getData();
      // 每一次请求完毕，应该把相应的1,2,3级id清空，使其接受下一次的id
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>