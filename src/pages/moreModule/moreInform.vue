<template>
  <div class="moreInformBox">
    <back-Header :title="title" :flag="flag"></back-Header>
    <div class="container">
      <!--全选-->
      <div class="selectAll" @click="selectAll">全选</div>
      <!--筛选图标-->
      <div class="shuaixuan" @click='gofilterBox()'><img src="../../../static/images/筛选@2x.png" height="23" width="21" alt=""></div>
      <!--出来的筛选页面-->
      <!--<filterBox v-show='isShow' @goSearch='goSearch'></filterBox>-->
      <div class="filterBox" v-show='isShow'>
        <!--<back-Header :title="title" ></back-Header>-->
        <div class="itemStyle">
          <el-row>
            <el-col :span="12" class="leftCol" style="margin-top:10px;width: 40% !important;" >
              <button class="but01">资产规模</button></el-col>
            <el-col :span="12" class="rightCol" style="width: 60% !important; ">
              <el-input size="small" placeholder="" v-model="crashStar"></el-input> 至
              <el-input size="small" placeholder="" v-model="crashEnd"></el-input>万元
            </el-col>
          </el-row>
        </div>
        <div class="itemStyle">
          <el-row>
            <!--<el-col :span="12" class="leftCol" style="margin-top:5px;"> <el-button type="primary" :disabled="true">存款日均</el-button></el-col>-->
            <el-col :span="12" class="leftCol" style="margin-top:10px;width: 40% !important;" >
              <button class="but01">存款日均</button></el-col>
            <el-col :span="12" class="rightCol" style="width: 60% !important; ">
              <el-input size="small" placeholder="" v-model="incomeStar"></el-input>
              <span>至</span>
              <el-input size="small" placeholder="" v-model="incomeEnd"></el-input>万元
            </el-col>
          </el-row>
        </div>
        <div class="itemStyle">
          <el-row>
            <!--<el-col :span="12" class="leftCol" style="margin-top:5px;"> <el-button type="primary" :disabled="true">贷款余额</el-button></el-col>-->
            <el-col :span="12" class="leftCol" style="margin-top:10px;width: 40% !important;" >
              <button class="but01">贷款余额</button></el-col>
            <el-col :span="12" class="rightCol" style="width: 60% !important; ">

              <el-input size="small" placeholder="" v-model="outputStar"></el-input>
              <span>至</span>
              <el-input size="small" placeholder="" v-model="outputEnd"></el-input>万元
            </el-col>
          </el-row>
        </div>
        <div class="bottomBtn">
          <el-row>
            <el-col :span="24">
              <div class="resetbtn" @click="clearSelect">重置</div>
              <div class="confirmbtn" @click="goShaiXuan">确认</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="zzc" v-show='isShow' @click="clickzzc"></div>

      <!--筛选结果查询页 三个小副标题-->
      <filterResult v-show='goShow' :carsh="carsh" :customerLever="customerLever" :income="income"></filterResult>


      <div class="informCont"><moreInformCont :sliders="sliders" @loadBottom="loadBottom"></moreInformCont></div>
      <el-table v-loading="loading2"  v-show="loading" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>

      <moreMessageAlert v-show='isShowAlert' :returnMsg="returnMsg"  @turnGoInform='turnGoInform'></moreMessageAlert>
    </div>
    <div class="operate">
      <moreBottomStep :updown='updownA' :btnDisabled ="btnDisabled" @goupPage='goupPage' @godownPage='godownPage'></moreBottomStep>
    </div>

  </div>
</template>

