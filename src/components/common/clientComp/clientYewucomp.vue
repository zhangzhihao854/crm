<template>
   <div class="clientComp" >
       <el-tabs v-model='activeName' @tab-click="handleClick">
           <el-tab-pane label="贷款业务概览"  name="first">

             <el-collapse accordion  v-model="activeNames" >
                  <div v-for="(item,index) in dataTexts">
                      <el-collapse-item :title= item.etlDate2>
                          <template slot="title">
                              <i class="iclass">{{index+1}}</i>
                              <i>{{item.etlDate2}}</i>
                          </template>
                          <div class="colorone">余额 <span class="redcolor blackco">{{item.curAcBl}}</span>元</div>
                          <div class="colorone">上年余额 <span class="redcolor blackco">{{item.lastAcBl}}</span>元</div>
                      </el-collapse-item>
                  </div>


               <!--判断数据为空时，显示暂无数据-->
               <div v-show="showDate6" style="text-align: center; margin-top: 20px">
                 <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
                   <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
                 </div>
                 <div style="margin-top: 20px;">暂时没有信息哦~</div>
               </div>
             </el-collapse>

           </el-tab-pane>

           <el-tab-pane label="存款业务概览" name="second">

             <el-collapse>

             <div v-for="(item,index) in dataText1s">
               <el-collapse-item  :title= item.etlDate2>
                 <template slot="title">
                   <i class="iclass">{{index+1}}</i>
                   <i>{{item.etlDate2}}</i>
                 </template>

                 <div class="colorone">余额 <span class="redcolor blackco">{{item.curAcBl}}</span>元</div>
                 <div class="colorone">月日均 <span class="redcolor blackco">{{item.curMonthAvg}}</span>元</div>
                 <div class="colorone">年日均 <span class="redcolor blackco">{{item.curYearAvg}}</span>元</div>
                 <div class="colorone">上年余额 <span class="redcolor blackco">{{item.LastAcBl}}</span>元</div>
                 <div class="colorone">上年月日均 <span class="redcolor blackco">{{item.lastMonthAvg}}</span>元</div>
                 <div class="colorone">上年年日均 <span class="redcolor blackco">{{item.lastYearAvg}}</span>元</div>
               </el-collapse-item>
             </div>
               <!--判断数据为空时，显示暂无数据-->
               <div v-show="showDate7" style="text-align: center; margin-top: 20px">
                 <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
                   <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
                 </div>
                 <div style="margin-top: 20px;">暂时没有信息哦~</div>
               </div>
           </el-collapse>
           </el-tab-pane>

           <el-tab-pane label="股权业务概览" name="third">
             <el-collapse>
               <div v-for="(item,index) in dataText2s">
                 <el-collapse-item :title= item.etlDate2>
                   <template slot="title">
                     <i class="iclass">{{index+1}}</i>
                     <i>{{item.etlDate2}}</i>
                   </template>

                   <div class="colorone">余额 <span class="redcolor blackco">{{item.curAcBl}}</span>元</div>
                   <div class="colorone">月日均 <span class="redcolor blackco">{{item.curMonthAvg}}</span>元</div>
                   <div class="colorone">年日均 <span class="redcolor blackco">{{item.curYearAvg}}</span>元</div>
                   <div class="colorone">上年余额 <span class="redcolor blackco">{{item.LastAcBl}}</span>元</div>
                   <div class="colorone">上年月日均 <span class="redcolor blackco">{{item.lastMonthAvg}}</span>元</div>
                   <div class="colorone">上年年日均 <span class="redcolor blackco">{{item.lastYearAvg}}</span>元</div>
                 </el-collapse-item>
               </div>
               <!--判断数据为空时，显示暂无数据-->
               <div v-show="showDate8" style="text-align: center; margin-top: 20px">
                 <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
                   <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
                 </div>
                 <div style="margin-top: 20px;">暂时没有信息哦~</div>
               </div>
           </el-collapse>
           </el-tab-pane>
       </el-tabs>
   </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props:{
          dataTexts:{
              type:Array,
              default:[]
          },
        dataText1s:{
            type:Array,
            default:[]
        },
        dataText2s:{
            type:Array,
            default:[]
        },
      showDate6:{
        type:Boolean,
        default:false
      },
      showDate7:{
        type:Boolean,
        default:false
      },
      showDate8:{
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

