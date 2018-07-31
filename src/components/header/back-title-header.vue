<template>
  <div class="page2">
    <header class="mui-bar mui-bar-nav">
      <h3 id='titler' class="mui-title">新建群组</h3>
      <span  @click="backClientUserManage" class=" mui-icon mui-pull-left"> <img src="../../../static/images/back-arrow@2x.png" alt="">返回</span>
    </header>
  </div>
</template>
<script>

  export default {
    data () {
      return {
      }
    },
    methods: {
      backClientUserManage(){
          /*this.$router.push('/clientUsersManage')*/
          this.$router.go(-1)
      }
    },
    components:{
    }
  }
</script>

<style scoped>
  .page2{
    width: 100%;
    height:44px;
  }
  .mui-bar-nav{
    position:fixed;
    top:0;
    left:0;
    height:44px;
    box-shadow:none;
    background:rgba(255,255,255,1) !important;
    border-bottom: 1px solid #e5e5e5;
  }
  .mui-bar-nav .mui-title{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(17,17,17,1);
    line-height:2rem;
  }

  .mui-bar-nav img{
    width:0.62rem;
    border-radius: 1px ;
    vertical-align: middle !important;
    line-height:2rem;
  }

  .page2 .mui-pull-left{
    font-size:0.94rem !important;
    color:rgba(235,55,35,1);
    line-height:2rem;
    z-index: 2000;
    position: relative;
  }
  .page2 .mui-bar .mui-icon{
    padding-top: 4px;
  }
</style>
