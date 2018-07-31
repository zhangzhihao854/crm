<template>
   <div class="clientYewuone">
   	<back-Header :title="title"></back-Header>
   	<clientYewucomp
      :dataTexts="dataTexts"
      :dataText1s="dataText1s"
      :dataText2s="dataText2s"
      :showDate6="showDate6"
      :showDate7="showDate7"
      :showDate8="showDate8"
    ></clientYewucomp>
  </div>
</template>

<script type="text/ecmascript-6">
import BackHeader from '@/components/header/back-header'
import clientYewucomp from '@/components/common/clientComp/clientYewucomp'

  export default {
    components:{
    	BackHeader,
    	clientYewucomp
    },
    data () {
      return {
          title:'业务概览',
          index:'0',
          dataTexts:[],
          dataText1s:[],
          dataText2s:[],
          showDate6:false,
          showDate7:false,
          showDate8:false,
        }
      },
      activated(){
          this.custId = this.$route.query.custId;
          this.getThisDaiKMsg();
          this.getThiscUNkMsg();
          this.getThisGuQuanMsg();
          this.showDate6=false
          this.showDate7=false
          this.showDate8=false
      },
      methods:{
          //获取客户贷款信息
          getThisDaiKMsg(){
              var url = `/CRMNewMobile/business/queryLoanByCastId`
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
                    this.dataTexts = []
                   this.showDate6=true
                  }else{
                    this.dataTexts = res.body.ListData;
                  }
                /*this.dataTexts = res.body.ListData;*/
              console.log('数据==>'+JSON.stringify(this.dataTexts))

          }).catch((error) => {
                  console.log(error);
          })
          },
          //获取存款信息
          getThiscUNkMsg(){
              var url = `/CRMNewMobile/business/queryDepositByCastId`
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
                    this.dataText1s = []
                   this.showDate7=true
                  }else{
                    this.dataText1s = res.body.ListData;
                  }
                  /*this.dataText1s = res.body.ListData;*/
                  console.log(this.dataText1s+'1111')
              console.log('数据==>'+JSON.stringify(this.dataText1s))

          }).catch((error) => {
                  console.log(error);
          })
          },
          //获取股权信息
          getThisGuQuanMsg(){
              var url = `/CRMNewMobile/business/queryRightsByCastId`
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
                    this.dataText2s = []
                   this.showDate8=true
                  }else{
                    this.dataText2s = res.body.ListData;
                  }
                  this.dataText2s = res.body.ListData;
              console.log('数据==>'+JSON.stringify(this.dataText2s))

          }).catch((error) => {
                  console.log(error);
          })
          }
      }
  }
</script>

<style lang='scss' scoped>


</style>
