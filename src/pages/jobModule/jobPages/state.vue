<template>
  <div class="daikuan">
    <div v-if="this.listDateL!=null" class="state">
      <!--:flag="flag"-->
      <back-Header :title="title" ></back-Header>
      <steps-pages  v-show="aaa"  :listDateLast="listDateLast" :listDateL="listDateL" class="step" @click="showDate()" @gosteps="showDate"></steps-pages>
      <div class="state_content">
        <div class="state_container">
          <div class="content" style="padding-left: 10px">
            <span class="name">客户名称</span>
            <span>{{this.custName}}</span>
          </div>
          <div class="content" style="padding-left: 10px">
            <span class="name">客户编号</span>
            <span>{{this.custId}}</span>
          </div>
          <div class="schedule mag"  v-if="showhide" style="padding-left: 10px" @click="showDate()"   >
            <div class="state_c" v-if="this.listDateLast!==undefined" >
              <p class="data_t" >{{listDateLast.DATEADD}}</p>
              <p class="data_p">{{listDateLast.DESCRIPTION}}</p>
            </div>
            <div class="state_w"></div>
            <div class="state_s"  v-if="this.listDateLast!=undefined">
              <span v-if="this.listDateLast.LOANTEXT!=undefined">{{this.listDateLast.LOANTEXT}}</span>
            </div>
          </div>
        </div>

        <div class="content mag" style="padding-left: 10px">
          <span class="name">贷款状态</span>
          <span>
        <el-select v-model="ids" placeholder="请选择" @change="">
          <el-option v-for="item in listData" :key="item.id" :label="item.description"  :disabled="item.disabled" :value="item.id" ></el-option>
        </el-select>
      </span>
        </div>

        <div class="content mag" style="padding-left: 10px" v-for="">
          <span class="name">贷款进度</span>
          <!--<span class="plhfr">
            <el-input type="textarea" placeholder='请输入' v-model="loantext" id="ceshi" @focus="focushidden" resize="none" :autosize="{ minRows: 1, maxRows: 1}"></el-input>

              &lt;!&ndash;<textarea rows="4"  placeholder='请输入' v-model="loantext" id="ceshi" @focus="focushidden"></textarea>&ndash;&gt;

          </span>-->
        </div>
        <textarea  class="text" rows="4"  placeholder="请输入" v-model="loantext"  id="ceshi" @focus="focushidden"  style="width: 100%; height: 100px; border-bottom: 1px solid #f6f8f8 !important;" ></textarea>
      </div>
      <div style="height: 6rem"></div>
    </div>

    <div class="other_footer1 clearfix">
      <div class="cancel" @click="gopages" ><span>取消</span></div>
      <div class="keep" @click="getNewsListData"><span>保存</span></div>
    </div>

  </div>
</template>

<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
  import stepsPages from '@/components/common/jobComponents/jobStepsPages'
  import  mui from '../../../style/js/mui.min.js'
  import {getTestData} from '../../../service/getData'
  import { MessageBox } from 'mint-ui';
  export default {
    components: {
      BackHeader,
      stepsPages
    },
    data(){
      return {
        title: '贷款进度',
        aaa: false,
        showhide: true,
        ids:'',
        custId: '',
        custName: '',
        identity: this.cookies.get('identity'),
        val: '',
        id: '',
        listData: this.listData,
        loantext: '',
        deptid: '',
        dictId: '',
        description: '',
        loantext1: '',
        showinput: false,
        listDateLast: {},
        listDateL: [],
        test:true,
        flag:'5',
        keys:'',
        selected:'',
        listArr: {}
      }
    },
    created(){
      mui.init({
        swipeBack: false //启用右滑关闭功能
      })
    },
    activated(){
        this.listArr = {},
      this.footershow=true
      this.showhide = true;
      this.test = true;
      this.id = '';
      this.loantext = '';
      this.listData=[];
      this.initData();
//      alert(this.val)
      if(this.val == 1){
        this.showhide = false;
        this.showinput = true;
        this.addLoan("申");
      }
      if(this.val == 2){
        this.popUpData();
      }


//      this.addLoan(this.keys)

    },
    methods: {
      focushidden(){
        let _this=this;
        setTimeout(function(){
          let pannel=document.getElementById("ceshi")
          pannel.scrollIntoView(true)
        },200)
      },
      focusshow(){
        this.footershow=true
      },

      focus(){
        document.getElementsByClassName("state_content").element.scrollIntoView()
      },
      initData(){
        this.custId = this.$route.query.custId;
        this.custName = this.$route.query.custName;
        this.val = this.$route.query.val;
        this.deptid = this.$route.query.id;
        this.dictId = this.$route.query.dictId;
        this.loantext1 = this.$route.query.loantext;
        this.debitNote = this.$route.query.debitNote;
//        alert("117==>"+this.$route.query.id)
//        this.deptid = ''
      },
      gopages(){
        this.$router.go(-1)
      },
      popUpData(){
        console.log(this.deptid);
//        alert("112==>"+this.$route.query.id)
        var url= "/CRMNewMobile/loan/selectLoanHistory"
       // this.currentDate = {"loanId":this.$route.query.id,"debitNote":this.debitNote}
//        console.log(this.currentDate)

        this.listArr = {
          "loanId":this.$route.query.id,
          "debitNote":this.debitNote
        }

        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
            "data": JSON.stringify(this.listArr)
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          console.log(res);
          this.listDateL = res.body.ListData
          var datalen =res.body.ListData.length
          this.listDateLast = res.body.ListData[datalen-1];
          console.log("listDateLast--"+JSON.stringify(this.listDateLast));
          this.keys = this.listDateLast.DESCRIPTION;
          console.log("keys===>"+this.keys)
//          this.id = this.listDateLast.DESCRIPTION;
          this.addLoan(this.keys);

        }).catch((error)=>{
          console.log(error);
        })
      },
      showDate(){
        this.aaa = !this.aaa
      },
      addLoan(key){
        console.log("jsjjfj"+key);
        var url= "/CRMNewMobile/dict/getDict";
//        this.currentDate =  {"code":"0001","description":this.listDateLast.DESCRIPTION}
//        console.log(this.currentDate)
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
              "description":key,
              "code":"0001"
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          console.log(res);
          this.listData = res.body.ListData;
          this.id = res.body.ListData[0].flag;
          this.ids = res.body.ListData[0].ids;
//        alert("1>>>>>"+this.ids)
        }).catch((error)=>{
            console.log(error);
          }
        )
      },

      getNewsListData(){
//        alert(this.ids);
        if(this.test == true){
          this.test = false
        }else{
          return false
        }
//        alert(this.ids)

        var url= "/CRMNewMobile/loan/addMobcrmLoanInfo"
        //this.currentDate =  {"loantext":this.loantext,"custId":this.custId,"dictId":this.ids,"id":this.deptid,"custName":this.custName}
        console.log(this.currentDate)
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
              "loantext":this.loantext,
              "custId":this.custId,
              "dictId":this.ids,
              "id":this.deptid,
              "custName":this.custName
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          console.log(res);
          if(res){
            /*点击保存，跳转至工作日报页面*/
            if(res.body.success == true ){
              //mui.alert('保存成功');
              if(this.$route.query.num == 2){
                mui.alert('保存成功');
                this.$router.push('/job?date=date&flag=111')
                //this.$router.push('job?data=data&num=3')
              }else if(this.$route.query.num == 3){
                mui.alert('保存成功');
                this.$router.push('/main')
              }

            }else{
              //mui.alert(res.body.msg);
              if(this.$route.query.num == 2){
                MessageBox('提示', res.body.msg);
                this.$router.push('search?num=2')

              }else if(this.$route.query.num == 3){
                MessageBox('提示', res.body.msg);
                this.$router.push('search?num=3')
              }

              /* if(this.$route.query.num == 2){
               this.$router.push('job?data=data&num=3')
               }else if(this.$route.query.num == 3){
               //this.$router.push('main')
               }*/
            }
          }
        }).catch((error)=>{console.log(error);})
      }
    }
  }
