<template>
   <div class="clientInformBox">
   <back-Header :title="title"></back-Header>
   <div class="containt">
       <!--<clientText :dataText='info' v-for='(info,index) in choose' :key='index'></clientText>-->
       <!--判断数据为空时，显示暂无数据-->
       <div v-show="eventShow" style="text-align: center; ">
         <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
           <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
         </div>
         <div style="margin-top: 20px;">暂时没有信息哦~</div>
       </div>
       <client-text :dataText="dataText" v-show="showLikes"></client-text>
   </div>


  </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import clientText from '@/components/common/clientComp/clientText2'


  export default {
    components:{
      BackHeader,
      clientText

    },
    data () {
      return {
      title:'客户偏好',
      custId: '',
      dataText:{},
      eventShow: false,
      showLikes: false

      }
      },
      activated(){
         this.custId = this.$route.query.custId;
  /*      this.custId = '0083377024'*/
        this.eventShow = false
        this.showLikes = false
        this.getLikes()
      },
      methods:{
        getLikes(){
          var url = `/CRMNewMobile/client/customerPreference`
          this.$http.post(url,
            {
              "identity": this.cookies.get('identity'),
              "custId": this.custId
            },
            {
              emulateJSON:true
            }
          ).then(res => {
            if(res.body.data == null){
              this.eventShow = true
              this.showLikes = false
              this.dataText = {}
            }else{
              this.dataText = res.body.data
              this.showLikes = true
              this.eventShow = false
            }

          })
           .catch(err => {

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
