<template>
    <div class="temp">
      <header class="mui-bar mui-bar-nav">
        <span @click="goBack()" class=" mui-icon mui-pull-left"> <img src="../../../static/images/back-arrow@2x.png" alt="">返回</span>
        <span @click="btnClicked()" class=" mui-icon  mui-pull-right"> 保存</span>
        <h1 class="mui-title">短信模板</h1>
      </header>
      <div >
        <textarea class="mui-card" rows=10 v-model="smstext">
         <!--{{this.smstext}}-->
        </textarea>
      </div>

    </div>
</template>

<style scoped>
  .temp{
    /*margin-top: 4em;*/
    background-color: #fff;
    position: relative;
  }

  .temp .mui-card{
    margin-top:4em;
    margin-left:0;
    margin-right:0;
    padding: 1.2rem;
    /*border: 1px solid #e5e5e5;*/
    box-shadow:none;
    font-size:0.94rem;
    font-family:PingFangSC-Regular;
    color:rgba(34,34,34,1);
    line-height:1.33rem;
    overflow: scroll;
  }
  .mui-bar-nav{
    position: absolute;
    top:0;
    left: 0;
    z-index: 2000;
    height:2.32rem;
    box-shadow:none;
    border-bottom: 1px solid #e5e5e5;
    background:rgba(255,255,255,1);
  }
  .mui-bar-nav .mui-title{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(17,17,17,1);
    line-height:2rem;
  }
textarea{
  border: none !important;
}
  .mui-bar-nav img{
    width:0.62rem;
    height:1.17rem;
    font-family:PingFangSC-Regular;
    /*background:rgba(235,55,35,1);*/
    border-radius: 1px ;
    vertical-align: middle;
    line-height:1rem;
  }

  .temp .mui-pull-left{
    font-size:0.94rem !important;
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



</style>
<script>
  plus.webview.currentWebview().setStyle({
    softinputMode: "adjustResize"  // 弹出软键盘时自动改变webview的高度
  })
</script>
<script type=text/ecmascript-6>
  import  mui from '../../style/js/mui.min.js'
    export default{
      data () {
        return {
          smstext:"",
          id:"",
          listdata:{}

        }
      },
      activated(){
        this.smstext=""
        this.listdata=""
        this.initData()
        this.fstype()
      },
      created () {
        mui.init({
          swipeBack: false //启用右滑关闭功能
        })
      },
      methods:{
        btnClicked(){
          var smstext = this.smstext
          console.log(smstext);
          var type=this.type
          var id=this.id
          var url = '/CRMNewMobile/note/insertNote'
          // post
          this.$http.post(url,
            {
            "identity":this.cookies.get('identity'),
            "depaId":this.cookies.get('dep'),
             "type":type, "id":id, "smstext":smstext
            },
            {
              emulateJSON:true
            }

          ).then(
            res=>{
              mui.toast('保存成功');
              this.$router.go(-1)
            },
            res=>{
              console.log(res)
            }
          )
        },
        fstype(){
          var type=this.type
          var url='/CRMNewMobile/note/queryNote'
          this.$http.post(url,
            {
            "identity":this.cookies.get('identity'),
              "depaId": this.cookies.get('dep'),
              "type":type,
            },
            {
              emulateJSON:true
            }
          ).then(
            res=>{
              this.listdata=res.body.data
              console.log(this.listdata);
              this.smstext=res.body.data.smstext
              this.id=res.body.data.id

              console.log(this.smstext);
              console.log(this.id);
            },
            res=>{
              console.log('messages出错')
            }
          )
        },
        goBack(){
          this.$router.go(-1)
        },
        initData() {
          this.type=this.$route.query.type
        },

      },
    }
</script>

