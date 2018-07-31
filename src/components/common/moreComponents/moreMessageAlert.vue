<template>
   <div class="morealert">
	   <div class="morealertBox"></div>
     <div class="moreBoxchild">
       <div class="cusinformation">{{returnMsg}}</div>
       <div class="marksure" @click='gomoreInfrom'>确定 </div>
     </div>

   </div>
</template>

<script>

  export default {
    props:{
        "returnMsg":{
            type:String,
            default:''
        }

    },
    data () {
      return {

      }
      },
      methods:{
        gomoreInfrom(){
          this.$emit('turnGoInform')
        }
      }
  }
</script>

<style scoped>
.morealert{

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
  width: 60%;
  height: 140px;
  position: fixed;
  top:40%;
  left: 20%;
  background: #ffffff;
  z-index: 999;
  opacity: 1;
}

.marksure{
  width: 80%;
  margin-left: 10%;
  height:60px;
  color: red;
  text-align: center;
  line-height: 30px;
  /*border-top:1px solid #C0C0C0;*/
}

.cusinformation{
  width: 80%;
  height: 90px;
  padding-top: 20px;
  margin:0 auto;
  /*border-bottom: 1px solid #F6F8F8;*/
  text-align: center;
  font-size: 20px;
  color: #222222;
  border-bottom:1px solid #C0C0C0;
}

</style>
