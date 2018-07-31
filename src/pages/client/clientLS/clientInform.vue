<template>
  <div class="moreInformBox">
   <!-- <div class="div">
      <input class="input" type="text" @change="onUser" placeholder="请输入客户名称" v-model="custName" @keyup.enter="handleIconClick" >
    </div>
    -->
    <!--<back-Header :flag="flag"></back-Header>-->
    <BackHeader @handleIconClick="handleIconClick" :flag="flag" class="goHeader"></BackHeader>

    <div class="clientWrap">
      <el-table v-loading="loading2"  v-show="loading" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
      <clientinformation :dataText="dataText"  @loadBottom="loadBottom" @loadTop="loadTop"></clientinformation>

    </div>
  </div>
</template>

<script type=text/ecmascript-6>
  //import BackHeader from '@/components/header/back-header'
  import BackHeader from '../../../components/header/back-header-input-client'
  import clientinformation from '@/components/common/clientComp/clientinformation'
  import  mui from '../../../style/js/mui.min.js'
  import { MessageBox } from 'mint-ui';

  export default {
    components:{
      BackHeader,
      clientinformation

    },
    data () {
      return {
        title:'活动通知下达',
        input21:'',
        input2:'',
        flag:'8',
        custName:'',
        dataText:[],
        count:0,
        Scount:0,
        prev:0,
        Sprev:0,
        loading2:true,
        loading: true,
        pageNum: 1,
        pageCount: 1
      }
    },
    //    初始化mui
    created () {
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });
    },
    activated(){
      this.count=1
      this.prev=1
      this.Scount=1
      this.Sprev=1
      /*初次进来走获取客户列表的接口*/
      if(this.$route.query.firstView==1){
        this.loading2=true,
          this.loading = true;
        this.dataText=[]
        this.getNewsListData()
        this.custName=""
      }

    },

    methods:{
     /* onUser(){
        this.Scount=1
        this.Sprev=1
      },*/
      loadBottom() {
        /*  if(this.count>=this.pageCount){
         this.count=this.pageCount
         mui.toast('已至末尾页');
         }*/
        if(this.pageNum >= this.pageCount){
          mui.toast('已至末尾页');
          return false
        }
        if(this.custName!=""){
          this.handleIconClick()
        }else{
          this.getNewsListData()
        }

      },
      loadTop() {
        /* if(this.prev<=1){
         this.prev=1
         mui.toast('已至最前页');
         return false
         }*/

        if(this.pageNum ==1){
          mui.toast('已至最前页');
          return false
        }
        // this.getNewsListDatalop()
        /*新增*/
        if(this.custName!=""){
          this.handleIconClickTop()
        }else{
          this.getNewsListDatalop()
        }
      },

      //搜索客户
      handleIconClick(username) {

        this.custName =  username;
        this.loading2=true;
        this.loading = true;
        this.dataText=[]
        /*var url = `/CRMNewMobile/client/queryPersonForCondition`*/
        var url = `/CRMNewMobile/client/queryPersonList`
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity'),
              "personalName": this.custName,
              "pageNum": this.Scount,
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          /*没有搜索到数据时，添加提示语*/
          if(res.body.data == null || res.body.data.data.length==0){
            this.loading2= false;
            this.loading = true;
            this.dataText = []
          }else{
            this.loading2= false;
            this.loading = false;
            this.dataText = res.body.data.data;

          }
          /*this.dataText = res.body.data.data;*/
          this.Scount=res.body.data.next
          this.Sprev=res.body.data.prev
          /*新增*/
          this.pageNum = res.body.data.pageNum
          this.pageCount = res.body.data.pageCount

        }).catch((error) => {
          console.log(error);
        })
      },
      handleIconClickTop() {
        var url = `/CRMNewMobile/client/queryPersonForCondition`
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity'),
              "personalName": this.custName,
              "pageNum": this.Sprev,
          },
          {
            emulateJSON:true
          }
        ).then(res => {

          if(res.body.data == null || res.body.data.data.length==0){
            this.loading2= false;
            this.loading = true;
            this.dataText = []
          }else{
            this.loading2= false;
            this.loading = false;
            this.dataText = res.body.data.data;

          }
          /*this.dataText = res.body.data.data;*/
          this.Scount=res.body.data.next
          this.Sprev=res.body.data.prev
          /*新增*/
          this.pageNum = res.body.data.pageNum
          this.pageCount = res.body.data.pageCount

        }).catch((error) => {
          console.log(error);
        })
      },
      //页面初次加载获取客户列表
      getNewsListData(){
        var url = `/CRMNewMobile/client/queryPersonList`
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity'),
              "pageNum": this.count,
              "personalName":''
          },
          {
            emulateJSON:true
          }
          /*{"identity": this.cookies.get('identity'),data:{"pageNum": this.count}}*/
        ).then(res => {
          if(res.body.data == null || res.body.data.data.length==0){
            this.loading2= false;
            this.loading = true;
            this.dataText = []
          }else{
            this.loading2= false;
            this.loading = false;
            this.dataText = res.body.data.data;
            /*新增*/
            this.pageNum = res.body.data.pageNum
            this.pageCount = res.body.data.pageCount
          }
          /*this.dataText = res.body.data.data;*/
          this.count=res.body.data.next
          this.prev=res.body.data.prev




        }).catch((error) => {
          console.log(error);
        })
      },
      getNewsListDatalop(){
        var url = `/CRMNewMobile/client/queryPersonList`
        this.$http.post(url,
          /*{"identity": this.cookies.get('identity'),data:{"pageNum": this.prev}}*/
          {
              "identity": this.cookies.get('identity'),
              "pageNum": this.prev,
              "personalName":''
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          if(res.body.data == null || res.body.data.data.length==0){
            this.loading2= false;
            this.loading = true;
            this.dataText = []
          }else{
            this.loading2= false;
            this.loading = false;
            this.dataText = res.body.data.data;
            /*新增*/
            this.pageNum = res.body.data.pageNum
            this.pageCount = res.body.data.pageCount

          }
          this.count=res.body.data.next
          this.prev=res.body.data.prev

        }).catch((error) => {
          console.log(error);
        })
      }
    }
  }
</script>

<style lang='scss'scoped>
  .clientWrap{
    margin-top: 44px;
  }
 /* .moreInformBox{
    height:100%;
    width: 100%;
    .back_text span[data-v-a2006ea4] {
      width: 6em!important;
    }
  }
  .div{
    height: 2.38rem;
    line-height: 2.38rem;
  }
  .div .el-input__inner{
    height: 1.5rem !important;
    width:13.33rem !important;
    background-color: rgba(248,249,251,1) !important;
    outline:none !important;
    margin-bottom: 0;
  }
  .div .moreInformBox [class^=el-icon-]{
    position: absolute !important;
    top:0rem !important;
    left: 10rem !important;
    z-index: 999;
  }
  .el-icon-more{
    color: #EB3723;
    position: absolute !important;
    top:0.8rem !important;
    left: 19.11rem !important;
    z-index: 999;
  }

  .input{
    position: absolute;
    top:0.43rem;
    left: 4.3rem;
    z-index: 88;
    outline:none !important;
    font-size: 0.69rem;
  }
  .split{
    border-bottom: 1px solid #ddd!important;
  }*/
</style>
