<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @click="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('plus', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.cartPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="removeCartGood(cart)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck&&cartInfoList.length>0" @change="updateAllCheckedCart($event)"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    // 获取个人购物车数据
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 修改某一个产品的个数
    handler: throttle(async function (type, disNum, cart) {
      // 接受形参，判断类型
      // type 区分三种类类型，加减，自行输入
      // disNum  传递修改的数量，+) 变化量+1 -) 变化量-1  input最终个数(并不是变化量)
      // cart 判断是哪一个产品(使用cart上的商 品id)
      switch (type) {
        //加号
        case "plus":
          disNum = 1;
          break;
        case "minus":
          // 需要对原有的数值进行判断,大于 1 才能传递给服务器 -1
          // if(cart.skuNum > 1){
          //   disNum = -1;
          // }else{
          //    产品个数小于等于1
          //   disNum = 0 ;
          // }
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 用户输入的最终量，非法的（带有汉字）
          // eslint-disable-next-line no-constant-condition
          if (isNaN(disNum) || disNum < 0 || disNum == " ") {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      // console.log("handler被调用了", type, disNum, cart);
      // 派发actions
      try {
        // 修改成功
        await this.$store.dispatch("addOrUpadteShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 再次发起请求，获取数据
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    }, 500),
    // 删除某一个产品商品
    async removeCartGood(cart) {
      try {
        // 如果删除成功
        await this.$store.dispatch("removeCartGoods", { skuId: cart.skuId });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改商品的选中属性，需要skuid ischecked
    async updateChecked(cart, e) {
      try {
        // console.log(e.target.checked); 此时返回 false true 服务器只接收0,1 所以需要进行判断
        let isChecked = e.target.checked ? '1' : '0';
        await this.$store.dispatch("updateCheckedById", { skuId: cart.skuId, isChecked: isChecked});
        this.getData()
      } catch (error) {
        alert(error.message)
       }
    },
    // 删除全部选中的产品
    // 这个回调函数，无法获取一些数据
    async deleteAllCheckedCart(){
      // 派发一个action
      try {
        await this.$store.dispatch('deleteAllCheckedCart')
        setTimeout(() => {
          this.getData();// 服务器可能没有收到需要修改的数据，所以最好设置一个延迟
        }, 100);
      } catch (error) {
        console.log(error);
      }
    },
    // 修改购物车的全选和全不选
    async updateAllCheckedCart(e){
      try {
        let isChecked = e.target.checked ? '1' : '0';
        await this.$store.dispatch('updateAllCheckedCart',isChecked);
        this.getData()
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  computed: {
    // 获取购物车信息
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算购买商品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.cartPrice * item.skuNum;
      });
      return sum;
    },
    // 判断底部复选框是否全部勾选【全部商品都选中，才勾选】
    isAllCheck() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>