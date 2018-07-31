<template>
  <div>
    访问出错了，请您稍后再试....
  </div>
</template>

<script>
  export default{
      data(){
          return{

          }
      },
      mounted(){
          setTimeout(()=>{
              this.$route.go(-1)
          },2000)
      }
  }
</script>
<style>

</style>
