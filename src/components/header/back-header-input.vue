<template>
  <div class="temp1">
    <header class="mui-bar mui-bar-nav">
      <span @click="goUpPage()" class=" mui-icon mui-pull-left"> <img src="../../../static/images/back-arrow@2x.png" alt="">返回</span>
      <input class="searchText" type="text" placeholder="请输入查询条件" v-model="username" @keyup.enter="sendUserName">
    </header>
  </div>
</template>
<script>
  export default {
    data () {
      return {
         username:''
      }
    },
    activated(){
      this.username = ''
    },
    methods:{
      sendUserName(){
         this.$emit('getUserName',this.username)
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
    height: 44px;
    background:rgba(255,255,255,1) !important
  }
  .mui-bar-nav{
    position:fixed;
    top:0;
    left: 0;
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
  .temp1 .mui-bar .mui-icon{
    padding-bottom: 0 !important;
  }
</style>
