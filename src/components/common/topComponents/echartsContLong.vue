<template>
   <div class="echarCont">
  <el-row>
  <el-col :span="6"><div class="itemstyle"><i>{{slides.context}} </i></div><span class='color1'>{{slides.conT}}</span> </el-col>
  <el-col :span="6"><div class="itemstyle"><i>{{slides.context1}} </i> </div><span class='color2'>{{slides.conT1}}</span> </el-col>
  <el-col :span="6"><div class="itemstyle"><i>{{slides.context2}} </i> </div><span class='color3'>{{slides.conT2}}</span> </el-col>
  <el-col :span="6"><div class="itemstyle"><i>{{slides.context3}} </i></div><span class='color4'>{{slides.conT3}}</span> </el-col>
</el-row>
   </div>
</template>

<script> 
  export default {
   props:{
       slides:{
        type:Object,
        default:{}
          // context:'366869',context1:'104725',context2:'7469',context3:'1725',
          // conT:'贷款余额',conT1:'比年初增',conT2:'比上月降',conT3:'比昨日增',
       }
    },
   components:{
    },
    data () {
  return {

      
      }
      },
      methods:{
       
        }
      }
  
</script>

<style scoped>

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    text-align: center;
  }
  .itemstyle{
    border-right:1px solid #ddd;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .itemstyle i{
    font-size: 20px;
    color: #768893;
  }
  .color1,.color2,.color3,.color4{
    display: inline-block;
    font-size: 14px;
  }
  .color1{
    color: #3BBAFF;
  }
   .color2{
    color:#8855FB;
  }
   .color3{
    color:  #F8A837;
  }
   .color4{
    color:#5A79FE;
  }
</style>
