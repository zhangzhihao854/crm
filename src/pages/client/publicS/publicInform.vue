<template>
  <div class="moreInformBox">
    <div class="div">
      <!--<i class="el-icon-more"></i>-->
      <input class="input" type="text" placeholder="请输入客户名称" v-model="custName" @keyup.enter="handleIconClick" >
      <i class="el-icon-more" @click="showhide" ></i>
    </div>

    <div class="searchcontent" v-if="showdata" >
      <div class="contentleft" @click="hiddensearch"></div>
      <div class="contentright">
        <div class="contentWrap">
          <el-row>
            <el-col :span="24">
              <div class="contentS"><span class="span1">全部类目</span></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="contentS1"><span class="span1">客户编号</span></div></el-col>
            <el-col :span="16">
              <div class="contentS1"><el-input v-model="custId" placeholder="请输入"></el-input></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="contentS1"><span class="span1">客户名称</span></div></el-col>
            <el-col :span="16">
              <div class="contentS1"><el-input v-model="custName2" placeholder="请输入"></el-input></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="contentS1"><span class="span1">证件类型</span></div></el-col>
            <el-col :span="16">
              <div class="contentS1" style="color: #C0C4CC">
                <select v-model="value" dir="rtl" style="width: 100%;">
                  <option   value ="" style="color: #C0C4CC !important;">请选择</option>
                  <option v-for="item in dataType" :value ="item.fCode" style="color: #333 !important;">{{item.fValue}}</option>
                </select>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="contentS1"><span class="span1">证件号码</span></div></el-col>
            <el-col :span="16">
              <div class="contentS1"><el-input  v-model="identNo" placeholder="请输入"></el-input></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="contentS1"><span class="span1">归属机构</span></div></el-col>
            <el-col :span="16" class="tree">
              <div class="contentS1"><el-input   placeholder="请输入" v-model="institutionCode" disabled=disabled></el-input></div>
              <!--<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><div class="contentS1"><span class="span1">所属客户经理</span></div></el-col>
            <el-col :span="12">
              <div class="contentS1"><el-input v-model="mgrName" placeholder="请输入"></el-input></div>

            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="contentS1"><span class="span1">联系地址</span></div></el-col>
            <el-col :span="16">
              <div class="contentS1"><el-input v-model="orgAddr"  placeholder="请输入"></el-input></div>
            </el-col>
          </el-row>
        </div>
        <div class="other_footer" >
          <div class="cancel" @click="initData"><span>重置</span></div>
          <div class="keep" @click="getSelectListData"><span>查询</span></div>
        </div>
      </div>
    </div>

    <back-Header :flag="flagback"></back-Header>
    <!--添加loading-->
    <el-table v-loading="loading2"  v-show="loading" element-loading-text="拼命加载中" style="width: 100%;z-index: 10"> </el-table>
    <publicinformation :dataText="dataText" @loadBottom="loadBottom" @loadTop="loadTop" :screenHeight="screenHeight"></publicinformation>
  </div>
</template>

