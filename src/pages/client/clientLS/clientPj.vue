<template>
   <div class="moreInformBox">
   <back-Header :title="title"></back-Header>
   <div class="containt">
     <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
     </el-table>
       <client-text :dataText='dataText'></client-text>
   </div>

  </div>
</template>

<script type=text/ecmascript-6>
import BackHeader from '@/components/header/back-header'
import clientText from '@/components/common/clientComp/clientTextPj'


  export default {
    components:{
      BackHeader,
      clientText

    },
    data () {
      return {
      title:'本期评级',
      dataText:{
          text:'',
          text1:'',
          custId:''
      },
        loading2:true
        }
      },
    activated(){
        this.dataText = {
          text:'',
          text1:'',
          custId:''
        }
      this.loading2=true
      this.custId = this.$route.query.custId;
      this.getclientTextData()
    },
      methods:{
       getclientTextData(){
         var url = `/CRMNewMobile/pclient/queryGradeByCustId`;
         this.$http.post(url,
           {
             "identity": this.cookies.get('identity'),
             "custId": this.custId
           },
           {
             emulateJSON:true
           }
         ).then(res => {
           this.loading2=false
           console.log(res);
         this.dataText.text = res.body.ListData[0].custLevName;
         this.dataText.text1 = res.body.ListData[0].resultAum;
       }).catch((error) => {
           console.log(error);
       })
       },
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
  margin-top: 1rem;
  background: #FFFFFF;

 }
}

</style>
