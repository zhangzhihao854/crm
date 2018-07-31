<!--<template>-->
   <!--<div>-->
	 <!--<div class="WriteText" @click="goMorePurposeWrite()">-->
	 	<!--&lt;!&ndash; <div class="imgs"><img src="../../../../static/images/daikuan3x.png" height="40" width="40"></div> &ndash;&gt;-->
     <!--<div class="sircle">+</div>-->
	 	<!--<div class="ActivityText">{{morewrite[0]}}</div>-->
	 <!--</div>-->
   <!--</div>-->
<!--</template>-->

<!--<script>-->

  <!--export default {-->
  	<!--props:{-->
  		<!--morewrite:{-->
  			<!--type:Array,-->
  			<!--default:[]-->
  		<!--}-->
  	<!--},-->
    <!--data () {-->
      <!--return {-->

      <!--}-->
      <!--},-->
      <!--methods:{-->
      	<!--goMorePurposeWrite(){-->
      		<!--this.$router.push(this.morewrite[1])-->
      	<!--}-->
      <!--}-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->
  <!--.sircle{-->
    <!--width: 22px;-->
    <!--height: 22px;-->
    <!--line-height: 20px;-->
    <!--border-radius: 11px !important;-->
    <!--background-color: #23A5EB;-->
    <!--color:#fff;-->
    <!--font-size:20px;-->
    <!--display: inline-block;-->
    <!--text-align: center;-->
  <!--}-->
<!--.WriteText{-->
	<!--width:100%;-->
	<!--height: 50px;-->
	<!--border: 1px solid #E2E2E2;-->
	<!--margin-top: 20px;-->
	<!--background: #ffffff;-->
<!--}-->
<!--.imgs{-->
	<!--vertical-align:middle;-->
	<!--margin-right: 10px;-->
	<!--margin-left: 10px;-->
	<!--display:block;-->
	<!--float: left;-->
	<!--line-height: 50px-->
<!--}-->
<!--.ActivityText{-->
	<!--float: left;-->
	<!--line-height: 50px;-->
	<!--font-size: 16px;-->
<!--}-->
<!--</style>-->


<template>
  <div class="chooseCk" >
    <div class="choose" @click="goMorePurposeWrite()" >
      <div class="sircle">+</div>
      <div class="content">{{morewrite[0]}}</div>
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

<script>

  export default {
    props:{
      morewrite:{
        type:Array,
        default:[]
      }
    },
    data () {
      return {

      }
    },
    methods:{
      goMorePurposeWrite(){
        this.$router.push(this.morewrite[1])
      }
    }
  }
</script>

