<template>
  <div class="jobModule">
    <div class="containerWrap">
      <back-Header :title="title" :flag="flag"></back-Header>
      <div class="jobModul_container">
        <p class="job_p">今日工作计划</p>
        <div class="job_plan">
          <div class="p-top">
            <p class="afnplan">上午计划</p>
            <span class="plan-ct">{{morniplan}}</span>
          </div>
          <div class="p-btm">
            <p class="afnplan">下午计划</p>
            <span class="plan-ct">{{afternoplan}}</span>
          </div>

        </div>
        <p class="job_p"> 今日落实情况</p>
        <div class="job_plan" v-if="showh">
          <div class="job_s">
            <p class="afnplan">营销情况反馈:</p>
            <!--<input class="plan-ct" type="text" v-model="todaymarketing" placeholder="请输入" maxlength="200" :disabled=disabled>-->
            <!--<el-input type="textarea" :rows="1" placeholder="请输入" v-model="textarea"></el-input>-->
            <!--<el-input type="textarea" class="textInput"  :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入" v-model="todaymarketing" :disabled=disabled  resize="none" wrap="virtual"></el-input>-->
            <textarea type="text" class="textInput" rows=2  v-model="todaymarketing" placeholder="请输入" maxlength="400" resize="none"  :disabled="disabled" wrap="virtual"></textarea>

          </div>
          <div class="job_s">
            <p class="afnplan">调查进度反馈:</p>
            <!--<input class="plan-ct" type="text" v-model="todayexamine" placeholder="请输入" maxlength="200" :disabled=disabled>-->
            <!--<el-input type="textarea" class="textInput" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入" v-model="todayexamine" :disabled=disabled  resize="none" wrap="virtual"></el-input>-->
            <textarea type="text" class="textInput" rows=2  v-model="todayexamine" placeholder="请输入" maxlength="400" resize="none"  :disabled="disabled" wrap="virtual"></textarea>
          </div>
        </div>
        <div class="job_plan" v-if="showa">
          <div class="job_s">
            <p class="afnplan">营销情况反馈:</p>
            <span class="plan-ct">{{this.todaymarketing}}</span>
          </div>
          <div class="job_s">
            <p class="afnplan">调查进度反馈:</p>
            <span class="plan-ct">{{this.todayexamine}}</span>
          </div>
        </div>
        <div class="b"></div>

      </div>

    </div>

    <div class="other_footer" v-show="showhide">
      <div class="cancel"  @click="getNewsListData(0)" ><span>暂存</span></div>
      <div class="keep" @click="getNewsListData(1)" ><span>提交</span></div>
    </div>
  </div>
</template>

