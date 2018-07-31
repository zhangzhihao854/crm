<template>
  <div>
    <div class="font_s"></div>
    <span>今日工作计划</span>

    <div class="font_g" >
      <p style="color:#555;font-size: 16px;">上午计划</p>
      <p style="color:#222;font-size: 16px;">{{mobcrmDaily.morniplan}}</p>
      <!--一下注释代码为一行展示不全，省略号结尾，点击可以有个消息框展示全部-->
      <!--<el-tooltip-->
        <!--:content="mobcrmDaily.morniplan"-->
        <!--placement="bottom"-->
        <!--effect="light"-->
        <!--offset="0"-->
        <!--transition="el-fade-in-linear">-->
        <!--<p class="textLimit">{{mobcrmDaily.morniplan}}</p>-->

      <!--</el-tooltip>-->

      <p style="color:#555;font-size: 16px;">下午计划</p>
      <p style="color:#222;font-size: 16px;">{{mobcrmDaily.afternoplan}}</p>
    </div>
    <div class="font_s"></div>
    <span>今日工作内容</span>
    <div class="font_g">
      <p style="color:#555;font-size: 16px;">营销情况</p>
      <p style="color:#222;font-size: 16px;">{{mobcrmDaily.todaymarketing}}</p>
      <p style="color:#555;font-size: 16px;">调查进度</p>
      <p style="color:#222;font-size: 16px;">{{mobcrmDaily.todayexamine}}</p>
    </div>
  </div>
</template>

<script type=text/ecmascript-6>
  export default {
    data(){
      return {
      }
    },
    props:{
      mobcrmDaily:{
        type:Object,
        default:{}
      }
    },
    activated(){

    },

  }
</script>
<style lang="stylus" scoped>
  .font_s{
    display: inline-block;
    width: .2em;
    height: 1em;
    background-color: #559AEE;
  }
  .font_g{
    margin-left: .3em;
  }
  .font_g{
    font-size:16px !important;
  }
  .textLimit{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
