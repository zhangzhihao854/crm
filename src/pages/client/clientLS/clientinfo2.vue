<template>
   <div class="clientInformBox">
   <back-Header :title="title"></back-Header>
   <div class="containt">
    <!-- <clientTextHead v-for='(item,index)in soli' :key='index' :item='item'></clientTextHead> -->

    <!--<clientText :dataText='info' v-for='(info,index) in choose' :soli="soli" :key='index'></clientText>-->
       <client-text :dataText="dataText"></client-text>
   </div>

  </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import clientText from '@/components/common/clientComp/clientText1'
import clientTextHead from '@/components/common/clientComp/clientTextHead'

  export default {
    components:{
      BackHeader,
      clientText,
      clientTextHead

    },
    data () {
      return {
      title:'家庭信息',
      dataText:{
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
              var url = `/CRMNewMobile/client/queryFamilyByCastId`
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
