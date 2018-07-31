<template>
  <div class="personalist">
    <!--v-if="listData!=null && listData.length>0"-->
    <div  class="list_content"  v-for="item in listData">
      <ul class="mui-table-view" >
        <li class="mui-table-view-cell mui-collapse"  >
          <a class="mui-navigate-right bac_boy">
            <span>{{item.userName}}</span>
          </a>
          <div class="mui-collapse-content">
            <!--<work-plan :mobcrmDaily="item.mobcrmDaily!=null?item.mobcrmDaily:{}"></work-plan>
            <sneak-entry @goCustomerInput="goCustomerInput" :eveWillLatentCustomer="item.eveWillLatentCustomer!=null&&item.eveWillLatentCustomer.length!=0?[]:[]"></sneak-entry>
            <loan @loanSchedule="goLoanSchedule" :eveWillLoan="item.eveWillLoan!=null&&item.eveWillLoan.length!=0?item.eveWillLoan:[]"></loan>
            <other-component @goOther="goOther" :mobcrmTextcontent="item.mobcrmTextcontent!=null?item.mobcrmTextcontent:{}"></other-component>-->

            <work-plan :mobcrmDaily="item.mobcrmDaily!=null?item.mobcrmDaily:{}"></work-plan>
            <!--<sneak-entry @goCustomerInput="goCustomerInput" :eveWillLatentCustomer="item.eveWillLatentCustomer!=null&&item.eveWillLatentCustomer.length!=0?[]:[]"></sneak-entry>-->
            <sneak-entry @goCustomerInput="goCustomerInput" :eveWillLatentCustomer="item.eveWillLatentCustomer"></sneak-entry>
            <loan @loanSchedule="goLoanSchedule" :eveWillLoan="item.eveWillLoan!=null&&item.eveWillLoan.length!=0?item.eveWillLoan:[]"></loan>
            <other-component @goOther="goOther" :mobcrmTextcontent="item.mobcrmTextcontent!=null?item.mobcrmTextcontent:{}"></other-component>
          </div>
        </li>
      </ul>
    </div>
   <!-- <div v-if="listData==null" class="list_content">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-collapse">
          <a class="mui-navigate-right bac_boy">
            <span>{{listDataL.userName}}</span>
          </a>
          <div class="mui-collapse-content">
            &lt;!&ndash;工作计划&ndash;&gt;
            <work-plan :mobcrmDaily="listDataL.mobcrmDaily!=null?listDataL.mobcrmDaily:{}"></work-plan>
            &lt;!&ndash;工作内容&ndash;&gt;
            &lt;!&ndash;<work-content  v-on:mobcrmDaily="listDataL.mobcrmDaily"></work-content>&ndash;&gt;
            &lt;!&ndash;潜客录入&ndash;&gt;
            &lt;!&ndash;<sneak-entry @goCustomerInput="goCustomerInput" :eveWillLatentCustomer="listDataL.eveWillLatentCustomer!=null&&listDataL.eveWillLatentCustomer.length!=0 ? listDataL.eveWillLatentCustomer:[]"></sneak-entry>&ndash;&gt;
            <sneak-entry @goCustomerInput="goCustomerInput" :eveWillLatentCustomer="listDataL.eveWillLatentCustomer"></sneak-entry>

            <loan @loanSchedule="goLoanSchedule" :eveWillLoan="listDataL.eveWillLoan!=null ? listDataL.eveWillLoan:[]"></loan>
            &lt;!&ndash;其他查询&ndash;&gt;
            <other-component @goOther="goOther" :mobcrmTextcontent="listDataL.mobcrmTextcontent!='' ? listDataL.mobcrmTextcontent:{}"></other-component>
          </div>
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
  import WorkPlan from '@/components/common/morningSessionC/workPlan'
  import SneakEntry from '@/components/common/morningSessionC/sneakEntry'
  import Loan from '@/components/common/morningSessionC/loan'
  import OtherComponent from '@/components/common/morningSessionC/otherComponent'
  export default {
    components:{
      WorkPlan,
      SneakEntry,
      Loan,
      OtherComponent
    },
    data(){
      return {
        mobcrmDaily:[],
        eveWillLatentCustomer:[],
        eveWillLoan:[],
        mobcrmTextcontent:[]
      }
    },

    props:{
      listData:{
        type:Array,
        default:[]
      },
      listDataL:{
        type:Object,
        default:{}
      }
    },
    created(){
      console.log("eveWillLatentCustomer====>"+JSON.stringify(this.eveWillLatentCustomer))
    },
    activated(){
      console.log("listData==>"+JSON.stringify(this.listData))
    },
    methods:{
      goCustomerInput(){
        this.$router.push('/customerInput')
      },
      goLoanSchedule(){
        this.$router.push('/loan_schedule')
      },
      goOther(){
        this.$router.push('/seeOther')
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .personalist{
    position: relative;
  }
  .list_content{
    /*margin-top: 3em;*/
  }
  .bac_boy{
    background: url("../../../../static/images/boy.png") no-repeat left center;
    background-position-x: .5em;
  }
  .bac_girl{
    background: url("../../../../static/images/girl.png") no-repeat left center;
    background-position-x: .5em;
  }
  .mui-table-view-cell
  .mui-navigate-right span{
    margin-left: 1.5em;
  }
  .font_s{
    display: inline-block;
    width: .2em;
    height: 1em;
    background-color: #559AEE;
  }
  .font_g{
    margin-left: .3em;
  }
  /*.step{*/
    /*position: absolute !important;*/
    /*top:2.32rem;*/
    /*left: 0;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*background: rgba(0,0,0,.2) !important;*/
    /*z-index: 999;*/
  /*}*/
</style>
