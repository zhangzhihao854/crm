<template>
   <div class="clientgongxianone">
    <back-Header :title="title"></back-Header>
     <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
     </el-table>
    <el-row >
        <el-col :span="24" >
            <div class="grid-content">存款贡献度:<span>{{dataText.context1}}</span></div>
            <div class="grid-content2">统计日期:<span>{{dataText.context2}}</span></div>
        </el-col>
        <el-col :span="24" >
            <div class="grid-content">贷款贡献度:<span>{{dataText.context3}}</span></div>
            <div class="grid-content2">综合贡献度:<span>{{dataText.context4}}</span></div>
        </el-col>
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
        title: '客户贡献度',
        dataText: {
          context1: '',
          context2: '',
          context3: '',
          context4: '',

        },
        loading2: true
      }
    },
        activated(){

        /*初始化数据*/
        this.dataText = {
          context1: '',
          context2: '',
          context3: '',
          context4: '',
        }
        this.loading2=true
        this.custId = this.$route.query.custId;
        this.getclientgongxiantwoData()
      },
      methods:{
        getclientgongxiantwoData(){
          var url = `/CRMNewMobile/pclient/queryContributeOrgByCustId`;
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
            this.dataText.context1=res.body.data.contriDeposit
            this.dataText.context2=res.body.data.etlDate2
            this.dataText.context3=res.body.data.contributionLoan
            this.dataText.context4=res.body.data.contributionCust
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
    margin-top: 0.83rem;
    font-size: 0.8rem;
    border: 1px solid #ECECEC;
    span{
      color: #222222;
      margin-left: 5px;
    }
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
    color: #888888;
    font-size: 0.8rem;
  }
  .grid-content2{
    display: inline-block;
    width: 49%;
    float: right;
    line-height: 2rem;
    color: #888888;
    text-align: left;
    font-size: 0.8rem;
  }


</style>
