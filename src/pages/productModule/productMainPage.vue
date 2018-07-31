<template>
  <div class="mainProductBox">
    <back-Header :title="title" :flag="'3'"></back-Header>
    <div class="contBox">
      <div class="cont1">
        <productAll @changecolor="changecolor" @pagego='gopage' :protypeproduce="protypeproduce" @timmer="timmer"></productAll>
      </div>
    </div>
    <div class="zzc" v-show='isShow' @click="changecolor"></div>
    <div class="leixing"  ><productLeixing v-show='isShow' @gouxuan="gouxuan"></productLeixing></div>
    <!--loading-->
    <div style="margin-top:60px;">
      <el-table v-loading="loading2"  v-show="loading" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
    </div>

    <!--@loadTop="loadTop"-->
    <!--点击 筛选的确定按钮  让 原数据 隐藏 新筛选出来的数据 展现-->
    <productMore  :solids="Bigsolids" @loadBottom="loadBottom"></productMore>
    <producFliter v-show='zhanxian' @pagexiao='pagexiao' @postProductKey="postProductKey"></producFliter>
  </div>
</template>

<script type="text/ecmascript-6">
  import myBus from '../../components/tools/myBus.js';
  import BackHeader from '@/components/header/back-header'
  import footerP from '../../components/footer/tabBar.vue'
  import productAll from '@/components/common/productComponents/productAll'
  import productLeixing from '@/components/common/productComponents/productLeixing'
  import producFliter from '@/components/common/productComponents/producFilter'
  import productMore from '@/components/common/productComponents/productMore'
  //import productMorefilter from '@/components/common/productComponents/productMorefilter'
  import  mui from '../../style/js/mui.min.js'
  import { MessageBox } from 'mint-ui'
  export default {
    components:{
      BackHeader,
      productAll,
      productLeixing,
      productMore,
//      productMorefilter,
      producFliter,
      footerP,


    },
    data(){
      return {
        title:'产品',
        isShow:false,
        zhanxian:false,
        MoreShow:true,
        MoreFiltershow:false,
        Morefilterlist:[],
        count:0,
        allLoaded: false, //允许再次调用上拉函数
        isAutoFill: false, //是否自动触发下拉函数来填充满父盒子
        divHeight: 0, //父盒子合理的高度
        solids:[],
        Bigsolids:[],
        protypeproduce:"全部类型",
        timer:"",
        loading2:true,
        loading:true,
        pageCount:0,
        pronexprv:0,
      }
    },
//    初始化mui
    created () {
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });
    },
    activated(){
      this.loading2=true
      this.loading=true

      this.protypeproduce="全部类型"
      this.Morefilterlist=[]
      this.isShow=false
      this.MoreFiltershow=false
      this.MoreShow=true
      if(this.$route.query.date=="product"){
        this.solids=[]
        this.Bigsolids=[]
        this.$store.state.produceMultiSel={}
        this.$store.state.produceMultiSel.dataDesc=""
        this.count=1
        this.getidQueryProduct()
        this.count=2
      }
    },
    methods:{
//时间排序需要传的参数
      timmer(){
        this.Bigsolids=[]
        if(this.timer==""){
          this.timer="desc"
        }else if(this.timer=="desc"){
          this.timer=""
        }
        this.$store.state.produceMultiSel.dataDesc=this.timer
        this.count=1
        this.getidQueryProduct()
      },
//页面一上来 走的接口count++
      getidQueryProduct(){
        this.loading2=true
        this.loading=true
        var params  =  this.$store.state.produceMultiSel;
        params.pageNum=this.count++;
        params.size="10";
        var url= `/CRMNewMobile/product/getProduct`
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
            "data": JSON.stringify(params)
          },
          {
            emulateJSON:true
          },
          {_timeout:30000}
        ).then(
          res => {
            if(res.body.data.data.length==0){
              this.loading2=false
              this.loading=true
            }else{
              this.loading2=false
              this.loading=false
            }

            this.solids=res.body.data.data
            this.Bigsolids=this.Bigsolids.concat(this.solids);

            this.pronexprv=res.body.data.next
            this.pageCount=res.body.data.pageCount
            this.solids.map(function(item){
              switch(item.catlName){
                case '银行卡':
                  item.aliasName="blankCard";
                  break;
                case '存款':
                  item.aliasName="Income";
                  break;
                case '贷款':
                  item.aliasName="Loan";
                  break;
                case '代理':
                  item.aliasName="Agent";
                  break;
                case '其他':
                  item.aliasName="Other";
                  break;
              }
            });
          },
          res => {
            MessageBox('提示', '亲，当前服务器网络不佳，请您稍后再试~');
          }
        )
      },
