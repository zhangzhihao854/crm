<template>
  <div class="cardWrap" :style="{height:divHeight+'px'}" ref="nav">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :auto-fill="isAutoFill" ref="loadmore"
                 :top-method="loadTop" :top-all-loaded="allLoaded" @top-status-change="handleBottomChange"
    >
    <el-collapse v-model="activeNames" v-for="(list,index) in userDG" :key="index">
       <el-collapse-item :title=list.custName>
          <router-link :to="{path:'/seeCustomer',query:{id: list.custId,clintflag:clientflag}}">
            <div>
              <span class="tit1">潜在客户编号：</span>
              <span class="value1">{{list.custId}}</span>
            </div>
            <div>
              <span class="tit1">证件类型:</span>
              <span class="value1">{{list.identType}}</span>
            </div>
            <div>
              <span class="tit1">证件号码:</span>
              <span class="value1">{{list.identNo}}</span>
            </div>
          </router-link>
       </el-collapse-item>
    </el-collapse>
    </mt-loadmore>
  </div>
</template>

<script>
  import myBus from '../../../components/tools/myBus';
  export default {
    props: ['userDG'],
    data() {
      return {
        activeNames: ['1'],
        /*分页*/
        allLoaded: false, //允许再次调用上拉函数
        isAutoFill: false, //是否自动触发下拉函数来填充满父盒子
        divHeight: 0, //父盒子合理的高度
        clientflag:'clientflag'
      };
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

    }
  }
</script>

<style lang="scss" scoped>
.cardWrap{
/*  border-top: 0.66rem solid #F8F9FB;*/
}


</style>
