<template>
  <el-dialog title="添加分类" :visible="dialogFormVisible" :before-close="handleClose">
    <el-form label-width="90px">
      <el-form-item label="分类名称：" >
        <el-input  autocomplete="off" v-model="addCatDate.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="角色描述：" >
        <el-cascader
                clearable
                v-model="selectId"
                :options="addCategoriesListData"
                :props="props"
                @change="handleChange"></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="trueBtn">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {addCategories} from "../../../network/api";

  export default {
    props:{
      addCategoriesListData:{
        type:Array
      }
    },
    name: "CategoriesListAdd",
    data(){
      return{
        dialogFormVisible:false,
        props:{
          expandTrigger: 'hover',
          label:'cat_name',
          value:'cat_id',
          children:'children',
          checkStrictly:true
        },
        selectId:[],

        addCatDate:{
          cat_pid:0,    //添加时的父ID
          cat_name:'',    //添加时的名称
          cat_level:0,     //添加在第几层
        }
      }
    },
    methods:{
      async trueBtn(){
        if(this.addCatDate.cat_name === '') return this.$message.error('请输入名称')
        const result = await addCategories(this.addCatDate)
        if(result.meta.status !== 201) return this.$message.error(result.meta.msg)
        this.$message.success(result.meta.msg)
        this.addCatDate.cat_name = ''
        this.selectId = []
        this.dialogFormVisible = false
        this.$emit('showCategoriesList')
      },
      handleChange(val){
        if(val.length === 0){
          this.addCatDate.cat_pid = 0
        }
        this.addCatDate.cat_pid = val[val.length - 1]
        this.addCatDate.cat_level = val.length
      },
      //遮罩层和X按钮
      handleClose(){
        this.dialogFormVisible = false
        this.selectId = []
        this.addCatDate.cat_name = ''
      }
    }
  }
</script>

<style scoped>

</style>