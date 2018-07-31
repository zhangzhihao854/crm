<template>
    <div class="temp">
      <back-header :title="title"></back-header>
      <el-table v-loading="loading2"  v-show="loading" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
    <div v-show="contentshow">
      <percent-age  :baifenbi=homeData1 :baifenbiBig=homeDataB :bfbTitle="bfbTitle1" class="leftpage"></percent-age>
      <percent-agered :baifenbi=homeData2 :baifenbiBig=homeDataB2 :bfbTitle="bfbTitle2" class="rightpage" ></percent-agered>
      <!--<el-progress type="circle" :stroke-width="3" :percentage=homeData2 class="progess" ></el-progress>-->
      <money :biaoti1="biaoti1"  :biaoti2="biaoti2" :numb1="numb1" :numb2="numb2" :wanyuan1="wanyuan1" :wanyuan2="wanyuan2"></money>
      <money  :biaoti1="biaoti21"  :biaoti2="biaoti22" :numb1="numb21" :numb2="numb22":wanyuan1="wanyuan21" :wanyuan2="wanyuan22" ></money>
      <div id="smallcir">
        <div class="cir cir1">

          <el-progress type="circle" :width="63" :stroke-width="3" :percentage=cir1 class="progess"  :show-text="false" >

          </el-progress>
          <p   id="Cone">{{cir1Info}}%</p>
          <p style="color:#088CFF;" class="pflag">500-2000万</p>
          <p>{{v1}}万元</p>
          <p>{{monthTarget1}} 万元</p>

        </div>
        <div class="cir cir2">

          <el-progress type="circle" :width="63"  :stroke-width="3"  :percentage=cir2 class="progess" :show-text="false" ></el-progress>
          <p id="Ctwo">{{cir2Info}}%</p>
          <p style="color:#088CFF;" class="pflag">500万以下</p>

          <p>{{v0}}万元</p>
          <p>{{monthTarget}} 万元</p>

        </div>
        <div class="cir cir3">
          <el-progress type="circle"  :width="63" :stroke-width="3" :percentage=cir3 class="progess" status='pagecolor' :show-text="false" ></el-progress>
          <p id="Cthree">{{cir3Info}}%</p>
          <p style="color:#FF680E;" class="pflag">500-2000万</p>
          <p>{{v3}}万元</p>
          <p>{{target1}} 万元</p>
        </div>
        <div class="cir cir4">
          <el-progress type="circle" :width="63" :stroke-width="3" :percentage=cir4 class="progess"  status='pagecolor' :show-text="false"></el-progress>
          <p id="Cfour">{{cir4Info}}%</p>
          <p style="color:#FF680E;" class="pflag">500万以下</p>
          <p>{{v2}}万元</p>
          <p>{{target}} 万元</p>
        </div>
      </div>
      <div >
        <div class="khjl leftpage " >
          <span class="tit3">客户经理：</span>
          <span>{{size}}人</span>
        </div>
        <div class="khs leftpage ">
          <span class="tit3">客户数：</span>
          <span>{{khnum}}人</span>
        </div>
      </div>
      <ul class="ulcontent">
        <li class="licontent" v-for="item in clientData">
          <router-link :to="{path:'/Manager',query:{telnum:item.MOBILEPHONE,flag:11,coustId:item.coustId,COUSTNAME:item.COUSTNAME,mark:'fzx'}}">
            <!--<router-link v-bind='{to:"/Manager?telnum="+item.item.MOBILEPHONE+"&flag=2}'>-->
            <div class="pl">
              <p style="color:#000" class="name1">{{item.COUSTNAME}}</p>
              <p style="color:#666">客户数: {{item.people}}人</p>
            </div>
            <div class="pm">
              <p>户数完成</p>
              <p style="color:#666">{{(item.count*100-0).toFixed(2)}}%</p>
            </div>
            <div class="pr" v-if="(item.money*100-0)>homeData1">
              <p>金额完成</p>
              <p style="color:#36DC7E">{{(item.money*100-0).toFixed(2)}}%</p>
            </div>
            <div class="pr" v-else="(item.money*100-0)<homeData1">
              <p>金额完成</p>
              <p style="color:red">{{(item.money*100-0).toFixed(2)}}%</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    </div>
