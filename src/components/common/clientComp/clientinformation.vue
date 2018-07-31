<template>
  <div class="topMaincont" :style="{height:divHeight+'px'}" ref="nav">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :auto-fill="isAutoFill" ref="loadmore"
                 :top-method="loadTop" :top-all-loaded="allLoaded" @top-status-change="handleBottomChange"   class="peopleLS">
    <div class="itemStyle" v-for='(item,index) in dataText' :key='index' >
       <el-row>
          <el-col :span="2" class="first"><i><img :src="'./static/images/_s-icon_woman_pressed'+item.gender+'@3x.png'" height='20' width="20"></i></el-col>
          <el-col :span="17" class="leftCol"><span>{{item.personalName}}</span></el-col>
          <el-col :span="5" class="rightCol" >
              <i class="el-icon-arrow-right" @click="goNextPage(item.custId)"></i>
          </el-col>
       </el-row>
    </div>
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
      },
    activated(){
      myBus.$emit('getTabbarHeight', (h) => {
        this.divHeight = document.documentElement.clientHeight - h - this.$refs.nav.$el.offsetHeight;
      });

    },

      methods: {
        //获取当前刷新状态
        handleBottomChange(s) {
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
              //alert('124')
              this.$router.push("/clientCont?custId=" + custId);

          },
      }
  }
</script>

<style lang="scss" scoped>
  i{
    color:#B3B3B3;
  }
  .topMaincont{
    width: 100%;
    text-align: center;
    //margin-top: 44px;
  }
  .itemStyle{
      height: 50px;
      line-height: 50px;
      box-sizing: border-box;
      font-size: 0.88rem;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      text-align: center;
  }
  .itemStyle:last-child{
    //border-bottom:1px solid #ddd;
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
     // margin-top: 0.86rem;
      color: #B3B3B3;
      width: 100%;
      height: 50px;
      line-height: 0 !important;
    }
    span{
      color:#222;
    }
  }
  .peopleLS:first-child{
    border-top: 1px solid #ddd;
  }
 /* .topMaincont .mint-loadmore{
    width: 100%;
  }*/
</style>
