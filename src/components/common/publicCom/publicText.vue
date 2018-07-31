<template>
   <div class="clientBig1">
       <el-row >

           <el-col :span="24">
               <div class="grid-content">行政区划代码:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.areaCode}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">营业执照号码:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.busiLicNo}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">企业性质:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.entProperty}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">成立日期:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.buildDate2}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">法定代表人名称:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.legalReprName}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">实际控制人名称:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.controlPerName}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">是否我行股东:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.是否我行股东}}</span>
           </el-col>
       </el-row>
     
   </div>
</div>
</template>

<script>

  export default {
  	props:{
  	dataText:{
  		type:Object,
  		default:{}
  	},
    sex:{
        type:String,
        default:''
    }

  	},
    data () {
      return {
      
      }
    },
      activated(){
          this.dataText = {}
          this.sex = ''
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
