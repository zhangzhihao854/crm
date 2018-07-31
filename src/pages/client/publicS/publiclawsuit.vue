<template>
   <div class="clientInformBox">
   <back-Header :title="title"></back-Header>
   <div class="containt">
       <!--添加loading-->
       <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%;z-index: 10"></el-table>
       <!--判断数据为空时，显示暂无数据-->
       <div v-show="eventShow" style="text-align: center; ">
         <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
           <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
         </div>
         <div style="margin-top: 20px;">暂时没有信息哦~</div>
       </div>
       <publiclawsuit :dataText='dataText'></publiclawsuit>
   </div>

  </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import publiclawsuit from '@/components/common/publicCom/publiclawsuit'


  export default {
    components:{
        BackHeader,
        publiclawsuit

    },
    data () {
      return {
          title:'诉讼信息',
          dataText:[],
          loading2:true,
          eventShow: false,
        }
      },
      activated(){
          this.eventShow = false;
          this.loading2 = true;
          this.custId = this.$route.query.custId;
          this.getThisGuQuanMsg();
      },
      methods:{
          //获取客户股权信息
          getThisGuQuanMsg(){
              var url = `/CRMNewMobile/pclient/queryCustLawInfoByCustId`
              this.$http.post(url,
                      {
                          "identity": this.cookies.get('identity'),
                          "borrName": '111111'
                      },
                      {
                        emulateJSON:true
                      }
              ).then(res => {
                  if(res.body.ListData.length == 0){
                      this.loading2 = false;
                      this.dataText=[]
                      this.eventShow = true
                  }else{
                      this.loading2 = false;
                      this.dataText = res.body.ListData;
                  }
          }).catch((error) => {
                  console.log(error);
          })
          }
      }
  }
</script>

<style lang='scss'>
.clientInformBox{
    height:100%;
    width: 100%;
    overflow: scroll;

.back_text span[data-v-a2006ea4] {
  width: 6em!important;
}
.containt{
  margin-top: 1rem;
  background: #FFFFFF;

 }
}

</style>
