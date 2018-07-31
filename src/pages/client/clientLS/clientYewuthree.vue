<template>
   <div class="clientYewuthree">
   	<back-Header :title="title"></back-Header>
  <!--<el-row id='itemstyle'>
    <el-col :span="12"><div class="grid-content">存款</div></el-col>
    <el-col :span="12"><div class="grid-content2"><i class="el-icon-arrow-down"></i></div></el-col>
  </el-row>
  <el-row v-for='(item,index) in slides' :key='index'>
    <el-col :span="12"><div class="grid-content ">{{item.context1}}</div></el-col>
    <el-col :span="12">
      <div class="grid-content2 "><span class='fontcolor'>{{item.context2}}</span>元</div>
    </el-col>
 </el-row>-->
     <el-collapse class="depositWrap">
       <el-collapse-item title="存款" name="1">
         <el-row v-for='(item,index) in slides' :key='index'>
           <el-col :span="8"><div class="grid-content ">{{item.context1}}</div></el-col>
           <el-col :span="8"><div class="grid-content bg-purple"><button style="border-radius: 50%; vertical-align: middle; background-color: #3dcbfe; color: #fff;">{{item.level}}</button></div></el-col>
           <el-col :span="8">
             <div class="grid-content2 "><span class='fontcolor'>{{item.context2}}</span>元</div>
           </el-col>
         </el-row>
       </el-collapse-item>
     </el-collapse>
  </div>
</template>

<script>
import BackHeader from '@/components/header/back-header'
  export default {
    components:{
    	BackHeader,


    },
    data () {
      return {
          title:'产品信息',
          slides:[

          {context1:'个人结算存款',level: 1,context2:'13.14'},
          {context1:'个人储蓄存款',level: 2,context2:'13.14'},
          {context1:'整存整取',level: 3,context2:'13.14'},
          ],
          activeNames: ['1']
        }
      },
      methods:{

      }
  }
</script>

<style lang='scss' scoped>
.fontcolor{
  color: #FF673F;
}
.el-row{
  border-top: 1px solid #E2E2E2;
  height: 50px;
  line-height: 50px;
}
/*.el-row:last-child{
    border-bottom: 1px solid #E2E2E2;
  }*/
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


</style>
