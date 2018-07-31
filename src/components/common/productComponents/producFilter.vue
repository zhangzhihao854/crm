<template>
  <div class="bigBox">
  <div class="mengban" @click='xiaoshi'></div>
  <div class="filter">
       <!-- <transition name='fade'> -->
<el-row class='firstrow'>
  <el-col :span="24"><div class="grid-content bg-size ">产品查询</div></el-col>

</el-row>
<el-row>
  <el-col :span="12"><div class="grid-content ">产品编号</div></el-col>
  <el-col :span="12"><div class="grid-content ">
    <span><input type="text" placeholder="请输入.." v-model="productId"></span></div></el-col>
</el-row>
<el-row>
  <el-col :span="12"><div class="grid-content">产品名称</div></el-col>
  <el-col :span="12"><div class="grid-content ">
    <span><input type="text" placeholder="请输入.." v-model="prodName"></span></div></el-col>
</el-row>
<el-row>
  <el-col :span="12"><div class="grid-content">是否在售</div></el-col>
  <el-col :span="12"><div class="grid-content"> <el-select v-model="value" placeholder="请选择..">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
     </el-select>
  </div></el-col>
</el-row>
<el-row>
  <el-col :span="12"><div class="grid-content">产品发布日期</div></el-col>
  <el-col :span="12"><div class="grid-content"> <div class="block">
    <!--<el-date-picker-->
      <!--v-model="value1"-->
      <!--value-format="yyyy-MM-dd"-->
      <!--default-value type="date"-->
      <!--placeholder="请选择"-->
      <!--:picker-options="pickerOptions0">-->
    <!--</el-date-picker>-->
    <input type='date' v-model='value1'>
  </div></div></el-col>
</el-row>
<el-row>
  <el-col :span="12"><div class="grid-content">产品截止日期</div></el-col>
  <el-col :span="12"><div class="grid-content"><div class="block">
    <!--<el-date-picker-->
      <!--v-model="value2"-->
      <!--value-format="yyyy-MM-dd"-->
       <!--type="date"-->
      <!--placeholder="请选择"-->
      <!--:picker-options="pickerOptions1">-->
    <!--</el-date-picker>-->
    <input type='date' v-model='value2'>
  </div></div></el-col>
</el-row>

        <div class="other_footer" >
        <div class="cancel" @click="emptycontent"><span>重置</span></div>
        <div class="keep" @click="postProductKey"><span>查询</span></div>
      </div>
</div>
</div>
</template>

<script type=text/ecmascript-6>
    export default {

     data() {
      return {
        options: [{
          value: '是',
          label: '是'
        }, {
          value: '否',
          label: '否'
        }],
        value: '',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() >Date.now();
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() <Date.now();
          }
        },
        value1: '',
        value2:'',
        productId:'',
        prodName:'',


      };
    },
    methods:{
//      点击重置。清空查询数据
      emptycontent(){
        this.productId=""
        this.prodName=""
        this.value=""
        this.value1=""
        this.value2=""
        this.$store.state.produceMultiSel={}

      },
      xiaoshi(){
        this.$emit('pagexiao')
      },
      postProductKey(value){

        value= {

            "productId": this.productId,
            "prodName": this.prodName,
            "prodState": this.value,
            "prodStartDate": this.value1,
            "prodEndDate": this.value2,
            "size":'10',
        }
        this.xiaoshi()
        this.$store.state.produceMultiSel=value;
        this.$emit('postProductKey',value)

        /*清空用户输入内容*/
            this.emptycontent();
      }
    }
   }

</script>
<style lang='scss' scoped>
  .bg-size{
    font-size: 1rem !important;
    color:#333
  }
  .bigBox{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
.mengban{
   width: 30%;
  height: 100%;
  background: #ccc;
  float: left;
  position: relative;
  top: 0;
  left: 0;
  z-index: 1000;
  opacity:0.5;
  display: inline-block;
}
.filter{
  width: 70%;
  height: 100%;
  display: inline-block;
  z-index:1000;
  background-color: #ffffff;
  position: relative;
padding-right:8px;

 .fade-enter-active, .fade-leave-active{
  transition:all .5s ease-out;
 }
 .fade-enter{
  transform:translateX(880px);
 }
 .fade-leave-active{
   transform:translateX(400px);
   opacity:0;
 }
 .el-row {
    border-bottom: 1px solid #e5e5e5;
    &:first-child {
      margin-top: 10px;
    }
  }
  .el-col {
    border-radius: 1px;
  }

  .grid-content {
    border-radius: 1px;
    min-height: 50px;
    text-align: left;
    padding-left: 20px;
    font-size: 16px;
    line-height: 50px;
  }


 .content span input{

  width:120px;

  border: none;
  outline: none;
  float:left;
  margin-bottom:0px;
  margin-top:10px;

 }
 .content{
  height:60px;
  text-align:left;
  line-height:60px;
  padding-left:20px;
  border:1px solid #E2E2E2;
 }
 .content span{
  margin-left:10px;
  text-align:left;
 }
 input[type=text]{
  margin-bottom: 0!important;
  border: none;
   font-size: 16px;
   text-align: left;
    padding-right: 30px;
   color: #999 !important;
 }
 .el-input__icon+.el-input__inner{
  padding-right: 10px;
}
.el-date-picker__header{
  margin:0!important;
}
.el-select>.el-input{
  width: 110px;
}
.el-date-editor el-input el-date-editor--date{
  float: right;
}
 .el-select{
  float: right;
 }
 .other_footer{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2.5em;
  border-top: 1px solid #EB3723;
  line-height: 2.5em;
  text-align: center;
}
.other_footer .cancel,.other_footer .keep{
  float: left;
  width: 50%;
  height: 100%;
}
.other_footer .cancel{
  background-color: #fff;
}
.other_footer .cancel span{
  color: #EB3723;
}
.other_footer .keep{
  background-color: #EB3723;
}
.other_footer .keep span{
  color: #fff;
}
}
}


  input[type=color], input[type=date], input[type=datetime-local], input[type=datetime], input[type=email], input[type=month], input[type=number], input[type=password], input[type=search], input[type=tel], input[type=text], input[type=time], input[type=url], input[type=week], select, textarea{
    border: none;
    font-size:12px;
    padding: 0;
    padding-left:5px;
  }


</style>
