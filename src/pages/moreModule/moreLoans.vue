<template>
   <div class="moreLoansBox">
     <moreActivityHead></moreActivityHead>
     <chooseCk v-show="adddk" :title="titlechoose" :choosepage="choosepage"></chooseCk>
     <ul style="background-color: #fff;">
       <moreHead :mymoney='mymoney' :date="date"></moreHead>
       <li v-for='(item,index) in custmerListdata' :key='index' class="loansli">
         <el-row >
           <el-col :span="6" class="divcol"><div class="grid-content ">{{item.loansReachNo}}</div></el-col>
           <el-col :span="6" class="divcol"><div class="grid-content1 " style="color: red">{{item.loansAmount}}</div></el-col>
           <el-col :span="6" class="divcol"><div class="grid-content2 custName">{{item.custName}}</div></el-col>
           <el-col :span="6" class="divcol"><div class="grid-content2 " style="font-size: 12px;">{{item.loansDateString}}</div></el-col>
         </el-row>
       </li>
     </ul>
     <!--<moreHead :mymoney='mymoney' v-show="dklist"></moreHead>-->
     <!--<ul class="Context1" v-show="dklist">-->
       <!--<li class="contextBox" v-for='(item,index) in choosemindata'>-->
         <!--<div><input type="number" placeholder="请输入" v-model="item.lsh"></div>-->
         <!--<div><input type="number" placeholder="请输入" v-model="item.id"></div>-->
         <!--<div v-model="item.custId">{{item.custName}}</div>-->
         <!--<div><input type="date" placeholder="请选择" v-model="item.index" class="date"> </div>-->
       <!--</li>-->
     <!--</ul>-->
   <!--<moreBottomStep :updown="updownA" @goupPage='goupPage' @godownPage='godownPage'></moreBottomStep>-->
     <!--<moreBottom :mymessage='mymessage' @goNextPage='godownPage'></moreBottom>-->

   </div>
</template>

<script type=text/ecmascript-6>
  import  mui from '../../style/js/mui.min.js'
  import moreActivityHead from '@/components/common/moreComponents/moreActivityHead'
  import moreHead from '@/components/common/moreComponents/moreHead'
