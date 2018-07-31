<template>
    <div class="astronomy">
    <!--    <el-collapse  v-for="(item,index) in dataText" :key="index">
            <el-collapse-item :key="index" title="" name="1" v-for="(item,index) in dataText">
                <template slot="title">
                    <i class="titleleft">客户关联名称:</i><i class="cilentfont">{{item.custNameR}}</i><i class="cilentfont">{{item.custNoR}}</i><i class="cilentfont ser">{{item.relationship}}</i>
                </template>

                <el-row class="conternt">
                    <el-col :span="6"><div class="grid-content ">关联描述:</div></el-col>
                    <el-col :span="18"><div class=" ">{{item.rDesc}}</div></el-col>
                </el-row>
                <el-row class="conternt1">
                    <el-col :span="8"><div class="bg-purple">{{item.creatPerson}}</div></el-col>
                    <el-col :span="8"><div class="bg-purple bg-purple-li">{{item.creatOrg}}</div></el-col>
                    <el-col :span="8"><div class="bg-purple">{{item.creatDate2}}</div></el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>-->
      <el-collapse v-for="(item,index) in dataText" :key="index">
        <el-collapse-item  :title = item.custNameR name="1">
          <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">客户编号:   {{item.custId}}</div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">客户名称:   {{item.custName}}</div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">关联客户名称:  {{item.custNameR}}</div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">关联客户编号:  {{item.custNoR}}</div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">关联关系:   {{item.relationship}}</div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">关联描述:   {{item.rDesc}}</div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">维护人:   {{item.updatePerson}}</div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">维护机构:   {{item.updateOrg}}</div></el-col>

          </el-row>
        </el-collapse-item>
      </el-collapse>

     <!-- <el-collapse class="relateWrap" >
        <el-collapse-item   title ="哈哈哈哈" name="1">
          <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">客户编号:   </div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">客户名称:  </div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">关联客户名称:  </div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">关联客户编号: </div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">关联关系:   </div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">关联描述:   </div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">维护人:  </div></el-col>
            <el-col :span="24"><div class="grid-content bg-purple-dark">维护机构:   </div></el-col>

          </el-row>
        </el-collapse-item>
      </el-collapse>-->

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

        data(){
            return {

            }
        },
        methods:{

        }
    }

</script>
<style lang="stylus" scoped>
/*.titleleft{
    margin-left: 5px;
!*    margin-right: 1rem;*!
    font-size: 0.9rem;
}
    .cilentfont{
        margin-left: 0.5rem;
        !*margin-right: 1rem;*!
    }
    .grid-content{
        margin-left: 1rem;
    }
    .conternt{
        height: 3rem;
        line-height: 3rem;
        border-bottom: 1px solid #F8F8F8;
    }
    .bg-purple-li{

        border-left: 1px solid #EBEBEB;
        border-right: 1px solid #EBEBEB;
    }
    .bg-purple{
        text-align: center !important;
    }
    .conternt1{
        height: 2rem;
        line-height: 2rem;
    }
    .ser{
        color:#97C1F5 ;
        border: 1px solid #97C1F5;
        padding: 0.2rem 0.5rem;
    }*/


.astronomy .el-col-24{
  padding-left:15px;
  font-size:0.88rem !important;
  font-family:PingFangSC-Regular;
  color:rgba(51,51,51,1);
}
</style>
