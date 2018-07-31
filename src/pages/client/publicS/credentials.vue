<template>
   <div class="moreInformBox">
   <back-Header :title="title"></back-Header>
   <div class="containt">
       <credentials :dataText='dataText'></credentials>
   </div>
   
	</div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import credentials from '@/components/common/publicCom/credentials'


  export default {
    components:{
      BackHeader,
        credentials
     
    },
    data () {
      return {
          title:'证件信息',
          dataText:{
          },
        }  
      },
      activated(){
        this.custId = this.$route.query.custId
//          this.getThisCustName()
      },
      methods:{
          //获取客户基本信息
          getThisCustName(){
              var url = `/CRMNewMobile/`
              this.$http.post(url,
                      {"identity": this.cookies.get('identity'),data:{"custId": this.custId}}
              ).then(res => {
                  console.log(res);
              this.dataText = res.body.data;

              console.log(res.body.data)
    //              alert(res.body.msg)
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