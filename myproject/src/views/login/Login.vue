<template>
 <div class="login_box">
   <div class="login">
<!--=============logo图============-->
     <div class="login_logo"><img src="~assets/img/logo.png" alt=""></div>

<!--表单-->
     <el-form class="login_form" ref="form"  :rules="rules" :model="login_form">
       <el-form-item prop="username">
         <el-input prefix-icon="el-icon-user-solid" v-model="login_form.username" placeholder="输入账号">
         </el-input>
       </el-form-item>
       <el-form-item prop="password">
         <el-input prefix-icon="el-icon-lock" v-model="login_form.password" type="password" placeholder="输入密码">
         </el-input>
       </el-form-item>
       <el-form-item class="btn_box">
         <el-button @click="loginClick" type="primary" >提交</el-button>
         <el-button @click="resetClick" >重置</el-button>
       </el-form-item>
     </el-form>


   </div>
 </div>


</template>

<script>
  import {reqLogin} from "network/api.js"
  export default {
    name: "Login",
    data() {
      return {
        rules:{
          username:[
            { required: true, message: '必须输入账号', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '必须输入密码', trigger: 'blur' },
            { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
          ]
        },
        login_form:{
          username:'',
          password:''
        }
      }
    },
    methods:{
      //重置按钮    !* form 要和表单 ref='form' 中的一样，次奥！ *!
      resetClick(){
        this.$refs.form.resetFields();
      },
      //登录按钮    !* form 要和表单 ref='form' 中的一样，次奥！ *!
      loginClick(){
        //判断表单里的内容是否符合表单规则，符合往下走，不符合return
        this.$refs.form.validate((valid) => {
          // console.log(valid)
          if(!valid){
            return
          }
          reqLogin(this.login_form).then(data => {
            console.log(data)
            this.$router.push('/home')
          }).catch(err => {
            console.log(err)
          })
        })

        // console.log(this.login_form.username,this.login_form.password)
      },
    }
  }
</script>

<style scoped lang="less">

.login_box{
  width: 100%;
  height: 100vh;
  background: #2B4B6B;
  display: flex;
  justify-content: center;
  align-items: center;
  .login{
    width: 450px;
    height: 300px;
    border-radius: 3px;
    background: white;
    position: relative;
    .login_logo{
      position: absolute;
      left: 50%;
      border-radius: 50%;
      transform: translate(-50%,-50%);
      box-shadow: 0 0 10px white;
      img{
        width: 130px;
        height: 130px;
        border-radius: 50%;
        border: 10px solid white;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        background: #EEEEEE;

      }
    }
    .login_form{
      padding: 0 20px;
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      .btn_box{
        float: right;
      }
    }
  }
}
</style>