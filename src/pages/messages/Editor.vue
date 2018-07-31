<template>
  <div class="temp1"  :style="{height:divHeight+'px'}">
    <header class="mui-bar mui-bar-nav">
      <span @click="goBack()" class=" mui-icon mui-pull-left"> <img src="../../../static/images/back-arrow@2x.png" alt="">返回</span>
      <!--:to="{path:'/muban',query:{type:this.type,}}"-->
      <span  class=" mui-icon  mui-pull-right"> <span class="hanggao" @click='fhbtn()'> 编辑</span></span>
      <h1 id='titler' class="mui-title" ref="nav">{{dataTitle}}</h1>
    </header>

    <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :auto-fill="isAutoFill" ref="loadmore">
      <ul class="mui-table-view mui-grid-view"  v-for="(key,index) in lastshowData" :key='index'>
    <div class="mui-content">
      <h5 class="mui-content-padded titlesl">{{index}}</h5>
      <div class="mui-card" v-for="child in key" >
        <div class="mui-input-row mui-checkbox mui-left">
          <label>
            <input name="checkbox" class="checkipt" :value=child.CUSTID type="checkbox" >
            <div class="content-lab">
             {{child.CONTENT}}
            </div>
          </label>
        </div>
      </div>
    </div>
      </ul>
    </mt-loadmore>

    <div class="btn" >
      <!--<router-link :to="{path:'/muban',query:{type:this.type,}}">-->
        <button id='alertBtn1' type="button" class="mui-btn mui-btn-blue mui-btn-outlined" @click='fstype()'>模板</button>
      <!--</router-link>-->
      <button id='alertBtn2' type="button" class="mui-btn mui-btn-blue mui-btn-outlined" @click="value()" :disabled=this.fsdisabled>发送</button>
    </div>
  </div>
</template>

<style scoped>
.temp1{
  margin-top: 44px;
}
  .mui-table-view.mui-grid-view{
    padding: 0;
  }
.mui-checkbox input[type=checkbox]:checked:before{
  color: red;
}
.mui-popup-button.mui-popup-button-bold{
  color:red;
}
  .mui-content-padded {
    text-align: center;
  }

  .mui-input-row {
    padding-left: 1em;
    padding-bottom: 1em;
    height:6em;
    font-size: 1em;
  }
  .mui-input-group .mui-input-row {
    height:5em;
  }

.temp1 .content-lab {
    /*font-size:0.83rem !important;*/
    font-family:PingFangSC-Regular;
    color:rgba(34,34,34,1);
    line-height:1.56rem;
  }

  .checkipt {
    line-height:5rem;
  }
  .btn{
    width:100%;
    position: fixed;
    bottom: 0px;
    z-index: 99999999;
  }
  .btn button{
    width:50%;
    float: left;
    height:3.5em;
    border-radius: 0px;

  }
  #alertBtn2{
    background-color: red;
    border: 0px solid red;
    color:#fff;
  }
  #alertBtn1{
    border:none;
    border-top: 2px solid red;
    color:red;
    background-color: #fff;

  }

.mui-bar-nav{
  /*padding-top: 20px;*/
  height:44px;
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

.temp1 .mui-pull-left{
  font-size:0.94rem !important;
  color:rgba(235,55,35,1);
  line-height:1rem;
  z-index: 2000;
  position: relative;
}
.temp1 .mui-pull-right{
  font-size:0.94rem !important;
  font-family:PingFangSC-Regular;
  color:rgba(235,55,35,1);
  line-height:1rem;
}
.titlesl{

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
.mui-table-view:after{
  height: 0;
}
.temp1 .mui-card{
  margin: 0.5rem 0 !important;
  border: 1px solid #ccc;
  box-shadow:none;
  padding-top:0.2em;
  border: none;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  line-height:2em;
  padding-bottom:0.2em;
  margin-bottom:0.2em;
  height: 5.5rem !important;
  text-align: left;
  color:#000000;

}
.mui-table-view{
  background-color: transparent;
}
.mui-content{
  background-color: rgba(248, 249, 251,1);
}



</style>
<script type=text/ecmascript-6>
  import  mui from '../../style/js/mui.min.js'
  import myBus from './myBus.js';
  export default{
    data () {
      return {
        val:[],
        msgListData:[],
        count:1,
        dataList:"",
        result:{},
        lastshowData:{},
        allLoaded: false, //允许再次调用上拉函数
        isAutoFill: false, //是否自动触发下拉函数来填充满父盒子
        divHeight: 0, //父盒子合理的高度
        loading2: true,
        fsdisabled:false,
      }
    },

    created () {
        this.initData()
//mui初始化
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });

    },
    activated () {
      this.loading2=true
      this.fsdisabled=false
      this.result={};
      console.log(this.cookies.get('identity'));
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

          this.dataList=res.body.data.data

//         时间筛选
          this.msgListData=res.body.data.data
//            console.log(this.msgListData);
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
          this.loading2=false
        },
        res => {console.log(res)}
      )
      myBus.$emit('getTabbarHeight', (h) => {
        this.divHeight = document.documentElement.clientHeight - h - this.$refs.nav.$el.offsetHeight;
      });
    },

    methods:{
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
//      获取每个选中的input 的value=客户id
      getCheckBoxRes(className){
        var rdsObj   = document.getElementsByClassName(className);
        var checkVal = new Array();
        var k= 0;
        for(var i = 0; i < rdsObj.length; i++){
          if(rdsObj[i].checked==true){
            checkVal[k] = rdsObj[i].value;
            k++;
            this.val=checkVal
            console.log(this.val);
          }
        }
        return checkVal;
      },
//      点击发送传送个后台客户的id
      value(){
        this.fsdisabled=true
        this.getCheckBoxRes("checkipt")
        var type=this.type
        var custId=this.val.toString()
        var url='/CRMNewMobile/note/sendNote'
        this.$http.post(url,{
          "identity":this.cookies.get('identity'),
            "depaId":this.cookies.get('dep'),
            "type":type,
            "custId":custId
         },
          {
            emulateJSON:true
          }
         ).then(
          res=>{
            console.log(res);
            console.log(res.body.msg);
            mui.alert(res.body.msg, function() {});
            this.fsdisabled=false
          },
          res=>{
            console.log('messages出错')
            mui.alert(res.body.msg, function() {});
            this.fsdisabled=false
          }
        )
      },
//      点击模板获取短信内容，并发送type和登录身份
      fstype(){
            this.$router.push({path:'/muban',query:{type:this.type}})
      },
// 进行网络请求 获取列表数据
      goBack(){
        if(this.flag=="01"){
          this.$router.push("/main");
        }else if(this.flag=="02"){
          this.$router.push("/messages");
        }
      },
      fhbtn(){
        this.$router.go(-1)
      },
      initData() {
        this.type=this.$route.query.type
        this.dataTitle=this.$route.query.title;
        this.flag=this.$route.query.flag;
      },
    },

  }
</script>






