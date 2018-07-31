<template>
  <div>
    <!--:flag="flag"-->
    <back-Header :title="title" :flag="flag" ></back-Header>
    <!--<calendar v-if="showother"></calendar>-->
    <!--晨夕会总页面日历插件-->
    <!--<div class="calendar_content" v-if="showthis">-->
      <!--<calendar-input :isRed="true"  @getValue="getDateValue"></calendar-input>-->
    <!--</div>-->

    <div v-if="showthis" >
      <calendar-input  :lunar="calendar1.lunar"
                       :value="calendar1.value"
                       @getValue="getDateValue1"
      >
      </calendar-input>
    </div>

    <!--个人晨夕会详情页-->
    <div class="calendar_content" v-if="showt">
      <calendar-input
        :lunar="calendar1.lunar"
        :value="calendar1.value"
        @isfocus="isfocus"
        :showCalendar="calendar1.showCalendar"
        @getValue="seeCuster1"></calendar-input>
    </div>
    <!--添加loading-->
    <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <!--v-if="listData!=null"-->
    <personal-list :listDataL="listDataL" :listData="listData" :title="title" v-show="riliclick"></personal-list>
  </div>
</template>

<script>
  import BackHeader from '@/components/header/back-header'
//  import Calendar from '@/components/common/morningSessionC/calendar'
  import PersonalList from '@/components/common/morningSessionC/personalListfff'
  import {getTestData} from '../../service/getData'
  import calendarInput from '@/components/common/jobComponents/calendar.vue'
  export default {
    components:{
      BackHeader,
      calendarInput,
      PersonalList
    },
    data(){
      return {
        title:'',
        identity:this.cookies.get('identity'),
        listData:[],
        accountCode:'',
        userName:'',
        flag:'1',
        loading2:false,
        showthis:false,
        showother:false,
        showt:false,
        currentDate:"",
        listDataL:{},
        riliclick:true,//客户列表一上来 隐藏
        calendar1:{
          value:[new Date().getFullYear() , (new Date().getMonth()+1) , new Date().getDate()], //默认日期
          lunar:true, //显示农历
          showCalendar:false,//是否显示 日历
          select(value){
            console.log(value.toString());
          },
          timestamp:Date.now()
        },
      }
    },
    activated(){
      var d = new Date()
      this.currentDate=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      this.listData = []
      this.listDataL = {}
      this.showother = false
      this.riliclick=true
      this.calendar1.showCalendar=false
      this.accountCode=this.$route.query.accountCode;
      this.userName=this.$route.query.userName;
      //判断是否有客户名称,有则显示客户名称,调用seeCuster接口,没有则调用getDateValue
      if(this.userName!=undefined){
//        alert("111")
        this.listDataL = {}
        this.title = this.userName
        this.showt = true
        this.showthis = false
        //一进页面调用接口,传入固定格式日期
          var Y=new Date().getFullYear()+"";
          var M=(new Date().getMonth()+1)+"";
          var D=new Date().getDate()+"";
          this.D=D.length>1?D : 0+D;
          this.currentDate=Y+"-"+M+"-"+this.D;
          console.log("main->>>>");
          console.log(this.currentDate);
          this.seeCuster(this.currentDate);
//        alert("222")

//        this.seeCuster(this.currentDate)
        this.flag='5'
      }else{
        this.listDataL = {}
        this.title = '晨夕会'
        this.showt = false
        this.showthis = true

        //一进页面调用接口,传入固定格式日期
        if(this.$route.query.date=="date"){
          var Y=new Date().getFullYear()+"";
          var M=(new Date().getMonth()+1)+"";
          var D=new Date().getDate()+"";
          this.D=D.length>1?D : 0+D;
          this.currentDate=Y+"-"+M+"-"+this.D;
          console.log("main->>>>");
          console.log(this.currentDate);
          this.getDateValue(this.currentDate);
        }else{
          this.isInit = false;
          console.log("other->>>>");
          console.log(this.currentDate);
          this.getDateValue1(this.currentDate);
        }
        this.flag='1'
      }
    },
    methods:{
      //      获取日历组件传来的 点击 上半部分事件
      isfocus(value){
        this.riliclick=!value
        console.log(this.riliclick)
      },

      //不需要转换格式的
      getDateValue(value){
        this.loading2 = true;
        this.listData = []
        this.listDataL = {}
        this.currentDate = value;
        var url= `/CRMNewMobile/eveWill/queryAllManager`
        this.$http.post(url,
                { "identity":this.cookies.get('identity'), "data":{"showDate":this.currentDate}}
        ).then(res => {
          console.log(res)
        this.loading2 = false;
        this.listData = res.body.ListData;
        console.log("--"+this.listData);
      }).catch((error)=>{
          console.log(error);
      })
      },
      //需要转换格式的
      getDateValue1(value){
        this.loading2 = true;
        this.listData = [];
        this.listDataL = {};
        value[value.length-1]=(value[value.length-1])<10?('0'+value[value.length-1]):value[value.length-1];
        console.log("old----------"+this.currentDate);
        value=value.join("-");
        console.log("new----------"+this.currentDate)
        var url= `/CRMNewMobile/eveWill/queryAllManager`
        this.$http.post(url,
                { "identity":this.cookies.get('identity'), "data":{"showDate":this.currentDate}}
        ).then(res => {
          console.log(res)
        this.loading2 = false;
        this.listData = res.body.ListData;
        console.log("160-->"+JSON.stringify(this.listData));
      }).catch((error)=>{
          console.log(error);
      })
      },
      //不需要日期格式转换
      seeCuster(value){

        var url= `/CRMNewMobile/eveWill/chooseManagerQueryInfo`
        this.currentDate = {"showDate":value,"accountCode":this.accountCode}
        console.log(this.currentDate)
        this.$http.post(url,
                { "identity":this.cookies.get('identity'), "data":this.currentDate}
        ).then(res => {
          console.log(res)
        if(res){
          this.flag=this.$route.query.flag;
          this.listDataL = res.body.data;
          if(res.body.ListData.length>0)
          {
//            if(res.body.ListData[0]!=null)
//            {
//              this.listDataL = res.body.data;
//            }
//            if(res.body.ListData[0]!=null)
//            {
//              alert('此客户经理今日未录入任何计划！')
//            }
          }
          console.log("listData --result ---->");
          console.log(this.listData);

        }
      }).catch((error)=>{
          console.log(error);
      })
      },
      //需要日期格式转换
      seeCuster1(value){
        this.listData = []
        this.listDataL = {}
        this.riliclick=!this.riliclick
        value[value.length-1]=(value[value.length-1])<10?('0'+value[value.length-1]):value[value.length-1];
        value=value.join("-");
        var url= `/CRMNewMobile/eveWill/chooseManagerQueryInfo`
        this.currentDate = {"showDate":value,"accountCode":this.accountCode}
        console.log(this.currentDate)
        this.$http.post(url,
                { "identity":this.cookies.get('identity'), "data":this.currentDate}
        ).then(res => {
          console.log(res)
        if(res){
          this.flag=this.$route.query.flag;
          this.listDataL = res.body.data;
          if(res.body.ListData.length>0)
          {
            if(res.body.ListData[0]!=null)
            {
              this.listDataL = res.body.data;
            }
            if(res.body.ListData[0]!=null)
            {
              alert('此客户经理今日未录入任何计划！')
            }
          }
          console.log("listData --result ---->");
          console.log(this.listDataL);

        }
      }).catch((error)=>{
          console.log(error);
      })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .calendar_content{
    text-align: center;
    width: 100%;
    height: 3em;
    background-color: #fff;
    position: relative;
    z-index: 99;
  }
  .zzc{
    height:30em;
    width: 100%;
    background-color: red;
  }
</style>
