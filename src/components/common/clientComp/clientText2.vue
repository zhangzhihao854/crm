<template>
   <div class="clientBig">
      <el-row>
          <el-col :span="24">
              <div class="grid-content">喜好的电子渠道:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.LIKE_ECHANL_TYPE}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">偏好的金融业务类型:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.FINANCE_BUSINESS_PREFER}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">喜好休闲类型:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.LIKE_LEISURE_TYPE}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">喜好媒体类型:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.LIKE_MEDIA_TYPE}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">喜好运动类型:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.LIKE_SPORT_TYPE}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">喜好杂志类型:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.LIKE_MAGAZINE_TYPE}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">喜好电视节目类型:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.LIKE_FILM_TYPE}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">喜好宠物类型:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.LIKE_PET_TYPE}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">喜好收藏类型:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.LIKE_COLLECTION_TYPE}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">喜好投资类型:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.LIKE_INVEST_TYPE}}</span>
          </el-col>
          <el-col :span="24">
              <div class="grid-content">喜好品牌类型:</div>
              <span class="fontcolor"></span>
              <span class="garid-content2">{{dataText.LIKE_BRAND_TYPE}}</span>
          </el-col>
      </el-row>
       <el-row>

           <el-col :span="24">
               <div class="grid-content">希望得到的理财服务:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.FINA_SERV}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">希望理财经理的联系方式:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.CONTACT_TYPE}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">希望得到的理财咨询:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.FINA_NEWS}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">希望参与的沙龙活动:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.SALON}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">个人兴趣爱好:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.INTERESTS}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">希望联系的时间:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.CONTACT_TIME_PREFER}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">投资周期偏好:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.INVEST_CPCLE}}</span>
           </el-col>
       </el-row>
     <el-row>
       <el-col :span="24">
         <div class="grid-content">宗教信仰:</div>
         <span class="fontcolor"></span>
         <span class="garid-content2">{{dataText.RELIGIOUS_BELIEF}}</span>
       </el-col>
       <el-col :span="24">
         <div class="grid-content">忌讳:</div>
         <span class="fontcolor"></span>
         <span class="garid-content2">{{dataText.AVOID}}</span>
       </el-col>
       <el-col :span="24">
         <div class="grid-content">特别需求:</div>
         <span class="fontcolor"></span>
         <span class="garid-content2">{{dataText.CUST_TABOO}}</span>
       </el-col>
       <el-col :span="24">
         <div class="grid-content">备注:</div>
         <span class="fontcolor"></span>
         <span class="garid-content2">{{dataText.REMARK}}</span>
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
