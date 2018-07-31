<template>
  <div class="addBtn" >
     <div  id="echartContainer" ></div>
     <div class="iconStyle">
       <!--<el-row style="width:100%;height:100%;" align="middle" class="elrowbox">
          <el-col
            :span="24/dataSize"
            @click.native="goNext(index)"
            v-for="(item,index) in dataSize"
            :key='index'
          >
            <div class="baseSetting" :class="{active: isActive==index}"></div>
          </el-col>
        </el-row>-->
     </div>
  </div>
</template>
<script>
import  echart from "echarts"
import  PubSub from 'pubsub-js'
  export default {
    props:{
       labelType:{
         type:Array,
         default:[]
       },
       dataArray:{
        type:Array,
        default:[
            {value: 60, name: '访问'},
            {value: 40, name: '咨询'},
            {value: 20, name: '订单'},
            {value: 80, name: '点击'},
            {value: 100, name: '展现'}
          ]
       },
       dataText:{
        type:Array,
        default:[]
       },
    },
    data () {
      return {
        isActive :0,
        currentIndex:0,
        option:null,
        myChart:null,
        dataSize:this.labelType.length,
        activityIndex: 0,
        labType: ''
      }
    },
     activated () {
       this.datainit()

     },
      watch:{
        'dataText':'getNweData',
      },
    methods: {
//      让虚线、高亮区、灰色滑块都回置第一
        datainit(){
          this.isActive =0
          this.currentIndex=0
          console.log(this.option)
          if(this.option){
          this.option.xAxis[0].data[0].textStyle.backgroundColor = "#fff";
          this.option.xAxis[0].data[0].textStyle.color = "#A4A8AB";
          this.option.xAxis[0].data[1].textStyle.backgroundColor = "#fff";
          this.option.xAxis[0].data[1].textStyle.color = "#A4A8AB";
          this.option.xAxis[0].data[2].textStyle.backgroundColor = "#fff";
          this.option.xAxis[0].data[2].textStyle.color = "#A4A8AB";
          }
        },

        getNweData(){
            let _this = this;
            console.log(this.$store.state.echartData + '柱状图数据');
            if(this.$store.state.echartData.length!=0)
            {
                let myChart = echart.init(document.getElementById('echartContainer'));//初始化
                let option = {
                    title : {
                        subtext: '单位/亿',
                        subtextStyle:{
                            color:"#A8ACAF"
                        }
                    },
                    /*axisPointer:{
                      triggerOn:'click'
                    },*/
                    tooltip : {
                        trigger: 'axis',
//                        showContent:false,
                        triggerOn: 'click',
                        axisPointer: {
                            type: 'line',
                            lineStyle:{
                                type:"dashed"
                            }
                        },
                      formatter: (params) => {
                        console.log(params);
                        if(params[0].axisValue === "2000万以下"){
                          this.labType = "139270e733424758aa63cf76fa84643d";
                        }else if(params[0].axisValue === "500万以下"){
                          this.labType = "6c7e09c05287444dbb727e340eb263fc";
                        }else if(params[0].axisValue === "500-2000万"){
                          this.labType = "39160437e7dc4939849134642e84f592";
                        }else if(params[0].axisValue === "储蓄存款"){
                          this.labType ="8846c482f2ec4c86a2841fcc72596d43";
                        }else if(params[0].axisValue === "活期存款"){
                          this.labType ="db2bbae42a8e445e897fd0a70fb434e4";
                        }else if(params[0].axisValue === "定期存款"){
                          this.labType ="d0ee2b813cb1456384d70e87ceebde84";
                        }
                        this.activityIndex = params[0].dataIndex;
                        console.log(this.activityIndex)
                        this.$emit('servicesChange',this.labType,this.activityIndex)

                      }
                    },
                    xAxis : [
                        {
                            type : 'category',
                            axisTick:{show:false},
                            axisLine:{show:false},
                            scale: true,
                            axisLabel:{
                                show:true,
                                fontSize:"12",
                                margin:2,
                                padding: [3, 4, 3, 4]
                            },
                            axisPointer: {
                              type: 'shadow',
                              //type: 'line',
                              label: {
                                  show: false,
                              },
                              triggerTooltip: true,
                              handle: {
                                show: true,
                                margin: 40,
                                size: 30,
                                color:"#D5DAE5"
                              }
                            },
                          data: this.labelType,
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisTick:{show:false},
                            axisLine:{show:false},
                            axisLabel:{show:true,color:"#A8ACAF",fontSize:"12"}
                        }
                    ],
                    grid:{
                        x:39,
                        x2:39,
                        y2:60
                    },
                    series : [
                        {
                            name:'贷款余额',
                            type:'bar',
                            barWidth : 15,//柱图宽度
                            itemStyle:{
                                normal:{color:"#3BBAFF"}
                            },
                           data:this.$store.state.echartData[0],


                        },
                        {
                            name:'比年初增',
                            type:'bar',
                          barWidth : 15,//柱图宽度
                            itemStyle:{
                                normal:{color:"#8855FB"}
                            },
                            data:this.$store.state.echartData[1],

                        },
                        {
                            name:'比上月降',
                            type:'bar',
                          barWidth : 15,//柱图宽度
                            itemStyle:{
                                normal:{color:"#F8A837"}
                            },
                            data:this.$store.state.echartData[2],

                        },
                        {
                            name:'比昨日降',
                            type:'bar',
                          barWidth : 15,//柱图宽度
                          barGap: '40%',
                            data:this.$store.state.echartData[3],
                            itemStyle:{
                                normal:{color:"#5A79FE"}
                            },

                        }],

                };
                myChart.clear();//销毁之前的表格数据
                this.option = option;
                this.myChart = myChart;
                window.onresize = this.myChart.resize();
                myChart.setOption(option);
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 0
                });
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: 0
                });
                myChart.on("click", function (param){
                  //_this.myServices(param);
                  console.log(param.dataIndex)
                });

            }
        },
      addData(type){
        //alert(type);
        // this.$emit("addData",type);
        this.goAddData(type);
      },

      goNext(index){
          if(this.labelType.length){
        this.isActive = (index+1)%(this.labelType.length);

        var dataLen = this.option.series[0].data.length;
        console.log("isActive"+this.isActive)

        this.option.xAxis[0].data[this.isActive].textStyle.backgroundColor = "#EE5948";
        this.option.xAxis[0].data[this.isActive].textStyle.color = "#fff";
         this.option.xAxis[0].data[this.currentIndex].textStyle.backgroundColor = "#fff";
        this.option.xAxis[0].data[this.currentIndex].textStyle.color = "#A4A8AB";

        // 取消之前高亮的图形
        this.myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.currentIndex
        });
        this.currentIndex = (this.currentIndex + 1) % dataLen;
        // 高亮当前图形
        this.myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: this.currentIndex
        });
        //虚线
        // 显示 tooltip
        this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: this.currentIndex
        });
            // }, 1000);
        this.myChart.setOption(this.option);
          }
          //取消掉之前的事件
       // this.$emit('services-change', this.isActive);


      }
    }

  }
</script>

<style lang="scss">
  .addBtn{
    width: 100%;
    height: 320px!important;
    color: white;
    font-size: 14px;
    margin-top: 0px;
    margin-left: 0px;
    padding: 0;
    margin-right: 0px;
    bottom: 145px;
  }
 #echartContainer{
   background-color: #fff !important;
   width:375px;
   height:300px;
 }
 .iconStyle{
  height: 24px;
 }
 .active{
  background-image: url("../../../../static/images/echartIcon.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
 }
 .elrowbox{
  padding: 0 10%;
 }
 .baseSetting{
   height:24px;
   width:35px;
   margin: 0 auto;
 }

</style>
