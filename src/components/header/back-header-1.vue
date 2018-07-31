<template>
  <div class="temp1">
    <header class="mui-bar mui-bar-nav">
      <h3 id='titler' class="mui-title" ref="nav">{{title}}</h3>
      <span @click="goPage()" class=" mui-icon mui-pull-left"> <img src="../../../static/images/back-arrow@2x.png" alt="">返回</span>
    </header>

    <!--<div class="nav">-->
      <!--<h3 id='titler'  ref="nav">{{title}}</h3>-->
      <!--<span @click="goUpPage()" > <img src="../../../static/images/back-arrow@2x.png" alt="">返回</span>-->


    <!--</div>-->
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
      mounted(){
         console.log(this.flag+'！！！！！')
      },
      methods:{
        goPage(){
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
          else if(this.flag=='activitynoflag'){
            this.$router.push('/activityMain')
          }

          else if(this.flag==10){
//            this.$router.push('/Manager?date=3')
            this.$router.go(-1);
          }else if(this.flag=="moreMainPage"){
          this.$router.push('/moreMainPage')
          }else if(this.flag=="activitygo"){
            this.$router.push('/ActivityList')
          }

          else if(this.$route.query.flag==111) {

            this.$router.push('/main')

          }else{
            this.$router.go(-1);
          }
        }
      }
    }
</script>

<style scoped>

.temp1{
  /*height: 44px;*/
  background:rgba(255,255,255,1) !important;

}
  .mui-bar-nav{
    position:fixed;
    top:0;
    left: 0;
    height:44px;
    box-shadow:none;
    background:rgba(255,255,255,1);
    border-bottom: 1px solid #e5e5e5;
    /*z-index: 1000;*/
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
  .temp1 .mui-bar .mui-title{
    left: 49px !important;
  }
.temp1 .calendar-tools[data-v-c9634d5e]{
  line-height: 41px !important;
}
.temp1 .mui-bar-nav .mui-title[data-v-a2006ea4]{
  line-height: 2.5rem;
}
.temp1 .mui-bar .mui-icon{
  padding-top: 7px !important;
  padding-bottom: 0px !important;
}
</style>
