<template>
  <el-dialog title="角色分配" :visible="dialogFormVisible" :before-close="handleClose">
    <el-form ref="form" >
      <el-form-item label="当前的用户" label-width="120px">
        <span>{{ allotUserDate.username }}</span>
      </el-form-item>
      <el-form-item label="当前的角色" label-width="120px">
        <span>{{ allotUserDate.role_name }}</span>
      </el-form-item>
      <el-form-item label="分配新角色" label-width="120px">
        <el-select v-model="role.username" placeholder="请选择">
          <el-option v-for="item in role" :label="item.username" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
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
      }
    },
    data(){
      return{
        dialogFormVisible:false,
        role:[
          {username:'主管',value:'zhushi'},
          {username:'人事',value: 'renshi'},
          {username:'程序猿',value: 'chengxuyuan'},
          {username:'狗混子',value: 'gouhunzi'},
        ]
      }
    },
    methods:{
      async allotUserBtn(){
        console.log(this.allotUserDate.id)
        const backDate = await allotUser(this.allotUserDate.id,'aaa')
        console.log(backDate)
      },
      handleClose(){
        this.dialogFormVisible = false
        this.$refs.form.resetFields()
      }
    }
  }
</script>

<style scoped>

</style>