<template>
  <div class="mainWrap" :style="{height:divHeight+'px'}">
    <div class="wrap">
      <!--头部-->
      <div class="temp3">
        <header class="mui-bar mui-bar-nav">
          <span class=" mui-icon mui-pull-left" @click="goClient"> <img src="../../../../static/images/back-arrow@2x.png" alt="">返回</span>
          <input class="searchText" type="text" placeholder="请输入查询条件" v-model="custName"  @keyup.enter="receiveText">
        </header>
      </div>
      <!--<headerBlack @receiveText="receiveText"></headerBlack>-->
      <div class="nav">
        <div id="btn1" :class="{activing: isActive}" @click="toggleShow">
          零售
          <span class="smalBar" v-show="isActive"></span>
        </div>
        <div :class="{activing: isClick}" @click="changeColor">
          对公
          <span class="smalBar" v-show="isClick"></span>
        </div>
      </div>
      <el-table v-loading="loading2"  v-show="loading" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :auto-fill="isAutoFill" ref="loadmore"
                   :top-method="loadTop" :top-all-loaded="allLoaded" @top-status-change="handleBottomChange"
      >
        <ul id="OA_task_1" class="mui-table-view" v-for="(people,index) in peoples" ref="nav">
          <li class="mui-table-view-cell">
          <div class="mui-slider-right mui-disabled">
            <!--<a class="mui-btn mui-btn-red" @click="cancelFocus(people.id)">-->
              <!--取消关注-->
             <!--&lt;!&ndash; <img  class="action" src="../../../../static/images/action@2x.png" alt="">&ndash;&gt;-->
            <!--</a>-->
          </div>
          <div class="mui-slider-handle">
            <div class="card">
              <el-collapse>
                <el-collapse-item :title= people.custName>
                  <router-link :to="{path:path,query:{custId:people.custId,flag:'clientFocus',GLflag:people.custType}}">
                    <div class="contentWrap" >
                      <div>
                        <span class="tit2">客户编号：</span>
                        <span class="value2" ref="cstId">{{people.custId}}</span>
                      </div>
                      <div>
                        <span class="tit2">客户类型：</span>
                        <span class="value2">{{people.custType}}</span>
                      </div>
                      <div>
                        <span class="tit2">证件类型：</span>
                        <span class="value2">{{people.identType}}</span>
                      </div>
                      <div>
                        <span class="tit2">证件号码:</span>
                        <span class="value2">{{people.identNo}}</span>
                      </div>
                    </div>
                  </router-link>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script type=text/ecmascript-6>
  import myBus from '../../../components/tools/myBus.js';
 // import headerBlack from '../../../components/header/back-header-input-1.vue'
  //import focusHeader from '../../../components/header/focus-header.vue'
  import { MessageBox } from 'mint-ui';
  export default{
    data (){
        return {
        /*  showPage1: true,
          showPage2: false,*/
          activeNames: ['1'],
          peoples: [],
          custId:'',
          allLoaded: false, //允许再次调用上拉函数
          isAutoFill: false, //是否自动触发下拉函数来填充满父盒子
          divHeight: 0, //父盒子合理的高度
          flag:"",
          next:'',
          prev:'',
          Fnext:'',
          Fprev:'',
          count:'',
          Fcount:'',
          loading2:true,
          loading: true,
          mark:'a',
          isActive: true,
          isClick: false,
          focusDGorLS:2,
          custName:"",
          //点击客户详情跳转路径
          path:'/clientCont',

        }
    },
    activated(){
      this.flag="1"
      this.count=1
      this.next=1
      this.prev=1
      this.Fcount=1
      this.Fnext=1
      this.Fprev=1
      this.mark="a"
      this.isClick = false
      this.isActive = true
      this.focusDGorLS=2
      this.custName=""
      this.getFocusUsers()
      this.peoples = []
      this.loading2=true,
      this.loading=true,
      this.path = '/clientCont',

      myBus.$emit('getTabbarHeight', (h) => {
        this.divHeight = document.documentElement.clientHeight - h - this.$refs.nav.$el.offsetHeight;
    });

    },
    methods: {
      /*点击对公，零售切换样式及内容*/
      changeColor(){
          //改变跳转路径
        this.path = '/publicCont',
        this.mark = 'b'
        this.isClick = true
        this.isActive = false
        this.focusDGorLS=1
        /*初始化pageNum*/
        this.count = 1;
//      if(this.custName!=""){
//          this.receiveText()
//        }else{
        this.getFocusUsers()
//        }


      },
      toggleShow(){
        this.mark = 'a'
        this.isClick = false
        this.isActive = true
        this.focusDGorLS=2
        /*初始化pageNum*/
        this.count = 1;
        this.getFocusUsers()
//        if(this.custName!=""){
//          this.receiveText()
//        }else{
//        }

      },

      //获取当前刷新状态
      handleBottomChange(s) {
        console.log("获取当前刷新状态");
        console.log(s)
      },
      loadBottom() {
        //通知组件的状态改变，从loadding进入pull
        this.$refs.loadmore.onBottomLoaded();
        //获取下一页的数据
      console.log("下一页")

        if(this.flag=="1"){
          this.count=this.next
          this.getFocusUsers()
//            筛选
        }else if(this.flag=="2") {
          this.Fcount=this.Fnext
          this.receiveText()
        }

      },
      loadTop(){
        //通知组件的状态改变，从loadding进入pull
        this.$refs.loadmore.onTopLoaded();
        console.log("上一页")
        if(this.flag=="1"){
          this.count=this.prev
          this.getFocusUsers()
//            筛选
        }else if(this.flag=="2") {
          alert("222")
          this.Fcount=this.Fprev
          this.receiveText()
        }


      },

      /*获取关注客户列表*/
      getFocusUsers(){
        this.peoples=[]
        this.loading2=true
        this.loading=true

        var url = `/CRMNewMobile/attention/queryAttentionList`;
        this.$http.post(url,
         /* {"identity": this.cookies.get('identity'),data:{"pageNum": this.count}}*/
          {
              "identity": this.cookies.get('identity'),
              "pageNum": this.count,
              "custName": "",
              "flag":this.focusDGorLS
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          //判断数据是否为空
          if(res.body.data == null || res.body.data.data == null || res.body.data.data.length == 0){
              this.loading2=false,
              this.loading=true
          }else{
            this.loading2=false
            this.loading=false
          }
          this.flag="1"

          this.peoples =  res.body.data.data
          this.next=res.body.data.next
          this.prev=res.body.data.prev

        }).catch((error) => {
          console.log(error);
        })
      },
      /*模糊查询关注客户*/
      receiveText(){
        this.peoples=[]
        this.loading2=true
        this.loading=true
        var url = `/CRMNewMobile/attention/queryAttentionList`;
        this.$http.post(url,
          {
            "identity": this.cookies.get('identity'),
            "pageNum": this.Fcount,
            "custName": this.custName,
            "flag":this.focusDGorLS
          },
          {
            emulateJSON:true
          }
        ).then(res => {

          /*没有搜索到数据时，添加提示语*/
          if(res.body.data == null || res.body.data.data == null || res.body.data.data.length == 0){
//            MessageBox.alert('亲，没有找到相关数据！').then(action => {
//              /*清空搜索内容*/
//            });
             this.loading2=false,
              this.loading=true
          }else{
            this.loading2=false
            this.loading=false
          }
          this.flag="2"
          if(this.custName!= ""){
            this.custName = ""
          }

          this.peoples =  res.body.data.data
          this.Fnext=res.body.data.next
          this.Fprev=res.body.data.prev

        }).catch((error) => {
          console.log(error);
        })
      },
      /*点击返回按钮，回到上一页*/
      goClient(){
        //this.$router.go(-1)
        if(this.$route.query.markGZ=='my'){
          this.$router.push('/myplugin')
        }else{
          this.$router.push('/clients')
        }

      },

      /*点击取消关注，重新请求数据*/
      cancelFocus(id){

        var url = `/CRMNewMobile/ attention/deleteAttention`;
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity'),
               "pageNum": 1,
               "id": id
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          this.getFocusUsers()

        }).catch((error) => {
          console.log(error);
        })
      }
    },
    components: {
      /*headerBlack,
      focusHeader*/
    }
  }
