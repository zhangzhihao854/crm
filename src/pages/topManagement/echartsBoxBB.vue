<template>
  <div class="toMainHeader">
    <div class="topHeader">
      <back-Header :title="title" :dataType="dataType"  :currentTime="currentTime" :mark="mark" :isHide="isHide"></back-Header>
    </div>
    <div class="navCont">
      <echartsCont3 :slides='contText1'  :listHeader="listHeader"   style='width: 100%;'></echartsCont3>
    </div>
    <div class="barWrap">
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
      <echartMini2  v-show="echarts"
                    :labelType="labelType"
                    :dataArray="dataArray"
                    :dataText='dataText'
                    :services="services"
                    @servicesChange="servicesChange">
      </echartMini2>
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
    &lt;!&ndash;<echartsHeader ></echartsHeader>&ndash;&gt;

    <span class='Sright'><el-button type="primary"  size="small" @click='goEcharts'>查看详情</el-button></span>

    <div>
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
      <echartsCont3 :slides='contText1'  :listHeader="listHeader"   style='width: 100%;'></echartsCont3>
    </div>
    <echartMini2  v-show="echarts"
      :labelType="labelType"
      :dataArray="dataArray"
      :dataText='dataText'
      :services="services"
      @servicesChange="servicesChange"
    ></echartMini2>
  </div>-->

</template>

<script>
  import BackHeader from '@/components/header/right-header-btn'
  import echartMini2 from '@/components/common/topComponents/echartMini2'
  import echartsHeader from '@/components/common/topComponents/echartsHeader'
  import echartsCont3 from '@/components/common/topComponents/echartsCont3'
  export default {
    components:{
      BackHeader,
      echartsHeader,
      echartsCont3,
      echartMini2
    },
    data () {
      return {
        title:'截止时间2017年11月1日',
        labelType:[
//          {value:'全行贷款合计',textStyle:{color:"#fff",backgroundColor:"#EE5948"}},
//          {value:'新华管理支行',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}},
//          {value:'南陈屯管理支行',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}},
//          {value:'运河管理支行',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}},
//          {value:'南湖管理支行',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}},
//          {value:'南湖管理支行',textStyle:{color:"#A4A8AB",backgroundColor:"#fff"}}
        ],
        dataArray:[],
        dataText:[
        ],
        contText1:{
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
        mark:4,
        //点击全行合计隐藏查看详情按钮
        isHide:false
      }
    },
    activated(){
      //初始化数据
      this.listHeader = {}
      this.isHide = false
      this.record={}
      this.labelType=[],

      this.loading2=true,
      this.echarts=false,
        //获取时间
        this.currentTime=this.$route.query.currentTime;
      this.currentTimeheader = this.currentTime.split("-");
      this.title="截止到"+this.currentTimeheader[0]+"年"+this.currentTimeheader[1]+"月"+this.currentTimeheader[2]+"日"

      this.getNewsListData();
    },
    methods:{
    /*  goEcharts(){
        this.$router.push('/echartsBoxBBxq?dataType='+this.dataType+'&currentTime='+this.currentTime);
      },*/
      servicesChange(index){
        if(index == 0){
          this.isHide = false;
        }else{
          this.isHide = true;
        }
        this.listHeader = this.ListData[index];
        this.dataType = this.ListData[index].id;
      },
//发送请求,获取数据
      getNewsListData(){
        this.loading2=false
        var url= `/CRMNewMobile/compaDeposits/queryCompaDeposits`;
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
          console.log("数据==>");
        console.log(res.body);
        this.ListData = res.body.ListData;
        //给echartsCont组件一个初始值
        this.listHeader =  this.ListData[0];
        this.dataType = this.ListData[0].id;

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

          var obj=new Object()
          obj.textStyle=new Object()
          obj.value=this.ListData[i].departmentName;
          obj.textStyle.color="#A4A8AB"
          obj.textStyle.backgroundColor="#fff"
          this.labelType.push(obj)
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
