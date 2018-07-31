<template>

  <div class="oneproject" :style="{height:divHeight+'px'}" ref="nav">
      <!--/**-->
      <!--* 产品ID-->
      <!--*/private String productId;-->
      <!--* 产品利率--><!--*/private String rate;-->
      <!--* 产品名称--><!--*/private String prodName;-->
      <!--* 产品描述--><!--*/private String prodDesc;-->
      <!--* 产品类型--><!--*/private String catlName;-->
      <!--* 产品发布时间--><!--*/private String prodStartDate;-->
      <!--* 产品发布截至时间--><!--*/private String prodEndDate;-->
      <!--* 是否在线销售--><!--private String prodState;-->
      <!--* 排序状态--><!--private String dataDesc;-->
      <!--* 所属跳线--><!--private String stripLine;-->
      <!--* 产品年限--><!--private String limitTime;-->
      <!--* 年费--><!--private String costRate;-->
      <!--* 风险等级--><!--private String riskLevel;-->
      <!--* 风险描述--><!--private String dangerDisc;-->
      <!--* 担保要求--><!--private String assureDisc;-->
      <!--* 产品特征--><!--private String prodCharact;-->
      <!--* 业务流程--><!--private String remark;-->
      <!--* 办理渠道--><!--private String unitname;-->
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :auto-fill="isAutoFill" ref="loadmore"
                 :top-method="loadTop" :top-all-loaded="allLoaded" @top-status-change="handleBottomChange"
    >
    <div  style="border-bottom: 1px solid #e5e5e5">
        <el-row v-for='(item,index) in solids' :key='index'  class="fuelrow" >
        <router-link :to="{path:'/productDetailPage',query:{productId:item.productId,title:item.prodName}}" class="fuelrow">
          <el-col :span="8" class="lhct">
            <!--利率-->
            <span class="pct">{{item.rate}}</span>
            <span class='ptextfrist'>最高收益率</span>
          </el-col>
          <el-col :span="16" class="rhct">
            <span class="ptextsecond">{{item.prodName}}</span>
            <br>
            <span class="ptextthird">{{item.prodDesc}}</span>
            <i>
              <img class="imges" :src="'./static/images/'+item.aliasName+'.png'" height="49" width="48" >
            </i>
          </el-col>
        </router-link>
      </el-row>
    </div>
    </mt-loadmore>
  </div>
</template>
<script src="../../../style/js/mui.min.js"></script>

<script type="text/ecmascript-6">

  import myBus from '../../tools/myBus.js';
  export default {
    data () {
      return {
//           solids:[
//        {pct:'3.8%', ptextfrist:'最高收益率',ptextsecond:'整存整取',ptextthird:'整存整取2年期限，一次存入本金，利率3.5%'},
//        {pct:'3.25%', ptextfrist:'最高收益率',ptextsecond:'整存整取',ptextthird:'起存金额为2万元，期限1年、2年、3年、5年，对应的年利率分别为2.11%、2.65%、3.25%和3.25%'},
//        {pct:'3.8%', ptextfrist:'最高收益率',ptextsecond:'整存整取',ptextthird:'整存整取2年期限，一次存入本金，利率3.5%'},
//        {pct:'3.25%', ptextfrist:'最高收益率',ptextsecond:'整存整取',ptextthird:'起存金额为2万元，期限1年、2年、3年、5年，对应的年利率分别为2.11%、2.65%、3.25%和3.25%'},
//        {pct:'3.8%', ptextfrist:'最高收益率',ptextsecond:'整存整取',ptextthird:'整存整取2年期限，一次存入本金，利率3.5%'},
//        {pct:'3.25%', ptextfrist:'最高收益率',ptextsecond:'整存整取',ptextthird:'起存金额为2万元，期限1年、2年、3年、5年，对应的年利率分别为2.11%、2.65%、3.25%和3.25%'}
//        ],

        allLoaded: false, //允许再次调用上拉函数
        isAutoFill: false, //是否自动触发下拉函数来填充满父盒子
        divHeight: 0, //父盒子合理的高度

      }
      },
    props:{
      solids:{
        type:Array,
        default:[]
      }
    },
    activated(){
    myBus.$emit('getTabbarHeight', (h) => {
      this.divHeight = document.documentElement.clientHeight - h - this.$refs.nav.$el.offsetHeight;
    });

  },

  methods:{
    //获取当前刷新状态
    handleBottomChange(s) {
      console.log("获取当前刷新状态");
      console.log(s)
    },

    loadBottom() {
      //通知组件的状态改变，从loadding进入pull
      this.$refs.loadmore.onBottomLoaded();
//        var count=1
      //获取下一页的数据
      this.$emit("loadBottom");
    },
    loadTop(){
      //通知组件的状态改变，从loadding进入pull
      this.$refs.loadmore.onTopLoaded();
//        var count=1
      //获取下一页的数据
      this.$emit("loadTop");
    },

    gd(){
      // console.log(this.item);
      this.$router.push('/productDetailPage')
    },


  }
  }
</script>

<style scoped>

  .lhct{
    margin-top:15px;
  }

.oneproject{
  position: absolute;
  top:115px;
  left: 0px;
  width:100%;
  height:600px !important;
  /*height: 79%;*/
  overflow: scroll;
  background-color: #fff;
}
.pct{
  font-size: 22px;
  margin-top:10px ;
}
.ptextfrist{
  display: inline-block;
  font-size: 14px;
}
.ptextsecond{
    font-size: 18px;
    margin-bottom: 30px;

}
.ptextthird{
   display: inline-block;
   font-size: 14px;
   padding-top: 10px;
   padding-bottom: 10px;
   color: #888888;

}
.imges{
  position: absolute;
  top: 0px;
  right: 0px;
}
.el-row{
border-top: 1px solid #ccc;
}
.el-col{
/*height: 150px;*/
}
.el-col:first-child{
  text-align: center;
  padding-top: 20px;

}

.el-col:first-child p[data-v-2597e95a], .el-col:first-child span[data-v-2597e95a]{
  /*margin:15px 10px 20px 10px;*/
}
.el-col:first-child p,.el-col:first-child span{
  color: red;
  /*margin: 10px;*/
  margin-bottom: 10px;
}
.el-col:last-child{
  padding-right: 20px;
  padding-top:20px;
}

</style>
