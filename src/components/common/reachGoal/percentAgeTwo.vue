<template>
  <div>
    <div class="top">
      <p class="info">{{bfbtitle}}</p>
      <div class="cir" >
        <el-progress type="circle" :percentage=baifenbi1 class="progess" :show-text="false" ></el-progress>
        <span class="jin">
          {{baifenbi1Big}}%<br>
          金额</span>


        <el-progress type="circle" :percentage=baifenbi2 class="progess fr" :show-text="false" ></el-progress>
        <span class="mu">
           {{baifenbi2Big}}%<br>
           笔数</span>

      </div>
    </div>
    </div>
</template>

<style scoped>
  .info{
    color:rgb(32, 160, 255);
    padding-left:1rem;
    padding-top:1rem;
  }
.cir{
  /*text-align: center;*/
  padding-left: 2em;
  padding-right: 2em;
  position: relative;
  padding-bottom:1rem;
}
.fr{
  float: right;
}
  .top{
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }
 span{
   position: absolute;
   color:rgb(32, 160, 255);
 }
  .jin{
    display: inline-block;
    width: 100px;
    text-align: center;
    top: 2.8em;
    left: 2.6em;
   }
  .mu{
    display: inline-block;
    width: 80px;
    text-align: center;


  }
  .el-progress__text{
    color:rgb(32, 160, 255);
  }
</style>

<script type=text/ecmascript-6>
    export default{

      props:{
        baifenbi1:{
          type:Number,
          default:0
        },
        baifenbi1Big:{
          type:Number,
          default:0
        },
        baifenbi2:{
          type:Number,
          default:0
        },
        baifenbi2Big:{
          type:Number,
          default:0
        },
        bfbtitle:{
          type:String,
          default:""
        }
      },
    created(){
    },
    }
</script>

