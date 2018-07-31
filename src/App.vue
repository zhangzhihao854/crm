<template>
  <div id="app">
    <!--<div></div>-->
    <transition name="el-fade-in-linear">
      <keep-alive>
         <router-view ></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script type=text/ecmascript-6>
 $(document).on("touchend",function(event){

 if(event.target.nodeName!="LI"){

 $(".el-picker-panel").css("display","none");

 }else if(event.target.id=='input'){ }
   $(".el-picker-panel").css("display","block");
 });

import  mui from './style/js/mui.min.js'
export default {
  name: 'app',
  data (){
    return {
       initData :"hello",
    }
   },
  activated(){
    mui.init({
      swipeBack: false //关闭右滑关闭功能
    });
    this.hideKeyboard()
  },
    created(){
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });
    },
  methods:{
    clickApp(){
      alert("app");
      document.activeElement.blur();
    },
//    点击空白处 关闭 软键盘
    hideKeyboard(){
      console.log("我失去焦点了--APPvue")
      document.activeElement.blur();
      $("input").blur();
    }
  },

}
</script>
<style lang="scss">
  @import "./style/common";
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
  #app{
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select:none;
    user-select: none;
  }
</style>
