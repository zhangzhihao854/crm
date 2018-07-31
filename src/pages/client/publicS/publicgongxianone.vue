<template>
   <div class="clientgongxianone">
    <back-Header :title="title"></back-Header>
     <!--添加loading图-->
     <el-table v-loading="loadingShow"  v-show="loadingShow" element-loading-text="拼命加载中" style="width: 100%">
     </el-table>
     <!--判断数据为空时，显示暂无数据-->
     <div v-show="eventShow" style="text-align: center; ">
       <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
         <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
       </div>
       <div style="margin-top: 20px;">暂时没有信息哦~</div>
     </div>
    <el-row v-for="(item, index) in dataText" :key="index" >
      <!--<el-col :span="24" >
        <div class="grid-content">{{item.custLevName}}</div>
          <div class="grid-content2">{{item.statisticsDt.substring(0,item.statisticsDt.length-4)+"-"
            +item.statisticsDt.substring(4,item.statisticsDt.length-2)+"-"
            +item.statisticsDt.substring(6,item.statisticsDt.length)
            }}</div>
        <div class="grid-content3">{{item.proCustLevName}}</div>
      </el-col>-->
      <el-col :span="24"><div class="grid-content bg-purple-dark">评级结果:  <span style="color:rgba(85,154,238,1);">{{item.custLevName}}</span></div></el-col>
      <el-col :span="24"><div class="grid-content bg-purple-dark">上次评级结果:  {{item.proCustLevName}}</div></el-col>
      <el-col :span="24"><div class="grid-content bg-purple-dark">评级日期:  {{item.statisticsDt.substring(0,item.statisticsDt.length-4)+"-"
            +item.statisticsDt.substring(4,item.statisticsDt.length-2)+"-"
            +item.statisticsDt.substring(6,item.statisticsDt.length)
            }}</div></el-col>
   </el-row>
  </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
  export default {
    components:{
      BackHeader
    },
    data () {
      return {
        title:'客户评级',
//        solides:{context1:'低价值客户',context2:'2017-1-11',context3:'低价值客户'}
       /* dataText:{
          text1:'2017-01-01',
          text2:'低价值客户'
        }*/
        dataText: '',
        loadingShow: true,
        eventShow: false
        }
      },
    activated(){
      this.eventShow = false;
      this.loadingShow = true;
      this.custId = this.$route.query.custId;
      this.getThisCustName();

    },
      methods:{
        //获取客户贡献度信息
        getThisCustName(){
          var url = `/CRMNewMobile/pclient/queryGradeByCustId`;
          this.$http.post(url,
            {
              "identity": this.cookies.get('identity'),
              "custId": this.custId
            },
            {
              emulateJSON:true
            }
          ).then(res => {
            if(res.body.ListData.length == 0){
              this.loadingShow = false;
              this.eventShow = true;
            }else{
              this.loadingShow = false
              this.dataText = res.body.ListData;
            }
        }).catch((error) => {
            console.log(error);
        })
        }
      }
  }
</script>

<style lang='scss' scoped>
  .clientgongxianone{
    width: 100%;
    height: 100%;

  }

.el-row {
    background: #ffffff;
    margin-top: 0.86rem;
  font-size: 0.8rem;
    border: 1px solid #ECECEC;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-content {
    border-radius: 4px;
    min-height: 2rem;
    line-height: 2rem;
    padding-left: 5%;
    width: 50%;
    display: inline-block;
    color: #555555;
  }
  .grid-content2{
    display: inline-block;
    width: 49%;
    float: right;
    line-height: 2rem;
    color: #888888;
    text-align: right;
    padding-right: 10%;
  }
  .grid-content3{
    display: inline-block;
     min-height: 2rem;
    line-height: 2rem;
    margin-left: 5%;
    color: #559AEE;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
