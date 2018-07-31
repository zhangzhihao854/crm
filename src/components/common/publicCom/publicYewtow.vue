<template>
   <div class="clientComp  clientWrap" >
       <el-tabs v-model='activeName'>
           <el-tab-pane label="机构贷款账户信息" name="first">
             <el-collapse accordion  v-model="activeNames" class="loanOrg">
                  <div v-for="(item,index) in dataText">
                     <el-collapse-item>
                         <template slot="title">
                           <i class="iclass">{{index+1}}</i>
                             <i class="cilentfont">{{item.account}}</i>
                         </template>
                         <div class="colorone">账号: <span class="redcolor blackco"></span><span class="blcolor">{{item.account}}</span></div>
                         <div class="colorone">办理机构: <span class="redcolor blackco"></span><span class="blcolor">{{item.orgName}}</span></div>
                         <div class="colorone">借据号: <span class="redcolor blackco"></span><span class="blcolor">{{item.debitNote}}</span></div>
                         <div class="colorone">科目号: <span class="redcolor blackco"></span><span class="blcolor">{{item.subjects}}</span></div>
                         <div class="colorone">币种: <span class="redcolor blackco"></span><span class="blcolor">{{item.moneyType}}</span></div>
                         <div class="colorone">五级分类: <span class="redcolor blackco"></span><span class="blcolor">{{item.fiveLevelType}}</span></div>
                         <div class="colorone">余额: <span class="redcolor blackco">{{item.amount}}</span></div>
                         <div class="colorone">年日均: <span class="redcolor blackco">{{item.loanAvgY}}</span></div>
                         <div class="colorone">借款日: <span class="redcolor blackco"></span><span class="blcolor">{{item.openAccountDate2}}</span></div>
                         <div class="colorone">到期日: <span class="redcolor blackco"></span><span class="blcolor">{{item.matureDate2}}</span></div>
                     </el-collapse-item>
                  </div>

             </el-collapse>
             <!--没有数据显示暂无数据-->
             <!--判断数据为空时，显示暂无数据-->
             <div v-show="showDate9" style="text-align: center; ">
               <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%; margin-top:50px;">
                 <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
               </div>
               <div style="margin-top: 20px;">暂时没有信息哦~</div>
             </div>
           </el-tab-pane>
           <el-tab-pane label="机构存款账户信息" name="second" class="saveOrg">
             <el-collapse v-model="activeNames">
               <div v-for="item in dataText1">
                 <el-collapse-item>
                   <template slot="title">
                     <i></i><i class="cilentfont">{{item.etlDate2}}</i>
                   </template>
                   <div class="colorone">统计日期 <span class="redcolor blackco"></span>{{item.etlDate2}}</div>
                   <div class="colorone">存款总额 <span class="redcolor blackco"></span>{{item.curAcBl}}</div>
                   <div class="colorone">上月余额 <span class="redcolor blackco"></span>{{item.lastMonthBl}}</div>
                   <div class="colorone">上月日均 <span class="redcolor blackco"></span>{{item.bnsyAvg}}</div>
                   <div class="colorone">上年余额 <span class="redcolor blackco"></span>{{item.LastAcBl}}</div>
                   <div class="colorone">上年日均 <span class="redcolor blackco"></span>{{item.lastYearAvg}}</div>
                 </el-collapse-item>
               </div>
               <!--没有数据显示暂无数据-->
               <!--<div v-show="showDate10" style="width: 100%; height: 100px; text-align: center; line-height: 100px">暂无数据</div>-->
             </el-collapse>
             <!--没有数据显示暂无数据-->
             <!--判断数据为空时，显示暂无数据-->
             <div v-show="showDate10" style="text-align: center; ">
               <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%; margin-top:50px;">
                 <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
               </div>
               <div style="margin-top: 20px;">暂时没有信息哦~</div>
             </div>
           </el-tab-pane>
           <el-tab-pane label="股权信息  " name="third" class="messageGQ">
             <el-collapse v-model="activeNames">
               <div v-for="item in dataText2">
                 <el-collapse-item>
                   <template slot="title">
                     <i></i><i class="cilentfont">{{item.etlDate2}}</i>
                   </template>
                   <div class="colorone">统计日期 <span class="redcolor blackco"></span>{{item.etlDate2}}</div>
                   <div class="colorone">本年余额 <span class="redcolor blackco"></span>{{item.curAcBl}}</div>
                   <div class="colorone">上年余额 <span class="redcolor blackco"></span>{{item.LastAcBl}}</div>
                   <div class="colorone">本年日均 <span class="redcolor blackco"></span>{{item.curYearAvg}}</div>
                   <div class="colorone">上年日均 <span class="redcolor blackco"></span>{{item.lastYearAvg}}</div>
                   <div class="colorone">本年上月月均 <span class="redcolor blackco"></span>{{item.curMonthAvg}}</div>
                 </el-collapse-item>
               </div>
             </el-collapse>
             <!--没有数据显示暂无数据-->
             <!--判断数据为空时，显示暂无数据-->
             <div v-show="showDate11" style="text-align: center; ">
               <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%; margin-top:50px;">
                 <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
               </div>
               <div style="margin-top: 20px;">暂时没有信息哦~</div>
             </div>
           </el-tab-pane>
       </el-tabs>
   </div>
