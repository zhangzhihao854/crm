<template>
   <div style="margin-top: 50px">
		<div class="morebottom" @click='nextPage'>
		{{mymessage}}
		</div>
   </div>
</template>

<script>

  export default {
  	props:{
  		mymessage:{
  			type:String,
  			default:''
  		}
  	},
    data () {
      return {

      }
      },
      methods:{
        nextPage(){
        this.$emit('goNextPage')
      }
    }
  }
</script>

<style scoped>
.morebottom{
	width: 100%;
	height: 50px;
	background:#EB3723;
	color: #ffffff;
	text-align: center;
	line-height: 50px;
	position: fixed;
	bottom: 0;
	left: 0;
}

</style>
