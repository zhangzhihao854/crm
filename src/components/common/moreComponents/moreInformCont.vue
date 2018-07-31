<template>
   <div class="moreInformCont activityNotice" :style="{height:divHeight+'px'}" ref="nav">
     <div style="height:10px;background-color:rgb(246,248,248); border-bottom: 1px solid #e5e5e5 "></div>
     <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :auto-fill="isAutoFill" ref="loadmore"
     >
<el-collapse style="margin-bottom: 40px">
  <!--@click.native='ch(index)'-->
  <div v-for="(item,index) in sliders" key='item' style="border-bottom: 1px solid #e5e5e5">
  <div class="mui-checkbox">
    <input name="checkbox" class="checkipt" type="checkbox" >
  </div>
  <el-collapse-item>
    <template slot="title">
      <div class="mui-input-row mui-checkbox mui-left">
        <label>
          <img class='imges' src="../../../../static/images/_s-icon_woman_pressed@3x.png" width="23" height="23"></i>
          <span  class="ifmContspan"> &nbsp;{{item.custName}}</span>
        </label>
      </div>
         </template>
        <div class="property"><i>资产规模：</i>{{item.amount}}</div>
       <div class="customer"><i>存款日均：</i>{{item.depositeAvgM}}</div>

     </el-collapse-item>
     </div>
   </el-collapse>
       </mt-loadmore>
   </div>
</template>
<script src="../../../style/js/mui.min.js"></script>
<script type=text/ecmascript-6>
  import myBus from '../../tools/myBus.js';
  export default {

    data () {
      return {
          slides:[
          {textCont:'蒋子兰', textCont1:'1233',textCont2:'黄金',textCont3:'28万元',src:require('../../../../static/images/_s-icon_woman_pressed@3x.png')},
          {textCont:'梦轩',textCont1:'1233',textCont2:'白银',textCont3:'28万元',src:require('../../../../static/images/daikuan3x.png')},
          {textCont:'梦萍', textCont1:'1233',textCont2:'青铜',textCont3:'28万元',src:require('../../../../static/images/daikuan3x.png')},
          {textCont:'李彩晨', textCont1:'1233',textCont2:'青铜',textCont3:'28万元',src:require('../../../../static/images/daikuan3x.png')},
          {textCont:'蒋子兰', textCont1:'1233',textCont2:'黄金',textCont3:'28万元',src:require('../../../../static/images/daikuan3x.png')},
          {textCont:'梦轩',textCont1:'1233',textCont2:'白银',textCont3:'28万元',src:require('../../../../static/images/daikuan3x.png')},
          {textCont:'梦萍', textCont1:'1233',textCont2:'青铜',textCont3:'28万元',src:require('../../../../static/images/daikuan3x.png')},
          {textCont:'李彩晨', textCont1:'1233',textCont2:'青铜',textCont3:'28万元',src:require('../../../../static/images/daikuan3x.png')},
          ],
          index1:'-1',
        allLoaded: false, //允许再次调用上拉函数
        isAutoFill: false, //是否自动触发下拉函数来填充满父盒子
        divHeight: 0, //父盒子合理的高度
      }
      },
    activated(){
      myBus.$emit('getTabbarHeight', (h) => {
        this.divHeight = document.documentElement.clientHeight - h - this.$refs.nav.$el.offsetHeight;
      });
    },
    props:{
      sliders:{
        type:Array,
        defaule:[]
      }
    },
      methods:{
        ch(index,custName){
          this.index1=index;

        },
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
      }
  }
</script>

<style scoped>
  .ifmContspan{
    font-size: 17px !important;
    color: rgb(34, 34, 34) !important;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 60%;
    display: inline-block
  }
  .mui-checkbox input[type=checkbox], .mui-radio input[type=radio]{
    top:10px !important;
  }
  .mui-checkbox input[type=checkbox], .mui-radio input[type=radio]{
    /*position: inherit;*/
    left:8px;
  }
.property{
	display: inline-block;
	margin-left: 10%;
  margin-top: 10px;
}
.customer{
	float: right;
	margin-right:10%;
  margin-top: 10px;

}
.deposit{
	margin-left: 20%;
}
div i{
	color:#888888;
}
.imges{
	margin-left: 5%;
	margin-right: 5%;
	vertical-align: middle;
}
 .informCont{
  margin-top: 1em!important;
}
.el-checkbox{
  width: 20px;
}
.el-collapse-item {
  border-bottom: none !important;
}
  .mui-checkbox input[type=checkbox][data-v-3b6dc666], .mui-radio input[type=radio][data-v-3b6dc666] {
    top: 10px !important;
    left:10px;
  }
  .mui-checkbox.mui-left label, .mui-radio.mui-left label {
    padding-right: 15px;
    padding-left: 5px;
  }
  .mui-input-row .mui-btn+input, .mui-input-row label+input, .mui-input-row:last-child {
    background: 0 0;
    margin-left: 20px;
  }
  .activityNotice .ifmContspan[data-v-3b6dc666]{
    vertical-align: middle !important;
  }

</style>
