<template>
  <div class="filterBox">
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
     <!--<div class="itemStyle1">
       <el-row>
         <el-col :span="12" class="leftCol" style="margin-top:10px;width: 40% !important;" >
           <button class="but01">客户等级</button></el-col>
          <el-col :span="12" class="rightCol" style="margin-top:10px;width: 52% !important;">
           <el-checkbox-group v-model="checkList" :max="8" style="text-align: left !important;">
            <el-checkbox label="一级" key="0">一级</el-checkbox>
            <el-checkbox label="二级" key="1">二级</el-checkbox>
            <el-checkbox label="三级" key="2">三级</el-checkbox>
             <br>
            <el-checkbox label="四级" key="3">四级</el-checkbox>
            <el-checkbox label="五级" key="4">五级</el-checkbox>
            <el-checkbox label="白金" key="5">白金</el-checkbox>
             <br>
            <el-checkbox label="黄金" key="6">黄金</el-checkbox>
            <el-checkbox label="钻石" key="7">钻石</el-checkbox>
          </el-checkbox-group>
          </el-col>
       </el-row>
    </div>-->
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
            <div class="confirmbtn" @click="goSearch">确认</div>
          </el-col>
       </el-row>
    </div>
  </div>

</template>
<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'


  export default {
    data () {
      return {
        title:'活动通知下发',
        crashStar:"",
        crashEnd:"",
        incomeStar:"",
        incomeEnd:"",
        outputStar:"",
        outputEnd:"",
        checkList: ['一级','二级']

      }
    },
    components: {
      BackHeader,
    },
    methods: {
      clearSelect(){
        this.crashStar = "";
        this.crashEnd = "",
        this.incomeStar = "",
        this.incomeEnd = "",
        this.outputStar = "",
        this.outputEnd = "",
        this.checkList = [];
      },
      goSearch(){
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

        this.$emit("goSearch",allDiss,JSON.stringify(carsh),JSON.stringify(income),JSON.stringify(customerLever));
        /*清空输入内容*/
        this.crashStar = ""
        this.crashEnd = ""
        this.incomeStar = ""
        this.incomeEnd = ""
        this.outputStar = ""
        this.outputEnd = ""
      }
    },

  }
</script>

<style scoped>
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
</style>
