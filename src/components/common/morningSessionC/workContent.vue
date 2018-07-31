<template>
  <div class="style_place">
    <div class="font_s"></div>
    <span>今日工作内容</span>
    <div class="font_g">
      <p><span>营销情况</span></p>
      <p>{{mobcrmDaily.todayexamine}}</p>
      <p><span>调查进度</span></p>
      <p>{{mobcrmDaily.todaymarketing}}</p>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return {
          //mobcrmDaily:{}
        }
      },
      props:{
        mobcrmDaily:{}
      },
      created(){
        console.log("工作内容"+JSON.stringify(this.mobcrmDaily))
      }
    }

</script>
<style lang="stylus" scoped>
  .style_place{
    margin-top: .5em;
  }
  .font_s{
    display: inline-block;
    width: .2em;
    height: 1em;
    background-color: #559AEE;
    margin-top: .5em;
  }
  .font_g{
    margin-left: .3em;
  }
</style>
