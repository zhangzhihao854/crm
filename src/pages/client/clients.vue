<template>
    <div class="clientsMain">
      <div class="title">客户</div>
  <el-row>
 <!-- <el-col :span="6" @click.native='goLingshou'><div class="grid-content"><i><img src="../../../static/images/client_icon_retail_pressed@3x.png" ></i><span>零售客户</span></div></el-col>-->
  <router-link :to="{path: '/clientInform',query:{firstView: '1'}}">
    <el-col :span="6" ><div class="grid-content"><i><img src="../../../static/images/client_icon_retail_pressed@2x.png" ></i><span>零售客户</span></div></el-col>
  </router-link>
<!--  <el-col :span="6" @click.native='goDuiGong'><div class="grid-content"><i><img src="../../../static/images/client_icon_public_pressed@3x.png" ></i><span>对公客户</span></div></el-col>-->
  <router-link :to="{path: '/publicInform',query:{firstView: '1'}}">
    <el-col :span="6"><div class="grid-content"><i><img src="../../../static/images/client_icon_public_pressed@2x.png" ></i><span>对公客户</span></div></el-col>
  </router-link>

  <el-col :span="6" @click.native="goFocus"><div class="grid-content"><i><img src="../../../static/images/client_icon_concern_pressed@2x.png" ></i><span>关注客户</span></div></el-col>
  <el-col :span="6" @click.native="goQianZai"><div class="grid-content" ><i><img src="../../../static/images/client_icon_potential_pressed@2x.png" ></i><span>潜在客户</span></div></el-col>
 </el-row>
 <el-row>
   <!--集团客户先注释掉 现在没这功能-->
  <!--<el-col :span="6"><div class="grid-content1"><i><img src="../../../static/images/client_icon_group_pressed@3x.png" ></i><span>集团客户</span></div></el-col>-->
  <router-link :to="{path: '/clientUsersManage', query: {firstView: 'abc'}}">
    <el-col :span="6"><div class="grid-content1"><i><img src="../../../static/images/client_icon_flock_pressed@2x.png" ></i><span>客户群管理</span></div></el-col>
  </router-link>
  <el-col :span="6" @click.native="goblackName" style="border-right: 1px solid #e5e5e5"><div class="grid-content1"><i><img src="../../../static/images/client_icon_blacklist_pressed@2x.png" ></i><span>客户黑名单</span></div></el-col>
  <!--<el-col :span="6"><div class="grid-content1"><i></i></div></el-col>-->
 </el-row>

      <footer-p></footer-p>
    </div>
</template>



<script>
  import footerP from '../../components/footer/tabBar.vue'
  export default{
    components: {
      footerP
    },
    methods:{
   /* goLingshou(){
      this.$router.push('/clientInform')
    },
    goDuiGong(){
      this.$router.push('/publicInform')
    },*/
    goblackName() {
      this.$router.push('/clientBlackName')
    },
   /* goUsersManage(){
      this.$router.push('/clientUsersManage')
    },*/
    goQianZai(){
      this.$router.push('/clientQianZai')
    },
    goFocus(){
      this.$router.push('/clientFocus')
    }
    }
  }
</script>

<style lang="scss" scoped>
  .title{
    width: 100%;
    height: 44px;
    text-align: center;
    background: #ffffff;
    color: #111111;
    line-height: 44px;
    font-size: 18px;
  }
  .el-row i img{
    width: 40%;
    height: 35px;
    margin-top: 20px;
  }
  .el-col{
    text-align: center;
    background: #ffffff;
  }
  .el-col span{
    display: inline-block;
    text-align: center;
    font-size: 14px;
    letter-spacing:2px;
  }
  .grid-content,.grid-content1{
    border-radius: 1px;
    width: 100%;
    height: 100px;
    border: 1px solid #EAE7E7;
  }
  .grid-content {
    border-right: 0;
  &:last-child{
     border-right: 1px;
   }
  }
  .grid-content1 {
    border-top: 0;
    border-right: 0;
  &:last-child{
     border-right: 1px;
   }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
