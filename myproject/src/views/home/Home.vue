<template>
  <div class="home_box">
    <cHead></cHead>
    <div class="test_main">
        <cMenu></cMenu>
      <div class="tm_right">
        <router-view></router-view>
      </div>
    </div>


  </div>
</template>

<script>
  import cHead from './Head'
  import cMenu from '../menu/Menu'
  export default {
    name: "Home",
    components:{
      cHead,cMenu
    }
  }
</script>

<style scoped lang="less">
  .home_box{
    .test_main{
      width: 100%;
      height: calc(100vh - 60px);
      /*background: rgba(0,0,0,0.3);*/
      display: flex;
      .tm_left{
        /*width: 200px;*/
        height: 100%;
        background: red;
      }
      .tm_right{
        width: 100%;
        height: 100%;
        background: #EAEDF1;
        padding: 20px;
      }
    }
  }
</style>