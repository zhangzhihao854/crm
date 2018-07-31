<template>
   <div class="moreInformBox">
   <back-Header :title="title"></back-Header>
     <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
     </el-table>

     <div class="eventWrap" v-for="eve in events">
       <span class="dateTime">{{eve.showdate2}}</span>
       <span class="eventType">{{eve.type}}</span>
     </div>
<!--判断数据为空时，显示暂无数据-->
     <div v-show="eventShow" style="text-align: center; ">
       <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
         <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
       </div>
       <div style="margin-top: 20px;">暂时没有信息哦~</div>
     </div>

	</div>
</template>

<script>
import BackHeader from '@/components/header/back-header'



  export default {
    components:{
      BackHeader,

    },
    data () {
      return {
      title:'最新事件',
      loading2:true,
      events: [],
      eventShow: false
      }
      },
    activated(){

      this.loading2=true
      this.custId = this.$route.query.custId;
      this.getclientNewData()

      this.eventShow = false
    },
      methods:{
        getclientNewData(){
          var url = `/CRMNewMobile/pclient/queryEventOrgByCustId`;
          this.$http.post(url,
            {
                "identity": this.cookies.get('identity'),
                "custId": this.custId
            },
            {
              emulateJSON:true
            }
          ).then(res => {
          /*判断请求数据是否为空，为空则显示暂无数据*/
          if(res.body.ListData.length != 0){
            this.loading2 = false
            /*数据不为空，将“暂无数据”隐藏掉*/
            this.eventShow = false
            this.events =  res.body.ListData;
          }else{
              this.loading2 = false
              this.eventShow = true
            this.events =  res.body.ListData;
          }

        }).catch((error) => {

            console.log(error);
        })
        },
      }
  }
</script>

<style lang='scss'>
.moreInformBox{
    height:100%;
    width: 100%;
.back_text span[data-v-a2006ea4] {
	width: 6em!important;
}
 }
.eventWrap{
  width: 100%;
  height: 2rem;
  border: 1px solid #F4F4F4;
  line-height: 2rem;
  padding-left: 10px;
}
.eventWrap .dateTime{
  float: left;
  width: 30%;
}
.eventWrap .eventType{
  float: left;
  width: 70%;
  color: red;
}
</style>
