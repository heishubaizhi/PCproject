<template>
  <el-dialog
          title="修改用户"
          :visible="dialogVisible"
          width="50%"
          :before-close="handleClose">
    <el-form :rules="rules" ref="userform" :model="updateUserDate" label-width="80px"  >
      <el-form-item label="用户名">
        <el-input v-model="updateUserDate.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input  v-model="updateUserDate.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input  v-model="updateUserDate.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="updateUserBtn">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import {testData} from "../../../tools/testData";
  import {modifyUser} from "../../../network/api";

  export default {
    name: "updateUser",
    props:{
      updateUserDate:{
        type: Object,
      }
    },
    data(){
      return{
        dialogVisible: false  ,
        /*   userform:{
             username:'baishan',
             password:'123456',
             email:'2@qq.com',
             mobile:'13367620157'
           },*/
        //表单规则
        rules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {validator:testData , message:'请输入正确的手机号'}
          ],
        }
      }
    },
    methods:{
      handleClose(){
        // console.log(this.updateUser)
        // this.$refs.userform.resetFields()
        this.dialogVisible = false
      },
      //取消按钮
      cancelBtn(){

      },
      //确认按钮
      updateUserBtn(){

        this.$refs.userform.validate(val => {
          if(!val){
            return this.$message.error('修改的数据有误')
          }
          this.uptateUserFun()
          this.dialogVisible = false
        })
      },
      //修改用户数据函数
      async uptateUserFun (){
        // const backData = await modifyUser()
        const id = this.updateUserDate.id
        const data = {email:this.updateUserDate.email,mobile:this.updateUserDate.mobile}
        const backData = await modifyUser(id,data)
        if(backData.meta.status !== 200) return this.$message.error(backData.meta.msg)
        this.$message.success(backData.meta.msg)
        // console.log(backData)
        this.$emit('showUserList')
      }
    }
  }
</script>

<style scoped>

</style>