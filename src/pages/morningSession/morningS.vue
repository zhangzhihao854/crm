<template>
  <div>
    <back-Header :title="title" :flag="flag"></back-Header>
    <!--<search v-on:getSearch="getSearch" :listData="listData"></search>-->
    <div class="calendar_content">
      <input type="text" @keyup.enter="getSearch()" v-model="userName" placeholder="请输入客户经理名称">
    </div>


    <ul class="bac" v-for="item in listData1" style="width: 100%">
      <li @click="goMrnSess(item.userName,item.accountCode)" style="padding: 10px; width: 100%;">{{item.userName}}</li>
    </ul>
    <!--添加loading-->
    <el-table v-loading="loading2"  v-show="loading" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>

    <group-list :listData="listData==''?[]:listData" :userName="userName" v-show="showhide" ></group-list>
    <group-listyyzj :listData="listData==''?[]:listData" :userName="userName" v-show="grouplistyyzj" ></group-listyyzj>
  </div>
</template>
<script>
  import BackHeader from '@/components/header/back-header'
  import Search from '@/components/common/morningSessionC/search'
  import GroupList from '@/components/common/morningSessionC/groupList'
  import GroupListyyzj from '@/components/common/morningSessionC/groupListyyzj'
  import {getTestData} from '../../service/getData'
  export default {
    components:{
      BackHeader,
      Search,
      GroupList,
      GroupListyyzj
    },
    data(){
      return {
        title:'晨夕会',
//        depatype:'1',
        cxhState:this.cookies.get('cxhState'),
        identity:this.cookies.get('identity'),
        listData:[],
        showhide:false,
        showul:false,
        userName:'',
        loading2:true,
        loading: true,
        listData1:[],
        flag:'',
        back:"7",
        datatype:"",
        grouplistyyzj:false,

      }
    },
    methods:{
      goMrnSess(userName,accountCode){
//        alert(accountCode,userName)
        this.$router.push('/morningSessionfff?userName='+userName+'&accountCode='+accountCode+'&flag='+this.back+'&date=date')
      },
      addLoan(){
        this.datatype=""
//        this.currentDate = value;
        var url= `/CRMNewMobile/eveWill/queryAllCenter`
        this.currentDate = {}
        console.log(this.currentDate)
        this.$http.post(url,
                {
                    "identity":this.cookies.get('identity'),
                    "data":this.currentDate
                },
                {
                  emulateJSON:true
                }
        ).then(res => {
          console.log(res)
//          alert(111);
        this.listData = res.body.ListData;
        this.datatype = res.body.data.type;
        if(this.datatype==1){
          this.$router.push('/morningS?date=date');
          console.log("我的tadatype是1 跳转下拉数组")
          this.showhide=true
          this.grouplistyyzj=false
//        如果是分中心负责人
        }else if(this.datatype==0){
          this.$router.push('/morningS?date=date');
          console.log("我的tadatype是0 跳转列表")
          this.grouplistyyzj=true
          this.showhide=false
        }
        this.loading2=false
        this.loading = false


       console.log("--"+this.listData);
      }).catch((error)=>{
          console.log(error);
      })
      },
      getSearch(){
        this.loading2 = true
        this.loading = true
//        this.currentDate = value;
        var url= `/CRMNewMobile/eveWill/queryUserName`
        //this.currentDate = {"userName":this.userName}
        console.log(this.currentDate)
        this.$http.post(url,
                {
                    "identity":this.cookies.get('identity'),
                    "userName":this.userName
                },
                {
                  emulateJSON:true
                }
        ).then(res => {
          console.log(res)
        if(res){
          this.listData1 = res.body.ListData
         console.log(this.listData1)
          this.showul = true
          this.showhide = false
          this.grouplistyyzj=false
          if( this.listData1.length == 0){
            this.loading2=false
            this.loading = true
          }else{
            this.loading2=false
            this.loading = false
          }

        }
      }).catch((error)=>{
          console.log(error);
      })
      }
    },
    activated(){
      this.listData1=[];
      this.loading2=true
      this.loading = true
      this.userName = '';
      this.showhide =false;
      this.grouplistyyzj = false;
      this.flag=this.$route.query.num;
      this.cxhState = this.cookies.get('cxhState');

//      此段注释代码为 判断客户身份 查看不同的晨夕会页面
//      if(this.cxhState==1){
////        this.$router.push('/morningSessionfff?date=date')
//        this.$router.push('/morningS?date=date');
//        this.addLoan()
//      }else if(this.cxhState==0) {
//        this.$router.push('/morningS?date=date');
//        this.addLoan()
//      }
      this.addLoan()

    }
  }
</script>
<style lang="stylus" scoped>
  ul{
    list-style: none;
    /*position:absolute;*/
    /*top:6em;*/
    background-color: #fff;
  }
  .calendar_content{
    width: 100%;
    /*height: 3em;*/
    /*background-color: #fff;*/
    margin-top: 0.8rem;
  }

</style>

