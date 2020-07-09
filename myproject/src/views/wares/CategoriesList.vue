<template>
  <div>
    <Breadcrumb style="margin-bottom: 20px">
      <span slot="index">首页</span>
      <span slot="one">商品管理</span>
      <span slot="tow">商品分类</span>
    </Breadcrumb>
    <el-card>
      <el-button type="primary" style="margin-bottom: 20px">添加分类</el-button>
      <ZkTable
              :data="CategoriesListData"
              :columns="columns"
              :selection-type="false"
              :expand-type="false"
              index-text="#"
              border
              :show-index="true"
              :show-row-hover="false"
      >
        <template slot="isOk" slot-scope="scope">
          <i class="el-icon-success" v-if="!scope.row.cat_deleted" style="color: greenyellow"></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>

        <template slot="sort" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag type="warning" v-else-if="scope.row.cat_level == 1">二级</el-tag>
          <el-tag type="danger" v-else>三级</el-tag>
        </template>

        <template slot="operate" slot-scope="scope">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>

      </ZkTable>

      <el-pagination
              style="margin-top: 10px"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="reqParams.pagenum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="reqParams.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </el-card>


  </div>
</template>

<script>
  import Breadcrumb from "../../components/Breadcrumb";
  import {getCategoriesList} from "../../network/api";

  export default {
    name: "Categories",
    components:{Breadcrumb},
    created(){
      this.showCategoriesListDate()
    },
    data(){
      return{
        total:0,
        reqParams:{
          type:'',
          pagenum:1,
          pagesize:5,
        },
        CategoriesListData:[],
        columns:[
          {
            label:'分类名称',
            prop:'cat_name'
          },
          {
            label:'是否有效',
            type:'template',
            template:'isOk'
          },
          {
            label:'排序',
            type:'template',
            template:'sort'
          },
          {
            label:'操作',
            type:'template',
            template: 'operate'

          }
        ]
      }
    },
    methods:{
      handleSizeChange(val){
        this.reqParams.pagesize = val
        this.showCategoriesListDate()
      },
      handleCurrentChange(val){
        this.reqParams.pagenum = val
        this.showCategoriesListDate()
      },
      showCategoriesListDate(){
        getCategoriesList(this.reqParams).then(data => {
          this.CategoriesListData = data.data.result
          // console.log(data.data)
          this.total = data.data.total
        })
      }
    }
  }
</script>

<style scoped>

</style>