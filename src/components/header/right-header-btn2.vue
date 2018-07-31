<template>
  <div class="headerWrap">
    <el-row class="elWrap" :style="{width:clientHeight+'px'}">
      <el-col :span="4">
        <div class="imgWrap grid-content bg-purple-dark">
          <img src="../../../static/images/nav_icon_back@2x.png" alt="返回" @click="goUpPage">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="tit grid-content bg-purple-dark">
          {{title}}
        </div>
      </el-col>
      <el-col :span="4">
        <div class="tit grid-content bg-purple-dark">
          <button @click="goDetail" class="detailBtn">查看详情</button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
    export default {
      props:{
        dataType: {
            type:String,
            default: ''
        },
        currentTime: {
          type:String,
          default: ''
        },
        title: {
          type: String,
          default: ''
        },
        mark: {
          type: Number,
          default: 0
        },
      },
      data () {
        return {
          clientHeight:0,
        }
      },
      activated(){
          //获取屏幕的高度
          this.clientHeight= document.documentElement.clientHeight;
      },
      mounted(){
      },
      methods:{
        //返回上一页
        goUpPage(){
            this.$router.go(-1)
        },
        //查看详情方法
        goDetail(){
          /*if(this.mark === 1){
            this.$router.push('/echartsBoxBxq?dataType='+this.dataType+'&currentTime='+this.currentTime);
          }else if(this.mark === 4){
            this.$router.push('/echartsBoxBBxq?dataType='+this.dataType+'&currentTime='+this.currentTime);
          }else if(this.mark === 2){
            this.$router.push('/echartsBoxCxq?dataType='+this.dataType+'&currentTime='+this.currentTime);
          }else if(this.mark === 3){
            this.$router.push('/echartsBoxCCxq?dataType='+this.dataType+'&currentTime='+this.currentTime);
          }
*/
          if(this.mark === 2){
            this.$router.push('/echartsBoxCxq?dataType='+this.dataType+'&currentTime='+this.currentTime);
          }else if(this.mark === 3){
            this.$router.push('/echartsBoxCCxq?dataType='+this.dataType+'&currentTime='+this.currentTime);
          }
        }
      }
    }
</script>

<style scoped>
  .headerWrap{
    transform: rotate(90deg);
    -ms-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    -webkit-transform:rotate(90deg);
    -o-transform:rotate(90deg);
  }
  .headerWrap .elWrap{
    height:44px;
    line-height: 44px;
  }
  .headerWrap .imgWrap{
    padding-left: 10px;
  }
  .headerWrap .imgWrap img{
    width: 50px;
    height: 26px;
    vertical-align: middle;
  }
  .headerWrap .tit{
    text-align: center;
    font-size: 1rem;
  }
  .headerWrap .detailBtn{
    color: #fff;
    background-color: #409EFF;
    vertical-align: middle;
    line-height: 1;
  }
</style>
