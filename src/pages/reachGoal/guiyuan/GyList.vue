<template>
    <div class="temp">
      <header class="mui-bar mui-bar-nav">
        <h3 id='titler' class="mui-title" ref="nav">{{title}}</h3>
        <span @click="goBack()" class=" mui-icon mui-pull-left"> <img src="../../../../static/images/back-arrow@2x.png" alt="">返回</span>
      </header>
      <!--loading-->
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%"></el-table>

      <!--百分比-->
      <div v-show="showContent">
        <div class="top">
          <p class="info">{{bfbtitle}}</p>
          <div class="cir">
            <el-progress type="circle" :percentage="homeData" class="progess" :show-text="false" >
            </el-progress>
            <p id="bfbzi">{{homeDataBig}}%</p>
            <p id="bfbinfo">金额</p>
          </div>
        </div>
        <money :biaoti1="biaoti1"  :biaoti2="biaoti2" :numb1="numb1" :numb2="numb2" :wanyuan1="wanyuan1" :wanyuan2="wanyuan2"></money>

        <!--客户列表-->
        <personal-list :listData="listData"></personal-list>
      </div>


    </div>
</template>
<style scoped>
  .temp .el-message-box{
    margin-top:-70px !important;
  }
.temp{
  margin-top:2rem;
}
  .mui-bar-nav{
    height:2rem;
    box-shadow:none;
    background:rgba(255,255,255,1);
    border-bottom: 1px solid #e5e5e5;
  }
  .mui-bar-nav .mui-title{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(17,17,17,1);
    line-height:2rem;
  }

  .mui-bar-nav img{
    width:0.62rem;
    /*height:1.17rem;*/
    /*font-family:PingFangSC-Regular;*/
    /*background:rgba(235,55,35,1);*/
    border-radius: 1px ;
    vertical-align: middle !important;
    line-height:1rem;
  }

  .temp .mui-pull-left{
    font-size:0.94rem !important;
    /*font-family:PingFangSC-Regular;*/
    color:rgba(235,55,35,1);
    line-height:1rem;
    z-index: 2000;
    position: relative;
  }
  .temp .mui-pull-right{
    font-size:0.94rem !important;
    font-family:PingFangSC-Regular;
    color:rgba(235,55,35,1);
    line-height:1rem;
  }

.info{
  font-family:PingFangSC-Regular;
  /*color:rgba(8,140,255,1);*/
  color:#088CFF;
  height: 1.94rem;
  line-height:2.47rem;
  margin-left: 0.8rem;
  font-size:0.78rem;
}
.cir{
  text-align: center;
  /*margin-left:35%;*/
  position: relative;
  padding-bottom:1.54rem;
}
#bfbzi{
  position: absolute;
  top:22%;
  color:#088CFF;
  width: 100%;
  text-align: center;
  font-size: 0.97rem;
}
#bfbinfo{
  position: absolute;
  /*left: 45%;*/
  /*bottom:45%;*/
  /*color:#088CFF;*/
  top:42%;
  color:#088CFF;
  width: 100%;
  text-align: center;
  font-size: 0.97rem;
}
.top{
  /*border-top: 1px solid #e5e5e5;*/
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
}

</style>
<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
//  import PercentAge from '@/components/common/reachGoal/percentAge'
  import money from '@/components/common/reachGoal/money'
  import PersonalList from '@/components/common/reachGoal/personList'
  import  mui from '../../../style/js/mui.min.js'
  export default{
    data () {
      return {
        title: '',
        bfbtitle:"月目标达成",
        homeData:0,
        homeDataBig:0,
        biaoti1:"目标金额",
        biaoti2:"完成金额",
        numb1:"",
        numb2:"",
        wanyuan1:"万元",
        wanyuan2:"万元",
        tel:13313319729,
        listData:[],
        loading2: true,
        showContent:false,

//        接口返回类
        accountCode:""
      }
    },
    components: {
      BackHeader,
//      PercentAge,
      money,
      PersonalList
    },
    activated(){
      this.datainit()
      this.loading2=true
      this.showContent=false
      this.listData="";
//      方法执行
      this.getPermissinos()

    },
    created(){
      mui.init({
        swipeBack: false //启用右滑关闭功能
      })
    },
    methods: {
      datainit(){
        this.numb1=0
        this.numb2=0
        this.homeData=0
        this.homeDataBig=0
      },
      goBack(){
        this.$router.go(-1)
      },
      open2() {
        this.$confirm('抱歉，您当前没有查看权限', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$router.go(-1)
        }).catch(() => {
          this.$router.go(-1)
        });
      },
      phoneCall(msg){
        console.log(msg)
        window.location.href="tel:110"
      },

//        获取权限
      getPermissinos(){
        var url= `/CRMNewMobile/target/tellerTarget`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
              "depaId":this.cookies.get('dep')
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
            if(res.body.success==false){
//              mui.alert(res.body.msg, function() {});

              //this.open2()
            }
            this.loading2=false
            console.log(res);
            this.accountCode=res.body.data.accountCode
            this.title=res.body.data.accountName
            this.getPermissinosData()
            this. getbaifenbiData()
          },
          res => {

            console.log(res)
          }
        )
      },
//      获取柜员目标数据
      getPermissinosData(){
        var url= '/CRMNewMobile/target/tellerTargetClient'
        this.$http.post(url,
          { "identity":this.cookies.get('identity')},
          {
            emulateJSON:true
          }
        ).then(
          res => {

            console.log(res);
            console.log("访问接口成功了 ");
            this.loading2=false
            this.showContent=true
            this.listData=res.body.data.ListData
            console.log(this.listData);
          },
          res => {
            console.log(res)
          }
        )
      },
//      获取百分比数据
      getbaifenbiData(){
        var url= '/CRMNewMobile/target/tellerTargetData'
        this.$http.post(url,
          {"identity":this.cookies.get('identity')},
          {
            emulateJSON:true
          }
        ).then(
          res => {
            if(res.body.data==null){
              mui.alert('您的本月目标未设置，请联系管理员！')
              this.showContent = true
              /*如果后台返回数据为null，将显示的数据置为0*/
              this.homeDataBig = 0;
              this.numb1 = 0;
              this.numb2 = 0;
            }else{
              this.showContent = true

              this.numb1=res.body.data.target/10000
              this.numb2=(res.body.data.amount/10000).toFixed(2)
              this.homeData=((res.body.data.percent)*100).toFixed(0)
              this.homeDataBig=((res.body.data.percent)*100).toFixed(0)
              if(this.homeData>=100){
                console.log(123);
                this.homeData=100
//              document.getElementsByClassName("el-progress__text")[0].innerText=res.body.data.percent.toFixed(0)
//              console.log(document.getElementsByClassName("el-progress__text")[0].innerText = res.body.data.percent.toFixed(0));
              }
            }


          },
          res => {
            console.log(res)
          }
        )
      }
    },

  }
</script>

