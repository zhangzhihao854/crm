<template>
   <div class="moreMessageBox">
   <back-Header :title="title"></back-Header>
   <div class="messageSave" @click='gofilterBox()'>保存</div>
   <div class="messageText">
        <!--<p>{{slides.messageText}}</p>-->
        <!--<p class="two">{{slides.messageText1}}</p>-->
        <!--<p class="three"><span>活动时间：</span>{{slides.messageText2}}</p>-->
        <!--<p class="four"><span>活动地址：</span>{{slides.messageText3}}dhfgffsd但是大家赶紧华东师大官方还是达到法定防守打法斯蒂芬发的是</p>-->
     <!--<input type="textarea">-->
     <textarea name="message" id="" cols="30" rows="10" placeholder="请编辑您的活动内容..." v-model="Messagecontent"></textarea>
   </div>

	</div>
</template>

<script>
import BackHeader from '@/components/header/back-header'

  export default {
    components:{
      BackHeader,
    },
    data () {
      return {
         title:'短信模板',
         slides:{
          messageText:'尊敬的客户您好',
          messageText1:'沧州农商行诚邀您参加某某产品活动',
          messageText2:'2017-10-15',
          messageText3:'运河支行',
         },
        Messagecontent:'',

      }
      },
    activated(){
      if(this.$route.query.flag!="msg"){this.Messagecontent=""}
    },
      methods:{
        gofilterBox(){
            this.$router.push("/moreInform?mesg="+this.Messagecontent+"&flag=msg")

        },
      }
  }
</script>

<style lang='scss'>
.moreMessageBox{
    width: 100%;
    height:100%;
    background:#ffffff;
.back_text span[data-v-a2006ea4] {
	/*width: 6em!important;*/
}
.messageSave{
  width:3rem;
  height:44px;
  line-height:44px;
  display:inline-block;
  position:fixed;
  top:0;
  right:5px;
  font-size:18px;
  color:#EB3723;
  z-index:1000;
}
.messageText{
  /*width:100%;*/
  height:80%;
  padding-top:1rem;
  margin-right:20px;
  margin-left:20px;

  p{
    color:#222222;
    font-size:16px;
  }
  }
  .two,.three,.four{
    text-indent:2em;
  }
}



</style>
