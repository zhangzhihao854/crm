<template>
   <div class="toMainFirst">
     <div class="itemStyle" v-for='(item,index) in slides' :key='index' >
       <el-row >
          <el-col :span="12" class="leftCol"><span>{{item.context}}</span></el-col>
          <el-col :span="12" class="rightCol">
              <i class="el-icon-arrow-right"></i>
          </el-col>
       </el-row>
    </div> 
   </div>
</template>

<script>

  export default {
    data () {
   return {
       slides: 
       [
        {context:'贷款情况分析表'},
        {context:'存款情况分析表'},
        ]
       
      }
      },
      methods:{
       
        }
      }
  
</script>

<style lang='scss' scoped>
  
i{
    color:#B3B3B3;
  }
  .topMaincont{
    height:auto;
    height:100%;
    width: 100%;
    text-align: center;
    position:fixed;
    top:4rem;
    left:0;
  }
  .itemStyle{
    height:50px;
    line-height:50px;
    font-size:14px;
    background-color:#fff;
    border-top:1px solid  #ddd;
  }
  .itemStyle:last-child{
    border-bottom:1px solid #ddd;
  }
  .leftCol{
    text-align:left;
    padding-left:15px;
    span{
      color:#555;
    }
  }
  .rightCol{
    text-align:right;
    padding-right:15px;

    span{
      color:#222;
    }
  }
</style>