<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
  import moreInformCont from '@/components/common/moreComponents/moreInformCont'
  import moreBottomStep from '@/components/common/moreComponents/moreBottomStep'
  import moreMessageAlert from '@/components/common/moreComponents/moreMessageAlert'
  //mport filterBox from '@/components/common/activityNotice/filterBox'
  import filterResult from '@/components/common/activityNotice/filterResult'
  import  mui from '../../style/js/mui.min.js'
  export default {
    components:{
      BackHeader,
      moreInformCont,
      moreBottomStep,
      //filterBox,
      filterResult,
      moreMessageAlert
    },
    data () {
      return {
        title:'活动通知下发',
        updownA:["模板","发送"],
        isShow:false,
        goShow:false,
        isShowAlert:false,
        contentshow:true,
        backheadershow:true,//第一页的标题
        sliders:[],
        slidersold:[],
        slidersnew:[],
        carsh:'',//资产规模
        customerLever:'',//存款日均
        income:'',//贷款余额
        loading2: true,
        loading: true,
        msgflag:'',
        flag:'moreMainPage',
        noteMsg:'',
        msgval:[],
        nextpage:1,//下一页
        prevpage:0,//上一页
        pageCount:'',//总页数
        shaixuanflag:'', //判断是页面一上来走的接口还是筛选出来的数据上下滑动接口
        pageflag:0,

        /*筛选页面输入参数*/
        crashStar:"",
        crashEnd:"",
        incomeStar:"",
        incomeEnd:"",
        outputStar:"",
        outputEnd:"",
        /*控制发送按钮的状态：当用户点击完发送按钮按钮，成功之后才可以再次点击*/
        btnDisabled:false,
        //发送消息返回的message
        returnMsg:'',
        /*是否全选*/
        isSelectAll:0,
        markSelect:'',
        /*是否第一次点击全选按钮*/
        isFirst:false

      }
    },
    created () {
//mui初始化
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });

    },
    activated(){
        this.isSelectAll = 0
        this.markSelect = ''
        this.isFirst = false
      /*初始化发送按钮可以点击*/
      this.btnDisabled = false
      this.returnMsg = ''

      this.carsh=""
      this.customerLever=""
      this.income=""

      this.nextpage=1
      this.prevpage=1
      this.pageflag=0

      this.isShow=false
      this.goShow=false
      this.isShowAlert=false
      this.contentshow=true
      /*判断用户是否是首次进入活动通知下发页面*/
      if(this.$route.query.init=="init"){
        this.loading2=true
        this.loading=true
        this.sliders=[]
        this.slidersold=[]
        this.slidersnew=[]
        this.datalist()
      }
      this.noteMsg=this.$route.query.mesg
      this.msgval=[],
        this.shaixuanflag=""
      this.msgflag="" //让flag 为空 如果是从模板页面返回来的就保存这个值，然后在进入模板的时候 保留短信的值。
      if(this.$route.query.flag!=undefined){
        this.msgflag=this.$route.query.flag}
    },
    methods:{
        /*全选*/
      selectAll(){
          /*判断是否第一次点击全选按钮*/
          if(this.isFirst == false){
            this.isSelectAll = 1
            var listMap = document.getElementsByClassName('checkipt');
            for(var i=0;i<listMap.length;i++){
              listMap[i].checked = true
            }
            this.isFirst = true
          }else{
            this.isSelectAll = 0
            var listMap = document.getElementsByClassName('checkipt');
            for(var i=0;i<listMap.length;i++){
              listMap[i].checked = false
            }
            this.isFirst = false
          }

      },
      loadBottom() {
        this.loading2=true
        this.loading=true
        console.log("this.prevpage"+this.prevpage)
        console.log("this.pageCount"+this.pageCount)
        if(this.pageflag==this.nextpage){
          return false
        }
        if(this.prevpage+1>=this.pageCount){
          this.nextpage=this.pageCount
          console.log("到最后一页了")
          this.loading2=false
          this.loading=false
          return false
        }
        if(this.shaixuanflag=="goSearch"){
          this.goSearch()
        }else{
          this.datalist()
        }

      },
      gofilterBox(){
        this.slidersold=[]
        this.slidersnew=[]
        this.isShow = !this.isShow
        if(this.isShow == true){
           this.clearSelect()
        }
        this.contentshow=!this.contentshow

      },
//筛选页面弹出来之后，点击遮罩层让筛选页面折叠回去。

      clickzzc(){
        this.isShow = !this.isShow
      },
//点击筛选确定按钮走的接口
      goSearch(value,carsh,income,customerLever){
        this.shaixuanflag="goSearch"
        this.sliders=[]
        this.slidersnew=[]
        this.loading2=true
        this.loading=true
        console.log(value);
        this.nextpage=1
        this.carsh=carsh
        this.income=income
        this.customerLever=customerLever

//          六个数是必填项，不填直接返回给提示
        if(value.depositAmount1==""||value.depositAmount2==""||value.depositeAvgM1==""||
          value.depositeAvgM2==""||value.loanAmount1==""||value.loanAmount2==""
        ){
//            this.isShow = !this.isShow
          mui.alert("请将以上内容输入完整", function() {
          });
          return false
        }

        var data=value

        var url= `/CRMNewMobile/marketing/queryBelongingToCustomer`
        this.$http.post(url,
          {
             "identity":this.cookies.get('identity'),
            "depositAmount1":data.depositAmount1,
            "depositAmount2":data.depositAmount2,
            "depositeAvgM1":data.depositeAvgM1,
            "depositeAvgM2":data.depositeAvgM2,
            "loanAmount1":data.loanAmount1,
            "loanAmount2":data.loanAmount2,
            "custGradeType":data.custGradeType,
            "pageNum":data.pageNum,
            "marktingId":data.marktingId,
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
            if(res.body.data== null || res.body.data.data.length==0){
              this.loading=true
              this.loading2=false
              this.slidersnew=[]
              this.sliders=[]
              this.slidersold=[]
            }else{
              this.slidersnew=res.body.data.data
              this.sliders=this.slidersold.concat(this.slidersnew);
              this.slidersold=this.sliders
              console.log(this.slidersold);
              console.log(this.slidersnew);
              console.log(this.sliders);

              this.nextpage=res.body.data.next
              this.prevpage=res.body.data.prev
              this.pageCount=res.body.data.pageCount
              this.successorfalse=res.body.msg

              this.loading2=false
              this.loading=false
            }

          },
          res => {
            console.log(res)
          }
        )
        this.isShow =false;
        this.goShow=true;
      },
//如果筛选页面处于隐藏状态，用户未点击确定查询，则将用户输入内容置空
      closeInput(){
        if(this.isShow == true){
          /*清空输入内容*/
          this.crashStar = ""
          this.crashEnd = ""
          this.incomeStar = ""
          this.incomeEnd = ""
          this.outputStar = ""
          this.outputEnd = ""
        }

      },
      goupPage(){
        this.$router.push('/moreMessage?flag='+this.msgflag)
      },
      turnGoInform(){
        this.isShowAlert=false
      },
//页面一上来列表页数据接口
      datalist(){
        this.slidersnew=[]
        this.sliders=[]
        this.pageflag=this.nextpage
        var url= `/CRMNewMobile/marketing/queryBelongingToCustomer`
        this.$http.post(url,
          { "identity":this.cookies.get('identity'),
              "depositAmount1":"",
              "depositAmount2":"",
              "depositeAvgM1":"",
              "depositeAvgM2":"",
              "loanAmount1":"",
              "loanAmount2":"",
              "custGradeType":"",
              "pageNum":this.nextpage,
              "marktingId":this.$store.state.marktingId
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
            if(res.body.data == null || res.body.data.data.length==0){
              this.loading=true
              this.loading2=false
              this.slidersnew=[]
              this.sliders=[]
              this.slidersold=[]
            }else{
              this.slidersnew=res.body.data.data
              this.sliders=this.slidersold.concat(this.slidersnew);
              this.slidersold=this.sliders

              console.log('用户数据=》')
              console.log(this.slidersold);
              console.log(this.slidersnew);
              console.log(this.sliders);


              this.nextpage=res.body.data.next
              this.prevpage=res.body.data.prev
              this.pageCount=res.body.data.pageCount

              this.loading2=false
              this.loading=false
            }

          },
          res => {
            console.log(res)
            this.loading2=false
            this.loading=true
          }
        )
      },
//获取短信内容据接口
      godownPage(){
       /*判断是否点击全选按钮*/
        if(this.isSelectAll == 0){
           this.markSelect = ''
        }else{
          this.markSelect =  this.$store.state.marktingId;
        }

        /*当用户点击完发送按钮，不能再次点击*/
        this.btnDisabled = true
        this.getCheckBoxRes("checkipt")
        if(this.noteMsg==undefined){
          this.$alert('请先编辑短信内容哦', '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {}
          });
          return false
        }


        var url= `/CRMNewMobile/marketing/activitySendNote`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
              "listArr":JSON.stringify(this.msgval),
              "selectAll":this.markSelect,
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
            //获取返回的消息
            this.returnMsg = res.body.data.name;
            this.isShowAlert=true;

            /*重置发送按钮：变为可点击状态*/
            this.btnDisabled = false
          },
          res => {
            /*重置发送按钮：变为可点击状态*/
            this.btnDisabled = false
            console.log(res)
          }
        )

      },
      /*选中添加群成员*/
      getCheckBoxRes(className){
        var rdsObj   = document.getElementsByClassName(className);
        this.msgval=[]
        console.log(rdsObj.length);

        for(var i = 0; i < rdsObj.length; i++){

          if(rdsObj[i].checked==true){
            console.log(i)
            var obj=new Object()
           /* obj.identity=this.cookies.get('identity')*/
            /*obj.linkmanTel="18210971673"*/
            obj.linkmanTel= this.sliders[i].linkmanTel
            obj.noteMsg=this.noteMsg
            obj.custName=this.sliders[i].custName
            obj.custId=this.sliders[i].custId
            this.msgval.push(obj)

            console.log(this.msgval);
//                rdsObj[i].parentNode.parentNode.parentNode.style.display="none"

          }
        }
        console.log(this.msgval)
        return this.msgval;
      },
