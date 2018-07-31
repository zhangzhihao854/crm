<template>
    <div class="temp">
      <back-header :title="title" :flag=flag></back-header>
      <p @click="guiyuan()" style="border-top: 1px solid #E5E5E5">柜员 <span class="info"><img src="../../../static/images/ESC.png" alt=""></span></p>

    <p @click="xiaodai()">客户经理<span class="info"><img src="../../../static/images/ESC.png" alt=""></span></p>
    <p @click="fenzhongxin()">分中心负责人<span class="info"><img src="../../../static/images/ESC.png" alt=""></span></p>
    </div>
</template>

<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
    export default{
      data () {
        return {
          title: '目标达成',
          flag:'3'
        }
      },
      methods:{
        guiyuan(){
          this.$router.push("/GyList")
        },
        xiaodai(){
          this.$router.push("/Manager?date=date")
        },
        fenzhongxin(){
          this.$router.push("/Fzx")
        }
      },
      components: {
        BackHeader
      }
    }
</script>

<style scoped lang="less" src="./reachMain.less">

</style>

