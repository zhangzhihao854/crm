<template>
   <div class="clientBig2">
  <el-row >
  <el-col :span="24">
  <div class="fontcolor"></div><span class="garid-content2">{{item.StextHead}}</span>
</el-col>
</el-row>
     
   </div>
</div>
</template>

<script>

  export default {
  	props:{
  	item:{
  		type:Object,
  		default:{}
  	},

  	// },
    data () {
      return {
      
      }
  }
}
}
</script>

<style scoped lang='scss'>
	.clientBig2{
		width: 100%;
		height: 100%;
		border: 1px solid #E2E2E2;
		border-left: 0;
		border-right: 0;
        margin-top: 20px;
	}
	.el-row {
    margin-bottom: 10px;
    padding-top: 20px;
  }
  .el-col {
    border-radius: 2px;
    margin-bottom: 2%;
  }
 
  .grid-content2 {
    border-radius: 4px;
    min-height: 36px;
    color: #222222;
  }
  .fontcolor{
  	display: inline-block;
  	width: 5px;
  	height: 25px;
  	background: red; 
  	color: red;
  	margin-bottom: -5px;
  	margin-left: 5%;
  	margin-right: 5%;
  }
	
</style>
