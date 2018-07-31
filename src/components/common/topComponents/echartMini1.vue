<template>
  <div class="echartMini1" >
     <div  id="echartContainer1" ></div>
  </div>
</template>
<script>
import  echart from "echarts"
  export default {
    props:{
      labelType:{
        type:Array,
        default:[]
      },
      dataText:{
        type:Array,
        default:[]
      },
    },
    data () {
      return {
        dataSize:0,
        dataList: {},
        labType: '',
        activityIndex: 0,
        echartDataLen:0,
        cavHeight:0,


      }
    },
    beforeMount() {
      console.log("label--------->")
      console.log(this.labelType);
      //初始化数据
      this.dataSize = 0;
      this.echartDataLen = 0;
      this.cavHeight = 0;
      console.log(this.$store.state.echartData);
      //this.getNweData();
    },
    watch: {
      'dataText':  'getNweData',
    },
    methods: {
     //配置柱状图option
      getNweData(){
        /*设置画布的高度*/
        //获取支行的个数
        this.dataSize=this.labelType.length;
        //一个name显示几个柱状图
        this.echartDataLen = this.$store.state.echartData.length;
        this.cavHeight = this.dataSize*this.echartDataLen*35;
        if(this.dataSize <= 3){
          document.getElementById("echartContainer1").style.height = document.documentElement.clientHeight + "px";
        }else{
          document.getElementById("echartContainer1").style.height = this.cavHeight+"px";
        }
        let myChart = echart.init(document.getElementById('echartContainer1'));//初始化
        let  option = {
         /* title: {
            subtext: '单位/亿',
            subtextStyle: {
              color: "#A8ACAF"
            },
            left:'80%',
          },*/
          tooltip: {
            trigger: 'axis',
            triggerOn: 'click',
            axisPointer: {
              type: 'shadow',
            },
            formatter: (params) => {
              this.activityIndex = params[0].dataIndex;
              this.$emit('servicesChange',this.activityIndex)
              console.log(this.activityIndex);
            }
          },
          legend: {
           // data: ['2011年', '2012年']
          },
          grid: {
           /* left: '3%',
            right: '4%',
            bottom: '3%',*/
            top:10,
            containLabel: true
          },
          xAxis: {
            type: 'value',
            position: 'top',
            nameTextStyle: {
              align:'center',
              verticalAlign: 'middle',
            },
            axisLabel:{
              rotate:90,
            },
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: this.labelType,
            axisLabel:{
              rotate:-90,
            },
//            boundaryGap: ['20%', '20%'],
            inverse:'true',
            nameTextStyle: {
              align: 'center',
              verticalAlign: 'middle',
            },
            axisPointer: {
              type: 'shadow',
              //type: 'line',
              label: {
                show: false,
              },
              triggerTooltip: true,
              value:0,
              handle: {
                show: true,
                margin: 35,
                size: 25,
                color:"#D5DAE5"
              }
            },
          },
          series: [
            {
              name: '余额',
              type: 'bar',
              barWidth : 15,//柱图宽度
//              barCategoryGap: 15  ,
//              barGap: '30%',
              data:this.$store.state.echartData[0],
              itemStyle: {
                normal: {color:"#3BBAFF"}
              },
            },
            {
              name: '比年初',
              type: 'bar',
              barWidth : 15,//柱图宽度
//              barCategoryGap: 15,
//              barGap: '30%',
              itemStyle: {
                normal: {color: "#8855FB"}
              },
              data:this.$store.state.echartData[1],
            },
            {
              name: '比上月',
              type: 'bar',
              barWidth : 15,//柱图宽度
//              barCategoryGap: 15,
//              barGap: '30%',
              itemStyle: {
                normal: {color: "#F8A837"}
              },
              data:this.$store.state.echartData[2],
            },
            {
              name: '比昨日',
              type: 'bar',
              barWidth : 15,//柱图宽度
              //barCategoryGap: '10%',
              barGap: '40%',
              data:this.$store.state.echartData[3],
              itemStyle: {
                normal: {color: "#5A79FE"}
              },
            },
          ]
        };
        myChart.clear();
        myChart.setOption(option)

      }
    }

  }
</script>

<style>
  .echartMini1{
    width: 240px;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
    overflow-y: scroll;
  }
  #echartContainer1{
    width: 240px;
    height: 1000px;
  }
</style>
