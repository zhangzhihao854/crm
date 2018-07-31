<template>
  <div class="filterResult">
      <el-row>
        <el-col :span="8"><div>{{carsh}}</div></el-col>
        <el-col :span="8" style="border-left:1px solid #ddd;border-right:1px solid #ddd;"><div>{{income}}</div></el-col>
        <el-col :span="8"><div>{{customerLever}}</div></el-col>
    </el-row>
  </div>

</template>
<script>

  export default {
    props:{
      carsh:{
         type:String,
         default:""
       },
       customerLever:{
         type:String,
         default:""
       },
       income:{
         type:String,
         default:""
       }
    },
    data () {
      return {

      }
    },
    methods: {

    },

  }
</script>

<style scoped>
  .filterResult{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color:white;
    overflow: hidden;
    font-size: 12px;
    border-top:1px solid #ddd;
    border-bottom:1px solid #ddd;
    text-align: center;
  }


</style>
