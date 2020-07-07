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
                    <el-input placeholder="请输入内容" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
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
                                >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column width="200px" label="操作">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top-start" :enterable="false">
                        <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                    </el-tooltip>

                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start" :enterable="false">
                        <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
                    </el-tooltip>

                    <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start" :enterable="false">
                        <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
                    </el-tooltip>
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

    </div>
</template>

<script>
    import breadcrum_nav from 'components/Breadcrumb'
    import {reqUser} from "../../network/api";
    export default {
    name: "UserList",
    created() {
        this.getUsers()
    },
    data(){
      return{
        userData: [],
          total:0,
        userParms:{
            query:'',
            pagenum:1,
            pagesize:2
        }
      }
    },
    components:{
      breadcrum_nav
    },
    methods:{
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
            console.log(this.userData)
        }
    }

  }
</script>

<style scoped lang="less">

</style>