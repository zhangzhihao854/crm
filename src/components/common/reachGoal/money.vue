<template>
    <div class="moneydiv">
      <div class="fl flone">
        <p>{{biaoti1}}</p>
        <p class="mbje"><span class="info">{{numb1}}</span >
          <span style="color:#666">{{wanyuan1}}</span></p>
      </div>
      <div class="fl">
        <p>{{biaoti2}}</p>
        <p class="wcje"><span class="info">{{numb2}}</span>
          <span style="color:#666">{{wanyuan2}}</span></p>
      </div>
    </div>
</template>

<style scoped>
  .fl{
    height:3.11rem;
    font-size:0.78rem;
    font-family:PingFangSC-Regular;
    padding: 0.5em;
    padding-bottom: 0.8em;
    float: left;
    width:50%;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
  }
.info{
    color:red;
  }
.flone{
  border-right: 1px solid #e5e5e5;
}
.fl p{
  margin-bottom: 3px !important;
}
  .moneydiv{
    background-color: #fff;


  }

</style>

<script type=text/ecmascript-6>
    export default{
      props:["biaoti1","numb1","biaoti2","numb2","wanyuan1","wanyuan2"],
      activated(){
      }
    }
</script>

