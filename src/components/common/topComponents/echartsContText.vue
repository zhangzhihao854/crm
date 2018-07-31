<template>
   <div class="echartsContText">
  <el-row>
    <el-col :span="8">
    <div class="itemstyle">
      <i>{{slides.context}} </i></div>
    <span class='color1'>
      {{(this.slidesmore.wholeAmount/10000).toFixed(0)}}
    </span>万元 </el-col>

    <el-col :span="8" v-if="this.slidesmore.wholeyearAmount<0">
      <div class="itemstyle">
        <i>比年初降 </i> </div>
      <span class='color1'>{{-(this.slidesmore.wholeyearAmount/10000).toFixed(0)}}</span>万元 </el-col>
    <el-col :span="8" v-else="">
      <div class="itemstyle">
        <i>比年初增 </i> </div>
      <span class='color1' v-if="this.slidesmore.wholeyearAmount>=0">{{(this.slidesmore.wholeyearAmount/10000).toFixed(0)}}</span>
      <span class='color1' v-else="this.slidesmore.wholeyearAmount='undefined'">0</span>
      万元
    </el-col>

    <el-col :span="8" v-if="this.slidesmore.wholemonthAmount>=0">
      <div class="itemstyle">
        <i>比上月增</i> </div>
      <span class='color1'>{{(this.slidesmore.wholemonthAmount/10000).toFixed(0)}}</span>万元 </el-col>

    <el-col :span="8" v-else="">
      <div class="itemstyle">
        <i>比上月降</i> </div>
      <span class='color1' v-if="this.slidesmore.wholemonthAmount<0">{{-(this.slidesmore.wholemonthAmount/10000).toFixed(0)}}</span>
      <span class='color1' v-else="this.slidesmore.wholemonthAmount='undefined'">0</span>
      万元 </el-col>
  </el-row>
   </div>
</template>

<script>
  export default {
   components:{
    },
    data () {
     return {
       slides:{
          context:'全行存款',context1:'比年初增',context2:'比上月降',
//          conT:'222222',conT1:'222222',conT2:'222222'
       }
      }
      },
    activated(){
      this.slides.conT=this.slidesmore.wholeAmount
      this.slides.conT1=this.slidesmore.wholeyearAmount
      this.slides.conT2=this.slidesmore.wholemonthAmount
    },

    props:{
      slidesmore:{
        type:Object,
        default:{}
      }
    },
      methods:{

        }
      }

</script>

<style scoped>
.echartsContText{
}
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    text-align: center;
  }
  .itemstyle{
    border-right:1px solid #ddd;
    margin-top: 10px;
  }
  .itemstyle:last-child{

  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .itemstyle i{
    font-size: 14px;
    color: #555555;
  }
  .color1,.color2,.color3,.color4{
    display: inline-block;
    font-size: 14px;
  }
  .color1{
    margin-top: 8px;
    color:rgb(255,127,56);
    font-size: 14px;
    font-weight: 600;
  }

</style>
