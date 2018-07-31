<template>
  <div class="toMainHeader">
    <back-Header :title="title"></back-Header>
    <!--旧日历-->
    <!--<div class="calendar_content">-->
    <!--<timeComp :isRed="true" @getValue="getDateValue"></timeComp>-->
    <!--</div>-->

    <!--新日历-->
    <div class="calendar_content">
      <calendar-input  :lunar="calendar1.lunar"
                       :value="calendar1.value"
                       :showCalendar="calendar1.showCalendar"
                       @getValue="getDateValue1"></calendar-input>
    </div>

    <toMainTiao  :slides='titleCont' :currentTime="currentDate"></toMainTiao>
  </div>
</template>

<script>
  import BackHeader from '@/components/header/back-header'
  import topmaincont from '@/components/common/topComponents/topMaincont'
  import toMainTiao from  '@/components/common/topComponents/toMainTiao'
  import calendarInput  from '@/components/tools/calendar'

  export default {
    components:{
      BackHeader,
      topmaincont,
      toMainTiao,
      calendarInput
    },
    data () {
      return {
        title:'高管看板',
        titleCont:[{context:'贷款情况分析表',linkPath:'/echartsBoxD',src:require('../../../static/images/贷款@3x.png')},{context:'存款情况分析表',linkPath:'/echartsBoxDD',src:require('../../../static/images/存款@3x.png')}],
        currentDate:'',
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
      if(this.$route.query.date="date"){
        var Y=new Date().getFullYear()+"";
        var M=(new Date().getMonth()+1)+"";
        var D=new Date().getDate()+"";
        this.D=D.length>1?D : 0+D;
        this.M=M.length>1?M : 0+M;
        this.currentDate=Y+"-"+this.M+"-"+this.D;
        console.log(this.currentDate)
      }
    },
    methods:{
//        勾选日期事件需要转换格式
      getDateValue1(value){
        value[value.length-1]=(value[value.length-1])<10?('0'+value[value.length-1]):value[value.length-1];
        value=value.join("-")
        this.currentDate=value;
//              console.log("==>")
        console.log(this.currentDate)
      },
    }
  }

</script>

<style scoped>
  .calendar_content{
    text-align: center;
    width: 100%;
    height:100%;
    background-color: #fff;
    position: relative;
    /*z-index: 10000000;*/
    /*margin-bottom: 18em;*/
  }

</style>
