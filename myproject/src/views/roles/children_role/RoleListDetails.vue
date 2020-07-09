<template>

  <div>
    <el-row v-for="item in UserRoleListData" :key="item.id" class="row_box">
      <el-col :span="5">
        <el-tag @close="deleteBtn(item.id)" closable>{{ item.authName }}</el-tag>
        <i class="el-icon-caret-right"></i>
      </el-col>
      <el-col :span="19">
        <el-row v-for="citem in item.children" :key="citem.id" class="row_inbox">
          <el-col :span="6">
            <el-tag @close="deleteBtn(citem.id)" closable type="success">{{ citem.authName }}</el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>
          <el-col :span="18">
            <el-tag @close="deleteBtn(ccitem.id)" closable type="warning" v-for="ccitem in citem.children" :key="ccitem.id">{{ ccitem.authName }}</el-tag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>



</template>

<script>
  import {deleteUserRight} from "../../../network/api";

  export default {
    name: "RoleListDetails",
    props:{
      rowInfo:{
        type:Object,
        default(){
          return
        }
      }
    },
    async created() {
      this.UserRoleListData = this.rowInfo.children
    },
    data(){
      return{
        UserRoleListData:[]
      }
    },
    methods:{
      async deleteBtn(id){
        // console.log(id,this.rowInfo.id)
        const result = await deleteUserRight(this.rowInfo.id,id)
        if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
        this.$message.success(result.meta.msg)
        this.UserRoleListData = result.data
        this.rowInfo.children = result.data
      }
    }
  }
</script>

<style scoped lang="less">
  .el-row{
    display: flex;
    align-items: center;
  }
  .row_box{
    border-top: 1px solid rgba(0,0,0,0.1);

  }
  .row_box:last-child{
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
  .row_inbox{
    margin: 5px 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
  .row_inbox:last-child{
    border-bottom:none;
  }

  .el-tag{
    margin: 5px 5px;
  }
</style>