</script>

<style lang="stylus" scoped >
  .state{
    position: relative;
    height: 100%;
  }
  .step{
    z-index: 99988;
  }
  .state_content{
    /*position: absolute;*/
    top:3rem;
    left: 0;
    z-index: 100;
    width: 100%;
    /*height: 100%;*/
  }
  .content{
    display: flex;
    justify-content: space-between;
    height: 2.5rem;
    line-height: 2.5rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    font-size: 1rem;
    width: 100%;
    background: #fff;
    border-top: 1px solid #F6F8F8;
  }
  .name{
    color: #555555;
    width: 5rem;
  }
  .schedule{
    display: flex;
    /*justify-content: space-between;*/
    padding: 5px 0px !important;
    font-size: 14px;
    background: #fff;
    border-top: 1px solid #F6F8F8;
    height: 5em;
    /*line-height: 5em;*/
  }
  .mag{
    margin-top: .8em;
  }
  /*.el-select-dropdown{*/
  /*top:130px !important;*/
  /*}*/
  span input{
    border: none !important;
    text-align: right;
    color:#888 !important;
  }
  .state_c{
    width: 24%;
    height: 100%;
    padding-top: .5em;
    padding-bottom: .5em;
    padding-left:0.5rem;
    float: left;
  }
  .data_t{
    text-align: center;
    font-size: 0.5em !important;
    white-space: nowrap;
  }
  .data_p{
    font-size: 1em !important;
    white-space: nowrap;
    color:#555 !important;
    text-align: center;
  }
  .state_w{
    float: left;
    height: 100%;
    width: 11%;
    background-color: #559AEE;
    margin-right: .8em;
    background: url("../../../../static/images/dkjdtjt.png") no-repeat center ;

  }
  .state_s{
    position: relative;
    padding-top:0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.66rem;
    color:#888;
    padding-right: 0.8rem;
    line-height: 0.8rem;

  }
  .other_footer1{
    position: fixed;
    bottom:0rem;
    left: 0;
    width: 100%;
    height:  2.3rem;
    border-top: 1px solid #EB3723;
    line-height:  2.3rem;
    text-align: center;
    z-index: 88;
  }
  .clearfix:before{

    content: "";

    display: block;

    clear: both;

  }

  .clearfix {

    zoom: 1;

  }


  .other_footer1 .cancel,.other_footer1 .keep{
    float: left;
    width: 50%;
    height: 100%;
  }
  .other_footer1 .cancel{
    background-color: #fff;
  }
  .other_footer1 .cancel span{
    color: #EB3723;
  }
  .other_footer1 .keep{
    background-color: #EB3723;
  }
  .other_footer1 .keep span{
    color: #fff;
  }
  .plhfr{
    /*width: 4.35rem;*/
    /*display: inline-block;*/
    /*float:right;*/
    /*position:fixed;*/
    /*right:1rem*/
  }
  .el-icon-arrow-up:before{
    content: "" !important;
  }
  .el-select .el-input__inner{
    padding-right: 1rem !important;
    color:#888 !important;
  }
  .daikuan .el-textarea{
    font-size: 1rem !important;
  }

</style>
