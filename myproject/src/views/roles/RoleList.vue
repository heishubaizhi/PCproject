<template>
    <div>
        <Breadcrumb style="margin-bottom: 20px">
            <span slot="index">首页</span>
            <span slot="one">权限管理</span>
            <span slot="tow">角色列表</span>
        </Breadcrumb>
        <el-card class="box-card">
            <el-row style="margin-bottom: 20px">
                <el-button @click="addRoleBtn" type="primary">添加角色</el-button>
            </el-row>
            <el-row>
                <el-table
                        border
                        :data="roleListDate"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <RoleListDetails :rowInfo="scope.row"></RoleListDetails>
                        </template>
                    </el-table-column>
                    <el-table-column type="index" label="#">
                    </el-table-column>
                    <el-table-column
                            prop="roleName"
                            label="角色名称">
                    </el-table-column>
                    <el-table-column
                            prop="roleDesc"
                            label="角色描述">
                    </el-table-column>
                    <el-table-column
                            width="300px"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateRoleBtn(scope)">编辑</el-button>
                            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRoleBtn(scope)">删除</el-button>
                            <el-button type="warning" size="mini" icon="el-icon-setting">分配权限</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-card>
        <RoleListAdd ref="RoleListAdd" @addShowRoleList="addShowRoleList"></RoleListAdd>
        <RoleListUpdate ref="RoleListUpdate" @addShowRoleList="addShowRoleList" :updateRoleDate="updateRoleDate"></RoleListUpdate>
    </div>
</template>

<script>
    import Breadcrumb from "../../components/Breadcrumb";
    import RoleListDetails from "./children_role/RoleListDetails";
    import RoleListAdd from "./children_role/RoleListAdd";
    import RoleListUpdate from "./children_role/RoleListUpdate";
    import {getUserRoleList,deleteUserRole} from "../../network/api";

    export default {
    name: "RoleList",
      components:{Breadcrumb,RoleListDetails,RoleListAdd,RoleListUpdate},
        created() {
            this.showRoleList()
        },
        data(){
        return{
            roleListDate:[],
            updateRoleDate:{
                id:'',
                roleName:'',
                roleDesc:'',
            }
        }
      },
      methods:{
        //编辑角色按钮
          updateRoleBtn(scope){
              // console.log(scope.row)
              this.$refs.RoleListUpdate.dialogFormVisible = true
              this.updateRoleDate = {id:scope.row.id,roleName:scope.row.roleName,roleDesc:scope.row.roleDesc}
              console.log(this.updateRoleDate)
          },
        //删除角色按钮
          deleteRoleBtn(scope){
              this.$confirm('此操作将永久删除该角色 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(async () => {
                  console.log(scope.row)
                  const result = await deleteUserRole(scope.row.id)
                  if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
                  this.$message.success(result.meta.msg)
                  this.showRoleList()
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  });
              });
          },
        //添加角色按钮功能
          addRoleBtn(){
              this.$refs.RoleListAdd.dialogFormVisible = true
          },
          //添加角色后渲染页面（更新页面）
          addShowRoleList(){
              this.showRoleList()
          },
          //获取角色列表并渲染页面
          async showRoleList(){
              const result = await getUserRoleList()
              // console.log(result)
              if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
              // this.$message.success(result.meta.msg)
              this.roleListDate = result.data
          },
      },
  }
</script>

<style scoped>

</style>