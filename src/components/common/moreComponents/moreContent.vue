<template>
   <div>
	 <div class="Context1" >
	 	<div class="contextBox" v-for='(item,index) in choosemindata'>
	 	<div><input type="number" placeholder="请输入" v-model="num"></div>
    <div><input type="text" placeholder="请输入" v-model="text"></div>
	 	 <div v-model="custName">{{item.custName}}</div>
     <div><input type="date" placeholder="请选择" v-model="date" class="date"> </div>
	 	</div>
	 </div>
   </div>
</template>

<script>

  export default {
    data () {
      return {
          slides:[
          {context1:'111222344',context2:'1000万',context3:'胡强',context4:'2017/10/10'},
          {context1:'123456788',context2:'1200万',context3:'胡强22',context4:'2017/10/10'},
          ]
      }
      },
    props:{
      choosemindata:{
        type:Array,
        defaule:[]
      },
    activated(){

    },
    },
    methods:{

    },
  }
</script>

<style scoped>
  input{
    border: none !important;
    font-size:12px !important;
  }
  .date{
    /*width:100px;*/
    font-size:10px;
    padding: 0;
  }
.Context1{
	background: #ffffff;
	border-bottom: 1px solid #E2E2E2;
}
.contextBox{
    width: 100%;
    height: 40px;
    text-align: center;
}
.contextBox div{
	float: left;
	line-height: 40px;
	font-size: 14px;

}
  .contextBox div:nth-child(1){
    text-align: center;
    width: 22%;
  }

.contextBox div:nth-child(2){
	color:#FB7420;
  width: 25%;
}
  .contextBox div:nth-child(3){
    width: 25%;
    background-color: #fff;
  }
  .contextBox div:nth-child(4){
    width: 28%;
  }

</style>
