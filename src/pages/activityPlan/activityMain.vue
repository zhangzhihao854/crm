<template>
  <div class="activityMain">
    <div style="height:45px;"><back-Header :title="title" :flag="flag"></back-Header></div>
    <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <div v-show="contentshow" style="margin-bottom: 20px">
    <div class="itemStyle">
       <el-row>
          <el-col :span="8" class="leftCol"><span>活动名称</span></el-col>
         <el-col :span="4" class="rightCol">  <i class="el-icon-arrow-right" @click="activityObj('活动名称',showlistdata.activityName)"></i></el-col>
         <el-col :span="12" class="rightCol">
              <span>{{showlistdata.activityName}}</span>
          </el-col>
       </el-row>
    </div>
     <div class="itemStyle">
       <el-row>
          <el-col :span="6" class="leftCol"><span>活动类型</span></el-col>
          <el-col :span="18" class="rightCol"><span>{{activityType}}</span></el-col>
       </el-row>
    </div>
     <div class="itemStyle">
       <el-row>
          <el-col :span="8" class="leftCol"><span>活动时间</span></el-col>
          <el-col :span="16" class="rightCol"><span>{{showlistdata.activityCreateDate}}至{{showlistdata.activityEndDate}}</span></el-col>
       </el-row>
    </div>
     <div class="itemStyle">
       <el-row>
          <el-col :span="8" class="leftCol"><span>业绩计算时间</span></el-col>
          <el-col :span="16" class="rightCol"><span>{{showlistdata.performanceCreateDate}}至{{showlistdata.performanceEndDate}}</span></el-col>
       </el-row>
    </div>
     <div class="itemStyle">
       <el-row>
          <el-col :span="8" class="leftCol"><span>活动执行对象</span></el-col>
          <el-col :span="4" class="rightCol">  <i class="el-icon-arrow-right" @click="activityObj('活动执行对象',showlistdata.activityObj)"></i></el-col>
          <el-col :span="12" class="rightCol" ><span>{{showlistdata.activityObj}}</span></el-col>

       </el-row>
    </div>
     <div class="itemStyle">
       <el-row>
          <el-col :span="8" class="leftCol"><span>活动目标</span></el-col>
          <el-col :span="16" class="rightCol">
            <span style="color:#23A5EB;cursor: pointer;"  @click="goDetail(0)">查看详情</span>
            <i class="el-icon-arrow-right"></i>
        </el-col>
       </el-row>
    </div>
    <div class="itemStyle">
       <el-row>
          <el-col :span="8" class="leftCol"><span>奖罚措施</span></el-col>
          <el-col :span="16" class="rightCol">
             <span style="color:#23A5EB;cursor: pointer;" @click="goRewardDetail">查看详情</span>
             <i class="el-icon-arrow-right"></i>
           </el-col>
       </el-row>
    </div>
    <div class="itemStyle">
       <el-row>
          <el-col :span="8" class="leftCol"><span>具体活动规则</span></el-col>
          <el-col :span="16" class="rightCol">
            <span  style="color:#23A5EB" @click="goActivityRules">查看详情</span>
            <i class="el-icon-arrow-right"></i>
        </el-col>
       </el-row>
    </div>
    <div class="itemStyle">
      <el-row>
        <el-col :span="8" class="leftCol"><span>活动指导思想</span></el-col>
        <el-col :span="16" class="rightCol">
          <span  style="color:#23A5EB" @click="goActivityGuiding">查看详情</span>
          <i class="el-icon-arrow-right"></i>
        </el-col>
      </el-row>
    </div>
    <div class="itemStyle">
       <el-row >
          <el-col :span="12" class="leftCol"><span>活动客户的参与标准</span></el-col>
         <el-col :span="4" class="rightCol">  <i class="el-icon-arrow-right" @click="activityObj('活动客户的参与指标',showlistdata.activityNorm)"></i></el-col>
         <el-col :span="8" class="rightCol"><span>{{showlistdata.activityNorm}}</span></el-col>
       </el-row>
    </div>
    <div class="itemStyle">
       <el-row>
          <el-col :span="8" class="leftCol"><span>活动涉及产品</span></el-col>
          <el-col :span="16" class="rightCol"><span>{{showlistdata.activityProductId}}</span></el-col>
       </el-row>
    </div>
    <div class="itemStyle">
       <el-row>
          <el-col :span="8" class="leftCol"><span>产品备注</span></el-col>
         <el-col :span="4" class="rightCol">  <i class="el-icon-arrow-right" @click="activityObj('产品备注',showlistdata.activityRemark)"></i></el-col>
         <el-col :span="12" class="rightCol"><span>{{showlistdata.activityRemark}}</span></el-col>
       </el-row>
    </div>

      <div class="itemStyle">
        <el-row>
          <el-col :span="8" class="leftCol"><span>附件</span></el-col>
          <el-col :span="4" class="rightCol">  <i class="el-icon-arrow-right" @click="goAnnex('附件',showlistdata.attachment)"></i></el-col>
          <el-col :span="12" class="rightCol"><span>{{showlistdata.activityAccessoryOldName}}</span></el-col>
