<template>
  <div class="temp1">
    <header class="mui-bar mui-bar-nav">
      <span @click="goClientPage" class=" mui-icon mui-pull-left"> <img src="../../../static/images/back-arrow@2x.png" alt="">返回</span>
      <input class="searchText" type="text" placeholder="请输入查询条件" v-model="searchContent" @keyup.enter="sendSearchContent">
      <router-link v-show="isManage" :to="{path: '/customerInput', query: {flag: 'clientQianzai'}}">
        <span class="addBtn">+</span>
      </router-link>
    </header>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  export default {
    props:{
      isManage: {
          type:Boolean,
          default: false
      }
    },
    data () {
      return {
         searchContent: ''
      }
    },
    activated(){
      console.log(this.isManage+"isManage")
    },
    methods:{
      /*返回客户模块首页*/
      goClientPage(){
        this.$router.push('/clients')
        this.searchContent = ''
      },
      sendSearchContent(){
         /*if(this.searchContent.trim() == ''){
           MessageBox('提示', '输入内容不能为空！');
         }*/
         this.$emit('getSearchName',this.searchContent)
      },
      /*点击头部加号，跳转至工作日报，潜客录入界面*/
      goQianke(){
          this.$router.push('/customerInput')
      }

    }
  }
</script>

<style scoped>

  .temp1{
    height: 44px;
    background:rgba(255,255,255,1) !important
  }
  .mui-bar-nav{
    position:fixed;
    top:0;
    height:44px;
    box-shadow:none;
    background:rgba(255,255,255,1);
    border-bottom: 1px solid #e5e5e5;
  }
  .mui-bar-nav .mui-title{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(17,17,17,1);
    line-height:3rem;
  }

  .mui-bar-nav img{
    width:0.62rem;
    /*height:1.17rem;*/
    /*font-family:PingFangSC-Regular;*/
    /*background:rgba(235,55,35,1);*/
    border-radius: 1px ;
    vertical-align: middle !important;
    line-height:2rem;
  }

  .temp1 .mui-pull-left{
    font-size:0.94rem !important;
    /*font-family:PingFangSC-Regular;*/
    color:rgba(235,55,35,1);
    line-height:2rem;
    z-index: 2000;
    position: relative;
  }
  .temp1 .mui-pull-right{
    font-size:0.94rem !important;
    font-family:PingFangSC-Regular;
    color:rgba(235,55,35,1);
    line-height:1rem;
  }
  .temp1 .mui-bar{
    position: relative;
  }
  .searchText{
    width: 13.3rem;
    height: 1.5rem;
    margin-bottom: 0;
    background: #F8F9FB;
    position: absolute;
    top: 0.43rem;
    left: 4.3rem;
    z-index: 88;
    outline: none !important;
    font-size: 0.69rem;
  }
  .mui-bar .addBtn{
    position: absolute;
    right:0.527rem;
    bottom: 0.75rem;
    width:1.05rem;
    height:1.05rem;
    color: rgba(235,55,35,1);
    font-size: 1.5rem;
  }
  .temp1 .mui-bar .mui-icon{
    padding-bottom: 0 !important;
  }
</style>
