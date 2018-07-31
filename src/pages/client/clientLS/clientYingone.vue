<template>
   <div class="clientyingbox" >
   	<div class="header">
        <back-Header :title="title"></back-Header>
    </div>
    <div class="filter" @click="showhide"><img src="../../../../static/images/筛选@2x.png" alt="" style="width: 100%; height: 100%"></div>
   <div class="filtercontent" v-if="showdatat">

       <div class="filterc">
           <div class="f-left ipt">
               <span>提醒类型</span>
           </div>
           <div class="f-right">
             <el-select v-model="value" placeholder="请选择" @change="getPapers(value)" >
               <el-option v-for="item in typeoptions" :key="item.id" :label="item.description" :value="item.id" >{{item.description}}</el-option>
             </el-select>


           </div>
       </div>
       <div class="filterc">
           <div class="f-left ipt">
               <span>提醒生成日期</span>
           </div>
           <div class="f-right">

             <mt-button @click.native="open('picker1')" size="large" >{{value1}}</mt-button>
             <mt-datetime-picker
               ref="picker1"
               type="date"
               @confirm="handleChange">
             </mt-datetime-picker>
           </div>
       </div>
       <div class="filterc">
           <div class="f-left ipt">
               <span>提醒到期日期</span>
           </div>
           <div class="f-right">
             <mt-button @click.native="open2('picker2')" size="large" >{{value2}}</mt-button>
             <mt-datetime-picker
               ref="picker2"
               type="date"
               @confirm="handleChange2">
             </mt-datetime-picker>
           </div>
       </div>
       <div class="filtfoot">
            <div class="footf f-lef" @click="resetInput">
                <span>重置</span>
            </div>
           <div class="footf f-righ" @click="postshaixuan">
               <span>查询</span>
           </div>
       </div>
   </div>
     <!--设置遮罩层-->
     <div class="mask" v-if="showdatat"></div>

    <div class="clientyingbox">
      <!--添加loading图-->
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>

      <!--判断数据为空时，显示暂无数据图片-->
      <div v-show="eventShow" class="message" style="text-align: center;">
        <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
          <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
        </div>
        <div style="margin-top: 20px;">暂时没有信息哦~</div>
      </div>
     <!--消息列表-->
      <div v-if="showdata" class="messageBox">
       <!-- <el-row v-for="(items,index) in listdata" :key="index" class="reminderMessage">
          <el-col :span="3">
            <div class="grid-content"><img class='imgs' src="../../../../static/images/组-207@3x.png" width="30" height="30"></div>
          </el-col>
          <el-col :span="15">
            <div class="grid-content2">{{items.mobcrmNews.type}} </div>
           &lt;!&ndash; <div class='f-left1'>{{items.showdate2}}—{{items.duedate}}</div>&ndash;&gt;
          </el-col>
          <el-col :span="6">
            <div class="grid-content3">
              <span class="f-right1 el-icon-more"></span>
            </div>
          </el-col>
         &lt;!&ndash; <el-col :span="24"><div class="grid-content1">描述内容</div></el-col>&ndash;&gt;
        </el-row>-->
        <ul class="mui-table-view">
          <li class="mui-table-view-cell mui-media" v-for="(item,index) in listdata" :key="index">
            <a href="javascript:;">
              <img class="mui-media-object mui-pull-left" :src="'./static/images/'+item.mobcrmNews.type+'.png'">
              <div class="mui-media-body">
                {{item.title}}
                <span class="mui-pull-right ">...</span>
                <p class="timer"></p>
                <p class='mui-ellipsis'>{{item.msg}}</p>
              </div>
           </a>
          </li>
        </ul>
      </div>


    </div>


    </div>
</template>

