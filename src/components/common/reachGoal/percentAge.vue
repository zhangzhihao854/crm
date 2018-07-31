<template>
  <div>
    <div class="top">
      <p class="info">{{bfbTitle}}</p>
      <div class="cir">
        <el-progress type="circle" :percentage=baifenbi class="progess" :show-text="false" >
        </el-progress>
         <!--<span class="jin">-->
          <!--{{baifenbi1Big}}%<br>-->
          <!--金额</span>-->
        <p id="bfbzi">{{baifenbiBig}}%</p>
        <p id="bfbinfo">金额</p>

      </div>
    </div>
    </div>
</template>

<style scoped>
  .info{
    color:rgb(32, 160, 255);
    height: 1.94rem;
    line-height:2.47rem;
    margin-left: 0.8rem;
    font-size:0.75rem;
    font-family:PingFangSC-Regular;
  }
.cir{
  text-align: center;
  /*margin-left:35%;*/
  position: relative;
  padding-bottom:1.54rem;
}
#bfbzi{
  /*position: absolute;*/
  /*left: 27%;*/
  /*bottom: 60%;*/
  /*color: #088CFF;*/
  /*display: inline-block;*/
  /*width: 47%;*/
  /*text-align: center;*/

  position: absolute;
  top:20%;
  color:#088CFF;
  width: 100%;
  text-align: center;
  font-size: 0.97rem;
}
  #bfbinfo{
    /*position: absolute;*/
    /*left: 42%;*/
    /*bottom:45%;*/
    /*color:#088CFF;*/
    position: absolute;
    top:42%;
    color:#088CFF;
    width: 100%;
    text-align: center;
    font-size: 0.97rem;


  }
  .top{
    /*border-top: 1px solid #e5e5e5;*/
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
  }
</style>

<script type=text/ecmascript-6>

  export default{
      props:{
        baifenbi:{
          type:Number,
          default:0
        },
        baifenbiBig:{
          type:Number,
          default:0
        },
        bfbTitle:{
          type:String,
          default:""
        }
      }

    }
</script>

