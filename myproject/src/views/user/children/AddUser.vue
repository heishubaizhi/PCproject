<template>
  <el-dialog
          title="添加用户"
          :visible="dialogVisible"
          width="50%"
          :before-close="handleClose">
      <el-form :rules="rules" ref="userform" :model="userform" label-width="80px"  >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userform.username" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input  v-model="userform.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input  v-model="userform.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input  v-model="userform.mobile"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="cancelBtn">取 消</el-button>
            <el-button type="primary" @click="addUserBtn">确 定</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>

<script>
  import {testData} from "../../../tools/testData";
  import {addUser} from "../../../network/api";

  export default {
    name: "AddUser",

    data(){
      return{
        dialogVisible: false,
     /*   userform:{
          username:'baishan',
          password:'123456',
          email:'2@qq.com',
          mobile:'13367620157'
        },*/
        userform:{
          username:'',
          password:'',
          email:'',
          mobile:''
        },
        //表单规则
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
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
    created() {
    },
    methods:{

      //弹窗中X按钮或弹窗外区域
      handleClose(done) {
        // this.$confirm('确认关闭？')
        //     .then(_ => {
        //       done();
        //     })
        //     .catch(_ => {});
        this.$refs.userform.resetFields()
        this.dialogVisible = false
      },
      //添加弹出里的确定按钮
      addUserBtn(){
        this.$refs.userform.validate(val =>{
          if(!val){
            this.$message.error('格式输入有误')
            this.$refs.userform.resetFields()
            this.dialogVisible = false
            return
          }
          this.addUserList()
        })
      },
      //添加弹窗里的取消按钮
      cancelBtn(){
        this.$refs.userform.resetFields()
        this.dialogVisible = false
      },
      //添加用户数据函数
      async addUserList(){
        const {username,password,email,mobile} = this.userform
        const backData = await addUser({username,password,email,mobile})
        // console.log(backData)
        this.$refs.userform.resetFields()
        this.dialogVisible = false
        if(backData.meta.status !== 201) return this.$message.error(backData.meta.msg)
        this.$message.success('用户数据添加成功')
        this.$emit('showUserList')
      }
    }
  }
</script>
<style scoped>
</style>