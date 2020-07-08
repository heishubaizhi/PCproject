<template>
  <el-dialog title="编辑角色" :visible.sync="dialogFormVisible">
    <el-form label-width="90px">
      <el-form-item label="角色名称：" >
        <el-input v-model="updateRoleDate.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述：" >
        <el-input v-model="updateRoleDate.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="trueBtn">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {updateUserRole} from "../../../network/api";

  export default {
    name: "RoleListUpdate",
    props:{
      updateRoleDate:{
        type:Object
      }
    },
    data(){
      return{
        dialogFormVisible:false,
      }
    },
    methods:{
      async trueBtn(){
        const result = await updateUserRole(this.updateRoleDate.id,this.updateRoleDate.roleName,this.updateRoleDate.roleDesc)
        if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
        this.$message.success(result.meta.msg)
        this.dialogFormVisible = false
        this.$emit('addShowRoleList')
      },
    }
  }
</script>

<style scoped>

</style>