<template>
   <div class="morePurposeBox">
   <moreActivityHead ></moreActivityHead>
     <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
     </el-table>
     <moreWrite :morewrite='morewrite'></moreWrite>
   <moreCustomer v-show='isCustomer' @Alertshow='Alertshow' :purposeinputdata="purposeinputdata"></moreCustomer>

   <!--<moreAlert v-show='isShow' :purposeinputdata="purposeinputdata" ></moreAlert>-->
   <!--<moreBottomStep :updown="updownA" @goupPage='goupPage' @godownPage='godownPage'></moreBottomStep>-->
     <!--<moreBottom :mymessage='mymessage' @goNextPage='godownPage'></moreBottom>-->

   </div>
</template>

<script type=text/ecmascript-6>
import BackHeader from '@/components/header/back-header'
import moreActivityHead from '@/components/common/moreComponents/moreActivityHead'
import moreWrite from '@/components/common/moreComponents/moreWrite'
import moreBottomStep from '@/components/common/moreComponents/moreBottomStep'
import moreBottom from '@/components/common/moreComponents/moreBottom'

import moreCustomer from '@/components/common/moreComponents/moreCustomer'
import moreAlert from '@/components/common/moreComponents/moreAlert'
  export default {
    components:{
      BackHeader,
      moreActivityHead,
      moreWrite,
      moreBottomStep,
      moreCustomer,
      moreAlert,
      moreBottom,
    },
    data () {
      return {
         title:'活动效果追踪',
         updownA:["上一步","下一步"],
         morewrite:['客户意向录入','/morePurposePage'],
         isShow:false,
        mymessage:'提交',
         isCustomer:true,
        purposeinputdata:[],//传给子组件 回显的客户列表数据
        loading2: true,
        }
      },
    activated(){
      this.loading2=true
      this.isCustomer=true
      this.purposeinputdata=[]
      this.queryPurpose()
    },
      methods:{
          goupPage(){
              var actTypeDept =  this.$store.state.activityTypeDeposit;
            if(this.$store.state.activityTypeGuest == "1"){
//              如果有潜客跳转潜客
              this.$router.push('/moreActivity/moreQianKe')
//              if (this.$store.state.activityTypeTb == "1"||){
////              如果前面有存款，索引就应该是1，如果没有就是0
//                this.$store.state.activeName = "1"
//              }
              if( actTypeDept== "1"&&this.$store.state.activityTypeLoans == "1"){
//                既有存款，又有贷款，下一步就是 3
                this.$store.state.activeName = "2"
              }else if(actTypeDept == "1"||this.$store.state.activityTypeLoans == "1"){
//                有一个存款或有一个贷款
                this.$store.state.activeName = "1"
              }else{
                this.$store.state.activeName = "0"
              }
            }else
            if (this.$store.state.activityTypeLoans == "1") {
//            有贷款 跳 贷款
              this.$router.push('/moreActivity/moreLoans')
              if (actTypeDept == "1"){
//              如果前面有存款，索引就应该是1，如果没有就是0
                this.$store.state.activeName = "1"
              }else{
                this.$store.state.activeName = "0"
              }
            } else
            if (actTypeDept == "1") {
//                如果有存款 跳存款
              this.$router.push('/moreActivity/moreActivityCont')

              this.$store.state.activeName = "0"

            } else {
              this.$router.push('/moreMainPage')
            }
        },
        godownPage(){
          if(this.$store.state.activityTypeTb=="1"){
//                如果有团建 跳团建
            this.$router.push('/moreActivity/moreTeam')
            this.$store.state.activeName=this.$store.state.activeNamelength-1+""
          }else{
            this.$router.push('/moreMainPage')
          }
          this.isCustomer=true;
        },

        Alertshow(){
          this.isShow=true;
        },
        queryPurpose(){
          var url='/CRMNewMobile/marketing/queryPurpose'
          this.$http.post(url,
            {
                "identity":this.cookies.get('identity'),
                "marktingId":this.$store.state.marktingId,
            },
            {
              emulateJSON:true
            }
          ).then(
            res=>{
            console.log(res);
              this.purposeinputdata=res.body.ListData
              console.log(this.purposeinputdata)
              this.loading2=false
        },
          res=>{
            alert(res.body.msg)
          }
        )

        }

      }

  }
</script>

<style lang='scss'>
.morePurposeBox{
    text-align: center;

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
