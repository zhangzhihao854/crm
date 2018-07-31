<template>
  <div class="loan">
    <back-header :title="title" :flag="flag"></back-header>
    <div class="customer info">
      <div class="content contop">
        <span class="name">客户名称</span>
        <span @click="searchPages(flag)" class="customerInput">
          <!--<mt-picker :slots="slots" @change="onValuesChange" defaultIndex></mt-picker>-->
          请输入
        </span>
      </div>
      <div class="content conbom">
        <span class="name">客户编号</span>
        <span></span>
      </div>
    </div>

    <!--<div class="other_footer">-->
      <!--<div class="cancel" ><span style="color: #EB3723;">取消</span></div>-->
      <!--<div class="keep" @click="open()" ><span style="color: #fff;">保存</span></div>-->
    <!--</div>-->
  </div>
</template>
<script>
  import BackHeader from '@/components/header/back-header'
  export default {
    data () {
      return {
        title: '贷款进度',
        slots: [
          {
            flex: 1,
            values: ['2015-01', '2015-02'],
            className: 'slot1',
            textAlign: 'right'
          }
        ],
        flag:this.$route.query.num
      }
    },
    created(){},
    methods: {
      onValuesChange (picker, values) {
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0])
        }
      },
      searchPages(num){
        this.$router.push('/search?num='+num)
      }
    },
    components: {
      BackHeader
    },
    activated(){
      this.flag = this.$route.query.num
    }
  }
</script>

<style scoped>

  .loan{
    /*margin-top: 0.8rem;*/
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #F6F8F8;
    overflow: hidden;
  }
  .other_footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height:  2.16rem;
    border-top: 1px solid #EB3723;
  }
  .other_footer .cancel,.other_footer .keep{
    float: left;
    width: 50%;
    height: 100%;
    text-align: center;
    line-height:  2.16rem;
  }
  .other_footer .cancel{
    color: #EB3723;
    background-color: #fff;
  }
  .other_footer .keep{
    color: #fff;
    background-color: #EB3723;
  }
  .content{
    display: flex;
    justify-content: space-between;
    /*padding: 5px 20px;*/
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1rem;
    color: rgba(85,85,85,1);
    background: #fff;
    /*border-top: 1px solid #F6F8F8;*/
    /*margin-top: 5px;*/
    /*padding-left: 10px;*/
  }
  .content span{
    display: inline-block;
    text-align: center;
    height: 2.5rem;
    line-height: 2.5rem;
  }
 .customer .contop{
   border-bottom: 1px solid #e5e5e5;
   border-top: 1px solid #e5e5e5;
 }
  .customer .conbom{
    border-bottom: 1px solid #e5e5e5;
  }
  .customerInput{
    margin-right: 30px;
  }
</style>
