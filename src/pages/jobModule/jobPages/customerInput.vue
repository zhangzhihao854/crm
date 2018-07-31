<template>
  <div class="customer-input" id="customerPage" @click="onBlur2($event)">
    <back-header :title="title"></back-header>
    <div style="overflow: scroll;height: 100%">
      <div class="customer info" >
        <div class="content khmc">
          <span class="name"><b class="red">* </b>客户名称</span>
          <span style="color:#222">
            <!--<el-input v-model="custName" type="text" class="username" placeholder="请输入" :maxlength=50  @change="onUser"></el-input>-->
           <el-input type="textarea" class="pre-text" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入" v-model="custName" @blur="onUser"></el-input>
        </span>
        </div>
        <div class="content khmc">
          <span class="spa"> <b class="red">* </b>客户类型</span>
          <span>
          <select v-model="value" id="papersselsct" placeholder="请选择" @change="getPapers(value)"  dir="rtl" >
            <option value="" >请选择</option>
            <option style="color:#222" v-for="item in options"  :value="item.value" >{{item.label}}</option>
          </select>

        </span>

        </div>
      </div>
      <div class="customer certificate">
        <div class="content">
          <span class="spa">证件类型</span>
          <span style="color:#222">
          <select id="F_CODEid" v-if="F_CODE!=null" v-model="F_CODE"  placeholder="请选择"  dir="rtl" @change="FCODEselect(F_CODE)">
            <option value="" >请选择</option>
            <option style="color:#222" v-if="listData!=null" v-for="item in listData"  :value="item.F_CODE" >{{item.F_VALUE}}</option>
          </select>
        </span>
        </div>
        <div class="content" style="padding-left: 1.416rem">
          <span class="certNum spa">证件号码</span>
          <span>
          <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" v-model="identNo" placeholder="请输入" :maxlength=50   @blur="onShen"></el-input>
        </span>
        </div>
      </div>
      <div class="customer phone">
        <div class="content lxdh">
          <span><b class="red">* </b>联系电话</span>
          <span>
          <!--<el-input type="tel" v-model="linkmanTel" placeholder="请输入" :maxlength=11  @blur="onBlur" ></el-input>-->
            <!--<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入" :maxlength=11  @blur="onBlur"-->
            <!--v-model="linkmanTel" >-->
            <!--</el-input>-->

          <input type="number" class="yxje"  placeholder="请输入"  min="0" max="99999999999"  @blur="onBlur"
                 v-model="linkmanTel"  @keyup="Telkeyup" >

        </span>

        </div>
      </div>
      <div class="customer intention">
        <div class="content">
          <span class="spa">意向金额</span>
          <span >
          <input type="text" class="yxje" v-model="interestAmount" placeholder="请输入" maxlength=500 style="font-size: 0.88rem !important;color:#222; text-align: left">
        </span>
        </div>

        <div class="content" >
          <span class="spa">资金需求时间</span>

          <span style="display:inline-block; width: 195px; text-align: left">
           <input type="date"  v-model="value1" class="date"  placeholder="请选择日期" @focus=removeAttribute() id="customerdateid">

            <!--<mt-button @click.native="open('picker2')" size="large" v-model="value1">{{value1}}</mt-button>-->
            <!--<mt-datetime-picker-->
            <!--ref="picker2"-->
            <!--type="date"-->
            <!--@confirm="handleChange"-->
            <!--:startDate="startDate"-->
            <!--:endDate="endDate"-->
            <!--&gt;-->
            <!--</mt-datetime-picker>-->

            <!--class="inputdate"-->
            <!--<el-date-picker-->
            <!--@click.native="onBlur1($event)"-->
            <!--id="input"-->
            <!--v-model="value1"-->
            <!--format="yyyy-MM-dd"-->
            <!--default-value-->
            <!--type="date" placeholder="请选择" :picker-options="pickerOptions0"></el-date-picker>-->
          </span>
        </div>
        <div class="content">
          <span class="spa">客户来源</span>
          <!--因数据库只允许输入20个字符，所以限制maxlength长度为10-->
          <span>
          <!--<input type="text" v-model="sourceChannel" placeholder="请输入" maxlength=6 >-->
           <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入" :maxlength=6
                     v-model="sourceChannel">
           </el-input>
        </span>

        </div>
        <div class="content">
          <span class="spa">担保方式</span>
          <span>
          <!--<input type="text" v-model="guarantyStyle" placeholder="请输入" maxlength=500 >-->
           <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入" :maxlength=200
                     v-model="guarantyStyle">
           </el-input>
        </span>
        </div>
      </div>
      <div class="customer manage">
        <div class="content">
          <span class="spa">经营范围</span>
          <span>
          <!--<input type="text" v-model="businessScope" placeholder="请输入" maxlength=500 >-->
           <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入" :maxlength=200
                     v-model="businessScope" >
           </el-input>
        </span>
        </div>
        <div class="content">
          <span class="spa">经营地址</span>
          <span>
          <!--<input type="text" v-model="businessAddress" placeholder="请输入" maxlength=500 >-->
           <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入" :maxlength=200
                     v-model="businessAddress">
           </el-input>
        </span>
        </div>
      </div>
      <div class="customer idea">
        <div class="content">
          <span class="spa">跟进意见</span>
          <span>
           <select id="optionsselect" v-model="values"  placeholder="请选择"  dir="rtl" @change="optionscolor()">
             <option value="" >请选择</option>
             <option style="color:#222" v-for="item in option"  :value="item.values" >{{item.label}}</option>
           </select>
        </span>
        </div>
      </div>
      <div class="customer need">
        <div class="content">
          <span style="display: inline-block; width:180px; text-align: left">客户需求/营销反馈</span>
          <span>
          <!--<input type="text" v-model="customerRequired" placeholder="请输入" maxlength=500 >-->
          <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入" :maxlength=200
                    v-model="customerRequired" id="ceshi">
          </el-input>
        </span>
        </div>



      </div>
      <div class="empty"></div>
    </div>
    <el-table v-loading="loading2"  v-show="loading2" element-loading-text="正在提交" style="width: 100%;height: 6em;">
    </el-table>
    <div class="other_footer" v-show="isfooter">
      <button class="cancel" @click="open2" ><span>取消</span></button>
      <button class="keep"   @click="getNewsListData" :disabled="activeBtn"><span>保存</span></button>
    </div>

  </div>
