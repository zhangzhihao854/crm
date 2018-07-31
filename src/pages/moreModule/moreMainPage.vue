<template>
   <div class="moreMainBox">
	<back-Header :title="title" :flag="flag"></back-Header>
	<div class="mainBigBox">
<!-- 	<jinDuTiao></jinDuTiao> -->
	<more-Main :acturl="acturl"></more-Main>
	</div>

   </div>
</template>

<script type=text/ecmascript-6>
import BackHeader from '@/components/header/back-header'
import moreMain from '@/components/common/moreComponents/moreMain'
  export default {
  	 components:{
      BackHeader,
      moreMain
    },
    data () {
      return {
         title:'营销活动',
         flag:"activitygo",
         acturl:'',
//        id:'',
      }
      },
    activated(){
      this.acturl=""
      this.$store.state.activeName="0"
      this.showlist()
    },
    methods:{
      showlist(){
        var url = `/CRMNewMobile/marketing/queryActivityBase`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
              "id":this.$store.state.marktingId
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {

              /*营销附件html集合*/
              this.$store.state.htmlWrap = res.body.data.attachment;

             this.showlistdata=res.body.data
//            活动类型的判断，如果是1 对应其汉字，最少一种情况，最多五种
            this.$store.state.activityTypeDeposit=this.showlistdata.activityTypeDeposit
            this.$store.state.activityTypeLoans=this.showlistdata.activityTypeLoans
            this.$store.state.activityTypeGuest=this.showlistdata.activityTypeGuest
            this.$store.state.activityTypeTb=this.showlistdata.activityTypeTb
            this.$store.state.activityTypeRests=this.showlistdata.activityTypeRests
            this.$store.state.activeNamelength=
              (this.showlistdata.activityTypeDeposit-0)+
              (this.showlistdata.activityTypeLoans-0)+
              (this.showlistdata.activityTypeGuest-0)+
              (this.showlistdata.activityTypeTb-0)+
              (this.showlistdata.activityTypeRests-0)


            console.log("我是长度"+this.$store.state.activeNamelength);


            if(this.$store.state.activityTypeDeposit=="1"){
//                如果有存款 跳存款
              this.acturl='/moreActivity/moreActivityCont'
              this.$store.state.activeName="0"

            }else

            if(this.$store.state.activityTypeLoans=="1"){
//                如果有贷款 跳贷款

              this.acturl='/moreActivity/moreLoans'
              this.$store.state.activeName="0"

            }else

            if(this.$store.state.activityTypeGuest=="1"){
//                如果有潜客 跳潜客

              this.acturl='/moreActivity/moreQianKe'
              this.$store.state.activeName="0"

            }else
            if(this.$store.state.activityTypeRests=="1"){
//                如果有意向录入 跳意向录入

              this.acturl='/moreActivity/morePurpose'
              this.$store.state.activeName="0"
            }else
            if(this.$store.state.activityTypeTb=="1"){
//                如果有团建 跳团建

              this.acturl='/moreActivity/moreTeam'
              this.$store.state.activeName="0"
            }else{
              this.acturl='/moreMainPage'
            }



          },
        res => {
          console.log(res)
        }
      )
      },

    }
  }
</script>

<style scoped>
.mainBigBox{
	width:100%;
	height:100%;
}

</style>
