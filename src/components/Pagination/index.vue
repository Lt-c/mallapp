<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="pushPageNo(pageNo - 1)">
      上一页
    </button>
    <button v-if="startNumAndEndNum.start > 1" @click="pushPageNo(1)">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 中 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-show="page >= startNumAndEndNum.start"
      @click="pushPageNo(page)"
      :class="{active:pageNo == page}"
    >{{ page }}
    </button>
    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="pushPageNo(totalPage)">{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="pushPageNo(pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  methods: {
    pushPageNo(num) {
      this.$emit("getPageNo", num);
    },
  },
  computed: {
    // 总共多少页
    totalPage() {
      // Math.ceil向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续页码的起始数字和结束数字
    startNumAndEndNum() {
      // 设定初始数据
      let start = 0,
        end = 0;
      // 如果总页数没有少于限制的连续页码数量
      if (this.totalPage <= this.continues) {
        // console.log(this.totalPage);
        start = 1;
        end = this.totalPage;
      } else {
        // 正常情况，超出了连续页码
        // start = this.pageNo - 2;此时continues为5可用，当为 7 时，不可用
        // 不使用固定数字，可以根据传递的连续页码数量进行修改
        start = this.pageNo - parseInt(this.continues / 2); //continues为任意基数都可用
        end = this.pageNo + parseInt(this.continues / 2);
        // 把不正常的现象进行处理，{start会出现0或者负数}
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        // 对数据进行纠正 {end 大于等于总页码数字 }
        if (end >= this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" >
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
// .active{
//   background: skyblue;
// }
</style>