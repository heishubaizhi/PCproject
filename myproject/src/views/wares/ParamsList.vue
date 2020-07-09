<template>
  <Breadcrumb style="margin-bottom: 20px">
    <span slot="index">首页</span>
    <span slot="one">商品管理</span>
    <span slot="tow">分类参数</span>
  </Breadcrumb>
</template>

<script>
  import Breadcrumb from "../../components/Breadcrumb";
  export default {
    name: "ParamsList",
    components:{Breadcrumb}
  }
</script>

<style scoped>

</style>