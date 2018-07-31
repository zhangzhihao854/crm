
<template>
  <div class="tab">
    <div class="tab-item">
      <router-link :to="{path: '/main'}">

        <!--<router-link class="mui-tab-item" to="/main" >-->
        <span class="mui-icon mui-icon-home">
          <!--<img class="mui-icon-home" src="../../../static/images/tabbar_icon_home_default.png" alt="">-->
        </span>
        <span class="mui-tab-label">首页</span>
      </router-link>
    </div>
    <div class="tab-item">
      <router-link :to="{path: '/messages'}">
        <span class="mui-icon mui-icon-email">
        </span>
        <span class="mui-tab-label">消息</span>
      </router-link>
    </div>
    <div class="tab-item">
      <router-link :to="{path: '/clients'}">
        <span class="mui-icon mui-icon-person"></span>
        <span class="mui-tab-label">客户</span>
      </router-link>

     <!-- <span @click="quanxian" style="font-size: 0.7em">
        <span class="mui-icon mui-icon-person"></span>
        <span class="mui-tab-label">客户</span>
      </span>-->
    </div>
    <div class="tab-item">
      <router-link :to="{path: '/myplugin'}">
        <span class="mui-icon mui-icon-gear"></span>
        <span class="mui-tab-label">我的</span>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import mui from '../../style/js/mui.min.js'
  export default {

    activated () {
//mui初始化
      mui.init({
        swipeBack: false //启用右滑关闭功能
      });

    },
    methods:{
      quanxian(){
        mui.alert('亲，该功能暂未开放，敬请期待哦！')
      },
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .mui-icon-home:before{
    /*content: "";*/
  }
  .mui-icon-home{
    /*background: url("../../../static/images/tabbar_icon_home_default.png") no-repeat center;*/
  }
  span{
    display: block;
   padding: 0;
    /*color:none;*/
  }

  .tab{
    display: flex;
    /*position: absolute;*/
    position: fixed;
    //margin-top:2em;
    //margin-bottom: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    /*height: 8vh;*/
    /*line-height: 8vh;*/
    background: #F8F8F8;
    border-top: 1px #B2B2B2 solid;
    z-index: 888;
  }

  .tab-item{
    flex: 1;
    text-align: center
  }

  a{
        display: block;
        font-size: 0.7em;
        color: rgb(77, 85, 93)
      }

  .mui-active{
     color: rgb(240, 20, 20);
   }

</style>
