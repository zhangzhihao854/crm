<template>
<div class="moreInformBox">
   <back-Header :title="title"></back-Header>

   <div class="containt">
     <!--添加loading-->
     <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%"> </el-table>
       <clientText :dataText='dataText'></clientText>
     <!--判断数据为空时，显示暂无数据-->
     <div v-show="eventShow" style="text-align: center; ">
       <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
         <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
       </div>
       <div style="margin-top: 20px;">暂时没有信息哦~</div>
     </div>
   </div>

</div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import clientText from '@/components/common/clientComp/clientCredit'
import { MessageBox } from 'mint-ui';

  export default {
    components:{
      BackHeader,
      clientText
    },
    data () {
      return {
          title:'授信信息',
          dataText:[],
          loading2:true,
          loading: true,
          eventShow:false
        }
      },
      activated(){
        this.eventShow=false
          this.custId = this.$route.query.custId;
          this.getThisGuQuanMsg();
      },
      methods:{
          //获取客户股权信息
          getThisGuQuanMsg(){
              var url = `/CRMNewMobile/business/queryCreditByCustId`
              this.$http.post(url,
                {
                  "identity": this.cookies.get('identity'),
                  "custId": this.custId
                },
                {
                  emulateJSON:true
                }
              ).then(res => {
                  /*判断请求数据是否为空*/
                  if(res.body.ListData[0] == null){
                    this.dataText = [
//                      {
//                        cusName:'王斌',
//                        crdTotlAmt:'3000',
//                        alreadyAmt:'234',
//                        limitAmt:'654',
//                        creditPartAmt:'987',
//                        alreadyPartAmt:'1234',
//                        limitPartAmt:'987',
//                        creditBeginData2:'2017-12-18',
//                        creditEndData2:'2017-09-02',
//                        mgrOrgName:'xxxx机构',
//                      },
                    ];
                    /*数据为空，显示loading图--暂无数据*/
              this.eventShow=true
                    this.loading2 = false;
                  }else{
                    this.dataText = res.body.ListData;
                    /*有数据时，将loading图隐藏*/
                    this.loading2 = false;
                    this.loading = false;
                  }



          }).catch((error) => {
                  console.log(error);
          })
          }
      }
  }
</script>

<style lang='scss' scoped>

.moreInformBox{
    height:100%;
    width: 100%;

.back_text span[data-v-a2006ea4] {
	width: 6em!important;
}
.containt{
  margin-top: 0.88rem;
  background: #FFFFFF;

 }
}

</style>
