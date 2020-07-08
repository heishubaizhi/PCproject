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
  import {addUserRoleList} from "../../../network/api";
  export default {
    name: "RoleListAdd",
    data(){
      return{
        form:{},
        roleName:'',  //角色名称
        roleDesc:'',  //角色描述
        dialogFormVisible:false,
      }
    },
    methods:{
      async trueBtn(){
        const result = await addUserRoleList(this.roleName,this.roleDesc)
        if(result.meta.status !== 201) return this.$message.error(result.meta.msg)
        this.$message.success(result.meta.msg)
        this.dialogFormVisible = false
        this.$emit('addShowRoleList')
      }
    },
  }
</script>

<style scoped>

</style>