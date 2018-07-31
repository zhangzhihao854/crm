<template>
  <div >
    <!--<div v-show="aaa" class='zhezhaoceng' style="position: fixed;top:0;left:0;bottom:0;right:0;background: rgba(0,0,0,0.4);z-index:999;display:none"></div>-->
    <div class="font_s"></div>
    <span>贷款进度</span>
    <ul>
      <li v-for="item in eveWillLoan">
        <div class="font_g">
          <p class="font_z" @click="showDate(item.loanId,item.debitNote)">
            <span>{{item.custName}}</span>
            <span class="place">{{item.description}}</span>
          </p>
        </div>
      </li>
    </ul>

    <el-dialog
     title="提示"
     :visible.sync="aaa"
     width="0"
     modal-append-to-body
     append-to-body
    center>
      <steps-pages  :listDateLast="listDateLast" :listDateL="listDateLT" class="step"   @gosteps="showd"></steps-pages></el-dialog>
  </div>
</template>

<script type=text/ecmascript-6>
  import stepsPages from '@/components/common/jobComponents/jobStepspagescxh'
  import {getTestData} from '../../../service/getData'
  export default {
    props:{
      eveWillLoan:{
        type: Array,
        default:[]
      }
    },
    components:{
      stepsPages
    },
    data(){
      return {
        //eveWillLoan:[],
        aaa:false,
        listDateLast:{},
        listDateLT:[],
        listArr: {}
       }
    },
    activated(){
      console.log(this.eveWillLoan);
      this.listArr = {}
    },
    created(){
      console.log("loan"+JSON.stringify(this.eveWillLoan))
    },
    methods:{
      goLoanSchedule (){
        this.$emit('loanSchedule')
      },
      showd(){
        this.aaa = !this.aaa
        if(this.aaa ==false)
        {
//          document.getElementById("app").style.overflow = "scroll";
        }
        else{
//          document.getElementById("app").style.overflow = "hidden";
        }
      },
      showDate(loanId,debitNote){
        this.showd();
        this.listArr = {
          "loanId":loanId,
          "debitNote":debitNote
        }
        var url= `/CRMNewMobile/loan/selectLoanHistory`
        //this.currentDate = {"loanId":loanId,"debitNote":debitNote}
        console.log(this.currentDate)
        this.$http.post(url,
                {
                    "identity":this.cookies.get('identity'),
                    "data": JSON.stringify(this.listArr)
                },
                {
                  emulateJSON:true
                }
        ).then(res => {
          console.log(this.eveWillLoan);
          var datalen =res.body.ListData.length;
          this.listDateLast = res.body.ListData[datalen-1];
          this.listDateLT = res.body.ListData;
          console.log("--"+JSON.stringify(this.listDateLast));
      }).catch((error)=>{
          console.log(error);
      })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .font_s{
    display: inline-block;
    width: .2em;
    height: 1em;
    background-color: #559AEE;
  }
  .font_g{
    margin-left: .3em;
  }
  .font_z{
    line-height: 1.5em;
    margin: .3em 0;
  }
  .place{
    margin-left: 7em;
    margin-right: 7em;
    padding: .1em .2em;
  }

</style>
