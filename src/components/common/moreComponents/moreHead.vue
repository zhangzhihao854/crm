<template>
   <div>
<div class="moreHeadChild" >
   <div class="DivTwo" style="width: 25%">流水号</div>
    <div class="DivTwo" style="width: 25%">{{mymoney}}</div>
     <div class="DivTwo" style="width: 20%">客户</div>
      <div class="DivTwo" style="width: 30%">{{date}}</div>

   </div>
   </div>
</template>

<script>
  export default {
    props:{
      mymoney:{
      type:String,
      default:''
    }  ,
      date:{
        type:String,
        default:''
      }
    },
    data () {
      return {

      }
      }
  }
</script>

<style scoped>
.moreHeadChild{
	width: 100%;
	height: 50px;
	background: #EEEEEE;
	border: 1px solid #E2E2E2;
  margin-top: 20px;
}
.DivTwo{
	color: #888888;
	text-align: center;
	line-height: 50px;
	width: 25%;
	float: left;
  font-size: 14px;
}

</style>
