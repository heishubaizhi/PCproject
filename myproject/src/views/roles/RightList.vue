<template>
    <div>
        <Breadcrumb style="margin-bottom: 20px">
            <span slot="index">首页</span>
            <span slot="one">权限管理</span>
            <span slot="tow">权限列表</span>
        </Breadcrumb>
        <el-card class="box-card">
            <el-table
                    border
                    :data="rightListDate"
                    style="width: 100%">
                <el-table-column type="index" label="#">
                </el-table-column>
                <el-table-column
                        prop="authName"
                        label="权限名称">
                </el-table-column>
                <el-table-column
                        prop="path"
                        label="路径">
                </el-table-column>
                <el-table-column
                        label="权限等级">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                        <el-tag type="success" v-else-if = 'scope.row.level === "1"'>二级</el-tag>
                        <el-tag type="warning" v-else>三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>


</template>

<script>
  import Breadcrumb from "../../components/Breadcrumb";
  import {getUserRightList} from "../../network/api";

  export default {
    name: "RightList",
    components:{Breadcrumb},
    async created() {
      console.log('请求数据')
      const result = await getUserRightList()
        this.rightListDate = result.data
      // console.log(result)
    },
    data(){
      return{
        rightListDate:[],

      }
    }
  }
</script>

<style scoped>

</style>