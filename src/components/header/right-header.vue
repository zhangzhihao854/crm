<template>
  <div class="headerWrap">
    <el-row class="elWrap" :style="{width:clientHeight+'px'}">
      <el-col :span="4">
        <div class="imgWrap grid-content bg-purple-dark">
          <img src="../../../static/images/nav_icon_back@2x.png" alt="返回" @click="goUpPage">
        </div>
      </el-col>
      <el-col :span="16" class="dataTit">
        <div class="tit grid-content bg-purple-dark">
          {{title}}
        </div>
      </el-col>
      <el-col :span="4" style="display: none">

      </el-col>
    </el-row>
  </div>
</template>
<script>
    export default {
      data () {
        return {
          clientHeight:0,
        }
      },
      activated(){
          //获取屏幕的高度
          this.clientHeight= document.documentElement.clientHeight;
      },
      props: {
        title: {
          type: String,
          default: ''
        },
      },
      methods:{
        //返回上一页
        goUpPage(){
            this.$router.go(-1)
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
</style>
