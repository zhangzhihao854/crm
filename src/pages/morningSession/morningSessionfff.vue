<template>
  <div class="calendar_wrap">
    <!--<back-Header :title="title" :flag="flag"></back-Header>-->
    <BackHeader :title="title"></BackHeader>
    <!--<calendar v-if="showother"></calendar>-->
    <!--晨夕会总页面日历插件-->
    <div class="calendar_content" v-if="showthis">
      <calendar-input :isRed="true"  @getValue="getDateValue"></calendar-input>
    </div>
    <!--个人晨夕会详情页--  日历插件> -->
    <div class="calendar_content" v-if="showt">
      <calendar-input  :lunar="calendar1.lunar"
                       :value="calendar1.value"
                       :showCalendar="calendar1.showCalendar"
                       @isfocus="isfocus"
                      @getValue="seeCuster"></calendar-input>
    </div>

    <!--添加loading-->
    <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <!--v-if="listData!=null"-->
    <PersonalListfff  v-if="listData!=null" :listDataL="listDataL" :listData="listData" :title="title" v-show="riliclick"></PersonalListfff>
  </div>
</template>

<script>
  //import BackHeader from '@/components/header/back-header'
  import BackHeader from '@/components/header/back-title2-header'
//  import Calendar from '@/components/common/morningSessionC/calendar'
  import PersonalListfff from '@/components/common/morningSessionC/personalListfff'
  import {getTestData} from '../../service/getData'
  import calendarInput from '@/components/common/jobComponents/calendar.vue'
  export default {
    components:{
      BackHeader,
      calendarInput,
      PersonalListfff
    },
    data(){
      return {
        title:'',
        identity:this.cookies.get('identity'),
        listData:[],
        accountCode:'',
        userName:'',
        flag:'',
        loading2:false,
        showthis:false,
        showother:false,
        showt:false,
        riliclick:true,//客户列表一上来 隐藏
        listDataL:{},
        calendar1:{
          value:[new Date().getFullYear() , (new Date().getMonth()+1) , new Date().getDate()], //默认日期
          lunar:true, //显示农历
          showCalendar:false,//是否显示 日历
          select(value){
            console.log(value.toString());
          },
          timestamp:Date.now()
        },
        /*定义头部flag的值*/
        num: '222'
      }
    },
    created(){},
    activated(){
      this.listData = []
      this.listDataL = {}
      this.showother = false
      this.riliclick=true
      this.accountCode=this.$route.query.accountCode;
      this.userName=this.$route.query.userName

//      var Y=new Date().getFullYear()+"";
//      var M=(new Date().getMonth()+1)+"";
//      var D=new Date().getDate()+"";
//      this.D=D.length>1?D : 0+D;
//      this.currentDate=Y+"-"+M+"-"+this.D;
//      console.log("我是页面 一点击进来执行的 接口->>>>");
//      console.log("一上来显示的时间"+this.currentDate);
//      this.seeCuster(this.currentDate);

      if(this.userName!=undefined){
//        alert("111")
      var Y=new Date().getFullYear()+"";
      var M=(new Date().getMonth()+1)+"";
      var D=new Date().getDate()+"";
      this.D=D.length>1?D : 0+D;
      this.currentDate=Y+"-"+M+"-"+this.D;
        this.seeCuster1(this.currentDate)
//        alert("222")
        this.title = this.userName
        this.showt = true
        this.showthis = false
        this.flag='5'
      }else{
        this.title = '晨夕会'
        this.showt = false
        this.showthis = true
        this.getDateValue(this.currentDate)
        this.flag='1'
        this.listData = []
        this.listDataL = ''
      }
    },
    methods:{
//      获取日历组件传来的 点击 上半部分事件
      isfocus(value){
       this.riliclick=!value
        console.log(this.riliclick)
      },
      getDateValue(value){
        this.loading2 = true;
        //原来
        /*this.listData = ''
        this.listDataL = ''*/
        //更改后的
        this.listData = []
        this.listDataL = {}
        var url= `/CRMNewMobile/eveWill/queryAllManager`
        //this.currentDate = {"showDate":value}
        console.log(this.currentDate)
        this.$http.post(url,
                {
                    "identity":this.cookies.get('identity'),
                    "showDate":value
                },
                {
                  emulateJSON:true
                }
        ).then(res => {
          console.log(res)
        this.loading2 = false;
        this.listData = res.body.ListData
        console.log("--"+this.listData);
      }).catch((error)=>{
          console.log(error);
      })
      },
      seeCuster1(value){

        var url= `/CRMNewMobile/eveWill/chooseManagerQueryInfo`
        //this.currentDate = {"showDate":value,"accountCode":this.accountCode}
        console.log(this.currentDate)
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
            "showDate":value,
            "accountCode":this.accountCode
          },
          {
            emulateJSON:true
          }

        ).then(res => {
          console.log(res)
        if(res){
          this.flag=this.$route.query.flag;
          console.log(this.flag+"花花花花")
          this.listDataL = res.body.data;
          //alert(this.listDataL + '新年好')
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
          //console.log(this.listDataL);

        }
      }).catch((error)=>{
          console.log(error);
      })
      },
      seeCuster(value){
        this.listData = []
        this.listDataL = {}
//        点击某一天 要清除 传给子组件的 数据

        this.riliclick=!this.riliclick
        value[value.length-1]=(value[value.length-1])<10?('0'+value[value.length-1]):value[value.length-1];
        value=value.join("-")
        var url= `/CRMNewMobile/eveWill/chooseManagerQueryInfo`
        //this.currentDate = {"showDate":value,"accountCode":this.accountCode}
        console.log(this.currentDate)
        this.$http.post(url,
                {
                    "identity":this.cookies.get('identity'),
                  "showDate":value,
                  "accountCode":this.accountCode
                },
                {
                  emulateJSON:true
                }

        ).then(res => {
          console.log(res)
        if(res){
          this.flag=this.$route.query.flag;
          console.log(this.flag+'啊啊啊啊啊')
          this.listDataL = res.body.data;
          console.log(this.listDataL + '点击日历获取')
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
    background-color: #F6F8F8 !important;
    position: relative;
    /*z-index: 1;*/
  }
    /*设置日期选择器的背景颜色*/
  .calendar_content .calendar{
    background-color: #F6F8F8 !important;
  }
  /*设置姓名栏的样式*/
  .calendar_wrap .list_content{
    height: 2.44rem;
    line-height:2.44rem;
    background:rgba(255,255,255,1) !important;
  }
  .mui-table-view-cell.mui-active[data-v-6a598a03]{
    background-color: #fff !important;
  }
</style>
