<template>
   <div class="toMainHeader" :style='{width:clientHeight}' style="
    height: 375px;
    width: 667px;
    overflow-x: hidden;
    overflow-y: hidden;
    margin-left: -146px;
    padding-left: 0px;
    margin-right: 0px;
    padding-right: 0px;
    margin-bottom: 0px;
    margin-top: 145px;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
">
   <back-Header :title=this.dataType  style='font-size:14px'></back-Header>
    <!--<echartsHeader ></echartsHeader>-->
     <!--<span class='Sright'><el-button type="primary"  size="small" @click='goEcharts'>查看详情</el-button></span>-->
     <div>
       <echartsCont4 v-show="showdata" :slides='contText1' :record="record"  style='width: 100%;'></echartsCont4>
       <echartsCont3 v-show="showdatamore" :slides='contText2' :record="record"  style='width: 100%;'></echartsCont3>
     </div>
   <echartMini3
     :labelType="labelType"
     :dataArray="dataArray"
     :dataText='dataText'
     :services="services"
     @services-change="servicesChange"
   ></echartMini3>
   </div>

</template>

<script>
import BackHeader from '@/components/header/back-header'
import echartMini3 from '@/components/common/topComponents/echartMini3'
import echartsHeader from '@/components/common/topComponents/echartsHeader'
import echartsCont3 from '@/components/common/topComponents/echartsCont3'
import echartsCont4 from '@/components/common/topComponents/echartsCont4'
  export default {
   components:{
      BackHeader,
      echartsHeader,
      echartsCont3,
      echartsCont4,
      echartMini3
    },
    data () {
  return {
     title:'截止时间2017年11月1日',
    showdata:"false",
    showdatamore:"false",
    record:[],
    labelType:[
     {value:'全行贷款合计',textStyle:{color:"#fff",backgroundColor:"#EE5948"}},
     {value:'新华管理支行',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}},
//     {value:'南陈屯管理支行',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}},
//     {value:'运河管理支行',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}},
//     {value:'南湖管理支行',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}},
//     {value:'南湖管理支行',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}}
    ],
     dataArray:[],
     dataText:[
     ],
    contText1:{
      context:'366869',context1:'104725',context2:'7469',context3:'1725',
      conT:'本期余额',conT1:'比年初',conT2:'比上月',conT3:'比上周',conT4:'比上日',
    },
    contText2:{
      context:'366869',context1:'104725',context2:'7469',context3:'1725',
      conT:'本期余额',conT1:'比年初',conT2:'比上月',conT3:'比上周',conT4:'比上日',conT5:'比任务',conT6:'完成率',
    },
     clientHeight:window.innerHeight,
     clientWidth:'',
    record:{},
    currentTime:'',
    ListData:[],
    services:'',
    dataType:'',
      }
      },
    activated(){
      this.currentTime=this.$route.query.currentTime;
      this.dataType = this.$route.query.dataType;
      console.log("datatype-------" +this.dataType)
      if(this.dataType=="贷款合计"){
        this.showdata=true;
        this.showdatamore=false
        this.getNewsListData("admiSubbranch/queryAdmiSubbranchGLZH");
      }else if(this.dataType=="对公贷款合计"){
        this.showdata=false;
        this.showdatamore=true
        this.getNewsListData("CompaLoan/queryCompaLoan");
      }else if(this.dataType=="零售贷款合计"){
        this.showdata=false;
        this.showdatamore=true
        this.getNewsListData("admiSubbranch/idQueryRetailLoan");
      }
//          this.$store.state.echartData = this.dataText;
      console.log("this.currentTime="+this.currentTime)
    },
      methods:{
        servicesChange (val) {
          this.services = val;
          console.log("services==>"+this.services)
          console.log(this.ListData.length+"我是索引长度");
          for(var i=0;i<this.ListData.length;i++){
            if(this.services == i){
              this.record = this.ListData[i];
              this.dataText[i] = this.ListData[i];
              this.dataType = this.record.departmentName;
//              this.labelType[i].value= this.ListData[i].departmentName;
//              console.log(this.labelType[i].value);

              console.log("woshi  value");
              console.log("this.dataType==>"+this.dataType)
            }
          }},
   //发送请求,获取数据

   getNewsListData(url){
     this.currentTime=this.$route.query.currentTime;
     var url= "/CRMNewMobile/"+url;
     this.currentDate = {"dataDate":"2017-10-22"};
    console.log(this.currentDate);
     this.$http.post(url,
    { "identity":this.cookies.get('identity'), "data":this.currentDate}
  ).then(res => {
    console.log("数据==>");
  console.log(res.body);
  this.ListData = res.body.ListData;
  console.log(this.ListData.length+"我是数据里面内容长度");

  var yeArray = [];
  var bnczArray = [];
  var byczArray = [];
  var brczArray = [];
  var bzArrary=[];
  var bcompletArrary=[];

  for(var i=0;i<this.ListData.length;i++){
    var item = this.ListData[i];
    yeArray.push(Number.parseInt((Number.parseInt(item.amount)/100000000).toFixed(0)));
    bnczArray.push(Number.parseInt((Number.parseInt(item.yearAmount)/100000000).toFixed(0)));
    byczArray.push(Number.parseInt((Number.parseInt(item.monthAmount)/100000000).toFixed(0)));
    brczArray.push(Number.parseInt((Number.parseInt(item.dayAmount)/100000000).toFixed(0)));
    bzArrary.push(Number.parseInt((Number.parseInt(item.weekAmount)/100000000).toFixed(0)));
    bcompletArrary.push(Number.parseInt((Number.parseInt(item.completAmount)/100000000).toFixed(0)));
    this.labelType[i].value= this.ListData[i].departmentName;
  }
  this.dataText = [];
  this.dataText.push(yeArray);
  this.dataText.push(bnczArray);
  this.dataText.push(byczArray);
  this.dataText.push(brczArray);
  this.dataText.push(bzArrary);
  this.dataText.push(bcompletArrary);

  console.log(this.dataText);
  this.$store.state.echartData = this.dataText;

  this.amount = res.body.ListData[0];
  this.record = this.amount;
  this.amountlive = res.body.ListData[1];
  this.amountset = res.body.ListData[2];
  console.log(this.amount)//全行贷款合计
  console.log(this.record)//全行贷款合计
  console.log(this.amountlive)//运河管理支行




//                  alert(res.body.msg);
}).catch((error)=>{
    console.log(error);
})
},
        },
        watch:{
          clientHeight(){
            console.log(this.clientHeight)
          }
        },
        mounted(){
          console.log( this.clientHeight);
        }
      }

</script>

<style scoped lang="scss">
  .first-top{
    border-bottom: 1px solid #ccc;
  }
  .Sright{
    position: fixed;
    top: 0.2rem;
    right:1rem;
    z-index: 100;
  }
  .toMainHeader{
    width: 667px;
    height: 100%;

      /*  overflow:scroll; */
     transform:rotate(90deg);
    -ms-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    -webkit-transform:rotate(90deg);
    -o-transform:rotate(90deg);
  }

</style>
