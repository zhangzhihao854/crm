<template>
  <div class="login">
    <div style="padding-top: 8%;padding-bottom: 5%;">
      <img src="../assets/login.png">
    </div>
    <!--loading图-->
    <el-table v-loading="isLoading"  v-show="isLoading" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <div v-show="isOA">
      <div class="phoneStyel">
        <span>用户名:</span>
        <el-input  id="ipt1" v-model="unm" placeholder="请输入用户名"   style="width: 52%;"></el-input>
      </div>
      <div class="phoneStyel">
        <span>密 &nbsp;&nbsp;码:</span>
        <el-input id="ipt2" v-model="pwd" placeholder="请输入密码"   style="width: 52%;" type="password"></el-input>
      </div>
      <div class="phoneStyel">
        <span>验证码:</span>
        <el-input id="ipt3" v-model="txt" placeholder="请输入下方验证码" style="width: 52%;" type="text"></el-input>
      </div>
      <div class='txtimg' style='margin-top: 10px'>
        <!--今天注掉 1行代码-->
       <!-- <span class=txtimgspan>{{teximg}}-->
<!--        <img :src="'http://221.195.137.135:8081/'+ teximg "  alt="验证码" style="width: 50%; height: 40px;">-->
        <img :src="'http://222.223.182.30:1411/'+ teximg "  alt="验证码">
         <!-- <img :src="'http://www.crcbcrm.com/'+ teximg"  alt="验证码">-->


          <!--<span style='color:rgb((Math.random()*256),2,3)'>{{num1}}</span>-->
          <!--<span>{{num2}}</span>-->
          <!--<span>{{num3}}</span>-->
          <!--<span>{{num4}}</span>-->


      </div>
      <div style='text-align: center;color:blue;'>
        <u @click="getimg">换一张</u>
      </div>
      <button class="bgchange01" type="success" @click="gologin();">安全登陆</button>
