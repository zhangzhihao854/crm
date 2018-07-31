<template>
  <!--class="temp" id="temp"-->
  <div >
    <title-Header :title="title"></title-Header>
    <div class="maincontent">
      <div class="carousel-wrapper">
        <!--从mint-ui中导入的图片轮播图-->
        <mt-swipe :auto="4000" >
          <mt-swipe-item class="slide1" v-for="(item,index) in lunboData"  :key="index">
<!--            <img :src="'http://www.crcbcrm.com/'+item.spreadUrl" class="img"  @click=Smallimg(item.targeturl) >-->
<!--            <img :src="'http://221.195.137.135:8081/'+item.spreadUrl" class="img"  @click=Smallimg(item.targeturl) >-->
            <img :src="'http://222.223.182.30:1411/'+item.spreadUrl" class="img"  @click=Smallimg(item.targeturl) >
          </mt-swipe-item>
        </mt-swipe>
        <div  v-show="bigimg" class="imgshow" @click=BIGimg >
          <!--<img :src="'http://www.crcbcrm.com/'+targeturl" class="img">-->
  <!--        <img :src="'http://221.195.137.135:8081/'+targeturl" class="img">-->
          <img :src="'http://222.223.182.30:1411/'+targeturl" class="img">

        </div>

      </div>
      <div class="mui-content">
        <ul class="mui-table-view mui-grid-view mui-grid-9" id="menu">
          <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3" v-for="(item,index) in JurisdictionList">
          <span @click="urlchange(item.id,index)">
            <span class="mui-icon mui-icon-home">
              <img :src="'./static/images/'+item.id+'.png'" alt="">
            </span>
            <div class="mui-media-body">{{item.name}}</div>
          </span>
          </li>
        </ul>
      </div>
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
      <div class="messagediv" v-show="loading">
        暂无提醒消息
      </div>
      <div class="mui-content1">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell mui-media" v-for="item in newmsgListData" id="listData">
            <router-link v-bind='{to:"/listdetail?type="+item.type+"&title="+item.title+"&flag="+flag}'>
              <img class="mui-media-object mui-pull-left" :src="'./static/images/'+item.type+'.png'">
              <div class="mui-media-body">
                {{item.title}}
                <span class="mui-pull-right ">...</span>
                <p class="timer " >{{currentDate}}</p>
                <p class='mui-ellipsis'>{{item.content}}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="kong"></div>

    </div>

    <!--<div class="footer_p">-->
      <footer-p></footer-p>
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import  mui from '../style/js/mui.min.js'
  import footerP from '../components/footer/tabBar.vue'
  import TitleHeader from '../components/header/title-header'
  //  import { Toast } from 'mint-ui'
  export default {
    data () {
      return {
        title: '首页',
        currentDate:"",
        msgListData:[],
        showFlag: false,
        loading2: true,
        loading: false,
        PermissinosData:[],
        newmsgListData:[],
        flag:"01",
        lunboData:'',
        smallimg:true,
        bigimg:false,
        targeturl:'',
        JurisdictionList:[],
        MenuList:[],
        /*目标达成角色*/
        targetMark: ''
      }
    },
    components: {
//      DividingLine,
//      Confirm,
      TitleHeader,
      footerP
    },
    activated(){
      this.MenuList=[
        {id:"0bd58f86842a4cc5b973b19efb5d9c96",name:"工作日报"},
        {id:"d6b76b27883342d1b3800eb1226d312c",name:"晨夕会"},
        {id:"5decb14a1a0a4ddb84ff60ba0aee08b0",name:"目标达成"},
        {id:"36ed6f0220f4476b8e7a9028b0e3d7ca",name:"高管看板"},
        {id:"a92d85184d1246ed98a441a9f98f2520",name:"产品"},
        {id:"107e521b2bd444cd9ed7802672c4c58e",name:"潜客录入"},
        {id:"be6f29517b714acea6266b1fd86336d8",name:"贷款进度"},
        {id:"d964fa0ed85a47b0ab395bbe1ad2d0a1",name:"更多"},
      ]
      this.smallimg=true
      this.bigimg=false
      this.JurisdictionList=[]
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });
      this.golist()
      var d = new Date()
      this.date=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      this.newmsgListData=""
      this.loading2=true
      this.loading=false
      this.getNewsListData()
      this.getPermissinos()
      this.getJurisdiction()
      /*2018/3/30号新增: 目标达成角色接口*/
      this.targetAchievement()


      var M=new Date().getMinutes()+"";
      var H=new Date().getHours();
      this.M=M.length>1?M : 0+M;
      this.currentDate=H+":"+this.M


    },
    methods: {
//      九宫格路由跳转
      urlchange(url,index){
        console.log(url);
        console.log(index);
        if(url=="0bd58f86842a4cc5b973b19efb5d9c96"){
          this.$router.push("/job?date=date")
        }else if(url=="d6b76b27883342d1b3800eb1226d312c"){
          this.$router.push("/morningS?date=date")
        }else if(url=="5decb14a1a0a4ddb84ff60ba0aee08b0"){
          //this.$router.push("/reachMain")
          if(this.targetMark == '客户经理'){
            this.$router.push("/Manager?date=date")
          }else if(this.targetMark == '柜员'){
            this.$router.push("/GyList")
          }else if(this.targetMark == '分中心负责人'){
            this.$router.push("/Fzx")
          }
        }else if(url=="36ed6f0220f4476b8e7a9028b0e3d7ca"){
          this.$router.push("topMain")
//          this.$confirm("亲，该功能暂未开放，敬请期待哦！", '提示', {
//            confirmButtonText: '确定',
//            type: 'warning'
//          }).then(() => {
//          }).catch(() => {
//          });
          /*mui.alert('亲，该功能暂未开放，敬请期待哦！')*/
        }else if(url=="a92d85184d1246ed98a441a9f98f2520"){
          this.$router.push("productMainPage?date=product")

          /*mui.alert('亲，该功能暂未开放，敬请期待哦！')*/
        }else if(url=="107e521b2bd444cd9ed7802672c4c58e"){
          this.$router.push('/customerInput?num=3')
        }else if(url=="be6f29517b714acea6266b1fd86336d8"){
          this.$router.push("/loan_schedule?num=3")
        }else if(url=="khqt"){
          this.$router.push("/clientUsersManage")
        }else if(url=="yxtg"){
          this.$router.push("/ActivityList")
        }else if(url=="qzkh"){
          this.$router.push("/clientQianZai")
        }else if(url=="d964fa0ed85a47b0ab395bbe1ad2d0a1"){
          if(index==3){
              this.$router.push("/ActivityList")
          }else if(index==7){
            if(this.JurisdictionList[5].id=='yxtg'){
              /*this.$confirm("亲，该功能暂未开放，敬请期待哦！", '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              }).then(() => {}).catch(() => {});*/
              mui.alert('亲，该功能暂未开放，敬请期待哦！')
            }else{
              this.$router.push("/ActivityList")
            }
          }
          else{
            /*this.$confirm("亲，该功能暂未开放，敬请期待哦！", '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(() => {}).catch(() => {});*/
            mui.alert('亲，该功能暂未开放，敬请期待哦！')
          }
          }
      },
//      九宫格菜单显示权限

      getJurisdiction(){
        var url= `/CRMNewMobile/Jurisdiction/getJurisdiction`
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
              "postId":this.cookies.get('postId')
          },
          {
            emulateJSON:true
          }

        ).then(
          res => {
            if(res.body.ListData.length==0){
              this.JurisdictionList=this.MenuList
            }else if(res.body.ListData.length==3){
              var obj3=new Object;obj3.id="khqt";obj3.name="客户群组"
              this.JurisdictionList=res.body.ListData
              var obj4=this.JurisdictionList.pop()
              this.JurisdictionList.push(obj3)
              this.JurisdictionList.push(obj4)

//              alert(this.JurisdictionList[3].id)
//              if(this.JurisdictionList[3].id=="d964fa0ed85a47b0ab395bbe1ad2d0a1"){
//                this.JurisdictionList[3].id="yxtg"
//              }
              console.log(this.JurisdictionList);
            } else if(res.body.ListData.length==4) {
              this.JurisdictionList = res.body.ListData
//              if (this.JurisdictionList[3].id == "d964fa0ed85a47b0ab395bbe1ad2d0a1") {
//                this.JurisdictionList[3].id = "yxtg"
//                this.JurisdictionList[3].name = "营销推广"
//              }
            }else if(res.body.ListData.length==5){
              this.JurisdictionList=res.body.ListData
              var obj4=this.JurisdictionList.pop()
              var obj1=new Object;obj1.id="yxtg";obj1.name="营销推广"
              var obj2=new Object;obj2.id="khqt";obj2.name="客户群组"
              var obj3=new Object;obj3.id="qzkh";obj3.name="潜在客户"
              this.JurisdictionList.push(obj1)
              this.JurisdictionList.push(obj2)
              this.JurisdictionList.push(obj3)
              this.JurisdictionList.push(obj4)
            }else if(res.body.ListData.length==6){
              this.JurisdictionList=res.body.ListData
              var obj4=this.JurisdictionList.pop()
              var obj1=new Object;obj1.id="yxtg";obj1.name="营销推广"
              var obj2=new Object;obj2.id="khqt";obj2.name="客户群组"
              this.JurisdictionList.push(obj1)
              this.JurisdictionList.push(obj2)
              this.JurisdictionList.push(obj4)
            }else if(res.body.ListData.length==7){
              var obj3=new Object;obj3.id="khqt";obj3.name="客户群组"
              this.JurisdictionList=res.body.ListData
              var obj4=this.JurisdictionList.pop()
              this.JurisdictionList.push(obj3)
              this.JurisdictionList.push(obj4)
//              if(this.JurisdictionList[7].id=="d964fa0ed85a47b0ab395bbe1ad2d0a1"){
//                this.JurisdictionList[7].id="yxtg"
//                this.JurisdictionList[7].name="营销推广"
//              }
              console.log(this.JurisdictionList);
            }else if(res.body.ListData.length==8){
              this.JurisdictionList=res.body.ListData
//              if(this.JurisdictionList[8].id=="d964fa0ed85a47b0ab395bbe1ad2d0a1"){
//                this.JurisdictionList[8].id="yxtg"
//                this.JurisdictionList[8].id="yxtg"
//              }
            } else {
              this.JurisdictionList=res.body.ListData
            }
          },
          res => {
            console.log(res)
          }
        )
      },

      Smallimg(value){
        this.smallimg=false
        this.bigimg=true
        this.targeturl=value
        console.log(this.targeturl)

      },

      BIGimg(){
        this.smallimg=true
        this.bigimg=false
      },
      goToqklr () {
        this.$router.push({
          path: '/customerInput'
        })
      },
      showConfirm () {
        this.$refs.confirmele.show()
      },
      goLoan (num) {
        alert(num)
        this.$router.push('/loan_schedule?num='+num);
      },

