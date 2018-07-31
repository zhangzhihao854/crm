<template>
   <div class="clientBig" >
       <div class="styls">

          <span class="span1">基本信息</span>
       </div>
      <el-row >
          <el-col :span="24">
              <div class="grid-content">户主姓名:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.houseHolderName}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">家庭人数:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.population}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">家庭地址:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.familyAddr}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">国家地区区号:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.contmethInfon}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">其中劳动力人数:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.laborPopNum}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">经营项目及规模:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.busiAndScale}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">固定电话:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.homeTel}}</span>
          </el-col>
      </el-row>
       <div class="styls spn">

           <span class="span1">更多信息</span>
       </div>
       <el-row>

           <el-col :span="24">
               <div class="grid-content">有无私家车:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.hasHomeCar}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">负债情况:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.debtState}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">是否授信:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.isCreditFamily}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">家庭经济实力:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.fmyJitsuryoku}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">不良记录:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.familyAdverseRecords}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">授信金额:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.creditAmount}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">住宅情况:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.houseStat}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">家庭和睦:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.isHarmony}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">信用情况:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.creditInfo}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">其他:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.remark}}</span>
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
        }

  	},
    data () {
      return {
      }
  }
}
</script>

<style scoped lang='scss'>
	.clientBig{
        font-family:PingFangSC-Regular !important;
		width: 100%;
		height: 100%;
		border: 1px solid #E2E2E2;
		border-left: 0;
		border-right: 0;
        background: #F8F9FB;
        margin-bottom: 0.66rem;
	}
	.el-row {
    margin-bottom: 10px;
    padding-top: 0.55rem;
    background: #FCFEFE;
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
.styls{
    height:2.5rem ;
    line-height: 2.5rem;
    background: #fff;
    /*border-top: 1px solid #E6E6E6;*/
    border-bottom: 1px solid #E6E6E6;
}
.styls .span1 {
    /*display: inline-block;*/
    border-left: 0.22rem solid #FE5947;
    margin-left: 0.91rem;
    padding-left: 0.55rem;
}
    .spn{
        margin-top:0.83rem ;
        border-top: 1px solid #E6E6E6;
    }

</style>
