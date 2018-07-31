<template>
    <div class="temp">
      <!--<back-header :title="title"></back-header>-->
      <header class="mui-bar mui-bar-nav">
        <h3 id='titler' class="mui-title" ref="nav">{{title}}</h3>
        <span @click="goBack()" class=" mui-icon mui-pull-left"> <img src="../../../../static/images/back-arrow@2x.png" alt="">返回</span>
        <!--@click="tellclick"-->
        <span v-show="showtel">
          <span  @click="tellclick"  class="mui-icon  mui-pull-right" >
            <img  style="width: 1rem;margin-top: -0.2rem" src="../../../../static/images/tell.png" alt="">
          </span>
          <!--<a  @click="call" :href="'tel:'+tel"  class="mui-icon  mui-pull-right" >-->
            <!--<img  style="width: 1rem;margin-top: -0.2rem" src="../../../../static/images/tell.png" alt="">-->
          <!--</a>-->
        </span>
      </header>
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100% " ></el-table>
 <div v-show="showcontent">

      <percent-age-two
        :baifenbi1=this.baifenbi1
        :baifenbi2=this.baifenbi2
        :baifenbi1Big=this.baifenbi1Big
        :baifenbi2Big=this.baifenbi2Big
        :bfbtitle="bfbtitle">
      </percent-age-two>

      <div class="divsj" >
        <div class="info fl">
          <p>目标金额</p>
          <p class="mbje"><span style="color: #ff680e">{{target}}</span>万元</p>
        </div>
        <div class="info">
          <p>目标笔数</p>
          <p class="wcje">{{targeTaccomplishData}}</p>
        </div>

        <div class="info fl">
          <p>完成金额</p>
          <p class="mbje"><span style="color: #ff680e">{{amount}}</span>万元</p>
        </div>
        <div class="info">
          <p>完成笔数</p>
          <p class="wcje">{{targetData}}</p>
        </div>
      </div>
      <div class="page-title">&nbsp</div>
      <navbar :clientData="clientData" :redclientData="redclientData"></navbar>
      <div class="empty"></div>
 </div>
    </div>
</template>

<style scoped>

  /*表头*/
  .mui-bar-nav{
    height:2rem;
    box-shadow:none;
    background:rgba(255,255,255,1);
  }
  .mui-bar-nav .mui-title{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(17,17,17,1);
    line-height:2rem;
  }

  .mui-bar-nav img{
    width:0.62rem;
    /*height:1.17rem;*/
    /*font-family:PingFangSC-Regular;*/
    /*background:rgba(235,55,35,1);*/
    border-radius: 1px ;
    vertical-align: middle !important;
    line-height:1rem;
  }

  .temp .mui-pull-left{
    font-size:0.94rem !important;
    /*font-family:PingFangSC-Regular;*/
    color:rgba(235,55,35,1);
    line-height:1rem;
    z-index: 2000;
    position: relative;
  }
  .temp .mui-pull-right{
    font-size:0.94rem !important;
    font-family:PingFangSC-Regular;
    color:rgba(235,55,35,1);
    line-height:1rem;
  }

  .info p{
    margin-bottom: 3px !important;
  }
.temp{
  margin-top:2rem;
}
  .divsj{

  }
.info{
  padding: 0.3em;
  padding-left: 0.8rem;
  float: left;
  height:3.5em;
  border-bottom: 1px solid #E5E5E5;
  border-right: 1px solid #E5E5E5;
  width:50%;
  background-color: #fff;
  /*text-align: center;*/
}

  .empty{
    height:2rem;
  }
</style>

<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
  import PercentAgeTwo from '@/components/common/reachGoal/percentAgeTwo'
  import navbar from '@/components/common/reachGoal/navbar'
