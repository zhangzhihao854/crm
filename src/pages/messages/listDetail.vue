<template>
  <div class="temp2"  :style="{height:divHeight+'px'}">
    <!--详情页-->
      <header class="mui-bar mui-bar-nav">
        <h3 id='titler' class="mui-title" ref="nav">{{dataTitle}}</h3>
        <span @click="goBack()" class=" mui-icon mui-pull-left"> <img src="../../../static/images/back-arrow@2x.png" alt="">返回</span>
        <router-link  :to="{path:'/editor',query:{type:this.type,title:this.dataTitle,flag:this.flag}}" class="mui-icon  mui-pull-right"> 编辑 </router-link>
      </header>
    <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :auto-fill="isAutoFill" ref="loadmore">
      <ul class="mui-table-view mui-grid-view" >
          <!--数据列表-->
          <div class="timer mui-content-padded"  v-for="(key,index) in lastshowData" :key='index'>
            <h5 class="titlesl">{{index}}</h5>
            <p v-for="child in key" class="mui-card">{{child.CONTENT}}</p>
          </div>
      </ul>
      </mt-loadmore>
  </div>
</template>

<style scoped>
  .temp2{
    margin-top: 44px;
  }

  .mui-bar-nav{
   /*padding-top: 20px;*/
    height:44px;
    position: fixed;
    left: 0;
    top:0;
    z-index: 100;
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
    font-family:PingFangSC-Regular;
    /*background:rgba(235,55,35,1);*/
    border-radius: 1px ;
    vertical-align: middle;
    line-height:1rem;
  }

  .temp2 .mui-pull-left{
    font-size:0.94rem !important;

    color:rgba(235,55,35,1);
    line-height:1rem;
    z-index: 2000;
    position: relative;
  }
  .temp2 .mui-pull-right{
    font-size:0.94rem !important;
    font-family:PingFangSC-Regular;
    color:rgba(235,55,35,1);
    line-height:1rem;
  }
  .titlesl{
    /*width:155px;*/
    /*height:25px;*/
    font-size:0.89rem;
    font-family:PingFangSC-Regular;
    color:rgba(136,136,136,1);
    line-height:0.83rem;
  }
  .mui-content-padded{
    text-align: center;
  }
  .mui-table-view:before{
   height: 0;
  }
  .temp2 .mui-card{
    border: 1px solid #ccc;
    box-shadow:none;
    margin-left: 0.5em;
    margin-right: 0.1em;
    padding-top:0.2em;
    line-height:2em;
    padding-left: 1em;
    padding-right: 0.2em;
    padding-bottom:0.2em;
    margin-bottom:0.2em;
    height: 5em !important;
    text-align: left;
    color:#000000;

  }
  .mui-table-view{
    background-color: transparent;
  }

</style>
<script src="../../style/js/mui.min.js"></script>
<script type="text/ecmascript-6">
  import footerP from '../../components/footer/tabBar.vue'
  import  mui from '../../style/js/mui.min.js'
  import myBus from './myBus.js';
  export default {
    data () {
      return {
        title: '消息',
        currentDate:new Date().getHours()+":"+new Date().getSeconds(),
        msgListData:[],
        count:1,
        dataList:"",
        result:{},
        lastshowData:{},
        allLoaded: false, //允许再次调用上拉函数
        isAutoFill: false, //是否自动触发下拉函数来填充满父盒子
        divHeight: 0, //父盒子合理的高度
        loading2:true,
      }
    },
    components: {
      footerP
    },
    created(){
      this.initData()
      mui.init({
        swipeBack: false //启用右滑关闭功能
      })
    },
    activated () {
//      alert(this.flag)
      this.lastshowData=""
      this.loading2=true
//      console.log(this.cookies.get('identity'));
      this.initData()
      if(document.getElementById('titler').innerHTML===this.dataTitle){
      }else{
        document.getElementById('titler').innerHTML=this.dataTitle
      }
      this.count=1;
      var url = '/CRMNewMobile/massage/typeMessageList'
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
                "depaId":this.cookies.get('dep'),
                "type":this.type,
                "pageNum":this.count++
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
            this.lastshowData=""
            this.loading2=false
            this.dataList=res.body.data.data

//         时间筛选
            this.msgListData=res.body.data.data
            this.result=null;
            this.result={};
            for(var i=0;i<this.msgListData.length;i++){
              if (this.result.hasOwnProperty(this.msgListData[i].SHOWDATE)){
                var child = this.result[this.msgListData[i].SHOWDATE];
                child.push(this.msgListData[i]);
              }else{
                var child = [];
                child.push(this.msgListData[i]);
                this.result[this.msgListData[i].SHOWDATE] = child;
              }
            }
            this.lastshowData=this.result;
//            console.log(this.lastshowData)
            this.count=2;
          },
          res => {console.log(res)}
        )
      myBus.$emit('getTabbarHeight', (h) => {
        this.divHeight = document.documentElement.clientHeight - h - this.$refs.nav.$el.offsetHeight;
      });
    },
    methods: {
      // 进行网络请求
      loadBottom() {
        //获取下一页的数据
        var url = '/CRMNewMobile/massage/typeMessageList'
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
              "depaId":this.cookies.get('dep'),
              "type":this.type,
              "pageNum":this.count++
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
            console.log(res);
            this.msgListData=res.body.data.data
            for(var i=0;i<this.msgListData.length;i++){
              if (this.result.hasOwnProperty(this.msgListData[i].SHOWDATE)){
                var child = this.result[this.msgListData[i].SHOWDATE];
                child.push(this.msgListData[i]);
              }else{
                var child = [];
                child.push(this.msgListData[i]);
                this.result[this.msgListData[i].SHOWDATE] = child;
              }
            }
            this.lastshowData=null;
            this.lastshowData=this.result;

            //如果当前数据有10条以上，返回10条，
            //否则只返回所有剩余的部分（不到10条）
            //  刚好10条的情况： 1：下一页还有数据,2:下一页没有数据（浪费一次请求)
//            if (data1.data.data.length != 10) {
//              //不会触发上拉刷新函数了
//              this.allLoaded = true;
//            }
            //通知组件的状态改变，从loadding进入pull
            this.$refs.loadmore.onBottomLoaded();
          });
      },
      //获取当前刷新状态
      handleBottomChange(s) {
//         console.log(s)
      },
      goBack(){
//        this.$router.go(-1);
        if(this.flag=="01"){
          this.$router.push("/main");
        }else if(this.flag=="02"){
          this.$router.push("/messages");
        }
      },
//      初始化 type和title
      initData() {
        this.type=this.$route.query.type
        this.dataTitle=this.$route.query.title;
        this.flag=this.$route.query.flag;
      }
    }
  }
</script>
