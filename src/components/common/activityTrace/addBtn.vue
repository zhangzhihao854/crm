<template>
  <div class="addBtn" @click="addData(addType)">
     <div class="iconStyle"><i class="el-icon-plus"></i></div>
     <div><span>{{labelName}}</span></div>
  </div>  

</template>
<script>

  export default {
    props:{
       labelName:{
         type:String,
         default:""
       },
       addType:{
        type:String,
        default:"1"
       },
       goAddData:{
        type:Function
       }
    },
    data () {
      return {
        
      }
    },
    methods: {
      addData(type){
        //alert(type);
        // this.$emit("addData",type);
        this.goAddData(type);
      }
    },
    
  }
</script>

<style scoped>
  .addBtn{
    position: relative;
    width: 100%;
    height: 40px;
    background-color:white;
    overflow: hidden;
    line-height: 40px;
    font-size: 14px;
  }
  .iconStyle{
    float: left;
    width: 8%;
    margin-left: 5%;
  }
</style>
