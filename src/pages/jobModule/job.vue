<template>
  <div>
    <back-Header :title="title" :flag="flag"></back-Header>
    <div class="time_container">
      <!--右上角 加号-->
      <span class="jiahao" @click="showlist()" >+</span>
      <div class="zzc" v-show="this.showlistdata" @touchmove.prevent @click="showlist()"></div>
      <div class="showlists" >
        <el-dropdown>
        <el-dropdown-menu slot="dropdown"  v-show="this.showlistdata" >
          <li class="list_li" @click="goAddCuster()"><span>潜客录入</span></li>
          <li class="list_li" @click="goLoan(2)"><span>贷款进度</span></li>
          <li class="list_li" @click="goOther()"><span>其他内容</span></li>
        </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!--日历插件-->
      <!--<div class="time"><calendar-input :isRed="true" @getValue="getDateValue" ></calendar-input></div>-->

      <div>
        <calendar-input  :lunar="calendar1.lunar"
                         :value="calendar1.value"
                         :isFirst ="isInit"
                         @getValue="getDateValue"
        >
        </calendar-input>
      </div>

      <!--列表数据-->
      <div class="list_data">
        <ul class="list_function">
          <li class="job_data" @click="goJobModul({currentDate})" >
            <img class="mui-media-object"  src="../../../static/images/daily_icon.png" alt="">
            <div class="plist">
              <span class="top1">工作日报</span>
              <p>{{currentDate}}</p>
            </div>

          </li>
        </ul>

        <!--添加loading-->
        <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%"> </el-table>

        <ul v-if="lastshowData.length!=0" class="list_function"  v-for="(key,index) in lastshowData" :key="index">
          <li class="job_p" @click="goPage(child.CODE,child.ID,child.DEBITNOTE)" v-for="child in key">
            <img class="mui-media-object" :src="'./static/images/'+child.CODE+'.png'">
            <div class="plist">
              <span class="top1 mui-ellipsis">{{index}}-{{child.TEXT}}</span>
              <p>{{child.CREATEDATE}}</p>
            </div>
          </li>
        </ul>
      </div>
      <!--贷款弹框-->
      <job-steps-pages @touchmove.prevent v-show="aaa" :listDateLast="listDateLast"  :listDateL="listDateL" class="step" @click="showDate(id,debitnote)" @gosteps="showd" ></job-steps-pages>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import BackHeader from '@/components/header/back-header'
