<template>
   <div class="clientComp" >
       <el-tabs v-model='activeName' @tab-click="handleClick">
           <el-tab-pane label="贷款业务概览"  name="first">

             <el-collapse accordion  v-model="activeNames" >
                  <div v-for="(item,index) in dataText">
                      <el-collapse-item :title= item.etlDate2>
                          <template slot="title">
                              <i class="iclass">{{index+1}}</i>
                              <i>{{item.etlDate2}}</i>
                          </template>
                          <!--<div class="colorone">本期余额 <span class="redcolor blackco">{{item.curAcBl}}</span>元</div>
                          <div class="colorone">上年余额 <span class="redcolor blackco">{{item.lastAcBl}}</span>元</div>
                          <div class="colorone">上年度日均余额 <span class="redcolor blackco">{{item.lastYearAvg}}</span>元</div>
                          <div class="colorone">本年度日均量<span class="redcolor blackco">{{item.lastMonthAvg}}</span>元</div>-->
                          <div class="colorone">本期余额:<span class="redcolor blackco">{{item.curAcBl}}</span>元</div>
                          <div class="colorone">上年余额:<span class="redcolor blackco">{{item.lastAcBl}}</span>元</div>
                          <div class="colorone">上年度日均余额:<span class="redcolor blackco">{{item.lastYearAvg}}</span>元</div>
                          <div class="colorone">本年度日均量:<span class="redcolor blackco">{{item.cruYearAvg}}</span>元</div>
                          <div class="colorone">统计日期:<span class="redcolor blackco">{{item.etlDate2}}</span></div>
                      </el-collapse-item>
                  </div>



             </el-collapse>
             <!--判断数据为空时，显示暂无数据-->
             <div v-show="showDateA" style="text-align: center; ">
               <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%; margin-top:50px;">
                 <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
               </div>
               <div style="margin-top: 20px;">暂时没有信息哦~</div>
             </div>

           </el-tab-pane>

           <el-tab-pane label="存款业务概览" name="second">

             <el-collapse>

             <div v-for="(item,index) in dataText1">
               <el-collapse-item  :title= item.etlDate2>
                 <template slot="title">
                   <i class="iclass">{{index+1}}</i>
                   <i>{{item.etlDate2}}</i>
                 </template>

                 <!--<div class="colorone">存款总额 <span class="redcolor blackco">{{item.curAcBl}}</span>元</div>
                 <div class="colorone">月日均 <span class="redcolor blackco">{{item.curMonthAvg}}</span>元</div>
                 <div class="colorone">年日均 <span class="redcolor blackco">{{item.curYearAvg}}</span>元</div>
                 <div class="colorone">上月余额 <span class="redcolor blackco">{{item.LastAcBl}}</span>元</div>
                 <div class="colorone">上年月日均 <span class="redcolor blackco">{{item.lastMonthAvg}}</span>元</div>
                 <div class="colorone">上年年日均 <span class="redcolor blackco">{{item.lastYearAvg}}</span>元</div>-->

                 <div class="colorone">本年余额:<span class="redcolor blackco">{{item.curAcBl}}</span>元</div>
                 <div class="colorone">上年余额:<span class="redcolor blackco">{{item.LastAcBl}}</span>元</div>
                 <div class="colorone">本年日均:<span class="redcolor blackco">{{item.curYearAvg}}</span>元</div>
                 <div class="colorone">上年日均:<span class="redcolor blackco">{{item.lastYearAvg}}</span>元</div>
                 <div class="colorone">本年上月月均:<span class="redcolor blackco">{{item.bnsyAvg}}</span>元</div>
                 <div class="colorone">上年同期月均:<span class="redcolor blackco">{{item.LastTqMonthAvg}}</span>元</div>
                 <div class="colorone">上年季均:<span class="redcolor blackco">{{item.LastSeasonAvg}}</span>元</div>
                 <div class="colorone">统计日期:<span class="redcolor blackco">{{item.etlDate2}}</span></div>
               </el-collapse-item>
             </div>

           </el-collapse>
             <!--没有数据显示暂无数据-->
             <!--判断数据为空时，显示暂无数据-->
             <div v-show="showDateB" style="text-align: center; ">
               <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%; margin-top:50px;">
                 <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
               </div>
               <div style="margin-top: 20px;">暂时没有信息哦~</div>
             </div>
           </el-tab-pane>

           <el-tab-pane label="股权业务概览" name="third">
             <el-collapse>
               <div v-for="(item,index) in dataText2">
                 <el-collapse-item :title= item.etlDate2>
                   <template slot="title">
                     <i class="iclass">{{index+1}}</i>
                     <i>{{item.etlDate2}}</i>
                   </template>
                   <!--<div class="colorone">余额 <span class="redcolor blackco">{{item.curAcBl}}</span>元</div>
                   <div class="colorone">月日均 <span class="redcolor blackco">{{item.curMonthAvg}}</span>元</div>
                   <div class="colorone">年日均 <span class="redcolor blackco">{{item.curYearAvg}}</span>元</div>
                   <div class="colorone">上年余额 <span class="redcolor blackco">{{item.LastAcBl}}</span>元</div>
                   <div class="colorone">上年月日均 <span class="redcolor blackco">{{item.lastMonthAvg}}</span>元</div>
                   <div class="colorone">上年年日均 <span class="redcolor blackco">{{item.lastYearAvg}}</span>元</div>-->

                   <div class="colorone">本年余额:<span class="redcolor blackco">{{item.curAcBl}}</span>元</div>
                   <div class="colorone">上年余额:<span class="redcolor blackco">{{item.LastAcBl}}</span>元</div>
                   <div class="colorone">本年日均:<span class="redcolor blackco">{{item.curYearAvg}}</span>元</div>
                   <div class="colorone">上年日均:<span class="redcolor blackco">{{item.lastYearAvg}}</span>元</div>
                   <div class="colorone">本年上月月均:<span class="redcolor blackco">{{item.lastMonthAvg}}</span>元</div>
                   <div class="colorone">上年同期月均:<span class="redcolor blackco">{{item.LastTqMonthAvg}}</span>元</div>
                   <div class="colorone">上年季均:<span class="redcolor blackco">{{item.LastSeasonAvg}}</span>元</div>
                   <div class="colorone">统计日期:<span class="redcolor blackco">{{item.etlDate2}}</span></div>
                 </el-collapse-item>
               </div>

           </el-collapse>
             <!--没有数据显示暂无数据-->
             <!--判断数据为空时，显示暂无数据-->
             <div v-show="showDateC" style="text-align: center; ">
               <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%; margin-top:50px;">
                 <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
               </div>
               <div style="margin-top: 20px;">暂时没有信息哦~</div>
             </div>
           </el-tab-pane>
       </el-tabs>
   </div>
</template>

<script type="text/ecmascript-6">

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
      showDateA:{
        type:Boolean,
        default:false
      },
      showDateB:{
        type:Boolean,
        default:false
      },
      showDateC:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {
        activeName: 'first',
        activeNames: ['0'],
        clientgo1:[
          {context:'贷款业务概览'},
          {context:'存款业务概览'},
          {context:'股权信息概览'}
        ],
        dataT:[
          {ss:'',dd:''},
          {ss:'',dd:''}
        ],
        imge:{
          image:'../../../../static/images/daikuan3x.png'
        },
        /*控制“暂无数据文字”的显示与隐藏*/
//        showDate6: false,
//        showDate7: false,
//        showDate8: false,
      }
    },
    activated(){
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }

  }
</script>

<style lang='scss' scoped>
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
.clientComp {
    width: 100%;
    background: #ffffff;

.el-tabs__item{
   width: 30%;
}
.el-tabs__nav{
 width: 97%;
    margin-left: .5rem;
}
.div1{
	margin-top: 50px;
}
.el-tabs__active-bar{
  background: red!important;
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
}
.colorone{
	color: #888888;
    margin-left: 1rem;
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

</style>

