<template>

  <div class="head_box">
    <div class="th_left">
      <img src="../../assets/img/logo.png" alt="">
      <h1>电商后台管理系统</h1>
    </div>
    <div class="th_right">
      <el-button type="info" @click="logOut">退出</el-button>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Head",
    methods:{
      logOut(){
        this.$confirm('确认退出？')
          .then(() => {
            sessionStorage.clear()
            this.$router.push('/login')
          })
          .catch(() => {});
      }
    }
  }
</script>

<style scoped lang="less">
  .head_box{
    width: 100%;
    height: 60px;
    background: #373D41;
    display: flex;
    .th_left{
      height: 100%;
      display: flex;
      flex: 1;
      img{
        height: 100%;
      }
      h1{
        height: 100%;
        display: flex;
        align-items: center;
        font-weight: normal;
        font-size: 20px;
        color: white;
      }
    }
    .th_right{
      display: flex;
      /*flex: 1;*/padding-right: 20px;
      justify-content: right;
      align-items: center;
    }
  }
</style>