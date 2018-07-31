<template>
    <div class="chooseCk">
        <div class="choose" @click="chooseck">
          <div class="sircle">+</div>
          <div class="content">{{title}}</div>
        </div>
    </div>
</template>

<style scoped>
  .choose{
    margin-top: 10px;
    text-align:left ;
    padding-left: 15px;
    height:44px;
    line-height: 44px;
    background-color: #fff;
  }
  .sircle{
    width: 22px;
    height: 22px;
    line-height: 20px;
    border-radius: 11px !important;
    background-color: #23A5EB;
    color:#fff;
    font-size:20px;
    display: inline-block;
    text-align: center;
  }
  .content{
    display: inline-block;
    text-align: left;
    font-size:0.88rem;
    line-height: 22px;
  }
</style>

<script type=text/ecmascript-6>
    export default{
      props:{
        title:{
          type:String,
          type:""
        },
        choosepage:{
          type:String,
          type:""
        }
      },
      methods:{
        chooseck(){
if(this.choosepage=="ck"){
  this.$router.push("/chooseckpage")
}else if(this.choosepage=="dk"){
  this.$router.push("/choosepagedk")
}

        }
      },
    }
</script>
