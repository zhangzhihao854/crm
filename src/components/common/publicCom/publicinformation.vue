<template>
  <div class="topMaincont" :style="{height: screenHeight+'px'}" ref="nav">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :auto-fill="isAutoFill" ref="loadmore"
                 :top-method="loadTop" :top-all-loaded="allLoaded" @top-status-change="handleTopChange"
                 :bottomDistance = 30  :topDistance = 30
                 class="peopleDG"
    >
    <div class="itemStyle" v-for='(item,index) in dataText' :key='index' @click="goNextPage(item.custId)">
       <el-row >
          <!--<el-col :span="2" class="first"><i></i></el-col>-->
          <el-col :span="22" class="leftCol"><span class="publickName">{{item.custName}}</span></el-col>
          <el-col :span="2" class="rightCol" >
              <i class="el-icon-arrow-right"></i>
          </el-col>
       </el-row>
    </div>
     <!-- <div style="height:13rem;"></div>-->
    </mt-loadmore>
  </div>
</template>
<script src="../../../style/js/mui.min.js"></script>

<script type="text/ecmascript-6">
  import myBus from '../../tools/myBus.js';
  export default {
      data () {
          return {
            allLoaded: false, //允许再次调用上拉函数
            isAutoFill: false, //是否自动触发下拉函数来填充满父盒子
            divHeight: 0, //父盒子合理的高度
          }
      },
      props:{
          dataText:{
              type:Array,
              default:[]
          },
        screenHeight:{
          type:Number,
          default:0
        }
      },

    mounted(){
       console.log(this.screenHeight + "屏高")
    },
    activated(){
      /*myBus.$emit('getTabbarHeight', (h) => {
        this.divHeight = document.documentElement.clientHeight - h - this.$refs.nav.$el.offsetHeight;
      });*/
    },
      methods: {
        //获取当前刷新状态
        handleBottomChange(s) {
          console.log("获取当前刷新状态");
          console.log(s)
        },
        handleTopChange(s) {
          console.log("获取当前刷新状态");
          console.log(s)
        },
        loadBottom() {
          //通知组件的状态改变，从loadding进入pull
          this.$refs.loadmore.onBottomLoaded();
//        var count=1
          //获取下一页的数据
          this.$emit("loadBottom");
        },
        loadTop(){
          //通知组件的状态改变，从loadding进入pull
          this.$refs.loadmore.onTopLoaded();
//        var count=1
          //获取下一页的数据
          this.$emit("loadTop");
        },

          goNextPage(custId){
              console.log(custId)
              this.$router.push("/publicCont?custId=" + custId);
          }
      }
  }
</script>

<style lang="scss" scoped>
  i{
    color:#B3B3B3;
  }
  .topMaincont{
   /* height:auto;
    height:100%;*/
    width: 100%;
    text-align: center;
   /* position:fixed;
    top:2.83rem;
    left:0;*/
  }
  .itemStyle{
      height: 50px;
      line-height: 50px;
      box-sizing: border-box;
      font-size: 0.88rem;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
  }
  .itemStyle:last-child{
    border-bottom:1px solid #ddd;
  }
  .first i img{
    vertical-align: middle;
    margin-left:10px;
    margin-right:10px;
  }
  .leftCol{
    text-align:left;
    padding-left:15px;
    span{
      color:#555;
    }
  }
  .rightCol{
    text-align:right;
    padding-right:15px;
    height: 50px;
    .el-icon-arrow-right{
      width: 100%;
      height: 50px;
      margin-top: 0.86rem;
     color: #B3B3B3;
    }
    span{
      color:#222;
    }
  }
  .topMaincont .leftCol[data-v-7ee04e85]{
    white-space: nowrap !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .peopleDG:first-child{
    border-top: 1px solid #ddd;
  }
</style>
