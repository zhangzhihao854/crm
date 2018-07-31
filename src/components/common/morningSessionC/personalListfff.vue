<template>
    <div class="list_content">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-collapse">
          <a class="mui-navigate-right bac_boy">
            <span>{{title}}</span>
          </a>
          <div class="mui-collapse-content">
            <!--工作计划-->
            <work-plan :mobcrmDaily="listDataL.mobcrmDaily"></work-plan>
            <!--工作内容-->
            <!--<work-content  v-on:mobcrmDaily="listDataL.mobcrmDaily"></work-content>-->
            <!--潜客录入-->
            <sneak-entry @goCustomerInput="goCustomerInput" :eveWillLatentCustomer="listDataL.eveWillLatentCustomer"></sneak-entry>
            <!--贷款进度-->
            <loan @loanSchedule="goLoanSchedule" :eveWillLoan="listDataL.eveWillLoan"></loan>
            <!--其他查询-->
            <other-component @goOther="goOther" :mobcrmTextcontent="listDataL.mobcrmTextcontent"></other-component>
            <div style="height: 8rem"></div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  import WorkPlan from '@/components/common/morningSessionC/workPlan'
//  import WorkContent from '@/components/common/morningSessionC/workContent'
  import SneakEntry from '@/components/common/morningSessionC/sneakEntry'
  import Loan from '@/components/common/morningSessionC/loan'
  import OtherComponent from '@/components/common/morningSessionC/otherComponent'
  export default {
    components:{
      WorkPlan,
//      WorkContent,
      SneakEntry,
      Loan,
      OtherComponent
    },
    props:{
      listData:{
        type:Array,
        default:[]
      },
      listDataL:{
        type:Object,
        default:{}
      },
      title:"",
    },
    data(){
      return {
        //listData:[],
        //listDatL:{},
        mobcrmDaily:[],
        eveWillLatentCustomer:[],
        //eveWillLoan:[],
        mobcrmTextcontent:[]
      }
    },

   activated(){
//    this.listDataL=""
   },
    mounted(){
//      this.listDataL=""
      console.log(this.listDataL + '传给子组件的数据')
    },
    created(){
//      this.listDataL=""
      console.log("fdshiodrgas"+JSON.stringify(this.listData))
    },
    methods:{

      goCustomerInput(){
//        this.$router.push('/customerInput')
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
  .mui-table-view-cell.mui-active {
    background-color: rgb(248,249,251)!important;
  }
  .mui-table-view:after {
    height: 0 !important;
  }
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
  .mui-table-view-cell{
    padding: 10px 25px !important;
  }
  .mui-navigate-right span{
    margin-left: 0.5em;
    margin-right: 0.5em;
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
