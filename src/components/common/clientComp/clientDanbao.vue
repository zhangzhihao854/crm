<template>
   <div class="clientBig111" v-if="dataText.length>=1">
       <el-collapse accordion  v-model="activeNames">
           <div v-for="item in dataText">
               <el-collapse-item >
               <template slot="title">
                   <i></i><i class="cilentfont">{{item.contId}}</i>
               </template>
               <div class="colorone">合同编号: <span class="redcolor blackco"></span>{{item.contId}}</div>
               <div class="colorone">中文合同编号: <span class="redcolor blackco"></span>{{item.cnContNo}}</div>
               <div class="colorone">合同类型: <span class="redcolor blackco"></span>{{item.contType}}</div>
               <div class="colorone">合同类别; <span class="redcolor blackco"></span>{{item.contCategory}}</div>
               <div class="colorone">担保方式: <span class="redcolor blackco"></span>{{item.guarWay}}</div>
               <div class="colorone">担保合同编号: <span class="redcolor blackco"></span>{{item.guarContNo}}</div>
               <div class="colorone">担保中文合同编号: <span class="redcolor blackco"></span>{{item.guarContCnNo}}</div>
               <div class="colorone">担保人姓名: <span class="redcolor blackco"></span>{{item.custName}}</div>
               <div class="colorone">币种: <span class="redcolor blackco"></span>{{item.currency}}</div>
               <div class="colorone">入账金额: <span class="redcolor blackco">{{item.accountAmt}}</span></div>
               <div class="colorone">担保品有效起始日: <span class="redcolor blackco"></span>{{item.guarantyStartDate2}}</div>
               <div class="colorone">担保品有效到期日: <span class="redcolor blackco"></span>{{item.guarantyEndDate2}}</div>
               <div class="colorone">权属证件号: <span class="redcolor blackco"></span>{{item.identId}}</div>
           </el-collapse-item>
            </div>
           <el-collapse-item v-if="dataText.length==0">
               <div class="colorone">合同编号: <span class="redcolor blackco"></span>{{item.contId}}</div>
           </el-collapse-item>
       </el-collapse>


</div>
</template>

<script>

  export default {
  	props:{
        dataText:{
            type:Array,
            default:[]
        }

  	},
    data () {
      return {
          activeNames:['0'],
          imge:{
              image:'../../../../static/images/192@2x.png'
          },

      }
  }
}
</script>

<style scoped lang='scss'>
	.clientBig1{
    font-family:PingFangSC-Regular !important;
		width: 100%;
		height: 100%;
		/*border: 1px solid #E2E2E2;*/
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
    .el-collapse-item__arrow{
        line-height: 0;
    }
    .el-collapse-item__header__arrow{
        float: right;
        position: relative;
        top: 40%;
        right: 10px;
        color: #b3b3b3;
    }

    .redcolor{
        color: #FF673F;
    }
    .colorone{
        color: #888888;
        margin-left: 1.5rem;
        padding-right: 1rem;
    }
    .elitemBox{
        margin-top: 20px;
        background: #FCFEFE;
    }
    .cilentfont{
        font-size: 0.88rem;
        /*margin-left: 1rem;*/
    }
    .image img{
        width: 300px;
        height: 300px;
    }


</style>
