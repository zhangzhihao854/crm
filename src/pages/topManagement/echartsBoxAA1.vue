<template>
  <div class="toMainHeader">
    <div class="topHeader">
      <back-Header :title="title" :dataType="dataType"  :currentTime="currentTime" :depaId="depaId" :mark="mark" :isHide="isHide"></back-Header>
    </div>
    <div class="navCont">
      <echartsCont :listHeader="listHeader"  :headTit="headTit" ></echartsCont>
    </div>
    <div class="barWrap">
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
      <echartMini1  v-show="echarts"
                    :labelType="labelType"
                    :dataArray="dataArray"
                    :dataText='dataText'
                    :services="services"
                    @servicesChange="servicesChange">
      </echartMini1>
    </div>
  </div>
</template>

<script>
import BackHeader from '@/components/header/right-header-btn1'
import echartMini1 from '@/components/common/topComponents/echartMini1'
import echartsHeader from '@/components/common/topComponents/echartsHeader'
import echartsCont from '@/components/common/topComponents/echartsCont'
  export default {
   components:{
      BackHeader,
      echartsHeader,
      echartsCont,
      echartMini1
    },
    data () {
         return {
           title:'截止时间2017年11月1日',
           labelType:[
      //     {value:'',textStyle:{color:"#fff",backgroundColor:"#EE5948"}},
           ],
           record:{},
           dataArray:[],
           dataText:[],
           contText1:{
            context:'366869',context1:'104725',context2:'7469',context3:'1725',
            conT:'存款余额',conT1:'比年初增',conT2:'比上月降',conT3:'比昨日增',
           },
          clientHeight:window.innerHeight,
          clientWidth:'',
          currentTime:'',
          ListData:[],
          services:'',
          dataType:'',
          loading2: true,
          echarts:false,
          currentTimeheader:[],
           //高管看板柱状图头部数据集合
           listHeader:{},
          headTit:'存款余额',
           mark:5,
           depaId:'',
           //点击全行合计隐藏查看详情按钮
           isHide:false
      }
      },
    activated(){
      //初始化数据
      this.listHeader = {}
      this.isHide = false
      this.labelType=[]
      this.ListData = []
      this.loading2=true
      this.echarts=false
      //获取页面传递的参数
      this.dataType = this.$route.query.dataType;
      this.currentTime=this.$route.query.currentTime;
      this.currentTimeheader = this.currentTime.split("-");
      this.title="截止到"+this.currentTimeheader[0]+"年"+this.currentTimeheader[1]+"月"+this.currentTimeheader[2]+"日"
      this.getNewsListData();
    },
 /*   mounted(){
        console.log("loading2===")
        console.log(this.loading2)
    },*/
      methods:{
        servicesChange(index){
          if(index == 0){
            this.isHide = false;
          }else{
            this.isHide = true;
          }
          this.listHeader = this.ListData[index];
          this.depaId = this.ListData[index].id;
        },
     /*   servicesChange (val) {
          this.services = val;
          console.log("services==>"+this.services)
          for(var i=0;i<this.ListData.length;i++){
            if(this.services == i){
              this.record = this.ListData[i];
              this.dataText[i] = this.ListData[i];
              this.dataType = this.ListData[i].departmentName;
            }
          }
        },*/

        getNewsListData(){
          this.loading2=false

          var url= `/CRMNewMobile/retailDeposits/queryAdmiRetailDeposits`;
           // this.currentDate = {"dataDate":this.currentTime,"dataType":this.dataType};
          console.log(this.currentDate);
          this.$http.post(url,
            {
                "identity":this.cookies.get('identity'),
              "dataDate":this.currentTime,
              "dataType":this.dataType
            },
            {
              emulateJSON:true
            }

          ).then(res => {
            console.log("loading2===")
            console.log(this.loading2)

          this.ListData = res.body.ListData;
          //给echartsCont组件一个初始值
          this.listHeader =  this.ListData[0];
          //初始化depaId
          this.depaId = this.ListData[1].id;

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

            var obj=new Object()
            obj.textStyle=new Object()
            obj.value=this.ListData[i].departmentName;
           /* if(i==0){
              obj.textStyle.color="#fff"
              obj.textStyle.backgroundColor="#EE5948"
            }else{
              obj.textStyle.color="#A4A8AB"
              obj.textStyle.backgroundColor="#fff"
            }*/
            obj.textStyle.color="#A4A8AB"
            obj.textStyle.backgroundColor="#fff"
            this.labelType.push(obj)
          }

          this.dataText = [];
            this.dataText.push(yeArray);
            this.dataText.push(bnczArray);
            this.dataText.push(byczArray);
            this.dataText.push(brczArray);
            console.log('数据=>');
            console.log(this.dataText);
          this.$store.state.echartData = this.dataText;


          this.amount = res.body.ListData[0];
          this.record = this.amount;
          this.amountlive = res.body.ListData[1];
          this.amountset = res.body.ListData[2];
          console.log( this.amount)
          console.log(this.record);


//                  alert(res.body.msg);
        }).catch((error)=>{
            console.log(error);
        })
        }

        },
//        watch:{
//          clientHeight(){
//            console.log(this.clientHeight)
//          }
//        },
//        mounted(){
//          console.log( this.clientHeight);
//        }
      }

</script>

<style scoped lang="scss">
  .toMainHeader{
    width: 100%;
    height: 100%;
    //position: relative;
    position: fixed;
    left: 0;
    top:0;
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
</style>
