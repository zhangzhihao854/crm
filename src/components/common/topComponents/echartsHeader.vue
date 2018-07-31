<template>
   <div class="echartheader" >
    <div class='header'>
      <span class='Sleft'>截止{{currenttime[0]}}年{{currenttime[1]}}月{{currenttime[2]}}日</span>
      <span class='Sright'><el-button type="primary"  size="small" @click='goEcharts'>查看详情</el-button></span>
    </div>
   </div>
</template>

<script>
  export default {
   components:{
    },
    data () {
       return {
          slides:{
//          context:'截止2017年8月27日'
         }
        }
      },
    props: {
      currenttime: {
        type: Array,
        default: []
      },
    },
    activated(){

    },
      methods:{
       goEcharts(){
        this.$emit('goechartbox')
       }
        }
      }

</script>

<style scoped>
  .header{
    width: 100%;
    height: 38px;
    line-height: 38px;
    /*font-size: 14px;*/
    padding-left: 0.9rem;
    margin-top: 0.8rem;
  }
  .Sright{
    float: right;
    display: block;
    position: relative;
    top:17%;
    right:5%;
    height: 23px ;
  }
  .echartheader .Sleft{
    font-size: 0.8rem !important;
    font-family:PingFangSC-Regular;
    color:rgba(34,34,34,1);
  }
  .echartheader .el-button--small, .el-button--small.is-round{
    padding: 0 !important;
    font-size:0.72rem;
    font-family:PingFangSC-Medium;
    color:rgba(255,255,255,1);
  }
  .el-button--mini, .el-button--small{
    width: 4.66rem;
    height: 1.25rem;
    line-height: 0rem;
  }

</style>
