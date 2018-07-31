<template>
  <div class="echarCont" >
    <el-row class="echartRow">
      <el-col :span="3"><div class="itemstyle">
        <i class="fonts" v-if="listHeader.amount>=0">{{(listHeader.amount/10000).toFixed(0)}}<span>万</span></i>
        <i class="fonts" v-else="listHeader.amount<0">{{(-listHeader.amount/10000).toFixed(0)}}<span>万</span></i>
        <!--<i class="fonts" v-else="listHeader.amount='undefined'">0万 </i>-->
        <i v-if="listHeader.yearAmount<0" class='redC'>&nbsp;</i>
        <i v-if="listHeader.yearAmount>0" class='greenC'>&nbsp; </i>
      </div><span class='color1'>{{slides.conT}}</span>
      </el-col>
      <el-col :span="3"><div class="itemstyle">
        <i class="fonts" v-if="listHeader.yearAmount<0" >{{(-listHeader.yearAmount/10000).toFixed(0)}} <span>万</span></i>
        <i class="fonts" v-else="listHeader.yearAmount>=0">{{(listHeader.yearAmount/10000).toFixed(0)}} <span>万</span></i>
     <!--   <i class="fonts" v-else="listHeader.yearAmount='undefined'"> 0万 </i>-->

        <i v-if="listHeader.yearAmount<0" class='redC'>↓</i>
        <i v-if="listHeader.yearAmount>=0" class='greenC'>↑ </i>
        <!--<i v-if="record.yearAmount=0"></i>-->
      </div><span class='color2'>{{slides.conT1}}</span>
      </el-col>
      <el-col :span="3">
        <div class="itemstyle">
          <i class="fonts" v-if="listHeader.monthAmount<0" >{{(-listHeader.monthAmount/10000).toFixed(0)}} <span>万</span></i>
          <i class="fonts" v-else="listHeader.monthAmount>=0">{{(listHeader.monthAmount/10000).toFixed(0)}} <span>万</span></i>
         <!-- <i class="fonts" v-else="listHeader.monthAmount='undefined'">0万 </i>-->
          <i v-if="listHeader.monthAmount<0" class='redC'>↓</i>
          <i v-if="listHeader.monthAmount>=0" class='greenC'>↑ </i>
          <!--<i v-if="record.monthAmount==0"></i>-->
        </div>
        <span class='color3'>{{slides.conT2}}</span>
      </el-col>
      <el-col :span="3">
        <div class="itemstyle">
          <i class="fonts" v-if="listHeader.weekAmount<0" >{{(-listHeader.weekAmount/10000).toFixed(0)}}<span>万</span></i>
          <span v-else="">
       <i class="fonts" v-if="listHeader.weekAmount>=0">{{(listHeader.weekAmount/10000).toFixed(0)}}<span>万</span></i>
    <!--   <i class="fonts" v-else="listHeader.weekAmount='undefined'">0万</i>-->
      </span>
          <i v-if="listHeader.weekAmount<0" class='redC'>↓</i>
          <i v-if="listHeader.weekAmount>=0" class='greenC'>↑ </i>
        </div>
        <span class='color4'>{{slides.conT3}}</span>
      </el-col>
      <el-col :span="3">
        <div class="itemstyle">
          <i class="fonts" v-if="listHeader.dayAmount<0" >{{(-listHeader.dayAmount/10000).toFixed(0)}} <span>万</span></i>
          <i class="fonts" v-else="listHeader.dayAmount>=0">{{(listHeader.dayAmount/10000).toFixed(0)}} <span>万</span></i>
        <!--  <i class="fonts" v-else="listHeader.dayAmount='undefined'">0万</i>-->

          <i v-if="listHeader.dayAmount<0" class='redC'>↓</i>
          <i v-if="listHeader.dayAmount>0" class='greenC'>↑ </i>
        </div>
        <span class='color5'>{{slides.conT4}}</span>
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
        // context:'366869',context1:'104725',context2:'7469',context3:'1725',
        // conT:'贷款余额',conT1:'比年初增',conT2:'比上月降',conT3:'比昨日增',
      },
      /*ceshidata:{
       type:Number,
       default:0
       },*/
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
    activated(){
//      console.log("周"+this.record.weekAmount)
//      console.log("日"+this.record.dayAmount)
//      console.log("年"+this.record.yearAmount)
//      console.log("月"+this.record.monthAmount)
//      console.log("任务"+this.record.taskAmount)
//      console.log("完成"+this.record.completAmount)
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
    width: 800px;
    height:70px;
  }
  .danwei{
    font-size: 12px;
    margin-left: 10px;
    font-family:PingFangSC-Regular;
    color:rgba(168,172,175,1);
  }
</style>
