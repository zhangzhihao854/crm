<template>
   <div class="clientBig1">
       <el-row >
           <el-col :span="24">
               <div class="grid-content">客户编号:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.custId}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">性别:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.sex}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">风险评估等级:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.riskLevel}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">称谓:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.personTitle}}</span>
           </el-col>

       </el-row>
       <el-row >
           <el-col :span="24">
               <div class="grid-content">风险评估有效期:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.riskValidDate}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">出生日期:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.birthday}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">客户名称:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.personalName}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">民族:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.nationality}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">客户拼音名:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.pinyinName}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">籍贯:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.nativeplace}}</span>
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
       </el-row>
       <el-row >
           <el-col :span="24">
               <div class="grid-content">职位:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.duty}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">所属行业:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.industType}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">最高学历:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.highestSchooling}}</span>
           </el-col>
               <el-col :span="24">
               <div class="grid-content">毕业学校:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.graduateSchool}}</span>
           </el-col>
       </el-row>
       <el-row >
          <el-col :span="24">
               <div class="grid-content">个人年收入:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.annualIncomeScope}}</span>
          </el-col>
           <el-col :span="24">
               <div class="grid-content">国籍:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.citizenship}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">婚姻状况:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.marriage}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">职业:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.careerType}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">家庭年收入:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.familyAnnIncScope}}</span>
           </el-col>
           <el-col :span="24">
             <div class="grid-content">证件有效期起:</div>
             <span class="fontcolor"></span>
             <span class="garid-content2">{{dataText.certificateBegin}}</span>
           </el-col>
           <el-col :span="24">
             <div class="grid-content">证件有效期止:</div>
             <span class="fontcolor"></span>
             <span class="garid-content2">{{dataText.certificateEnd}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">客户类别:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.custLevel}}</span>
           </el-col>
       </el-row>
       <el-row>
         <el-col :span="24">
           <div class="grid-content">是否正式在岗职工:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.isFormalEmployees}}</span>
         </el-col>

         <el-col :span="24">
           <div class="grid-content">是否代发工资客户:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.isPayrollCust}}</span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">是否分润:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.holdStockAmt}}</span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">贵宾等级:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2">{{dataText.custLevel}}</span>
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