<!--暂时注掉忘记密码-->
      <div>
        <u class="forget" @click="fogetpsd">忘记密码</u>
      </div>
    </div>


    <!--登录成功提示框-->
    <el-dialog  title="提示"  size="large" top="30%"   :visible.sync="dialogVisible" :before-close="handleClose">
      <span style="font-size: 16px; color:#409EFF">登录成功,请选择您的身份</span>
      <div v-for="item in personId">
        <div class="mui-input-row mui-radio mui-left">
          <label>
            <input name="checkbox" class="checkipt"
                   :value='`${item.departmentId},${item.postId}`'  type="radio" >
            <div class="content-lab">{{item.departmentName}}({{item.postName}})</div>
            <!--<div>({{item.postName}})</div>-->
            </label>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="gomain()" :disabled="gomainDisabled">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="找回密码"  size="large" top="40%"  :visible.sync="dialogFormVisible"  :before-close="cancleChange">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" placeholder='请输入用户名' type='number'></el-input>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-input v-model="form.telmsg" auto-complete="off"  placeholder='请输入短信验证码' type='number' maxlength=6 style="margin-bottom: 0px"></el-input>
        </el-form-item>
        <u @click="messageclick" v-show="msgshow">点击发送</u>
        <span v-show="scdshow">{{second}}秒后重新发送</span>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="form.psd" auto-complete="off" @keyup.native='iptchange' placeholder='请输入新密码' type='password' maxlength=8></el-input>
          <div> <span id="tip" style="color:red;line-height: 15px;font-size: 12px;">{{errorcode}}</span></div>
        </el-form-item>
        <el-form-item label="确认密码":label-width="formLabelWidth">
          <el-input v-model="form.psdpsd" auto-complete="off" @keyup.native="psdchange"  placeholder='再次输入新密码' type='password' maxlength=8></el-input>
          <div> <span  style="color:red;line-height: 15px;font-size: 12px;">{{errorcode2}}</span></div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleChange">取 消</el-button>
        <el-button type="primary"  @click="changepsd">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">


  //import  componentA from "./componentA"
  import axios from 'axios'
  import crypto from 'crypto'
  import {Decrypt,Encrypt} from '../assets/js/cryptojs'

  import  {mapMutations,mapActions} from "vuex"
  export default {
    data(){
      return{
        pwd:'',
        unm:'',
        isClick:true,
        dialogVisible:false,
        personId:[],
        tokenId:"",
        username:"",
        message:'',
        txtContent:"",
        gomainDisabled:false,
        ACOUNT_CODE: '',
        key: '',
        //判断用户是否是从OA登陆的
        isOA: false,
        isLoading:false,
        //postId、departmentId集合
        listId:[],
        teximg:'',
        txt:'',
        num1:'',
        num2:'',
        num3:'',
        num4:'',
          dialogTableVisible: false,
          dialogFormVisible: false,
          errorcode:'',
          form: {
              name: '',
              namename:'',
              telmsg: '',
              psd: '',
              psdjm: '',
              psdpsd: '',
              psdpsdjm: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: '',
          },
          formLabelWidth: '76px',
          second:60,
          msgshow:true,
          scdshow:false,
        errorcode2:''
      }
    },

    activated(){
      /*点击退出登录，账号密码置空*/
      this.unm = '';
      this.pwd = '';
      this.txt = '';
      this.num1='';
      this.num2='';
      this.num3='';
      this.num4='';
      this.errorcode2 = ""
      this.errorcode = ""

      if(this.$route.query.identity){
        this.unm=this.$route.query.identity
        this.pwd=""
      }

      /*初始化数据*/
      this.tokenId = '';
      this.ACOUNT_CODE = '';
      this.key = '';
      this.isOA = false;
      //this.getimg();

      this.emptyjm()

     /*获取OA传递过来的参数*/
      function getParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      }

      //获取页面的tokenId\ACOUNT_CODE\key
      this.tokenId= getParam("tokenId");
      this.ACOUNT_CODE = getParam("ACOUNT_CODE");

      if(getParam("key") == null){
        this.key = '';
      }else{
        this.key =  getParam("key").substring(0,36);
      }
      //暂时写死
      /*this.key = 'c86e37bd-7041-436d-8751-e9e91b522d59#/'.substring(0, 36);
      this.tokenId =  'b37e0cd4-2ef0-4903-80e2-7c9172073d11';
      this.ACOUNT_CODE = '271704';*/


      /*判断用户是否是从OA登陆的，是否显示登陆页面*/
      if(this.tokenId == null || this.tokenId == ''){
          //不是从OA登陆，显示登陆页面
          this.isOA = true;
          this.isLoading = false;
          /*调验证码的接口*/
          this.getimg()

      }else{
          //从OA登陆，不显示登陆页面，显示loading图然后进入页面
          this.isOA = false;
          this.isLoading = true;
          //判断身份，登录
          this.PosttokennId()
      }

      this.gomainDisabled=false

    },
    methods:{
        // 密码加密处理
        getmd5(){
            var pwdmd5 = crypto.createHash("md5");
            pwdmd5.update(this.pwd);
           this.pwd = pwdmd5.digest('hex');
            console.log(this.pwd);
        },
//      随机获取颜色
      randomColor(){
    var r=parseInt(Math.random()*256);
    var g=parseInt(Math.random()*256);
    var b=parseInt(Math.random()*256);
    var rgb="rgb("+r+","+g+","+b+")";
    return rgb;
  },

        // 清空加密弹框的内容
        emptyjm(){

            this.form.name=''
            this.form.namename=''
            this.form.telmsg=''
            this.form.psd=''
            this.form.psdpsd=''
            this.form.psdpsd=''
            this.form.psdpsdjm=''
            this.errorcode=''
        },
  // 忘记密码
        fogetpsd(){
            console.log(123);
           this.emptyjm()
            this.dialogFormVisible = !this.dialogFormVisible;

        },

 // 点击发送验证码
        messageclick(){
            this.second=60,

            this.msgshow=!this.msgshow
            this.scdshow=!this.scdshow
            var _this=this
            this.form.namename= Encrypt(this.form.name)
            console.log(this.form.name+'加密后的用户名－－－');
            console.log(this.form.namename);



            var url='/CRMNewMobile/login/sendRecoverPwdCheckCode'
            this.$http.post(url,
               {
                  /* "identity":this.form.name,*/
                   "identity":this.form.namename,
               },
              {
                emulateJSON:true
              }
        ).then(res => {
                this.$confirm(res.data.msg, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                }).catch(() => {
                });

            }).catch(function(res){
                if(this.tokenId){
                    this.$confirm(res.data.msg, '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {
                    }).catch(() => {
                    });
                }

            });

            // 设置定时器，当60秒走完，可以再次点击发送
           var j= setInterval(function(){
                _this.second=_this.second-1
               if(_this.second<=0){
                   _this.msgshow=!_this.msgshow
                   _this.scdshow=!_this.scdshow
                   window.clearInterval(j);

               }
            },1000)

        },
   // 验证输入新密码的正则
        iptchange(){
            console.log(this.form.psd.length);
            if(!(/^(?![^a-zA-Z]+$)(?!\\D+$)(?![^_]+$).*$/).test(this.form.psd)||this.form.psd.length<8){
                console.log(55);
                this.errorcode='新密码必须是8位字符，且必须包含数字，字母，下划线'
            }else{
                console.log('duile')
                this.errorcode=''
            }
        },
      //校验确认密码
      psdchange(){
        if(!(/^(?![^a-zA-Z]+$)(?!\\D+$)(?![^_]+$).*$/).test(this.form.psdpsd)||this.form.psdpsd.length<8){
          console.log(55);
          this.errorcode2='确认密码必须是8位字符，且必须包含数字，字母，下划线'
        }else{
          console.log('duile')
          this.errorcode2=''
        }
      },
        // 点击修改密码确定按钮
        changepsd(){
            var _this=this
            var url='/CRMNewMobile/login/recoverPwd'

            var pwdmd5 = crypto.createHash("md5");
            pwdmd5.update(this.form.psd);
            this.form.psdjm = pwdmd5.digest('hex');

            console.log(this.form.psd);
            console.log(this.form.psdjm);
            var pwdjmmd5 = crypto.createHash("md5");
            pwdjmmd5.update(this.form.psdpsd);
            this.form.psdpsdjm = pwdjmmd5.digest('hex');
            console.log(this.form.psdpsd);
            console.log(this.form.psdpsdjm);

            this.$http.post(url,
                {
                    "identity":Encrypt(this.form.name),
                    'checkCode':this.form.telmsg,
                    'newPwd1':this.form.psdjm,
                    'newPwd2':this.form.psdpsdjm,
                },
              {
                emulateJSON:true
              }
            ).then(res => {

                this.$confirm(res.data.msg, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {

                  //success为false清空表数据
                  if(res.body.success==false){
                    this.form.name = '';
                    this.form.telmsg ='';
                    this.form.psd = '';
                    this.form.psdpsd = '';
                    this.errorcode2 = '';
                    this.errorcode = '';
                  }else{
                    this.dialogFormVisible = !this.dialogFormVisible;
                  }





                }).catch(() => {
                });



            }).catch(function(res){
                if(this.tokenId){
                    this.$confirm(res.data.msg, '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {
                    }).catch(() => {
                    });
                }

            });
        },
