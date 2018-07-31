<template>
    <div class='producAll' >
      <el-row>
       <el-col :span="8" @click.native='turncolor(index)'>
         <div class="grid-content "
              :style='{color:protypeproduce=="全部类型"?text1:"red",borderBottom:protypeproduce=="全部类型"?text2:"3px solid red;"}'>{{protypeproduce}}
           <span>
              <img class="imgs" :src="src[index]" height="20px" width="20px">
           </span>
         </div>
       </el-col>
       <el-col :span="8">
         <div class="grid-content1 " @click="timmer">
           <img src="../../../../static/images/sort_icon@2x.png" width="13px" height="14px" >时间排序</div></el-col>
       <el-col :span="8" @click.native='gonextpage'><div class="grid-content2 " ><img src="../../../../static/images/screen_icon@3x.png" height="14" width="13">筛选</div></el-col>

</el-row>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        src:[require('../../../../static/images/sanjiao.png'),require('../../../../static/images/snajiao2.png')],
        index:0,
        text1:'black',
        text2:'none',
        isShow:false
      }
    },
    props:{
      protypeproduce:{
        type:String,
        default:"全部类型"
      }
    },
    activated(){
      this.isShow=false
    },
    methods: {
//      时间排序接口
      timmer(){
        this.$emit("timmer")
      },

      //      添加 遮罩层
      showlist(){
        console.log(123);
        this.isShow = !this.isShow
        console.log(this.isShow);
      },
        turncolor(index){
            this.$emit('changecolor');
        },
        gonextpage(){
          this.$emit('pagego');
        }
    }

    }
</script>

<style lang="scss" scoped>

.producAll{
  background: #ffffff;
   .el-row {
     border: 1px solid #ccc;
  }
  .el-col {
    height: 50px;
  }
.zzc{
  position: absolute;
  top:5.32rem;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.2);
  z-index: 999;
}
  .grid-content {

    text-align: center;
    line-height: 40px;
    font-size: 14px;
    border-radius: 0;
    width: 100%;
    height: 40px;
    margin: 5px auto;
    border-right: 1px solid #E6E6E6;

    padding-right: 5%;
    img{
      vertical-align: middle;
      margin-left: 10px;
    }
  }
  .grid-content:hover{
      border-bottom: 3px solid red;
      color: red;


  }
  .grid-content1{

    text-align: center;
    line-height: 40px;
    font-size: 14px;
    border-radius: 0;
    width: 100%;
    height: 40px;
    margin: 5px auto;
    border-right: 1px solid #E6E6E6;
    vertical-align: middle;
    img{
      vertical-align: middle;
      margin-right: 10px;
    }

  }

  .grid-content2{

    text-align: center;
    line-height: 40px;
    font-size: 14px;
    border-radius: 0;
    width: 100%;
    height: 40px;
    margin: 5px auto;
    img{
      vertical-align: middle;
      margin-right: 10px;
    }
  }


 }


</style>
