<template>
  <div class="toMainHeader">
    <div class="topHeader">
      <back-Header :title="title"></back-Header>
    </div>
    <div class="navCont">
      <echartsCont3 :slides='contText2'  :listHeader="listHeader"  :hiddenFiles="hiddenFiles"  style='width: 100%;'></echartsCont3>
    </div>
    <div class="barWrap">
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
      <echartMini6  v-show="echarts"
                    :labelType="labelType"
                    :dataArray="dataArray"
                    :dataText='dataText'
                    :services="services"
                    @servicesChange="servicesChange">
      </echartMini6>
    </div>

  </div>
</template>

<script>
import BackHeader from '@/components/header/right-header'
import echartMini6 from '@/components/common/topComponents/echartMini6'
import echartsCont3 from '@/components/common/topComponents/echartsCont3'
  export default {
   components:{
      BackHeader,
     echartsCont3,
      echartMini6
    },
    data () {
    return {
      title:'截止时间2017年11月1日',
      showdata:"false",
      showdatamore:"false",
      record:[],
      labelType:[],
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
      currentTimeheader:'',
      ListData:[],
      services:'',
      dataType:'',
      loading2: true,
      echarts:false,
      //高管看板柱状图头部数据集合
      listHeader:{},
      //控制比任务、完成率的显示与隐藏
      hiddenFiles:true,

    }
    },
    activated(){
      this.labelType=[],
      this.hiddenFiles = true,
      this.listHeader = {},
      this.dataText = [],
      this.loading2=true,
      this.echarts=false,
      this.currentTime=this.$route.query.currentTime;
      this.dataType = this.$route.query.dataType;
      if(this.dataType=="贷款合计"){
        this.showdata=true;
        this.showdatamore=false
        this.getNewsListData("admiSubbranch/queryAdmiSubbranchGLZH");
      }else if(this.dataType=="对公贷款合计"){
        this.showdata=false;
        this.showdatamore=true
        this.getNewsListData("CompaLoan/idQueryCompaLoanGLZH");
      }else if(this.dataType=="零售贷款合计"){
        this.showdata=false;
        this.showdatamore=true
        this.getNewsListData("admiSubbranch/idQueryRetailLoan");
      }

      this.currentTimeheader = this.currentTime.split("-");
      this.title=this.dataType+"报表("+this.currentTimeheader[0]+"年"+this.currentTimeheader[1]+"月"+this.currentTimeheader[2]+"日)"
    },
      methods:{
        servicesChange(index){
          if(index==0){
            //点击柱状图第一个name时将比任务、完成率隐藏掉
            this.hiddenFiles = false;
          }else{
            this.hiddenFiles = true;
          }
          this.listHeader = this.ListData[index];
          //this.dataType = this.ListData[index].departmentName;
        },
   //发送请求,获取数据

   getNewsListData(url){
     //this.currentTime=this.$route.query.currentTime;
     var url= "/CRMNewMobile/"+url;
     //this.currentDate = {"dataDate":this.currentTime};

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
  //初始化echartsCont4数据
  this.listHeader = this.ListData[0];

  this.loading2=false
  this.echarts=true

       var yeArray = [];
       var bnczArray = [];
       var byczArray = [];
       var bzArray = [];
       var bzrArray = [];
       var brwArray = [];

  for(var i=0;i<this.ListData.length;i++){
    var item = this.ListData[i];
    yeArray.push(Math.abs((item.amount===''?0:item.amount)/100000000).toFixed(4));
    bnczArray.push(Math.abs((item.yearAmount===''?0:item.yearAmount)/100000000).toFixed(4));
    byczArray.push(Math.abs((item.monthAmount===''?0:item.monthAmount)/100000000).toFixed(4));
    bzArray.push(Math.abs((item.weekAmount===''?0:item.weekAmount)/100000000).toFixed(4));
    bzrArray.push(Math.abs((item.dayAmount===''?0:item.dayAmount)/100000000).toFixed(4));
    brwArray.push(Math.abs((item.taskAmount===''?0:item.taskAmount)/100000000).toFixed(4));

    var obj=new Object()
    obj.textStyle=new Object()
    obj.value=this.ListData[i].departmentName;
    obj.textStyle.color="#A4A8AB"
    obj.textStyle.backgroundColor="#fff"
    this.labelType.push(obj)
    //this.labelType.push(this.ListData[i].departmentName)

  }

  this.dataText = [];
 this.dataText.push(yeArray);
 this.dataText.push(bnczArray);
 this.dataText.push(byczArray);
 this.dataText.push(bzArray);
 this.dataText.push(bzrArray);
 this.dataText.push(brwArray);
       console.log('数据=》');
       console.log(this.dataText);
 this.$store.state.echartData = this.dataText;

  this.amount = res.body.ListData[0];
  this.record = this.amount;
  this.amountlive = res.body.ListData[1];
  this.amountset = res.body.ListData[2];




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
  .toMainHeader{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .toMainHeader .topHeader{
    width: 12%;
    height: 100%;
    float: right;
  }
  .toMainHeader .navCont{
    width: 28%;
    height: 100%;
    float: right;
  }
  .toMainHeader .barWrap{
    width: 60%;
    height: 100%;
    float: right;
    position: relative;
  }

  /*设置查看详情按钮样式*/
  .toMainHeader .el-button--small{
    width: 4.66rem;
    height: 1.25rem;
    line-height: 0rem;
    margin-top: 5px;
  }

</style>
