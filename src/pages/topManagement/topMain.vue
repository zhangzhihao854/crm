<template>
   <div class="topmainBox">
       <back-Header :title="title"></back-Header>
       <div class="topMaincont">
         <el-table v-loading="loading"  v-show="loading" element-loading-text="拼命加载中" style="width: 100%">
         </el-table>
         <div class="itemStyle" v-for='(item,index) in slides' :key='index' @click="goNextPage(item.linkPath)">
         <p style="color:#333;font-size: 16px; text-align: left;padding-left: 15px">{{item.context}} <span class="info"><img src="../../../static/images/ESC.png" alt=""></span></p>
         </div>
       </div>
   </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
  export default {
   components:{
      BackHeader,
      //topmaincont
    },
    data () {
        return {
          title:'高管看板',
          slides: [],
          /*slides:[
           {context:'零售条线负责人',linkPath:'/toMainHeader?date=date'},
           {context:'公司条线负责人',linkPath:'/toMainHeader1?date=date'},
           {context:'管理支行行长',linkPath:'/toMainHeader2?date=date'},
           {context:'支行行长',linkPath:'/toMainHeader3?date=date'},
           {context:'主管会计',linkPath:'/toMainHeader3?date=date'},
           {context:'综合管理部',linkPath:'/toMainHeader?date=date'}
           ],*/
          loading: true
          }
      },
      activated(){
        /*初始化数据*/
        this.loading = true;
        this.slides = [];
        this.queryRules()
      },
      methods:{
        /*右侧箭头点击事件*/
        goNextPage(path){
          this.$router.push(path)
        },
        /*高管看板角色权限接口*/
        queryRules(){
          var url= `/CRMNewMobile/executivesKB/queryExecutivesKBRoleJudgment`
          this.$http.post(url,
            {
              "identity":this.cookies.get('identity'),
              "postId":this.cookies.get('postId'),
            },
            {
              emulateJSON:true
            }
          ).then(res =>{
            var mark = res.body.data.post;
            this.loading = false;
            if(mark == "支行行长"){
              this.slides= [
                {context:'支行行长',linkPath:'/toMainHeader3?date=date'},
              ]
            }else if(mark == "管理支行行长"){
              this.slides= [
                {context:'管理支行行长',linkPath:'/toMainHeader2?date=date'},
              ]
            }else if(mark == "支行副行长"){
              this.slides= [
                {context:'支行副行长',linkPath:'/toMainHeader3?date=date'},
              ]
            }else if(mark == "主管会计"){
              this.slides= [
                {context:'主管会计',linkPath:'/toMainHeader3?date=date'},
              ]
            }else if(mark == "零售条线负责人"){
              this.slides= [
                {context:'零售条线负责人',linkPath:'/toMainHeader?date=date'},
              ]
            }else if(mark == "公司条线负责人"){
              this.slides = [
                {context:'公司条线负责人',linkPath:'/toMainHeader1?date=date'},
              ]

            }else if(mark == "零售条线负责人/对公条线负责人"){
              this.slides = [
                {context:'零售条线负责人',linkPath:'/toMainHeader?date=date'},
                {context:'公司条线负责人',linkPath:'/toMainHeader1?date=date'},
              ]
            }


          }).catch(err =>{

          })
        }

      }
      }

</script>

<style scoped>
  .topmainBox .topMaincont[data-v-3cf47ab5]{
    position: fixed;
    top: 3rem !important;
    left: 0;
  }
  .topmainBox .leftCol span[data-v-3cf47ab5]{
    font-size: 0.8rem !important;
  }

  .topMaincont{
    height:auto;
    height:100%;
    width: 100%;
    text-align: center;
    position:fixed;
    top:3.5rem;
    left:0;
  }

  .itemStyle {
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
  }
  .info{
    position:absolute;
    right: 16px;
  }

  .itemStyle:last-child{
    border-bottom:1px solid #e5e5e5;
  }
  .leftCol {
    text-align: left;
    padding-left: 15px;
  }
  span{
    color:#555;
  }

  .rightCol {
    text-align: right;
    padding-right: 15px;
  }

  .el-icon-arrow-right{
    margin-top: 0;
  }
  span{
    color:#222;
  }

</style>