//      获取权限
      getPermissinos(){
        var url= `/CRMNewMobile/massage/messagePermissions`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
              "depaId":this.cookies.get('dep'),
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
            this.PermissinosData=res.body.ListData[0].ListData
          },
          res => {
            console.log(res)
          }
        )
      },

      getNewsListData(){
        console.log(123);
        var url = `/CRMNewMobile/massage/homeMessage`
        // 进行请求
        this.$http.post(url,
          { "identity":this.cookies.get('identity'),
            "depaId":this.cookies.get('dep')
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
            console.log(res);
            if(res.body.ListData[0].ListData.length==0){
          this.loading=true
          this.loading2=false
          this.msgListData=res.body.ListData[0].ListData
//              this.newmsgListData = [];
              return false
        }else{
            if(this.PermissinosData.length==0){
              console.log("内容为0")
              this.newmsgListData = [];
              this.loading2=false
              this.loading=false
              this.newmsgListData=res.body.ListData[0].ListData
            }else{
              this.newmsgListData = [];
              this.loading2=false
              this.loading=false
              console.log(res);
              this.msgListData=res.body.ListData[0].ListData
              for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                  if(this.msgListData[i].type==this.PermissinosData[j]){
                    this.newmsgListData.push(this.msgListData[i])
                  }
                }
              }
            }
          }
      },
        res => {
          console.log(res)
        }
      )
      },
