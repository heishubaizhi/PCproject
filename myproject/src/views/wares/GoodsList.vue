<template>
  <div>
    <Breadcrumb style="margin-bottom: 20px">
      <span slot="index">首页</span>
      <span slot="one">商品管理</span>
      <span slot="tow">商品列表</span>
    </Breadcrumb>
    <el-card>
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="10">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="goodsListData" border style="font-size: 12px">
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column prop="goods_name" width="500px" label="商品名称"></el-table-column>
          <el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
          <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
          <el-table-column prop="add_time" label="创建时间"></el-table-column>
          <el-table-column width="120px" label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top-start" :enterable="false">
                <el-button type="primary" size="mini" icon="el-icon-edit" ></el-button>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="删除" placement="top-start" :enterable="false">
                <el-button type="danger" size="mini" icon="el-icon-delete" ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-pagination
                style="margin-top: 10px"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.pagenum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="params.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
      </el-row>
    </el-card>


  </div>

</template>

<script>
  import Breadcrumb from "../../components/Breadcrumb";
  import {getGoodsList} from "../../network/api";

  export default {
    name: "WaresList",
    components:{Breadcrumb},
    created() {
      this.getGoodsListDate()
    },
    data(){
      return{
        params:{
          type:'',
          pagenum:1,
          pagesize:10
        },
        goodsListData:[],
        total:0
      }
    },
    methods:{
      handleCurrentChange(val){
        this.params.pagenum = val
        this.getGoodsListDate()
      },
      handleSizeChange(val){
        this.params.pagesize = val
        this.getGoodsListDate()
      },
      //获取数据，渲染页面
      async getGoodsListDate(){
        const result = await getGoodsList(this.params).then(data => {
          this.goodsListData = data.data.goods
          this.total = data.data.total
        })
      }
    }
  }
</script>

<style scoped>

</style>