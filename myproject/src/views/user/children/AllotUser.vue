<template>
  <el-dialog title="角色分配" :visible="dialogFormVisible" :before-close="handleClose">
    <el-form ref="form"  >
      <el-form-item label="当前的用户" label-width="120px">
        <span>{{ allotUserDate.username }}</span>
      </el-form-item>
      <el-form-item label="当前的角色" label-width="120px">
        <span>{{ allotUserDate.role_name }}</span>
      </el-form-item>
        <el-form-item label="分配新角色" label-width="120px">
          <el-select v-model="role" placeholder="请选择">
            <el-option v-for="item in userRightList" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="allotUserBtn">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {allotUser} from "../../../network/api";
  export default {
    name: "AllotUser",
    props:{
      allotUserDate:{
        type:Object
      },
      userRightList:{
        type: Array
      }
    },
    data(){
      return{
        dialogFormVisible:false,
        role:'',
/*        role:[
          {username:'主管',value:'zhushi'},
          {username:'人事',value: 'renshi'},
          {username:'程序猿',value: 'chengxuyuan'},
          {username:'狗混子',value: 'gouhunzi'},
        ]*/
      }
    },
    methods:{
      async allotUserBtn(){
        // console.log(this.allotUserDate.id,this.role)
        const result = await allotUser(this.allotUserDate.id,this.role)
        if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
        this.$message.success(result.meta.msg)
        this.$emit('showUserList')
        this.dialogFormVisible = false
        this.role = ''
      },
      handleClose(){
        this.dialogFormVisible = false
        this.role = ''
      }
    }
  }
</script>

<style scoped>

</style>