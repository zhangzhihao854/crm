<template>
   <div class="clientyingbox">
     <!--头部-->
     <BackHeader :title="title" @showHide="showHide"></BackHeader>
       <!--判断数据为空时，显示暂无数据-->
       <div v-show="eventShow" style="text-align: center; ">
         <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
           <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
         </div>
         <div style="margin-top: 20px;">暂时没有信息哦~</div>
       </div>
       <!--内容-->
      <div class="clientyingbox" v-show="showThis">
        <!--<div class="clientyingbox">-->
        <!--反馈信息列表-->
        <el-row  v-for="(item, index) in feedBackList" :key="index">
          <el-col :span="24"><div class="grid-content bg-purple-dark"></div>反馈标题: {{item.feedbackTitle}}</el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark"></div>反馈类型: {{item.feedbackType}}</el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark"></div>反馈渠道: {{item.feedbackNaiyoo}}</el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark"></div>反馈内容: {{item.feedbackCont}}</el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark"></div>反馈时间: {{item.feedbackTime2}}</el-col>
        </el-row>
        <!--<el-row>
          <el-col :span="24"><div class="grid-content bg-purple-dark"></div>反馈标题: 1111</el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark"></div>反馈类型: 2222</el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark"></div>反馈渠道: 1111</el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark"></div>反馈内容: 111</el-col>
          <el-col :span="24"><div class="grid-content bg-purple-dark"></div>反馈时间: 111</el-col>
        </el-row>-->
      </div>

     <!--筛选界面-->
     <div class="filtercontent" v-show="showShaiXuan">
       <div class="filterc">
         <div class="f-left ipt">
           <span>反馈标题</span>
         </div>
         <div class="f-right">
           <el-input v-model="feedTitle" placeholder="请输入"></el-input>
         </div>
       </div>
       <div class="filterc">
         <div class="f-left ipt">
           <span>反馈类型</span>
         </div>
         <div class="f-right">
           <el-select v-model="value" placeholder="请选择">
             <el-option
               v-for="item in feedbackChannel"
               :key="item.fId"
               :label="item.fValue"
               :value="item.fValue">
             </el-option>
           </el-select>
         </div>
       </div>
       <div class="filterc">
         <div class="f-left ipt">
           <span>反馈渠道</span>
         </div>
         <div class="f-right">
           <el-select v-model="value1" placeholder="请选择">
             <el-option
               v-for="item in feedbackType"
               :key="item.fId"
               :label="item.fValue"
               :value="item.fValue">
             </el-option>
           </el-select>
         </div>
       </div>
       <div class="filtfoot">
         <div class="footf f-lef" @click="resetNumber">
           <span>重置</span>
         </div>
         <div class="footf f-righ" @click="getfeedbackSX">
           <span>查询</span>
         </div>
       </div>
     </div>

  </div>
</template>

<script type=text/ecmascript-6>
  import BackHeader from '../../../../src/components/header/feedBackLS-header.vue'
  export default {
    data () {
      return {
        title:'客户反馈信息',
        custId: '',
        feedBackList: [],
        //信封图片显示
        eventShow: false,
        //控制列表信息的显示
        showThis:true,
        //控制筛选界面
        showShaiXuan: false,
        //反馈渠道
        feedbackChannel: [],
        value1: '',
        //反馈类型
        feedbackType: [],
        value: '',
        //反馈标题
        feedTitle: ''

        }
      },
    activated(){
      //获取custId
      this.custId = this.$route.query.custId
      //初始化数据
      this.eventShow = false
      this.showThis = true
      this.feedBackList = []
      this.showShaiXuan = false
      //获取反馈信息数据
      this.getfeedback()
      //获取反馈类型数据
      this.getFeedBackType()
      //获取反馈类型数据
      this.getqueryBackType()
    },
      methods:{
        //获取反馈渠道数据
        getFeedBackType(){
          var url = `/CRMNewMobile/business/queryBackChannel`;
          this.$http.post(url,
            {
              "identity": this.cookies.get('identity'),
              "custId": this.custId
            },
            {
              emulateJSON:true
            }
          ).then(res => {
            this.feedbackChannel = res.body.ListData;

          }).catch((error) => {
          })
        },
        //获取反馈类型数据
        getqueryBackType(){
          var url = `/CRMNewMobile/business/queryBackType`;
          this.$http.post(url,
            {
              "identity": this.cookies.get('identity'),
              "custId": this.custId
            },
            {
              emulateJSON:true
            }
          ).then(res => {
              this.feedbackType = res.body.ListData

          }).catch((error) => {
          })
        },
        //获取反馈信息数据
        getfeedback(){
            var url = '/CRMNewMobile/business/queryBackInfoByCustId';
            this.$http.post(url,
              {
              "identity": this.cookies.get('identity'),
              "feedbackTitle": '',
              "feedbackType": '',
              "feedbackNaiyoo": '',
              "custId": this.custId,
              },
              {
                emulateJSON:true
              }
            ).then(res =>{
              //没有数据则显示信封（暂无数据）
              if(res.body.ListData[0] == null){
                  this.showThis = false;
                  this.eventShow = true;
                  this.feedBackList = [];
              }else{
                  this.showThis = true;
                  this.eventShow = false;
                  this.feedBackList = res.body.ListData;
              }

            }).catch(error => {

            })

        },
        //点击查询按钮，进行条件筛选
        getfeedbackSX(){
          var url = '/CRMNewMobile/business/queryBackInfoByCustId';
          this.$http.post(url,
            {
            "identity": this.cookies.get('identity'),
              "feedbackTitle": this.feedTitle,
              "feedbackType": this.value,
              "feedbackNaiyoo": this.value1,
              "custId": this.custId,
            },
            {
              emulateJSON:true
            }
          ).then(res =>{
            //没有数据则显示信封（暂无数据）
            if(res.body.ListData[0] == null){
              /*this.showThis = false;
              this.eventShow = true;
              this.feedBackList = [];*/

              this.showThis = false;
              this.eventShow = true;
              this.showShaiXuan = false;
              this.feedBackList = []
            }else{
              this.showThis = true;
              this.eventShow = false;
              this.showShaiXuan = false;
              this.feedBackList = res.body.ListData;
            }

          }).catch(error => {

          })

        },
        //控制筛选界面的显示与隐藏
        showHide(){
            this.showShaiXuan = !this.showShaiXuan;
            if(this.showShaiXuan == true){
                this.showThis = false;
                this.eventShow = false;
                //清空输入内容
                this.feedTitle = ''
                this.value1 = ''
                this.value = ''
            }else{
              this.showThis = true;
              this.eventShow = true;
            }


        },
        //重置
        resetNumber(){
            this.feedTitle = ''
            this.value1 = ''
            this.value = ''
        },
        //点击返回按钮，返回的上一页
        goPage(){
            this.$router.go(-1)
        }
      },
      components: {
        BackHeader,
      }

  }
