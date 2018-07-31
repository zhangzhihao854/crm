<template>
  <div>
    <BackHeader2 :title="title"></BackHeader2>
    <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <div class="textDetail">
      {{activityRules}}
    </div>
  </div>
</template>
<script type=text/ecmascript-6>
  import BackHeader2 from '../../../src/components/header/back-title1-header.vue'
  export default{
    data(){
      return{
        title:'具体活动规则',
        loading2:true,
        activityRules:'',

      }
    },
    activated(){
      //初始化数据
      this.loading2 = true;
      this.activityRules = '';
      this.queryActivityRule();
    },
    methods:{
      queryActivityRule(){
          var url = '/CRMNewMobile/marketing/queryActivityRule';
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
              this.activityRules= res.body.data.activityRule;
            })
            .catch(err=>{

            })
      }
    },
    components:{
      BackHeader2,
    }
  }
</script>
<style>
  .textDetail{
    text-indent: 1rem;
  }
</style>
