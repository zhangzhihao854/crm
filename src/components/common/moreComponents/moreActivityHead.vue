<template>
   <div class="morehead" >
   <!-- <div class="divBox">
   <div class="DivOne" v-for="item in slides" @click="goNextPage(item.linkPath)">{{item.context}}</div>
    </div>  -->


    <el-tabs @tab-click='goPage' v-model='activeName'>
    <el-tab-pane :label="item.context"  v-for="(item,index) in slides" :key='index'>
    </el-tab-pane>
  </el-tabs>


     <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
       <!--<el-tab-pane label="存款达成" name="1">-->
       <!--<moreActivityCont></moreActivityCont>-->
       <!--</el-tab-pane>-->
       <!--<el-tab-pane label="贷款达成" name="2">贷款达成</el-tab-pane>-->
       <!--<el-tab-pane label="潜客开发" name="3">潜客开发</el-tab-pane>-->
       <!--<el-tab-pane label="意向录入" name="4">意向录入</el-tab-pane>-->
       <!--<el-tab-pane label="团队建设" name="5">团队建设</el-tab-pane>-->
     <!--</el-tabs>-->


   </div>
</template>

<script type=text/ecmascript-6>
//  import moreActivityCont from '@/pages/moreModule/moreActivityCont'


  export default {
    components: {
//      moreActivityCont
    },
    data () {
  return {
    slides:[
//          {context:'存款达成',linkPath:'/moreActivity/moreActivityCont'},
//          {context:'贷款达成',linkPath:'/moreActivity/moreLoans'},
//          {context:'潜客开发',linkPath:'/moreActivity/moreQianKe'},
//          {context:'意向录入',linkPath:'/moreActivity/morePurpose'},
//          {context:'团队建设',linkPath:'/moreActivity/moreTeam'}
          ],

       activeName:"0"
      }
    },
//    props:{
//      activeName:{
//        type:String,
//        defaule:"0"
//
//      }
//    },
    activated(){
      this.slides=[]
      this.activeName=this.$store.state.activeName
      console.log("我是索引"+this.activeName)
      this.quanxian()
//

    },

      methods: {
        goPage(tab,event){
          this.$store.state.activeName=tab.index
          this.$router.push(this.slides[tab.index].linkPath)
        },
        quanxian(){

              if(this.$store.state.activityTypeDeposit=="1"){
                var obj1={}
                obj1.context="存款达成"
                obj1.linkPath="/moreActivity/moreActivityCont"
                this.slides.push(obj1)
              }
              if(this.$store.state.activityTypeLoans=="1"){
                var obj2={}
                obj2.context="贷款达成"
                obj2.linkPath="/moreActivity/moreLoans"
                this.slides.push(obj2)
              }

              if(this.$store.state.activityTypeGuest=="1"){
                var obj3={}
                obj3.context="潜客开发"
                obj3.linkPath="/moreActivity/moreQianKe"
                this.slides.push(obj3)
              }

              if(this.$store.state.activityTypeRests=="1"){
                var obj4={}
                obj4.context="意向录入"
                obj4.linkPath="/moreActivity/morePurpose"
                this.slides.push(obj4)
              }

              if(this.$store.state.activityTypeTb=="1"){
                var obj5={}
                obj5.context="团队建设"
                obj5.linkPath="/moreActivity/moreTeam"
                this.slides.push(obj5)
              }

        },
      }
  }
</script>

<style lang='scss' scoped>
.morehead{
  width: 100%;
  background: #ffffff;
  overflow-x:scroll;
}
.el-tabs__item{
   /*width: 25%;*/
}
.el-tabs__nav{
 width: 100%;
 overflow-x:scroll;
}
.el-tabs__active-bar{
  background: red!important;
  width: 0% !important;
}
.el-tabs__item.is-active {
    color: red!important;
}
.el-tabs__header{
  margin: 0 !important;
}
.morehead  #tab-0{
  padding-left: 0 !important;
}
</style>