<script type=text/ecmascript-6>
  import myBus from '../../../components/tools/myBus.js';
  import BackHeader from '@/components/header/back-header-1'
  import publicinformation from '@/components/common/publicCom/publicinformation'
  import  mui from '../../../style/js/mui.min.js'
  import { MessageBox } from 'mint-ui';
  export default {
    components:{
      BackHeader,
      publicinformation
    },
    data () {
      return {
        title: '',
        input21: '',
        input2: '',
        flagback: '8',
        custName: '',
        dataText: [],
        showdata: false,
        loading2: true,
        loading: true,
        dataType: [],
        value: '',
        orgAddr: '',
        custId: '',
        custName2: '',
        identNo: '',
        institutionCode: '',
        mgrName:'',
        data: [
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
          orgId:'orgId'
        },
        count:0,
        prev:0,
        Scount:0,
        Sprev:0,
        Lcount:0,
        Lprev:0,
        flag:"0",
        result:{},
        /*获取屏幕的高度*/
        screenHeight: 0
      }
    },
    //    初始化mui
    created () {
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });
    },
    activated(){
      /*this.loading2=true,
       this.loading=true*/
      this.count=1
      this.prev=1
      this.Scount=1
      this.Sprev=1
      this.Lcount=1
      this.Lprev=1
      this.initData();
      //this.getNewsListData();
      this.getType();
      /*判断如果是初次进来，走获取列表页面*/
      if(this.$route.query.firstView == 1){
        /*显示loading图*/
        this.loading2=true;
        this.loading=true;
        this.dataText = []
        this.custName = '';
        this.getNewsListData();
      }

    },
    mounted(){
      /*获取屏幕的高度*/
      this.screenHeight = document.documentElement.clientHeight;
      console.log(this.screenHeight + '屏高')

    },
    methods: {
      loadBottom() {
        if(this.count>=this.pageCount){
          this.count=this.pageCount
          mui.toast('已至末尾页');
        }
//          全部
        if(this.flag=="0"){
          this.getNewsListData()
//            筛选
        }else if(this.flag=="1"){

          this.getSelectListData()
          this.showdata=false
//            模糊搜索
        }else if(this.flag=="2"){
          this.handleIconClick()
        }

      },

      loadTop() {
        if(this.flag=="0"){
          this.getNewsListDatatop()
        }else if(this.flag=="1"){

          this.getSelectListDatatop()
          this.showdata=false
        }else if(this.flag=="2"){
          this.handleIconClicktop()
        }
      },

//所属机构下拉选择内容
      handleNodeClick(data) {
        console.log(data.label);
        console.log(data.orgId);
        this.institutionCode=data.orgId
      },

//隐藏筛选界面
      hiddensearch(){
        this.showdata = false
      },
      initData(){
        this.value = '';
        this.custName2 = '';
        this.identNo = '';
        this.orgAddr = '';
        this.custId = '';
        /*暂时不置空，归属机构*/
        /* this.institutionCode = "";*/
        this.mgrName="";
      },
//条件模块显示隐藏
      showhide(){
        this.showdata = !this.showdata;
        this.institutionCodedataType();

      },
//模糊搜索客户获取列表页 下一页
      handleIconClick() {
        this.dataText = [];
        this.loading2 = true;
        this.loading = true;
        var url = `/CRMNewMobile/pclient/queryOrg`
        this.$http.post(url,
          {
            "identity": this.cookies.get('identity'),
              "custName": this.custName,
              "pageNum": this.Lcount,
              "custId": '',
              "identType":'',
              "identNo": '',
              "orgAddr": '',
              "institutionCode": '',
              "mgrName": ''
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          /*没有搜索到数据时，添加提示语*/
//            if(res.body.data.data.length == 0){
//              MessageBox.alert('亲，没有找到相关数据！').then(action => {
//                this.custName = ''
//              });
//            }

          if(res.body.data == null || res.body.data.data.length == 0){
            this.loading2= false;
            this.loading = true;
            this.dataText = []
            this.Lcount=1
          }else{
            console.log(res);
            this.dataText = res.body.data.data;
            this.loading2 = false;
            this.loading = false;
            this.Lcount=res.body.data.next
            this.Lprev=res.body.data.prev
          }
          this.flag="2"

        }).catch((error) => {
          console.log(error);
        })
      },
      //模糊搜索客户获取列表页 上一页
      handleIconClicktop() {
        this.dataText = [];
        this.loading2 = true;
        this.loading = true;
        /*var url = `/CRMNewMobile/pclient/queryLikeOrg`;*/
        var url = `/CRMNewMobile/pclient/queryOrg`;
        this.$http.post(url,
          /* {"identity": this.cookies.get('identity'), data: {"custName": this.custName, "pageNum": this.Lprev}}*/
          {
              "identity": this.cookies.get('identity'),
              "custName": this.custName,
              /*"pageNum": this.Lprev,*/
              "pageNum": this.Lprev,
              "custId": '',
              "identType":'',
              "identNo": '',
              "orgAddr": '',
              "institutionCode": '',
              "mgrName": ''
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          /*没有搜索到数据时，添加提示语*/
//            if(res.body.data.data.length == 0){
//              MessageBox.alert('亲，没有找到相关数据！').then(action => {
//                this.custName = ''
//              });
//            }
          if(res.body.data == null || res.body.data.data.length == 0){
            this.loading2= false;
            this.loading = true;
            this.dataText = []
            this.Lcount=1


          }else{
            console.log(res);
            this.dataText = res.body.data.data;
            this.loading2 = false;
            this.loading = false;
            this.Lcount=res.body.data.next
            this.Lprev=res.body.data.prev
          }

          this.flag="2"

        }).catch((error) => {
          console.log(error);
        })
      },
//获取客户列表 下一页
      getNewsListData(){
        var url = `/CRMNewMobile/pclient/queryOrg`
        this.$http.post(url,
          /*{"identity": this.cookies.get('identity'), data: {"pageNum": this.count}}*/
          {
              "identity": this.cookies.get('identity'),
              "custName": '',
              /* "pageNum": this.Lprev,*/
              "pageNum": this.count,
              "custId": '',
              "identType":'',
              "identNo": '',
              "orgAddr": '',
              "institutionCode": '',
              "mgrName": ''
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          //this.dataText = res.body.data.data;
          if(res.body.data == null || res.body.data.data.length == 0){
            this.loading2 = false;
            this.loading= true;
            this.dataText = [];
          }else{
            this.loading2 = false;
            this.loading= false;
            this.flag="0"
            this.dataText = res.body.data.data;
            this.count=res.body.data.next
            this.prev=res.body.data.prev

          }
          /*this.loading2 = false;
           this.loading= false;*/
          /*this.count=res.body.data.next
           this.prev=res.body.data.prev
           this.flag="0"*/

        }).catch((error) => {
          console.log(error);
        })
      },
//获取客户列表 上一页
      getNewsListDatatop(){
        var url = `/CRMNewMobile/pclient/queryOrg`
        this.$http.post(url,
          /*{"identity": this.cookies.get('identity'), data: {"pageNum": this.prev}}*/
          {
              "identity": this.cookies.get('identity'),
              "custName": '',
              /*"pageNum": this.Lprev,*/
              "pageNum": this.prev,
              "custId": '',
              "identType":'',
              "identNo": '',
              "orgAddr": '',
              "institutionCode": '',
              "mgrName": ''
          },
          {
            emulateJSON:true
          }

        ).then(res => {
          if(res.body.data == null || res.body.data.data.length == 0){
            this.loading2 = false;
            this.loading= true;
            this.dataText = [];
          }else{
            this.loading2 = false;
            this.loading= false;
            this.dataText = res.body.data.data;
            this.flag="0"
            this.count=res.body.data.next
            this.prev=res.body.data.prev

          }
          //this.dataText = res.body.data.data;
          /*this.count=res.body.data.next
           this.prev=res.body.data.prev
           this.flag="0"
           */
        }).catch((error) => {
          console.log(error);
        })
      },

//证件类型
      getType() {
        var url = `/CRMNewMobile/pclient/queryIdentType`;
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity')
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          console.log(res);
          this.dataType = res.body.ListData;
          console.log(this.dataType)

        }).catch((error) => {
          console.log(error);
        })
      },
