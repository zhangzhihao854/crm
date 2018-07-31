<template>
   <div class="moreActivityBox1">
   <!-- <back-Header :title="title"></back-Header> -->
    <moreActivityHead></moreActivityHead>
     <chooseCk v-show="addck" :title="titlechoose" :choosepage="choosepage"></chooseCk>

     <ul style="background-color: #fff;">
       <moreHead :mymoney='mymoney' :date="date"></moreHead>
       <li v-for='(item,index) in custmerListdata' :key='index' style='border-bottom: 1px solid #e5e5e5;line-height: 40px'>
         <el-row >
           <el-col :span="6" class="divcol"><div class="grid-content ">{{item.depositReachNo}}</div></el-col>
           <el-col :span="6" class="divcol"><div class="grid-content1 " style="color: red">{{item.depositAmount}}</div></el-col>
           <el-col :span="6" class="divcol"><div class="grid-content2  custName">{{item.custName}}</div></el-col>
           <el-col :span="6" class="divcol"><div class="grid-content2 " style="font-size: 12px;">{{item.depositDateString}}</div></el-col>
         </el-row>
       </li>
     </ul>



   <!--<moreHead :mymoney='mymoney' v-show="cklist"></moreHead>-->

     <!--<ul class="Context1" v-show="cklist">-->
       <!--<li class="contextBox" v-for='(item,index) in choosemindata'>-->
         <!--<div><input type="number" placeholder="请输入" v-model="item.lsh"></div>-->
         <!--<div><input type="number" placeholder="请输入" v-model="item.id"></div>-->
         <!--<div v-model="item.custId">{{item.custName}}</div>-->
         <!--<div><input type="date" placeholder="请选择" v-model="item.index" class="date"> </div>-->
       <!--</li>-->
     <!--</ul>-->



   <!--<moreContent v-show="cklist" :choosemindata="choosemindata"></moreContent >-->
   <!--<moreBottom :mymessage='mymessage' @goNextPage='goNextPage'></moreBottom>-->
	</div>
</template>

<script type=text/ecmascript-6>
  import  mui from '../../style/js/mui.min.js'
import BackHeader from '@/components/header/back-header'
import moreActivityHead from '@/components/common/moreComponents/moreActivityHead'
import moreHead from '@/components/common/moreComponents/moreHead'
import chooseCk from '@/components/common/moreComponents/chooseCk'
import moreContent from '@/components/common/moreComponents/moreContent'
import moreBottom from '@/components/common/moreComponents/moreBottom'
  export default {
    components:{
      BackHeader,
      moreActivityHead,
      moreHead,
      moreContent,
      moreBottom,
      chooseCk
    },
    data () {
      return {
         title:'活动效果追踪',
         mymessage:'提交',
         mymoney:'存款达成',
        date:"业务发生日期",
         cklist:false,//选出来的客户列表
          addck:true,//添加点击选择客户
        choosemindata:[],//客户在存款选择页面，选来的客户
        inputvalue:[],//客户在主页输入的内容，点击下一步 传给后台
        custName:'',// 姓名
        titlechoose:"请先选择存款客户",
        choosepage:"ck",
        activeName:'0',
        custmerListdata:[
//          {custName:'张三',custType:'hfjds',followOpinion:'和妇姑荷箪食峰哥说都很富'},
        ]
      }
      },
    created () {
     //mui初始化
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });

    },
    activated(){
      this.cklist=false
      this.addck=true
      this.choosemindata=[]
      this.inputvalue=[]
      console.log(this.$store.state.markingckdata)
      if(this.$route.query.flag=="choose"){
        this.cklist=true
        this.addck=false
        this.choosemindata=this.$store.state.markingckdata
      }
      for(var i=0; i< this.choosemindata.length;i++){
        this.choosemindata[i].id=""
        this.choosemindata[i].index=""
        this.choosemindata[i].lsh=""

      }
      this.queryDepositGuest()
    },
      methods:{
//        获取存款达成里面的回显数据
        queryDepositGuest(){
          var url='/CRMNewMobile/marketing/queryDepositGuest'
          this.$http.post(url,
            {
              "identity":this.cookies.get('identity'),
              "marktingId":this.$store.state.marktingId
            },
            {
              emulateJSON:true
            }
          ).then(
            res=>{
              console.log(res);
              this.custmerListdata=res.body.ListData
            },
            res=>{
//             alert("请将以上信息输入完整")
              mui.alert("后台返回错误", function() {});

            }
          )
        }
      }
  }
</script>

<style lang='scss' scoped>
  input{
    border: none !important;
    font-size:12px !important;
  }
  .date{
    /*width:100px;*/
    font-size:10px;
    padding: 0;
  }
  .Context1{
    background: #ffffff;
    border-bottom: 1px solid #E2E2E2;
  }
  .contextBox{
    width: 100%;
    height: 40px;
    text-align: center;
  }
  .contextBox div{
    float: left;
    line-height: 40px;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

  }
  .contextBox div:nth-child(1){
    text-align: center;
    width: 22%;
  }

  .contextBox div:nth-child(2){
    color:#FB7420;
    width: 25%;
  }
  .contextBox div:nth-child(3){
    width: 25%;
    background-color: #fff;
  }
  .contextBox div:nth-child(4){
    width: 28%;
  }

  .moreActivityBox1{
  height: 90%;
  overflow: scroll;
  width: 100%;
  text-align: center;

.back_text span[data-v-a2006ea4] {
	width: 6em!important;
}
}
  .moreActivityBox1 .divcol{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .moreActivityBox1 .custName{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>
