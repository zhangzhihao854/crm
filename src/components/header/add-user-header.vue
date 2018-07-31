<template>
  <div class="page4">
    <header class="mui-bar mui-bar-nav">
      <h3 id='titler' class="mui-title" ref="nav">添加客户</h3>
      <span   @click="goDetail" class=" mui-icon mui-pull-left"> <img src="../../../static/images/back-arrow@2x.png" alt="">返回</span>
      <img class="shaixuan" src="../../../static/images/筛选@2x.png" alt="筛选" @click="showPage6">
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
      goDetail(){
         this.$router.go(-1)
      },
      showPage6(){
        this.$emit('showShaiXuan')
      }
    }
  }
</script>

<style scoped>
  .page4{
    width: 100%;
    height:44px;
  }
  .page4 .mui-bar-nav{
    position:fixed;
    top:0;
    left:0;
    height:44px;
    box-shadow:none;
    background:rgba(255,255,255,1) !important;
    border-bottom: 1px solid #e5e5e5;
  }
  .page4 .mui-bar-nav .mui-title{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(17,17,17,1);
    line-height:2rem;
  }

  .page4 .mui-bar-nav img{
    width:0.62rem;
    border-radius: 1px ;
    vertical-align: middle !important;
    line-height:2rem;
  }

  .page4 .mui-pull-left{
    font-size:0.94rem !important;
    color:rgba(235,55,35,1);
    line-height:1rem;
    z-index: 2000;
    position: relative;
  }
  .page4 .shaixuan{
    position:absolute;
    right: 0.5rem;
    top:0.5rem;
    width:1.16rem !important;
    height:1.25rem !important;
    vertical-align: middle;
  }
</style>