//所属机构
      institutionCodedataType() {
        this.data=[]
        var url = `/CRMNewMobile/pclient/queryOrganization`;
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity')
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          console.log(res);

          this.result = res.body.data;
          this.institutionCode=this.result.departmentName

//            var resultString = JSON.stringify(result);
//            resultString = resultString.replace(/orgName/g, "label").replace(/nodes/g, "children").replace(/orgId/g, "orgId");
//            this.data.push(JSON.parse(resultString));




//不能删
//            var resultData=[];
//            var result = res.body.data;
//            var tempArray = [];
//            var tempA = [];
//            if(result){
////              result.map(function(item){
//                  var jsonItem = {};
//                  jsonItem.label=result.orgName;
//                  if(result.nodes.length>0){
//                    result.nodes.map(function(subItem){
//                      var jsonSubItem =  {children:[],label:""};
//                      jsonSubItem.label = subItem.orgName;
//                      if(subItem.nodes.length>0){
//                        console.log(subItem.nodes);
//                        var threeA = [];
//                        threeA = subItem.nodes;
//                       for(var i=0;i<threeA.length;i++){
//
//                          var threeItem = threeA[i];
//                          console.log(threeItem[0].orgName);
//                         for(var j=0;j<threeItem.length;i++){
//                           var jsonThreeItem = {label:""};
//                           jsonThreeItem.label = threeItem[0].orgName;
//                           jsonSubItem.children.push(jsonThreeItem);
//                         }
//
//                        }
//                      };
//                     //= tempA;
//                      tempArray.push(jsonSubItem);
//                    });
//                    jsonItem.children = tempArray;
//                    resultData.push(jsonItem);
//                  };
//
////               });
//
//            }


          console.log("处理完数据---------");
//            console.log(resultData);

//不能删 留着参考
//           this.data[0].label=res.body.data.orgName;
//          for(var i=0; i< res.body.data.nodes.length;i++){
//            var obj=new Object()
//            obj.label=res.body.data.nodes[i].orgName;
//            this.data[0].children.push(obj)
//            console.log(res.body.data.nodes[i].nodess[0][0].orgName);
//            for(var j=0; j< res.body.data.nodes[i].nodess.length;j++){
//              var obj1=new Object()
//              obj1.label=res.body.data.nodes[i].nodess[0][j].orgName;
//
//              this.data[0].children[i].children.push(obj1)
//            }
//            console.log(obj1);
//          }
//
//

        }).catch((error) => {
          console.log(error);
        })
      },
