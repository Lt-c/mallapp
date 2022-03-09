<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor  v-for="floor in  floorsList" :key="floor.id"  :floor="floor"/>
    <Brand />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Brand from "./Brand";
import Floor from "./Floor";
import Like from "./Like";
import ListContainer from "./ListContainer";
import Rank from "./Rank";
import Recommend from "./Recommend";
export default {
  components: { ListContainer, Recommend, Rank, Like, Brand, Floor },
  mounted(){
    // 获取floorlist数据
    this.$store.dispatch('getFloorsList')

  },
  computed:{
    ...mapState({
      floorsList:(state)=> state.home.floorsList
    })
  }
};
</script>
<style lang="">
</style>