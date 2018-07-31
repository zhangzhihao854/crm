<template>
  <div class="topMaincont">
    <el-table v-loading="loading"  v-show="loading" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>

    <div class="itemStyle" v-for='(item,index) in slides' :key='index' @click="goNextPage(item.linkPath)">
       <!--<el-row >-->
          <!--<el-col :span="12" class="leftCol"><span>{{item.context}}</span></el-col>-->
          <!--<el-col :span="12" class="rightCol">-->
              <!--<i class="el-icon-arrow-right"></i>-->
          <!--</el-col>-->
       <!--</el-row>-->
      <p style="color:#333;font-size: 16px; text-align: left;padding-left: 15px">{{item.context}} <span class="info"><img src="../../../../static/images/ESC.png" alt=""></span></p>

    </div>
  </div>
</template>

<script >
  export default {
    data () {
      return {
       /*slides:[
          {context:'零售条线负责人',linkPath:'/toMainHeader?date=date'},
          {context:'公司条线负责人',linkPath:'/toMainHeader1?date=date'},
          {context:'管理支行行长',linkPath:'/toMainHeader2?date=date'},
          {context:'支行行长',linkPath:'/toMainHeader3?date=date'},
          {context:'主管会计',linkPath:'/toMainHeader3?date=date'},
          {context:'综合管理部',linkPath:'/toMainHeader?date=date'}
          ],*/
        slides: [],
        loading: true
      }

    },
    /*高管看板的角色权限*/
    activated(){
        /*初始化数据*/
        this.loading = true;
        this.slides = [];
        this.queryRules()

    },
    methods: {
    goNextPage(path){
      this.$router.push(path)
    },

    }
  }
</script>

<style lang="scss" scoped>

  .topMaincont{
    height:auto;
    height:100%;
    width: 100%;
    text-align: center;
    position:fixed;
    top:3.5rem;
    left:0;
  }

  .itemStyle{
    height:45px;
    line-height:45px;
    font-size:14px;
    background-color:#fff;
    border-top:1px solid  #e5e5e5;
    .info{
      position:absolute;
      right: 16px;
    }
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
  }
  .rightCol{
    text-align:right;
    padding-right:15px;

.el-icon-arrow-right{
  margin-top: 0;
}
    span{
      color:#222;
    }
  }

  /*修改内容区标题大小*/
  /*.leftCol span[data-v-3cf47ab5]{
    font-size: 0.7rem !important;
  }*/
</style>
