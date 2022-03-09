<template>
  <div class="spec-preview">
    <img :src="imgObj" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj"  ref="big"/>
    </div>
    <!-- 绿色遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    imgObj() {
      // console.log(this.skuImageList);
      return this.skuImageList[this.index].imgUrl;
    },
  },
  mounted() {
    // 全局事件总线，获取值
    this.$bus.$on("sentIndex", (index) => {
      // 修改数据
      this.index = index;
    });
  },
  methods: {
    handler(e) {
      let mask = this.$refs.mask, // 获取mask的dom
        big = this.$refs.big, // 获取大图
        left = e.offsetX - mask.offsetWidth / 2,
        top = e.offsetY - mask.offsetHeight / 2;
      // 约束条件 ,约束边框
      if (left <= 0) left = 0; // 限制左侧
      if (left >= mask.offsetWidth) left = mask.offsetWidth; // 限制右侧
      if (top <= 0) top = 0; // 限制上
      if (top >= mask.offsetHeight) top = mask.offsetHeight; // 限制下
      // 修改mask元素的left|top
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      // 放大图使用二倍的原因，鼠标移动方向和展示的图是相反的
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>