<!--          <el-col :span="14" class="rightCol"><a :href="'http://222.223.182.30:1411/CRMNewMobile/file/downloadFile?filename=/'+showlistdata.attachment">{{showlistdata.attachment}}</a></el-col>-->
         <!-- <el-col :span="14" class="rightCol"><a :href="'http://192.168.1.124/CRMNewMobile/file/downloadFile?filename=/'+showlistdata.attachment" download="annex">{{showlistdata.attachment}}</a></el-col>-->
        </el-row>
      </div>
    <div>
      </div>
    </div>

  </div>
</template>

<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
  export default {
    data () {
      return {
        title: '活动策划与发起',
        flag: "moreMainPage",
        showlistdata:{},
        activityType:'',
        activityObjdata:'',
        contentshow:false,
        loading2:true

      }
    },
    components: {
      BackHeader,
    },
    activated(){
      if(this.$route.query.flag=='activityMain'){
        this.activityType=""
        this.activityObjdata=""
        this.loading2=true
        this.contentshow=false
        this.showlistdata={}
        this.showlist()
      }
    },
    methods: {
      showlist(){
//        console.log(123);
        this.showlistdata = !this.showlistdata
        console.log(this.showlistdata);
      },
      //跳转页面
      goDetail(type){
        console.log(type)
        if (type == 0) {
          //跳转至详情页面
          this.$router.push("/activityDetail?type="+this.activityType);
        }
      },
      //      获取活动发起展示数据
      showlist(){
        var url = `/CRMNewMobile/marketing/queryActivityBase`
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
              "id":this.$store.state.marktingId
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {



            this.showlistdata=res.body.data
            this.showlistdata.activityCreateDate=this.showlistdata.activityCreateDate.substring(0,11)
            this.showlistdata.activityEndDate=this.showlistdata.activityEndDate.substring(0,11)
            this.showlistdata.performanceCreateDate=this.showlistdata.performanceCreateDate.substring(0,11)
            this.showlistdata.performanceEndDate=this.showlistdata.performanceEndDate.substring(0,11)

//            活动类型的判断，如果是1 对应其汉字，最少一种情况，最多五种
            var ck=this.showlistdata.activityTypeDeposit=="1"?"存款、":""
            var dk=this.showlistdata.activityTypeLoans=="1"?"贷款、":""
            var qk=this.showlistdata.activityTypeGuest=="1"?"潜客、":""
            var tj=this.showlistdata.activityTypeTb=="1"?"内部团队建设、":""
            var qt=this.showlistdata.activityTypeRests=="1"?"其他、":""

            this.activityType=ck+dk+qk+tj+qt
            this.activityType=this.activityType.substring(0,this.activityType.length - 1)
            this.loading2=false
            this.contentshow=true

            this.activityObjdata=this.showlistdata.activityObj

          },
          res => {
            console.log(res)
          }
        )
      },
      activityObj(titles,value){
        this.activityObjdata=value
        this.$router.push("/activityObj?activityObjdata="+this.activityObjdata+"&titles="+titles);
      },
      /*去附件页面*/
      goAnnex(titles){

        this.$router.push("/annex?titles="+titles);
      },
      /*去奖罚措施页面*/
      goRewardDetail(){
          this.$router.push('/rewardDetail');
      },
      /*去具体活动规则页面*/
      goActivityRules(){
        this.$router.push('/activityRules');
      },
      /*去活动指导思想页面*/
      goActivityGuiding(){
        this.$router.push('/activityGuiding');
      }

    }
  }
</script>

<style lang="scss" scoped>
  i{
    color:#B3B3B3;

  }
  .activityMain{
    height:auto;
    height:100%;
    width: 100%;
    text-align: center;
    /*position:fixed;*/
    /*top:0;*/
    /*left:0;*/
  }
  .itemStyle,.el-row{
    height:50px;
    line-height:50px;
    font-size:14px;
    background-color:#fff;
    border-bottom:1px solid #ddd;
  }
/*   .el-row{
    height: 40px!important;
  } */
  .leftCol{
    font-size:16px;
    text-align:left;
    padding-left:20px;
    height: 50px;
    line-height: 50px;

    span{
      color:#555555;
    }
  }
  .rightCol{
    box-sizing: border-box;
    padding-right:20px;
    text-align:right;

    float: right;
     height: 50px;
    line-height: 50px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    span{
      color:#222222;
    }
  }
  .itemStyleCP{
    height: 100%;
    line-height:50px;
    font-size:14px;
    background-color:#fff;
  }
  .rightColCP{
    text-align:right;
    padding-right:15px;
    float: right;
    line-height: 50px;
  span{
    color:#222222;
  }
  }
  .rightCol .el-icon-arrow-right{
    margin-top: 0;
  }
</style>
