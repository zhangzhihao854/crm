<template>
   <div class="clientBig1">
       <el-row >
           <el-col :span="24">
               <div class="grid-content">客户编号:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.custId}}</span>
           </el-col>
           <el-col :span="24">
             <div class="grid-content">客户中文名称:</div>
             <span class="fontcolor"></span>
             <span class="garid-content2">{{dataText.custName}}</span>
           </el-col>
         <el-col :span="24">
           <div class="grid-content">证件类型:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.identType}}</span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">证件号码:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.identNo}}</span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">证件有效期:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.identValidPeriod}}</span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">英文名:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.pinyinName}}</span>
         </el-col>
         <!--<el-col :span="24">
           <div class="grid-content">拼音名:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2"></span>
         </el-col>-->
         <el-col :span="24">
             <div class="grid-content">企业规模:</div>
             <span class="fontcolor"></span>
             <span class="garid-content2">{{dataText.entScale}}</span>
         </el-col>
         <el-col :span="24">
             <div class="grid-content">企业成立日期:</div>
             <span class="fontcolor"></span>
             <span class="garid-content2">{{dataText.buildDate}}</span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">客户控股类型:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.comHoldType}}</span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">企业经济性质:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.economicType}}</span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">行业分类（主营）:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.mainIndustry}}</span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">行业分类（副营）:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.minorIndustry}}</span>
         </el-col>
       </el-row>
       <el-row >
           <el-col :span="24">
               <div class="grid-content">风险评级:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.qStat}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">客户评级:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.custGradeId}}</span>
           </el-col>
         <el-col :span="24">
           <div class="grid-content">是否上市公司:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.isListedCorp}}</span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">是否央企国企:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.isSoe}}</span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">是否政府融资平台:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.udivFlag}}</span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">集团客户标志:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.isRural}}</span>
         </el-col>
           <el-col :span="24">
               <div class="grid-content">是否外资企业:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.isForeignCorp}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">是否港澳台企业:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.isGangaotaiCorp}}</span>
           </el-col>

           <el-col :span="24">
               <div class="grid-content">是否有进出口权:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.hasIeRight}}</span>
           </el-col>

           <el-col :span="24">
               <div class="grid-content">是否我行股东:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.isStockHolder}}</span>
           </el-col>

           <el-col :span="24">
               <div class="grid-content">是否网银签约客户:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.isEbankSignCust}}</span>
           </el-col>
         <el-col :span="24">
           <div class="grid-content">是否涉农:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.IS_RURAL}}</span>
         </el-col>

           <el-col :span="24">
               <div class="grid-content">是否限制行业:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.isLimitIndustry}}</span>
           </el-col>
       </el-row>
   </div>
</template>

<script>

  export default {
  	props:{
  	dataText:{
  		type:Object,
  		default:{}
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
		border-top: 1px solid #E2E2E2;
		border-left: 0;
		border-right: 0;
        background: #f8f9fb;
        margin-bottom: 0.66rem;
	}
	.el-row {
    margin-bottom: 10px;
    padding-top: 20px;
        background: #fff;
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
