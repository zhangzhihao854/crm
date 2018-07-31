<template>
   <div class="moreInformBox">
   <back-Header :title="title"></back-Header>

   <div class="containt1">
     <!--添加loading-->
     <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%"> </el-table>
     <!--判断数据为空时，显示暂无数据-->
     <div v-show="eventShow" style="text-align: center; ">
       <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
         <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
       </div>
       <div style="margin-top: 20px;">暂时没有信息哦~</div>
     </div>

     <clientText :dataText='dataText'></clientText>
   </div>
	</div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import clientText from '@/components/common/clientComp/clientDanbao'
import { MessageBox } from 'mint-ui';


  export default {
    components:{
      BackHeader,
      clientText
    },
    data () {
      return {
          title:'担保信息',
          dataText:[],
          loading2:true,
          eventShow:false
        }
      },
      activated(){
          this.eventShow = false;
          this.loading2 = true;
          this.custId = this.$route.query.custId;
          this.dataText=[]
          this.getThisGuQuanMsg();
      },
      methods:{
          //获取个人担保信息
          getThisGuQuanMsg(){
              var url = `/CRMNewMobile/business/queryAssuretByCustId`
              this.$http.post(url,
                {
                  "identity": this.cookies.get('identity'),
                  "custId": this.custId
                },
                {
                  emulateJSON:true
                }
              ).then(res => {
                  if(res.body.ListData[0] == null){
                    this.dataText = [];
                    this.loading2 = false;
                    this.eventShow = true;
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
.moreInformBox{
    height:100%;
    width: 100%;

.back_text span[data-v-a2006ea4] {
	width: 6em!important;
}
.containt1{
 /* margin-top: 0.88rem;*/
  background: #FFFFFF;

 }
}

</style>
