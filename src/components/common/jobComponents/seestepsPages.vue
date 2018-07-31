<template>
  <div class="step_container" @click="hideDate()">
      <div class="content">
          <div class="head_step" v-if="this.listDateLast!=this.aaa">
              <span >{{this.listDateLast.DESCRIPTION}} </span>
              <p>余额：</p>
              <p>到期日期：{{this.listDateLast.DATEADD}} <span class="flow">关注</span></p>
          </div>
          <div class="step_content" >
              <ul>
                  <li>
                      <div v-if="this.listDateLast!=this.aaa">
                          <span class="date">{{this.listDateLast.DATEADD}} {{this.listDateLast.DESCRIPTION}}</span>
                          <span class="state">{{this.listDateLast.LOANTEXT}}</span>
                          <div class="state_icon"></div>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>
<script>
    export default {
      data(){
        return {
            aaa:{},
            bbb:[]
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
    /*created(){
      console.log(this.title)
    },*/
      methods:{
        hideDate (){
          this.$emit('gosteps')
        }
      }
    }
</script>
<style lang="stylus" scoped>
  .step_container{
    position: absolute;
    top:0em;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    padding: 1rem;
    z-index: 999;
  }
  .content{
    /*padding: 0.5rem;*/
    /*width: 10em;*/
    height: 20em;
    border-radius: 1em;
    background: #fff;
    margin: 1em auto;
  }
  .head_step{
    height: 4em;
    width: 100%;
    border-radius: 1em 1em 0 0;
    background:rgba(34,182,251,1);
    text-align: center;
  }
  .head_step span{
    color: #fff;
    display: inline-block;
    margin: 0 auto;
      font-size: .5em;
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
  .step_content span{
     font-size: .5em;
  }
</style>
