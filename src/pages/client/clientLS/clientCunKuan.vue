<template>
   <div class="moreInformBox">
   <back-Header :title="title"></back-Header>
   <div class="containt">

     <!--判断数据为空时，显示暂无数据-->
     <div v-show="messageShow" style="text-align: center; ">
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
import clientText from '@/components/common/clientComp/clientCunKuan'


  export default {
    components:{
      BackHeader,
      clientText,


    },
    data () {
      return {
      messageShow: false,
        showInfor: false,
      title:'存款情况',
          dataText:{
              Stext:'2017-10-11',
              Stext1:'0',
              Stext2:'0',
              Stext3:'0',
              Stext4:'0',
              Stext5:'0'

          }
        }
      },
      activated(){
        /*初始化不显示*/
          this.messageShow = false;
          this.showInfor = false;
          this.custId = this.$route.query.custId
          this.getThisCunKuanMsg()
      },
      methods:{
          //获取客户存款情况信息
          getThisCunKuanMsg(){
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
                this.messageShow = true
                this.showInfor = false
                this.dataText = []
              }else{
                //有数据时，信封不显示
                this.messageShow = false
                //有数据时，显示列表
                this.showInfor = true
                this.dataText = res.body.ListData;
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
  margin-top: 1rem;
  background: #FFFFFF;

 }
}

</style>
