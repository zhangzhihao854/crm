<template>
    <div class="temp">
      <header class="mui-bar mui-bar-nav">
        <h3 id='titler' class="mui-title" ref="nav">{{dataTitle}}</h3>
        <span @click="goBack()" class=" mui-icon mui-pull-left"> <img src="../../../static/images/back-arrow@2x.png" alt="">&nbsp返回</span>
        <router-link  :to="{path:'/editor',query:{type:this.type,title:this.dataTitle}}" class="mui-icon  mui-pull-right"> 编辑 </router-link>
      </header>
    </div>
</template>

<style scoped>

</style>

<script type=text/ecmascript-6>
    export default{
      props:['dataTitle',""],
      methods:{
        goBack(){
          this.$router.go(-1)
        }
      }
    }
</script>