<script>
  import BackHeader from '@/components/header/back-header'
  import {getTestData} from '../../../service/getData'
  import  mui from '../../../style/js/mui.min.js'
  import { MessageBox } from 'mint-ui';
  export default {
      data(){
          return {
              title: '工作日报',
              showdate: '',
              afternoplan: "",
              morniplan: '',
              todaymarketing: '',
              todayexamine: '',
              identity: '',
              showhide: true,
              flag:'4',
              showa:false,
              showh:true,
              test:true,
              custId:'',
            disabled:false,
      }
      },
      components: {
          BackHeader
      },
      created(){
          //mui初始化
          mui.init({
              swipeBack: false //启用右滑关闭功能
          });
      },
      activated(){
        this.disabled=false
        this.custId=''
        this.flag=this.$route.query.flag
        console.log("jocmodel-flag-------------"+this.flag);
          this.todayexamine = ''
          this.todaymarketing = ''
          this.afternoplan = ''
          this.morniplan = ''
          this.showh = true
          this.showa = false
          this.showhide = true
          this.showdate = this.$route.query.currentDate
          this.getJobPlan(this.showdate)
          this.test = true
//如果这个falg是从 目标达成 页面传过来的，此时，只有查看功能 没有保存个取消按钮--陈
        this.flag=this.$route.query.flag
        console.log(typeof(this.flag));
        if(this.flag=="10"){
          console.log("我是分中心点击 点击客户经理 然后点击当天工作日报的flag"+this.flag)
          this.showhide=false
          this.disabled=true
          this.showa=true
          this.showh=false

        }
      },
      methods: {
//点击暂存或者是提交按钮
          getNewsListData(val){
//              alert(val)
              /*if(this.test == true){
                  this.test = false
              }else{
                  return false
              }*/
//              走的是暂存
              if(val == 0){
                /*  this.currentDate = {
                      "identity": this.identity,
                      "todaymarketing": this.todaymarketing,
                      "todayexamine": this.todayexamine,
                      "showdate": this.showdate,
                      "state": "0"
                  }*/
                /*设置点击暂存按钮的提示语*/
                this.$confirm('亲，暂存之后还能继续修改！', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$router.push('/job?num=3')

                  /*点击确定走接口*/
                  var url= '/CRMNewMobile/daily/addMobcrmDaily'
                  console.log(this.currentDate)
                  this.$http.post( url,
                    {
                        "identity":this.cookies.get('identity'),
                        "todaymarketing": this.todaymarketing,
                        "todayexamine": this.todayexamine,
                        "showdate": this.showdate,
                        "state": "0"
                    },
                    {
                      emulateJSON:true
                    }

                  ).then(res => {
                    // console.log(res);
                    this.afternoplan = ''
                  /*清空数据*/
                    this.todayexamine = ''
                    this.todaymarketing = ''
                  }).catch((error) => {
                    console.log(error);
                  })

                }).catch(() => {

                });

              }else if(val == 1) {
//                  走的是提交
             /*   this.currentDate = {
                    "identity": this.identity,
                    "todaymarketing": this.todaymarketing,
                    "todayexamine": this.todayexamine,
                    "showdate": this.showdate,
                    "state": "1"
                }
*/
                this.$confirm('确定提交吗?提交后您将不能更改！', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$router.push('/job?num=3')


                  /*点击确定走接口*/
                  var url= '/CRMNewMobile/daily/addMobcrmDaily'
                  this.$http.post( url,
                    {
                        "identity":this.cookies.get('identity'),
                        "todaymarketing": this.todaymarketing,
                        "todayexamine": this.todayexamine,
                        "showdate": this.showdate,
                        "state": "1"
                    },
                    {
                      emulateJSON:true
                    }

                  ).then(res => {

                    this.afternoplan = ''
                    /*清空数据*/
                    this.todayexamine = ''
                    this.todaymarketing = ''
                  }).catch((error) => {
                    console.log(error);
                  })

                }).catch(() => {

                });
              }

             /* var url= '/CRMNewMobile/daily/addMobcrmDaily'
              console.log(this.currentDate)
              this.$http.post( url,
                      { "identity":this.cookies.get('identity'), "data":this.currentDate}
              ).then(res => {
                 // console.log(res);
              this.afternoplan = ''
              if (res) {
                  //alert(res.body.msg)
                /!*设置点击暂存提交按钮的提示语*!/
                if(this.currentDate.state == '0'){
                  MessageBox.confirm('暂存成功！').then(action => {
                    this.$router.push('/job?num=3')
                    this.todayexamine = ''
                    this.todaymarketing = ''
                  });

                }else if(this.currentDate.state == '1'){
                  MessageBox.confirm('确定提交吗?提交后您将不能更改！').then(action => {
                    this.$router.push('/job?num=3')
                    this.todayexamine = ''
                    this.todaymarketing = ''
                  });
                }


                /!*MessageBox('提示', '亲，确定提交么？提交后将不能更改！');
                  this.$router.push('/job?num=3')
                  this.todayexamine = ''
                  this.todaymarketing = ''*!/

                  /!*if(res.body.state = 1){
                      this.showh = false
                      this.showa = true
                      this.todayexamine = res.body.data.todayexamine
                      this.todaymarketing = res.body.data.todaymarketing
                  }*!/
              }

          }).catch((error) => {
                  console.log(error);
          })*/
          },

        getJobPlan(showdate){
            //console.log(`今天是${showdate}`)

//      判断是否是分中心 下钻过来的 要切换客户的身份
          if(this.$route.query.flag=="10"){

            this.custId=this.$route.query.coustId;
          }else{

            this.custId=this.cookies.get('identity');
          }
            var url= '/CRMNewMobile/daily/selectMobcrmDailyById'
            /*this.currentDate = {"showdate":showdate}*/
            this.$http.post( url,
                    {
                        "identity":this.cookies.get('identity'),
                         "custId":this.custId == "undefined"? this.cookies.get('identity'):this.custId,
                        "showdate":showdate
                    },
                    {
                      emulateJSON:true
                    }
            ).then(res => {console.log(res);

            if(new Date(showdate).getDate() < new Date().getDate()){
                this.showhide = false;
                this.showh = false;
                this.showa = true;
            }
            if(new Date(showdate).getMonth() < new Date().getMonth()){
                this.showhide = false;
                this.showh = false;
                this.showa = true;
            }
            if(new Date(showdate).getFullYear() < new Date().getFullYear()){
                this.showhide = false;
                this.showh = false;
                this.showa = true;
            }

            if (res.body.data ==null ) {
                return false;
            }
            if(res.body.success == false){
                /*显示页面*/
                mui.alert(res.body.msg,function(){})
                this.showhide = false
                this.showh = false
                this.showa = true
                return false;
            }
            this.afternoplan = res.body.data.afternoplan
            this.morniplan = res.body.data.morniplan
            this.todayexamine = res.body.data.todayexamine
            this.todaymarketing = res.body.data.todaymarketing


            if(res.body.data.state == "1"){
                /*底部按钮隐藏，显示已输入内容的页面*/
                this.showhide = false;
                this.showh = false;
                this.showa = true
            }
            else if(res.body.data.state == "0") {
                /*显示底部按钮，输入页面*/
                this.showhide = true
                this.showh = true
                this.showa = false
            }

            if(this.todayexamine == '' || this.todaymarketing == ''){
                /*只显示输入之后的页面*/
                this.showhide = false;
                this.showh = false;
                this.showa = true;
//                alert(new Date(showdate).getDate());
                if(new Date(showdate).getDate() == new Date().getDate()){
                    /*日期等于当天的日期，显示的是输入页面*/
                  this.showhide = true;
                  this.showh = true;
                  this.showa = false;
                  if(this.flag=="10"){
                    console.log("我是分中心点击 点击客户经理 然后点击当天工作日报的flag"+this.flag)
                    this.showhide=false
                    this.disabled=true
                    this.showa=true
                    this.showh=false
                  }

                }
            }


        }).catch((error) => {
                console.log(error);
        })
    }

      }
  }
