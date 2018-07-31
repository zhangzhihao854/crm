<template>
  <div class="wrap">
    <headerBlack @getUserName="getUserName"></headerBlack>
    <clientCard :userData="userData" @loadBottom="loadBottom" @loadTop="loadTop" ></clientCard>
    <el-table v-loading="loading2"  v-show="loading" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>

  </div>
</template>

<script type=text/ecmascript-6>
  import headerBlack from '../../../components/header/back-header-input'
  import clientCard  from './clientCard.vue'
  import { MessageBox } from 'mint-ui';
  export default{
    data() {
      return {
        activeName: 'second',
        userData: [],
        next:1,
        prev:1,
        Snext:1,
        Sprev:1,
        count:1,
        Scount:1,
        flag:"1",
        username:'',
        loading2:true,
        loading: true,
      };
    },
    activated(){
      this.userData=[];
      this.flag="1"
      this.next=1
      this.Snext=1
      this.prev=1
      this.Sprev=1
      this.count=1
      this.Scount=1
      this.username=""
      this.getclientBlackName()
      this.loading2=true
      this.loading=true
    },
    methods: {
      loadBottom() {
        if(this.flag=="1"){
          this.count=this.next
          this.getclientBlackName()
        }else if(this.flag=="2") {
          this.Scount=this.Snext
          this.getUserName(this.username)

        }

      },
      loadTop() {
        if(this.flag=="1"){
          this.count=this.prev
          this.getclientBlackName()
        }else if(this.flag=="2") {
          this.Scount=this.Sprev
          this.getUserName(this.username)

        }
      },

//      列表
      getclientBlackName(){
        this.userData = []
        this.loading2=true
        this.loading=true
        var url = `/CRMNewMobile/blackList/queryAllBlackList`;
        this.$http.post(url,
          /*{"identity": this.cookies.get('identity'),data:{"pageNum": this.count}}*/
          {
              "identity": this.cookies.get('identity'),
              "pageNum": this.count,
              "custName":''
          },
          {
            emulateJSON:true
          }
        ).then(res => {

          if(res.body.data.data.length==0){
            this.loading2=false
            this.loading=true
            this.userData=[]

          }else {
            this.loading2=false
            this.loading=false
            this.userData = res.body.data.data
          }

          this.flag="1"
        this.next=res.body.data.next
        this.prev=res.body.data.prev
        }).catch((error) => {
          console.log(error);
        })
      },
//      搜索
      getUserName(username){
        this.userData = []
        this.loading2=true
        this.loading=true
        /*var url = `/CRMNewMobile/blackList/queryBlackListByCustName`;*/
        var url = `/CRMNewMobile/blackList/queryAllBlackList`;
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity'),
              "pageNum": this.Scount,
              "custName": username
          },
          {
            emulateJSON:true
          }
        ).then(res => {

          if(res.body.data.data.length==0){
            this.loading2=false
            this.loading=true
            this.userData=[]

          }else {
            this.loading2=false
            this.loading=false
            this.userData = res.body.data.data
          }
          this.flag="2"
        this.username=username
        this.Snext=res.body.data.next
        console.log(this.count);
        this.Sprev=res.body.data.prev
        }).catch((error) => {
          console.log(error);
        })
      }
    },
    components: {
      headerBlack,
      clientCard
    }
  }
</script>

<style lang="scss" scoped>

</style>
