<template>
  <div class='textcontBox' v-show='true'>
    <ul class="mainWrap">
      <li class="contentWrap" v-for="(item,index) in purposeinputdata" @click='gonextpage(index)' style="border-bottom:1px solid #e5e5e5;height: 40px ">
        <div class="smallWrap">
          <div class="navText custName">{{item.custName}}</div>
          <div class="navText intentionAmount">{{item.intentionAmount}}</div>
          <div class="navText intentionSuggest">{{item.intentionSuggest}}</div>
          <div class="navImg">
            <img src="../../../../static/images/ESC@3x.png" style="width: 10px; height: 14px">
          </div>
        </div>

      </li>
    </ul>

    <div class="morealert" v-show="alertM">
      <div class="morealertBox" @click="marksure"></div>
      <div class="moreBoxchild">

      <div style="font-size: 18px;text-align: right;padding-right:20px;padding-top: 20px">
        <span @click="marksure">×</span>
      </div>
      <div class="cusinformation">客户信息</div>
      <p><span>客户姓名：</span>{{slides.custName}}</p>
      <p><span>客户编号：</span>{{slides.intentionCustId}}</p>
      <p><span>意向金额：</span>{{slides.intentionAmount}}</p>
      <p><span>详细信息：</span>{{slides.intentionDetails}}</p>
      <p><span class='lastspan'> </span><i style="color: #888888">后续跟进建议：</i>{{slides.intentionSuggest}}
        <!--<span  >{{}}</span>-->
      </p>
      <!--<div class="marksure" > 确定</div>-->
      </div>
    </div>


   </div>
</template>

<script type=text/ecmascript-6>

  export default {
    data () {
      return {
          slides:{},
          alertM:false,
        }

      },
    props:{
      purposeinputdata:{
        type:Array,
        defaule:[]
      }
    },
    activated(){
      this.alert=false
      console.log(this.purposeinputdata)
    },
      methods:{
       gonextpage(index){
         this.slides=this.purposeinputdata[index]
         this.alertM = true
//        this.$emit('Alertshow')
       },
        marksure(){
          this.alertM = false
        }
      },


  }
</script>

<style lang='scss'>
.textcontBox{
  width:100%;
  margin-top: 20px;
  /*height: 60px;*/
  border: 1px solid #E2E2E2;
  background: #ffffff;
  font-size: 16px;
  overflow: scroll;

}
.textCont,.textCont1,.textCont2{
  display: inline-block;
  text-align: center;
  line-height:40px;
}
.textCont{
  width: 20%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.textContzi{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.textCont1{
  width: 20%;
}
.textCont2{
  width:50%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.textcontBox img{
  margin-right: 10px;
  line-height:40px;
  /*margin-top: 16px;*/
}

.morealertBox{
  width: 100%;
  height: 100%;
  background: #ccc;
  z-index: 888;
  position: fixed;
  top:0;
  left: 0;
  opacity:0.5;
  display: inline-block;
}
.moreBoxchild{
  width: 80%;
  height: 50%;
  position: fixed;
  top:20%;
  left: 10%;
  background: #F6F8F8;
  z-index: 999;
  opacity: 1;
  overflow: scroll;
}
.marksure{
  font-size:1rem;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 100%;
  color: red;
  height: 30px;
}
.moreBoxchild p {
  text-align: left;
  margin-top: 5px;
  /*display: inline-block;*/
  /*float: left;*/
  margin-left: 10%;
  margin-bottom: 5px;
  margin-right: 5%;
}
.moreBoxchild h4{
  margin-top: 20px;
}
.cusinformation{
  width: 80%;
  height: 40px;
  margin:0 auto;
  border-bottom: 1px solid #F6F8F8;
  text-align: center;
  font-size: 20px;
  color: #222222;
}
.moreBoxchild p span{
  color: #888888;
}
.moreBoxchild p{
  font-size:0.9rem;
  line-height:1.6rem;
  color: #222222;
}
  .lastspan{
    display: inline-block;
    height:auto;
    overflow: scroll;
  }
  .textcontBox .navWrap{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
.textcontBox .navWrap .text{
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
 /*设置意向录入列表样式*/
.mainWrap{
  width: 100%;
}
.mainWrap .contentWrap{
   width: 100%;
   height: 40px;
   line-height: 40px;
   text-align: left;
 }
.mainWrap .contentWrap:last-child{
border-bottom: none !important;
}
.mainWrap .contentWrap .navText{
  float: left;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mainWrap .contentWrap .custName{
  width: 20%;
  color: #222;
}
.mainWrap .contentWrap .intentionAmount{
  width: 25%;
}
.mainWrap .contentWrap .intentionSuggest{
  width: 45%;
}
.mainWrap .contentWrap .navImg{
  float: left;
  width: 10%;
  height: 100%;
  text-align: right;
}
.mainWrap .contentWrap .smallWrap{
  width: 100%;
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
