<template>
  <div >
  <back-Header :title="title" :path="path"></back-Header>
  	<product-Details></product-Details>
  </div>
</template>

<script>
import productDetails from '@/components/common/productComponents/productDetails'
import BackHeader from '@/components/header/back-headerproduct'
  export default {
   components:{
     productDetails,
     BackHeader
    },
    data(){
      return {
        title:'贷款产品',
        path:"/productMainPage"
      }
    },
activated(){
  this.title=this.$route.query.title
},
    methods:{
    },
  }
</script>
<style>

</style>
