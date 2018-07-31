<template>
  <div class="page-navbar">
    <!--<div class="page-title">&nbsp</div>-->
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1" class="tabtitle">工作总结</mt-tab-item>
      <div id="skey"></div>
      <mt-tab-item id="2" class="tabtitle">贷款进度</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="one1">
          <!--日历插件-->
          <!--现在是单门又 复制了一份插件，目的是 看到时候的需求 一上来是显示还是隐藏-->
          <div class="caldertime">
            <calendar-input :isRed="true"
                            @getValue="getDateValue"
                            :lunar="calendar1.lunar"
                            :value="calendar1.value"
            ></calendar-input>
          </div>
          <!--<mt-cell v-for="n in 10" :title="'内容 ' + n" />-->
          <div class="list_data">
            <ul class="list_function">
              <li class="job_data" @click="goJobModul({currentDate})" >
                <img class="mui-media-object" src="../../../../static/images/daily_icon.png" alt="">
                <h5 class="top1">工作日报</h5>
                <h5>{{currentDate}}</h5>
              </li>
            </ul>
            <!--添加loading-->
            <!--<el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">-->
            <!--</el-table>-->
            <ul class="list_function"  v-for="(key,index) in lastshowData" :key="index">
              <li class="job_p" @click="goPage(child.CODE,child.ID,child.DEBITNOTE)" v-for="child in key">
                <!--<img src="../../../static/images/loans_icon.png" alt="">-->
                <img class="mui-media-object" :src="'./static/images/'+child.CODE+'.png'">
                <span class="top1">{{index}}-{{child.TEXT}}</span>
                <h5>{{child.CREATEDATE}}</h5>
              </li>
            </ul>
          </div>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="2">
        <!--<el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">-->
        <!--</el-table>-->
        <div >
          <ul v-for="item in redclientData">
            <li class="dkcard">
              <router-link :to="{path:'/DaiKuan',query:{identno:item.IDENTNO,name:item.COUSTNAME,custid:item.CUSTID}}">
                <p class="dkcontent">
                  <span class="bageicon" v-show=item.state></span>
                  <img src="../../../../static/images/boy.png" alt="">
                  {{item.COUSTNAME}}
                </p>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-for="item in clientData">
          <ul>
            <li class="dkcard">
              <router-link :to="{path:'/DaiKuan',query:{identno:item.IDENTNO,name:item.COUSTNAME,custid:item.CUSTID}}">
                <p class="dkcontent">
                  <span class="bageicon" v-show=item.state></span>
                  <img src="../../../../static/images/boy.png" alt=""> {{item.COUSTNAME}}
                </p>
              </router-link>
            </li>
          </ul>
        </div>

      </mt-tab-container-item>
    </mt-tab-container>
    <!--贷款弹框-->
    <job-steps-pages @touchmove.prevent v-show="aaa" :listDateLast="listDateLast"  :listDateL="listDateL" class="step" @click="showDate(id,debitnote)" @gosteps="showd" ></job-steps-pages>

  </div>
</template>

<style scoped>
  .empty{
    height: 3rem;
  }
  /*.one1{*/
    /*height:25rem;*/
  /*}*/
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom: 2px solid red;
    color: red;
    margin-bottom: -3px;
  }
.page-navbar .tabtitle{
  color: #ccc;

}
  .mint-tab-item-label{
    font-size:0.94rem !important;
  }
.showlists{
  position: fixed;
  right: 6em;
  top:3em;
  z-index: 600000;
}
.caldertime{
  text-align: center;
  position: relative;
  z-index: 1000;
}

.dkcard{
  width: 100%;
  position: relative;
  height: 2.44rem;
  background-color: #fff !important;
  border: 0.5px solid #E5E5E5;
}
.dkcard .dkcontent{
  width: 100%;
  height:0.89rem;
  font-size:0.94rem;
  font-family:PingFangSC-Regular;
  color:rgba(51,51,51,1);
  line-height:2.445rem;
}
.dkcard .bageicon{
    display: inline-block;
    width:6px;
    height: 6px;
    border-radius: 6px;
    background-color: red;
    position: absolute;
    top:4px;
    left: 30px;

  }
  #skey{

    width:1px;
    background-color: #E5E5E5;
  }
.mint-navbar{
  margin-bottom:0.17rem !important;
}
.mint-tab-container{
  /*text-align: center !important;*/
}
body{
  list-style: none
}
.time{
  text-align: center;
  margin-top: 13%;
  width: 100%;
  height: 21em;
}
.list_li{
  height: 1.3em;
  text-align: center;
  border-bottom: 1px solid #FAFAFA;
  padding-left: 1em;
}
.list_data{
  /*position: absolute;
  left: 0;
  top: 56%;*/
  background-color: #fff;
}

