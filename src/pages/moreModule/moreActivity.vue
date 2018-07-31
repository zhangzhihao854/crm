<template>
   <div class="moreActivityBox">
   <back-Header :title="title" :flag="flag"></back-Header>
   <div>
     <!--<moreActivityHead @goPage="goNextPage"></moreActivityHead>-->
   </div>
   <keep-alive>
    <router-view></router-view>
  </keep-alive>
	</div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import moreActivityHead from '@/components/common/moreComponents/moreActivityHead'

  export default {
    components:{
      BackHeader,
      moreActivityHead,
    },
    data () {
      return {
         title:'活动效果追踪',
         activeName:'0',
         flag:"moreMainPage"

      }
      },
    activated(){
    },
      methods:{
//         goNextPage(activeName){
//          this.show=activeName;
//         }
      }
  }
</script>

<style lang='scss' scoped>
.moreActivityBox{
  .back_text span[data-v-a2006ea4] {
    width: 6em!important;
  }
}

</style>
