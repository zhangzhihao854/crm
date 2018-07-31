<template>
  <div class="wrap">
   <!-- <addInputHeader @getSearchName="getSearchName" :isManage="isManage"></addInputHeader>-->
    <!--头部-->
    <div class="temp1">
      <header class="mui-bar mui-bar-nav">
        <span @click="goClientPage" class=" mui-icon mui-pull-left"> <img src="../../../../static/images/back-arrow@2x.png" alt="">返回</span>
        <input class="searchText" type="text" placeholder="请输入查询条件" v-model="searchName" @keyup.enter="getSearchNameData">
        <router-link v-show="isManage" :to="{path: '/customerInput', query: {flag: 'clientQianzai'}}">
          <span class="addBtn">+</span>
        </router-link>
      </header>
    </div>
    <!--Tab切换-->
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
    <!--列表-->
    <clientCardLS v-show="isActive" :userLS="userLS" @loadBottom="loadBottom" @loadTop="loadTop"></clientCardLS>
    <clientDG v-show="isClick" :userDG="userDG" @loadBottom="loadBottom" @loadTop="loadTop"></clientDG>
  </div>
</template>

<script type=text/ecmascript-6>
  import myBus from '../../../components/tools/myBus';
  import  mui from '../../../style/js/mui.min'
  //import addInputHeader from '../../../components/header/add-input-header.vue'
  import clientCardLS  from './clientCardLS.vue'
  import clientDG from './clientCardDG.vue'
  import { MessageBox } from 'mint-ui';
  export default{
    data() {
      return {
        activeName: 'first',
        userLS: [],
        userDG: [],
        searchName: '',
        isActive: true,
        isClick: false,
        /*用来区别是对公，还是零售*/
        mark:'a',
        /*零售分页数据*/
        flag: '2',
        count: 1,
        next: 1,
        Snext:1,
        Sprev:1,
        prev:1,
        Scount:1,
        pageCount: 1,
        SpageCount: 1,
        /*对公分页数据*/
        count_dg: 1,
        next_dg: 1,
        Snext_dg:1,
        Sprev_dg:1,
        prev_dg:1,
        Scount_dg:1,
        pageCount_dg: 1,
        SpageCount_dg: 1,
        /*判断是不是客户经理*/
        isManage: false,
        peopleType: '',
        loading2:true,
        loading: true,

        /*判断最前页最后也参数*/
        pageNum1: 1,
        pageNum2: 1,
        pageNum3: 1,
        pageNum4: 1,

      };
    },
    activated(){
      this.loading2=true,
      this.loading=true,
      this.searchName=""
      this.mark = 'a'
      this.isClick = false
      this.isActive = true
      this.userLS  = []
      this.userDG = []
      this.isManage = false
      this.getLS()
      this.getDG()
      //初始化pageNum
      this.pageNum1 = 1
      this.pageNum2 = 1
      this.pageNum3 = 1
      this.pageNum4 = 1

      this.count = 1
      this.count_dg  = 1
      this.Scount = 1
      this.Scount_dg = 1
    },
    //    初始化mui
    created () {
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });
    },
    methods: {
      /*点击对公，零售切换样式及内容*/
      changeColor(){
        this.mark = 'b'
        this.userDG  = []
        this.isClick = true
        this.isActive = false
        /*初始化pageNum*/
        this.count_dg = 1;
        this.Scount_dg = 1;
        /*请求对公的数据*/
        if(this.searchName!=""){
          this.getDGName()
        }else{
          this.getDG()
        }

      },
      toggleShow(){
        this.mark = 'a'
        this.userLS = []
        this.isClick = false
        this.isActive = true
        /*初始化pageNum*/
        this.count = 1;
        this.Scount = 1;
        if(this.searchName!=""){
          this.getLSName()
        }else{
          this.getLS()
        }

      },
      /*点击返回按钮——返回客户模块首页*/
      goClientPage(){
        this.$router.push('/clients')
        this.searchContent = ''
      },
      /*点击头部加号，跳转至工作日报，潜客录入界面*/
      goQianke(){
        this.$router.push('/customerInput')
      },

      /*获取零售信息，首次请求*/
      getLS(){
        this.loading2=true
        this.loading=true

        var url = `/CRMNewMobile/broker/queryBroker`;
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity'),
              "pageNum": this.count,
              "flag": 2
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          if(res.body.data.data== null  || res.body.data.data.length==0){
            this.loading2=false
            this.loading=true
          }else{
            this.loading2=false
            this.loading=false
          }
          //this.mark = 'a'
          this.flag = '2'
          this.next=res.body.data.next
          this.prev=res.body.data.prev
          this.pageCount = res.body.data.pageCount
          this.pageNum2 = res.body.data.pageNum
          this.userLS = res.body.data.data
          //判断是否是客户经理角色
          this.peopleType = res.body.data.peopleType
          if(this.peopleType == 1){
            this.isManage = true
          }else{
            this.isManage = false
          }

        }).catch((error) => {
          console.log(error);
        })
      },
      /*获取对公信息，首次请求*/
      getDG(){
        this.loading2=true
        this.loading=true
        var url = `/CRMNewMobile/broker/queryBroker`;
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity'),
              "pageNum": this.count_dg,
              "flag": 1
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          if(res.body.data.data== null  || res.body.data.data.length==0){
            this.loading2=false
            this.loading=true
          }else{
            this.loading2=false
            this.loading=false
          }
          //this.mark = 'b'
          this.flag = '1'
          this.next_dg = res.body.data.next
          this.prev_dg = res.body.data.prev
          this.pageCount_dg = res.body.data.pageCount
          this.pageNum1 = res.body.data.pageNum
          this.userDG = res.body.data.data
          //判断是否是客户经理角色
          this.peopleType = res.body.data.peopleType
          if(this.peopleType == 1){
            this.isManage = true
            //alert(this.isManage)
          }else{
            this.isManage = false
          }
        }).catch((error) => {
          console.log(error);
        })
      },
      /*获取搜索框的内容*/
      getSearchNameData(){
        if(this.mark == 'a'){
          this.getLSName()
          console.log(this.mark)
        }else if(this.mark == 'b'){
          this.getDGName()
          console.log(this.mark)
        }

      },
      /*模糊查询零售信息*/
      getLSName(){
        this.loading2=true
        this.loading=true
        this.userLS=[]
        var url = `/CRMNewMobile/broker/queryBrokerBySearch`;
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity'),
              "pageNum": this.Scount,
              "flag": 2,
              "custName":this.searchName
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          this.flag = '4'
//          if(res.body.data.data.length == 0){
//            MessageBox.alert('亲，没有找到相关数据！').then(action => {
//              this.userLS = ''
//              return false
//            });
//          }
          /*清空输入框内容*/
          if(this.searchName != ""){
            this.searchName = ""
          }

          if(res.body.data.data== null  || res.body.data.data.length==0){
            this.loading2=false
            this.loading=true
            this.userLS=[]
          }else{
            this.loading2=false
            this.loading=false
            this.userLS= res.body.data.data
          }

          this.Snext=res.body.data.next
          this.Sprev=res.body.data.prev
          this.SpageCount = res.body.data.pageCount
          this.pageNum4 = res.body.data.pageNum

        }).catch((error) => {
          console.log(error);
        })
      },
      /*模糊查询对公信息*/
      getDGName(){
        this.loading2=true
        this.loading=true
        this.userDG =[]
        var url = `/CRMNewMobile/broker/queryBrokerBySearch`;
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity'),
              "pageNum": this.Scount_dg,
              "flag": 1,
              "custName":this.searchName
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          /*清空输入框内容*/
          if(this.searchName != ""){
            this.searchName = ""
          }

          if(res.body.data.data== null  || res.body.data.data.length==0){
            this.loading2=false
            this.loading=true
            this.userDG =[]
          }else{
            this.loading2=false
            this.loading=false
            this.userDG = res.body.data.data
          }
          this.flag = '3'

          this.Snext_dg = res.body.data.next
          this.Sprev_dg = res.body.data.prev
          this.SpageCount_dg = res.body.data.pageCount
          this.pageNum3 = res.body.data.pageNum

          console.log(this.userDG)
        }).catch((error) => {
          console.log(error);
        })
      },
      //产品列表传来的下拉刷新一页，让count+1
      loadBottom() {
        /*零售*/
        if(this.flag == '2'){
          this.count= this.next

          this.userLS=[]
          this.getLS()
          if(this.pageNum2 == this.pageCount){
            mui.toast('已至最后页');
          }
        }else if(this.flag =='4'){
          this.Scount=this.Snext

          this.userLS=[]
          if(this.pageNum4 == this.SpageCount){
            mui.toast('已至最后页');
          }
          this.getLSName()
        }
        /*对公*/
        if(this.flag == '1'){
          this.count_dg= this.next_dg

          this.userDG =[]
          if(this.pageNum1 == this.pageCount_dg){
            mui.toast('已至最后页');
          }
          this.getDG()
        }else if(this.flag =='3'){
          this.Scount_dg = this.Snext_dg

          this.userDG =[]
          if(this.pageNum3 == this.SpageCount_dg){
            mui.toast('已至最后页');
          }
          this.getDGName()
        }
      },
     /*上/下拉分页操作*/
      loadTop(){
        /*零售*/
        if(this.flag == '2'){
          this.count = this.prev

          this.userLS=[]
          if(this.pageNum2 == 1){
            mui.toast('已至最前页');
          }
          this.getLS()
        }else if(this.flag =='4'){
          this.Scount=this.Sprev

          this.userLS=[]
          if(this.pageNum4 == 1){
            mui.toast('已至最前页');
          }
          this.getLSName()
        }
        /*对公*/
        if(this.flag == '1'){
          this.count_dg = this.prev_dg

          this.userDG =[]

          if(this.pageNum1 == 1){
            mui.toast('已至最前页');
          }
          this.getDG()

        }else if(this.flag =='3'){
          this.Scount_dg = this.Sprev_dg

          this.userDG =[]
          if(this.pageNum3 == 1){
            mui.toast('已至最前页');
          }
          this.getDGName()
        }
      },

    },

    components: {
      //addInputHeader,
      clientCardLS,
      clientDG
    }
  }
