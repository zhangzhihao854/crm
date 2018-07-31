<template>
  <div class="temp1">
    <header class="mui-bar mui-bar-nav">
      <h3 id='titler' class="mui-title" ref="nav">客户群管理</h3>
      <span  class=" mui-icon mui-pull-left" @click="goUpPage()"> <img src="../../../static/images/back-arrow@2x.png" alt="">返回</span>
      <span class="addBtn" @click="goClientGroup1">+</span>
    </header>
  </div>
</template>
<script>

  export default {
  /*  props: {
      flag: {
            type: String,
            default: ''
        }
    },*/
    data () {
      return {
      }
    },
    methods: {
      goClientGroup1(){
         this.$router.push('/clientGroup1')
      },

      goUpPage(){
//            alert(this.flag);
        console.log(this.flag)
        if(this.$route.query.aaa){
          this.$router.go(-1);
        }
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
          this.$router.push('/job?num=3')
        }
        else if(this.flag==7){
          this.$router.go(-1);
        }
        else if(this.flag==8){
          this.$router.push('/clients')
        }
        else if(this.flag==10){
//            this.$router.push('/Manager?date=3')
          this.$router.go(-1);
        }else if(this.$route.query.firstView == 'abc' ){
          this.$router.push('/clients')
        }
        else{
          this.$router.push('/main')
        }
      }

    },
    components:{
    }
  }
</script>

<style scoped>
  .temp1{
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

  .temp1 .mui-pull-left{
    font-size:0.94rem !important;
    color:rgba(235,55,35,1);
    line-height:2rem;
    z-index: 2000;
    position: relative;
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
  .mui-bar .mui-icon{
    padding-top: 6px;
  }
</style>