//条件查询获取客户列表  下一页
      getSelectListData(){
        this.dataText=[]
        this.loading2=true
        this.loading=true
        this.showhide();
        /*点击条件查询，初始化pageNum*/
        //this.Scount = 1;

        /*var url = `/CRMNewMobile/pclient/queryOrgByCondition`*/
        var url = `/CRMNewMobile/pclient/queryOrg`
        this.$http.post(url,
          {
            "identity": this.cookies.get('identity'),
              "custId": this.custId,
              "custName": this.custName2,
              "identType": this.value,
              "identNo": this.identNo,
              "orgAddr": this.orgAddr,
              "pageNum": this.Scount,
              "institutionCode": this.institutionCode,
              "mgrName":this.mgrName
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          if(res.body.data== null || res.body.data.data.length == 0){
            this.loading2=false
            this.loading=true
//              mui.alert("亲，没有找到数据哦！")
            this.dataText = []
          }else{
            console.log(res);
            this.initData();
            this.flag="1"
            this.loading2=false
            this.loading=false
            this.dataText = res.body.data.data;
            this.Scount=res.body.data.next
            this.Sprev=res.body.data.prev
          }


        }).catch((error) => {
          console.log(error);
        })
      },
//条件查询获取客户列表  上一页
      getSelectListDatatop(){
        this.showhide();
        /*var url = `/CRMNewMobile/pclient/queryOrgByCondition`*/
        var url = `/CRMNewMobile/pclient/queryOrg`
        this.$http.post(url,
          {
              "identity": this.cookies.get('identity'),
              "custId": this.custId,
              "custName": this.custName2,
              "identType": this.value,
              "identNo": this.identNo,
              "orgAddr": this.orgAddr,
              "pageNum": this.Sprev,
              "institutionCode": this.institutionCode,
              "mgrName":this.mgrName
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          console.log(res);
          this.initData();
          if(res.body.data == null || res.body.data.data.length == 0){
            this.loading2 = false;
            this.loading = true;
//              mui.alert("亲，没有找到数据哦！")
            this.dataText = [];
          }else{
            this.loading2 = false;
            this.loading = false;
            this.dataText = res.body.data.data;
            this.flag="1"
            this.Scount=res.body.data.next
            this.Sprev=res.body.data.prev
          }
          /*this.flag="1"
           this.Scount=res.body.data.next
           this.Sprev=res.body.data.prev*/

        }).catch((error) => {
          console.log(error);
        })
      }
    }


  }