</script>

<style lang='scss' scoped>
  .filter{
    position: absolute !important;
    top: 0.6rem !important;
    right: 1rem !important;
    z-index: 100;
  }
  .filter .shaixuan{
    width: 1.16rem;
    height: 1.25rem;
    vertical-align: middle;
  }
  .clientyingbox{
    border-bottom: 1px solid #EAE7E7;
    border-top: 1px solid #EAE7E7;
    background: #ffffff;
  }
  .grid-content {
    min-height:30px;
    line-height: 30px;
  }
  .grid-content2{
    min-height:30px;
    line-height: 30px;
    margin-bottom:-10px;
    color: #222222;
    font-size: 0.88rem;
  }
  .grid-content1{
    margin-left: 12.5%;
    word-break: break-all;
    word-wrap: break-word;
    margin-right: 12.5%;
    font-size: 0.77rem;
    color: #555;
  }
  .f-left{
    font-size: 0.86rem;
    color: #888888;
    height: 2.5rem;
    width: 8rem;
    display: inline-block;
  }
  .ipt{
    line-height: 2.5rem;
  }
  .ipt span{
    margin-left: 1rem;
  }
  .f-right{
    float: right;
    color: #CFCCCC;
    font-size: 30px;
    width: 8rem;
    height: 2.5rem;
  }
  .f-right .el-input__inner{
    margin: 0 !important;
  }
  .imgs{
    vertical-align: middle;
    float: right;
    margin-right: 5px;
    margin-top: 8px;
    width: 1.5rem;
    height: 1.5rem;
  }
  .f-left1{
    font-size: 0.52rem;
    color: #888;
    margin-top: 0.3rem;
  }
  .filter .el-icon-more{
    color: #EB3723;
    position: absolute !important;
    top: 0rem !important;
    left: 0rem !important;
    z-index: 999;
  }
  .filtfoot{
    width: 100%;
    height: 2.16rem;
    margin-top: 2.02rem;
    border-top: 1px solid #EB3723;
    font-family:PingFangSC-Regular !important;
    font-size: 0.91rem;
  }
  .filtfoot .footf{
    width: 50%;
    display: inline-block;
    text-align: center;
    line-height: 2.16rem;
  }
  .f-lef{
    float: left;
    color: rgba(235,55,35,1);
  }
  .f-righ{
    float: right;
    background:rgba(235,55,35,1) ;
    color: #fff;
  }
  .clientyingbox{
    border-bottom: 1px solid #EAE7E7;
    border-top: 1px solid #EAE7E7;
    background: #ffffff;
  }
  .header{
    margin-bottom: 12px;
  }
  .grid-contentone{
    min-height:2.05rem;
    line-height: 2.05rem;
    color: #222222;
    margin-left: 6%;
    font-size: 0.88rem;
      font-family:PingFangSC-Regular;
  }
  .grid-contenttwo{
    min-height:2.05rem;
    line-height: 2.05rem;
    color: #888888;
    margin-right: 12%;
    font-size: 0.77rem;
    float: right;
      font-family:PingFangSC-Regular;
  }

  .grid-contentfour{
    min-height:2.05rem;
    line-height: 2.05rem;
    color: #555555;
    margin-left: 6%;
    font-size: 0.72rem;
      font-family:PingFangSC-Regular;
  }

   .grid-contentthree{
    margin-right: 12%;
    min-height:36px;
    line-height: 36px;
    font-size: 14px;
   }
  .f-rightimg{
    float: right;
    color: #559AEE;
  }
  .clientyingbox[data-v-628348f8]{
    border-bottom: none !important;
  }
  .filterc{
    border-bottom: 1px solid #E2E2E2;
  }
/*设置提醒消息列表样式*/
  .clientyingbox .el-col-24{
    height: 45px;
    line-height: 0px;
    margin-left: 20px;
  }
</style>