</script>

<style lang="scss" scoped>
  /*设置头部样式*/
  .temp3{
    height: 44px;
    background:rgba(255,255,255,1) !important
  }
  .temp3 .mui-bar-nav{
    position:fixed;
    top:0;
    height:44px;
    box-shadow:none;
    background:rgba(255,255,255,1);
    border-bottom: 1px solid #e5e5e5;
  }
  .temp3 .mui-bar-nav .mui-title{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(17,17,17,1);
    line-height:3rem;
  }

  .temp3 .mui-bar-nav img{
    width:0.62rem;
    /*height:1.17rem;*/
    /*font-family:PingFangSC-Regular;*/
    /*background:rgba(235,55,35,1);*/
    border-radius: 1px ;
    vertical-align: middle !important;
    line-height:2rem;
  }

  .temp3 .mui-pull-left{
    font-size:0.94rem !important;
    /*font-family:PingFangSC-Regular;*/
    color:rgba(235,55,35,1);
    line-height:2rem;
    z-index: 2000;
    position: relative;
  }
  .temp3 .mui-pull-right{
    font-size:0.94rem !important;
    font-family:PingFangSC-Regular;
    color:rgba(235,55,35,1);
    line-height:1rem;
  }
  .temp3 .mui-bar{
    position: relative;
  }
  .temp3 .searchText{
    width: 13.3rem;
    height: 1.5rem;
    margin-bottom: 0;
    background: #F8F9FB;
    position: absolute;
    top: 0.43rem;
    left: 4.3rem;
    z-index: 88;
    outline: none !important;
    font-size: 0.69rem;
  }
  .temp3 .mui-bar .mui-icon{
    padding-bottom: 0 !important;
  }

  .wrap .nav{
    width: 100%;
    height: 2.22rem;
    background:rgba(255,255,255,1);
    border-bottom:1px solid #E7E7E7;
  }
  .wrap .nav div{
    position: relative;
    float: left;
    width: 50%;
    height: 100%;
    line-height: 2.22rem;
    box-sizing: border-box;
    text-align: center;
    font-size:0.77rem;
    font-family:PingFangSC-Regular;
  }
  .wrap .nav #btn1{
    border-right: 1px solid #E7E7E7;
  }
  .wrap .nav .smalBar{
    position: absolute;
    bottom: 0;
    left: 3.05rem;
    display: inline-block;
    width: 4.16rem;
    height: 0.11rem;
    background:rgba(235,55,35,1);
  }
  .wrap .nav .activing {
    color:rgba(235,55,35,1);
  }
  /*设置分割间距*/
  .focus1 .space{
    margin-top: 44px;
    width: 100%;
    height: 0.83rem;
    background-color: #F8F9FB;
    border-top: 1px solid #E6E6E6;
    border-bottom: 1px solid #E6E6E6;
  }
  .wrap .mui-table-view-cell{
    padding: 0 !important;
  }
  .wrap .mui-table-view-cell>.mui-slider-right{
    height: 2.5rem !important;
  }

  /*修改取消关注图片的样式*/
  /*.mainWrap .mui-btn-red{
   // background-color: #FF9600;
  }
  .mainWrap .mui-table-view-cell>.mui-slider-right{
    width: 3rem;
    height: 2.5rem;
  }
  .mainWrap .mui-table-view-cell.mui-transitioning>.mui-slider-right .mui-btn{
    width: 3rem;
    height: 2.5rem;
  }
  .mainWrap .mui-table-view-cell.mui-transitioning > .mui-slider-right .mui-btn[data-v-aca8369c] > img{
    width: 3rem;
    height: 2.5rem;
  }*/
</style>
