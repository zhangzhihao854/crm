<template>
  <div class="addBtn" >
     <div  id="echartContainer4" ></div>
     <div class="iconStyle">
       <el-row style="width:100%;height:100%;" align="middle" class='elrowbb'>
          <el-col
            :span="24/dataSize"
            @click.native="goNext(index)"
            v-for="(item,index) in dataSize"
            :key='index'
          ><div class="baseSetting" :class="{active: isActive==index}"></div></el-col>
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
       }
    },
    data () {
      return {
        isActive : 0,
        currentIndex:0,
        option:null,
        myChart:null,
        dataSize:this.labelType.length,
      }
    },
    activated () {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      this.datainit()

    },
    watch: {
      'dataText':  'getNweData',
    },

    methods: {
      //      让虚线、高亮区、灰色滑块都回置第一
      datainit(){
        this.isActive =0
        this.currentIndex=0
        console.log("我是labelType.length"+this.labelType.length);
        for(var i=0;i<this.labelType.length;i++){
          if(i==0){
            this.option.xAxis[0].data[0].textStyle.backgroundColor = "#EE5948";
            this.option.xAxis[0].data[0].textStyle.color = "#fff";
          }else{
            this.option.xAxis[0].data[i].textStyle.backgroundColor = "#fff";
            this.option.xAxis[0].data[i].textStyle.color = "#A4A8AB";
          }
        }



      },
        getNweData(){
          let _this =this
            console.log("height"+window.innerHeight)
            document.getElementById("echartContainer4").style.width = window.innerHeight+"px";
          if(this.$store.state.echartData.length!=0) {
            let myChart = echart.init(document.getElementById('echartContainer4'));

            let option = {
              title: {
                subtext: '单位/千万',
                subtextStyle: {
                  color: "#A8ACAF"
                }
              },
              tooltip: {
                trigger: 'axis',
                showContent: false,
                axisPointer: {
                  type: 'line',
                  lineStyle: {
                    type: "dashed"
                  }
                }
              },
              xAxis: [
                {
                  type: 'category',
                  data: this.labelType,
                  axisTick: {show: false},
                  axisLine: {show: false},
                  axisLabel: {
                    show: true, fontSize: "12", margin: 2, padding: [3, 4, 3, 4], interval: 0
                    , formatter: function (params) {
                      var newParamsName = "";// 最终拼接成的字符串
                      var paramsNameNumber = params.length;// 实际标签的个数
                      var provideNumber = 4;// 每行能显示的字的个数
                      var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                      /**
                       * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                       */
                      // 条件等同于rowNumber>1
                      if (paramsNameNumber > provideNumber) {
                        /** 循环每一行,p表示行 */
                        for (var p = 0; p < rowNumber; p++) {
                          var tempStr = "";// 表示每一次截取的字符串
                          var start = p * provideNumber;// 开始截取的位置
                          var end = start + provideNumber;// 结束截取的位置
                          // 此处特殊处理最后一行的索引值
                          if (p == rowNumber - 1) {
                            // 最后一次不换行
                            tempStr = params.substring(start, paramsNameNumber);
                          } else {
                            // 每一次拼接字符串并换行
                            tempStr = params.substring(start, end) + "\n";
                          }
                          newParamsName += tempStr;// 最终拼成的字符串
                        }

                      } else {
                        // 将旧标签的值赋给新标签
                        newParamsName = params;
                      }
                      //将最终的字符串返回
                      return newParamsName
                    }
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  axisTick: {show: false},
                  axisLine: {show: false},
                  axisLabel: {show: true, color: "#A8ACAF", fontSize: "12",}
                }
              ],
              grid: {
                x: 39,
                x2: 39,
                y2: 30
              },
              series: [
                {
                  name: '蒸发量',
                  type: 'bar',
                  barWidth : 25,//柱图宽度

//                  data: this.dataText[0],

                  data:this.$store.state.echartData[0],
                  itemStyle: {
                    normal: {color: "#9466FB"}
                  }

                },
                {
                  name: '降水量',
                  type: 'bar',
                  barWidth : 25,//柱图宽度
                  itemStyle: {
                    normal: {color: "#F9B14B"}
                  },
//                  data: this.dataText[1],
                  data:this.$store.state.echartData[1],
                },
                {
                  name: '降水量',
                  type: 'bar',
                  barWidth : 25,//柱图宽度
                  itemStyle: {
                    normal: {color: "#6A86FE"}
                  },
//                  data: this.dataText[2],
                  data:this.$store.state.echartData[2],
                },
                {
                  name: '降水量',
                  type: 'bar',
                  barWidth : 25,//柱图宽度
                  barCategoryGap: 30,
//                  data: this.dataText[3],
                  data:this.$store.state.echartData[3],
                  itemStyle: {
                    normal: {color: "#56D63F"}
                  }
                }, {
                  name: '降水量',
                  type: 'bar',
                  barWidth : 25,//柱图宽度
                  barCategoryGap: 30,
//                  data: this.dataText[4],
                  data:this.$store.state.echartData[4],
                  itemStyle: {
                    normal: {color: "#FB7263"}
                  }
                }, {
                  name: '降水量',
                  type: 'bar',
                  barWidth : 25,//柱图宽度
                  barCategoryGap: 30,
//                  data: this.dataText[5],
                  data:this.$store.state.echartData[5],
                  itemStyle: {
                    normal: {color: "#5FC7FF"}
                  }
                },

              ]
            };

//            销毁之前的数据
            myChart.clear();
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
              _this.myServices(param);
//         alert(param.dataIndex+':'+option.series[param.dataIndex].name);
              console.log(param.dataIndex)
            });

          }

        },



      addData(type){
        //alert(type);
        // this.$emit("addData",type);
        this.goAddData(type);
      },

      services(val) {
        this.myServices = val;
      },
      myServices(val) {

      },
      goNext(index){
         // alert(index);
         // this.currentIndex = -1;
        if(this.labelType.length) {
          this.isActive = (index + 1) % (this.labelType.length);
          // alert(this.isActive);
          // setInterval(function () {
          var dataLen = this.option.series[0].data.length;
          // console.log(this.option.series[this.currentIndex].data.length);
          console.log("我是 isactive"+this.isActive)
          //console.log(this.option);
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
        this.$emit('services-change', this.isActive);
      }
    },

  }
</script>

<style lang="scss">
  .addBtn{
    width: 100%;
    height: 250px;
    color: white;
    overflow: hidden;
    font-size: 14px;
    margin-top: 0px;
    margin-left: 0px;
    padding: 0;
    margin-right: 0px;
    bottom: 145px;
  }
 #echartContainer4{
  width:375px;
  height:210px;
 }
 .iconStyle{
  height: 24px;
 }
 .elrowbb{
  padding: 0 5%;
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
