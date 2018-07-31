<template>
  <div class="login">
      <div id="result"></div>
    <div>
      <!--<componentA></componentA>-->
    </div>
  </div>

</template>

<script>
import  echart from "echarts"
//import componentA from '../pages/componentA'
export default {
  mounted () {

    let myChart = echart.init(document.getElementById('result'));
    let option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
      },
      legend: {
        data: ['展现','点击','访问','咨询','订单']
      },
      calculable: true,
      series: [
        {
          name:'漏斗图',
          type:'funnel',
          left: '5%',
          top: 60,
          //x2: 80,
          bottom: 60,
          width: '80%',
          // height: {totalHeight} - y - y2,
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            normal: {
              show: true,
              position: 'inside'
            },
            emphasis: {
              textStyle: {
                fontSize: 20
              }
            }
          },
          labelLine: {
            normal: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 1
            }
          },
          data: [
            {value: 60, name: '访问'},
            {value: 40, name: '咨询'},
            {value: 20, name: '订单'},
            {value: 80, name: '点击'},
            {value: 100, name: '展现'}
          ]
        }
      ]
    };

    myChart.setOption(option);

  },
  components:{
//    componentA
  },
  data () {
    return {
      dataList :[],
    }
  },
  computed:{
     totolPrice () {
         return this.$store.state.totalPrice;
     }
  },
  methods:{
    gologin () {
//      var params = new Object();
//      params.projectFlag = "kk";
//      this.getRequest("http://bidstest.countrygarden.com.cn:8080/commonService2/designHRFB/getSys.action",params).then((res)=>{
//        console.log(res);
//        this.dataList = res.data;
        this.$router.push('/main');
//      }).catch((error)=>{
//        console.log(error);
//      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/*less 变量引用*/
.login{
  height:auto;
  background-color: #b4b472;
  height:100%;
  text-align: center;
}
#result{
  width:100%;
  height: 350px;
}

</style>
