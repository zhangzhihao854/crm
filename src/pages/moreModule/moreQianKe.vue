<template>
   <div class="morePurposeBox">
   <moreActivityHead></moreActivityHead>
     <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
     </el-table>
     <moreWrite :morewrite='morewrite' ></moreWrite>
   <moreQianKeCont :custmerListdata="custmerListdata"></moreQianKeCont>

   <!--<moreBottomStep :updown="updownA" @goupPage='goupPage' @godownPage='godownPage'></moreBottomStep>-->
     <!--<moreBottom :mymessage='mymessage' @goNextPage='godownPage'></moreBottom>-->

   </div>
</template>

<script type=text/ecmascript-6>
  import moreActivityHead from '@/components/common/moreComponents/moreActivityHead'
import moreWrite from '@/components/common/moreComponents/moreWrite'
import moreBottomStep from '@/components/common/moreComponents/moreBottomStep'
  import moreBottom from '@/components/common/moreComponents/moreBottom'

  import moreQianKeCont from '@/components/common/moreComponents/moreQianKeCont'
  export default {
    components:{
      moreActivityHead,
      moreWrite,
      moreBottomStep,
      moreBottom,
      moreQianKeCont
    },
    data () {
      return {
         title:'活动效果追踪',
         updownA:["上一步","下一步"],
         morewrite:['活动潜客录入','/customerInput?custmer=activity'],
         isShow:false,
        mymessage:'提交',
         custmerListdata:[],
        loading2:true
        }
      },
    activated(){
      this.loading2=true
      this.custmerListdata=[]
      this.queryGuest()
    },
      methods:{
        goupPage(){
//          this.$router.push('/moreActivity/moreLoans')
//          this.$store.state.activeName="1"
          if (this.$store.state.activityTypeLoans == "1") {
//            有贷款 跳 贷款
            this.$router.push('/moreActivity/moreLoans')
            if (this.$store.state.activityTypeDeposit == "1"){
//              如果前面有存款，索引就应该是1，如果没有就是0
              this.$store.state.activeName = "1"
            }else{
              this.$store.state.activeName = "0"
            }
          } else
          if (this.$store.state.activityTypeDeposit == "1") {
//                如果有存款 跳存款
            this.$router.push('/moreActivity/moreActivityCont')

            this.$store.state.activeName = "0"

          } else {
              this.$router.push('/moreMainPage')
            }
          },
          godownPage()
          {
            if (this.$store.state.activityTypeRests=="1") {
//                如果有意向录入 跳意向录入
              this.$router.push('/moreActivity/morePurpose')

              if(this.$store.state.activityTypeDeposit == "1"&&this.$store.state.activityTypeLoans == "1"){
//                既有存款，又有贷款，下一步就是 3
                this.$store.state.activeName = "3"
              }else if(this.$store.state.activityTypeDeposit == "1"||this.$store.state.activityTypeLoans == "1"){
//                有一个存款或有一个贷款
                this.$store.state.activeName = "2"
              }else{
                this.$store.state.activeName = "1"
              }

              }else
            if (this.$store.state.activityTypeTb == "1") {
//                如果有团建 跳团建
              this.$router.push('/moreActivity/moreTeam')
              if(this.$store.state.activityTypeDeposit == "1"&&this.$store.state.activityTypeLoans == "1"){
//                既有存款，又有贷款，下一步就是 3
                this.$store.state.activeName = "3"
              }else if(this.$store.state.activityTypeDeposit == "1"||this.$store.state.activityTypeLoans == "1"){
//                有一个存款或有一个贷款
                this.$store.state.activeName = "2"
              }else{
                this.$store.state.activeName = "1"
              }
            } else {
              this.$router.push('/moreMainPage')
            }
          },
        queryGuest(){
          var url='/CRMNewMobile/marketing/queryGuest'
          this.$http.post(url,
            {
              "identity":this.cookies.get('identity'),
              "marktingId":this.$store.state.marktingId
            },
            {
              emulateJSON:true
            }
          ).then(
            res=>{
            console.log(res);
              this.custmerListdata=res.body.ListData
              this.loading2=false
//          this.$router.push('/moreActivity/moreQianKe')
        },
          res=>{
//             alert("请将以上信息输入完整")
//            mui.alert("请将以上信息输入完整", function() {});

          }
        )
        },
      }
  }
</script>

<style lang='scss'>
.morePurposeBox{
  /*margin-top:44px;*/
  height:100%;
    width: 100%;
  overflow: scroll;
    text-align: center;


.back_text span[data-v-a2006ea4] {
	width: 6em!important;
}
  .other_footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2.5em;
    border-top: 1px solid #EB3723;
  }
  .other_footer .cancel,.other_footer .keep{
    float: left;
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 2.5em;
  }
  .other_footer .cancel{
    color: #EB3723;
    background-color: #fff;
  }
  .other_footer .keep{

    color: #fff;
    background-color: #EB3723;
  }
  span input::-webkit-input-placeholder{
    text-align:right;
  }
  span input{
    width: 4em;
    border: none;
    outline: none;
  }
}
</style>
