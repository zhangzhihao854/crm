<template>
   <div class="clientYewuone">
   	<back-Header :title="title"></back-Header>
   	<clientYewucomp
      :dataText="dataText"
      :dataText1="dataText1"
      :dataText2="dataText2"
      :showDateA = "showDateA"
      :showDateB = "showDateB"
      :showDateC = "showDateC"
    ></clientYewucomp>


  </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import clientYewucomp from '@/components/common/clientComp/clientYewucompDG'

  export default {
    components:{
    	BackHeader,
    	clientYewucomp
    },
    data () {
      return {
          title:'业务概览',
          index:'0',
          dataText:[],
          dataText1:[],
          dataText2:[],
          showDateA: false,
          showDateB: false,
          showDateC: false,
        }
      },
      activated(){
          this.custId = this.$route.query.custId;
          this.getThisDaiKMsg();
          this.getThiscUNkMsg();
          this.getThisGuQuanMsg();
          this.showDateA = false;
          this.showDateB = false;
          this.showDateC = false;
      },
      methods:{
          //获取客户贷款信息
          getThisDaiKMsg(){
              var url = `/CRMNewMobile/pclient/queryLoanOrgByCustId`
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
                    this.dataText = [
//                      {etlDate2:'2017-12-09',
//                        curAcBl:'543',
//                        lastAcBl:'987',
//                        lastYearAvg:'654',
//                        lastMonthAvg:'87654',},

                    ];
                    this.showDateA = true;
                  }else{
                    this.dataText = res.body.ListData;
                    this.showDateA = false;
                  }

          }).catch((error) => {
                  console.log(error);
          })
          },
          //获取存款信息
          getThiscUNkMsg(){
              var url = `/CRMNewMobile/pclient/querySaveOrgByCustId`
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
                    this.dataText1 = [];
                    this.showDateB = true;
                  }else{
                    this.showDateB = false;
                    this.dataText1 = res.body.ListData;
                  }

          }).catch((error) => {
                  console.log(error);
          })
          },
          //获取股权信息
          getThisGuQuanMsg(){
              var url = `/CRMNewMobile/pclient/queryStockOrgByCustId`
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
                      this.showDateC = true;
                      this.dataText2 = [
                      ];
                  }else{
                      this.showDateC = false;
                    this.dataText2 = res.body.ListData;
                  }



          }).catch((error) => {
                  console.log(error);
          })
          }
      }
  }
</script>

<style lang='scss' scoped>


</style>
