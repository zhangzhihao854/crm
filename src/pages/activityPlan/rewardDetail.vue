<template>
  <div>
    <BackHeader3 :title="title"></BackHeader3>
    <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <div class="textDetail">
      {{rewardDetail}}
    </div>
  </div>
</template>
<script type=text/ecmascript-6>
  import BackHeader3 from '../../../src/components/header/back-title1-header.vue'
  export default{
      data(){
          return{
            title:'奖罚措施',
            loading2:true,
            rewardDetail:'',
          }
      },
    activated(){
          //初始化数据
          this.loading2 = true;
          this.rewardDetail = '';
          //走接口
          this.queryAwardPunishMeasure();
      },
      methods:{
        queryAwardPunishMeasure(){
            var url = `/CRMNewMobile/marketing/queryAwardPunishMeasure`;
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
                this.loading2 = false;
                this.rewardDetail = res.body.data.awardPunishMeasure;
              })
              .catch(err=>{

              })
        }
      },
      components:{
        BackHeader3,
      }
  }
</script>
<style>
  .textDetail{
    text-indent: 1rem;
  }
</style>