//
//      判斷tokenId
      PosttokennId(){
/*        var url='/CRMNewMobile/login/tokenVerification?tokenId='+this.tokenId+'&ACOUNT_CODE='+this.ACOUNT_CODE+'&key='+this.key;*/
          var url = '/CRMNewMobile/login/tokenVerification'
        this.$http.post(url,
          {
              "tokenId": this.tokenId,
              "ACOUNT_CODE": this.ACOUNT_CODE,
              'key': this.key
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          //获取账号
          this.unm=res.body.data.id;
          this.isLoading = false;
          this.tokenIdLogin()

        }).catch(function(res){
          if(this.tokenId){
            this.$confirm("登录失败，请检查用户名和密码", '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(() => {
            }).catch(() => {
            });
          }

        });
      },
      getCheckBoxRes(className){
        var rdsObj   = document.getElementsByClassName(className);
    /*    var checkVal = new Array();
        var dataArr = new Array();
        var k= 0;
        for(var i = 0; i < rdsObj.length; i++){
          if(rdsObj[i].checked==true){
            checkVal[k] = rdsObj[i].value;
            k++;
            this.val=checkVal
            //新增
            dataArr = this.val;
            this.listId = dataArr.split(",");
           // alert(this.listId)
            this.cookies.set("postId",this.listId[1].toString())
            this.cookies.set("dep",this.listId[0].toString())
            alert(this.listId)
          }
        }
        return checkVal;*/
        for(var i = 0; i < rdsObj.length; i++){
            if(rdsObj[i].checked==true){
              this.cookies.set("postId",this.personId[i].postId)
              this.cookies.set("dep",this.personId[i].departmentId)
            }
        }

      },
      /*OA登陆CRM时走的登录接口*/
      tokenIdLogin(){
        var url='/CRMNewMobile/login/ssoLogin'
        this.$http.post(url,
          {
              "identity":"",
             "accountName":this.unm,
             "isSsoKey":'a6f4e5a8-4b19-417a-adde-d8a59ca19e44'
          },
          {
            emulateJSON:true
          }
        ).then(res => {

          if(res.body.success==false){
            this.$confirm(res.body.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(() => {
              if(res.body.msg=="用户名不存在"){
                  //清空密码，验证码,用户名
                this.unm=""
                this.pwd = ""
                this.txt = ""
                this.dialogVisible=false
              }else if(res.body.msg=="密码登录"){
                this.pwd=""
                this.txt = ""
                this.dialogVisible=false
              }
              this.pwd=""
            }).catch(() => {
            });
            return false
          }
          this.cookies.set("identity",res.body.data.identity)
          if(res.body.data.departmentPost.length==1){
             //alert('123')
            this.personId=res.body.data.departmentPost

            this.cookies.set("userName",res.body.data.userName)
            this.cookies.set("dep",res.body.data.departmentPost[0].departmentId)
            this.cookies.set("postId",res.body.data.departmentPost[0].postId)
            //this.getCheckBoxRes("checkipt")

            //var radioList = document.getElementsByClassName()

            var url='/CRMNewMobile/login/toDepa'
            this.$http.post(url,
              {
                  "identity":this.cookies.get('identity'),
                  "depaId":this.cookies.get('dep'),
                  "postId":this.cookies.get('postId')
              },
              {
                emulateJSON:true
              }
            ).then(
              res=>{
                console.log("登录成功");
                this.cookies.set("cxhState",res.body.data.cxhState)
                this.cookies.set("postId",res.body.data.postId)
                this.$router.push('/main');//换一种方式
                this.dialogVisible = false;
              }).catch(function(res){
              console.log(res);
            })
          }else{
            this.dialogVisible = true;
            this.personId=res.body.data.departmentPost
            //this.cookies.set("identity",res.body.data.identity)
            this.cookies.set("cxhState",res.body.data.cxhState)
            this.cookies.set("userName",res.body.data.userName)
          }
//        写到vuex里面的
//          this.$store.state.pswd=this.pwd;
        }).catch(function(res){
          console.log(res)
//            alert("登录失败，请检查用户名和密码")
        });
      },

//      获取随机验证码的图片接口
      getimg(){
        var url='/CRMNewMobile/login/getCheckCode'
        this.$http.post(url).then(
          res=>{
   /*         console.log(res.body.data);
            this.teximg=res.body.data.checkCode
            this.num1=this.teximg.substr(0,1)
            this.num2=this.teximg.substr(1,1)
            this.num3=this.teximg.substr(2,1)
            this.num4=this.teximg.substr(3,1)
            console.log(this.num1);
            console.log(this.num2);
            console.log(this.num3);
            console.log(this.num4);
            this.teximg= Decrypt(this.teximg)
            console.log('解密后的验证码－－－');
              console.log(this.teximg);*/

            this.teximg=res.body.data.url;
          }).catch(function(res){
          console.log(res);
        })
      },
/*//      点击换一张走的接口
      changetxt(){
        var url='/CRMNewMobile/login/getCheckCode'
        var time=new Date()
        this.txt=''
        console.log(time);
        this.$http.post(url,
          {"timeflag":time}
        ).then(
          res=>{
            /!*console.log(res.body.data);
            this.teximg=res.body.data.checkCode
              this.teximg= Decrypt(this.teximg)
              console.log('解密后的验证码－－－');
              console.log(this.teximg);*!/
            this.teximg = res.body.data.url;
            console.log('图片路径=》'+this.teximg)

          }).catch(function(res){
          console.log(res);
        })
      },*/
      /*app走的登录接口*/
    /*  gologin(){
          this.getmd5()
          var url='/CRMNewMobile/login/toLogin'
          this.$http.post(url,
           { identity:"",
             data:{
             accountName:this.unm,
             password:this.pwd,
             checkCode:this.txt,
             codeUrl:this.teximg,
           }
           }).then(res => {


            if(res.body.success==false){
              //this.changetxt()
              this.$confirm(res.body.msg, '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              }).then(() => {
                if(res.body.msg=="用户名不存在"){
                  this.unm=""
                  this.dialogVisible=false
                }else if(res.body.msg=="密码登录"){
                  this.pwd=""
                  this.dialogVisible=false
                }
                this.pwd=""
              }).catch(() => {
              });
              //验证码错误，刷新验证码
              this.getimg();
              return false
            }
            this.cookies.set("identity",res.body.data.identity)
            if(res.body.data.departmentPost.length==1){
              this.personId=res.body.data.departmentPost

              this.cookies.set("userName",res.body.data.userName)
              this.cookies.set("accountCode",res.body.data.accountCode)
              this.cookies.set("dep",res.body.data.departmentPost[0].departmentId)
              this.cookies.set("postId",res.body.data.departmentPost[0].postId)

              //this.getCheckBoxRes("checkipt")
              var url='/CRMNewMobile/login/toDepa'
              this.$http.post(url,
                { "identity":this.cookies.get('identity'), "data":{"depaId":this.cookies.get('dep'),"postId":this.cookies.get('postId')}}
              ).then(
                res=>{
                  console.log("登录成功");
                  this.cookies.set("cxhState",res.body.data.cxhState)
                  this.cookies.set("postId",res.body.data.postId)
                  this.$router.push('/main');//换一种方式
                  this.dialogVisible = false;
                  /!*新增：如果返回为false,刷新验证码*!/
                  if(res.body.success == false){
                    //重新刷新验证码
                    this.getimg();
                  }
                }).catch(function(res){


              })
            }else{
              this.dialogVisible = true;
              //this.changetxt()
              this.personId=res.body.data.departmentPost
              //this.cookies.set("identity",res.body.data.identity)
              this.cookies.set("cxhState",res.body.data.cxhState)
              this.cookies.set("userName",res.body.data.userName)
            }
//        写到vuex里面的
//          this.$store.state.pswd=this.pwd;
        }).catch(function(res){
            console.log(res)
//            alert("登录失败，请检查用户名和密码")
          });
      },
*/
      gologin(){
        this.getmd5()
        var url='/CRMNewMobile/login/toLogin'
        this.$http.post(url,
          {
            identity: "",
            accountName: this.unm,
            password: this.pwd,
            checkCode: this.txt,
            codeUrl: this.teximg,

          },
          {
            emulateJSON:true
          }
          ).then(res => {


          if(res.body.success==false){
            //this.changetxt()
            this.$confirm(res.body.msg, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(() => {
              if(res.body.msg=="用户名不存在"){
                this.unm=""
                this.pwd = ""
                this.txt = ""
                this.dialogVisible=false
              }else if(res.body.msg=="密码错误,您还能尝试2次"){
                this.pwd=""
                this.txt = ""
                this.dialogVisible=false
              }else if(res.body.msg=="密码错误,您还能尝试1次"){
                this.pwd=""
                this.txt = ""
                this.dialogVisible=false
              }else if(res.body.msg=="输入密码错误次数过多,请您稍后再试"){
                this.pwd=""
                this.txt = ""
                this.dialogVisible=false
              }else if(res.body.msg== "验证码输入错误"){
                this.pwd=""
                this.txt = ""

              }
            }).catch(() => {
            });
            //验证码错误，刷新验证码
            this.getimg();
            return false
          }
          this.cookies.set("identity",res.body.data.identity)
          if(res.body.data.departmentPost.length==1){
            this.personId=res.body.data.departmentPost

            this.cookies.set("userName",res.body.data.userName)
            this.cookies.set("accountCode",res.body.data.accountCode)
            this.cookies.set("dep",res.body.data.departmentPost[0].departmentId)
            this.cookies.set("postId",res.body.data.departmentPost[0].postId)

            //this.getCheckBoxRes("checkipt")
            var url='/CRMNewMobile/login/toDepa'
            this.$http.post(url,
              { "identity":this.cookies.get('identity'),
                "depaId":this.cookies.get('dep'),
                "postId":this.cookies.get('postId')
              },
              {
                emulateJSON:true
              }
            ).then(
              res=>{
                console.log("登录成功");
                this.cookies.set("cxhState",res.body.data.cxhState)
                this.cookies.set("postId",res.body.data.postId)
                this.$router.push('/main');//换一种方式
                this.dialogVisible = false;
                /*新增：如果返回为false,刷新验证码*/
                if(res.body.success == false){
                  //重新刷新验证码
                  this.getimg();
                }
              }).catch(function(res){


            })
          }else{
            this.dialogVisible = true;
            //this.changetxt()
            this.personId=res.body.data.departmentPost
            //this.cookies.set("identity",res.body.data.identity)
            this.cookies.set("cxhState",res.body.data.cxhState)
            this.cookies.set("userName",res.body.data.userName)
          }
//        写到vuex里面的
//          this.$store.state.pswd=this.pwd;
        }).catch(function(res){
          console.log(res)
//            alert("登录失败，请检查用户名和密码")
        });
      },

      handleClose (){
        this.dialogVisible = !this.dialogVisible;
      },
        cancleChange(){
            this.dialogFormVisible = !this.dialogFormVisible;

        },


//      如果有很多身份需要选择的时候
      gomain () {
        this.getCheckBoxRes("checkipt")
        console.log(this.cookies.get('dep'))
        if(this.cookies.get('dep')==undefined){
          this.$message({
            message: '亲，请您选择一个身份哦',
            type: 'warning'
          });
          return false
        }


        var url='/CRMNewMobile/login/toDepa'
        this.$http.post(url,
          {
            "identity": this.cookies.get('identity'),
            "depaId": this.cookies.get('dep'),
            "postId": this.cookies.get('postId')
          },
          {
            emulateJSON:true
          }
        ).then(
          res=>{

            this.cookies.set("cxhState",res.body.data.cxhState)
            this.cookies.set("postId",res.body.data.postId)

            this.dialogVisible = false;
            this.$router.push('/main');
          }).catch(function(res){
          console.log(res);
        })
      },
      ceshi(){
        this.$router.push('/main');
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  /*less变量声明*/
  @pcolor : #42b983;
  @height:30px;

  .fontSize(@fontSize:1em)
  {
    font-size:@fontSize;
  }
  .txtimg .txtimgspan{
    display: inline-block;
    width:110px;
    height:40px;
    background-color: rgb(227,226,238);
    border-radius: 2px;
    box-shadow: 4px 4px 8px #5a5a5a;
    margin-bottom: 10px;
    line-height:40px;
    text-align: center;
    font-size:18px;

  }

  /*less 变量引用*/
  .login{
    height:auto;
    background-color: #FFFFFF;
    height:100%;
    width: 100%;
    text-align: center;
    position:fixed;
    top:0;
    bottom:0;
    left:0;
  }
  .bgchange01{
    width: 40%;
    margin-top: 10%;
    margin-bottom: 20%;
    margin-left: 5%;
    background-color: #EB3723;
    color:#fff;
  }
  .phoneStyel{
    height: 50px;
    width: 100%;
  .fontSize(1rem);
    line-height: 50px;
    /*padding-top: 5%;*/
    position: relative;
  }
  /*.phoneStyel input :first-child{*/
    /*width: 40%;*/
    /*background-color: #ddd;*/
    /*margin-left: 20px;*/
    /*margin-right: 20px;*/
  /*}*/
  .phoneStyel input{

  }
  .footerStyle{
    padding-top:1em;height:70px;line-height:70px;
  }
  .hl:extend(.phoneStyel){}
  #ipt1{
    position:absolute !important;
    right:3rem
  }
  #ipt2{
    position:absolute;
    right:3rem
  }

  .content-lab{
    text-align: left !important;
  }
  .forget{
    font-size: 1em;
    color: firebrick;
  }
  .el-form-item{
    margin-bottom: 0 !important;
  }


</style>