/*清空筛选用户输入内容方法*/
      clearSelect(){
        this.crashStar = "";
        this.crashEnd = "",
        this.incomeStar = "",
        this.incomeEnd = "",
        this.outputStar = "",
        this.outputEnd = ""
      },
/*筛选页面，确认按钮操作*/
      goShaiXuan(){
//        let allCondition = {crash:"",income:"",customerLever:""};
        let carsh = "客户规模("+this.crashStar+"-"+this.crashEnd+"万)";
        let income = "存款日均("+this.incomeStar+"-"+this.incomeEnd+"万)";
        let customerLever = "贷款余额("+this.outputStar+"-"+this.outputEnd+"万)";

        let allDiss={
          "depositAmount1":this.crashStar,
          "depositAmount2":this.crashEnd,
          "depositeAvgM1":this.incomeStar,
          "depositeAvgM2":this.incomeEnd,
          "loanAmount1":this.outputStar,
          "loanAmount2":this.outputEnd,
          "custGradeType":"",
          "pageNum":1,
          "marktingId":this.$store.state.marktingId
        }

       /* this.$emit("goSearch",allDiss,JSON.stringify(carsh),JSON.stringify(income),JSON.stringify(customerLever));*/
        this.goSearch(allDiss,JSON.stringify(carsh),JSON.stringify(income),JSON.stringify(customerLever))
        /*清空输入内容*/
        this.clearSelect()
      }

    }
  }
