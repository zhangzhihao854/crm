<template>
   <div class="clientYewuone">
   	<back-Header :title="title"></back-Header>
       <!--<div class="clientComp" >-->
       <!-- <el-tabs>
        <el-tab-pane :label="item.context"  v-for="(item,index) in clientgo" :key='index'>
           <div class="elitemBox">
       <el-collapse accordion>
            <el-collapse-item  name="1">
               <template slot="title">
                  <i class="cilentfont">{{item.times}}</i>
                </template>
                <div class="colorone">{{item.clientcont1}} <span class="blackco">{{item.times}}</span></div>
                <div class="colorone">{{item.clientcont3}} <span class=" blackco">{{item.clientcont4}}</span></div>
                <div class="colorone">{{item.clientcont5}} <span class=" blackco">{{item.clientcont6}}</span></div>
                <div class="colorone">{{item.clientcont7}} <span class=" blackco">{{item.clientcont8}}</span></div>
                <div class="colorone">{{item.clientcont9}} <span class="blackco">{{item.clientcont10}}</span></div>
                <div class="colorone">{{item.clientcont11}} <span class=" redcolor">{{item.clientcont12}}</span></div>
                <div class="colorone">{{item.clientcont13}} <span class=" redcolor">{{item.clientcont14}}</span></div>
                <div class="colorone">{{item.clientcont15}} <span class=" blackco">{{item.clientcont16}}</span></div>
                <div class="colorone">{{item.clientcont17}} <span class=" blackco">{{item.clientcont18}}</span></div>
             </el-collapse-item>
        </el-collapse>-->
     <!--</div>-->
       <clientYewtow
         :dataText="dataText"
         :dataText1="dataText1"
         :dataText2="dataText2"
         :showDate3="showDate3"
         :showDate4="showDate4"
         :showDate5="showDate5"
       ></clientYewtow>
  </div>
</template>

<script type="text/ecmascript-6">
import BackHeader from '@/components/header/back-header'
import clientYewtow from '@/components/common/clientComp/clientYewtow'
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
        showDate3: false,
        showDate4: false,
        showDate5: false,
        }
      },
      activated(){
        this.showDate3= false,
        this.showDate4= false,
        this.showDate5= false,
          this.custId = this.$route.query.custId;
          this.getThisCunKMsg();
          this.getThiscUNkMsg();
          this.getThisGuQuanMsg();
      },
      methods:{
          //获取个人贷款信息
          getThisCunKMsg(){
              var url = `/CRMNewMobile/business/queryOrgLoanByCastId`
              this.$http.post(url,
                {
                  "identity": this.cookies.get('identity'),
                  "custId": this.custId
                },
                {
                  emulateJSON:true
                }
              ).then(res => {

                  this.dataText = res.body.ListData;
            if(res.body.ListData.length==0){
              this.showDate3=true
            }

          }).catch((error) => {
                  console.log(error);
          })
          },
          //获取个人存款信息
          getThiscUNkMsg(){
              var url = `/CRMNewMobile/business/queryorgDepositByCastId`
              this.$http.post(url,
                {
                  "identity": this.cookies.get('identity'),
                  "custId": this.custId
                },
                {
                  emulateJSON:true
                }
              ).then(res => {

                if(res.body.ListData.length==0){
                  this.showDate4=true
                  this.dataText1 = []
                }else{
                  this.showDate4 = false
                  this.dataText1 = res.body.ListData;
                }


          }).catch((error) => {
                  console.log(error);
          })
          },
          //获取个人存款信息
          getThisGuQuanMsg(){
              var url = `/CRMNewMobile/business/queryorgStockByCastId`
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
                if(res.body.ListData.length==0){
                  this.showDate5=true
                }

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