//      count-- 上载
//      getidQueryProducttop(){
////        this.count<=2?2:this.count
//        if(this.count<=2){
//          this.count=2
//          mui.toast('已至最前页');
//        }
//        this.loading2=true
//        this.count--
//        var params  =  this.$store.state.produceMultiSel;
//        params.pageNum= this.count;
//        params.size="10";
////        alert(this.count)
////        alert("params.pageNum"+params.pageNum)
//        var url= `/CRMNewMobile/product/getProduct`
//        this.$http.post(url,
//          { "identity":this.cookies.get('identity'),
//            "data":params
//          }
//        ).then(
//          res => {
//            this.loading2=false
//            this.solids=res.body.data.data
//            console.log(this.solids);
//            this.pageCount=res.body.data.pageCount
//            this.solids.map(function(item){
//              switch(item.catlName){
//                case '银行卡':
//                  item.aliasName="blankCard";
//                  break;
//                case '存款':
//                  item.aliasName="Income";
//                  break;
//                case '贷款':
//                  item.aliasName="Loan";
//                  break;
//                case '代理':
//                  item.aliasName="Agent";
//                  break;
//                case '其他':
//                  item.aliasName="Other";
//                  break;
//              }
//            });
//          },
//          res => {
//            console.log(res)
//          }
//        )
//      },
//      产品列表传来的下拉刷新一页，让count+1
      loadBottom() {
//        alert(this.pronexprv+1)
//        alert(this.pageCount)
        if(this.pronexprv>=this.pageCount){
          this.count=this.pageCount
          mui.toast('已至末尾页');
          return false
        }
        this.getidQueryProduct()
      },
//      产品列表传来的上拉刷新一页，让count—1
//      loadTop() {
//
//        this.getidQueryProducttop()
//      },

//      产品类型 勾选之后筛选条件接口
      gouxuan(value){
        this.solids=[]
        this.Bigsolids=[]
//        选择其中一个类别之后 折叠起下拉框
        this.isShow=!this.isShow;
        console.log("fu"+value);
        this.protypeproduce=value
        this.$store.state.produceMultiSel.prodName = value;
        this.count=1
        this.getidQueryProduct()
      },

      changecolor(){
        this.isShow=!this.isShow;
      },
//      筛选子组件传来的点击事件，让筛选面消失
      pagexiao(){
        if (this.zhanxian=false) {
          this.zhanxian=false;
        }else{
          this.zhanxian=false;
        }
      },

      gopage(){
        this.zhanxian=true;
      },
      /**
       * 功能描述
       * @param data
       */

      postProductKey(data){
        this.Bigsolids=[]
        this.loading2=true
        this.loading=true
        this.pagexiao()
        this.MoreFiltershow=true
        this.MoreShow=false
        var params  =  this.$store.state.produceMultiSel;
        params.pageNum="1";
        //params.size="10";
        var url='/CRMNewMobile/product/getProduct'
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
            "data":JSON.stringify(params)
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          if(res.body.data.data.length==0){
            this.loading2=false
            this.loading=true
          }else{
            this.loading2=false
            this.loading=false
          }
          this.solids=res.body.data.data
          this.Bigsolids=this.Bigsolids.concat(this.solids);
          this.pageCount=res.body.data.pageCount
          this.solids.map(function(item){
            switch(item.catlName){
              case '银行卡':
                item.aliasName="blankCard";
                break;
              case '存款':
                item.aliasName="Income";
                break;
              case '贷款':
                item.aliasName="Loan";
                break;
              case '代理':
                item.aliasName="Agent";
                break;
              case '其他':
                item.aliasName="Other";
                break;
            }
          });
          console.log(this.solids);
          console.log(this.Bigsolids);

        }).catch(function(res){
          console.log(res)

        });
      },


    }
  }
</script>
<style scoped lang='scss' scoped>
  .contBox{
    position:fixed;
    top:44px;
    width: 100%;
    z-index: 999;
  }
  .zzc{
    position: absolute;
    top:5.5rem;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
    z-index: 999;
  }
  .mainProductBox{
    background: rgb(248,249,251);
    width: 100%;
    height: 100%;
    position:relative;
    .leixing{
      z-index: 999;
    }

  }
  .mainProductBox .oneproject[data-v-2597e95a]{
    position: absolute;
    top: 110px !important;
    left: 0px;
  }

</style>
