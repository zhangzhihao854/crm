<template>
  <div class="calendar_content">
    <input type="text" @keyup.enter="getSearch()" v-model="userName" placeholder="请输入客户经理名称">
  </div>
</template>

<script>
  export default {
    data(){
      return {
        userName:''
      }
    },
    methods:{
      getSearch (){
        this.$emit('getSearch',this.userName)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .calendar_content{
    width: 100%;
    /*height: 3em;*/
    background-color: #fff;
    margin-top: 3em;
  }
  ul{
    list-style: none;
  }
</style>
