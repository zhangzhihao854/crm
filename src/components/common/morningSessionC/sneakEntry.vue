<template>
  <div>
    <div class="font_s"></div>
    <span>潜客录入</span>
    <div v-for="item in eveWillLatentCustomer" v-if="eveWillLatentCustomer.length!=0">
    <div  @click="goCustomer(item.custId)" class="font_g">
      <el-row class="font_z">
        <el-col :span="6" class="custName">
            <span>{{item.custName}}</span>
        </el-col>
        <el-col :span="6" class="attention">
            <span class="place font_color1" v-if="item.followOpinion=='一般'" style="color:green ;border:1px solid green">{{item.followOpinion}}</span>
            <span class="place font_color1" v-if="item.followOpinion=='关注'" style="color:blue;border:1px solid blue">{{item.followOpinion}}</span>
            <span class="place font_color1" v-if="item.followOpinion=='不跟进'" style="color:#EB3723;border:1px solid #EB3723">{{item.followOpinion}}</span>
        </el-col>
        <el-col :span="12">
            <span style="color:#EB3723">{{item.interestAmount!=''?item.interestAmount:0}} </span>
            <span style="color:#555">元</span>
        </el-col>
      </el-row>
     <!-- <p class="font_z">
        <span>{{item.custName}}</span>
        <span class="place font_color1" v-if="item.followOpinion=='一般'" style="color:green ;border:1px solid green">{{item.followOpinion}}</span>
        <span class="place font_color1" v-if="item.followOpinion=='关注'" style="color:blue;border:1px solid blue">{{item.followOpinion}}</span>
        <span class="place font_color1" v-if="item.followOpinion=='不跟进'" style="color:#EB3723;border:1px solid #EB3723">{{item.followOpinion}}</span>
        <span style="color:#EB3723">{{item.interestAmount}} </span>
        <span style="color:#555">元</span>
      </p>-->
    </div>
    </div>

  </div>
</template>

<script>
  export default {
    data(){
      return {
        //eveWillLatentCustomer:[]
      }
    },
    props:{
      eveWillLatentCustomer:{
        type:Array,
        default:[]
      }
    },
    created(){
      console.log("40==>>>>>>>"+JSON.stringify(this.eveWillLatentCustomer))
    },
    activated(){
      //console.log("fdshiodrgas"+JSON.stringify(this.listData[0].eveWillLatentCustomer))
    },
    methods:{
      goCustomer (custId){
        this.$emit('goCustomerInput')
        console.log(custId)
        this.$router.push('/seeCustomer?custId='+custId+'&aaa=1')
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .font_s{
    display: inline-block;
    width: .2em;
    height: 1em;
    background-color: #559AEE;
  }
  .font_g{
    margin-left: .3em;
    width:100%;
    height:1.6rem;
    line-height:1.6rem;
    white-space:nowrap;
    overflow-x:scroll;
  }
  .font_z{
    margin: .3em 0;
    height:1.6rem;
    line-height:1.6rem;
    width:100%;
    white-space:nowrap;
    overflow-x:scroll;
    font-size:0.88rem;
    font-family:PingFangSC-Regular;
  }
  .font_z .custName{
    color:rgba(85,85,85,1);
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
  .font_z .attention{
    box-sizing: border-box;
    padding: 0 10px;
  }
/*  .place{
    margin-left: 5em;
    margin-right: 5em;
    padding: .1em .2em;
  }*/
  .font_color1{
    border:1px solid #96CDFD;
    color:#96CDFD ;
  }
  .font_color2{
    border:1px solid #B7D992;
    color:#B7D992 ;
  }
</style>
