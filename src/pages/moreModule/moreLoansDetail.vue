<template>
    <div class="temp">
      <back-Header :title="title" ></back-Header>
      <div >
        <moreHead :mymoney='mymoney' :date="date"></moreHead>
        <ul class="Context1" >
          <li class="contextBox" v-for='(item,index) in choosemindata'>
           <!-- <div class="inputWrap"><input type="number" placeholder="请输入" v-model="item.lsh"></div>-->
            <div class="inputWrap"><el-input  placeholder="请输入" v-model="item.lsh"></el-input></div>
            <!--<div><input type="number" placeholder="请输入" v-model="item.id"></div>-->
            <div class="inputWrap"><el-input  placeholder="请输入" v-model="item.id"></el-input></div>
            <div class="inputWrap  loancustName" v-model="item.custId">{{item.custName}}</div>
            <div class="inputWrap"><input type="date" placeholder="请选择" v-model="item.index" class="date"> </div>
          </li>
        </ul>
      </div>

      <!--<moreBottomStep :updown="updownA" @goupPage='goupPage' @godownPage='godownPage'></moreBottomStep>-->
      <moreBottom :mymessage='mymessage' @goNextPage='godownPage'></moreBottom>
    </div>
</template>

<script type=text/ecmascript-6>
  import  mui from '../../style/js/mui.min.js'
  import BackHeader from '@/components/header/back-header'
  import moreHead from '@/components/common/moreComponents/moreHead'
  import moreBottom from '@/components/common/moreComponents/moreBottom'
  export default {
    components:{
      BackHeader,
      moreHead,
      moreBottom,
    },
    data () {
      return {
        title:"贷款客户选择",
        updownA:["上一步","下一步"],
        mymessage:'提交',
        mymoney:'贷款达成',
        date:'日期',
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
      this.adddk=true
      this.dklist=false
      this.choosemindata=[]
      this.inputvalue=[]
      this.choosemindata=this.$store.state.markingdkdata
      for(var i=0; i< this.choosemindata.length;i++){
        this.choosemindata[i].id=""
        this.choosemindata[i].index=""
        this.choosemindata[i].lsh=""

      }

    },
    methods:{

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
          /*校验--流水号、存款达成*/
          var reg = /^[0-9]*$/;

          if(!(reg.test(this.inputvalue[i].loansReachNo*1)) || !(reg.test(this.inputvalue[i].loansAmount*1))){
            mui.alert("亲，流水号/贷款达成必须是数字！")
            return false
          }

        /*  if(!(reg.test(this.inputvalue[i].loansAmount*1))){
            mui.alert("亲，存款达成输入格式有误！")
            return false
          }*/

        }

        var url='/CRMNewMobile/marketing/loanReach'
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
              "listArr":JSON.stringify(this.inputvalue)
          },
          {
            emulateJSON:true
          }
        ).then(
          res=>{
            console.log(res);
            //                如果有贷款 跳贷款
            this.$router.push('/moreActivity/moreLoans')

            if(this.$store.state.activityTypeDeposit=="1"){
              this.$store.state.activeName="1"
            }else{
              this.$store.state.activeName="0"
            }


          },
          res=>{
         /*   mui.alert("后台返回错误", function () {

            });*/

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

    },

  }
</script>

<style lang='scss' scoped>
  input[type=color], input[type=date], input[type=datetime-local], input[type=datetime], input[type=email], input[type=month], input[type=number], input[type=password], input[type=search], input[type=tel], input[type=text], input[type=time], input[type=url], input[type=week], select, textarea {
    text-align: center;
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
   /* border-bottom: 1px solid #E2E2E2;*/
  }
  .contextBox{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .contextBox .loancustName{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /*.contextBox div{
    float: left;
    line-height: 40px;
    font-size: 14px;

  }
  .contextBox div:nth-child(1){
    text-align: center;
    width: 25%;
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
    !*margin-top:44px;*!

  }*/
  .contextBox div[data-v-483024b0]:nth-child(1){
    height: 40px;
  }
  .contextBox .inputWrap{
    float: left;
    width: 25% !important;
    height: 100%;
  }
  .contextBox .inputWrap .text{
    width: 100%;
    height: 100%;
    margin-bottom: 0 !important;
  }

</style>
