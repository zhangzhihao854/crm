<template>
   <div class="moreQianBox">
  <div v-for='(item,index) in custmerListdata' :key='index' @click="moreQianBox(item.custId)">
  <el-row >
    <el-col :span="8" class="divcol"><div class="grid-content ">{{item.custName}}</div></el-col>
    <el-col :span="8" class="divcol"><div class="grid-content1 ">{{item.custType}}</div></el-col>
    <el-col :span="8" class="divcol"><div class="grid-content2 ">{{item.followOpinion}}</div></el-col>
  </el-row>
</div>


   </div>
</template>

<script>

  export default {

    data () {
      return {
         slides:[
         {context1:'1111',context2:'222222',context3:'33333'},
         {context1:'444',context2:'55555',context3:'666666'},
         ]
      }
     },
    props:{
      custmerListdata:{
        type:Array,
        default:[]
      }
    },
    methods:{
      moreQianBox(custId){
//        alert("11")
        this.$router.push('/seeCustomer?id='+custId+"&flag=moreQianBox")
      }
    }
  }
</script>

<style lang='scss' scoped>
  .moreQianBox{
  margin-top: 10px;
  }
  .divcol{
    height: 40px;
    padding-top:10px;
    padding-bottom:10px;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
  }


</style>
