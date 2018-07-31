<template>
  <div class="updateNewsWrap">
    <div class="updateWrap">
      <back-Header :title="title" :flag="flag"></back-Header>
      <div class="jobModul_container">
        <p class="job_p">今日工作计划</p>
        <div class="job_plan" v-show="showdata">
          <p class="plan-ct">上午计划</p>
          <textarea type="text"   rows=5  v-model="morniplan" placeholder="请输入" maxlength="500" :disabled="disabled"></textarea>
          <p class="plan-ct">下午计划</p>
          <textarea type="text"   rows=5  v-model="afternoplan" placeholder="请输入" maxlength="500" :disabled="disabled"></textarea>
        </div>
        <div class="job_plan" v-show="hidedata">
          <p class="plan-ct">上午计划</p>
          <span>{{this.morniplan}}</span>
          <p class="plan-ct">下午计划</p>
          <span>{{this.afternoplan}}</span>
        </div>
      </div>
    </div>
    <div class="other_footer" v-show="showhide">
      <div class="cancel" @click="goJob()"><span>取消</span></div>
      <div class="keep" @click="getNewsListData()" ><span>提交</span></div>
    </div>
  </div>
</template>

<script>
    import BackHeader from '@/components/header/back-header'
    import {getTestData} from '../../../service/getData'
    import  mui from '../../../style/js/mui.min.js'
    export default {
        data(){
            return {
                title: '工作日报',
                showdate:'',
                afternoplan:"",
                morniplan:'',
                todaymarketing:'',
                todayexamine:'',
                identity:this.cookies.get('identity'),
                showdata:true,
                hidedata:false,
                flag:0,
                test:true,
                showhide:true,
                disabled:false,
                custId:'',
            }
        },
        components: {
            BackHeader
        },
      created(){
        mui.init({
          swipeBack: false //启用右滑关闭功能
        })
      },
        activated(){
        this.custId=''
        this.disabled=false
        this.showhide=true
          this.flag=this.$route.query.flag
          //如果这个falg是从 目标达成 页面传过来的，此时，只有查看功能 没有保存个取消按钮--陈

          console.log("jocmodel-flag-------------"+this.flag);
          if(this.$route.query.flag==10){
            this.showdata=false
            this.hidedata=true
            this.showhide=false
            this.disabled=true
          } else if(this.$route.query.flag==4){
            this.disabled=false
            this.showhide=true
          }else{

          }

        this.test = true
        this.afternoplan = ''
        this.morniplan = ''
        this.showdate=this.$route.query.currentDate
        this.getJobPlan()

      },
        methods: {
            getNewsListData(){
//                this.currentDate = id;
                if(this.test == true){
                    this.test = false
                }else{
                    return false
                }
                var url= `/CRMNewMobile/daily/addMobcrmDaily`
                /*this.currentDate = {
                    "afternoplan":this.afternoplan,
                    "morniplan":this.morniplan,
                    "showdate":this.showdate,
                    "state":"2"
                }*/
                console.log(this.currentDate)
                this.$http.post(url,
                        {
                            "identity":this.cookies.get('identity'),
                            "afternoplan":this.afternoplan,
                            "morniplan":this.morniplan,
                            "showdate":this.showdate,
                            "state":"2"
                        },
                        {
                          emulateJSON:true
                        }

                ).then(res => {
                    console.log(res);
                if (res) {
                  mui.alert(res.body.msg, function() {

                  })
                    this.afternoplan=''
                    this.morniplan=''
                    this.$router.push('/job?num=3')
                }

            }).catch((error)=>{
                    console.log(error);
            })
            },
            goJob(){
//                alert('11')
                this.$router.push('/job')
            },
            getJobPlan(){
              //      判断是否是分中心 下钻过来的 要切换客户的身份
              if(this.$route.query.flag=="10"){
                this.custId=this.$route.query.coustId;
              }else{

                this.custId=this.cookies.get('identity');
              }
                var url= '/CRMNewMobile/daily/selectMobcrmDailyById'
               /* this.currentDate = {"showdate":this.showdate}*/
                console.log(this.currentDate)
                this.$http.post( url,
                        {
                            "identity":this.cookies.get('identity'),
                          "custId":this.custId == "undefined"? this.cookies.get('identity'):this.custId,
                            "showdate":this.showdate
                        },
                        {
                          emulateJSON:true
                        }

                ).then(res => {console.log(res);
                if (res) {
                    this.afternoplan= res.body.data.afternoplan
                    this.morniplan = res.body.data.morniplan
                    if(res.body.state== 1){
                        this.showdata = false
                        this.hidedata =truepublicInform
                    }
                    else {
                        this.showdata = true
                        this.hidedata =false
                    }
                  if(this.$route.query.flag==10) {
                    this.showdata = false
                    this.hidedata = true
                    this.showhide = false
                    this.disabled = true
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
    .jobModul_container{
        /*margin-top: 0.8rem;*/
    }
    .job_plan{
        background-color: #fff;
    }
    .job_plan span{
        margin-left: 1em;
        line-height: 1.5em;
        display: inline-block;
        margin-bottom: 15px;

    }
    .plan-ct{
      font-size:16px;
      padding-bottom: 10px;
    }
    .job_p{
        height:2em;
        line-height:2em;
        margin-left: 1em;
        font-size: 1rem;
    }
    .job_s{
        padding-left: 1em;
        color:#878888 ;
    }
    .job_s p{
        line-height: 1em;
    }
    .job_s input{

    }
    /*.updateNewsWrap{
      position:relative;
      width:100%;
      height:100%;
    }*/
    .updateWrap{
      position:relative;
      width: 100%;
      /*height:100%;*/ //新增
    }
    .updateWrap .other_footer{
        /*position: fixed;
        bottom: 0;
        left: 0;*/
        width: 100%;
        height: 2.5rem;
        border-top: 1px solid #EB3723;
        line-height: 2.5rem;
        text-align: center;
        margin-top: 213px !important;
    }
    .other_footer .cancel,.other_footer .keep{
        float: left;
        width: 50%;
        height: 2.5rem;
        text-align: center;
        line-height: 2.5rem;
        border-top:1px solid #EB3723;
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
 /* 解决软件盘弹出底部按钮置顶键盘*/
    .updateNewsWrap{
      min-height: 100%;
      display: flex;
      display:-ms-flex;
      display:-webkit-flex;
      flex-direction: column;
    }
   .updateNewsWrap .updateWrap{
     flex:1;
     -ms-flex:1;
     -webkit-flex:1
   }
    .updateNewsWrap .other_footer{
      position:relative;
    }

</style>
