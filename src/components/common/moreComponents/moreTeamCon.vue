<template>
   <div class="morehead" >
   <!-- <div class="DivOne" v-for="item in slides" @click="goNextPage(item.linkPath)" style="color:blue">{{item.context}}</div> -->
   <el-tabs  @click="goNextPage(item.linkPath)" v-for="item in slides">
    <el-tab-pane :label="{{item.context}}">{{item.context}}</el-tab-pane>
  </el-tabs>
   </div>
</template>

<script>

  export default {
    data () {
  return {
        slides:[
          {context:'存款达成',linkPath:'/moreActivity'},
          {context:'贷款达成',linkPath:'/moreLoans'},
          {context:'潜客开发',linkPath:'/customerInput'},
          {context:'意向录入',linkPath:'/morePurpose'},
          {context:'团队建设',linkPath:'/moreTeam'}
          ],

      }
    },
      methods: {
        goNextPage(path){
          this.$router.push(path)
        }
      }
      
  }
</script>

<style scoped>
.morehead{
  width: 100%;
  height: 58px;
  border:1px solid #E6E6E6;
  background: #ffffff;
  margin-top: 3em;
  overflow-x:scroll; 
}
.DivOne{
  width: 20%;
  height:50px;
  float: left;
  font-size: 16px;
  color: #333333 ;
  text-align: center;
  border-right: 1px solid #E6E6E6;

}
.DivOne:hover{
  border-bottom: 10px solid red;
  color:#EB3723;
  z-index: 99;
}
  

</style>
