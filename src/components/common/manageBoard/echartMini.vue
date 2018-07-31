<template>
  <div class="addBtn">
     <div id="echartContainer"></div>
     <div class="iconStyle">
        <el-row style="width:100%;height:100%;" align="middle">
          <el-col  :span="5" ><div style="width:22px;height:24px;"></div></el-col>
          <el-col  :span="6" @click.native="goNext(0)"><div class="baseSetting" :class="{active: isActive==0}"></div></el-col>
          <el-col  :span="6" @click.native="goNext(1)"><div class="baseSetting" :class="{active: isActive==1 }"></div></el-col>
          <el-col  :span="6" @click.native="goNext(2)"><div class="baseSetting" :class="{active: isActive==2 }"></div></el-col>
        </el-row>
     </div>
  </div>
</template>
<script>
import  echart from "echarts"
  export default {
    props:{
       labelType:{
         type:Array,
         default:['<span style="color:#f00;">2000万以下</span>','500万以下','500-200万']
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
       }
    },
    data () {
      return {
        isActive : 0,
        currentIndex:0,
        option:null,
        myChart:null,
      }
    },
     mounted () {

    let myChart = echart.init(document.getElementById('echartContainer'));
    let option = {
    title : {
        subtext: '单位/亿',
        subtextStyle:{
          color:"#A8ACAF"
        }
    },
    tooltip : {
        trigger: 'axis',
        showContent:false,
        axisPointer: {
            type: 'line',
            lineStyle:{
                type:"dashed"
            }
        }
    },
    xAxis : [
        {
            type : 'category',
            data : this.labelType,
            axisTick:{show:false},
            axisLine:{show:false},
            axisLabel:{show:true,fontSize:"12",margin:2,padding: [3, 4, 3, 4]},
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
        y2:25
    },
    series : [
        {
            name:'蒸发量',
            type:'bar',
            data:[20.0, 49, 30],
            itemStyle:{
              normal:{color:"#3BBAFF"}
            }

        },
        {
            name:'降水量',
            type:'bar',
            itemStyle:{
              normal:{color:"#8855FB"}
            },
            data:[26, 39, 19],
        },
        {
            name:'降水量',
            type:'bar',
            itemStyle:{
              normal:{color:"#F8A837"}
            },
            data:[19, 44, 35],
        },
        {
            name:'降水量',
            type:'bar',
            barCategoryGap:30,
            data:[33, 27, 47],
            itemStyle:{
              normal:{color:"#5A79FE"}
            }
        }

    ]
};

    this.option = option;
    this.myChart = myChart;
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

  },
    methods: {
      addData(type){
        //alert(type);
        // this.$emit("addData",type);
        this.goAddData(type);
      },
      goNext(index){
         // alert(index);
         // this.currentIndex = -1;
        this.isActive = (index+1)%3;
       // alert(this.isActive);
       // setInterval(function () {
        var dataLen = this.option.series[0].data.length;
        console.log(this.option.series[this.currentIndex].data);

        console.log(this.option);
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
        // 显示 tooltip
        this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: this.currentIndex
        });
    // }, 1000);
        this.myChart.setOption(this.option);


      }
    },

  }
</script>

<style lang="scss">
  .addBtn{
    position: relative;
    width: 100%;
    height: 345px;
    background-color:white;
    overflow: hidden;
    font-size: 14px;
    transform:rotate(90deg);
    -ms-transform:rotate(90deg); /* Internet Explorer */
    -moz-transform:rotate(90deg); /* Firefox */
    -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
    -o-transform:rotate(90deg); /* Opera */
  }
  #echartContainer{
  width:100%;
  height: 310px;
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
 .baseSetting{
   height:24px;
    width:35px;
 }
</style>
