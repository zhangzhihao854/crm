<template>
   <div class="clientBig1">
       <div v-for="item in dataText">
           <el-row >
               <el-col :span="24">
                   <div class="grid-content">签约机构:</div>
                   <span class="fontcolor"></span>
                   <span class="garid-content2">{{item.ogrName}}</span>
               </el-col>
               <el-col :span="24">
                   <div class="grid-content">签约日期:</div>
                   <span class="fontcolor"></span>
                   <span class="garid-content2">{{item.signDate2}}</span>
               </el-col>
               <el-col :span="24">
                   <div class="grid-content">签约渠道:</div>
                   <span class="fontcolor"></span>
                   <span class="garid-content2">{{item.signChanel}}</span>
               </el-col>
               <el-col :span="24">
                   <div class="grid-content">签约类型:</div>
                   <span class="fontcolor"></span>
                   <span class="garid-content2">{{item.signType}}</span>
               </el-col>

           </el-row>
       </div>
       <div v-if="dataText.length == 0">
           <el-row >
               <el-col :span="24">
                   <div class="grid-content">签约机构:</div>
                   <span class="fontcolor"></span>
                   <span class="garid-content2"></span>
               </el-col>
               <el-col :span="24">
                   <div class="grid-content">签约日期:</div>
                   <span class="fontcolor"></span>
                   <span class="garid-content2"></span>
               </el-col>
               <el-col :span="24">
                   <div class="grid-content">签约渠道:</div>
                   <span class="fontcolor"></span>
                   <span class="garid-content2"></span>
               </el-col>
               <el-col :span="24">
                   <div class="grid-content">签约类型:</div>
                   <span class="fontcolor"></span>
                   <span class="garid-content2"></span>
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
	
</style>
