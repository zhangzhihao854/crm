<template>
   <div class="clientBig1">
       <div v-for="item in dataText">
       <el-row >

           <el-col :span="24">
               <div class="grid-content">统计日期:</div>
               <span class="fontcolor">{{item.etlDate2}}</span>
               <span class="garid-content2"></span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">本年余额:</div>
               <span class="fontcolor">{{item.curAcBl}}</span>
               <span class="garid-content2">元</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">上年余额:</div>
               <span class="fontcolor">{{item.LastAcBl}}</span>
               <span class="garid-content2">元</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">本年日均:</div>
               <span class="fontcolor">{{item.curYearAvg}}</span>
               <span class="garid-content2">元</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">上年日均:</div>
               <span class="fontcolor">{{item.lastYearAvg}}</span>
               <span class="garid-content2">元</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">本年上月月均:</div>
               <span class="fontcolor">{{item.curMonthAvg}}</span>
               <span class="garid-content2">元</span>
           </el-col>
       </el-row>

   </div>

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

      }
     }
}
</script>

<style scoped lang='scss'>
	.clientBig1{
        font-family:PingFangSC-Regular !important;
		width: 100%;
		height: 100%;
		border: 1px solid #E2E2E2;
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
    .clientBig1 .el-col-24{
        width:98% !important;
    }
  .grid-content {
    border-radius: 2px;
    margin-left: 8%;
      margin-right: 0.4rem;
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
      /*margin-right: 0.5rem;*/
      color: #FF673F;
      font-size: 0.83rem;
  }

</style>
