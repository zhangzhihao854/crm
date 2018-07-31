<template>
   <div class="moreInformBox">
   <back-Header :title="title"></back-Header>
   <div class="containt">
       <clientText :dataText='dataText' :sex="sex"></clientText>
   </div>

	</div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import clientText from '@/components/common/clientComp/clientText'


  export default {
    components:{
      BackHeader,
      clientText

    },
    data () {
      return {
          title:'基本信息',
          dataText:{
          },
          sex:''
        }
      },
      activated(){
        this.custId = this.$route.query.custId
          this.getThisCustName()
      },
      methods:{
          //获取客户基本信息
          getThisCustName(){
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
              if(this.dataText.gender == 1){
                  this.sex = '男'
              }
              if(this.dataText.gender == 2){
                  this.sex = '女'
              }
              if(this.dataText.gender == 9){
                  this.sex = '未知'
              }
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