//  import CalendarInput from '@/components/tools/calendar-input'
  import  mui from '../../../style/js/mui.min.js'
    export default{
      data () {
        return {
          title: '王强',
          baifenbi1:0,
          baifenbi2:0,
          baifenbi1Big:0,
          baifenbi2Big:0,
          bfbtitle:"月目标达成",
          tel:"",
          listData:{},
          target:"",
          targetData:"",
          amount:"",
          targeTaccomplishData:'',
          clientData:[],
          redclientData:[],
          showbageicon:false,
          showtel:false,
          loading2: true,
          showcontent:false,
          //区分如果是分中心负责人登录查看客户经理时，弹窗的标识判断
          mark:'',
          coustId:'',
      }
      },
      components: {
        BackHeader,
        PercentAgeTwo,
        navbar,
//        CalendarInput
      },
      activated(){
        /*获取url中的coustId*/
        this.coustId = this.$route.query.coustId;
        this.mark = this.$route.query.mark;
        this.telnum="";
        this.telnum=this.$route.query.telnum;
        this.showcontent=false
        this.showtel=false;
//        this.loading2=true
        this.listData=""
        this.clientData=""
        this.redclientData=""
        this.flag=this.$route.query.flag;
        console.log("ffffffff-----"+this.flag);
        if(this.flag=="11"){
          this.showtel=true
          this.accountCode=this.$route.query.coustId;
          this.title=this.$route.query.COUSTNAME;
          this.getmanagerTargetData()
          this.getClientData()

        }else if(this.$route.query.date=="3"){
          this.showtel=true
          this.accountCode=this.$route.query.coustId;
          this.title=this.$route.query.COUSTNAME;
          this.getmanagerTargetData()
          this.getClientData()

        }
        else{
          this.getPermissinos()
        }
      },
      created(){

        mui.init({
          swipeBack: false //启用右滑关闭功能
        })
      },

      methods: {
        goBack(){
          if(this.flag==11){
            this.$router.go(-1)
          }else if(this.flag==213){
            this.$router.push("/myplugin")
          }
          else {
            /*2018/3/30号新增*/
            this.$router.go(-1)
            //this.$router.push("/reachMain")
          }
        },
       //权限提示框
        open2() {
          this.$confirm('抱歉，您当前没有查看权限', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            this.$router.go(-1)
          }).catch(() => {
            this.$router.go(-1)
          });
        },
//        电话号码外呼功能
        tellclick(){
          console.log(this.telnum)
          if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.telnum))) {
            mui.alert("不是完整的11位手机号或者正确的手机号",function() {});
            return false
          }else{
            window.location.href = "tel:"+this.telnum;
          }

        },

 //获取权限
    getPermissinos(){
         this.loading2=true
         this.showcontent=false
          var url= `/CRMNewMobile/target/managerTarget`
          this.$http.post(url,
            { "identity":this.cookies.get('identity'),
              "depaId":this.cookies.get('dep')
            },
            {
              emulateJSON:true
            }
          ).then(
            res => {
              if(res.body.success==false){
//                mui.alert(res.body.msg, function() {});
                this.loading2=false
                this.showcontent=false
//                让数据内容隐藏
               // this.open2()
              }else{
                this.loading2=false
//                this.showcontent=true
              }
              console.log(res);
              this.accountCode=res.body.data.accountCode
              this.title=res.body.data.accountName
              this.clientData=""
              this.listData=""
              this.getmanagerTargetData();
              this.getClientData()
            },
            res => {
              console.log(res)
            }
          )
        },

// 获取6个数 数据
    getmanagerTargetData(){
      this.loading2=true
      this.showcontent=false
      var url= '/CRMNewMobile/target/managerTargetData'
      this.$http.post(url,
        {
            "identity":this.cookies.get('identity'),
            "custId":this.coustId=="undefined"?"":this.coustId,
        },
        {
          emulateJSON:true
        }

      ).then(
        res => {
          if(res.body.data==null){
              /*2018/4/3无数据时不显示loading图*/
            this.loading2=false
            this.showcontent=true
            if(this.mark == 'fzx'){
              mui.alert('该客户经理的本月目标未设置，请联系管理员！')
            }else{
              mui.alert('您的本月目标未设置，请联系管理员！')
            }

            /*如果后台返回数据为null，重置数据*/
            this.baifenbi1 = 0;
            this.baifenbi2 = 0;
            this.baifenbi1Big = 0;
            this.baifenbi2Big = 0;
            this.target = 0;
            this.targeTaccomplishData = 0;
            this.amount = 0;
            this.targetData = 0;

          }else{
            this.loading2=false
            this.showcontent=true
            console.log(res);
            console.log("访问6个数接口成功了 ");
            this.listData=res.body.data;
            this.target=(this.listData.target/10000).toFixed(2)
            this.amount=(this.listData.amount/10000).toFixed(2)
            this.targetData=this.listData.targetData
            this.targeTaccomplishData=this.listData.targeTaccomplishData
            this.baifenbi1=((this.listData.percent*100)-0).toFixed(0)
            this.baifenbi1Big=((this.listData.percent*100)-0).toFixed(0)
            if(this.baifenbi1>=100){
              this.baifenbi1=100
            }
            this.baifenbi2=((this.listData.b*100)-0).toFixed(0)
            this.baifenbi2Big=((this.listData.b*100)-0).toFixed(0)
            if(this.baifenbi2>=100){
              this.baifenbi2=100
            }
            console.log(this.listData);

          }

        },
        res => {
          console.log(res)
        }
      )
    },
//获取贷款客户数据列表
    getClientData(){
      var url= '/CRMNewMobile/target/managerTargetClient'
      console.log(this.accountCode);
      this.$http.post(url,
        {
            "identity":this.cookies.get('identity'),
            "custId":this.coustId=="undefined"?"":this.coustId,
        },
        {
          emulateJSON:true
        }
      ).then(
            res => {
              console.log(res);
              console.log("访问贷款客户接口成功了 ");
             /* if(res.body.data.ListData[0] == null){
                mui.alert('亲，暂时还没有客户呦！')
              }*/
              this.redclientData=[]
              this.clientData=[]
              console.log(res.body.data.ListData.length);
              for(var i=0;i<res.body.data.ListData.length;i++){
                if(res.body.data.ListData[i].state==true){
                  console.log(i);
                  this.redclientData.push(res.body.data.ListData[i])
                }else{
                  this.clientData.push(res.body.data.ListData[i])
                }
              }
              console.log(this.clientData);
            },
            res => {
              console.log(res)
            }
          )
        }
      }
    }
</script>