</template>



<script type=text/ecmascript-6>

  // import { Toast } from 'src/index';
  import BackHeader from '@/components/header/back-header'
  import {getTestData} from '../../../service/getData'
  import  mui from '../../../style/js/mui.min.js'
  import { MessageBox } from 'mint-ui';

  export default {
    components: {
      BackHeader,

    },
    data () {
      return {
        title: '潜客录入',
        linkmanTel: '',
        identNo: '',
        options: [{
          value: '1',
          label: '对公'
        }, {
          value: '2',
          label: '零售'
        }],
        value:'',
//        startDate: new Date(new Date().getFullYear()+"-"+((new Date().getMonth()-0)+1)+"-"+new Date().getDate()),
        startDate: new Date('2018'),
        endDate: new Date('2118-2-22'),
        listData:[],
        F_CODE:'',
        custName: '',
        interestAmount:'',
        sourceChannel:'',
        guarantyStyle:'',
        businessScope:'',
        businessAddress:'',
        customerRequired:'',
        pickerShow: false,
        option: [{
          values: '1',
          label: '关注'
        }, {
          values: '2',
          label: '一般'
        },
          {
            values: '3',
            label: '不跟进'
          }],
        values:'',
        identity:this.cookies.get('identity'),
        loading2:false,
        flag:'',
        pickerOptions0: {
          disabledDate(time) {
            //console.log(time)
            if(time){
              return time.getTime() < Date.now() - 8.64e7;
            }else{
              return  Date.now();
            }

          }
        },
        value1:'请选择',
        fundDemandTime:'',
        test:true,
        editable:false,
        saveflag:false,
        pickershow:false,
        visible:false,
        isfooter:true,
        /*点击保存按钮之后，等接口走通之后，才可以再次点击*/
        activeBtn: false,
        currentDate:[],
      }

    },
    created(){
      //mui初始化
      mui.init({
        swipeBack: false //关闭右滑关闭功能
      });
    },
    watch:{
//        给意向金额 添加千位分隔符
      interestAmount:function(newVal,oldVal){
        console.log(newVal)
        if(newVal!=''&&newVal.replace(/[^\d]/g,'')){
          if(newVal.indexOf(",")!=-1){
            var tempValue = newVal.replace(/[\,]/g,'');
            this.interestAmount = parseFloat(tempValue).toLocaleString();
          }
          else{
            this.interestAmount = parseFloat(newVal).toLocaleString();
          }
        }
        else{
          this.interestAmount = "";
        }
      },


//      linkmanTel:function(newVal,oldVal){
//       console.log(newVal)
//        var newvalue=newVal.replace(/[^\d]/g,'')
//       this.linkmanTel= newvalue
//        console.log(this.linkmanTel)


//        if(newVal!=''&&newVal.replace(/[^\d]/g,'')){
////          alert("11")
//            this.linkmanTel = parseFloat(newVal).toLocaleString();
//        }
//        else{
//          this.linkmanTel=""
//        }
      //},
      deep:true,
      immediate:true
    },
    activated(){
      this.selectcolor()
      //        startDate: new Date(new Date().getFullYear()+"-"+((new Date().getMonth()-0)+1)+"-"+new Date().getDate()),

//      this.startDate=new Date(new Date().getFullYear()+"-"+((new Date().getMonth()-0)+1)+"-"+new Date().getDate()),

      this.visible=false
      this.loading2=false;
      this.datainit()
      this.pickerOptions0.disabledDate();

      this.activeBtn = false;
      this.currentDate = []

    },
    methods: {
      removeAttribute(){
        document.getElementById("customerdateid").removeAttribute("placeholder");
      },
//鼠标抬起截取前11位数字
      Telkeyup(){
        this.linkmanTel=this.linkmanTel.substring(0,11)
      },

      beforeDestroy() {
//        this.isfooter=true
        Indicator.close();
      },
      open(picker) {
//        this.isfooter=false
        this.$refs[picker].open();
      },

      handleChange(value) {
//        this.isfooter=true
        console.log(value)
        var d = new Date(value)
        var dd=d.getDate()<10?('0'+d.getDate()):d.getDate();
        var mm = (d.getMonth() + 1)<10?('0'+(d.getMonth() + 1)):(d.getMonth() + 1);
        this.value1=d.getFullYear() + '-' + mm + '-' + dd;

      },

      onBlur1(event){
        if(event.target.id=='input')
        {
          document.activeElement.blur();
          document.getElementById("input").blur();
        }
      },

      //          如果点击页面中的任何一个地方，不是日历插件，让日历插件隐藏
      onBlur2(event){
        if(event.target.id!='input') {
          this.visible=false
//          document.getElementsByClassName("el-picker-panel el-date-picker el-popper").addClass="DisNone";
        }
      },

      pickerclick(){
        this.pickershow=true
      },
      pickerhidden(){
        this.pickershow=false
      },

      //校验客户姓名
      onUser(){
//        alert(111)
        /*if((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(this.custName)) || (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(this.custName))){
         mui.alert("客户名称不能包含特殊字符,请您重填！",function(){})
         this.custName=''
         return false;
         }*/
        var reg1 = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
        var reg2 = /^[\u4E00-\u9FA5A-Za-z0-9]{1,30}$/

        if(this.custName == ''){
          mui.alert("亲，客户名称不能为空！")
        }else if(!reg1.test(this.custName)){
          mui.alert("客户名称不能包含特殊字符,请您重新填写！")
          this.custName=''
          return false;
        }else if(!reg2.test(this.custName)){
          mui.alert("客户名称不能超过30个字符,请您重新填写！")
          this.custName= ''
          return false;
        }

        /*if(!reg1.test(this.custName)){
         mui.alert("客户名称不能包含特殊字符,请您重新填写！")
         this.custName=''
         return false;
         }else if(!reg2.test(this.custName)){
         mui.alert("客户名称不能超过30个字符,请您重新填写！")
         this.custName= ''
         return false;
         }*/

      },
      Money(){
        if(this.interestAmount==0){
          this.interestAmount=""
        }
      },
      onShen(){
        if(this.F_CODE)
        {
          if(this.F_CODE == '010100'){
            //身份证验证
            if(!(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/).test(this.identNo) && !(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/).test(this.identNo) ){
              mui.alert("身份证号码有误,请重填！",function(){})
              this.test = true
              return false;
            }
          }
          else if(!(/^[0-9a-zA-Z]+$/g ).test(this.identNo)){
            mui.alert("证件号码只能包含数字和字母，请重新输入!",function(){})
            this.test = true
            this.identNo=""
            return false;
          }
//          else if(!(/[^\u4e00-\u9fa5]/g).test(this.identNo)){
//            alert("证件号码不能包含汉字，请再核对");
//            this.test = true
//            return false;
//          }

        }
      },


      //校验电话
      onBlur(){
//        if(this.linkmanTel.length!=0&&this.linkmanTel.length!=11){
//          mui.alert("请输入11位正确电话号码！",function(){})
//          this.linkmanTel=""
//        }
        console.log(this.linkmanTel)
        if(this.linkmanTel.length>0){
          var reg = /^((13[0-9])|(17[0-9])|(15[0-9])|(18[0-9]))\d{8}$/;
          if(!reg.test(this.linkmanTel)) {
            mui.alert("亲，请输入正确的电话号码哦！",function(){})
            this.linkmanTel=""
          }
        }


      },
      open2() {
        this.$confirm('是否放弃当前操作重新录入?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.datainit()
          /*如果是在客户模块--潜在客户--点击取消按钮--返回到上一页*/
          if(this.$route.query.flag == "clientQianzai"){
            this.$router.go(-1)
          }else if(this.$route.query.num == 3){
            this.$router.push('/main')
          }else{
            this.$router.go(-1)
          }
        }).catch(() => {
        });
      },

      gobackthere(){
        this.datainit()
      },
      datainit(){
        this.custName = '';
        this.linkmanTel = '';
        this.identNo = '';
        this.interestAmount = '';
        this.fundDemandTime = '';
        this.sourceChannel = '';
        this.businessScope = '';
        this.businessAddress = '';
        this.values = '';
        this.value = '';
        this.F_CODE = '';
        this.customerRequired = '';
        this.guarantyStyle = '';
        this.value1='请选择';
        this.test = true;
        this.selectcolor()
      },
//      写一个方法，让select 请选择 一上来就是灰色的
      selectcolor(){
        document.getElementById("customerdateid").setAttribute("placeholder"," 请选择");
//        客户类型
        document.getElementById("papersselsct").style.color = 'rgb(185,193,207)';
        document.getElementById("papersselsct").style.fontSize = '16px';
//        证件类型
        document.getElementById("F_CODEid").style.color = 'rgb(185,193,207)';
        document.getElementById("F_CODEid").style.fontSize = '16px';
//        关注
        document.getElementById("optionsselect").style.color = 'rgb(185,193,207)';
        document.getElementById("optionsselect").style.fontSize = '16px';



      },
//获取证件类型，选择对公或零售获取所对应得证件类型
      getPapers(val){
        document.getElementById("papersselsct").style.color = '#222';
        this.listData =[];
        this.F_CODE = '';
        this.identNo = '';
        if(val == null || val == ""){
          return false;
        }
        var url = "/CRMNewMobile/latentCustomer/showIdentType";
        this.$http.post(url,
          {
             "identity": this.cookies.get('identity'),
             "custType":val
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          this.res_1 = JSON.stringify(res)
          this.listData = res.body.ListData;
        }).catch((error)=>{
          console.log(error);
        })
      },
//      证件类型选择之后变黑色
      FCODEselect(val){
        document.getElementById("F_CODEid").style.color = '#222';
      },
//      跟进意见选择之后变成黑色
      optionscolor(){
        document.getElementById("optionsselect").style.color = '#222';
      },
// 保存时进行网络请求，提交客户信息
      getNewsListData(){



        if( this.value1=="NaN-NaN-NaN"){
          this.value1 = this.value1
        }
        if( this.value1=="请选择"){
          this.value1 = ""
        }
        if(this.value==''){
          mui.alert("请您先选择客户类型哦！", function () {
          })
          return false
        }

        if(this.linkmanTel.length>=0) {
          var reg = /^((13[0-9])|(17[0-9])|(15[0-9])|(18[0-9]))\d{8}$/;
          if (!reg.test(this.linkmanTel)) {
            mui.alert("不是正确的手机号码,请您重新填写！", function () {
            })
            this.linkmanTel = ""
            return false
          }
        }
        if(this.F_CODE)
        {
          if(this.F_CODE == '010100'){
            //身份证验证
            if(!(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/).test(this.identNo) && !(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/).test(this.identNo) ){
              mui.alert("您的身份证号码有误,请重填！",function(){})
              this.test = true
              return false;
            }
          }
          else if((/^\s*$/g ).test(this.identNo)) {
            mui.alert("证件号码为空，请您重新输入！",function(){})
//            alert("证件号码为空，请重新输入");
            this.test = true
            return false;
          }
          else if(!(/^[0-9a-zA-Z]*$/g ).test(this.identNo)){

            mui.alert("证件号码有误，请您再次核对！",function(){})
            this.identNo=""
//            alert("证件号码有误，请再核对");
            this.test = true
            return false;
          }
        }
//判断是哟否是从营销跳转过来的，如果路由带activity 那么 参数中要带id
        if(this.$route.query.custmer=="activity"){

          this.currentDate = [
            {
              "custName": this.custName,
//              手机号码
              "linkmanTel": this.linkmanTel,
//              身份证
              "identNo":this.identNo,

              "interestAmount":this.interestAmount,

              "fundDemandTime":this.value1,
              "sourceChannel":this.sourceChannel,
              "businessScope":this.businessScope,
              "businessAddress":this.businessAddress,
              "followOpinion":this.values,
              "custType":this.value,
              "identType":this.F_CODE,
              "customerRequired":this.customerRequired,
              "guarantyStyle":this.guarantyStyle,
              "marketingId":this.$store.state.marktingId
            }
          ]
        }else{

          this.currentDate = [ {
            "custName": this.custName,
//              手机号码
            "linkmanTel": this.linkmanTel,
//              身份证
            "identNo":this.identNo,

            "interestAmount":this.interestAmount,

            "fundDemandTime":this.value1,
            "sourceChannel":this.sourceChannel,
            "businessScope":this.businessScope,
            "businessAddress":this.businessAddress,
            "followOpinion":this.values,
            "custType":this.value,
            "identType":this.F_CODE,
            "customerRequired":this.customerRequired,
            "guarantyStyle":this.guarantyStyle
          }]
        }

        /*走接口时，按钮disabled为true*/
        this.activeBtn = true;

        var url= `/CRMNewMobile/latentCustomer/addAcrmFCiLatentCustomer`
        console.log(this.currentDate)
//           alert(this.value1)
        this.$http.post(url,
          {
              "identity":this.cookies.get('identity'),
              "data":JSON.stringify(this.currentDate)
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          this.loading2=false;
          if(res.body.success == true){

            mui.alert(res.body.msg,function(){});
            this.activeBtn = false;

            if(this.$route.query.num=="3"){
              this.$router.push('/main')
            }else if(this.$route.query.custmer=="activity"){
              this.guestReach()
            }else if(this.$route.query.flag == "clientQianzai"){
              this.$router.push('/clientQianZai')
            }else{
              this.$router.push('/job?date=date&flag=111')
            }

          }else{
            mui.alert(res.body.msg,function(){});
            this.test = true
            this.activeBtn = false;
          }
        }).catch((error)=>{
          mui.alert("数据添加失败")
          this.loading2=false;
          this.activeBtn = false;
        })
      },
      guestReach(){
        var url='/CRMNewMobile/marketing/guestReach'
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
            "guestId":1,
            "marktingId":this.$store.state.marktingId
          },
          {
            emulateJSON:true
          }
          ).then(
          res=>{
            this.$router.push("/moreActivity/moreQianKe?activity=custmer")
          },
          res=>{
//             alert("请将以上信息输入完整")
            mui.alert(res.body.msg, function() {});

          }
        )
      },

    },

  }
