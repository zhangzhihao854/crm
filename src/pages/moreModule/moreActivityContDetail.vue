<template>
    <div class="tempCK">
      <div class="container">
        <back-Header :title="title" ></back-Header>
        <moreHead :mymoney='mymoney' :date="date"></moreHead>
        <div style="height: 100%">
          <ul class="Context1">
            <li class="contextBox" v-for='(item,index) in choosemindata'>
              <div><input type="number" placeholder="请输入" v-model="item.lsh"></div>
              <div><input type="number" placeholder="请输入" v-model="item.id"></div>
              <div v-model="item.custId">{{item.custName}}</div>
              <div><input type="date" placeholder="请选择" v-model="item.index" class="date"> </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="operate">
        <moreBottom :mymessage='mymessage' @goNextPage='goNextPage'></moreBottom>
       <!-- <button style="width: 100%;height: 40px;background: red;color: #fff;">提交</button>-->
      </div>
    </div>
</template>

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
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: #ffffff;
    border-bottom: 1px solid #E2E2E2;
  }
  .contextBox{
    width: 100%;
    height: 40px;
    text-align: center;
    /*border-bottom: 1px solid #e5e5e5;*/

  }
  .contextBox div{
    float: left;
    line-height: 40px;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

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

  .moreActivityBox1{

    height: 90%;
    /*height:auto;*/
    width: 100%;
    text-align: center;
  .back_text span[data-v-a2006ea4] {
    width: 6em!important;
  }
  }

  /*设置键盘置顶样式*/
  .tempCK{
    min-height:100%;
    display: flex;
    display:-ms-flex;
    display:-webkit-flex;
    flex-direction: column;
  }
  .tempCK .container{
    flex:1;
    -ms-flex:1;
    -webkit-flex:1
  }
  .tempCK .operate{
    position: relative;
  }
</style>

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
        title:'存款客户选择',
        mymessage:'提交',
        mymoney:'存款达成',
        date:'日期',
        cklist:false,//选出来的客户列表
        addck:true,//添加点击选择客户
        choosemindata:[],//客户在存款选择页面，选来的客户
        inputvalue:[],//客户在主页输入的内容，点击下一步 传给后台
        custName:'',// 姓名

      }
    },
    created () {
      //mui初始化
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });

    },
    activated(){
      this.cklist=false
      this.addck=true
      this.choosemindata=[]
      this.inputvalue=[]
      console.log(this.$store.state.markingckdata)
        this.choosemindata=this.$store.state.markingckdata
      for(var i=0; i< this.choosemindata.length;i++){
        this.choosemindata[i].id=""
        this.choosemindata[i].index=""
        this.choosemindata[i].lsh=""

      }
    },
    methods:{
//        点击下一步按钮
      goNextPage(){


        this.getCheckBoxRes("contextBox")
        console.log("我是列表长度，如果是0就是没选"+document.getElementsByClassName("contextBox").length);

        for(var i=0; i< this.inputvalue.length;i++){
          if(this.inputvalue[i].depositReachNo==""||
            this.inputvalue[i].depositAmount==""||
            this.inputvalue[i].depositDate==""
          ){
            mui.alert("请将流水号、存款达成、日期输入完整", function() {});
            return false
          }
        }

        var url='/CRMNewMobile/marketing/depositReach'
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
              "listArr":JSON.stringify(this.inputvalue)
          } ,
          {
            emulateJSON:true
          }
        ).then(
          res=>{
            console.log(res);
            this.$router.push('/moreActivity/moreActivityCont')
            this.$store.state.activeName="0"

          },
          res=>{
//             alert("请将以上信息输入完整")
           // mui.alert("后台返回错误", function() {});

          }
        )
      },
      /*获取填入内容的信息*/
      getCheckBoxRes(className){
        var rdsObj   = document.getElementsByClassName(className);
        this.inputvalue=[]
        console.log(rdsObj.length);
        for(var i = 0; i < rdsObj.length; i++){
          var obj=new Object()
          obj.depositCustId=this.choosemindata[i].custId//姓名即custid
          obj.depositReachNo=this.choosemindata[i].lsh//流水号
          obj.depositAmount=this.choosemindata[i].id//存款金额
          obj.depositDate=this.choosemindata[i].index//日期
         /* obj.userAddId=this.cookies.get('identity')//客户身份*/
          obj.marktingId=this.$store.state.marktingId//活动id

          this.inputvalue.push(obj)
          console.log(this.inputvalue);
        }
        console.log(this.inputvalue)
        return this.inputvalue;
      }
    }
  }
</script>
