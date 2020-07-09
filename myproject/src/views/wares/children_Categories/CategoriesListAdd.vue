<template>
  <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
    <el-form label-width="90px">
      <el-form-item label="角色名称：" >
        <el-input v-model="roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述：" >
        <el-input v-model="roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="trueBtn">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "CategoriesListAdd",
    data(){
      return{
        dialogFormVisible:false
      }
    },
    methods:{
      trueBtn(){

      }
    }
  }
</script>

<style scoped>

</style>