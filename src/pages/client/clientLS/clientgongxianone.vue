<template>
   <div class="clientgongxianone">
    <back-Header :title="title"></back-Header>
     <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
     </el-table>
    <!-- <el-row>
      <el-col :span="24">
        <div class="grid-content">{{dataText.custLevName}}</div>
          <div class="grid-content2">{{dataText.statisticsDt}}</div>
        <div class="grid-content3">{{dataText.resultAum}} 元</div>
      </el-col>
     </el-row>-->
     <el-row>
       <el-col :span="24"><div class="grid-content bg-purple-dark">评级结果: <span style="color:rgba(85,154,238,1);">{{dataText.custLevName}}</span></div></el-col>
       <el-col :span="24"><div class="grid-content bg-purple-dark">上次评级结果: {{dataText.proCustLevName}}</div></el-col>
       <el-col :span="24"><div class="grid-content bg-purple-dark">评级日期: {{dataText.statisticsDt}}</div></el-col>
     </el-row>
  </div>
</template>

<script type=text/ecmascript-6>
import BackHeader from '@/components/header/back-header'
  export default {
    components:{
      BackHeader
    },
    data () {
      return {
        title:'客户评级',
//        solides:{context1:'低价值客户',context2:'2017-1-11',context3:'低价值客户'}
        dataText:{
        },
        loading2:true
        }
      },
    activated(){
      this.loading2=true
      this.custId = this.$route.query.custId;
      this.getclientTextData()
    },
      methods:{
        getclientTextData(){
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
            this.loading2=false
          console.log(res);
          this.dataText.statisticsDt = res.body.ListData[0].statisticsDt;
            console.log(this.dataText.statisticsDt);
            var year = this.dataText.statisticsDt.substring(0,4);
            var month = this.dataText.statisticsDt.substring(4,6);
            var day = this.dataText.statisticsDt.substring(6,8);
            this.dataText.statisticsDt=year+"-"+month+"-"+day
          this.dataText.custLevName = res.body.ListData[0].custLevName;
          this.dataText.resultAum = res.body.ListData[0].resultAum;
        }).catch((error) => {
            console.log(error);
        })
        },
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