</script>
<style lang="stylus" scoped>
  .job_plan{
    background-color: #fff;
    padding-left: 1.5rem;
    padding-right: 1rem;
    /*height: 10rem;*/
    /*padding-top: 1rem;*/
    color:#555;
  }
  .job_plan .p-btm,.p-top{
    /*height: 5rem;*/
    padding-bottom:15px;
  }
  .plan-ct{
    color:#222 !important;
  }

  .job_plan span{
    margin-left: 1em;
    line-height: 1.5em;
  }
 .job_p{
    height:3rem;
    line-height:3rem;
    padding-left: 0.8rem;
    font-size: 0.89rem;
    color:#555;
    margin-bottom: 0 !important;
  }
 .job_s{
   /*height: 5rem;*/
   padding-bottom:15px;
 }
 .job_s p{
   line-height: 1em;
 }
  .job_s input{

  }
  /*.b{
    height: 12rem;
  }*/
  .afnplan{
    height:2rem;
    line-height:2rem;
    font-size:1rem;
    color:#555 !important;

  }
.other_footer{
  /*position: absolute;
  bottom: 0;
  left: 0;*/
  width: 100%;
  height: 2.5rem;
  border-top: 1px solid #EB3723;
  line-height: 2.5rem;
  text-align: center;
}
.other_footer .cancel,.other_footer .keep{
  float: left;
  width: 50%;
  height: 100%;
}
.other_footer .cancel{
  background-color: #fff;
}
.other_footer .cancel span{
  color: #EB3723;
}
.other_footer .keep{
  background-color: #EB3723;
}
.other_footer .keep span{
  color: #fff;
}
.jobModule .job_s input[type=text]{
  border: none;
  border-bottom: 1px solid #E2E2E2 !important;
}
.jobModule .job_plan .job_s .textInput{
  border-bottom: 1px solid #E2E2E2 !important;
  font-size:0.88rem;
  font-family:PingFangSC-Regular;
}
.jobModule .job_plan  .el-textarea__inner{
  color: #222 !important;
}
  /*解决软件盘弹出置顶键盘*/
.jobModule{
  min-height:100%;
  display: flex;
  display:-ms-flex;
  display:-webkit-flex;
  flex-direction: column;
}
.jobModule .containerWrap{
  flex:1;
  -ms-flex:1;
  -webkit-flex:1
}
.jobModule  .other_footer{
  position:relative;
}
</style>
