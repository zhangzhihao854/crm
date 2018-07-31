<template>
   <div class="echartheader">
    <div class='header'><span class='Sleft'>{{slides.context}}</span> <span class='Sright'><el-button type="primary"  size="small">查看详情</el-button></span></div>
   </div>
</template>

<script> 
  export default {
   components:{
    },
    data () {
  return {
       slides:{
          context:'截止2017年8月27日'
       }
      }
      },
      methods:{
       
        }
      }
  
</script>

<style scoped>
  .header{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    padding-left: 20px;
  }
  .Sright{
    float: right;
    display: block;
    position: relative;
    top:17%;
  }
</style>
