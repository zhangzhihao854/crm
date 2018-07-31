<template>
  <div class="personal_container">
    <back-Header :title=this.custName></back-Header>
    <!--添加loading-->
    <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>

    <div class="massage" v-for="item in listDate">
        <div class="contract">
          <div class="barht"></div>
          <span class="bianhao font_color">合同编号：</span>
          <span class="bianhao1">{{item.contractNumber}}</span>
          <span class="bianhao font_color"></span>
        </div>
        <ul >
          <li v-if="item.mobcrmLoanDetailedList[0]!==null" v-for="key in item.mobcrmLoanDetailedList"
              :class="{on_choose:select}" @click="goCheck(item.id,key.dictId,key.loantext)" >
            <!--<div :class="{on_choose:select}" @click="goCheck(item.id,key.dictId,key.loantext)">-->
              <div class="pfl">
                <span class="bar"></span>
                <span class="font_color">借据编号：{{key.debitNote}}</span>
                <p class="font_color">余额：<span  class="font_color_money">{{key.amount}}</span>万</p>
              </div>
              <div class="pfr">
                <p class="font_color">{{key.matureDate2}}</p>
                <p class="font_color">{{key.description}}</p>
              </div>
            <!--</div>-->



          </li>
          <li v-if="item.mobcrmLoanDetailedList[0]==null" v-for="key in item.mobcrmLoanDetailedList"  :class="{on_choose:select}" @click="goCheck(item.id,key.dictId,key.loantext)" >
            <div class="pfl" >
              <span class="bar"></span>
              <span class="font_color">借据编号：</span>
              <p class="font_color">余额：<span class="font_color_money"></span>万</p>
            </div>
           <div class="pfr">
             <span class="font_color"></span>
             <span class="font_color"></span>
           </div>

          </li>
        </ul>
    </div>
    <div class="addPersonal" @click="goState(1)" v-show="showhide">
      <div class="bar1"></div>
      <span class="el-icon-plus">&nbsp;&nbsp;添加新的贷款进度</span>
    </div>
    <div class="personal_footer" @click="goState(2)" v-show="shows">
      <span>确定</span>
    </div>
  </div>
</template>

<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
  import {getTestData} from '../../../service/getData'
  import { MessageBox } from 'mint-ui'
  export default {
    data (){
      return {
        listDate:[],
        identity:this.cookies.get('identity'),
        custName:'',
        showhide:false,
        shows:true,
        select: false,
//        debitNote:'',
        id:'',
        dictId:'',
        loantext:'',
        custId:'',
        loading2:true
      }
    },
    components:{
      BackHeader
    },
    activated(){
      this.select = false
      this.shows=true
      this.showhide=false
      this.listDate = ''
      this.loading2=true
      this.initData()
      console.log(this.custName)
      this.obtain()

    },
    methods: {
      initData() {
        //从上一页URL获取数据
        this.custId = this.$route.query.custId;
        this.custName  = this.$route.query.custName;
        this.flag=this.$route.query.num

      },

      goState(val){
        console.log(val)
        console.log("Id==>"+this.id)
//        alert("102debitNote==>"+this.debitNote)
        if(val==2) {
          if (this.select == false) {
            //alert("请选择借据编号")
            MessageBox('提示', '请选择借据编号!');
          } else {
//            console.log(val)
            this.$router.push('/state?custId=' + this.custId + '&custName=' + this.custName +
              '&val=' + val + '&id=' + this.id + '&dictId=' + this.dictId +
              '&loantext=' + this.loantext + '&debitNote=' + this.debitNote+'&num='+this.flag)
          }
        }else{
          /*this.$router.push('/state?custId=' + this.custId + '&custName=' + this.custName +
            '&val=' + val + '&id=' + this.id + '&dictId=' + this.dictId +
            '&loantext=' + this.loantext + '&debitNote=' + this.debitNote+'&num='+this.flag)*/
          this.$router.push('/state?custId=' + this.custId + '&custName=' + this.custName +
                  '&val=' + val +'&num='+this.flag)
        }
      },




      obtain(){
//                this.currentDate = id;
        var url= `/CRMNewMobile/loan/selectloanInfoList`
       // this.currentDate = {"custId":this.custId}
        console.log(this.currentDate)
        this.$http.post(url,
                { "identity":this.cookies.get('identity'), "custId":this.custId},
          {
            emulateJSON:true
          }

        ).then(res => {
          console.log(res);
        this.loading2=false
        this.listDate = res.body.ListData
        console.log(this.debitNote)
        if(this.listDate.length == 0){
          this.showhide = true
          this.shows = false
        }
        this.debitNote = res.body.ListData[0].mobcrmLoanDetailedList[0].debitNote
      }).catch((error)=>{
          console.log(error);
      })
      },
      goCheck(id,dictId,loantext){
        this.select = !this.select
        console.log(this.select)
        this.id = id
        this.dictId = dictId
        this.loantext = loantext
        console.log(this.id,this.dictId)
      }
      }

  }
</script>
<style lang="stylus" scoped>
  .massage{
    /*background-color: #fff;*/
    margin-top: 1rem;
    font-size:1em;
  }
  .personal_container{
    /*padding-top:4em;*/
  }
  ul{
    list-style: none;
    padding-left: .2em;
  }
  li{
    /*border-bottom: 1px solid;*/
    height: 4rem;
    background-color: #fff;
    margin-top: 1px;
    line-height: 1.8rem;
    padding-right: 0.5rem;
  }
  .contract{
    height: 2.5rem;
    line-height:2.5rem;
    /*border-bottom: 1px solid;*/
    background-color: #fff;
  }
  .bianhao{
    display:inline-block ;
    /*height: 2.5rem;*/
  }
  .bar{
    display: inline-block;
    float: left;
    height: 4rem;
    width: .3em;
    background-color: #5BDAF7;
  }
  .barht{
    display: inline-block;
    float: left;
    height: 2.5rem;
    width: .3em;
    background-color: #5BDAF7;
  }
  .bar1{
    float: left;
    height: 2.4rem;
    width: .3em;
    background-color: #FBA453;
  }
  .pfl{
    float: left;
  }
  .pfr{
    float: right;
  }
  .addPersonal{
    margin-top: 0.8rem;
    width: 100%;
    height: 2.5rem;
    background-color: rgb(247,242,241);
    line-height: 2.5rem;
    border: 1px solid #e5e5e5;
  }
  .addPersonal span{
    font-size: .8em;
    margin-left: 1em;
    color: #888;
  }
  .personal_footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2.5em;
    color: #fff;
    background-color: #EB3723;
    text-align: center;
    line-height: 2.5em;
  }
  .personal_footer span{
    color: #fff;
  }
  .font_color{
    color: #B6B6B6;
    font-size: .8em;
  }
  .font_color_money{
    color:#FDA672 !important;
  }
  .on_choose{
    background-color: rgba(193, 204, 172, 0.41);
  }
</style>