import moreContent from '@/components/common/moreComponents/moreContent'
import moreBottomStep from '@/components/common/moreComponents/moreBottomStep'
  import moreBottom from '@/components/common/moreComponents/moreBottom'
  import chooseCk from '@/components/common/moreComponents/chooseCk'
  export default {
    components:{
      moreHead,
      moreActivityHead,
      moreContent,
      moreBottomStep,
      chooseCk,
      moreBottom
    },
    data () {
      return {
         title:'活动效果追踪',
        updownA:["上一步","下一步"],
        mymessage:'提交',
        mymoney:'贷款达成',
        date:'业务发生日期',
        adddk:true,
        dklist:false,
        titlechoose:"请先选择贷款客户",
        choosepage:"dk",//给chooseck组件传一个参数，用来跳转页面的时候跳存款还是跳贷款
        choosemindata:[],
        activeName:'1',
        custmerListdata:[
//          {custName:'张三',custType:'hfjds',followOpinion:'和妇姑荷箪食峰哥说都很富'},
        ]

      }
      },
    created () {
      //mui初始化
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });

    },
    activated(){
      console.log(this.$store.state.activityTypeGuest);
      this.adddk=true
      this.dklist=false
      this.choosemindata=[]
      this.inputvalue=[]
      if(this.$route.query.flag=="choose"){
        this.dklist=true
        this.adddk=false
        this.choosemindata=this.$store.state.markingckdata
      }
      for(var i=0; i< this.choosemindata.length;i++){
        this.choosemindata[i].id=""
        this.choosemindata[i].index=""
        this.choosemindata[i].lsh=""

      }
      this.queryloansGuest()

    },
      methods:{
        goupPage(){
          if(this.$store.state.activityTypeDeposit=="1"){
//                如果有存款 跳存款
            this.$router.push('/moreActivity/moreActivityCont')
            this.$store.state.activeName="0"

          }else{
            this.$router.push('/moreMainPage')
          }
        },
        godownPage(){

          this.getCheckBoxRes("contextBox")
          if(document.getElementsByClassName("contextBox").length==0){
            if(this.$store.state.activityTypeGuest=="1"){
//                如果有潜客 跳潜客
              this.$router.push('/moreActivity/moreQianKe')
              if(this.$store.state.activityTypeDeposit=="1"){
//                  如果前面有存款，下一步就是2
                this.$store.state.activeName="2"
              }else{
                this.$store.state.activeName="1"
              }

            }else
            if(this.$store.state.activityTypeRests=="1"){
//                如果有意向录入 跳意向录入
              this.$router.push('/moreActivity/morePurpose')
              if(this.$store.state.activityTypeDeposit=="1"){
//                  如果前面有存款，下一步就是2
                this.$store.state.activeName="2"
              }else{
                this.$store.state.activeName="1"
              }
            }else
            if(this.$store.state.activityTypeTb=="1"){
//                如果有团建 跳团建
              this.$router.push('/moreActivity/moreTeam')
              if(this.$store.state.activityTypeDeposit=="1"){
//                  如果前面有存款，下一步就是2
                this.$store.state.activeName="2"
              }else{
                this.$store.state.activeName="1"
              }
            }else{
              this.$router.push('/moreMainPage')
            }
            return false
          }
          for(var i=0; i< this.inputvalue.length;i++){
            if(this.inputvalue[i].loansReachNo==""||
              this.inputvalue[i].loansAmount==""||
              this.inputvalue[i].loansDate==""
            ){
              mui.alert("请将流水号、贷款达成、日期输入完整", function() {});
              return false
            }
          }
          var url='/CRMNewMobile/marketing/loanReach'
          this.$http.post(url,
            this.inputvalue
          ).then(
            res=>{
            console.log(res);
              if(this.$store.state.activityTypeGuest=="1"){
//                如果有潜客 跳潜客
                this.$router.push('/moreActivity/moreQianKe')
                if(this.$store.state.activityTypeDeposit=="1"){
//                  如果前面有存款，下一步就是2
                  this.$store.state.activeName="2"
                }else{
                  this.$store.state.activeName="1"
                }

              }else
              if(this.$store.state.activityTypeRests=="1"){
//                如果有意向录入 跳意向录入
                this.$router.push('/moreActivity/morePurpose')
                if(this.$store.state.activityTypeDeposit=="1"){
//                  如果前面有存款，下一步就是2
                  this.$store.state.activeName="2"
                }else{
                  this.$store.state.activeName="1"
                }
              }else
              if(this.$store.state.activityTypeTb=="1"){
//                如果有团建 跳团建
                this.$router.push('/moreActivity/moreTeam')
                if(this.$store.state.activityTypeDeposit=="1"){
//                  如果前面有存款，下一步就是2
                  this.$store.state.activeName="2"
                }else{
                  this.$store.state.activeName="1"
                }
              }else{
                this.$router.push('/moreMainPage')
              }

        },
          res=>{
//             alert("请将以上信息输入完整")
            mui.alert("后台返回错误", function() {});

          }
        )


        },
        /*选中添加群成员*/
        getCheckBoxRes(className){
          var rdsObj   = document.getElementsByClassName(className);
          this.inputvalue=[]
          console.log(rdsObj.length);
          for(var i = 0; i < rdsObj.length; i++){
            var obj=new Object()
            obj.loansCustId=this.choosemindata[i].custId//姓名即custid
            obj.loansReachNo=this.choosemindata[i].lsh//流水号
            obj.loansAmount=this.choosemindata[i].id//贷款款金额
            obj.loansDate=this.choosemindata[i].index//日期
            obj.userAddId=this.cookies.get('identity')//客户身份
//            obj.marktingId="baf2405a63384cbf9b51685f2d05774e"//活动id
            obj.marktingId=this.$store.state.marktingId//活动id

            this.inputvalue.push(obj)
            console.log(this.inputvalue);

          }
          console.log(this.inputvalue)
          return this.inputvalue;
        },
        //        获取贷款达成里面的回显数据
        queryloansGuest(){
          var url='/CRMNewMobile/marketing/queryloansGuest'
          this.$http.post(url,
            {
              "identity":this.cookies.get('identity'),
              "marktingId":this.$store.state.marktingId
            },
            {
              emulateJSON:true
            }

          ).then(
            res=>{
              console.log(res);
              this.custmerListdata=res.body.ListData
            },
            res=>{
//             alert("请将以上信息输入完整")
              mui.alert("后台返回错误", function() {});

            }
          )
        }
      },

  }
</script>

<style lang='scss' scoped>
  .loansli{
    border-bottom: 1px solid #e5e5e5;line-height: 40px;
  }
  input{
    border: none !important;
    font-size:12px !important;
  }
  .date{
    /*width:100px;*/
    font-size:10px;
    padding: 0;
  }
  .Context1{
    background: #ffffff;
    border-bottom: 1px solid #E2E2E2;
  }
  .contextBox{
    width: 100%;
    height: 40px;
    text-align: center;
  }
  .contextBox div{
    float: left;
    line-height: 40px;
    font-size: 14px;

  }
  .contextBox div:nth-child(1){
    text-align: center;
    width: 22%;
  }

  .contextBox div:nth-child(2){
    color:#FB7420;
    width: 25%;
  }
  .contextBox div:nth-child(3){
    width: 25%;
    background-color: #fff;
  }
  .contextBox div:nth-child(4){
    width: 28%;
  }

  .moreLoansBox{
    height:100%;
    width: 100%;
    text-align: center;
    overflow: scroll;
    /*margin-top:44px;*/

}
  .moreLoansBox .divcol{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .moreLoansBox .custName{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
