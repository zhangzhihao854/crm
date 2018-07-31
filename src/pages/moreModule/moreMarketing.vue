<template>
   <div class="marketing">
   <back-Header :title="title"></back-Header>
  <div class="contentBox">
    <div class="content">
        <span class="leftspan">活动综合评价</span>
        <span><textarea type="textarea" :rows="1" :disabled=true>{{queryActivityListdata.activityAppraise}}</textarea></span>
    </div>
  </div>
  <div class="content" style="border-bottom: none;">
    <span class="leftspan">目标达成</span>
  </div>
  <div class="contBox">
    <el-collapse  v-for="(item,index) in slides" :key='index'>
  <el-collapse-item  >
    <template slot="title">
     <!--<img class='imges' src="../../../static/images/_s-icon_man_pressed@3x.png" width="20" height="20">{{item.textCont}}-->
      <div class="smallmun">{{index+1}}</div>{{item.participateObjId}}
    </template>
    <div class="updown">
      <!--<div>-->
        <!--<div class="property" v-show="show1"><span>存款目标：</span>{{item.depositTargetAmount}}</div>-->
        <!--<div class="customer" v-show="show1"><span>存款达成：</span>{{item.dedpositTargetReach}}</div>-->
      <!--</div>-->

      <!--<div>-->
        <!--<div class="deposit" v-show="show2"><span>贷款目标：</span>{{item.loansTargetAmount}}</div>-->
        <!--<div class="finish" v-show="show2"><span>贷款达成：</span>{{item.oansTargetReach}}</div>-->
      <!--</div>-->
      <!---->
      <!--<div>-->
        <!--<div class="target" v-show="show3"><span>潜客目标 : </span>{{item.diveCount}}</div>-->
        <!--<div class="reached" v-show="show3"><span>潜客达成: </span>{{item.diveReach}}</div>-->
      <!--</div>-->


      <div  class="divzuo">
        <div class="target" v-show="show3"><span>潜客目标: </span>{{item.diveCount}}</div>
        <div class="property" v-show="show1"><span>存款目标: </span>{{item.depositTargetAmount}}</div>
        <div class="deposit" v-show="show2"><span>贷款目标: </span>{{item.loansTargetAmount}}</div>

      </div>

      <div  class="divyou">
        <div class="reached" v-show="show3"><span>潜客达成: </span>{{item.diveReach}}</div>
        <div class="customer" v-show="show1"><span>存款达成: </span>{{item.dedpositTargetReach}}</div>
        <div class="finish" v-show="show2"><span>贷款达成: </span>{{item.oansTargetReach}}</div>

      </div>

    </div>

  </el-collapse-item>

</el-collapse>
	</div>
  <!--<moreInput></moreInput>-->
     <div class="contentBox">
       <div class="content">
         <span class="leftspan">后续追踪事项</span>
         <!--<span><el-input type="textarea" :rows="1" placeholder="请输入" v-model="LaterSee" :disabled=true> </el-input></span>-->
         <span><textarea type="textarea" :rows="1" :disabled=true>{{queryActivityListdata.activityTrack}}</textarea></span>

       </div>
     </div>
     <div class="contentBox">
       <div class="content">
         <span class="leftspan">下次活动改进措施</span>
         <!--<span><el-input type="textarea" :rows="1" placeholder="请输入" v-model="NextActive"></el-input></span>-->
         <span><textarea type="textarea" :rows="1" :disabled=true>{{queryActivityListdata.activityImprove}}</textarea></span>

       </div>
     </div>
     <div class="contentBox">
       <div class="content">
         <span class="leftspan">备注</span>
         <!--<span><el-input type="textarea" :rows="1" placeholder="请输入" v-model="Remark"></el-input></span>-->
         <span><textarea type="textarea" :rows="1" :disabled=true>{{queryActivityListdata.activityRemark}}</textarea></span>

       </div>
     </div>

  <!--<moreBottomStep :updown="updownA" @goupPage='goupPage' @godownPage='godownPage' ></moreBottomStep>-->
  </div>

</template>