//      轮播图数据接口
      golist(){
        var url= `/CRMNewMobile/go/list`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity')
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
            console.log(res);
            this.lunboData=res.body.ListData[0].ListData
            console.log(this.lunboData.length);
            console.log(this.lunboData);
          },
          res => {
            console.log(res)
          }
        )
      },
      /*获取目标达成角色接口*/
      targetAchievement(){
        var url= `/CRMNewMobile/target/targetAchievement`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity')
          },
          {
            emulateJSON:true
          }
        ).then(res =>{
          this.targetMark = res.body.msg;
        })
          .catch(err =>{

          })
      }
    },

  }

</script>

<style scoped>
  /*#temp{*/
    /*position:relative;*/
    /*height: 100%;*/
  /*}*/
  .maincontent{
    margin-top: 44px;
   /* height: 100%; 4/17注掉此代码*/
    height: 100%;
    overflow: scroll;
  }
  .messagediv{
    width:100%;
    height:60px;
    line-height:60px;
    text-align: center;
    color: #909399;
    font-size:14px;
  }
.imgshow{
  position:absolute;
  top: 0;
  border-bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 999999;
  text-align: center;
  background: rgba(0,0,0,.2);
  overflow: scroll;
}
  .imgshow img{
    width:100%;
    height:auto;
  }
  #listData{
    height: 5.5rem;
    /*border-bottom: 1px solid #ccc;*/
  }
  .slide1 img{
    width: 100%;
    height: 100%;
  }
  .slide2 img{
    width: 100%;
    height: 100%;
  }
  .slide3 img{
    width: 100%;
    height: 100%;
  }
  .kong{
    height:3em;
  }
  .home{
    width: 100%;
    height: 10em;
    /*margin-top:3em;*/
  }
  .carousel-wrapper{
    height: 7.3rem;
    margin-bottom: 0.1rem !important;
  }

  .mui-content>.mui-table-view:first-child{
    margin-top:0 !important;
    margin-bottom:0.5rem !important;
  }
  .mui-content .mui-col-xs-3{
    background-color: #fff !important;
    margin-bottom: 0 !important;
    height:5.42rem;
    text-align: center;
  }
  .mui-content .mui-icon{
    height: 1.92rem;
    width:2.02rem;
    /*width:50%;*/
    /*height:40%;*/
  }
  .mui-content .mui-icon img {
    width: 100%;
    height:100%;
  }
  .mui-content .mui-media-body{
    font-size:0.67rem !important;
    font-family:PingFangSC-Regular;
    color:#222;
    margin-bottom:1.66rem;
    /*line-height:1rem;*/
  }
  /*修改 */
  .mui-content .mui-table-view{
    border-top: 0;
  }

  .mui-icon-home {
    /*background: url("../../static/images/home_daily_icon@2x.png") no-repeat center;*/
    /*设置一个环绕*/
    /*background-repeat: round;*/

  }
  .mui-icon-home:before {  content: '';  }

  /*.mui-icon-email { background:url("../../static/images/home_meeting_icon.png") no-repeat center;  }*/
  .mui-icon-email:before {  content: ''; width:100%;
    height: 100%; }

  /*.mui-icon-chatbubble { background: url("../../static/images/home_goal_icon.png") no-repeat center;  }*/
  .mui-icon-chatbubble:before {  content: '';  }

  /*.mui-icon-location { background: url("../../static/images/home_executives_icon.png") no-repeat center;  }*/
  .mui-icon-location:before {  content: '';  }

  /*.mui-icon-search { background: url("../../static/images/home_product_icon.png") no-repeat center;  }*/
  .mui-icon-search:before {  content: '';  }

  /*.mui-icon-a { background: url("../../static/images/home_Prospect_icon.png") no-repeat center;  }*/
  .mui-icon-a:before {  content: '';  }

  /*.mui-icon-b { background: url("../../static/images/home_loans_icon.png") no-repeat center;  }*/
  .mui-icon-b:before {  content: '';  }

  /*.mui-icon-c { background: url("../../static/images/home_more_icon.png") no-repeat center;  }*/
  .mui-icon-c:before {  content: '';  }

  .mui-table-view{
    position-bottom:3.5em;
  }
  .mui-content{
    margin-top: 0 !important;
  }
  .mui-content1 .timer{
    color:rgba(136,136,136,1);
    font-size:0.67rem;
    line-height:1rem;
  }
  .mui-content1 .mui-ellipsis{
    color:rgba(85,85,85,1);
    font-size:0.78rem;
  }
  .mui-content1 .mui-media-body{
    font-size: 0.89rem;
    color: rgba(34,34,34,1);
    line-height:1.61rem;
  }
  .mui-content1 .mui-pull-right{
    color: rgba(207,204,204,1);
    height:0.17rem;
  }
  .mui-content1 .mui-table-view-cell{
    padding: 9px 13px;
  }
  /*修改边框的颜色*/
  .mui-content1 .mui-table-view-cell:after{
    left: 0;
    background-color: #eae7e7 !important;
  }
  /*修改内容区文本换行显示*/
  .mui-ellipsis{
    white-space: normal;
    width:11.75rem;
    font-family:PingFangSC-Regular;
    line-height: 1.5;
  }
  /*修改内容区图标尺寸*/

  .mui-table-view .mui-media-object{
    width: 1.5rem ;
    height: 1.5rem;
    line-height: 1.5rem;
  }
  /*修改扩展符的大小*/
  .mui-content1 .mui-pull-right[data-v-3a21f120]{
    font-size: 1.3rem;
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
    /*border-bottom: none;*/
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
    /*border-bottom: 1px solid #e5e5e5 !important;*/
  }

.boBorm{
  border-bottom: 1px solid #e5e5e5 !important;
}
  .mui-grid-view.mui-grid-9{
    background-color: #fff;
    /*border-bottom: 1px solid #e5e5e5;*/
  }

</style>