</template>

<script>

  export default {
      props:{
          dataText:{
              type:Array,
              default:[]
          },
          dataText1:{
              type:Array,
              default:[]
          },
          dataText2:{
              type:Array,
              default:[]
          },
         showDate9: {
             type: Boolean,
             default: false
         },
        showDate10: {
          type: Boolean,
          default: false
        },
        showDate11: {
          type: Boolean,
          default: false
        }

      },
  /*  activated(){
      console.log(this.dataText)
      console.log(this.dataText1)
      console.log(this.dataText2)
      /!*判断当没有数据时，显示“暂无数据”*!/
      this.dataText.length === 0? this.showDate9 = true : this.showDate9 = false;
      this.dataText1.length === 0? this.showDate10 = true : this.showDate10 = false;
      this.dataText2.length === 0? this.showDate11 = true : this.showDate11 = false;

    },*/
    data () {
      return {
            activeName:"first",
            activeNames: ['1'],
            clientgo1:[
                {context:'个人贷款业务'},
                {context:'个人存款业务'},
                {context:'股权信息'}
            ],
            dataT:[
                {ss:'',dd:''},
                {ss:'',dd:''}
            ],
            imge:{
                image:'../../../../static/images/daikuan3x.png'
            },
            /*控制“暂无数据文字”的显示与隐藏*/
            showDate9: false,
            showDate10: false,
          }
    },
      methods: {

      }
  }
</script>

<style lang='scss'>
  .iclass{
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    background-color: #3dcbfe;
    text-align: center;
    line-height: 22px;
    color: #FFFFFF;
    font-size:16px;
  }
.clientComp{
  width: 100%;
  background: #ffffff;

.el-tabs__item{
   width: 33.3%;
}
.el-tabs__nav{
 width: 100%;
}
.div1{
	margin-top: 50px;
}
.el-tabs__active-bar{
  background: red!important;
  margin-left: 5px;
  /*width: 33.3% !important;*/

}
 #tab-third{
  text-align: center !important;

}
.el-tabs__item.is-active {
    color: red!important;
}
.el-tabs__header{
  margin:0!important;
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
    margin-left: .3rem;
}
.blcolor{
    color: #222;
}
.colorone{
	color: #888888;
    margin-left: 2.5rem;
}
.elitemBox{
	margin-top: 20px;
	background: #FCFEFE;
}
.cilentfont{
	font-size: 0.88rem;
	margin-left: 10px;
}
}
.clientWrap .el-tabs--top .el-tabs__item:last-child{
  text-align: right;
  /*padding-right: 20px;*/
}
.clientWrap .el-tabs--top .el-tabs__item:nth-child(2){
  /*padding-left: 25px !important;*/
}
.clientWrap  #tab-first{
  width: 35% !important;
  padding-left: 15px;
}
.clientWrap  #tab-second{
  width: 35% !important;
}
.clientWrap  #tab-third{
  width: 30% !important;
}
</style>

