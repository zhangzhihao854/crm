<template>
      <!--<div class="echartSize" id="magicEchart" style="width: 1600px;height: 760px;">-->
      <div id="magicEchart" :class="{echartSize:!echartsData.isSize,echartSize1:echartsData.isSize}">
      </div>

</template>
<script>
   import echarts from "echarts"
   import {formatDate} from '../../../config/mUtils'
   import {getData} from '../../../service/getData'
   import {baseUrl} from '../../../config/env'
   import {mapState} from 'vuex'
   import {setStore} from '../../../config/mUtils'

   export default {
       props: {
           echartsData: {
               type: Object,
               default: function () {
                   return {
                       reportChartId: 1,
                       legendData: [],
                       seriesData: [
                           {
                               'name': 'line',
                               'barWidth':'20%',
                               'type': 'line',
                               'stack': '总量',
                               'itemStyle': {},
                               'data': [],
                           }
                       ],
                       xData: [],
                       echartDatas: {},
                       boundaryGap : false,
                       xName: "横坐标",
                       yName: "纵坐标",
                       titleText: "",
                       allReport: "",
                       isSize: false
                   };
               }
           },
       },
//       activated () {
//           this.getEcharts();
//           window.onresize();
//       },
       data() {
           return {
               echartsOption: null,
               picInfo: ''
           }
       },
       watch: {
           'echartsData.echartDatas':  'getReportChartId',
       },
       methods: {
           getReportChartId: function () {
               if(this.echartsData.reportChartId != 1&&document.getElementById('magicEchart') != null){
                  this.getEcharts();
                  window.onresize();
               }
           },
           getEcharts(){
               var echartsOption = echarts.init(document.getElementById('magicEchart'));
               var option = {
                   backgroundColor: "#fff",
                   title: {
                       textStyle: {
                           fontSize: 25
                       },
                       top: 10,
                       left: 'center',
                       text: this.echartsData.titleText,
                       subtext: this.echartsData.allReport,
                   },
                   tooltip: {
                       trigger: 'axis'
                   },
                   legend: {
                       type: 'scroll',
                       orient: 'vertical',
                       right: 20,
                       top: 50,
                       bottom: 20,
                       data: this.echartsData.legendData,
                       formatter: function (name) {
                           return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
                       },
                       tooltip: {
                           show: true
                       },
                   },
                   grid: {
                       top: '13%',
                       left: '3%',
                       right: '13%',
                       bottom: '8%',
                       containLabel: true
                   },
                   toolbox: {
                       top: 10,
                       right: 20,
                       feature: {
                           dataView : {show: true, readOnly: false},
                           magicType: {
                               type: ['line','stack','bar', 'tiled']
                           },
                           restore : {show: true},
                           saveAsImage: {},
                       }
                   },
                   xAxis: {
                       name: this.echartsData.xName,
                       axisLabel: {
                           fontSize: 13,
                           interval: 0,
                           rotate: 25
                       },
                       type: 'category',
                       boundaryGap: this.echartsData.boundaryGap,
                       data: this.echartsData.xData,
                   },
                   yAxis: {
                       name: this.echartsData.yName,
                       type: 'value'
                   },
                   series:  this.echartsData.seriesData
               };
               echartsOption.clear();
               echartsOption.setOption(option);
               //               _isDestroyed这个属性表示的是当前这个组件是否有被销毁，true表示当前的组件已经被销毁，通过下面这个判断，我们就不需要自己手动的去用ID来清除了，这个就相当于递归，有了一个结束判断，避免了死循环
               let self=this;
               if (self && !self._isDestroyed) {
                   console.log(self._isDestroyed);
                   setTimeout(() => {
                       if (self && !self._isDestroyed)
                       //调用echarts的getDataURL方法将图标转为base64,传到父组件，使用setTimeout的原因是echarts除了柱状图生成的图片需要经过1，2秒
                       var picInfo = echartsOption.getDataURL();
                       console.log("2_1步");
                       self.$emit('setMagicPicInfo',picInfo);
                   }, 300);
               }
               window.onresize = function(){
                   echartsOption.resize();
               };
           },
       }
   }
</script>
<style lang="scss" rel="stylesheet/scss">

</style>