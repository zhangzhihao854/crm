<template>
   <div class="clientgongxianone">
    <back-Header :title="title"></back-Header>
    <el-row >
        <el-col :span="24" >
            <div class="grid-content">存款贡献度:<span>{{dataText.contriDeposit}}</span></div>
            <div class="grid-content2">统计日期:<span>{{dataText.etlDate}}</span></div>
        </el-col>
        <el-col :span="24" >
            <div class="grid-content">贷款贡献度:<span>{{dataText.contributionLoan}}</span></div>
            <div class="grid-content2">综合贡献度:<span>{{dataText.contributionCust}}</span></div>
        </el-col>
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
          title:'贡献度',
          dataText:{
          }
        }
      },
      activated(){
          this.custId = this.$route.query.custId;
          this.getThisCustName();
      },
      methods:{
          //获取客户信息
          getThisCustName(){
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
                  console.log(res);
              this.dataText = res.body.data;
              console.log(res.body.data);
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
