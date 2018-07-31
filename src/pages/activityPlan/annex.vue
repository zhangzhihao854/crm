<template>
  <div class="activityObj">
    <div style="height:45px;margin-bottom:10px;">
      <back-Header :title="title"></back-Header>
    </div>
    <div id="htmlWrap">

    </div>

<!--    <img :src="'http://221.195.137.135:8081/'+this.activityObjdata">-->
 <!--   <img :src="'http://222.223.182.30:1411/'+this.activityObjdata">-->
<!--    <img :src="'http://www.crcbcrm.com/'+this.activityObjdata">-->




  </div>
</template>

<style scoped>
  #htmlWrap{
    width: 100%;
  }
</style>

<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
  export default{
    data () {
      return {
        title: '活动执行对象',
      }
    },
    activated(){
      this.title=this.$route.query.titles
      document.getElementById('htmlWrap').innerHTML = this.$store.state.htmlWrap;
    },
    methods: {
      /*goFuJian(){
          window.open('http://222.223.182.30:1411/'+this.activityObjdata)
      }*/
    },
    components: {
      BackHeader,
    }
  }
</script>
