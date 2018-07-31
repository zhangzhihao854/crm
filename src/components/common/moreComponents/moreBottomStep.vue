<template>
   <div>
		<div class="other_footer">
      <div class="cancel" ><span style="color: #EB3723;" @click='goUp'>{{updown[0]}}</span></div>
      <button class="keep" @click='goDown' :disabled ="btnDisabled" type="button">
        <span style="color: #fff;">{{updown[1]}}</span>
       </button>
	  </div>
	</div>
</template>

<script>

  export default {
    props:{
      updown:{
        type:Array,
        default:[]
      },
      btnDisabled:{
        type:Boolean,
        default:false
      },

    },

    data () {
      return {

      }
      },
      methods:{
        goUp(){
          this.$emit('goupPage')

        },
        goDown(){
           this.$emit('godownPage')
        }

      }
  }
</script>

<style scoped>
 .other_footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2.5em;

  }
  .other_footer .cancel,.other_footer .keep{
    float: left;
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 2.5em;
  }
  .other_footer .cancel{
    box-sizing: border-box;
    border-top: 1px solid #EB3723;
    color: #EB3723;
    background-color: #fff;
  }
  .other_footer .keep{
    box-sizing: border-box;
    border-top: 1px solid #EB3723;
    color: #fff;
    background-color: #EB3723;
  }
  span input::-webkit-input-placeholder{
    text-align:right;
  }
  span input{
    width: 4em;
    border: none;
    outline: none;
  }

</style>