</template>
<style scoped >
  .pflag{
    padding-bottom: 10px;
    padding-top: 5px;
  }
 .cir{
  float: left;
  width: 25%;
  text-align: center;
  background-color: #fff;
   padding-top: 0.3rem;
   padding-bottom: 0.3rem;
   position:relative;
  /*line-height:3rem;*/
}
 .cir .progess{
   position: relative;
 }
 .cir #Cone,#Ctwo,#Cthree,#Cfour{
     position: absolute;
     top:22%;
     color:#088CFF;
     width: 100%;
     text-align: center;
     font-size:16px;
   }
 .cir #Cthree,#Cfour{
   color:#FF7040;
 }
 .cir p{
   font-size:0.72rem;
   font-family:PingFangSC-Regular;
   color:rgba(34,34,34,1);
   line-height:0.5rem;
 }
  #smallcir .cir2{
  border-right: 1px solid #E5E5E5;
  color:red;
  }
  .leftpage{
    float: left;
    width:50%;
    text-align: center;
  }
  .rightpage{
    float: right;
    width:50%;
    text-align: center;
    color: red !important;
  }
  .khjl,.khs{
    border-bottom: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    height: 3em;
    line-height:3;
    margin-top:0.7em;
    margin-bottom:0.7em;
    background-color: #fff;
  }
  .ulcontent{
    border-bottom: 1px solid #e5e5e5 !important;
  }
  .licontent div{
    height: 4em;
    line-height:1.5em;
    width: 33%;
    float: left;
    padding-top:0.2rem;
    text-align: center;
    background-color: #fff;
    border-top: 1px solid #e5e5e5 !important;
  }
  /*客户经理字体色值*/
.temp .leftpage .tit3{
  color: #888;
}

</style>

