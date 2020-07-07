<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
            <slot name="index"></slot>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
            <slot name="one"></slot>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
            <slot name="tow"></slot>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
  export default {
    name: "Breadcrumb"
  }
</script>

<style scoped>

</style>