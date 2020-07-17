<template>
  <div>
    <Breadcrumb style="margin-bottom: 20px">
      <span slot="index">首页</span>
      <span slot="one">商品管理</span>
      <span slot="tow">参数列表</span>
    </Breadcrumb>
    <el-card>
      <el-alert
              title="注意：只允许为第三级分类设置相关参数"
              type="warning"
              show-icon
              :closable="false">
      </el-alert>
      <el-row style="margin: 15px 0">
        <span>请选中商品分类：</span>
        <el-cascader
                v-model="selectIds"
                :options="catListData"
                :props="props"
                @change="handleChange"
                clearable
        ></el-cascader>
      </el-row>
      <el-row>
        <el-tabs v-model="select" @tab-click="handleClick" >
          <el-tab-pane label="动态参数" name="first">
            <el-table
                    border
                    :data="reqParamsDate"
                    style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props" >
                  <el-tag>
                    {{ test(props.row)}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column type="index" label="#">
              </el-table-column>
              <el-table-column
                      label="参数名称"
                      prop="attr_name">
              </el-table-column>
              <el-table-column
                      label="操作">
                <el-button type="primary" size="mini">编辑</el-button>
                <el-button type="danger" size="mini">删除</el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="second">配置管理</el-tab-pane>
        </el-tabs>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import Breadcrumb from "../../components/Breadcrumb";
  import {getCategoriesList,getParamsList} from "../../network/api";

  export default {
    name: "ParamsList",
    components:{Breadcrumb},
    data(){
      return{
        //test
        tag:[],
        //选择商品接收的参数数据
        reqParamsDate:[],
        //选项卡选中的值
        select:'first',
        //获取数据的请求参数
        reqParams:{
          type:'',
          pagenum:'',
          pagesize:'',
        },
        //联级选择器保存请求过来的数据，并绑定
        catListData:[],
        //级联选择器的配置
        props:{
          expandTrigger: 'hover',
          label:'cat_name',
          value:'cat_id',
          children:'children',
        },
        //选中项的id
        selectIds:9999
      }
    },
    created() {
      getCategoriesList(this.reqParams).then( _ => {
        // console.log(_)
        this.catListData = _.data
      });
    },
    methods:{
      //test
      test(data){

      },

      //级联选择器变动时触发的时间
      handleChange(val){
        this.selectIds = val[val.length - 1]
        getParamsList(this.selectIds,'many').then(_ => {
          this.reqParamsDate = _.data
          console.log(this.reqParamsDate)
          this.test()
        })
      },
      handleClick(val){
        console.log(val.name)
      }
    }
  }
</script>

<style scoped>

</style>