//  import calendarInput from '../../../node_modules/calendar-plugin/calendar.vue'
  import calendarInput from '@/components/common/jobComponents/calendar.vue'
  import {getTestData} from '../../service/getData'
  import jobStepsPages from '@/components/common/jobComponents/jobStepsPages.vue'
  import { MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        title:'工作日报',
        identity:this.cookies.get('identity') ,
//        currentDate :'',
        listData:[],
        data:{},
        lastshowData:[],
        showlistdata:false,
        flag:this.$route.query.num,
        loading2:true,
        aaa:false,
        listDateLast:{},
        listDateL:[],
        currentDate:"",
        isInit :true,
        calendar1:{
        value:[new Date().getFullYear() , (new Date().getMonth()+1) , new Date().getDate()], //默认日期
         lunar:true, //显示农历
         select(value){
            console.log(value.toString());
          },
          timestamp:Date.now()
        },
        backflag:'4',
      }
    },
    components: {
      BackHeader,
      calendarInput,
      jobStepsPages
    },
    activated(){
      this.showlistdata = false
      this.aaa=false
      this.loading2=true
      this.flag = this.$route.query.num;
      this.listData=[]
      this.lastshowData=[]
      this.result={}
      if(this.$route.query.date=="date"){

        var Y=new Date().getFullYear()+"";
        var M=(new Date().getMonth()+1)+"";
        var D=new Date().getDate()+"";
        this.D=D.length>1?D : 0+D;
        this.M=M.length>1?M : 0+M;
        this.currentDate=Y+"-"+this.M+"-"+this.D;
        console.log("main->>>>");
        console.log(this.currentDate);
        console.log(this.currentDate);
        this.getDateValuenow(this.currentDate);
       }else{
        this.isInit = false;
        console.log("other->>>>");

        console.log(this.currentDate);
        this.getDateValuenow(this.currentDate);
       }

    },

    methods:{
      showd(){
        this.aaa = !this.aaa;
        if(this.aaa ==false)
        {
//          document.getElementById("app").style.overflow = "scroll";
        }
        else{
//          document.getElementById("app").style.overflow = "hidden";
        }

      },
      showlist(){
//        console.log(123);
        this.showlistdata=!this.showlistdata
        console.log(this.showlistdata);
      },
      showDate(id,debitnote){
        this.popUpData(id,debitnote)
        this.showd();
      },
      //跳转页面
      goPage(code,id,debitnote){
        console.log(code,id)
        if(code == 1){
          //跳转到查看其他内容页面
          this.$router.push('/seeOther?id='+id+'&flag='+this.backflag)
        }else if(code == 2){
          //跳转至潜客页面
          this.$router.push('/seeCustomer?id='+id+'&flag='+this.backflag)
        }else {
//          this.$router.push('/loan_schedule')
          this.showDate(id,debitnote)
        }
      },

      //t跳转至贷款进度页面
      goLoan (num) {
//        alert(num)
        this.$router.push('/loan_schedule?num='+num)
      },
      //跳转至潜客页面
      goAddCuster () {
        this.$router.push('/customerInput')
      },
      //跳转
      goOther () {
        this.$router.push('/other')
      },
      goJobModul(){
        if(new Date(this.currentDate).getTime() < new Date().getTime()){
          this.$router.push('/jobModul?currentDate='+this.currentDate+'&flag='+this.backflag)
        }else {
          this.$router.push('/updateNewJob?currentDate='+this.currentDate+'&flag='+this.backflag)
        }
      },

//      不需要转换格式的，传入的是当前时间
      getDateValuenow(value){
        this.currentDate = value;
        console.log("new----------"+this.currentDate);
        var url= `/CRMNewMobile/daily/selectDailyList`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
              "showdate":this.currentDate,
              "custId":this.cookies.get('identity')
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {

            console.log(res);
            this.loading2=false
            this.listData =res.body.ListData
            console.log(this.listData)
            this.result={};
            for(var i=0;i<this.listData.length;i++){
              if (this.result.hasOwnProperty(this.listData[i].OTHER)){
                var child = this.result[this.listData[i].OTHER];
                child.push(this.listData[i]);
              }else{
                var child = [];
                child.push(this.listData[i]);
                this.result[this.listData[i].OTHER] = child;
              }
            }
            this.lastshowData=this.result;
            console.log(this.lastshowData);
//            console.log(this.listData)
            for(var i=0;i<this.listData.length;i++){
              this.data = this.listData[i]
            }
          }).catch((error)=>{
          //MessageBox('提示', '亲，当前服务器网络不佳，请您稍后再试~');
        })
      },
