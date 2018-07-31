<template>
   <div class="clientInformBox">
   <back-Header :title="title"></back-Header>
   <!--添加loading-->
   <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
   </el-table>
   <!--判断数据为空时，显示暂无数据-->
   <div v-show="eventShow" style="text-align: center; ">
     <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
       <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
     </div>
     <div style="margin-top: 20px;">暂时没有信息哦~</div>
   </div>
   <!--列表-->
   <div class="containt">
     <clientText :dataText='dataText'></clientText>
   </div>

  </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import clientText from '@/components/common/clientComp/clientAscription'


  export default {
    components:{
      BackHeader,
      clientText

    },
    data () {
      return {
          title:'归属信息',
          dataText:[],
          eventShow: false,
          loading2: true,
        }
      },
      activated(){
          //初始化数据
          this.eventShow = false;
          this.loading2 = true;
          this.dataText = [];
          this.custId = this.$route.query.custId;
          this.getThisGuQuanMsg();
      },
      methods:{
          //获取客户股权信息
          getThisGuQuanMsg(){
              var url = `/CRMNewMobile/client/queryAffiliationInfo`
              this.$http.post(url,
                {
                  "identity": this.cookies.get('identity'),
                  "custId": this.custId
                },
                {
                  emulateJSON:true
                }
              ).then(res => {
                   //没有数据的处理逻辑
                    if(res.body.ListData.length == 0){
                        this.loading2 = false;
                        this.eventShow = true;
                        this.dataText = [];
                    }else{
                        //有数据
                        this.loading2 = false;
                        this.eventShow = false;
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
