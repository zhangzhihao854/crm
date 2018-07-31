<template>
  <div class="cardWrap" :style="{height:divHeight+'px'}" ref="nav">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :auto-fill="isAutoFill" ref="loadmore"
                 :top-method="loadTop" :top-all-loaded="allLoaded" @top-status-change="handleBottomChange"
    >
    <el-collapse v-model="activeNames" v-for="(user,index) in userData" :key="index">
      <el-collapse-item :title=user.custName>
        <div>
          <span class="tit1">客户编号:</span>
          <span class="value1">{{user.custId}}</span>
        </div>
        <div>
          <span class="tit1">证件类型:</span>
          <span class="value1">{{user.identType}}</span>
        </div>
        <div>
          <span class="tit1">证件号码:</span>
          <span class="value1">{{user.identNo}}</span>
        </div>
    </el-collapse-item>
    </el-collapse>
      </mt-loadmore>
  </div>
</template>

<script>
  import myBus from '../../../components/tools/myBus.js';
  export default {

    props: {
      userData:{
        type:Array,
        default:[]
      }
    },
    data() {
      return {
        activeNames: ['1'],
        allLoaded: false, //允许再次调用上拉函数
        isAutoFill: false, //是否自动触发下拉函数来填充满父盒子
        divHeight: 0, //父盒子合理的高度
      };
    },
    activated(){
      myBus.$emit('getTabbarHeight', (h) => {
        this.divHeight = document.documentElement.clientHeight - h - this.$refs.nav.$el.offsetHeight;
    });

    },

    methods:{
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

    }
  }
</script>

<style lang="scss" scoped>
.cardWrap{

}

</style>
