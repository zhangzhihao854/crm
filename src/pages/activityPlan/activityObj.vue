<template>
  <div class="activityObj">
    <div style="height:45px;margin-bottom:10px;">
      <back-Header :title="title" :flag="activitynoflag"></back-Header>
    </div>
<div style="padding: 20px">
{{activityObjdata}}
</div>

  </div>
</template>

<style scoped>
.activityObj{
  /*margin-top:44px;*/
}
</style>

<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
    export default{
      data () {
        return {
          title: '活动执行对象',
          activityObjdata:'',
          activitynoflag:'activitynoflag'
        }
      },
      components: {
        BackHeader,
      },
      activated(){
        this.activityObjdata=""
        this.title=""
        this.activityObjdata=this.$route.query.activityObjdata
        this.title=this.$route.query.titles
      },
    }
</script>