//      需要转换格式的
      getDateValue(value){
        console.log(value);
        this.lastshowData=[]
        value[value.length-1]=(value[value.length-1])<10?('0'+value[value.length-1]):value[value.length-1];
        value[value.length-2]=(value[value.length-2])<10?('0'+value[value.length-2]):value[value.length-2];
        this.currentDate = value;
        console.log("old----------"+this.currentDate);
        this.currentDate=this.currentDate.join("-");
        console.log("new----------"+this.currentDate);
        var url= `/CRMNewMobile/daily/selectDailyList`
          this.$http.post(url,
            {
                "identity":this.cookies.get('identity'),
                "showdate":this.currentDate,
                "custId":this.cookies.get('identity')
            },
            {
              emulateJSON:true
            }
          ).then(
            res => {

              this.loading2=false
            this.listData =res.body.ListData
              console.log(this.listData)
            this.result={};
            for(var i=0;i<this.listData.length;i++){
              if (this.result.hasOwnProperty(this.listData[i].OTHER)){
                var child = this.result[this.listData[i].OTHER];
                child.push(this.listData[i]);
              }else{
                var child = [];
                child.push(this.listData[i]);
                this.result[this.listData[i].OTHER] = child;
              }
            }
            this.lastshowData=this.result;
            for(var i=0;i<this.listData.length;i++){
              this.data = this.listData[i]
            }
            }).catch((error)=>{
            //MessageBox('提示', '亲，当前服务器网络不佳，请您稍后再试~');
        })
      },
      popUpData(id,debitnote){
        var url= "/CRMNewMobile/loan/selectLoanHistory"
//        alert(id,debitnote)
        if(debitnote){
          this.currentDate1 = {"loanId":id,"debitNote":debitnote}
        }
        else{
          this.currentDate1 = {"loanId":id,"debitNote":""}
        }

        console.log(this.currentDate)
        this.$http.post(url,
                {
                    "identity":this.cookies.get('identity'),
                    /*"custId":this.cookies.get('identity'),*/
                    "data":JSON.stringify(this.currentDate1)
                },
                {
                  emulateJSON:true
                }
        ).then(res => {
          console.log(res);
          var datalen =res.body.ListData.length
          this.listDateLast = res.body.ListData[datalen-1];
          this.listDateL = res.body.ListData
          console.log("listDateLast--"+JSON.stringify(this.listDateLast));
          console.log("listDateL--"+JSON.stringify(this.listDateL));
        }).catch((error)=>{
          console.log(error);
        })
      }
    }
  }
</script>

<style scoped>
  .jiahao{
    position:fixed;
    right: 0.5em;
    top:0.8rem;
    z-index: 60000;
    color:red;
    font-size: 2rem;
    font-weight: 100;
  }
  /*.time_container{*/
    /*position: absolute;*/
    /*top:3em;*/
    /*left: 0;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*background: rgba(0,0,0,.5);*/
    /*!*z-index: 999;*!*/
  /*}*/
  body{
    list-style: none
  }
  .time{
    text-align: center;
    width: 100%;
    height: 20em;
  }
  .showlists{
    position: fixed;
    right: 9.1rem;
    top:1.32rem;
    z-index: 600000;
  }
  .zzc{
    position: absolute;
    top:2.32rem;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
    z-index: 999;
  }
  .list_li:nth-child(1){
    width: 9rem;
    height: 2.44rem;
    line-height: 2.44rem;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
  }
  .list_li:nth-child(2){
    width: 9rem;
    height: 2.44rem;
    line-height: 2.44rem;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
  }
  .list_li:nth-child(3){
    width: 9rem;
    height: 2.44rem;
    line-height: 2.44rem;
    text-align: center;
  }
  .el-dropdown-menu{
    padding: 0 !important;
    margin: 0 !important;
    border-radius: 0 !important;
    -webkit-box-shadow:none !important;
  }
  .list_data{
    /*position: absolute;
    left: 0;
    top: 56%;*/
    background-color: #fff;
    /*margin-top:0.7rem !important;*/
    border-top: 1px solid #e5e5e5;
  }
  .list_function  li{
    /*height:4.88rem;*/
    height: 88px;
    text-overflow: ellipsis;
    padding-right: 1rem;

    /*line-height:4.88rem;*/
    border-bottom: 1px solid #F0F0F0;
    padding-left: 1.13rem;
    /*padding-top: 0.75rem;*/
  }
  .list_function  li span{
    font-size: 1rem;
    margin-top:0.25rem ;
  }
  .mui-media-object{
    float: left;
    width: 65px;
    margin-top: 0.63rem;
    margin-right: 0.66rem;
  }
  .top1{
    display: inline-block;
    color:#000;
    font-size: 1rem;
    line-height:2em;
    width: 220px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }
  .plist{
    padding-top: 0.6rem !important;
    white-space: nowrap;
    overflow: hidden;
  }
  /*修改头部加号大小*/
  .time_container .jiahao[data-v-c82b70e0]{
    font-size: 1.4rem;
    color:rgba(235,55,35,1);
  }

  /*内容区设置边框*/
  #app .time_container{
    border-top: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
  }
</style>