</script>

<style lang='scss' scoped>
  .zzc{
    position: absolute;
    top:2.32rem;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.1);
    z-index: 999;
  }
  .mui-popup{
    z-index: 9999999 !important;
  }
  .mui-popup-backdrop{
    z-index: 99999 !important;
  }
  .moreInformBox{
    height:100%;
    width: 100%;
    /*position:fixed;*/
    /*top:0;*/
    /*left:0;*/
    /*设置底部按钮置顶样式*/
    display: flex;
    display:-ms-flex;
    display:-webkit-flex;
    flex-direction: column;

    .back_text span[data-v-a2006ea4] {
      width: 6em!important;
    }
    .shuaixuan{
      position:fixed;
      top:12px;
      right:10px;
      z-index:1000;
    }
    .informCont{
      margin-top:10px;
    }
    [class*=" el-icon-"], [class^=el-icon-]{
      float:right;
      position: relative;
      top:0%;
    }

    .other_footer{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2.5em;
      border-top: 1px solid #EB3723;
      div{
        float: left;
        width: 50%;
        height: 100%;
        text-align: center;
        line-height: 2.5em;
      }
    }

    .other_footer .cancel{
      color: #EB3723;
      background-color: #fff;
    }
    .other_footer .keep{

      color: #fff;
      background-color: #EB3723;
    }
  }
  /*解决用户输入底部按钮置顶*/
  .moreInformBox .container{
    flex:1;-ms-flex:1;-webkit-flex:1
  }
  .moreInformBox .operate{
    position: relative;
  }

  /*筛选页面样式*/
  .filterBox{
    background-color: #F8F9FB ;
    position: relative;
    width: 100%;
    height: 230px;
    overflow: hidden;
    font-size: 14px;
    z-index: 9999;
  }
  .mui-popup{
    z-index: 9999999 !important;
  }
  .mui-popup-backdrop{
    z-index: 999999 !important;
  }
  .iconStyle{
    float: left;
    width: 8%;
    margin-left: 5%;
  }
  [class*=el-col-] {
    float: none !important;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 5px !important;
  }
  .el-checkbox__label{
    padding-left: 8px !important;
  }
  .itemStyle{
    height:50px;
    line-height:43px;
    font-size:14px;
    background-color:#fff;
    border-bottom:1px solid #ddd;
    position:relative;
  }
  .itemStyle1{
    height:100px;
    font-size:14px;
    background-color:#fff;
    border-bottom:1px solid #ddd;
  }
  .leftCol {
    text-align: left;
    padding-left: 15px;
  }
  span{
    color:#555;
  }

  .rightCol {
    position: absolute;
    right: 0;
    top: 0;
    text-align: right;
    padding-right: 15px;
  }

  span{
    color:#222;
  }

  .el-input {
    width: 66px !important;
    height:24px !important;
  }
  input[type=text]{
    /*width:66px !important;*/

  }
  .resetbtn{
    float: left;
    width: 50%;
    height: 39px;
    background: #fff;
    border-top:1px #EB3723 solid;
    text-align: center;
    font-size: 16px;
    line-height: 39px;
    color: #EB3723;
  }
  .confirmbtn{
    float: left;
    width: 50%;
    height: 39px;
    background: #EB3723;
    border-top:1px #EB3723 solid;
    text-align: center;
    font-size: 18px;
    line-height: 39px;
    color: #fff;
  }
  .bottomBtn{
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .but01{
    background-color: #E6E6E6 !important;
    color:#333333 !important;
    border:none;
    width: 83px;
    height:28px;
    border-radius: 4px;
    line-height: 0;
  }
  .el-input--small .el-input__inner {
    height: 24px !important;
  }
  /*全选*/
  .selectAll{
      width: 60px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      display: inline-block;
      position: fixed;
      top: 0px;
      right: 50px;
      z-index: 1000;
  }
</style>
