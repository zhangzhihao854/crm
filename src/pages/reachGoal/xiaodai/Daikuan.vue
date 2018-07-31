<template>
    <div class="temp">
      <back-header :title="title"></back-header>
      <jindu-tiao v-if="aaa"  class="step" @click="showDate()" @gosteps="showDate" :dktklistData=dklistData  :dktkxlistData=dktklistData></jindu-tiao>
      <div class="card">
        <p><img src="../../../../static/images/_s-icon_man_pressed@2x.png" alt=""></p>
        <p class="textp">{{title}}</p>
        <p class="textp">{{identno}}</p>
      </div >
      <div >
        <ul class="mui-card1" >
          <li class="listyle" v-for="item in dklistData" @click="showDate(item.DEBITNOTE)">
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
    </div>
</template>

<style scoped>
  .card{
    height: 8em;
    /*width:100%;*/
    /*margin: 0.5em;*/
    background-color:lightskyblue;
    text-align: center;
    padding-top:1em;
    /*line-height:2em;*/
  }
.textp{
  color:#ffffff;
}
.mui-card1{
  margin: 0;


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
    width: 73.2%;

  }
  .pyou .dkmoney{
    font-size:0.66rem;
    font-family:PingFangSC-Regular;
    color:rgba(136,136,136,1);
    line-height:2rem;
  }
  .pzhong{
    background: url(../../../../static/images/dkjdtjt.png)  no-repeat ;
    float: left;
    width:5.4%;
    /*background-color: blue;*/
    height: 5em;
  }
  .pzuo{
     width: 21%;
     text-align: center;
     line-height:2em;
     padding: 0.5rem;

   }
  .pzuo p{
    font-size: 0.2rem;
  }
  .dktext{
    height:53px;
    font-size:0.66rem;
    font-family:PingFangSC-Regular;
    color:rgba(85,85,85,1);
    line-height:0px;
  }
  /*修改背景色*/
  .temp .card[data-v-0090f79e]{
    background-color: #559aee;
  }
  /*修改文字之间的间距*/
  .temp .card p{
    margin-bottom: 2px !important;
  }
  .temp .pzuo p[data-v-0090f79e]{
    line-height: 0.8rem;
    width: 4rem;
    padding-top: 0.6rem;
    font-size: 0.5rem;
  }
  .temp .mui-h5, h5{
    font-size: 15px;
    color: #000000;
  }
</style>

<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
  import JinduTiao from '@/components/common/reachGoal/jindutiao'
  import  mui from '../../../style/js/mui.min.js'
    export default{
      data () {
        return {
          aaa: false,
          showhide:true,
          title: '',
          identno: '',
          dklistData:[],
          dktklistData:[]
        }
      },
      activated(){
        this.aaa=false
        this.dklistData=[]
        this.dktklistData=[]
        this.title=this.$route.query.name
        this.identno=this.$route.query.identno
        this.custid=this.$route.query.custid
        this.fscsId()

        console.log(this.custid);
      },
      methods:{
        showDate(content){
          this.aaa = !this.aaa
            var url = '/CRMNewMobile/target/managerTargetOeClientState'
             if(content == undefined){
               content = 'null';
             }
          console.log(content)
            this.$http.post(url,
              {
                "identity":this.cookies.get('identity'),
                'CUSTID':this.custid,
                'DEBITNOTE':content,
              },
              {
                emulateJSON:true
              }
            ).then(
              res=>{
                console.log(res);
                this.dktklistData=res.body.data.ListData
                console.log(this.dktklistData);

                console.log("DEBITNOTE 弹框访问成功了");
              },
              res=>{
                console.log('messages出错')
              }
            )

        },
//        贷款客户列表点击到贷款消息页面
        fscsId(){
         var url = '/CRMNewMobile/target/managerTargetClientState'
           this.$http.post(url,
             {
                "identity":this.cookies.get('identity'),
                 'CUSTID':this.custid
             },
             {
               emulateJSON:true
             }
              ).then(
                    res=>{
                     console.log(res);
                      if(res.body.data==null){
                        //alert("该客户暂无贷款进度")
                        mui.alert('亲，该客户暂无贷款进度！')
                      }
                      this.dklistData=res.body.data.ListData

                     console.log(this.dklistData);
       //        this.getdktklistData()
        console.log("lll 贷款消息页 访问成功了");
      },
      res=>{
        console.log('messages出错')
      }
    )
  },
//        点击弹出框数据页面

      },
      components: {
        BackHeader,
        JinduTiao
      },
    }
</script>

