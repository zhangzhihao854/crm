<template>
   <div class="clientComp LSzhanghu"  id="clientLS">
       <el-tabs v-model='activeName'>
           <el-tab-pane label="个人贷款账户" name="first">
             <div style="width: 100%; height: 15px; background-color: #F8F9FB; text-align: center; line-height: 100px"></div>
             <el-collapse accordion  v-model="activeNames">
                 <div v-for="item in dataText" v-show="!showDate3">
                     <el-collapse-item>
                         <template slot="title">
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
             <!--判断数据为空时，显示暂无数据-->
             <div v-show="showDate3" style="text-align: center; margin-top: 20px">
               <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
                 <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
               </div>
               <div style="margin-top: 20px;">暂时没有信息哦~</div>
             </div>
           </el-tab-pane>

           <el-tab-pane label="个人存款账户" name="second">
             <div style="width: 100%; height: 15px; background-color: #F8F9FB;"></div>
             <el-collapse>
               <div v-for="item in dataText1" v-show="!showDate4">
                 <el-collapse-item>
                 <template slot="title">
                   <i></i><i class="cilentfont">{{item.acctNo}}000</i>
                 </template>
                 <div class="colorone">账号<span class="redcolor blackco"></span>{{item.acctNo}}1</div>
                 <div class="colorone">分账号 <span class="redcolor blackco"></span>{{item.subAcctNo}}2</div>
                 <div class="colorone">卡号 <span class="redcolor blackco"></span>{{item.cardNo}}3</div>
                 <div class="colorone">账户状态 <span class="redcolor blackco"></span>{{item.accountStat}}4</div>
                 <div class="colorone">客户名称 <span class="redcolor blackco"></span>{{item.name}}5</div>
                 <div class="colorone">开户日期 <span class="redcolor blackco"></span>{{item.openAccountDate2}}6</div>
                 <div class="colorone">开户网点名 <span class="redcolor blackco"></span>{{item.orgName}}7</div>
                 <div class="colorone">币种 <span class="redcolor blackco"></span>{{item.curType}}8</div>
                 <div class="colorone">余额（折人民币）<span class="redcolor blackco">{{item.amount}}9</span>元</div>
                 <div class="colorone">科目名称<span class="redcolor blackco"></span>{{item.subjects}}10</div>
                 <div class="colorone">年日均余额<span class="redcolor blackco">{{item.depositeAvgY}}11</span>元</div>
                 <div class="colorone">月日均余额<span class="redcolor blackco">{{item.depositeAvgM}}12</span>元</div>
               </el-collapse-item>
               </div>
             </el-collapse>
             <!--判断数据为空时，显示暂无数据-->
             <div v-show="showDate4" style="text-align: center; margin-top: 20px">
               <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
                 <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
               </div>
               <div style="margin-top: 20px;">暂时没有信息哦~</div>
             </div>
           </el-tab-pane>

           <el-tab-pane label="股权信息" name="third">
             <div style="width: 100%; height: 15px; background-color: #F8F9FB; text-align: center; line-height: 100px"></div>
             <el-collapse>
                 <div v-for="item in dataText2" v-show="!showDate5">
               <el-collapse-item>
                 <template slot="title">
                   <i></i><i class="cilentfont">{{item.acctNo}}</i>
                 </template>
                 <div class="colorone">账号 <span class="redcolor blackco"></span>{{item.acctNo}}</div>
                 <div class="colorone">分账号 <span class="redcolor blackco"></span>{{item.subAcctNo}}</div>
                 <div class="colorone">卡号 <span class="redcolor blackco"></span>{{item.cardNo}}</div>
                 <div class="colorone">客户名称 <span class="redcolor blackco"></span>{{item.name}}</div>
                 <div class="colorone">开户日期 <span class="redcolor blackco"></span>{{item.openAccountDate2}}</div>
                 <div class="colorone">开户网点名 <span class="redcolor blackco"></span>{{item.orgName}}</div>
                 <div class="colorone">币种 <span class="redcolor blackco"></span>{{item.curType}}</div>
                 <div class="colorone">余额（折人民币） <span class="redcolor blackco"></span>{{item.amount}}</div>
                 <div class="colorone">科目名称 <span class="redcolor blackco"></span>{{item.subjects}}</div>
                 <div class="colorone">年日均余额 <span class="redcolor blackco">{{item.depositeAvgY}}</span></div>
                 <div class="colorone">月日均余额 <span class="redcolor blackco">{{item.depositeAvgM}}</span></div>
               </el-collapse-item>
             </div>
             </el-collapse>
             <!--判断数据为空时，显示暂无数据-->
             <div v-show="showDate5" style="text-align: center; margin-top: 20px">
               <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
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
        showDate3:{
          type:Boolean,
          default:false
        },
        showDate4:{
          type:Boolean,
          default:false
        },
        showDate5:{
          type:Boolean,
          default:false
        },
      },
    activated(){
    },
    data () {
      return {
            //activeName:"0",
            activeName: 'first',
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


          }
    },
      methods: {

      }
  }
</script>

<style lang='scss' scoped>
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
.clientComp .el-collapse{
  border-top: 1px solid #ECF0F7 !important;
}

.LSzhanghu .el-collapse-item__header{
  padding-left: 0.5rem!important;
}
</style>

