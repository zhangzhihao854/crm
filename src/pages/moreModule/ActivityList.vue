<template>
    <div class="ActivityList">
      <back-Header :title="title" :flag="backflag"></back-Header>
      <div class="activityContent">
        <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
        </el-table>
        <ul >
          <li @click="activityId(item.id)" v-for="item in listIddata">
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple bg-purplerleft">{{item.activityName}}</div></el-col>
              <el-col :span="6" class="bg-purplermid"><div class="grid-content bg-purple-light">{{item.activityStatus}}</div></el-col>
              <el-col :span="12" class="bg-purpleright"><div class="grid-content bg-purple"></div>{{item.dateAdd}}</el-col>
            </el-row>
            <p>{{item.activityType}}</p>
            <p>{{item.activityCreateDate}}-{{item.activityEndDate}}</p>
          </li>
        </ul>
      </div>
    </div>
</template>

<style scoped>
  .ActivityList{
    background-color: rgb(245,245,247);
    height: 100%;
  }
.bg-purpleright{
  text-align: right !important;
  padding-right:20px;
  font-size: 13px;
  color:#888;
}
.bg-purplermid{
  text-align: center;
  border-radius:5px !important;
  background-color: #4cd964;
}
.bg-purplerleft{
  /*width:50px;*/
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
}
.bg-purple-light{
  color: #fff;
  font-size:14px;
}
  ul{
    background-color: #fff;
    padding: 10px;
    margin-top:10px;
  }
  ul li{
    border-bottom: 1px solid #e5e5e5;
    padding-top:10px;
  }
</style>

<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
  export default {
    components:{
      BackHeader,
    },
      data () {
        return {
          title:'营销活动',
          activityType:'',
          listIddata:[],
          backflag:'1',
          loading2:true,
      }
      },
    activated(){
      this.loading2=false
      this.listIddata=[]
      this.activityType=""
      this.getactivityId()
    },
    methods:{
      activityId(id){
       this.$router.push("/moreMainPage?id="+id)
        this.$store.state.marktingId=id

      },
      getactivityId(){
        var url= `/CRMNewMobile/marketing/queryMarkting`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
            this.listIddata=res.body.ListData
            console.log(this.listIddata);
            for(var i=0; i< this.listIddata.length;i++){
              //            活动类型的判断，如果是1 对应其汉字，最少一种情况，最多五种
              var ck=this.listIddata[i].activityTypeDeposit=="1"?"存款、":""
              var dk=this.listIddata[i].activityTypeLoans=="1"?"贷款、":""
              var qk=this.listIddata[i].activityTypeGuest=="1"?"潜客、":""
              var tj=this.listIddata[i].activityTypeTb=="1"?"内部团队建设、":""
              var qt=this.listIddata[i].activityTypeRests=="1"?"其他、":""
              this.activityType=ck+dk+qk+tj+qt
              this.listIddata[i].activityType=this.activityType.substring(0,this.activityType.length - 1)
              this.listIddata[i].activityCreateDate=this.listIddata[i].activityCreateDate.substring(0,11)
              this.listIddata[i].activityEndDate=this.listIddata[i].activityEndDate.substring(0,11)
              this.loading2=false
            }
          },
          res => {
            console.log(res)
          }
        )
      },
    }
    }
</script>