</script>

<style lang='scss'scoped>
  .moreInformBox{
    height:100%;
    width: 100%;
    .back_text span[data-v-a2006ea4] {
      width: 6em!important;
    }
  }
  .div{
    height: 2.38rem;
    line-height: 2.38rem;
  }
  .div .el-input__inner{
    height: 1.5rem !important;
    width:13.33rem !important;
    background-color: rgba(248,249,251,1) !important;
    outline:none !important;
    margin-bottom: 0;
  }
  .div .moreInformBox [class^=el-icon-]{
    position: absolute !important;
    top:0rem !important;
    left: 10rem !important;
    z-index: 999;
  }
  .el-icon-more{
    color: #EB3723;
    position: fixed;
    top: 15px;
    right: 18px;
    /* top:0.8rem !important;
     left: 19.11rem !important;*/
    z-index: 999;
  }

  .input{
    position: fixed;
    top:0.43rem;
    left: 4.3rem;
    z-index: 88;
    outline:none !important;
    font-size: 0.69rem;
  }
  .searchcontent{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(223,224,225,0.4);
    z-index: 2011;
  }
  .contentright{
    min-height: 100%;
    width: 75%;
    background-color: #fff;
    float: right;
    position: relative;
    display: flex;
    display:-ms-flex;
    display:-webkit-flex;
    flex-direction: column;

  }
  .contentright .contentWrap{
    flex:1;
    -ms-flex:1;
    -webkit-flex:1;
  }
  .contentleft{
    height: 100%;
    width: 25%;
    background-color: rgba(223,224,225,0.4);
    /*background-color: red;*/
    float: left;
  }
  .contentS{
    height: 3rem;
    line-height: 3rem;
    /*background-color: #00ee00;*/
    font-size: 1rem;
    font-weight: 100;
    font-family:PingFangSC-Regular;
  }
  .contentS1{
    height: 2.55rem;
    line-height: 2.55rem;
    /*background-color: #00ee00;*/
    font-size: 0.88rem;
    font-family:PingFangSC-Regular;
  }
  .contentS2{
    height: 2.11rem;
    line-height: 2.11rem;
    text-align: center;
    border: 1px solid #EB3723;
    border-bottom: none;
    font-size: 0.94rem;
    font-family:PingFangSC-Regular;
  }
  .span1{
    margin-left: 0.88rem;
  }
  .contentright .el-row{
    border-bottom: 1px solid #E2E2E2;
  }
  .contentright .el-row:last-child{
    border-bottom: none;
  }
  .el-row1{
    /*margin-top: 87%;*/
    position:absolute;
    bottom: 0;

  }
  .borf{
    background-color: #EB3723;
    color: #fff;
  }
  .fcol{
    color: #EB3723;
  }
  select option {
    direction: ltr;
    width: 4rem;
  }
  select {
    appearance:none;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance:none; /* Safari 和 Chrome */
  }


  .other_footer{
    position: relative;
    /*left: 0;
    bottom: 0;*/
    width: 100%;
    height: 2.5em;
    border-top: 1px solid #EB3723;
    line-height: 2.5em;
    text-align: center;
  }
  .other_footer .cancel,.other_footer .keep{
    float: left;
    width: 50%;
    height: 100%;
  }
  .other_footer .cancel{
    background-color: #fff;
  }
  .other_footer .cancel span{
    color: #EB3723;
  }
  .other_footer .keep{
    background-color: #EB3723;
  }
  .other_footer .keep span{
    color: #fff;
  }

</style>
