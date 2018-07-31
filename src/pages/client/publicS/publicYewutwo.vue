<template>
   <div class="clientYewuone">
   	<back-Header :title="title"></back-Header>

       <clientYewtow
         :dataText="dataText"
         :dataText1="dataText1"
         :dataText2="dataText2"
         :showDate9 = "showDate9"
         :showDate10 ="showDate10"
         :showDate11 = "showDate11"
       ></clientYewtow>
  </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import clientYewtow from '@/components/common/publicCom/publicYewtow'
  export default {
    components:{
    	BackHeader,
        clientYewtow

    },
    data () {
      return {
          title:'账户信息',
          dataText:[],
          dataText1:[],
          dataText2:[],
          showDate9: false,
          showDate10: false,
          showDate11: false,
        }
      },
      activated(){
          this.custId = this.$route.query.custId;
          this.getThisCunKMsg();
          this.getThiscUNkMsg();
          this.getThisGuQuanMsg();
          this.showDate9 = false;
          this.showDate10 = false;
          this.showDate11 = false;
      },
      methods:{
          //获取个人贷款信息
          getThisCunKMsg(){
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
                    this.showDate9 = true;
                    this.dataText = [];

                  }else{
                    this.showDate9 = false;
                  this.dataText = res.body.ListData;
                  }

              console.log('数据==>'+JSON.stringify(this.dataText))

          }).catch((error) => {
                  console.log(error);
          })
          },
          //获取个人存款信息
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
                  this.dataText1 = res.body.ListData;
                  if(res.body.ListData.length == 0){
                    this.showDate10 = true

                  }else{
                    this.showDate10 = false
                  }
              console.log('数据==>'+JSON.stringify(this.dataText1));
          }).catch((error) => {
                  console.log(error);
          })
          },
          //获取股权信息
          getThisGuQuanMsg(){
              var url = `/CRMNewMobile/pclient/queryStockOrgByCustId`;
              this.$http.post(url,
                {
                  "identity": this.cookies.get('identity'),
                  "custId": this.custId
                },
                {
                  emulateJSON:true
                }
              ).then(res => {
                  this.dataText2 = res.body.ListData;
                  if(res.body.ListData.length == 0){
                      this.showDate11 = true;
                    this.dataText2 = [];
                  }else{
                      this.showDate11 = false;
                  }
              console.log('数据==>'+JSON.stringify(this.dataText2))

          }).catch((error) => {
                  console.log(error);
          })
          }
      }
  }
</script>

<style lang='scss' scoped>
.blackco{
  color: #222222;
}
.cilentfont{
  font-size: 14px;
}

</style>
