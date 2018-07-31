<template>
  <div class="step_container" @click="hideDate()">
    <div class="content">
      <div class="head_step" v-for="item in dktklistData">
        <!--<span>{{this.listDateLast.DESCRIPTION}} {{this.listDateLast.DATEADD}}</span>-->
        <span>{{item.DICTIDNAME}}
         {{item.DATEADD}}</span>
        <p>余额：{{item.AMOUNT}}元</p>
        <p>到期日期：{{item.MATUREDATE}} <span class="flow">关注</span></p>
      </div>
      <div class="step_content">
        <ul >
          <li v-for="item in dktkxlistData" id="dklist">
            <div class="pzuo">
              <p>{{item.DATEADD}}</p>
              <h5>{{item.DICTIDNAME}}</h5>
            </div>
            <div class="pzhong">
            </div>
            <div class="pyou">
              <span class="dkmoney">
                余额<span style="color:red">{{item.AMOUNT}}</span>元
                &nbsp;&nbsp;&nbsp;&nbsp;
              到期日 <span> {{item.MATUREDATE}}</span>
              </span>
              <br>
              <span class="dktext">
                 {{item.LOANTEXT}}
              </span>
            </div>
          </li>
        </ul>
      </div>
      <!--<div class="close" @click="hideDate()">-->
        <!--<span class="el-icon-circle-close"></span>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script type=text/ecmascript-6>
  export default {
    data(){
      return {
      }
    },
    activated(){

    },
    props:{
      dktklistData:{
        type:Array,
        default:[]
      },
      dktkxlistData:{
        type:Array,
        default:[]
      }
    },
    methods:{
      hideDate (){
        this.$emit('gosteps')
      },

    }
  }

</script>
<style lang="stylus" scoped>
  .step_container{
    position: absolute;
    top:3em;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    /*z-index: 999;*/
  }
  .step_content{
    height:20rem;
    overflow: scroll;
  }
  .content{
    width: 18em;
    height: 30em;
    border-radius: 1em;
    background: #fff;
    margin: 1em auto;
    /*overflow: scroll;*/
  }
  .head_step{
    height: 8em;
    width: 100%;
    border-radius: 1em 1em 0 0;
    background:rgba(34,182,251,1);
    text-align: center;
  }
  .head_step span{
    color: #fff;
    display: inline-block;
    margin: 1em auto;
  }
  .head_step p{
    color: #fff;
  }
  .flow{
    display: inline-block;
    padding: 0em  1em  0  1em;
    border:1px solid #fff;
    border-radius: 0.3em;
  }

  ul{
    list-style: none;
  }
  .close{
    position: absolute;
    bottom: 5em;
    left: 45.5%;
    width: 2em;
    height: 2em;
    /*border: 1px solid #fff;
    border-radius: 2em;*/
    text-align: center;
    line-height: 2em;
  }
  .el-icon-circle-close{
    color: #fff;
  }
  .sept span{
    font-size: .5em;
  }
  #dklist{
    border-bottom: 1px solid #E5E5E5 !important;
  }
  .pzuo,.pyou{
    float: left;
    position: static;
    background-color: #fff;
    height:5em;
    /*line-height:2em;*/
  }
  .pyou{
    padding-left:0.5em;
    width: 72%;

  }
  .pyou .dkmoney{
    font-size:0.66rem;
    font-family:PingFangSC-Regular;
    color:rgba(136,136,136,1);
    line-height:2rem;
  }
  .pzhong{
    background: url(../../../../static/images/dkjdtk.png) no-repeat center;
    float: left;
    width:6.4%;
    height: 5em;
  }
  .pzuo{
    width: 21%;
    text-align: center;
    line-height:1rem;
    padding: 0.5rem;

  }
  .pzuo p{
    font-size: 0.1rem !important;
  }
  .dktext{
    height:53px;
    font-size:0.66rem;
    font-family:PingFangSC-Regular;
    color:rgba(85,85,85,1);
    line-height:0px;
  }

</style>
