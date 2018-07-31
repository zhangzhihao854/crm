<template>
  <div >
    <div class="font_s"></div>
    <!--<span @click="goOther()">其他</span>-->
      <span>其他</span>
      <div class="font_g">
        <div>
          <p class="font_z" v-for="(item,index) in mobcrmTextcontent" :key="index">
            <span>{{item.text}}</span>
          </p>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        //mobcrmTextcontent:{}
      }
    },
    props:{
      mobcrmTextcontent:{
        type:Object,
        default:{}
      }
    },
    created(){
      console.log("other"+JSON.stringify(this.mobcrmTextcontent))
    },
    methods:{
      goOther (){
        this.$emit('goOther')
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .font_s{
    display: inline-block;
    width: .2em;
    height: 1em;
    background-color: #559AEE;
  }
  .font_g{
    margin-left: .3em;
  }
  .font_z{
    line-height: 1.5em;
    margin: .3em 0;
  }
  .place{
    margin-left: 5em;
    margin-right: 5em;
    padding: .1em .2em;
  }
  .font_color1{
    border:1px solid #96CDFD;
    color:#96CDFD ;
  }
  .font_color2{
    border:1px solid #B7D992;
    color:#B7D992 ;
  }
</style>
