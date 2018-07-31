<template>
   <div class="publicYewuthree">
   	<back-Header :title="title"></back-Header>
       <!--添加loading-->
       <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%"> </el-table>
       <!--判断数据为空时，显示暂无数据-->
       <div v-show="eventShow" style="text-align: center; ">
         <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
           <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
         </div>
         <div style="margin-top: 20px;">暂时没有信息哦~</div>
       </div>
     <div class="publicthree" v-for="item in dataText">
        <el-collapse>
            <el-collapse-item>
                <template slot="title">
                    <i class="cilentfont">存款</i>
                </template>
                <!--<el-row>
                    <el-col :span="6"><div class="grid-content bg-purple prodName">{{item.prodName}}</div></el-col>
                    <el-col :span="10"><div class="grid-content bg-purple"> <span class="reds">{{item.buyAmt}} </span>元</div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple-light">{{item.riskLevel}}</div></el-col>
                </el-row>-->
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">产品名称:   {{item.prodName}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">产品风险等级:   {{item.riskLevel}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">金额:   <span style="color: red;">{{item.buyAmt}}</span>元</div></el-col>
              </el-row>
            </el-collapse-item>
        </el-collapse>
    </div>


  </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
  export default {
    components:{
    	BackHeader
    },
    data () {
      return {
          title:'产品信息',
          dataText:[],
          loading2:true,
          eventShow: false,
        }
      },
      activated(){
          this.dataText = []
          this.eventShow = false;
          this.loading2 = true;
          this.custId = this.$route.query.custId
          this.getThisCustName();
      },
      methods:{
          //获取产品信息
          getThisCustName(){
              var url = `/CRMNewMobile/pclient/queryProdByCustId`;
              this.$http.post(url,
                {
                  "identity": this.cookies.get('identity'),
                  "custId": this.custId
                },
                {
                  emulateJSON:true
                }
              ).then(res => {
                  if(res.body.ListData.length == 0){
                    this.loading2 = false;
                    this.eventShow = true;
                  }else{
                    this.loading2 = false;
                    this.dataText = res.body.ListData;
                  }

          }).catch((error) => {
                  console.log(error);
          })
          }
      }
  }
</script>

<style lang='scss' scoped>
.fontcolor{
  color: #FF673F;
}
/*.el-row{
  border-top: 1px solid #E2E2E2;
  height: 50px;
  line-height: 50px;
}
.el-row:last-child{
    border-bottom: 1px solid #E2E2E2;
  }
.grid-content{
  margin-left: 10%;
}
.grid-content2{
  margin-right: 10%;
  float: right;
}
#itemstyle{
  margin-bottom: 10%;
  border-bottom:1px solid  #E2E2E2;
}
.cilentfont{
    padding-left: 16px;
}
    .reds{
        color: #dd524d;
    }
.publicYewuthree .el-row[data-v-66b96db9]:last-child{
  border-bottom: none !important;
}
.publicYewuthree .el-col-6{
  box-sizing: border-box;
  padding-left: 16px;
  text-align: left !important;
}
.publicthree .prodName{
  text-align: left !important;
}*/
.publicthree .grid-content[data-v-66b96db9]{
  text-align: left!important;
}
.publicthree .el-col-24{
  padding-left: 15px;
}
</style>
