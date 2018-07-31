<template>
  <div class="leixing" >
  <!--<el-row v-for="item in Listdata">-->
  <!--<el-col :span="24"><div class="grid-content" @click.native='gouxuan' :style='{color:text2}'>{{item.VALUE}}</div></el-col>-->
<!--</el-row>-->


    <ul v-for="(item,index) in Listdata" key="item">
      <li :span="24" @click='gouxuan(item.VALUE,index)'  :key='index'>
        <div class="grid-content" :class="{active: ActiveIndex==index}">
          <span>{{item.VALUE}}</span>
          <span v-if="ActiveIndex==index" style="float: right;padding-right: 10px;">√</span>
        </div>
      </li>
    </ul>

    <!--<el-row @click.native='gouxuan'>-->
  <!--<el-col :span="24"><div class="grid-content">贷款</div></el-col>-->
<!--</el-row><el-row @click.native='gouxuan'>-->
  <!--<el-col :span="24"><div class="grid-content">银行卡</div></el-col>-->
<!--</el-row><el-row @click.native='gouxuan'>-->
  <!--<el-col :span="24"><div class="grid-content">代理</div></el-col>-->
<!--</el-row><el-row @click.native='gouxuan'>-->
  <!--<el-col :span="24"><div class="grid-content">其他</div></el-col>-->
<!--</el-row>-->



</div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // activeIndex2: '2',
        // isActive:'2'
        text2:'black',
        Listdata:[],
        select:true,
        ActiveIndex :"-1"

      };
    },
    activated(){
      this.ActiveIndex="-1"
      this.text2="black"
      this.getPCProdCatl()
    },
    methods: {
      gouxuan(value,index){
        this.ActiveIndex = index;
        this.select=!this.select
        this.$emit('gouxuan',value,'lalala');
      },
      //      获取 产品类型
      getPCProdCatl(){
        var url= `/CRMNewMobile/dict/getPCProdCatl`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity')
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
          console.log(res);
        this.Listdata=res.body.ListData
        console.log(this.Listdata);
      },
        res => {
          console.log(res)
        }
      )
      },
    }
  }


</script>
<style lang='scss' scoped>
  .active{
    color:red;
  }
.leixing{
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999!important;
/*   .el-menu--horizontal .el-submenu>.el-menu {
    z-index: 999;
    padding:0px;
    min-width: 1000%;
  }
  .el-menu--horizontal>.el-menu-item:hover, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title{
    border-bottom: 2px solid red;
  }
  .el-menu{
    background-color:#fff;
    border-right:1px solid #ccc;
  }
  .el-menu--horizontal .el-submenu .el-menu-item{
    height:60px;
    border-bottom:1px solid #ccc;
    font-size:20px;
    line-height:60px;
  }
   .el-menu--horizontal .el-submenu .el-menu-item:hover{
    color:red;
    cursor:pointer;
   }
   .el-submenu__title{
   font-size:16px;
   }
   .el-icon-check{
    margin-left:300px;
    margin-top:22px;
  }
  .el-icon-check:hover{
      color:red;
  }
  .el-menu--horizontal .el-submenu .el-submenu__icon-arrow {
    color:red;
  } */
    .el-row {

  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    min-height: 36px;
    background: #ffffff;
    border-bottom: 1px solid #E2E2E2;
    line-height: 36px;
    padding-left: 20px;

  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

}



</style>
