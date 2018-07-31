<template>
    <div class="clientsMain">

      <div class='firstPage'>{{item.title}}</div>

      <el-row>
        <el-col :span="5" :offset='1' @click.native='goLingshou(data.linkPath)' v-for='(data,index) in item.slides' :key='index'><div class="grid-content"><i><img :src="data.src" ></i>
          <br><span>{{data.content}}</span></div></el-col>
      </el-row>
    </div>
</template>

<script>
  import  mui from '../../../style/js/mui.min.js'
  export default{
    props:{
      item:{
        type:Object,
        default:{}
      },
      custId:{
        type:String,
        default:''
      }

    },

    components: {
    },
    data(){
      return{
        input22:''
      }

    },
    activated(){
      console.log('====='+this.custId)
    },
    methods:{
    goLingshou(path){
        //判断如果是暂未开放模块给出相应提示
       if(path == '/clientCont?custId='){
           mui.alert('亲，此功能暂未开放，敬请期待哦！')
           return false;
       }
       this.$router.push(path+this.custId)
     }
  }
  }
</script>
<style lang="scss" scoped>

.clientsMain{
  width: 95%;
  height: 100%;
}
.firstPage{
    /*margin: 1.02rem 0.27rem 0.77rem 0.69rem;*/
    margin: 0 0.27rem 0.77rem 0.81rem;
    font-size: 0.77rem;
    color: #111;
  }
  .el-row i img{
    width: 1.22rem;
    height: 1.22rem;
    margin-top: 1.19rem;
    margin-left: 0.4rem;
  }
  .el-col{
    text-align: center;
    background: #ffffff;
    margin-bottom: 10px;
  }

  .el-col span{
    display: inline-block;
    text-align: center;
    font-size: 0.66rem;

  }
  .grid-content,.grid-content1{
    border-radius: 1px;
    width: 4.44rem;
    height: 4.44rem;
    /*border: 1px solid #EAE7E7;*/
    background: #fff;
  }


</style>
