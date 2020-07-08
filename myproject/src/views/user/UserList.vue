<template>
    <div>
        <breadcrum_nav style="margin-bottom: 20px">
            <span slot="index">首页</span>
            <span slot="one">用户管理</span>
            <span slot="tow">用户列表</span>
        </breadcrum_nav>
        <el-card class="box-card">
            <el-row :gutter="20" style="margin-bottom: 20px">
                <el-col :span="10">
                    <el-input placeholder="请输入内容" class="input-with-select" v-model="userParms.query">
                        <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addShow">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table :data="userData" border style="width: 100%">
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <el-table-column prop="mg_state" label="状态">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.mg_state"
                                active-color="keyblue"
                                @change="changeUser(scope.row)"
                                >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column width="200px" label="操作">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start" :enterable="false">
                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateShow(scope.row)"></el-button>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="删除" placement="top-start" :enterable="false">
                            <el-button type="danger" size="mini" icon="el-icon-delete" @click="delUserBtn(scope.row)"></el-button>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start" :enterable="false">
                            <el-button type="warning" size="mini" icon="el-icon-setting" @click="allotUserBtn(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="userParms.pagenum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="userParms.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
        <AddUser ref="comAddUser" @showUserList="showUserList"></AddUser>
        <UpdateUser :updateUserDate="updateUserDate" ref="comUpdateUser" @showUserList="showUserList"></UpdateUser>
        <AllotUser :allotUserDate="allotUserDate" :userRightList="userRightList" ref="comAllotUser" @showUserList="showUserList"></AllotUser>
    </div>
</template>

<script>
    import breadcrum_nav from 'components/Breadcrumb'
    import AddUser from "./children/AddUser";
    import UpdateUser from "./children/UpdateUser";
    import AllotUser from "./children/AllotUser";
    import {reqUser,changeState,deleteUser,getUserRoleList} from "../../network/api";
    export default {
    name: "UserList",
    created() {
        this.getUsers()
    },
    data(){
      return{
          //传到分配角色组件的数据
          allotUserDate:{
              id:'',
              username:'',
              role_name:''
          },
          //传到修改用户信息组件的数据
          updateUserDate:{
              id:'',
              username:'',
              email: '',
              mobile: ''
          },
          //保存请求过来的用户数据
          userRightList:[],        //用户角色列表数据保存
          userData: [],          //用户界面数据保存
          total:0,      //总共数据条数
          //请求用户界面数据参数
        userParms:{
            query:'',       //搜索参数
            pagenum:1,      //请求第几页
            pagesize:5      //一页请求几条
        },
      }
    },
        //组件注册列表
    components:{
      breadcrum_nav,AddUser,UpdateUser,AllotUser
    },
    methods:{
        //分配用户角色按钮
        async allotUserBtn(data){
            this.$refs.comAllotUser.dialogFormVisible = true
            this.allotUserDate = {id:data.id,username:data.username,role_name:data.role_name}
            const result =  await getUserRoleList()
            this.userRightList = result.data
        },
        //删除用户按钮
        delUserBtn(data) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // console.log(data)
                const backDate = await deleteUser(data.id)
                if(backDate.meta.status !== 200) return this.$message.error(backDate.meta.msg)
                this.$message.success(backDate.meta.msg)
                this.getUsers()
                // console.log(backDate)

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //修改用户按钮
        updateShow(data){
            this.$refs.comUpdateUser.dialogVisible = true
            const {id,username,email,mobile} = data
            this.updateUserDate = {id,username,email,mobile}
            // console.log(this.updateUser)
        },
        //添加用户按钮
        addShow(){
            // console.log(this.$refs.comAddUser.dialogVisible)
            this.$refs.comAddUser.dialogVisible = true
        },
        //搜索用户数据
        searchUser(){
            // console.log(this.userParms.query)
            this.userParms.pagenum = 1
            this.getUsers()
        },

        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.userParms.pagesize = val
            this.getUsers()
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.userParms.pagenum = val
            this.getUsers()
        },
        //发送请求获取用户数据
        async getUsers(){
            const backData = await reqUser(this.userParms)
            const {users,total} = backData.data
            if(backData.meta.status !== 200){
                return this.$message.error('获取数据失败')
            }
            users.forEach(item => {
                this.userData.push(item)
            })
            this.userData = users
            this.total = total
            // console.log(users,total)
            // console.log(this.userData)
        },
        //修改用户状态请求函数
        async changeUser(config){
            const {id,mg_state} = config
            const backData = await changeState(id,mg_state)
            // console.log(backData)
            if(backData.meta.status !== 200) return this.$message.error('用户状态修改失败')
            this.$message.success('用户状态修改成功')
        },
        //更新用户数据列表
        showUserList(){
            this.getUsers()
        }
    }
  }
</script>

<style scoped lang="less">

</style>