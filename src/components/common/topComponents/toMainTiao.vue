<template>
   <div class="toMainFirst">
     <div class="itemStyle" v-for='(item,index) in slides' :key='index' @click='goEchart(index)'>
       <el-row >
          <el-col :span="12" class="leftCol" ><img :src="item.src" height="27" width="27"><span>{{item.context}}</span></el-col>
          <el-col :span="12" class="rightCol" >
              <i class="el-icon-arrow-right"></i>
          </el-col>
       </el-row>
    </div>
   </div>
</template>

<script>

  export default {
    props:{
       slides:{
        type:Array,
        default:[]
       },
        currentTime:{
            type:String,
            default:''
        }

    },
    data () {
       return {


          }
      },
      activated(){
//          console.log("currentTime==>"+this.currentTime)
      },
      methods:{
      goEchart(index){
        this.$router.push(this.slides[index].linkPath+"?currentTime="+this.currentTime)
        },
      //发送请求,获取数据
      getNewsListData(){
          var url= `/CRMNewMobile/report/addMobcrmTextcontent`;
          this.currentDate = {"text":this.text};
          console.log(this.currentDate);
          this.$http.post(url,
                  { "identity":this.cookies.get('identity'), "data":this.currentDate}
          ).then(res => {
              console.log(res);
          alert(res.body.msg);
      }).catch((error)=>{
              console.log(error);
      });
      }
      }
      }

</script>

<style lang='scss' scoped>

i{
    color:#B3B3B3;
  }
  .topMaincont{
    height:auto;
    height:100%;
    width: 100%;
    text-align: center;
    position:fixed;
    top:4rem;
    left:0;
  }
  .itemStyle{
    height:50px;
    line-height:50px;
    font-size:14px;
    background-color:#fff;
    border-top:1px solid  #e5e5e5;
  }
  .itemStyle:last-child{
    border-bottom:1px solid #e5e5e5;
  }
  .leftCol{
    text-align:left;
    padding-left:15px;
    span{
      color:#555;
    }
    img{
      vertical-align:middle;
      margin-right:15px;
    }
  }
  .rightCol{
    text-align:right;
    padding-right:15px;

    span{
      color:#222;
    }
  }
</style>
