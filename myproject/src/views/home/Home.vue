<template>
  <div class="home_box">
    <cHead></cHead>
    <div class="test_main">
      <div class="tm_left">
        <cMenu></cMenu>
      </div>
      <div class="tm_right">

      </div>
    </div>


  </div>
</template>

<script>
  import cHead from './Head'
  import cMenu from './Menu'
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
      background: rgba(0,0,0,0.3);
      .tm_left{
        width: 200px;
        height: 100%;
        background: #333744;
      }
    }
  }
</style>