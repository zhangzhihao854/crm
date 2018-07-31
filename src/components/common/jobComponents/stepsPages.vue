<template>
  <div class="step_container" @click="hideDate()">
    <div class="content">
      <div class="head_step" v-if="this.listDateLast!=this.aaa">
        <span >{{this.listDateLast.DESCRIPTION}} </span>
        <p>余额：</p>
        <p>到期日期：{{this.listDateLast.DATEADD}} <span class="flow">关注</span></p>
      </div>
      <div class="step_content">
        <!--<div class="sept">-->
          <!--<span>{{this.listDateLast.DESCRIPTION}}</span>-->
          <!--<span class="sty_1"></span>-->
        <!--</div>-->
        <ul v-if="this.listDateL!=null" v-for="item in listDateL">
          <li>
            <div>
              <span class="date">{{item.DATEADD}} {{item.DESCRIPTION}}</span>
              <span class="state">{{item.LOANTEXT}}</span>
              <div class="state_icon"></div>
            </div>
          </li>
        </ul>
          <!--<el-steps :space="50" :active="3" direction="vertical" class="steps" >-->
            <!--<el-step title="" description=""></el-step>-->
            <!--<el-step title="" description=""></el-step>
            <el-step title="" description=""></el-step>
            <el-step title="" description=""></el-step>
            <el-step title="" description=""></el-step>
            <el-step title="" description=""></el-step>
            <el-step title="" description=""></el-step>-->
          <!--</el-steps>-->
        <!--<ul>
          <li>
            <div>
              <span class="date">2017.8.7 <br>申请</span>
              &lt;!&ndash;<span class="state">申请</span>&ndash;&gt;
              <div class="state_icon"></div>
            </div>
          </li>
          <li>
            <div>
              <span class="date">2017.8.7 <br>调查</span>
              &lt;!&ndash;<span class="state">调查</span>&ndash;&gt;
            </div>
          </li>
          <li>
            <span class="date">2017.8.7<br>上会</span>
            &lt;!&ndash;<span class="state">上会</span>&ndash;&gt;
          </li>
          <li>
            <span class="date">2017.8.7 <br>放款</span>
            &lt;!&ndash;<span class="state">放款</span>&ndash;&gt;
          </li>
          &lt;!&ndash;<li>
            <span class="date">2017.8.7 <br>贷后</span>
            <span class="state">贷后</span>
          </li>
          <li>
            <span class="date">2017.8.7</span>
            <span class="state">结息</span>
          </li>
          <li>
            <span class="date">2017.8.7</span>
            <span class="state">还款</span>
          </li>&ndash;&gt;
        </ul>-->
      </div>
      <!--<div class="close" @click="hideDate()">
        <span class="el-icon-circle-close"></span>
      </div>-->
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return {
            aaa:{}
        }
      },
      props:{
        listDateLast:{
            type:Object,
            default:{}
        },
        listDateL:{
            type:Array,
            default:[]
        }
      },
      methods:{
        hideDate (){
          this.$emit('gosteps')
        }
      }
    }

</script>
<style lang="stylus" scoped>
  .step_container{
    position: fixed;
    top:3em;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    /*z-index: 999;*/
  }
  .content{
    width: 18em;
    height: 30em;
    border-radius: 1em;
    background: #fff;
    margin: 1em auto;
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
    border:1px solid #fff;
  }
 .date{
    font-size: .2em;
    margin-left: .3em;
    line-height: .5em;
  }
  .state{
    font-size: .8em;
    margin-left: .5em;
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
  .steps{
    margin-left: 2em;
  }
  .sept{
    height: 2em;
    width: 100%;
    line-height: 2em;
  }
  .sept span{
    font-size: .5em;
  }
  .sty_1{
    width: .8em;
    height:.8em ;
    background:rgba(34,182,251,1);
    border-radius: .8em;
    margin-left: 1.5em;
  }
</style>
