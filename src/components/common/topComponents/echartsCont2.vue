<template>
   <div class="echarCont">
 <!--   <div v-for='(item,index)in slides' :key='index'>
   <div class="itemstyle"><i>{{slides.co}}</i></div>
   <span :class='color1'>{{slides.conTT}}</span>
   </div>
    -->
     <el-row>
      <el-col :span="6">
        <div class="itemstyle">
        <i class="fonts">{{((listHeader.amount*1)/10000).toFixed(0)}}万</i>
        <i v-if="listHeader.yearAmount<0" class='redC'>&nbsp;</i>
        <i v-if="listHeader.yearAmount>0" class='greenC'>&nbsp; </i>
      </div>
        <span class='color1'>{{headTit}}</span>
      </el-col>

    <el-col :span="6" v-if="listHeader.yearAmount<0">
      <div class="itemstyle" >
        <i class="fonts">{{((-listHeader.yearAmount*1)/10000).toFixed(0)}}万</i>
        <i  class='redC'>↓</i></div>
      <span class='color2'>比年初降</span>
    </el-col>
    <el-col :span="6" v-else="listHeader.yearAmount>=0">
      <div class="itemstyle">
        <i class="fonts">{{((listHeader.yearAmount*1)/10000).toFixed(0)}}万</i>
        <i class='greenC'>↑ </i></div>
      <span class='color2'>比年初增</span>
    </el-col>
<!--    <el-col :span="6" v-else="listHeader.yearAmount='undefined'">
      <div class="itemstyle">
        <i class="fonts">0万</i>
        <i class='greenC'>↑ </i></div>
      <span class='color2'>比年初增</span>
    </el-col>-->


    <el-col :span="6" v-if="listHeader.monthAmount<0">
      <div class="itemstyle">
        <i class="fonts">{{((-listHeader.monthAmount*1)/10000).toFixed(0)}}万</i>
        <i  class='redC'>↓</i></div>
      <span class='color3'>比上月降</span>
    </el-col>
    <el-col :span="6" v-else="listHeader.monthAmount>=0">
      <div class="itemstyle">
        <i class="fonts">{{((listHeader.monthAmount*1)/10000).toFixed(0)}}万</i>
        <i class='greenC'>↑ </i></div>
      <span class='color3'>比上月增</span>
    </el-col>
<!--    <el-col :span="6" v-else="listHeader.monthAmount='undefined'">
      <div class="itemstyle">
        <i class="fonts">0万</i>
        <i class='greenC'>↑ </i></div>
      <span class='color3'>比上月增</span>
    </el-col>-->



    <el-col :span="6" v-if="listHeader.dayAmount<0">
      <div class="itemstyle">
        <i class="fonts">{{((-listHeader.dayAmount*1)/10000).toFixed(0)}}万</i>
        <i  class='redC'>↓</i></div>
      <span class='color4'>比昨日降</span>
    </el-col>
    <el-col :span="6" v-else="listHeader.dayAmount>=0">
      <div class="itemstyle">
        <i class="fonts">{{((listHeader.dayAmount*1)/10000).toFixed(0)}}万</i>
        <i class='greenC'>↑ </i></div>
      <span class='color4'>比昨日增</span>
    </el-col>

<!--    <el-col :span="6" v-else="listHeader.dayAmount='undefined'">
      <div class="itemstyle">
        <i class="fonts">0万</i>
        <i class='greenC'>↑ </i></div>
      <span class='color4'>比昨日增</span>
    </el-col>-->

</el-row>
   </div>
</template>

<script>
  export default {
     props:{
       sxjt:{
         type:Number,
         default:0
       },
       bsy:{
         type:Number,
         default:0
       },
       bzr:{
         type:Number,
         default:0
       },
       headTit:{
         type:String,
         default:''
       },
       listHeader: {
         type:Object,
         default:function () {
           return {}
         }
       }
      },
      data () {
        return {
        }
      },
      mounted(){
         console.log('props值')
         console.log(this.listHeader)
      }
    }

</script>

<style lang='scss' scoped>

  .el-row {
    margin-bottom: 10px !important;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 1px;
    text-align: center;
  }
  .itemstyle{
    border-right:1px solid #ddd;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .grid-content {
    border-radius: 1px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .itemstyle i{
    font-size: 20px;
    color: #768893;
  }
  .color1,.color2,.color3,.color4{
    display: inline-block;
    font-size: 14px;
  }
  .color1{
    color: #3BBAFF;
  }
   .color2{
    color:#8855FB;
  }
   .color3{
    color:  #F8A837;
  }
   .color4{
    color:#5A79FE;
  }
  .greenC{
    color:#33ff00!important;
    font-size:12px!important;
  }
  .redC{
    color:#ff0000!important;
    font-size:12px!important;
  }
  .fonts{
      font-size: 14px !important;
  }
  .echarCont .itemstyle i[data-v-57f661be]{
    font-size: 0.8rem !important;
  }
  .echarCont .color1[data-v-57f661be]{
    font-size: 0.8rem !important;
  }
</style>
