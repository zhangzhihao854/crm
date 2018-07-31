<template>
  <div class="groupDetail" style="background-color: #fff;">
    <div class="page3">
      <header class="mui-bar mui-bar-nav">
        <h3 id='titler' class="mui-title">{{groupName}}</h3>
        <span  class=" mui-icon mui-pull-left" @click="goGroupList"> <img src="../../../../static/images/back-arrow@2x.png" alt="">返回</span>
        <router-link :to="{path: '/clientGroup3', query:{groupMemberType:groupMemberType,groupId:groupId}}">
          <span class="text">添加</span>
        </router-link>
      </header>
    </div>
    <div class="space1"></div>
    <el-table v-loading="loading4"  v-show="loading4" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <div :style="{height:divHeight+'px'}" ref="nav">
      <!--<div>-->
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :auto-fill="isAutoFill" ref="loadmore"
                   :top-method="loadTop" :top-all-loaded="allLoaded" @top-status-change="handleBottomChange"
                   :topDistance = 30  :maxDistance = 60  :bottomDistance = 30
      >
        <ul>
          <li class="userList" v-for="(member,index) in groupMembers">
            <div class="memberWrap" style="width: 120%; position: relative;" v-touchstart v-touchmove>
              <div class="users" style="width: 80%">
                <img  class="headImage" src="../../../../static/images/_s-icon_man_pressed@2x.png" alt="男生头像">
                <span class="userName">{{member.custZhName}}</span>
                <img  class="phone" src="../../../../static/images/tell.png" alt="电话">
              </div>
              <span class="btn-delete" v-on:click="deleteMember(member.id)">删除</span>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>
<script type=text/ecmascript-6>
  import  mui from '../../../style/js/mui.min.js'
  import myBus from '../../../components/tools/myBus'
  export default{
    data(){
      return{
        groupId:'',
        groupName:'',
        groupMemberType: '',
        groupMembers: [],
        memberId:'',
        loading4: true,
        /*分页初始化数据*/
        allLoaded: false, //允许再次调用上拉函数
        isAutoFill: false, //是否自动触发下拉函数来填充满父盒子
        divHeight: 0, //父盒子合理的高度

        /*客户群成员分页数据*/
        count_b: 1,
        next_b: 2,
        prev_b:1,
        pageCount_b: 1,
        pageNum: 1,
        startX:'',
        startY:''
      }
    },
    activated(){
      myBus.$emit('getTabbarHeight', (h) => {
        this.divHeight = document.documentElement.clientHeight - h - this.$refs.nav.$el.offsetHeight;
      });
     /* myBus.$emit('getTabbarHeight', (h) => {
        this.divHeight = document.documentElement.clientHeight;
      });*/
      this.groupMembers = []
      this.loading4 = true
      this.count_b = 1
      this.groupName = this.$route.query.name;
      this.groupId = this.$route.query.id;
      this.groupMemberType = this.$route.query.type;
      /*获取群成员信息*/
      this.showGroupMembers()
    },
    created () {
      mui.init({
        swipeBack: false //启用右滑关闭功能
      })
    },
    directives:{
      'touchstart':{
        update(el,binding){
          el.addEventListener("touchstart", function(e) {
            if (e.touches.length > 1) {
              return false;
            }
            this.startX = e.touches[0].clientX;
            this.startY= e.touches[0].clientY;

          }, false);
        }
      },
      'touchmove':{
        update(el,binding){
          el.addEventListener("touchmove", function(e) {
            if (e.touches.length > 1) {
              return false;
            }
            let endX = e.touches[0].clientX
            let endY = e.touches[0].clientY
            if(endY >this.startY){
               return false;
            }

            if(endX >this.startX){
              el.style.transform="translateX(0px)"
              el.style.transition="1s"
            }else if(endX <this.startX){
              el.style.transform="translateX(-70px)"
              el.style.transition="1s"
            }
          }, false);
        }
      }
    },
    methods:{
      //  显示群成员信息
      showGroupMembers(){
        var url = `/CRMNewMobile/group/queryGroupPersonList`;
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity'),
              "pageNum": this.count_b,
              "id": this.groupId
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          /*  this.flag = 'b'*/
          this.next_b = res.body.data.next
          this.prev_b = res.body.data.prev
          this.pageCount_b = res.body.data.pageCount
          this.groupMembers = res.body.data.data
          this.pageNum = res.body.data.pageNum
          this.loading4 = false
          if(res.body.data.data.length==0){
            mui.alert('此群组下暂无客户哦')
          }

        }).catch((error) => {
          console.log(error);
        })
      },
