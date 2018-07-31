<template>
    <div>
      <div class="fl">
        <p>{{biaoti1}}</p>
        <p class="mbje"><span class="info">{{numb1}}</span>{{wanyuan1}}</p>
      </div>
      <div class="fl">
        <p>{{biaoti2}}</p>
        <p class="wcje"><span class="info">{{numb2}}</span>{{wanyuan2}}</p>
      </div>
    </div>
</template>

<style scoped>
  .fl{
    padding: 0.3em;
    float: left;
    height:3.5em;
    border-bottom: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    width:50%;
    text-align: center;
    background-color: #fff;
    /*margin-bottom: 10px;*/
    /*line-height:3em;*/
  }
.info{
    color:#000;
  }
  .fl p{
    margin-bottom: 3px !important;
  }
</style>

<script type=text/ecmascript-6>
    export default{
      props:["biaoti1","numb1","biaoti2","numb2","wanyuan1","wanyuan2"],
      activated(){
      }
    }
</script>

