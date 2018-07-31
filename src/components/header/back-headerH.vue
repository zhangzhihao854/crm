<template>
  <!--/*此插件为 屏幕为横屏的时候使用*/-->
  <div class="temp1">
    <header class="mui-bar mui-bar-nav">
      <h3 id='titler' class="mui-title" ref="nav">{{title}}</h3>
      <span @click="goUpPage()" class=" mui-icon mui-pull-left"> <img src="../../../static/images/back-arrow@2x.png" alt="">返回</span>
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

        flag: {
          type: String,
          default: ''
        }
      },
      methods:{
        goUpPage(){
//          alert(this.flag)
          if(this.flag==1){
            this.$router.push('/main')
          }
         else if(this.flag==2){
            this.$router.push('/job?num=3')
          }else if(this.flag==3){
            this.$router.push('/main')
          }
          else if(this.flag==4){
            this.$router.push('/job?num=3')
          }
          else if(this.flag==5){
//            alert("==>"+this.flag)
            this.$router.push('/job?num=3')
          }
          else if(this.flag==7){
//            alert("==>"+this.flag)
            this.$router.go(-1);
          }
          else{
            this.$router.go(-1);
          }
        }
      }
    }
</script>

<style scoped>

.temp1{
  position:relative;
  z-index: -99;
  width:100%;
  height: 44px;
  background:rgba(255,255,255,1) !important;
}
.mui-bar-nav {
  /*top: 20px !important;*/
  /*z-index: 9999999;*/
}
  .mui-bar-nav{
    position: fixed;
    left: 0;
    top: 0;
    height:44px;
    box-shadow:none;
    background:rgba(255,255,255,1);
    border-bottom: 1px solid #e5e5e5;
  }
  .mui-bar-nav .mui-title{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(17,17,17,1);
    line-height:44px;
  }

  .mui-bar-nav img{
    width:0.62rem;
    /*height:1.17rem;*/
    /*font-family:PingFangSC-Regular;*/
    /*background:rgba(235,55,35,1);*/
    border-radius: 1px ;
    vertical-align: middle !important;
    line-height: 44px;
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
.temp1 .mui-bar .mui-icon{
  padding-top: 7px !important;
  padding-bottom: 0px !important;
}
</style>