// 删除群成员
      deleteMember(memberId){

        /*点击删除按钮，点击确定走接口*/
        var btnArray = ['确定', '取消'];
        mui.confirm('亲，确定要删除此成员吗？', '提示', btnArray, (e) => {
          if (e.index == 0) {

            /*获取群成员的id*/
            this.memberId = memberId
            var url = `/CRMNewMobile/group/deleteGroupPresonById`;
            this.$http.post(url,
              /*{"identity": this.cookies.get('identity'),data:{"id": this.memberId}}*/
              {
                  "identity": this.cookies.get('identity'),
                  "id": this.memberId,
                  "custBaseId": this.groupId
              },
              {
                emulateJSON:true
              }
            ).then(res => {

              this.showGroupMembers()
              /*初始化位移*/
              var memberArr = document.getElementsByClassName('memberWrap')
              for(var i =0;i<memberArr.length;i++){
                memberArr[i].style.transform = "translateX(0px)"
              }

            }).catch((error) => {
              console.log(error);
            })
          } else {
            /*初始化位移*/
            var memberArr = document.getElementsByClassName('memberWrap')
            for(var i =0;i<memberArr.length;i++){
              memberArr[i].style.transform = "translateX(0px)"
            }
          }

        })
      },
      /*点击头部返回按钮，回到群组列表页面*/
      goGroupList(){
        this.$router.go(-1)
      },
      //下一页
      moveBottom1() {

        this.count_b = this.next_b
        if(this.pageNum == this.pageCount_b ){
         mui.toast('已至末尾页');
         return false;
         }
        this.showGroupMembers()
      },
      //前一页
      moveTop1(){
        this.count_b = this.prev_b

        /*if(this.count_b == 1){
          mui.toast('已至最前页');
        }*/
        if(this.pageNum == 1){
          mui.toast('已至最前页');
          return false;
        }
        this.showGroupMembers()
      },
      /*分页子组件的方法：*/
      //获取当前刷新状态
      handleBottomChange(s) {
      },
      loadBottom() {
        //通知组件的状态改变，从loadding进入pull
        this.$refs.loadmore.onBottomLoaded();
//        var count=1
        //获取下一页的数据
        this.moveBottom1()
      },
      loadTop(){
        //通知组件的状态改变，从loadding进入pull
        this.$refs.loadmore.onTopLoaded();
//        var count=1
        //获取下一页的数据
        this.moveTop1()
      },

    }
  }
</script>
<style lang="scss" scoped>
  /*设置群组成员头部样式*/
  .page3{
    width: 100%;
    height:44px;
  }
  .page3 .mui-bar-nav{
    position:relative;
    height:44px;
    box-shadow:none;
    background:rgba(255,255,255,1) !important;
    border-bottom: 1px solid #e5e5e5;
    line-height: 44px;
  }
  .page3 .mui-bar-nav .mui-title{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(17,17,17,1);
    line-height:2rem;
  }

  .page3 .mui-bar-nav img{
    width:0.62rem;
    border-radius: 1px ;
    vertical-align: middle !important;
    line-height:2rem;
  }

  .page3 .mui-pull-left{
    font-size:0.94rem !important;
    color:rgba(235,55,35,1);
    line-height:2rem;
    z-index: 2000;
    position: relative;
  }
  .page3 .mui-bar .mui-icon{
    padding-top: 4px;
  }
  .page3 .text{
    position: absolute;
    right: 0.5rem;
    font-size:0.94rem;
    font-family:PingFangSC-Regular;
    color:rgba(235,55,35,1);
  }
  .groupDetail .space1 {
    width: 100%;
    height: 0.8rem;
    border-top: 1px solid #E7E7E8;
    border-bottom: 1px solid #E7E7E8;
    background-color: #F8F9FB;
  }
  .groupDetail .userList{
    /*width: 100%;*/
    height: 2.8rem;
    line-height: 2.8rem;
    background:rgba(255,255,255,1);
    border-bottom: 1px solid #E2E2E2;
  }
  .groupDetail .userList .headImage{
    width: 1.3rem;
    height: 1.3rem;
    margin-left: 0.8rem;
    vertical-align: middle;
  }
  .groupDetail .userList .userName{
    display: inline-block;
    vertical-align: middle;
    width: 290px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.94rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    margin-left: 0.3rem;
  }
  .groupDetail .userList .users{
    position: relative;
  }
  .groupDetail .userList .phone{
    position: absolute;
    top:13px;
    right: 10px;
    width: 0.88rem;
    height: 1.05rem;
    vertical-align: middle;
  }
  .groupDetail .userList  .btn-delete{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 70px;
    height: 100%;
    line-height: 2.4rem;
    text-align: center;
    background:rgba(255,59,48,1);
    font-size:0.94rem;
    font-family:PingFangSC-Regular;
    color: #fff;
  }

</style>
