<template>
  <!--主管会计-->
   <div class="toMainHeader">
   <back-Header :title="title"></back-Header>
   <div class="calendar_content">
    <timeComp :isRed="true"></timeComp>
    </div>
   <toMainTiao  :slides='titleCont'></toMainTiao>
   </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import topmaincont from '@/components/common/topComponents/topMaincont'
import toMainTiao from  '@/components/common/topComponents/toMainTiao'
import timeComp  from '@/components/common/topComponents/timeComp'
  export default {
   components:{
      BackHeader,
      topmaincont,
      toMainTiao,
      timeComp
    },
    data () {
  return {
     title:'高管看板',
     titleCont:[{context:'贷款情况分析表',linkPath:'/echartsBoxA',src:require('../../../static/images/贷款@3x.png')},{context:'存款情况分析表',linkPath:'/echartsBoxEE',src:require('../../../static/images/存款@3x.png')}]
      }
      },
      methods:{

        }
      }

</script>

<style scoped>
  .calendar_content{
    text-align: center;
    width: 100%;
    height:100%;
    background-color: #fff;
    position: relative;
    /*z-index: 10000000;*/
    /*margin-bottom: 18em;*/
  }

</style>