<script type=text/ecmascript-6>
import BackHeader from '@/components/header/back-header'
import clientYewucomp from '@/components/common/clientComp/clientYewucomp'
import { MessageBox } from 'mint-ui';
import mui from '../../../../src/style/js/mui.min.js'
  export default {
    components:{
    	BackHeader,
    },
    data () {
      return {
          title:'客户提醒信息',
//          items:{
//            dataText1:'生日提醒',
//              dataText2:'12:45',
//            dataText3:'你需要还款你需要还款你需要还款你需要还款你需要还款你需要还款'
//          },
        listdata:[],
        typeoptions:[],
          value8:'',
        showdatat:false,
        showdata:false,
        loading2:true,
        value1:'请选择',
        value2:'请选择',
        value:'',
        eventShow: false,

        }
      },
    activated(){

      this.loading2=true,
      this.showdatat=false,
      this.showdata=false,
      this.eventShow = false,

      this.listdata=[]
      this.typeoptions=[]
      this.custId = this.$route.query.custId;
      this.getclientTextData()
      this.getPapers()
    },
      methods:{


        beforeDestroy() {
          Indicator.close();
        },
        open(picker) {
          this.$refs[picker].open();
        },
        open2(picker) {
          this.$refs[picker].open();
        },

        handleChange(value) {
          console.log(value)
          var d = new Date(value);
          var data=d.getDate()
          data=data>=10?data:("0"+data)
          var time=d.getFullYear() + '-' + ((d.getMonth() + 1)>=10?(d.getMonth() + 1):"0"+(d.getMonth() + 1)) + '-'+data+' ';
          console.log(time);
          this.value1=time
        },
        handleChange2(value) {
          console.log(value)
          var d = new Date(value);
          var data=d.getDate()
          data=data>=10?data:("0"+data)
          var time=d.getFullYear() + '-' + ((d.getMonth() + 1)>=10?(d.getMonth() + 1):"0"+(d.getMonth() + 1)) + '-'+data+' ';
          console.log(time);
          this.value2=time
        },

        showhide(){
          this.value=""
          this.value1="请选择"
          this.value2="请选择"
          this.showdatat = !this.showdatat
          //this.eventShow = false

          if(this.showdatat == false){
            this.showdata = true
          }
        },

        getclientTextData(){
          var url = `/CRMNewMobile/business/queryMsgTypeByCondition`;
          this.$http.post(url,
            {
              "identity": this.cookies.get('identity'),
              "custId": this.custId,
              "type":"",
              "showdate":"",
              "duedate":""
            },
            {
              emulateJSON:true
            }
          ).then(res => {
               /*判断数据为空显示暂无数据*/
              if(res.body.ListData[0] == null){
                  this.loading2 = false
                  this.eventShow = true
                  this.showdata = false
                  this.listdata = []
              }else{
                this.showdata = true
                this.listdata=res.body.ListData
                this.eventShow = false
                this.loading2 = false

              }
        }).catch((error) => {
            console.log(error);
        })
        },
//        获取type
        getPapers(){
          var url = `/CRMNewMobile/business/queryOrgMsgType`;
          this.$http.post(url,
            {"identity": this.cookies.get('identity'),
              "custId": this.custId,
              "type":"",
              "showdate":"",
              "duedate":""
            },
            {
              emulateJSON:true
            }
          ).then(res => {
            //this.loading2=false
            if(res.body.ListData[0] == null){
              this.typeoptions = []
            }else{
              this.typeoptions=res.body.ListData
            }

          }).catch((error) => {
            console.log(error);
          })
        },
//        发送筛选请求
        postshaixuan(){
          if(this.value1=="请选择"){
            this.value1=""
          }
          if(this.value2=="请选择"){
            this.value2=""
          }
          //隐藏筛选页面
          this.showdatat = false;
          //显示loading图
          this.loading2 = true;
          //清空列表数据
          this.listdata = [];
          //隐藏信封图
          this.eventShow = false;
          var url = `/CRMNewMobile/business/queryMsgTypeByCondition`;
          this.$http.post(url,
            {
              "identity": this.cookies.get('identity'),
              "custId": this.custId,
              "type":this.value,
              "showdate":this.value1,
              "duedate":this.value2
            },
            {
              emulateJSON:true
            }
          ).then(res => {
            if(res.body.ListData[0] == null){
              this.eventShow = true;
              /*隐藏loading图*/
              this.loading2 = false;
              this.showdata = false;
              /*置空listdata*/
              this.listdata = []
            }else{
              this.showdata = true;
              /*隐藏loading图*/
              this.loading2 = false;
              this.eventShow = false;
              this.listdata=res.body.ListData;

            }
          }).catch((error) => {
            console.log(error);
          })
        },
        /*点击重置按钮，清空条件内容*/
        resetInput(){
          this.value = '';
          this.value1 = '请选择';
          this.value2 = '请选择'
        }
      }
  }
