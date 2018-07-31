<template>
   <div class="morealert">


   </div>
</template>

<script type=text/ecmascript-6>

  export default {
    data () {
      return {
         slides:{
          custname:'xxxxxxxx',
          custbianhao:'xxxxxxxxx',
          custwant:'xxxxxxxxx',
          custdetails:'xxxxxxxx',
          custsuggestion:'xxxxxxxxxssss少时诵诗书所'
         }
      }
      },
    props:{
      purposeinputdata:{
        type:Array,
        default:[]
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
  width: 80%;
  height: 50%;
  position: fixed;
  top:30%;
  left: 10%;
  background: #ffffff;
  z-index: 999;
  opacity: 1;
}
.marksure{
  width: 100%;
  color: red;
  height: 30px;
  position: absolute;
  bottom: 0;
  left: 0;
}
.moreBoxchild p {
  margin-top: 5px;
  display: inline-block;
  float: left;
  margin-left: 20%;
  margin-bottom: 5px;
  margin-right: 5%;
}
.moreBoxchild h4{
  margin-top: 20px;
}
.cusinformation{
  width: 80%;
  height: 60px;
  padding-top: 20px;
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
  color: #222222;
}
.lastspan{
  margin-left: -21%;
}
</style>
