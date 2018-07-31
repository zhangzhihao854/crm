<template>
      <div class="custorinfor">
        <div class="Exit" ><img src="../../../../static/images/_s-left_icon@3x.png" height="40" width='40' @click='goPage'></div>
        <div class="focus" v-show="attention_iocn"  @click="clientFocus(dataText.custId)"><img   src="../../../../static/images/attention_iocn@2x.png" height="40" width='40' ></div>
        <div class="focus" v-show="attention_checked_iocn" @click="clientFocus(dataText.custId)"><img src="../../../../static/images/attention_checked_iocn@2x.png" height="40" width='40'></div>

        <div class='touxiang'>
          <i><img :src="'./static/images/_s-icon_woman_pressed'+dataText.gender+'@3x.png'" ></i>
          <span class="middle">{{dataText.personalName}}</span><span class="middle1">{{dataText.nationality}}</span>
        </div>
        <div class="cbox">
        <div class="bianhao"><span>客户编号</span><span>{{dataText.custId}}</span></div>
        <div class="leixing"><span>证件类型</span><span>{{dataText.identType}}</span></div>
        <div class="haoma"><span>证件号码</span><span>{{dataText.identNo}}</span></div>
        </div>

      </div>
</template>
<script src="../../../style/js/mui.min.js"></script>
<script type=text/ecmascript-6>
import  mui from '../../../style/js/mui.min.js'
  export default{
    data(){
      return{
        attention_iocn:true,
        attention_checked_iocn:false,
        focusfont:"",
        focuscustId:'',
        isNotNullCust:'',

      }
    },
    //    初始化mui
    created () {
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });
    },
    activated(){
      this.attention_iocn= true,
      this.attention_checked_iocn=false
      this.focusfont=""
      this.focuscustId=""
      this.custId = this.$route.query.custId;
      this.isNotNullCust=""
      this.getisConcernCust()


    },
    components: {

    },
    props:{
      dataText:{
        type:Object,
        default:{}
      }
    },
    methods:{
      //查看客户是否是关注或隐藏
      getisConcernCust(){
        var url = `/CRMNewMobile/attention/isConcernCust`;
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity'),
              "custId": this.custId
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          this.isNotNullCust=res.body.data.isNotNullCust
          if(this.isNotNullCust=="focusNo"){//如果现在是no说明是未关注，显示空心
            this.attention_iocn= true
            this.attention_checked_iocn=false
          }else if(this.isNotNullCust=="focusYes"){//如果现在是yes说明是已关注，显示实心
            this.attention_iocn=false
            this.attention_checked_iocn=true
          }

        }).catch((error) => {
          console.log(error);
        })
      },
      clientFocus(val){
        this.focuscustId=val
        this.attention_iocn=!this.attention_iocn,
        this.attention_checked_iocn=!this.attention_checked_iocn
        this.focusfont=this.attention_iocn==true?"取消关注":"收藏关注"
        if(this.focusfont=="收藏关注"){
          this.onfocus()
          console.log("关注了")
        }else if(this.focusfont=="取消关注"){
          this.offfocus()
          console.log("取消了")
        }
        mui.toast(this.focusfont);
      },
      onfocus(){
        var url= `/CRMNewMobile/attention/addAattentionCust`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
              "custId":this.focuscustId
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {

          },
          res => {
            console.log(res)
          }
        )
      },
      offfocus(){
        var url= `/CRMNewMobile/attention/deleteAttention`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
              "custId":this.focuscustId
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
          },
          res => {
            console.log(res)
          }
        )
      },
      goPage(){

        /*if(this.$route.query.flag =="clientFocus"){
          this.$router.push("/clientFocus")
        }else{
         this.$router.go(-1)

        }*/

        this.$router.go(-1)

      }

    }
  }
</script>
<style lang="scss" scoped>


.custorinfor{
  width: 100%;
  height: 100%;
  text-align: center;
  background: #559AEE;
  color: #111111;
  /*font-size: 18px;*/
}
.Exit{
  width: 1.77rem;
  height: 1.77rem;
  display: inline-block;
  float: left;
  margin-top: 1.1rem;
  margin-left: 0.91rem;
  margin-right: -3.5rem;
}
.Exit img{
  width: 1.77rem;
  height: 1.77rem;
}
.focus{
  width: 1.77rem;
  height: 1.77rem;
  display: inline-block;
  position:absolute;
  top:0;
  right:0.91rem;
  margin-top: 1.1rem;
  /*margin-left: 0.91rem;*/
}
.focusfont{
  width: 5rem;
  height: 2rem;
  text-align: center;
  display: inline-block;
  position:absolute;
  top:0;
  right:0.5rem;
  margin-top: 3rem;
  margin-left: 0.91rem;
}
.focus img{
  width: 1.77rem;
  height: 1.77rem;
}
.touxiang{
  width: 50%;
  height: 100%;
  display: inline-block;
  margin: 1.8rem 0 0.55rem;
}
.middle{
  font-size: 0.77rem;
  display: block;
  text-align: center;
  color: #FFFFFF;
}
.middle1{
  color: #FFFFFF;
  opacity: 0.6;
  font-size: 0.77rem;
}
.bianhao,.leixing,.haoma{
  display: block;
  border-right: 1px solid rgba(255, 255, 255,.8);
  float: left;
  color: #FFFFFF;
  font-size: 0.77rem;
  padding-right: 0.41rem;
  padding-left: 0.41rem;
}
.haoma{
  border-right: 0;
}
.cbox{
  display: inline-block;
  margin-bottom: 0.55rem;
}
.bianhao span{
  display: block;
}
.leixing span{
  display: block;
}
.haoma span{
  display: block;
}

.touxiang img{
  width: 2.86rem;
  height: 2.86rem;
}
</style>