</script>

<style scoped>
  .mint-button--default{
    background-color: #fff !important;
    box-shadow:none !important;
    font-size:0.88rem;
    color:#888888;
  }
  .mint-button--large {
    display: inline-block;
  }
  .clientyingbox{
    /*border-bottom: 1px solid #EAE7E7;*/
    border-top: 1px solid #EAE7E7;
    background: #ffffff;
    }
  .header{
    /*margin-bottom: 20px;*/
  }

  .grid-content {
    min-height:30px;
    line-height: 30px;
  }
  .grid-content2{
    min-height:30px;
    line-height: 30px;
    margin-bottom:-10px;
    color: #888888;
    font-size: 0.88rem;
  }
   .grid-content1{
    margin-left: 12.5%;
    word-break: break-all;
    word-wrap: break-word;
    margin-right: 12.5%;
    font-size: 0.77rem;
       color: #555;
   }
  .f-left{
    font-size: 0.86rem;
    color: #888888;
      height: 2.5rem;
      width: 8rem;
      display: inline-block;
  }
  .ipt{
      line-height: 2.5rem;
  }
  .ipt span{
      margin-left: 1rem;
  }
  .f-right{
      float: right;
      color: #CFCCCC;
      font-size: 30px;
      width: 10rem;
  }

/* .f-right1{
      float: right;
     margin-right: 1rem !important;
  }*/
  .imgs{
    vertical-align: middle;
    float: right;
    margin-right: 5px;
    margin-top: 8px;
      width: 1.5rem;
      height: 1.5rem;
  }
  .f-left1{
      font-size: 0.52rem;
      color: #888;
      margin-top: 0.3rem;
  }
  .filtercontent{
      width: 100%;
      position: absolute;
      top:44px;
      left: 0;
      background: #fff;
      z-index: 2000;
  }
.filter{
    position: absolute !important;
    top: 0.6rem !important;
    right: 0.8rem !important;
    z-index: 999;
 /*   position: absolute;
    right: 0.5rem;
    top: 0.5rem;*/
    width: 1.16rem !important;
    height: 1.25rem !important;
}

.filter .el-icon-more{
  color: #EB3723;
  position: absolute !important;
  top: 0rem !important;
  left: 0rem !important;
  z-index: 999;
}
.filtfoot{
    width: 100%;
    height: 2.16rem;
    margin-top: 2.02rem;
    border-top: 1px solid #EB3723;
    font-family:PingFangSC-Regular !important;
    font-size: 0.91rem;
}
  .filtfoot .footf{
     width: 50%;
      display: inline-block;
      text-align: center;
      line-height: 2.16rem;
 }
  .f-lef{
      float: left;
      color: rgba(235,55,35,1);
  }
    .f-righ{
        float: right;
        background:rgba(235,55,35,1) ;
        color: #fff;
    }
  .reminderMessage{
    border-bottom: 1px solid #efeff4;
  }
  .message{
    margin-top: 100px;
  }
  .f-right1{
    position: absolute;
    right: 23px;
  }
  .clientyingbox .mask{
    width:100%;
    height:100%;
    background: rgba(153,153,153,0.4);
    position: fixed;
    left: 0;
    top: 44px;
    z-index: 99;
  }
  /*.filtercontent{
    z-index: 2000;
  }*/

  .messageBox .timer{
    color:rgba(136,136,136,1);
    font-size:0.67rem;
    line-height:1rem;
  }
  .messageBox .mui-ellipsis{
    color:rgba(85,85,85,1);
    font-size:0.78rem;
    white-space: normal;
    width: 11.75rem;
    font-family: PingFangSC-Regular;
    line-height: 1.5;
  }
  .messageBox .mui-media-body{
    font-size: 0.89rem;
    color: rgba(34,34,34,1);
    line-height:1.61rem;
  }
  .messageBox .mui-pull-right{
    color: rgba(207,204,204,1);
    height:0.17rem;
  }
  .messageBox .mui-table-view-cell{
    padding: 9px 13px;
  }
  /*修改扩展符的大小*/
  .messageBox .mui-pull-right[data-v-3a21f120]{
    font-size: 1.3rem;
  }
</style>
