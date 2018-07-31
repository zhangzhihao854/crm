<template>
   <div class="moreLoansBox">
     <moreActivityHead></moreActivityHead>
     <moreInBox></moreInBox>

   <!--<moreBottom :mymessage='mymessage'></moreBottom>-->
	</div>
</template>

<script type=text/ecmascript-6>
import moreInBox from '@/components/common/moreComponents/moreInBox'
import moreBottom from '@/components/common/moreComponents/moreBottom'

import moreActivityHead from '@/components/common/moreComponents/moreActivityHead'

  export default {
    components:{
      moreInBox,
      moreActivityHead,
      moreBottom

    },
    data () {
      return {
         title:'活动效果追踪',
         mymessage:'提交',
      }
      }
  }
</script>

<style lang='scss' scoped>
.moreLoansBox{
    /*height:100%;*/
    width: 100%;
    text-align: center;
    /*position:relative;*/
    /*top:0px;*/
    /*left:0;*/
    /*margin-bottom:40px;*/
.back_text span[data-v-a2006ea4] {
	width: 6em!important;
}
}

</style>
