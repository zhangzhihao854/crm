<template>
   <div class="moreInformBox">
   <back-Header :title="title"></back-Header>
   <div class="containt">
       <!--添加loading-->
     <!--  <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%"> </el-table>-->

     <!--判断数据为空时，显示暂无数据-->
       <div v-show="eventShow" style="text-align: center; ">
         <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
           <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
         </div>
         <div style="margin-top: 20px;">暂时没有信息哦~</div>
       </div>

     <client-text :dataText='dataText' v-show="showInfor"></client-text>
   </div>

  </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import clientText from '@/components/common/publicCom/publicCunKuan'

  export default {
    components:{
      BackHeader,
      clientText
    },
    data () {
      return {
      title:'存款情况',
          dataText:[],
          loading2:true,
          eventShow: false,
          showInfor: false
        }
      },
      activated(){
          this.eventShow = false
          this.showInfor = false
          this.custId = this.$route.query.custId
          this.getThisCunKuanMsg()
      },
      methods:{
          //获取客户存款情况信息
          getThisCunKuanMsg(){
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
                  console.log(res);
              //this.dataText = res.body.ListData;
              //this.loading2 = false;
              if(res.body.ListData.length == 0){
                this.eventShow = true
                this.showInfor = false
                this.dataText = []
              }else{
                this.showInfor = true
                this.eventShow = false
                this.dataText = res.body.ListData;
              }
              console.log(res.body.ListData)
              //              alert(res.body.msg)
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
  margin-top: 1rem;
  background: #FFFFFF;

 }
}

</style>
