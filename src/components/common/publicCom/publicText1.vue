<template>
   <div class="clientBig" >
       <div v-for="item in dataText">
       <div class="styls">
           <span class="span1">证件信息</span>
       </div>
      <el-row >
          <el-col :span="24">
              <div class="grid-content">证件类型:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{item.identType}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">证件号码:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{item.identNo}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">证件登记日期:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{item.idenRegDate2}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">有效期结束日期:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{item.identValidPeriod2}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">机关名:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{item.identOrg}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">年检标识:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{item.identCheckFlag}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">创建人:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{item.username}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">创建时间:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{item.lastUpdateTm2}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">信息来源系统:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{item.lastUpdateSys}}</span>
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
