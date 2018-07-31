<template>
   <div>
   <back-Header :title="title" :flag=this.flag></back-Header>
   <morePurposeWrite></morePurposeWrite>
 </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
import morePurposeWrite from '@/components/common/moreComponents/morePurposeWrite'
  export default {
    components:{
      BackHeader,
      morePurposeWrite,
    },
    data () {
      return {
         title:'客户意向录入',
         flag:'',
      }
      },
    activated(){
      if(this.$route.query.flag){
        if(this.$route.query.flag=='yxlrback'){
          this.flag='yxlrflag'
        }
      }

    },
      methods:{

      }
  }
</script>

<style lang='scss'>
.back_text span[data-v-a2006ea4] {
	width: 6em!important;
}
  .other_footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2.5em;
    border-top: 1px solid #EB3723;
  }
  .other_footer .cancel,.other_footer .keep{
    float: left;
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 2.5em;
  }
  .other_footer .cancel{
    color: #EB3723;
    background-color: #fff;
  }
  .other_footer .keep{

    color: #fff;
    background-color: #EB3723;
  }
  span input::-webkit-input-placeholder{
    text-align:right;
  }
  span input{
    width: 4em;
    border: none;
    outline: none;
  }

</style>
