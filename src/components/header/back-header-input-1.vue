<template>
  <div class="temp3">
    <header class="mui-bar mui-bar-nav">
      <span class=" mui-icon mui-pull-left" @click="goClient"> <img src="../../../static/images/back-arrow@2x.png" alt="">返回</span>
      <input class="searchText" type="text" placeholder="请输入查询条件" v-model="searchText"  @keyup.enter="sendText">
    </header>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        searchText:''
      }
    },
    activated(){
      this.searchText = ''
    },
    methods:{
      sendText(){

          console.log(this.searchText)
          this.$emit('receiveText',this.searchText)
      } ,
      goClient(){
          this.$router.push('/clients')
      }

    }
  }
</script>

<style scoped>

  .temp3{
    height: 44px;
    background:rgba(255,255,255,1) !important
  }
  .temp3 .mui-bar-nav{
    position:fixed;
    top:0;
    height:44px;
    box-shadow:none;
    background:rgba(255,255,255,1);
    border-bottom: 1px solid #e5e5e5;
  }
  .temp3 .mui-bar-nav .mui-title{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(17,17,17,1);
    line-height:3rem;
  }

  .temp3 .mui-bar-nav img{
    width:0.62rem;
    /*height:1.17rem;*/
    /*font-family:PingFangSC-Regular;*/
    /*background:rgba(235,55,35,1);*/
    border-radius: 1px ;
    vertical-align: middle !important;
    line-height:2rem;
  }

  .temp3 .mui-pull-left{
    font-size:0.94rem !important;
    /*font-family:PingFangSC-Regular;*/
    color:rgba(235,55,35,1);
    line-height:2rem;
    z-index: 2000;
    position: relative;
  }
  .temp3 .mui-pull-right{
    font-size:0.94rem !important;
    font-family:PingFangSC-Regular;
    color:rgba(235,55,35,1);
    line-height:1rem;
  }
  .temp3 .mui-bar{
    position: relative;
  }
  .temp3 .searchText{
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
  .temp3 .mui-bar .mui-icon{
    padding-bottom: 0 !important;
  }
</style>
