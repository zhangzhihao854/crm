<template>
   <div class="clientInformBox">
   <back-Header :title="title"></back-Header>
   <div class="containt">
       <client-Text :dataText='dataText'></client-Text>
   </div>

  </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import clientText from '@/components/common/clientComp/clientContact'


  export default {
    components:{
      BackHeader,
      clientText

    },
    data () {
      return {
          title:'联系信息',
          dataText:{
              unitAddr:'',
              unitZipcode:'',
              unitName:'',
              unitTel:'',
              unitFex:'',
              email:'',
              citizenship:'',
              homeAddr:'',
              homeZipcode:'',
              homeTel:'',
              mobilePhone:''
          }

        }
      },
      activated(){
          this.custId = this.$route.query.custId;
          this.getThisGuQuanMsg();
      },
      methods:{
          //获取客户股权信息
          getThisGuQuanMsg(){
              var url = `/CRMNewMobile/client/queryContactInfo`
              this.$http.post(url,
                {
                  "identity": this.cookies.get('identity'),
                  "custId": this.custId
                },
                {
                  emulateJSON:true
                }
              ).then(res => {
                  this.dataText = res.body.data;
              console.log(this.dataText)
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
