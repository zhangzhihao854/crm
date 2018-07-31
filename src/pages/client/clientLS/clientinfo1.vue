<template>
   <div class="clientInformBox">
   <back-Header :title="title"></back-Header>
   <div class="containt">
       <client-text :dataText='dataText'></client-text>
   </div>

  </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import clientText from '@/components/common/clientComp/clientinfo'


  export default {
    components:{
      BackHeader,
      clientText

    },
    data () {
      return {
          title:'基础信息',
          dataText:{
          }
         }
      },
      activated(){
          this.custId = this.$route.query.custId
          this.getThisGuQuanMsg();
      },
      methods:{
          //获取客户股权信息
          getThisGuQuanMsg(){
              var url = `/CRMNewMobile/client/querybaseInfoByCastId`
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
              this.dataText = res.body.data;
              console.log(this.dataText)
              //              alert(res.body.msg)
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
    margin-top: 0.88rem;
    background: #f8f9fb;

 }
}

</style>