</script>

<style  lang="less" scoped>
  input[type=color], input[type=date], input[type=datetime-local], input[type=datetime], input[type=email], input[type=month], input[type=number], input[type=password], input[type=search], input[type=tel], input[type=text], input[type=time], input[type=url], input[type=week], select, textarea {
    text-align: center;
  }
  input{
    border: none !important;
    font-size:16px !important;
  }
  input[type="date"]:before{
    content: attr(placeholder);//强制给placeholder属性
    color:#aaa;// 这种灰色应该是最适合的
  }
  .date{
    /*width:100px;*/
    font-size:10px;
    padding: 0;
  }
  #papersselsct,#F_CODEid,#optionsselect{
    color:rgb(185,193,207);
    font-size: 16px;
  }
  /*设置字体大小*/
  .customer-input{
    font-size: 0.88rem;
  }
  .mint-button--default{
    background-color: #fff !important;
    box-shadow:none !important;
    font-size:0.88rem;
    color:#888888;
  }
  .mint-button--large {
    display: inline-block;
    text-align: right;
    color:rgb(185,193,207);
  }
  .DisNone{
    display: none;
  }
  select {
    direction: ltr;
  }

  .customer-input{
    width: 100%;
    height: 100%;
    background: #F6F8F8;
  }
  .spa{
    /*margin-left: .42rem;*/
  }
  .customer{
    margin-top: 0.55rem;
  }
  .red{
    color: red;
  }
  input[type=number] {
    width: 195px !important;
    border:none;
  }

  .content{
    display: flex;
    justify-content: space-between;
    /*padding: 5px 10px;*/
    padding-left: 0.8rem;
    font-size: 0.88rem;
    color:#555555;
    background: #fff;
    border-top: 1px solid #F6F8F8;
  }
  input[type=text]{
    width: 11em;
    border: none;
    outline: none;
    padding-left:0 !important;
    text-align: right;
  }
  input[type=tel]{
    width: 11em;
    border: none;
    outline: none;
    padding-left:0 !important;
    text-align: right;
  }

  .mui-btn{
    padding: 0 !important;
  }
  #qksr{
    padding-right: 0 !important;
    display: inline-block;
    /*background-color: red;*/
    width: 8rem;
  }
  .inputdate{
    width: 15em;
    border: none;
    outline: none;
  }
  .content span{
    display: inline-block;
    text-align: center;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .other_footer{
    position: relative;
    z-index: 888;
    width: 100%;
    height: 2.5rem;
    border-top: 1px solid #eb3723;
    line-height: 2.5rem;
    text-align: center;
    font-size:0px;
  }
  .other_footer .cancel,.other_footer .keep{
    display: block;
    float: left;
    border: 0px;
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 0rem;
    border-radius: 0 !important;
    font-size:1rem;
    font-family:PingFangSC-Regular;
    box-shadow: none !important;
  }
  .other_footer .cancel{
    color: #EB3723;
    background-color: #fff;
  }
  .other_footer .keep{
    color: #fff;
    background-color: #EB3723;
  }
  span input::-webkit-input-placeholder{
    color: rgba(136,136,136,1);
    font-size: 0.88rem;
    text-align:right;
  }
  .el-icon-date:before {
    content: "" !important;
  }
  .customer-input .el-input__inner{
    border: none !important;
  }
  .customer-input .el-select .el-input__inner{
    border: none !important;
  }
  .empty{
    height:2rem;
    content: "";
  }
  .el-select .el-input__inner{
    padding-right: 0 !important;
  }
  /*修改内容区padding-left*/
  .customer-input .content[data-v-55d2a981]{
    padding-left: 1.416rem;
  }
  .customer-input .content[data-v-55d2a981][data-v-55d2a981]{
    padding-left: 1.416rem;
  }
  .customer-input .customer .khmc{
    padding-left: 0.638rem !important;
  }
  .customer-input .customer .lxdh{
    padding-left: 0.638rem !important;
  }

  /*  !*设置背景颜色*!
  .customer-input{
    background-color: #fff;
  }*/
</style>
