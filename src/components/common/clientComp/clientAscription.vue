<template>
   <div class="clientBig" >
       <div v-for="item in dataText">
       <div class="styls">
          <span class="span1">归属机构以及归属客户经理</span>
       </div>
      <el-row>
          <el-col :span="24">
              <div class="grid-content">归属机构:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{item.institutionName}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">主协办类型:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{item.mainType}}</span>
          </el-col>
          <el-col :span="24" class="custManagerWrap">
            <div class="custManager">
              <div class="grid-content">归属客户经理:</div>
              <span class="fontcolor"></span>

              <span class="garid-content2">{{item.mgrName}}</span>
              <!--<span class="garid-content2">
                <el-input type="textarea" v-model= item.mgrName  resize="none" style="display: inline-block!important;"></el-input>
              </span>-->
            </div>
          </el-col>
      </el-row>
       <div class="styls spn">

           <span class="span1">归属客户群</span>
       </div>
       <el-row>

           <el-col :span="24">
               <div class="grid-content">客户群名:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{item.custBaseName}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">客户群创建人:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{item.createUser}}</span>
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
          sss:[]
        /*choose:[
            {titleList:'户主姓名：'},
            {titleList:'家庭人数：'},
            {titleList:'家庭地址：'},
            {titleList:'国家地区区号：'},
            {titleList:'其中劳动力人数：'},
            {titleList:'经营姓名及规则：'},
            {titleList:'固定电话：'},
            {titleList:'有无私家车：',Stext:'有'},
            {titleList:'负责情况：',Stext:'200万'},
            {titleList:'是否授信：',Stext:'否'},
            {titleList:'家庭经济实力：',Stext:'很强'},
            {titleList:'不良记录：',Stext:'无'},
            {titleList:'授信金额：',Stext:'3000000'},
            {titleList:'住宅情况：',Stext:'北京二环内四合院10套'},
            {titleList:'家庭和睦：',Stext:'和睦'},
            {titleList:'信用情况：',Stext:'良'},
            {titleList:'其他：',Stext:'无'}
        ]*/
      }
  }
}
</script>

<style scoped lang='scss'>
	.clientBig{
    font-family:PingFangSC-Regular !important;
		width: 100%;
		height: 100%;
		//border: 1px solid #E2E2E2;
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
        width:100%;
    }
  .grid-content {
    border-radius: 2px;
    margin-left: 8%;
    font-size: 0.83rem;
    color: #888888;
    display: inline-block;

  }
  .garid-content2 {
    word-wrap:break-word;
    white-space:normal;
    border-radius: 4px;
    min-height: 36px;
    color: #222222;
    font-size: 0.83rem;
    margin-left: 4%;
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
    font-size: 0.83rem;
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
  /*.clientBig .garid-content2[data-v-6134b4d6]{
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }*/
  .el-textarea__inner{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .custManagerWrap .custManager{
    margin-left: 8%;
  }
  .custManagerWrap .custManager .grid-content{
    margin-left: 0 !important;
  }
</style>
