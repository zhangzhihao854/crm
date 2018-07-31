<template>
   <div class="clientBig1">
       <el-collapse accordion >
           <div v-for="(item,index) in dataText" :key="index">
               <el-collapse-item >
                   <template slot="title">
                       <i class="iclass">{{index+1}}</i>
                     <i class="cilentfont">{{item.cusName}}</i>
                   </template>
                   <div class="colorone">客户名称: <span class="redcolor blackco"></span>{{item.cusName}}</div>
                   <div class="colorone">授信额度（元）: <span class="redcolor blackco">{{item.crdTotlAmt}}</span></div>
                   <div class="colorone">已用额度（元）: <span class="redcolor blackco">{{item.alreadyAmt}}</span></div>
                   <div class="colorone">剩余额度（元）: <span class="redcolor blackco">{{item.limitAmt}}</span></div>
                   <div class="colorone">授信分项额度（元）: <span class="redcolor blackco">{{item.creditPartAmt}}</span></div>
                   <div class="colorone">已用分项额度（元）: <span class="redcolor blackco">{{item.alreadyPartAmt}}</span></div>
                   <div class="colorone">剩余分项额度（元）: <span class="redcolor blackco">{{item.limitPartAmt}}</span></div>
                   <div class="colorone">授信起始日期: <span class="redcolor blackco"></span>{{item.creditBeginData2}}</div>
                   <div class="colorone">授信到期日期: <span class="redcolor blackco"></span>{{item.creditEndData2}}</div>
                   <div class="colorone">管理机构: <span class="redcolor blackco"></span>{{item.mgrOrgName}}</div>
               </el-collapse-item>
           </div>
           <!--<el-collapse-item v-if="dataText.length==0">
               <div class="colorone">合同编号: <span class="redcolor blackco"></span></div>
           </el-collapse-item>-->
       </el-collapse>

   </div>
</template>

<script>

  export default {
  	props:{
  	dataText:{
  		type:Array,
  		default:[]
  	}

  	},
    activated(){

    },
    data () {
      return {
        showData: false
      }
  }
}
</script>

<style scoped lang='scss'>

  .iclass{
    display: inline-block;
    width:22px;
    height: 22px;
    border-radius: 11px;
    background-color: dodgerblue;
    text-align: center;
    line-height:22px;
    color: #FFFFFF;

  }
    .clientBig1{
        font-family:PingFangSC-Regular !important;
        width: 100%;
        height: 100%;
        /*border: 1px solid #E2E2E2;*/
        border-left: 0;
        border-right: 0;
        background: #fff;
        margin-bottom: 0.66rem;
    }
    .el-row {
        margin-bottom: 10px;
        padding-top: 20px;
    }
    .el-col {
        border-radius: 2px;
        margin-bottom: 2%;
    }
    .clientBig .el-col-24{
        width:98% !important;
    }
    .grid-content {
        border-radius: 2px;
        margin-left: 8%;
        font-size: 0.83rem;
        color: #888888;
        display: inline-block;

    }
    .garid-content2 {
        border-radius: 4px;
        min-height: 36px;
        color: #222222;
        font-size: 0.83rem;
    }
    .fontcolor{
        /*margin-left: 0.1rem;*/
        margin-right: 0.5rem;
        color: #FF673F;

    }
    .el-collapse-item__arrow{
        line-height: 0;
    }
    .el-collapse-item__header__arrow{
        float: right;
        position: relative;
        top: 40%;
        right: 10px;
        color: #b3b3b3;
    }

    .redcolor{
        color: #FF673F;
    }
    .colorone{
        color: #888888;
        margin-left: 1.5rem;
        padding-right: 1rem;
    }
    .elitemBox{
        margin-top: 20px;
        background: #FCFEFE;
    }
    .cilentfont{
        font-size: 0.88rem;
        margin-left: 1rem;
    }
    .image img{
        width: 300px;
        height: 300px;
    }

</style>
