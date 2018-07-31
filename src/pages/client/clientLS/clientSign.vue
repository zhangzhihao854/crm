<template>
   <div class="moreInformBox">
   <back-Header :title="title"></back-Header>
   <div class="containt">
       <clientSign :dataText='dataText'></clientSign>
   </div>

	</div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import clientSign from '@/components/common/clientComp/clientSign'


  export default {
    components:{
        BackHeader,
        clientSign
    },
    data () {
      return {
      title:'签约信息',
      dataText:[
      ]
        }
      },
      activated(){
          this.custId = this.$route.query.custId;
          this.getThisGuQuanMsg();
      },
      methods:{
          //获取客户股权信息
          getThisGuQuanMsg(){
              var url = `/CRMNewMobile/business/querySignedByCustId`
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
              console.log(this.dataText)
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
.containt{
  margin-top: 0.88rem;
  background: #FFFFFF;

 }
}

</style>
