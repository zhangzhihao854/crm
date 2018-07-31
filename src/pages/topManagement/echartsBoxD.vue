<template>
  <div class="toMainHeader">
    <div class="topHeader">
      <back-Header :title="title"></back-Header>
    </div>
    <div class="navCont">
      <echartsCont1 :slides='contText2'  :listHeader="listHeader"  :hiddenFiles="hiddenFiles" style='width: 100%;'></echartsCont1>
<!--      <echartsCont3 :slides='contText2'  :listHeader="listHeader"  :hiddenFiles="hiddenFiles"  style='width: 100%;'></echartsCont3>-->
    </div>
    <div class="barWrap">
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
      <echartMini5  v-show="echarts"
                    :labelType="labelType"
                    :dataArray="dataArray"
                    :dataText='dataText'
                    :services="services"
                    @servicesChange="servicesChange">
      </echartMini5>
    </div>

  </div>
<!--  <div class="toMainHeader" :style='{width:clientHeight}' style="
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
    <back-Header :title="title" style='font-size:14px'></back-Header>
    &lt;!&ndash;  <echartsHeader ></echartsHeader> &ndash;&gt;
 &lt;!&ndash;   <span class='Sright'><el-button type="primary"  size="small" @click='goEcharts'>查看详情</el-button></span>&ndash;&gt;
    <div>
      <echartsCont4 v-show="showdata" :slides='contText1' :record="record"  style='width: 100%;'></echartsCont4>
      <echartsCont3 v-show="showdatamore" :slides='contText2' :record="record"  style='width: 100%;'></echartsCont3>
    </div>
    <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <echartMini4  v-show="echarts"
      :labelType="labelType"
      :dataArray="dataArray"
      :dataText='dataText'
      :services="services"
      @services-change="servicesChange"
    ></echartMini4>
  </div>-->
</template>
<script>
  import BackHeader from '@/components/header/right-header'
  import echartMini5 from '@/components/common/topComponents/echartMini5'
  import echartsCont1 from '@/components/common/topComponents/echartsCont1'
  /*import echartsCont3 from '@/components/common/topComponents/echartsCont3'*/
  export default {
    components:{
      BackHeader,
      echartsCont1,
      echartMini5
    },
    data () {
      return {
        title:'贷款情况分析表(2017年11月1日)',
        showdata:"false",
        showdatamore:"false",
        record:[],
        labelType:[
          {value:'贷款合计',textStyle:{color:"#fff",backgroundColor:"#EE5948"}},
          {value:'对公贷款合计',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}},
          {value:'零售贷款合计',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}},
        ],
        dataArray:[],
        dataText:[],
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
        ListData:[],
        services:0,
        dataType:'',
        currentTime:'',
        currentTimeheader: '',
        loading2: true,
        echarts:false,
        //高管看板柱状图头部数据集合
        listHeader:{},
        //控制比任务、完成率的显示与隐藏
        hiddenFiles:true,
      }
    },
    activated(){
      this.listHeader = {},
      this.hiddenFiles = true,
      this.loading2=true,
      this.echarts=false,
      this.showdata=true;
      this.showdatamore=false

      this.currentTime=this.$route.query.currentTime;
      this.currentTimeheader = this.currentTime.split("-");
      this.title="贷款情况分析表("+this.currentTimeheader[0]+"年"+this.currentTimeheader[1]+"月"+this.currentTimeheader[2]+"日)"
      this.getNewsListData()
    },
    methods:{
      goEcharts(){
//        this.$router.push('/echartsBoxDxq?dataType='+this.dataType);
      },

      servicesChange(index){
        if(index==0){
          //点击贷款合计时将比任务、完成率隐藏掉
          this.hiddenFiles = false;
        }else{
          this.hiddenFiles = true;
        }
        this.listHeader = this.ListData[index];
        //this.dataType = this.ListData[index].departmentName;
      },
      //发送请求,获取数据
      getNewsListData(){
        this.loading2=false
        //this.currentTime=this.$route.query.currentTime;
        var url= `/CRMNewMobile/subbranch/querySubbranchLoan`;

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
          console.log("数据==>");
        this.ListData = res.body.ListData;
          //初始化echartsCont4数据
          this.listHeader = this.ListData[1];
        console.log(this.ListData.length+"我是数据里面内容长度");

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
          this.labelType[i] = this.ListData[i].departmentName;

        }
          console.log(this.labelType)
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
        console.log(res.body);
        console.log(this.amount)//全行贷款合计
        console.log(this.record)//全行贷款合计
        console.log(this.amountlive)//运河管理支行




//                  alert(res.body.msg);
      }).catch((error)=>{
          console.log(error);
      })
      }

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
