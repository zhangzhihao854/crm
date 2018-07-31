<template>
   <div class="clientBig" >
       <el-row >
          <el-col :span="24">
              <div class="grid-content">单位地址:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.unitAddr}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">单位邮编:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.unitZipcode}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">单位名称:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.unitName}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">单位电话:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.unitTel}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">传真号码:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.unitFex}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">EMAIL:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.email}}</span>
          </el-col>
      </el-row>
       <el-row>

           <el-col :span="24">
               <div class="grid-content">住宅地址国家地区:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.citizenship}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">住宅地址:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.homeAddr}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">住宅邮编:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.homeZipcode}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">住宅电话:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.homeTel}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">手机号码:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.mobilePhone}}</span>
           </el-col>
       </el-row>
     <!--  <el-row>
         <el-col :span="24">
           <div class="grid-content">联系方式类型:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2"></span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">联系方式:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2"></span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">是否首选:</div>
           <span class="fontcolor"></span>
           <span class="garid-content2"></span>
         </el-col>
         <el-col :span="24">
           <div class="grid-content">备注</div>
           <span class="fontcolor"></span>
           <span class="garid-content2"></span>
         </el-col>
       </el-row>-->
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
		border-top: 1px solid #E2E2E2;
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
