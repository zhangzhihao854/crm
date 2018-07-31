<template>
   <div class="mainpage1">
   <div class="jindu">
     <span></span><span></span><span></span><span></span>
   </div>
       <!--<div class="titleBox" v-for="item in slides" @click="goNextPage(item.linkpath)">-->
       	<!--<span class="Imgstyle"><img :src="item.src" width="42px" height="42px"></span>-->
        <!--<span class="Constyle">{{item.context}}</span>-->
       <!--</div>-->
     <div class="titleBox" @click="goNextPage1">
       <span class="Imgstyle"><img src="../../../../static/images/策划与发起@2x.png" width="42px" height="42px"></span>
       <span class="Constyle">活动策划与发起</span>
     </div>

     <div class="titleBox" @click="goNextPage2">
       <span class="Imgstyle"><img src="../../../../static/images/通知下发@2x.png" width="42px" height="42px"></span>
       <span class="Constyle">活动通知下发</span>
     </div>

     <div class="titleBox" @click="goNextPage3">
       <span class="Imgstyle"><img src="../../../../static/images/效果追踪@2x.png" width="42px" height="42px"></span>
       <span class="Constyle">活动效果追踪</span>
     </div>

     <div class="titleBox" @click="goNextPage4">
       <span class="Imgstyle"><img src="../../../../static/images/总结与分析@2x.png" width="42px" height="42px"></span>
       <span class="Constyle">营销活动总结与分析</span>
     </div>




   </div>
</template>

<script>

  export default {
    data () {
  return {
    acturlll:'',
         slides:[
          {context:'活动策划与发起',linkpath:"/activityMain", src:require('../../../../static/images/策划与发起@2x.png')},
          {context:'活动通知下发', linkpath:"/moreInform",src:require('../../../../static/images/通知下发@2x.png')},
          {context:'活动效果追踪', linkpath:this.acturlll,src:require('../../../../static/images/效果追踪@2x.png')},
          {context:'营销活动总结与分析',linkpath:"/moreMarketing", src:require('../../../../static/images/总结与分析@2x.png')}
          ],
//       acturl:'lll'

      }
      },
    props:{
      acturl:{
        type:String,
        default:"lll"
      }
    },
    activated(){
      console.log("woshi hjksadjds ")


    },
      methods:{

        goNextPage1(){

          this.$router.push("/activityMain?flag=activityMain");
        },
        goNextPage2(){

          this.$router.push("/moreInform?init=init");
        },
        goNextPage3(){
          this.acturlll=this.acturl
          this.$router.push(this.acturlll);
          this.$store.state.activeName="0"
        },
        goNextPage4(){

          this.$router.push("/moreMarketing");
        }
      }
  }
</script>

<style scoped>
  .mainpage1{
    padding-top: 10%;
    width: 100%;
    height:100%;
  }
  .Imgstyle{
    display: inline-block;
    margin-top: 9px;
    vertical-align: middle;
    padding-left:10px;

  }
   .titleBox{
   	width: 75%;
   	height:60px;
   	background: #fff;
    border:1px solid #e5e5e5;
    margin-left: 15%;
    margin-top: 20px;
    line-height: 30px;
   }
   .Constyle{
     padding-left:10px;
     font-size: 17px;
   }
   .jindu{
    width: 5px;
    height: 350px;
    background: #E6E6E6;
    float: left;
    margin-left:20px;
    border-radius: 5px;
   }
   .jindu span{
    width: 10px;
    height: 10px;
    display: inline-block;
    position: relative;
    top:-6%;
    margin-top:65px;
    background: #FE7A78;
    margin-left: -2.5px;
    border-radius: 5px;
    box-shadow:0px 0px 6px  #FE7A78;
   }

</style>
