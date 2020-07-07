<template>
    <el-aside :width="menuFlag ? '64px' : '200px'">
      <div class="menu_btn" @click="menuBtn" :width="menuFlag ? '64px' : '200px'">|||</div>
      <el-menu
              :default-active="routerJump"
              :collapse-transition="false"
              unique-opened
              router
              :collapse="menuFlag"
              background-color="#333744"
              text-color="#fff"
              active-text-color="#ffd04b">
        <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
          <template slot="title">
            <i :class="menuIcons[item.id]" style="margin-right: 10px"></i>
            <span>{{ item.authName }}</span>
          </template>
          <el-menu-item :index="'/'+cItem.path + ''"   v-for="cItem in item.children" :key="cItem.id" >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{ cItem.authName }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
</template>
<script>
  import {reqMenu} from "network/api";

  export default {
    created() {
      this.getMenu()
    },
    name: "Menu",
    data(){
      return{
        menuList:[],
        menuFlag:false,
        menuIcons:{
          '125': 'iconfont icon-user',
          '103': 'iconfont icon-tijikongjian',
          '101': 'iconfont icon-shangpin',
          '102': 'iconfont icon-danju',
          '145': 'iconfont icon-baobiao',
        },

      }
    },
    methods:{
      async getMenu() {
        const result = await reqMenu()
        if (result.meta.status !== 200) return this.$message.error("获取导航栏信息失败")
        this.menuList = result.data
        // console.log(this.menuList)
      },
      menuBtn(){
        this.menuFlag = !this.menuFlag
        console.log(this.menuFlag)
      },

    },
    computed:{
      routerJump(){
        const routeList = []
        this.menuList.forEach(item => {
          item.children.forEach(cItem => {
            routeList.push('/'+cItem.path)
          })
        })
        const backPath = routeList.find(item => {
          return this.$route.path.indexOf(item) >= 0
        })

        return backPath

      }
    }
  }
</script>

<style scoped lang="less">
  .el-aside{
    height: 100%;
    background: #333744;

    .menu_btn{
      background: #4A5064;
      text-align: center;
      font-size: 12px;
      line-height: 24px;
      color: white;
      cursor: pointer;
    }

    .el-menu{
      border-right: none;
    }
  }
</style>