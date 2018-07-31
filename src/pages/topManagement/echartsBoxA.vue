<template>
  <div>
    <back-Header :title="title" style="z-index:10"></back-Header>
    <div class="toMainHeader">
      <div class="contentbgc">
        <div class="first-top">
          <echartsHeader @goechartbox='gopath' :currenttime="currentTimeheader"></echartsHeader>
          <!--全行存款、比年初增、比上月降-->
          <echartsContText :slidesmore="slidesmore"></echartsContText>
        </div>
      </div>

      <!--贷款余额、年、月、日-->
      <div class="second-box">
       <!-- <echartsCont :slides='contText1' :record="record"></echartsCont>-->
        <echartsCont2 :listHeader="listHeader"  :headTit="headTit"></echartsCont2>
      </div>
      <!--图表内容-->
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
      <echartMini  v-show="echarts"
                   :labelType="labelType"
                   :dataArray="dataArray"
                   :dataText='dataText'
                   :services="services"
                   @servicesChange="servicesChange"
      ></echartMini>
    </div>
  </div>

</template>

<script>
import BackHeader from '@/components/header/back-headerH'
import echartsHeader from '@/components/common/topComponents/echartsHeader'
import echartsCont2 from '@/components/common/topComponents/echartsCont2'
import echartsContText from '@/components/common/topComponents/echartsContText'
import echartMini from '@/components/common/topComponents/echartMini'

  export default {
   components:{
      BackHeader,
      echartsHeader,
     echartsCont2,
      echartsContText,
      echartMini
    },
    data () {
      return {
          record:{},
          title:'存款情况分析',
          labelType:[{value:'储蓄存款',textStyle:{color:"#fff",backgroundColor:"#EE5948"}},{value:'活期存款',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}},{value:'定期存款',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}}],
          dataText:[],
          dataArray:[],
          contText1:{
          context:'366869',context1:'104725',context2:'7469',context3:'1725',
          conT:'储蓄存款',conT1:'比年初增',conT2:'比上月降',conT3:'比昨日增',},
          currentTime:'',
          ListData:{},
          services:'',
          dataType:'amount',
          slidesmore:{},
          loading2: true,
          echarts:false,
          currentTimeheader:[],
        //高管看板柱状图头部数据集合
        listHeader:{},
          headTit:'储蓄存款'
        }
      },
      activated(){

        this.listHeader = {}
        this.ListData =  {}
        this.dataType='amount'
        this.loading2=true,
          this.echarts=false,
          //获取时间
          this.currentTime=this.$route.query.currentTime;
        this.currentTimeheader = this.currentTime.split("-");
        console.log(this.currentTimeheader)
        this.getNewsListData();
      },
    methods:{
      gopath(){
        this.$router.push('/echartsBoxAA1?dataType='+this.dataType+'&currentTime='+this.currentTime);
      },
      servicesChange(type,index){
         if(type === '8846c482f2ec4c86a2841fcc72596d43'){
           this.listHeader = this.ListData.amount;
           this.headTit = '储蓄存款';
         }else if(type === 'db2bbae42a8e445e897fd0a70fb434e4'){
           this.listHeader = this.ListData.amountlive;
           this.headTit = '活期存款';
         }else if(type === 'd0ee2b813cb1456384d70e87ceebde84'){
           this.listHeader = this.ListData.amountset;
           this.headTit = '定期存款';
         }
        this.dataType = type;

      },
      //发送请求,获取数据
      getNewsListData(){
        //this.currentTime=this.$route.query.currentTime;
        var url= `/CRMNewMobile/retailDeposits/queryRetailDeposits`;
//        this.currentDate = {"dataDate":"2017-10-20"};
       // this.currentDate = {"dataDate":this.currentTime};
        console.log(this.currentDate);
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
            "dataDate":this.currentTime
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          console.log(res)
          console.log("数据==>");
        console.log(res.body.data);
//        上方三个数
        this.slidesmore=res.body.data
        this.loading2=false
        this.echarts=true
        this.ListData = res.body.data.dataInfo;
        /*初始值*/
        this.listHeader = this.ListData.amount;

        var yeArray = [];
        var bnczArray = [];
        var byczArray = [];
        var brczArray = [];

        yeArray.push(Math.abs((res.body.data.dataInfo.amount.amount/100000000)).toFixed(4));
        yeArray.push(Math.abs((res.body.data.dataInfo.amountlive.amount/100000000)).toFixed(4));
        yeArray.push(Math.abs((res.body.data.dataInfo.amountset.amount/100000000)).toFixed(4));

        bnczArray.push(Math.abs((res.body.data.dataInfo.amount.yearAmount/100000000)).toFixed(4));
        bnczArray.push(Math.abs((res.body.data.dataInfo.amountlive.yearAmount/100000000)).toFixed(4));
        bnczArray.push(Math.abs((res.body.data.dataInfo.amountset.yearAmount/100000000)).toFixed(4));

        byczArray.push(Math.abs((res.body.data.dataInfo.amount.monthAmount/100000000)).toFixed(4));
        byczArray.push(Math.abs((res.body.data.dataInfo.amountlive.monthAmount/100000000)).toFixed(4));
        byczArray.push(Math.abs((res.body.data.dataInfo.amountset.monthAmount/100000000)).toFixed(4));

        brczArray.push(Math.abs((res.body.data.dataInfo.amount.dayAmount/100000000)).toFixed(4));
        brczArray.push(Math.abs((res.body.data.dataInfo.amountlive.dayAmount/100000000)).toFixed(4));
        brczArray.push(Math.abs((res.body.data.dataInfo.amountset.dayAmount/100000000)).toFixed(4));

        this.dataText = [];
        this.dataText.push(yeArray);
        this.dataText.push(bnczArray);
        this.dataText.push(byczArray);
        this.dataText.push(brczArray);
        console.log('数据=》')
        console.log(this.dataText);
        this.$store.state.echartData = this.dataText;

        this.amount = res.body.data.dataInfo.amount;
        this.record = this.amount;
        this.amountlive = res.body.data.dataInfo.amountlive;
        this.amountset = res.body.data.dataInfo.amountset;


//                  alert(res.body.msg);
      }).catch((error)=>{
          console.log(error);
      })
      }
    }
      }

</script>

<style scoped>
  .toMainHeader{
    /*background-color: #fff;*/
  }
  .first-top{
    border-bottom: 1px solid #e5e5e5;
  }
 .second-box{
   background-color: #fff;
  margin-top: 20px;
  border-top:1px solid #e5e5e5;
  border-bottom:1px solid #e5e5e5;
 }
  .contentbgc{
    background-color: #fff;
  }
  .second-box[data-v-5a9453b2]{
    margin-top: 15px;
  }
</style>
