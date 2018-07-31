<template>
   <div class="clientInformBox">
   <back-Header :title="title"></back-Header>
   <div class="containt">
    <!-- <clientTextHead v-for='(item,index)in soli' :key='index' :item='item'></clientTextHead> -->

    <!--<clientText :dataText='info' v-for='(info,index) in choose' :soli="soli" :key='index'></clientText>-->
     <!--添加loading图-->
     <el-table v-loading="loadingShow"  v-show="loadingShow" element-loading-text="拼命加载中" style="width: 100%">
     </el-table>
     <!--判断数据为空时，显示暂无数据-->
     <div v-show="eventShow" style="text-align: center; ">
       <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
         <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
       </div>
       <div style="margin-top: 20px;">暂时没有信息哦~</div>
     </div>

     <client-text :dataText="dataText"></client-text>

   </div>

  </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import clientText from '@/components/common/publicCom/publicText1'
//import clientTextHead from '@/components/common/publicCom/clientTextHead'

  export default {
    components:{
      BackHeader,
      clientText,
//      clientTextHead

    },
    data () {
      return {
          title:'证件信息',
          dataText:[],
          loadingShow: true,
          eventShow: false
        }
      },
      activated(){
          this.dataText = []
          this.eventShow = false
          this.custId = this.$route.query.custId;
          this.getThisGuQuanMsg();
          this.loadingShow = true;
      },
      methods:{
          //获取客户股权信息
          getThisGuQuanMsg(){
              var url = `/CRMNewMobile/pclient/queryCustIdentiByCustId`
              this.$http.post(url,
                {
                  "identity": this.cookies.get('identity'),
                  "custId": this.custId
                },
                {
                  emulateJSON:true
                }
              ).then(res => {
              //this.dataText = res.body.ListData;
              /*判断数据是否为空，为空则在页面显示暂无数据*/
              if(res.body.ListData.length == 0){
                this.loadingShow = false;
                this.eventShow = true;
              }else{
                this.loadingShow = false;
                this.dataText = res.body.ListData;
              }

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
