<template>
  <div>
    <BackHeader1 :title="title"></BackHeader1>
    <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <div class="textDetail">
      {{activityGuiding}}
    </div>
  </div>
</template>
<script type=text/ecmascript-6>
  import BackHeader1 from '../../../src/components/header/back-title1-header.vue'
  export default{
    data(){
      return{
        title:'活动指导思想',
        loading2:true,
        activityGuiding:'',
      }
    },
    activated(){
      //初始化数据
      this.loading2 = true;
      this.activityGuiding = '';
      this.queryActivityGuide();
    },
    methods:{
      queryActivityGuide(){
        var url = '/CRMNewMobile/marketing/queryActivityGuide';
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
              "id":this.$store.state.marktingId
          },
          {
            emulateJSON:true
          }
          )
          .then(res=>{
            this.loading2 =false;
            //获取数据
            this.activityGuiding= res.body.data.activityGuide;
          })
          .catch(err=>{

          })
      }
    },
    components:{
      BackHeader1,
    }
  }
</script>
<style>
  .textDetail{
    text-indent: 1rem;
  }
</style>
