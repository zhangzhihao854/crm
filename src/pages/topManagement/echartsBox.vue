<template>
   <div class="toMainHeader">
   <back-Header :title="title"></back-Header>
   <div style="height: 0.8rem; background-color: rgb(248,249,251)"></div>
   <div class="first-top">
   <echartsHeader @goechartbox='gopath' :currenttime="currentTimeheader"></echartsHeader>
<!--   <echartsCont :record="record" :slides='contText1'></echartsCont>-->
   <echartsCont2 :listHeader="listHeader"  :headTit="headTit"></echartsCont2>
   </div>
     <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
     </el-table>

   <echartMini v-show="echarts"
     :labelType="labelType"
     :dataArray="dataArray"
     :dataText='dataText'
     :services="services"
     @servicesChange="servicesChange"
   ></echartMini>
   </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import echartsHeader from '@/components/common/topComponents/echartsHeader'
import echartsCont2 from '@/components/common/topComponents/echartsCont2'
import echartMini from '@/components/common/topComponents/echartMini'
import PubSub from 'pubsub-js'

  export default {
   components:{
      BackHeader,
      echartsHeader,
      echartsCont2,
      echartMini
    },
    data () {
      return {
        title:'贷款分析情况',
        record:{},
        sxjt:0,
        bsy:0,
        bzr:0,
          labelType:[
              {value:'2000万以下',textStyle:{color:"#fff",backgroundColor:"#EE5948"}},
              {value:'500万以下',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}},
              {value:'500-2000万',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}}
          ],
          dataText:[],
          dataArray:[],
          contText1:{
          context:'399999',context1:'104725',context2:'7469',context3:'1725',
          conT:'贷款余额',conT1:'比年初增',conT2:'比上月降',conT3:'比昨日增'},
          currentTime:'',
          ListData:[],
          services:"",
          dataType:'AMOUNT',
          loading2: true,
          echarts:false,
          currentTimeheader:[],
        //高管看板柱状图头部数据集合
          listHeader:{},
          headTit:'贷款余额'

      }
    },
      activated(){
        this.listHeader = {}
        this.loading2=true,
        this.echarts=false,
        this.dataType="AMOUNT"
        //获取时间
        this.currentTime=this.$route.query.currentTime;
        this.currentTimeheader = this.currentTime.split("-");
        console.log(this.currentTimeheader)
        this.getNewsListData();

      },
      methods:{
          gopath(){
              this.$router.push('/echartsBoxA1?dataType='+this.dataType+'&currentTime='+this.currentTime);
          },
        servicesChange(type,index){
          this.dataType = type;
          this.listHeader = this.ListData[index];
          console.log('header数据=》')
          console.log(this.listHeader)
        },
       /*   servicesChange(type,data){
             this.dataType = type;
             this.list = data;
             //测试数据，实现动态变化，具体原因不明确
             this.ceshi = this.list.amount-0;
          },*/
            /*servicesChange (val) {
                this.services = val;
                console.log("services==>"+this.services)
              for(var i=0;i<3;i++){
                if(this.services == i){
                  this.record = this.ListData[i];
                  this.dataText[i] = this.ListData[i];
                  this.dataType = this.ListData[i].departmentName;
                  console.log(this.dataType);
                }
              }

            },*/
          //发送请求,获取数据
          getNewsListData(){
             // this.currentTime=this.$route.query.currentTime;
              var url= `/CRMNewMobile/retailLoan/queryRetailLoan`;
//              this.currentDate = {"dataDate":"2017-10-22"};
              //this.currentDate = {"dataDate":this.currentTime};
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

               this.ListData = res.body.ListData;
              this.loading2=false
              this.echarts=true

              var yeArray = [];
              var bnczArray = [];
              var byczArray = [];
              var brczArray = [];

              for(var i=0;i<this.ListData.length;i++){
                var item = this.ListData[i];
                yeArray.push(Math.abs((item.amount===''?0:item.amount)/100000000).toFixed(4));
                bnczArray.push(Math.abs((item.yearAmount===''?0:item.yearAmount)/100000000).toFixed(4));
                byczArray.push(Math.abs((item.monthAmount===''?0:item.monthAmount)/100000000).toFixed(4));
                brczArray.push(Math.abs((item.dayAmount===''?0:item.dayAmount)/100000000).toFixed(4));
              }
              this.dataText = [];
              this.dataText.push(yeArray);
              this.dataText.push(bnczArray);
              this.dataText.push(byczArray);
              this.dataText.push(brczArray);

              this.$store.state.echartData = this.dataText;
                console.log('数据=》')
              console.log(this.dataText)


            this.amount = res.body.ListData[0];
            this.record = this.ListData[0];
            this.amountlive = res.body.ListData[1];
            this.amountset = res.body.ListData[2];
            console.log( this.amount)
            console.log( this.record)

          }).catch((error)=>{
                  console.log(error);
          })
          }
        },
      watch:{
        listHeader:{
          handler:function(newValue,oldValue){
            this.listHeader = newValue;

          },
          deep:true,
        }
      }

      }
</script>

<style scoped>
  .toMainHeader{
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5 !important;
  }
  .first-top{
    border-bottom: 1px solid #e5e5e5 !important;
    border-top: 1px solid #e5e5e5 !important;
  }
</style>
