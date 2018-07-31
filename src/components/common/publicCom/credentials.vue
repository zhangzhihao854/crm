<template>
   <div class="clientBig1">
       <el-row >

           <el-col :span="24">
               <div class="grid-content">性别:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{sex}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">民族:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.nationality}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">婚姻状况:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.marriage}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">固定电话:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.homeTel}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">手机电话:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.mobilePhone}}</span>
           </el-col>
           <el-col :span="24">
               <div class="grid-content">现居住地:</div>
               <span class="fontcolor"></span>
               <span class="garid-content2">{{dataText.homeAddr}}</span>
           </el-col>
       </el-row>
     
   </div>
</div>
</template>

<script>

  export default {
  	props:{
  	dataText:{
  		type:Object,
  		default:{}
  	},
    sex:{
        type:String,
        default:''
    }

  	},
    data () {
      return {
      
      }
    },
      activated(){
          this.dataText = {}
          this.sex = ''
      }
}
</script>

<style scoped lang='scss'>
	.clientBig1{
        font-family:PingFangSC-Regular !important;
		width: 100%;
		height: 100%;
		border: 1px solid #E2E2E2;
		border-left: 0;
		border-right: 0;
        background: #fff;
        margin-bottom: 0.66rem;
	}
	.el-row {
    margin-bottom: 10px;
    padding-top: 20px;
  }
  .el-col {
    border-radius: 2px;
    margin-bottom: 2%;
  }
    .clientBig .el-col-24{
        width:98% !important;
    }
  .grid-content {
    border-radius: 2px;
    margin-left: 8%;
    font-size: 0.83rem;
    color: #888888;
    display: inline-block;

  }
  .garid-content2 {
    border-radius: 4px;
    min-height: 36px;
    color: #222222;
      font-size: 0.83rem;
  }
  .fontcolor{
      /*margin-left: 0.1rem;*/
      margin-right: 0.5rem;
      color: #FF673F;

  }
	
</style>