<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
  import PercentAge from '@/components/common/reachGoal/percentAge'
  import PercentAgered from '@/components/common/reachGoal/percentAgered'
  import money from '@/components/common/reachGoal/money1'
  import  mui from '../../../style/js/mui.min.js'
  import { MessageBox } from 'mint-ui'
  export default{
    data(){
        return{
          falg:"01",
         homeData1:0,
         homeDataB:0,
         homeData2:0,
          homeDataB2:0,
         bfbTitle1:"月目标",
         bfbTitle2:"年目标",
         title: '第一分中心',

          biaoti1:"实际金额",
          numb1:"",
          biaoti21:"目标金额",
          numb21:"",
          wanyuan1:"万元",
          wanyuan2:"万元",

          biaoti2:"实际金额",
          numb2:"",
          biaoti22:"目标金额",
          numb22:"",
          wanyuan21:"万元",
          wanyuan22:"万元",

       fzxlistData:[],
       target:"",
       target1:"",
       monthTarget:"",
       monthTarget1:"",
        v0:"",
        v1:"",
        v2:"",
        v3:"",
        size:"",
        khnum:"",
          cir1:0,
          cir2:0,
          cir3:0,
          cir4:0,

          cir1Info:0,
          cir2Info:0,
          cir3Info:0,
          cir4Info:0,

          loading2: true,
          loading: true,
          clientData:[],
          contentshow:false

        }
      },
    components: {
        BackHeader,
        PercentAge,
        money,
      PercentAgered
      },
    activated(){
      this.contentshow=false
       this.loading2= true,
       this.loading = true,
       this.fzxlistData=""
       this.clientData=[]
       this.getPermissinos()
     },
    created(){
      mui.init({
        swipeBack: false //启用右滑关闭功能
      })
    },
    methods:{

     // 如果没有访问权限弹出的提示框
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

      //获取权限
      getPermissinos(){
        var url= `/CRMNewMobile/target/branchTarget`
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
            "DEPAID":this.cookies.get('dep'),
          },
          {
            emulateJSON:true
          },
          {_timeout: 30000}
        ).then(
          res => {
            if(res.body.success==false){
//              mui.alert(res.body.msg, function() {});
              this.loading2=false
              this.loading = false
              /*2018/3/31号新增*/
              //this.open2()
            }
            console.log(res);
            this.accountCode=res.body.data.accountCode
            this.title=res.body.data.depaName
            this.depaid=res.body.data.depaId
            this.fzxlistData=[]
            this.getmanagerTargetData()
          },
          res=>{
            MessageBox('提示', '亲，当前服务器网络不佳，请您稍后再试~');
          }
          )
      },

      // 获取20个数 数据
      getmanagerTargetData(){
        var url= '/CRMNewMobile/target/branchTargetData'
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
            "DEPAID":this.depaid,
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
            //console.log(res.body.data);
            if(res.body.data==null){
              //mui.alert(res.body.msg,function(){})
              mui.alert("您"+res.body.msg+',请联系管理员！')
              this.loading2 = false;
              this.loading = false;
              this.contentshow = true
              /*如果后台返回数据为空，重新赋值*/
              this.cir1Info = 0;
              this.cir2Info = 0;
              this.cir3Info = 0;
              this.cir4Info = 0;
              this.homeDataB = 0;
              this.homeDataB2 = 0;
              this.homeData1 = 0;
              this.homeData2 = 0;
              this.v1 = 0;
              this.monthTarget1 = 0;
              this.v0 = 0;
              this.monthTarget = 0;
              this.v3 = 0;
              this.target1 = 0;
              this.v2 = 0;
              this.target = 0;
              this.size = 0;
              this.khnum = 0;
              this.numb1 = 0;
              this.numb2 = 0;
              this.numb21 = 0;
              this.numb22 = 0;

              this.getclientData()

            }else{
              this.contentshow = true;
              this.loading2 = false;
              this.loading = false;

              this.fzxlistData=res.body.data;
              this.target=(this.fzxlistData.target/10000).toFixed(0)-0
              this.target1=(this.fzxlistData.target1/10000).toFixed(0)-0
              this.monthTarget=(this.fzxlistData.monthTarget/10000).toFixed(0)-0
              this.monthTarget1=((this.fzxlistData.monthTarget1)/10000).toFixed(0)-0

              this.v0=(this.fzxlistData.v0/10000).toFixed(0)-0
              this.v1=(this.fzxlistData.v1/10000).toFixed(0)-0
              this.v2=(this.fzxlistData.v2/10000).toFixed(0)-0
              this.v3=(this.fzxlistData.v3/10000).toFixed(0)-0
              this.size=this.fzxlistData.size

              //          四个小圈 百分比数据
              this.cir1=(((this.v1/this.monthTarget1)-0)*100).toFixed(0)-0
              this.cir2=(((this.v0/this.monthTarget)-0)*100).toFixed(0)-0
              this.cir3=(((this.v3/this.target1)-0)*100).toFixed(0)-0
              this.cir4=(((this.v2/this.target)-0)*100).toFixed(0)-0


//            四个小圈，真实text数据
              this.cir1Info=(((this.v1/this.monthTarget1)-0)*100).toFixed(0)
              this.cir2Info=(((this.v0/this.monthTarget)-0)*100).toFixed(0)
              this.cir3Info=(((this.v3/this.target1)-0)*100).toFixed(0)
              this.cir4Info=(((this.v2/this.target)-0)*100).toFixed(0)


              this.numb1=this.v0+this.v1
              this.numb21=this.monthTarget+this.monthTarget1
              this.homeData1=Number(((this.numb1/this.numb21).toFixed(2)-0)*100).toFixed(0)
              this.numb2=this.v2+this.v3
              this.numb22=this.target+this.target1
              this.homeData2=Number(((this.numb2/this.numb22).toFixed(2)-0)*100).toFixed(0)
              this.getclientData()
              if(this.homeData1>=100){

                this.homeDataB=this.homeData1;
                this.homeData1 = 100;
              }
              else{
                this.homeDataB=this.homeData1;
              }
              if(this.homeData2>=100){
                this.homeData2=100

                this.homeDataB2=this.homeData2;
                this.homeData2 = 100;
              }
              else{
                this.homeDataB2=this.homeData2;
              }
              if(this.cir1>=100){this.cir1=100}
              if(this.cir2>=100){this.cir2=100}
              if(this.cir3>=100){this.cir3=100}
              if(this.cir4>=100){this.cir4=100}
              console.log(this.cir4);
            }

          },
          res => {
            //MessageBox('提示', '亲，当前服务器网络不佳，请您稍后再试~');
          })
      },

      //获取客户经理 数据
      getclientData(){
       /* var url= `/CRMNewMobile/target/branchTargetClient`+"?ID="+this.fzxlistData.ID*/
        var url= `/CRMNewMobile/target/branchTargetClient`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
              "ID":this.fzxlistData.ID,
          },
          {
            emulateJSON:true
          }

        ).then(
          res => {
            console.log(res);
            this.clientData=res.body.ListData
            /*获取客户数字段内容*/
            this.khnum=res.body.data.count
            this.loading2= false
            this.loading = false
            this.contentshow=true
          },
          res => {

        })
      }
    }
  }
</script>

