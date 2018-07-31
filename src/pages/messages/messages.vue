<template>
<div class="temp" id="temp">
  <title-Header :title="title"></title-Header>
  <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
<!-- 列表页 -->
  <div class="mui-content">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newmsgListData" @click="type(item.type)" :key="item.id">
        <router-link :to="{path:'/listdetail',query:{type:item.type,title:item.title,flag:flag}}">
          <img class="mui-media-object mui-pull-left" :src="'./static/images/'+item.type+'.png'">
          <div class="mui-media-body">
            {{item.title}}
            <span class="mui-pull-right timer" >{{item.time?item.time.substring(0,10):""}}</span>
            <!--<span class="mui-pull-right timer" >{{currentDate}}</span>-->
            <p class='mui-ellipsis'>{{item.content}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="kong"></div>
    <footer-p></footer-p>
</div>
</template>
<style scoped>
  .kong{
    height:3em;
  }
  .mui-ellipsis{
    position:relative;
    padding-right:5em;
  }
  #title_header{
    border-bottom: 1px solid #E5E5E5;
  }
.timer{
  position:absolute;
  right:1rem;
  color:#ccc;
}
  .mui-media{
    height:3.67rem;
  }
  .mui-content{
    margin-top:3rem !important;
  }
  .mui-content .mui-media-object{
    line-height: 3.67rem !important;
    height:100%!important;
    max-width: none;
  }
  .mui-content .mui-media-body{
    font-size:0.89rem;
    font-family:PingFangSC-Regular;
    color:rgba(34,34,34,1);
    line-height:1.5rem;
  }
  .mui-content .mui-ellipsis{
    font-size:0.72rem;
    font-family:PingFangSC-Regular;
    color:rgba(85,85,85,1);
  }
  .mui-content .mui-table-view-cell{
    padding: 9px 13px;
  }
  .mui-table-view-cell:after{
    background-color:#E5E5E5;
  }
  .mui-content .timer{
    font-size:0.67rem;
    font-family:PingFangSC-Regular;
    color:rgba(136,136,136,1);
    line-height:1.61rem;
  }
</style>
<script type="text/ecmascript-6">
  import footerP from '../../components/footer/tabBar.vue'
  import TitleHeader from '@/components/header/title-header'
  export default {
    data () {
      return {
        title: '消息',
        currentDate:"",
        msgListData:[],
        count:0,
        loading2: true,
        PermissinosData:[],
        newmsgListData:[],
        flag:"02"

      }
    },
    activated(){
      this.msgListData =[];
      this.newmsgListData =[];
      this.loading2=true
      this.getPermissinos()
      this.getNewsListData()
      /*消息列表显示时间*/
      var M=new Date().getMinutes()+"";
      var H=new Date().getHours();
      this.M=M.length>1?M : 0+M;
      this.currentDate=H+":"+this.M
    },

    components: {
      TitleHeader,
      footerP
    },
    methods: {

//      获取权限
      getPermissinos(){
        var url= `/CRMNewMobile/massage/messagePermissions`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
               "depaId":this.cookies.get('dep')
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
            console.log(res.body.ListData[0].ListData);
            this.PermissinosData=res.body.ListData[0].ListData
          },
          res => {
            console.log(res)
          }
        )
      },

      // 进行网络请求
      getNewsListData () {
        var url = `/CRMNewMobile/massage/messageList`
        // 进行请求
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
              "depaId":this.cookies.get('dep')
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
            if(this.PermissinosData.length == 0){
              this.newmsgListData = [];
              this.loading2 = false
              this.newmsgListData=res.body.ListData[0].ListData

            }else{
                //alert('有类型')
              this.loading2 = false
              this.newmsgListData = [];
              /*获取显示的消息类型数组*/
              this.msgListData=res.body.ListData[0].ListData
              /*筛选消息列表*/
              for (var i = 0; i < this.msgListData.length; i++) {

                for (var j = 0; j < this.msgListData.length; j++) {
                  if(this.msgListData[i].type==this.PermissinosData[j]){
                    this.newmsgListData.push(this.msgListData[i])
                    console.log(this.newmsgListData);
                  }
                }
              }
              //alert('显示的消息条数'+ this.newmsgListData.length)
            }
          },
          res => {
            console.log(res)
          }
        )
      },
      type(content){
        var url = '/CRMNewMobile/massage/messageList'
//        进行发送
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
            "depaId":this.cookies.get('dep'),
            "content":content,
          },
          {
            emulateJSON:true
          }
          ).then(
          res=>{
//            console.log(content);
          },
          res=>{
            console.log('messages出错')
          }
        )
      }
    }
  }
</script>

