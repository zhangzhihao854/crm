<template>
   <div class="echarCont" >
    <el-row class="echartRow">
      <el-col :span="3"><div class="itemstyle">
        <i class="fonts" v-if="listHeader.amount>=0">{{((listHeader.amount*1)/10000).toFixed(0)}}<span>万</span></i>
        <i class="fonts" v-else="listHeader.amount<0">{{((-listHeader.amount*1)/10000).toFixed(0)}}<span>万</span></i>
<!--        <i class="fonts" v-else="listHeader.amount='undefined'">0万 </i>-->
        <i v-if="listHeader.yearAmount<0" class='redC'>&nbsp;</i>
        <i v-if="listHeader.yearAmount>0" class='greenC'>&nbsp; </i>
      </div><span class='color1'>{{slides.conT}}</span>
      </el-col>
      <el-col :span="3"><div class="itemstyle">
        <i class="fonts" v-if="listHeader.yearAmount<0" >{{((-listHeader.yearAmount*1)/10000).toFixed(0)}} <span>万</span></i>
        <i class="fonts" v-else="listHeader.yearAmount>=0">{{((listHeader.yearAmount*1)/10000).toFixed(0)}} <span>万</span></i>

        <i v-if="listHeader.yearAmount<0" class='redC'>↓</i>
          <i v-if="listHeader.yearAmount>=0" class='greenC'>↑ </i>
          <!--<i v-if="record.yearAmount=0"></i>-->
            </div><span class='color2'>{{slides.conT1}}</span>
      </el-col>
      <el-col :span="3">
          <div class="itemstyle">
            <i class="fonts" v-if="listHeader.monthAmount<0" >{{((-listHeader.monthAmount*1)/10000).toFixed(0)}} <span>万</span></i>
            <i class="fonts" v-else="listHeader.monthAmount>=0">{{((listHeader.monthAmount*1)/10000).toFixed(0)}} <span>万</span></i>
            <!--<i class="fonts" v-else="listHeader.monthAmount='undefined'">0万 </i>-->
              <i v-if="listHeader.monthAmount<0" class='redC'>↓</i>
              <i v-if="listHeader.monthAmount>=0" class='greenC'>↑ </i>
              <!--<i v-if="record.monthAmount==0"></i>-->
         </div>
          <span class='color3'>{{slides.conT2}}</span>
      </el-col>
      <el-col :span="3">
    <div class="itemstyle">
      <i class="fonts" v-if="listHeader.weekAmount<0" >{{((-listHeader.weekAmount*1)/10000).toFixed(0)}}<span>万</span></i>
      <span v-else="">
       <i class="fonts" v-if="listHeader.weekAmount>=0">{{((listHeader.weekAmount*1)/10000).toFixed(0)}}<span>万</span></i>
       <!--<i class="fonts" v-else="listHeader.weekAmount='undefined'">0万</i>-->
      </span>
      <i v-if="listHeader.weekAmount<0" class='redC'>↓</i>
      <i v-if="listHeader.weekAmount>=0" class='greenC'>↑ </i>
    </div>
    <span class='color4'>{{slides.conT3}}</span>
  </el-col>
    <el-col :span="3">
      <div class="itemstyle">
        <i class="fonts" v-if="listHeader.dayAmount<0" >{{((-listHeader.dayAmount*1)/10000).toFixed(0)}} <span>万</span></i>
        <i class="fonts" v-else="listHeader.dayAmount>=0">{{((listHeader.dayAmount*1)/10000).toFixed(0)}} <span>万</span></i>
       <!-- <i class="fonts" v-else="listHeader.dayAmount='undefined'">0万</i>-->

        <i v-if="listHeader.dayAmount<0" class='redC'>↓</i>
        <i v-if="listHeader.dayAmount>=0" class='greenC'>↑ </i>
      </div>
      <span class='color5'>{{slides.conT4}}</span>
    </el-col>
    <el-col :span="3" v-show="hiddenFiles">
      <div class="itemstyle">
        <i class="fonts" v-if="listHeader.taskAmount<0" >{{((-listHeader.taskAmount*1)/10000).toFixed(0)}} <span>万</span></i>
       <!-- <i class="fonts" v-else="listHeader.taskAmount===''">0万</i>-->
        <i class="fonts" v-else="listHeader.taskAmount>=0">{{((listHeader.taskAmount*1)/10000).toFixed(0)}}<span>万</span> </i>


        <i v-if="listHeader.taskAmount<0" class='redC'>↓</i>
        <i v-if="listHeader.taskAmount>=0" class='greenC'>↑ </i>
      </div>
      <span class='color6'>{{slides.conT5}}</span>
    </el-col>
    <!--完成率暂时注掉，没有获取到数据-->
    <el-col :span="3" v-show="hiddenFiles">
      <div class="itemstyle" style="border-right: 0;">
        <i class="fonts">{{(listHeader.completAmount*100).toFixed(1)}}%</i>
      <!--<span v-else="">
        <i class="fonts" v-if="listHeader.completAmount>=0">{{(record.completAmount*100).toFixed(0)}}%</i>
        <i class="fonts" v-else="listHeader.completAmount='undefined'">0%</i>
      </span>-->
        <!--<i v-if="record.completAmount<0" class='redC'>↓</i>-->
        <!--<i v-if="record.completAmount>0" class='greenC'>↑ </i>-->
      </div>
      <span class='color7'>{{slides.conT6}}</span>
    </el-col>
</el-row>
    <div>
      <span class="danwei">单位/亿</span>
    </div>
   </div>
</template>

<script>
  export default {
   props:{
       slides:{
        type:Object,
        default:{}
       },
       hiddenFiles:{
         type:Boolean,
         default:true
       },
       listHeader: {
         type:Object,
         default:function () {
           return {}
         }
       }
    },
   components:{
    },
    data () {
      return {}
      },
      mounted(){
        console.log('传递的数据');
        console.log(this.listHeader)
      },
      methods:{

        }
      }

</script>

<style lang='scss' scoped>

  .el-row {
    margin-bottom: 20px;
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
  .color1,.color2,.color3,.color4,.color5,.color6,.color7{
    display: inline-block;
    font-size: 14px;
  }
  .color1{
    color: #9E75FB ;
  }
   .color2{
    color:  #FAB95D;
  }
   .color3{
    color:  #7992FE ;
  }
   .color4{
    color:#67DA52;
  }
  .color5{
    color:#FB8072;
  }
  .color6{
    color: #6FCCFF;
  }
  .color7{
    color:#222222;
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
  .echarCont{
    transform: rotate(90deg);
    -ms-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    -webkit-transform:rotate(90deg);
    -o-transform:rotate(90deg);
  }
  .echartRow{
    width: 700px;
    height: 60px;
  }
  .danwei{
    font-size: 12px;
    margin-left: 10px;
    font-family:PingFangSC-Regular;
    color:rgba(168,172,175,1);
  }
</style>
