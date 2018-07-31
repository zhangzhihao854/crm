<template>
<div class="infomaBox">
   <div class="purpose">
   <div class="bianhao" v-model="purposecustId"> 客户编号<i>{{purposecustId}}</i></div>
	<div class="username">客户姓名<i>
    <div style='float: right' @click=goChoosepage>
      {{chooseyxlr}}
    </div>
	<!--<select  v-on:change="indexSelect" v-model="indexId" class="selsect">-->
    <!--<option value="" disabled selected class="optionselect">请选择</option>-->
  <!--<option v-for="item in purposeListdata" :value="item.custId">{{item.custName}}</option>-->
   <!--</select>-->
</i></div>
	<div class="bianhao">
    <span class="biaodan">意向金额</span>
    <span class="biaodan">
        <!--<input type="number" placeholder="请输入" v-model="moneynum">-->
        <el-input v-model="moneynum" placeholder="请输入"></el-input>
    </span>

  </div>
	<div class="bianhao">
    <span class="biaodan">详细信息</span>
    <span class="biaodan">
      <!--<input type="text" placeholder="请输入" v-model="detail">-->
      <el-input v-model="detail" placeholder="请输入"></el-input>
    </span>
    </div>
	<div class="jianyi"><div class="genjin">后续跟进建议</div>
    <!--<input class='conttt' type="text" placeholder="请输入" v-model="laterthink">-->
    <el-input v-model="laterthink" placeholder="请输入"></el-input>
  </div>
   </div>

  <div class="other_footer">
    <div class="cancel" ><span style="color: #EB3723;" @click='goUp'>{{updown[0]}}</span></div>
    <div class="keep" @click='goDown'>
      <span style="color: #fff;">{{updown[1]}}</span>
    </div>
  </div>


  </div>
</template>

<script type=text/ecmascript-6>
  import  mui from '../../../style/js/mui.min.js'

  export default {
    data () {
      return {
         slides:{context1:'100001',context2:'200000',value:'张三',
          context3:'内容',context4:'意向较高，条件不错，值得跟进值得跟进值得跟进值得跟进'},
         purposeListdata:[],
        purposecustId:"请先选择客户",//客户id
        indexId:'',//客户姓名
        moneynum:'',//意向金额
        detail:'',//详细信息
        laterthink:'',//后续追踪意见
        updown:['取消','保存'],
        chooseyxlr:'请选择',//客户姓名


      }
      },
    activated(){
      this.purposecustId="请先选择客户"
      this.purposeListdata=[]
      this.queryGuest()
      this.$store.state.purposeData={}
      console.log(this.$store.state.markingyxlrdata)

      /*清空意向录入内容*/
      this.indexId=""
      this.moneynum = ''
      this.detail = ''
      this.laterthink = ''
      this.chooseyxlr = '请选择'
      if(this.$route.query.flag=='yxlrback'){
          this.purposecustId=this.$store.state.markingyxlrdata[0].custId
          this.chooseyxlr=this.$store.state.markingyxlrdata[0].custName
      }
      },
    created () {
//mui初始化
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });
    },
    methods:{
//跳转选择页面
      goChoosepage(){
        this.$router.push("/chooseyxlrpage")

      },
//获取客户名字的接口
      queryGuest(){
        var url='/CRMNewMobile/marketing/queryBcustomer'
        this.$http.post(url,
          {
          "identity":this.cookies.get('identity'),
          "custName":"",
          },
          {
            emulateJSON:true
          }
        ).then(
          res=>{
            console.log(res);
            this.purposeListdata=res.body.ListData
          },
          res=>{
            console.log('messages出错')

          }
        )
      },
//获取id值
      indexSelect(){
        this.purposecustId=this.indexId
        console.log(this.indexId);//在这里可以正确输出每个下拉框对应的下标custId，当然输出值都是可以的
      },
//取消按钮
      goUp(){
       /* this.$emit('goupPage')*/
        this.$confirm('亲，确定取消录入吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*点击确定，返回上一个页面*/
          this.$router.go(-1)
        }).catch(() => {

        });
      },
//点击保存按钮发送信息
      goDown(){

        if(this.purposecustId=="请先选择客户"){
          mui.alert("亲，请先选择客户哦", function() {});
         return false
        }
        /*校验--意向金额*/
        var reg = /^[0-9]*$/;
        console.log(typeof(this.moneynum*1))
        if(!reg.test(this.moneynum*1) && this.moneynum != ''){
          mui.alert("亲，意向金额输入格式有误！")
          return false
        }

        var url='/CRMNewMobile/marketing/purposeReach'
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),//客户身份
            "marktingId":this.$store.state.marktingId,//活动id
            "intentionCustId":this.purposecustId,//客户id
            "intentionAmount":this.moneynum,//意向金额
            "intentionDetails":this.detail,// 详细信息
            "intentionSuggest":this.laterthink,// 后续建议
          },
          {
            emulateJSON:true
          }
        ).then(
          res=>{
            console.log(res);
//            this.$router.go(-1)
            this.$router.push('/moreActivity/morePurpose')
          },
          res=>{
//             alert("请将以上信息输入完整")

          }
        )

      },
     /* /!*监视意向金额的变化*!/
      watch:{
        moneynum: function (newVal,oldVal) {
            var reg = /^[0-9]*$ /;
            if(!reg.test(newVal)){
              alert('111')
              mui.alert("亲，意向金额输入格式有误！")
            }

        }
      }*/

    }
  }
</script>

<style scoped>
  .purpose div i[data-v-5afc4a73]{
    padding-right:0px;
  }
  select{
    font-size:17px;
    color:rgb(160,117,117);
  }
  input[type=number],input[type=text]{
    padding:10px 32px !important;
  }
  .other_footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2.5em;
    border-top: 1px solid #EB3723;
  }
  .other_footer .cancel,.other_footer .keep{
    float: left;
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 2.5em;
  }
  .other_footer .cancel{
    color: #EB3723;
    background-color: #fff;
  }
  .other_footer .keep{

    color: #fff;
    background-color: #EB3723;
  }
  .other_footer span input::-webkit-input-placeholder{
    text-align:right;
  }
  .other_footer span input{
    width: 4em;
    border: none;
    outline: none;
  }
  input{
    border: none !important;
  }
  .biaodan{
  width: 50%;
  float: left;
  }
  .selsect{
    width:100px !important;
  }
.infomaBox{
  /*background-color: #e5e5e5;  */
}
.purpose{
	padding-top: 10px;
	height:auto;
    height:100%;
    width: 100%;

}
.bianhao,.username{
	width: 100%;
	height:50px;
	line-height: 50px;
	border:1px solid #E2E2E2;
	border-bottom: none;
	padding-left: 20px;
  padding-right: 20px;
	color: #555555;
}
.purpose div:last-child{
	/*border-bottom:1px solid #E2E2E2;*/
}
.purpose div i{
	float: right;
	word-break:break-all;
	padding-right: 20px;
}
select{
	margin-bottom: 0px!important;
	padding-bottom: 2px;
	height: 40px;
}
.jianyi{
	width: 100%;
	height: 100%;
	border: 1px solid #E2E2E2;
	display: inline-block;
	padding-top: 10px;
	padding-bottom: 10px;
}
.conttt{
	display: inline-block;
	float: right;
	width: 50%;
	color:#222222;
	font-size: 14px;
	padding-right: 20px;
}
.genjin{
	display: inline-block;
	width: 50%;
	height: 100%;
	padding-left: 20px;
}

</style>
