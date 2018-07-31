<template>
  <div class="temp1">
    <header class="mui-bar mui-bar-nav">
      <h3 id='titler' class="mui-title" ref="nav">{{title}}</h3>
      <span @click="goUpPage()" class=" mui-pull-left el-icon-arrow-left">
        <!--<img src="../../../static/images/back-arrow@2x.png" alt="">-->
      </span>
    </header>
  </div>
</template>
<script>
    export default {
      data () {
        return {
        }
      },
      props: {
        title: {
          type: String,
          default: ''
        },
        path: {
          type: String,
          default: ''
        },
        flag: {
          type: String,
          default: ''
        }
      },
      methods:{
        goUpPage(){
          this.$router.push(this.path);
        }
      }
    }
</script>

<style scoped>

.temp1{
  height: 44px;
  background:#FF4E3B !important;
}
  .mui-bar-nav{
    position:fixed;
    top:0;
    left: 0;
    height:44px;
    box-shadow:none;
    background:#FF4E3B !important;
    /*border-bottom: 1px solid #e5e5e5;*/
  }
  .mui-bar-nav .mui-title{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:#fff;
    line-height:44px;
  }
  .temp1 .mui-pull-left{
    font-size:0.94rem !important;
    /*font-family:PingFangSC-Regular;*/
    color:#fff;
    line-height:44px;
    z-index: 2000;
    position: relative;
  }



</style>
