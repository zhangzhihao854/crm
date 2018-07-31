<template>
    <div class="astronomy">
        <el-collapse  v-for="(item,index) in dataText" :key="index">
          <!--&lt;!&ndash;v-for="(item,index) in dataText"&ndash;&gt; :key="index"-->
            <el-collapse-item title=""  name="1" >
                <template slot="title" >
                  <i class="iclass">{{index+1}}</i>
                    <i class="titleleft">客户编号:</i><i class="cilentfont">{{item.borrName}}</i><i class="cilentfont ser">{{item.litiSta}}</i>
                </template>
                <el-row class="conternt1">
                  <el-col :span="6"><div class="bg-purple">其他被投诉人:</div></el-col>
                  <el-col :span="6"><div class="bg-purple">{{item.othProsec}}</div></el-col>
                  <el-col :span="6"><div class="bg-purple">主案件编号:</div></el-col>
                  <el-col :span="6"><div class="bg-purple">{{item.maCaseNo}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><div class="grid-content">诉讼阶段:{{item.litiSta}}</div></el-col>
                </el-row>
                <el-row class="conternt">
                    <el-col :span="8"><div class="grid-content ">原借款金额(元):</div></el-col>
                    <el-col :span="16"><div class=" ">{{item.oriBorrAmt}}</div></el-col>
                </el-row>
                <el-row class="conternt">
                    <el-col :span="8"><div class="grid-content ">结欠金额(元):</div></el-col>
                    <el-col :span="16"><div class=" ">{{item.balAmt}}</div></el-col>
                </el-row>
                <el-row class="conternt">
                    <el-col :span="6"><div class="bg-purple">登记日期:</div></el-col>
                    <el-col :span="6"><div class="bg-purple">{{item.recordDate2}}</div></el-col>
                    <el-col :span="6"><div class="bg-purple">数据来源:</div></el-col>
                    <el-col :span="6"><div class="bg-purple">{{item.source}}</div></el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>

    export default {
        props:{
            dataText:{
                type:Array,
                default:[]
            }
        },
        activated(){

        },
        data(){
            return {

            }
        },
        methods:{

        }
    }

</script>
<style lang="stylus" scoped>
  .iclass{
    text-align: center;
    display: inline-block;
    width:22px;
    height:22px;
    background-color: dodgerblue;
    border-radius: 11px;
    color:#FFFFFF;
    line-height:22px;

  }
.titleleft{
    margin-left: 1rem;
/*    margin-right: 1rem;*/
    font-size: 0.9rem;
}
    .cilentfont{
        margin-left: 1rem;
        /*margin-right: 1rem;*/
    }
    .grid-content{
        margin-left: 1rem;
    }
    .conternt{
        height: 2rem;
        line-height: 2rem;
        /*border-bottom: 1px solid #F8F8F8;*/
    }
    .bg-purple-li{

        border-left: 1px solid #EBEBEB;
        border-right: 1px solid #EBEBEB;
    }
    .bg-purple{
        text-align: center !important;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .conternt1{
        height: 2rem;
        line-height: 2rem;
        border-top: 1px solid #F8F8F8;
      padding-left: 15px;
    }
    .ser{
        /*color:#F59B91 ;*/
        /*border: 1px solid #F59B91;*/
        /*padding: 0rem 0.5rem 0.1rem;*/
        /*margin-left: 35%;*/
        /*border-radius: 0.1rem;*/
    }

</style>