.list_b{
  z-index: 999;
  /*border: 1px solid;*/
  position:fixed;
  top:1.3em;
  right: 1.5em;
}
.el-icon-plus{
  color: #F0786B;
}
.list_function  li{
  height:4.88rem;
  /*line-height:5em;*/
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
  margin-top: 0.75rem;
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
/*修改分页签高度和字体大小*/
.page-navbar .mint-navbar{
  height: 2.33rem !important;
}

/*给日期抬头添加下边框*/
.page-navbar .caldertime[data-v-d5a465e0]{
  border-bottom: 1px solid #e5e5e5;
}
.page-navbar .list_data[data-v-d5a465e0]{
  border-bottom: 1px solid #e5e5e5;
}
/*设置头像离左边和文字之间的距离*/
.page-navbar  .dkcard .dkcontent[data-v-d5a465e0]{
  padding-left: 0.83rem !important;
}
.page-navbar  .dkcard img{
  padding-right: 0.61rem !important;
}
</style>
<script type=text/ecmascript-6>
  import CalendarInput from '@/components/tools/calendar'
  import jobStepsPages from '@/components/common/jobComponents/jobStepsPages.vue'

  export default {
  name: 'page-navbar',
  data() {
    return {
      selected: '1',
      title:'工作日报',
      identity:this.cookies.get('identity') ,
      currentDate : "",
      listData:[],
      data:{},
      lastshowData:{},
      showlistdata:false,
      flag:this.$route.query.num,
      loading2:true,
      aaa:false,
      listDateL:[],
      isInit :true,
      listDateLast:[],
      calendar1:{
        value:[new Date().getFullYear() , (new Date().getMonth()+1) , new Date().getDate()], //默认日期
        lunar:true, //显示农历
        select(value){
          console.log(value.toString());

        },
        timestamp:Date.now()
      },
      backflag:10,
      custId:'',
    };
  },
  props:['clientData',"showbageicon",'redclientData'],
  components: {
    CalendarInput,
    jobStepsPages
  },
    activated(){
      this.custId=''
      this.accountCode=this.$route.query.coustId;
      this.title=this.$route.query.COUSTNAME;
      console.log(this.$route.query.flag);
      if(this.$route.query.date=="date"){
        var Y=new Date().getFullYear()+"";
        var M=(new Date().getMonth()+1)+"";
        var D=new Date().getDate()+""

        D=D.length>1?D : 0+D;
        M=M.length>1?M : 0+M;
        this.currentDate=Y+"-"+M+"-"+D
        console.log("main->>>>");
        console.log(this.currentDate);
        this.getDateValuenow(this.currentDate);
//        this.isInit = true;

      }else if(this.$route.query.flag=="11"){
        var Y=new Date().getFullYear()+"";
        var M=(new Date().getMonth()+1)+"";
        var D=new Date().getDate()+""
        D=D.length>1?D : 0+D;
        M=M.length>1?M : 0+M;
        this.currentDate=Y+"-"+M+"-"+D
        console.log("main->>>>");
        console.log(this.currentDate);
        this.getDateValuenow(this.currentDate);

      }
      else{
        console.log("other->>>>");
        console.log(this.currentDate);
        this.getDateValuenow(this.currentDate);
//        this.isInit = false;
      }
      this.showlistdata = false
      this.aaa=false
      this.lastshowData={}
      this.loading2=true
      this.flag = this.$route.query.num;

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
        this.$router.push('/seeOther?id='+id+'&flag='+this.backflag+'&FZXflag='+this.FZXflag)
      }else if(code == 2){
        //跳转至潜客页面
        this.$router.push('/seeCustomer?id='+id+'&flag='+this.backflag)
      }else {
//          this.$router.push('/loan_schedule')
        this.showDate(id,debitnote)
      }
    },

    goJobModul(){
      if(new Date(this.currentDate).getTime() < new Date().getTime()){
        this.$router.push('/jobModul?currentDate='+this.currentDate+'&flag='+this.backflag+'&coustId='+this.custId)
      }else {
        this.$router.push('/updateNewJob?currentDate='+this.currentDate+'&flag='+this.backflag+'&coustId='+this.custId)
      }
    },
//       如果是返回当前页面，需要 数组转字符串
    getDateValue(value){
      this.lastshowData={}
      value[value.length-1]=(value[value.length-1])<10?('0'+value[value.length-1]):value[value.length-1];
      value[value.length-2]=(value[value.length-2])<10?('0'+value[value.length-2]):value[value.length-2];
      this.currentDate = value;

      this.currentDate=this.currentDate.join("-");
//      判断是否是分中心 下钻过来的 要切换客户的身份
      if(this.$route.query.flag=="11"){
        this.custId=this.$route.query.coustId;
      }else{
        this.custId=this.cookies.get('identity');
      }
      var url= `/CRMNewMobile/daily/selectDailyList`
      this.$http.post(url,
        {
          "custId":this.custId,
          "showdate":this.currentDate,
          "identity":this.cookies.get('identity'),
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
        console.log(error);
    })
    },
//      如果是当天，一进来 需要走新的日期 不用数组转换成字符串
    getDateValuenow(value){
      this.lastshowData={}
        this.currentDate = value;
//      判断是否是分中心 下钻过来的 要切换客户的身份
      if(this.$route.query.flag=="11"){
        this.custId=this.$route.query.coustId;
      }else{
        this.custId=this.cookies.get('identity');
      }

        var url= `/CRMNewMobile/daily/selectDailyList`
        this.$http.post(url,
          {
              "custId":this.custId,
              "showdate":this.currentDate,
              "identity":this.cookies.get('identity'),
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
          console.log(error);
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
             "data":this.currentDate1
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
    },
//    贷款客户列表点击到贷款消息页面
    fscsId(custid){
      var url = '/CRMNewMobile/target/managerTargetClientState';
//        进行发送
      this.$http.get(url,
        {
          "identity":this.cookies.get('identity'),
          CUSTID:custid,
        },
        {
          emulateJSON:true
        }

      ).then(
        res=>{
          console.log(res);
          console.log("hhh 贷款消息页 访问成功了");
//          this.$router.push('/DaiKuan','query:{identno:item.IDENTNO,name:item.COUSTNAME}')
        },
        res=>{
          console.log('messages出错')
        }
      )
    }

  },

};
</script>
