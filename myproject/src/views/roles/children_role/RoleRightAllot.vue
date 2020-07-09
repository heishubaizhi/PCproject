<template>


  <el-dialog :before-close="handleClose"
             title="分配权限"
             :visible="dialogFormVisible"
             width="50%">
    <el-tree
            ref="tree"
            :data="rightData"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="rightIdShow"
            :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="trueBtn">确 定</el-button>
    </div>
  </el-dialog>


</template>

<script>
  import {getUserRightTreeList,allotRoleRight} from "../../../network/api";

  export default {
    name: "RoleRightAllot",
    props:{
      allotRightDate:{
        type:Object
      },
      showRoleList:{
        type: Function
      }
    },
    created(){
      getUserRightTreeList().then((data) => {
        this.rightData = data.data
      })
    },
    data(){
      return{
        dialogFormVisible:false,
        //权限列表数据（全部权限渲染界面，与树状列表保定了）
        rightData:[],
        //渲染列表数据保存（要勾选哪几项）
        rightIdShow:[],
        //树状列表渲染规则
        defaultProps:{
          children:'children',
          label:'authName'
        }
      }
    },
    methods:{
      //确认按钮
      async trueBtn(){
        // console.log(this.$refs.tree.getHalfCheckedKeys())   //获取半叶子节点id（ui框架里的方法）
        // console.log(this.$refs.tree.getCheckedKeys())       //获取叶子节点的id（ui框架里的方法）
        const roleId = this.allotRightDate.id
        const {getHalfCheckedKeys,getCheckedKeys} = this.$refs.tree   //解构
        const rids = [...getHalfCheckedKeys(),...getCheckedKeys()].join(',');
        const result = await allotRoleRight(roleId,rids)
        if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
        this.$message.success(result.meta.msg)
        // console.log(roleId,allotRight)
        this.dialogFormVisible = false
        this.showRoleList()
      },
      getAllotRightDateId(obj,arr){
        if(!obj.children){
          return arr.push(obj.id)
        }
        obj.children.forEach(item => {
          this.getAllotRightDateId(item,arr)
        })
      },
      //遮罩层或X按钮
      handleClose(){
        this.rightIdShow = []
        this.dialogFormVisible = false
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys([])
        })
        this.$emit('updateRoleRight')
      }
    },
    watch:{
      allotRightDate(newData){
        this.rightIdShow = []
        this.getAllotRightDateId(newData,this.rightIdShow)
      }
    }
  }
</script>

<style scoped>

</style>