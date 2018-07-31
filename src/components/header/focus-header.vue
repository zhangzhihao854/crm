<template>
  <div class="focus1">
    <header class="focusHeader">
      <a href="##">
        <img src="../../../static/images/back-arrow@2x.png" alt="返回">
        <span class="back">返回</span>
      </a>
      <span class="fTit">客户信息</span>
      <span class="hideBtn"> > </span>
      <!--<div class="mask">
        <div class="container" v-show="showMe">
          <div class="tit">客户基础信息</div>
          <div class="tit">客户业务信息</div>
          <div class="tit">客户价值信息</div>
          <div class="tit">销售服务信息</div>
        </div>
      </div>-->
    </header>
  </div>
</template>
<script>

  export default {
      data(){
          return{
            showMe: false
          }
      },
    methods: {

    }

  }
</script>

<style scoped>
/*设置头部样式*/
.focus1 .focusHeader{
  position: fixed;
  left: 0;
  top:0;
  width: 100%;
  height: 44px;
  background:rgba(255,255,255,1);
}
.focus1 .focusHeader a{
  text-decoration: none;
  text-align: center;
  line-height: 44px;
}
.focus1 .focusHeader img{
  width: 0.61rem;
  height: 1.16rem;
  margin-left: 0.86rem;
  vertical-align: middle;
}
.focus1 .focusHeader .back{
  font-size:1rem;
  font-family:PingFangSC-Regular;
  color:rgba(235,55,35,1);
  padding-left: 0.2rem;
}
.focus1 .focusHeader .fTit{
  margin-left: 4.25rem;
  font-size:1rem;
  font-family:PingFangSC-Regular;
  color:rgba(17,17,17,1);
}
.focus1 .focusHeader .hideBtn{
  font-size: 1.2rem;
  color:rgba(68,68,68,1);
  padding-left: 0.2rem;
}
.focus1 .focusHeader .container{
  width: 100%;
  z-index: 2000;
}
.focus1 .focusHeader .container .tit{
  border-top: 1px solid #E2E2E2;
  width: 100%;
  height: 2.72rem;
  background:rgba(255,255,255,1);
  text-align: center;
  line-height: 2.72rem;
  z-index: 2000;
}


</style>
