<template>
  <div class=" myplugn temp" >
    <title-Header :title="title"></title-Header>
    <div class="mpcontent">
      <!--页面主内容区开始-->
      <div class="mui-page-content">
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <ul class="mui-table-view mui-table-view-chevron">
              <li class="mui-table-view-cell mui-media">
                  <span class="mui-navigate-right" id="userInfor">
                    <img class="mui-media-object mui-pull-left head-img" id="head-img" src="../../../static/images/Prospect_icon.png">
                    <div class="mui-media-body">
                      {{userName}}
                      <p class='mui-ellipsis'>账号:{{accountCode}}</p>
                    </div>
                  </span>
              </li>
            </ul>
            <ul class="mui-table-view mui-table-view-chevron">
              <li class="mui-table-view-cell" @click="mbdc" v-show="showTarget">
                <span  class="mui-navigate-right">我的目标达成</span>
              </li>
              <!--<li class="mui-table-view-cell" @click="gzkh">
                <span  class="mui-navigate-right">我关注的客户</span>
              </li>-->
              <li class="mui-table-view-cell">
                <router-link :to="{path:'/clientFocus',query:{markGZ:'my'}}">
                    <span  class="mui-navigate-right">我关注的客户</span>
                </router-link>
              </li>
              <!--@click="goback"-->
              <li class="mui-table-view-cell" style="text-align: left;"   @click="dialogFormVisible = true">
                <span >修改密码</span>
              </li>


            </ul>



            <ul class="mui-table-view">
              <li class="mui-table-view-cell" style="text-align: center;" @click="gobacklogin">
                <span >退出登录</span>
              </li>
              <el-dialog title="修改密码" :visible.sync="dialogFormVisible"  :before-close="cancleChange">
                <el-form :model="form">
                  <el-form-item label="旧密码" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" placeholder='请输入旧密码' type='password'></el-input>
                  </el-form-item>
                  <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="form.psd" auto-complete="off" @keyup.native='iptchange' placeholder='必须包含数字、字母、下划线' type='password' maxlength=8></el-input>
                    <div> <span id="tip" style="color:red;">{{errorcode}}</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input v-model="form.confirmPwd" auto-complete="off" @keyup.native='psdchange' placeholder='必须包含数字、字母、下划线' type='password' maxlength=8></el-input>
                    <div> <span  style="color:red;">{{errorcode2}}</span>
                    </div>
                  </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="cancleChange">取 消</el-button>
                  <el-button type="primary" @click="goback">确 定</el-button>
                </div>
              </el-dialog>
            </ul>


            <!--<input  type="number"  id="phone" maxlength="11" v-model="ipt" @keyup="a"  placeholder=/>-->



          </div>
        </div>
      </div>
    </div>


    <footer-p></footer-p>
  </div>

</template>

<style scoped lang="less" src="./myplugin.less">
</style>


<script type=text/ecmascript-6>
  import footerP from '../../components/footer/tabBar.vue'
  import TitleHeader from '../../components/header/title-header'
  import crypto from 'crypto'
  import md5 from 'js-md5';

  export default{
    data () {
      return {
        title: '我',
        accountCode:'',
        userName:'',
        ipt:'',
        //初始化角色
        ruleMark: '',
        showTarget:false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        errorcode:'',
        errorcode2:'',
        form: {
          name: '',
          psd: '',
          confirmPwd:'',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        formLabelWidth: '70px'
      }
    },
    activated(){
        /*清空数据*/
      this.name = ''
      this.psd = ''
      this.confirmPwd = ''
      this.errorcode = ''
      this.errorcode2 = ''

      this.accountCode=this.cookies.get('accountCode')
      this.userName=this.cookies.get('userName')
      console.log(this.userName)
      /*获取目标达成角色权限*/
      this.targetAchievement()
      this.ruleMark = ''
      this.showTarget = false
    },
    methods:{
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
      psdchange(){
        if(!(/^(?![^a-zA-Z]+$)(?!\\D+$)(?![^_]+$).*$/).test(this.form.confirmPwd)||this.form.confirmPwd.length<8){
          console.log(55);
          this.errorcode2='确认密码必须是8位字符，且必须包含数字，字母，下划线'
        }else{
          console.log('duile')
          this.errorcode2=''
        }
      },
//      点击取消按钮
      cancleChange(){
        this.form.name=''
        this.form.psd=''
        this.form.confirmPwd = ''
        this.dialogFormVisible = false
        this.errorcode=''
      },
        // 更改密码接口
      goback(){

        var oldmd5 = md5(this.form.name)
        var newmd5 = md5(this.form.psd)
        var new2md5 = md5(this.form.confirmPwd)
/*        var oldmd5 = crypto.createHash("md5");
        var newmd5 = crypto.createHash("md5");
        var new2md5 = crypto.createHash("md5");

        oldmd5.update(this.form.name);
        newmd5.update(this.form.psd);
        new2md5.updata(this.form.confirmPwd);

        this.form.name = oldmd5.digest('hex');
        this.form.psd = newmd5.digest('hex');
        this.form.confirmPwd = new2md5.digest('hex');*/

        var url='/CRMNewMobile/login/changePwd'
          this.$http.post(url,
            {
              "identity": this.cookies.get('identity'),
              "oldPwd": oldmd5,
              "newPwd": newmd5,
              "confirmPwd": new2md5
            },
            {
              emulateJSON:true
            }
          ).then(
            res=>{
              if(res.body.success){
                this.$confirm(res.body.msg, '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                }).then(() => {
                  this.form.name=''
                  this.form.psd=''
                  this.form.confirmPwd =''
                  this.dialogFormVisible = false
                  this.errorcode=''
                  this.$router.push("/?identity="+this.cookies.get('identity'))
                }).catch(() => {
                  this.form.name=''
                  this.form.psd=''
                  this.form.confirmPwd = ''
                  this.dialogFormVisible = false
                  this.errorcode=''
                  this.$router.push("/?identity="+this.cookies.get('identity'))
                });
              }else{
                this.$confirm(res.body.msg, '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
              }
            }).catch(function(res){
            console.log(res);
          })
      },
      gobacklogin(){
        this.cookies.remove("dep")
        this.cookies.remove("identity")
        this.cookies.remove("depId")
        this.cookies.remove("depatype")
        this.cookies.remove("JSESSIONID")
        this.$router.push("/")
      },
      mbdc(){
        /*this.$router.push("/Manager?date=date&flag=213")*/
        if(this.ruleMark == '客户经理'){
          this.$router.push("/Manager?date=date")
        }else if(this.ruleMark == '柜员'){
          this.$router.push("/GyList")
        }else if(this.ruleMark == '分中心负责人'){
          this.$router.push("/Fzx")
        }
      },

      gzkh(){
        /*this.$confirm("亲,该功能暂未开放，敬请期待哦！", '提示', {
         confirmButtonText: '确定',
         type: 'warning'
         }).then(() => {
         }).catch(() => {
         });*/
        this.$router.push('/clientFocus')
      },
      /*获取目标达成角色接口*/
      targetAchievement(){
        var url= `/CRMNewMobile/target/targetAchievement`
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity')
          },
          {
            emulateJSON:true
          }
        ).then(res =>{
          this.ruleMark = res.body.msg;
          if(this.ruleMark=='柜员'){
            this.showTarget = true
          }else if(this.ruleMark=='分中心负责人'){
            this.showTarget = true
          }else if(this.ruleMark=='客户经理'){
            this.showTarget = true
          }else{
            this.showTarget = false
          }
        })
          .catch(err =>{

          })
      }
    },
    components: {
      footerP,
      TitleHeader
    },

  }
</script>

