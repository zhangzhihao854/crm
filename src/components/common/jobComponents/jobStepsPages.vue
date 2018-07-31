  <template>
  <div class="step_container" @click="hideDate()">
    <div class="content">
      <div class="head_step" v-if="this.listDateLast!=this.aaa">
        <span >{{this.listDateLast.DESCRIPTION}} </span>
        <p>余额：</p>
        <p>到期日期：{{this.listDateLast.DATEADD}} <span class="flow">关注</span></p>
      </div>
      <div class="step_content" >
          <ul >
            <!--v-if="this.listDateLast!=this.aaa"-->
              <li  v-for="item in listDateL" >
                  <div class="schedule" >
                    <div class="pzuo">
                      <p class="data_t">{{item.DATEADD}}</p>
                      <p class="data_p">{{item.DESCRIPTION}}</p>
                    </div>
                    <div class="pzhong"></div>
                    <div class="pyou">
                      <span class="dktext">{{item.LOANTEXT}}</span>
                    </div>
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
    top:2.5rem;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 999;
    padding: 1rem;
    text-align: center;
    z-index: 10000000;
  }
  .content{
    width: 18em;
    /*height: 30em;*/
    border-radius: 1em;
    background: #fff;
    margin: 2em auto;
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
  .step_content{
    padding:0.8rem;
    height: 350px;
    overflow: scroll;
  }
  ul{
    list-style: none;
  }

  .schedule{
    display: flex;
    /*justify-content: space-between;*/
    padding: 5px 0px !important;
    font-size: 14px;
    background: #fff;
    border-top: 1px solid #F6F8F8;
    height: 4em;
  }

  .pzuo,.pyou{
    float: left;
    position: static;
    background-color: #fff;
    height:4em;
  }
  .pyou{
    float: left;
    width:70%;
    position: relative;
    padding-top:0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.66rem;
    color:#888;
    padding-right: 0.8rem;
    line-height: 0.8rem;

  }
  .pyou .dkmoney{
    font-size:0.66rem;
    font-family:PingFangSC-Regular;
    color:rgba(136,136,136,1);
    line-height:2rem;
  }
  .pzhong{
    float: left;
    height: 100%;
    width: 13%;
    background-color: #559AEE;
    margin-right: .8em;
    box-sizing: border-box;
    background: url("../../../../static/images/dkjdtk.png") no-repeat center ;
  }
  .pzuo{
    width: 23%;
    height: 100%;
    padding-top: .5em;
    padding-bottom: .5em;
    padding-left:0.2rem;
    float: left;
  }
  .pzuo p{
    font-size: 0.5rem !important;
    white-space: nowrap;
    margin-bottom: 0 !important;
  }
  .dktext{
    height:53px;
    font-size:0.66rem;
    font-family:PingFangSC-Regular;
    color:#888;
    line-height:0px;
  }

  .state_c{

  }
  .data_t{
    font-size: 0.5em !important;
    white-space: nowrap;
  }
  .data_p{
    font-size: 0.5em !important;
    white-space: nowrap;
    color:#555 !important;
    text-align: center;
  }


</style>