</script>

<style lang="scss" scoped>
  /*设置头部样式*/
  .temp1{
    height: 44px;
    background:rgba(255,255,255,1) !important
  }
  .mui-bar-nav{
    position:fixed;
    top:0;
    height:44px;
    box-shadow:none;
    background:rgba(255,255,255,1);
    border-bottom: 1px solid #e5e5e5;
  }
  .mui-bar-nav .mui-title{
    font-size:1rem;
    font-family:PingFangSC-Regular;
    color:rgba(17,17,17,1);
    line-height:3rem;
  }

  .mui-bar-nav img{
    width:0.62rem;
    /*height:1.17rem;*/
    /*font-family:PingFangSC-Regular;*/
    /*background:rgba(235,55,35,1);*/
    border-radius: 1px ;
    vertical-align: middle !important;
    line-height:2rem;
  }

  .temp1 .mui-pull-left{
    font-size:0.94rem !important;
    /*font-family:PingFangSC-Regular;*/
    color:rgba(235,55,35,1);
    line-height:2rem;
    z-index: 2000;
    position: relative;
  }
  .temp1 .mui-pull-right{
    font-size:0.94rem !important;
    font-family:PingFangSC-Regular;
    color:rgba(235,55,35,1);
    line-height:1rem;
  }
  .temp1 .mui-bar{
    position: relative;
  }
  .searchText{
    width: 12rem;
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
  .mui-bar .addBtn{
    position: absolute;
    right: 1rem;
    bottom: 0.75rem;
    width:1.05rem;
    height:1.05rem;
    color: rgba(235,55,35,1);
    font-size: 1.5rem;
  }
  .temp1 .mui-bar .mui-icon{
    padding-bottom: 0 !important;
  }
  /*列表样式*/
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

</style>
