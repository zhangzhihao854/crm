<template>
  <div class="page2">
    <header class="mui-bar mui-bar-nav">
      <h3 id='titler' class="mui-title">{{title}}</h3>
      <span  class=" mui-icon mui-pull-left" @click="goUppage"> <img src="../../../static/images/back-arrow@2x.png" alt="">返回</span>
    </header>
  </div>
</template>
<script>

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },

      flag: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
      }
    },
    methods: {
      goUppage(){
        this.$router.go(-1)
      }
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
  .mui-bar-nav img[data-v-6e38af4f]{
    margin-right: 0.416rem;
  }
</style>