<script type="text/ecmascript-6">
import BackHeader from '@/components/header/back-header'
import moreInput from '@/components/common/moreComponents/moreInput'
import moreBottomStep from '@/components/common/moreComponents/moreBottomStep'
import { MessageBox } from 'mint-ui';
  export default {
    components:{
      BackHeader,
      moreInput,
      moreBottomStep
    },
    data () {
      return {
         title:'营销活动总结与分析',
          slides:[],
          updownA:["取消","保存"],
          LaterSee: '',
          NextActive: '',
          Remark: '',
          Ratting: '',
        /*控制下拉折叠面板字段显示与隐藏*/
          show1: false,
          show2: false,
          show3: false,
        queryActivityListdata:{}

      }
      },
      activated(){
        this.slides=[]
        /*隐藏目标达成下拉折叠面板字段*/
        this.show1 = false
        this.show2 = false
        this.show3 = false
        /*获取数据*/
        this.getActivityBase();
        this.getTargetReach()
        /*清空用户输入内容*/
        this.LaterSee ='',
        this.NextActive = '',
        this.Remark = '',
        this.Ratting =''

        this.queryActivityListdata={}
        this.queryActivityList()
      },
      methods:{
         goupPage(){
          this.$router.go(-1)
        },
        godownPage(){
//          this.$router.push('/moreMainPage')
          this.sendInput()
        },
        /*获取目标达成数据*/
        getActivityBase(){
          var url = `/CRMNewMobile/marketing/queryActivityBase`;
          this.$http.post(url,
            {
                "identity": this.cookies.get('identity'),
                "id": this.$store.state.marktingId
            },
            {
              emulateJSON:true
            }
          ).then(res => {
              console.log(res.body.data.activityTypeDeposit)
              console.log(res.body.data.activityTypeLoans)
              console.log(res.body.data.activityTypeGuest)

              /*根据activityTypeDeposit/activityTypeLoans/activityTypeGuest值显示目标达成字段内容*/
              var activityTypeDeposit = res.body.data.activityTypeDeposit;
              var activityTypeLoans = res.body.data.activityTypeLoans;
              var activityTypeGuest = res.body.data.activityTypeGuest;

              if( activityTypeDeposit == '1' && activityTypeLoans == '1' && activityTypeGuest == '1'){
                this.show1 = true
                this.show2 = true
                this.show3 = true
              }else if(activityTypeDeposit == '1'){
                this.show1 = true
                //alert('111')
              }else if(activityTypeLoans == '1'){
                this.show2 = true
              }else if(activityTypeGuest == '1'){
                this.show3 = true
              }
          }).catch((error) => {
            console.log(error);
          })

        },
        /*获取目标达成数据*/
        getTargetReach(){
          var url = `/CRMNewMobile/marketing/queryTargetReach`;
          this.$http.post(url,
            {
                "identity": this.cookies.get('identity'),
                "marktingId": this.$store.state.marktingId
            },
            {
              emulateJSON:true
            }
          ).then(res => {
            this.slides = res.body.ListData;

          }).catch((error) => {
            console.log(error);
          })
        },
        /*点击保存按钮，提交用户输入内容*/
        sendInput(){
            /*获取参数*/
            var listData = {
              "activityTrack": this.LaterSee,
              "activityAppraise": this.Ratting,
              "activityImprove": this.NextActive,
              "activityRemark": this.Remark,
              "accountCode": this.cookies.get('identity'),
              "marktingId": this.$store.state.marktingId,
              "userAddId":this.cookies.get('identity')
            }

          var url = `/CRMNewMobile/marketing/insertActivitySummaryApp`;
          this.$http.post(url,
            {
              "activityTrack": this.LaterSee,
              "activityAppraise": this.Ratting,
              "activityImprove": this.NextActive,
              "activityRemark": this.Remark,
             /* "accountCode": this.cookies.get('identity'),*/
              "marktingId": this.$store.state.marktingId,
              "identity":this.cookies.get('identity')
            },
            {
              emulateJSON:true
            }
          ).then(res => {
              if(res.body.success == true){
                MessageBox.alert('亲，保存成功！').then(action => {
                  this.$router.push('/moreMainPage')
                });
              }


          }).catch((error) => {
            console.log(error);
          })
        },

//        数据回显功能
        queryActivityList(){
          var url = `/CRMNewMobile/marketing/queryActivityList`;
          this.$http.post(url,
            {
                "identity": this.cookies.get('identity'),
                "marktingId": this.$store.state.marktingId
            },
            {
              emulateJSON:true
            }
          ).then(res => {
              if(res.body.ListData.length==0){
                this.queryActivityListdata =[]
              }else{
                this.queryActivityListdata=res.body.ListData[0]

              }
          }).catch((error) => {
            console.log(error);
          })
        },
      }
  }
</script>

<style lang='scss' scoped>
.marketing{
margin-bottom:50px;
  .back_text span[data-v-a2006ea4] {
  width:9em!important;
}
.contentBox{
  /*padding-top: 3rem;*/
}
.leftspan{
  display: inline-block;
  width: 50%;
}
.smallmun{
  display: inline-block;
  width:16px;
  height: 16px;
  background-color: #23A5EB;
  color:#fff;
  line-height:16px;
  border-radius: 8px;
  text-align: center;
  margin-left: 2px;
  margin-right: 3px;
}
.updown{
  line-height: 34px;
  background-color: #FCFFFF;
  /*height:67px;*/
}

 .content span input{
   height:44px;
  width:90px;
  border: none;
  outline: none;
  margin-bottom:0px;
  /*margin-top:10px;*/
 }
 .content{
  height:44px;
  text-align:left;
  line-height:44px;
  border:1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  /*padding: 5px 10px;*/
  font-size: 0.8rem;
  margin-top: 10px;
    color: #000;
    background: #fff;
    /*border-top: 1px solid #F6F8F8;*/
 }
input[type=text]{
  padding:0;
}

.el-textarea__inner{
  border: none !important;
}
textarea{
  border:none !important;
  padding-right: 10px;
  text-align: right;
  color:#000;
  opacity: 0.6;
}

 .content span{
  margin-left:10px;
  text-align:left;
 }

.contBox span{
  color:#888888;
}
.property,.customer,.deposit,.finish,.target,.reached{
  font-size:13px;
  /*padding-left: 20px;*/
}

.divzuo,.divyou{
  display: inline-block;
  width:53%;
  text-align: left;
  padding-left: 39px;
}
.divyou {
  width:45%;
  padding-left: 0px;

}

div i{
  color:#888888;
  float:right;
  margin-top:15px;
}
.imges{
    margin-right: 20px;
    vertical-align: middle;
}

}

</style>
