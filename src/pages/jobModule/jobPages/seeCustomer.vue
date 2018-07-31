<template>
    <div class="customer-input" id="Seecustomer" style="background-color: #fff;" @click="onBlur2($event)">
      <div>
        <!--<back-header :title="data.CUSTNAME" :flag="flag"></back-header>-->
        <back-header :title="data.CUSTNAME" :flag="flag"></back-header>
        <span class="editor" @click="editor()" v-show="showeditor">编辑</span>
      </div>

      <!--添加loading-->
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>

      <div  id="cstcontent" v-show="divshow">

        <!--客户名称-->
        <div class="promiddlebig">
          <div class="productName promiddle">
            <span class="productTitle">客户名称:</span>
            <span class="productWrite" v-show="oldshow" style="color: #888888;">{{data.CUSTNAME}}</span>
            <span v-show="btnshow" class="btnshow">
                <input type="text"  v-model="textArea1"  @blur="onUser" placeholder="请输入..." />
             </span>
          </div>
        </div>

        <!--不可修改的四个类型-->
        <div class="promiddlebig" >
          <div class="productName">
            <span class="productTitle">客户类型:</span>
            <span class="productWrite" style="color: #888888;">{{data.CUSTTYPEVALUE}}</span>
          </div>
          <div class="productName">
            <span class="productTitle">证件类型:</span>
            <span class="productWrite"  style="color: #888888;">{{data.IDENTTYPEVALUE}}</span>
          </div>
          <div class="productName">
            <span class="productTitle">证件号码:</span>
            <span class="productWrite"  style="color: #888888;">{{data.IDENTNO}}</span>
          </div>
          <div class="productName">
            <span class="productTitle">联系电话:</span>
            <span class="productWrite" style="color: #888888;">{{data.LINKMANTEL}}</span>
          </div>
        </div>
       <!--意向金额、资金需求时间-->
        <div class="promiddlebig">
          <div class="productName promiddle">
            <span class="productTitle">意向金额:</span>
            <span class="productWrite" v-show="oldshow" style="color: #888888;" >{{data.INTERESTAMOUNT}}元</span>
             <span v-show="btnshow"  class="btnshow">
              <input  type="text" id="textAreaId"  v-model="textAreaOUNT" placeholder="请输入..."/>
             </span>
          </div>
          <div class="productName promiddle">
            <span class="productTitle">资金需求时间:</span>
            <span class="productWrite" v-show="oldshow" style="color: #888888;" >{{data.FUNDDEMANDTIME}}</span>
             <span v-show="btnshow"  style="width: 100px !important;">
                <input type="date"  v-model="value1" class="date"  placeholder="请选择" @focus=removeAttribute() id="customerdateid">

               <!--<mt-button @click.native="open('picker2')" size="large" v-model="value1">{{value1}}</mt-button>-->
      <!--<mt-datetime-picker-->
        <!--ref="picker2"-->
        <!--type="date"-->
        <!--@confirm="handleChange">-->
      <!--</mt-datetime-picker>-->
       </span>
          </div>
        </div>

        <!--客户来源、担保方式-->

        <div class="promiddlebig">
          <div class="productName promiddle">
            <span class="productTitle">客户来源:</span>
            <span class="productWrite" v-show="oldshow" style="color: #888888;">{{data.SOURCECHANNEL}}</span>
            <span v-show="btnshow"     @keyup="khfrom(textAreaNEL)">
              <!--<input  v-model="textAreaNEL"  placeholder="请输入..." type="text"  maxlength=6>-->
               <el-input
                 type="textarea"
                 :autosize="{ minRows: 1, maxRows: 1}"
                 placeholder="请输入内容"
                 maxlength='6'
                 v-model="textAreaNEL"
               >
               </el-input>
             </span>
          </div>
          <div class="productName promiddle">
            <span class="productTitle">担保方式:</span>
            <span class="productWrite" v-show="oldshow" style="color: #888888;">{{data.GUARANTYSTYLE}}</span>
            <span v-show="btnshow" >
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 2}"
                placeholder="请输入内容"
                v-model="textAreaYLE">
              </el-input>
               <!--<input  v-model="textAreaYLE"  placeholder="请输入..." type="text" />-->
             </span>
          </div>
        </div>

       <!--经营范围、经营地址-->
        <div class="promiddlebig">
          <div class="productName promiddle">
            <span class="productTitle">经营范围:</span>
            <span class="productWrite" v-show="oldshow" style="color: #888888;">{{data.BUSINESSSCOPE}}</span>
            <span v-show="btnshow" >
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 2}"
                placeholder="请输入内容"
                v-model="textAreaOPE">
              </el-input>
                <!--<input v-model="textAreaOPE"  placeholder="请输入..." type="text" />-->
             </span>
          </div>
          <div class="productName promiddle">
            <span class="productTitle">经营地址:</span>
            <span class="productWrite" v-show="oldshow" style="color: #888888;">{{data.BUSINESSADDRESS}}</span>
            <span v-show="btnshow" >
               <el-input
                 type="textarea"
                 :autosize="{ minRows: 1, maxRows: 2}"
                 placeholder="请输入内容"
                 v-model="address">
               </el-input>
                <!--<input v-model="address" placeholder="请输入..." type="text">-->
             </span>
          </div>
        </div>

        <!--跟进意见、营销反馈-->
        <div class="promiddlebig">
          <div class="productName promiddle">
            <span class="productTitle">跟进意见:</span>

            <select id="optionsselect" @change="optionscolor()"  v-model="values" placeholder="请选择" :disabled="disabled" dir="rtl" style="color:rgb(185,193,207)!important; font-size: 0.88rem;">
              <option value="" disabled>请选择</option>
              <option style="color:#222" v-for="item in option"  :value="item.values" >{{item.label}}</option>
            </select>
          </div>
          <div class="productName promiddle">
            <span class="productTitle">客户需求/营销反馈:</span>
            <span class="productWrite" v-show="oldshow" style="color: #888888;">{{data.CUSTOMERREQUIRED}}</span>
            <span  v-show="btnshow" >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 5}"
                  placeholder="请输入内容"
                  v-model="textAreaESC">
                </el-input>
             </span>
          </div>
        </div>

      </div>


      <div class="other_footer" v-show="btnshow">
       <!-- <div class="cancel" @click="openConfirm"><span style="color: #EB3723;">取消</span></div>
        <div class="keep" :class="{ 'on_choose': loading2 }"  @click="getNewsListData">
          <span style="color: #fff;">保存</span>
        </div>-->

        <div class="cancel" @click="openConfirm"><span style="color: #EB3723;">取消</span></div>
        <div class="keep"   @click="getNewsListData">
          <span style="color: #fff;">保存</span>
        </div>
      </div>


    </div>
</template>

<script type="text/ecmascript-6">
    //import BackHeader from '@/components/header/back-header'
    import  BackHeader from '@/components/header/back-title1-header'
    import {getTestData} from '../../../service/getData'
    import  mui from '../../../style/js/mui.min.js'

    export default {
        components: {
            BackHeader
        },
        data () {
            return {
                title:'',
                data:{},
              loading2:true,
              divshow:false,
              tempData:{},
              btnshow:false,
              oldshow:true,
              disabled:true,
              address:"",
//              客户姓名
              textArea1:'',
//              意向金额
              textAreaOUNT:'',
//              客户来源
              textAreaNEL:'',
//担保方式
              textAreaYLE:'',
//              经营范围
              textAreaOPE:'',
//              需求反馈
              textAreaESC:'',


                flag:'2',
              options: [{
                value: '1',
                label: '对公'
              }, {
                value: '2',
                label: '零售'
              }],
              F_CODE:"",
              listData:[],
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
              values:"1",
              value1:'请选择',
              pickerOptions0: {
                disabledDate(time) {
                  return time.getTime() < Date.now() - 8.64e7;
                }
              },
              fundDemandTime:'',
              test:true,
              custId:"",
              showeditor:true,

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
          textAreaOUNT:function(newVal,oldVal){
            console.log(newVal)
            if(newVal!=''&&newVal.replace(/[^\d]/g,'')){
              if(newVal.indexOf(",")!=-1){
                var tempValue = newVal.replace(/[\,]/g,'');
                this.textAreaOUNT = parseFloat(tempValue).toLocaleString();
              }
              else{
                this.textAreaOUNT = parseFloat(newVal).toLocaleString();
              }
            }
            else{
              this.textAreaOUNT = "";
//              mui.toast('请输入正确的金额');
            }
          },
          textAreaNEL:function(newVal,oldVal){
            console.log(newVal);


          },

        deep:true,
        immediate:true


      },
        activated(){
          document.getElementById("app").scrollTop=0;
          //window.scrollTo(0,0)
          this.disabled=true

//          如果是从客户的潜在客户来的，需要判断是否有编辑功能
          if(this.$route.query.clintflag=="clientflag"){
            this.showeditor=false
            this.isBrokerPower()
          }else{
            this.showeditor=true
          }

        this.flag=this.$route.query.flag
          this.aaa=this.$route.query.aaa
          if(this.aaa == 1){
            this.showeditor=false
          }

        console.log("flag-------------"+this.flag);
//        如果是目标达成页面 传来的 flag是10 ，编辑按钮取消 只有查看功能
        if(this.flag=="10"){
          this.showeditor=false
        }
        this.data={}
        this.datainit()
//        this.pickerOptions0.disabledDate()
        this.btnshow=false;
        this.oldshow=true;
        this.initData()
        //进入页面发送请求 获取潜客具体信息
//            this.id = this.$route.query.id
        if(this.id==undefined){

          this.getPapers(this.zid)
        }else{

          this.getPapers(this.id)
        }
          if(this.$route.query.flag=="moreQianBox"){
            this.showeditor=false
          }
      },

        methods:{
          khfrom(newVal){
            if(newVal!=''&&newVal.length>5){
              mui.toast('客户来源只能输入6位');
            }
          },

          removeAttribute(){
            document.getElementById("customerdateid").removeAttribute("placeholder");
          },
          optionscolor(){
            document.getElementById("optionsselect").style.color = '#222';
          },
          //      写一个方法，让select 请选择 一上来就是灰色的
          selectcolor(){
            document.getElementById("customerdateid").setAttribute("placeholder"," 请选择");

//        关注
            document.getElementById("optionsselect").style.color = 'rgb(185,193,207)';
            document.getElementById("optionsselect").style.fontSize = '16px';



          },
//          潜在客户来的判断是否有编辑功能
          isBrokerPower(){
            var url= `/CRMNewMobile/broker/isBrokerPower`
            this.$http.post(url,
              { "identity":this.cookies.get('identity'),
                "custId":this.$route.query.id
              },
              {
                emulateJSON:true
              }
            ).then(
              res => {
               if(res.body.msg=="true"){
                 this.showeditor=true
               }else{
                 this.showeditor=false
               }
              },
              res => {
                console.log(res)
              }
            )
          },

          open(picker) {
            this.$refs[picker].open();
          },

          handleChange(value) {

            console.log(value)
            var d = new Date(value)
            var dd=d.getDate()<10?('0'+d.getDate()):d.getDate();
            var mm = (d.getMonth() + 1)<10?('0'+(d.getMonth() + 1)):(d.getMonth() + 1);
            this.value1=d.getFullYear() + '-' + mm + '-' + dd;
//            this.data.FUNDDEMANDTIME=time
          },


          onBlur1(event){
            if(event.target.id=='input') {
              document.activeElement.blur();
              document.getElementById("input").blur();
            }
          },
//          如果点击页面中的任何一个地方，不是日历插件，让日历插件隐藏
          onBlur2(event){
            if(event.target.id!='input') {

            }
          },
          //校验客户姓名
          onUser(){
            if((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(this.textArea1)) || (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(this.textArea1))){
              mui.alert("客户名称不能包含特殊字符,请您重填！",function(){})
              this.textArea1=''
              return false;
            }
          },
//          点击取消 弹出的弹框
          openConfirm() {
            this.$confirm('是否撤销本次录入,重新编辑?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              this.address = this.data.BUSINESSADDRESS;
              this.textArea1 = this.data.CUSTNAME;
              this.textAreaOUNT = this.data.INTERESTAMOUNT;
              this.textAreaNEL = this.data.SOURCECHANNEL;
              this.textAreaYLE = this.data.GUARANTYSTYLE;
              this.textAreaOPE = this.data.BUSINESSSCOPE;
              this.textAreaESC = this.data.CUSTOMERREQUIRED;
              this.values=this.data.FOLLOWOPINION;



              //$("#textareaId").val(this.address);
              this.editor()
              /*this.editor()*/
            }).catch(() => {
            });
          },
          thousandBitSeparator(num) {
            var source = toNum(num).split(".");
            source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");
            return source.join(".");
          },
 //       让页面数据初始化
          datainit(){
            this.custName = ''
            this.linkmanTel = ''
            this.identNo = ''
            this.interestAmount = ''
            this.fundDemandTime = ''
            this.sourceChannel = ''
            this.businessScope = ''
            this.businessAddress = ''
            this.values = ''
            this.value = ''
            this.F_CODE = ''
            this.customerRequired = ''
            this.guarantyStyle = ''
            this.test = true
            this.selectcolor()
          },
//          获取url数据初始化
          initData() {
            this.id=this.$route.query.id
            this.zid=this.$route.query.custId;
          },
//          点击编辑按钮
          editor(){
            this.value1=this.data.FUNDDEMANDTIME
            this.value=this.data.FOLLOWOPINION
/*新增*/
            this.values=this.data.FOLLOWOPINION
            console.log(this.value1)
            if(this.value1==undefined){
              this.value1="请选择..."
            }
            if(this.value==undefined){
              this.value="请选择..."
            }
            /*新增*/
            if(this.values == undefined){
              this.values = "请选择"
            }

            this.btnshow=!this.btnshow;
            this.oldshow=!this.oldshow;
            this.disabled=!this.disabled;
            /*if(this.disabled == false){
              this.values == this.options[0].lable
            }*/
            /*if(this.values == undefined && this.disabled == false){
              this.values == '请选择'
            }*/
          },
//          获取潜客信息 ，渲染页面
            getPapers(id){
//                this.currentDate = id;
                var url= `/CRMNewMobile/latentCustomer/selectAcrmFCiLatentCustomerByCustId`
               // this.currentDate = {"custId":id}
                console.log(this.currentDate)
                this.$http.post(url,
                        {
                            "identity":this.cookies.get('identity'),
                            "custId":id
                        },
                  {
                    emulateJSON:true
                  }
                ).then(res => {
                    console.log(res);
                  this.loading2=false
                  this.divshow=true
                    this.data = res.body.data;
                  this.address = this.data.BUSINESSADDRESS;
                  this.textArea1 = this.data.CUSTNAME;
                  this.textAreaOUNT = this.data.INTERESTAMOUNT;
                  this.textAreaNEL = this.data.SOURCECHANNEL;
                  this.textAreaYLE = this.data.GUARANTYSTYLE;
                  this.textAreaOPE = this.data.BUSINESSSCOPE;
                  this.textAreaESC = this.data.CUSTOMERREQUIRED;
                    //$("#textareaId").val(this.address);
                    //this.tempData = res.body.data;
                  /*新增*/
                    this.values=this.data.FOLLOWOPINION;


                  console.log(this.values + 'hahahh')
                  console.log(this.data)
//                  this.custId=this.data.CUSTID

            }).catch((error)=>{
                    console.log(error);
            })
            },
          //获取证件类型，选择对公或零售获取所对应得证件类型
          getPapersnew(val){

            if(val == null || val == ""){
              return false;
            }
            var url = "latentCustomer/showIdentType";
            var params = {"requestJson":{"custType":val}};

            getTestData('GET', url, params).then((res) => {
              if(res) {
                this.res_1 = JSON.stringify(res)
                console.log(this.res_1)
                this.listData = res.ListData
                console.log(this.listData)
              }
            }).catch((error) => {
              console.log(error);
            })
          },

         //提交更改之后的数据
          getNewsListData(){
//            console.log("kkk");
//            var d = new Date(this.value1)
//            console.log(this.values);
//            this.fundDemandTime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            if( this.value1=="NaN-NaN-NaN"){
              this.value1 = this.value1
            }
            if( this.value1=="请选择..."){
              this.value1 = ""
            }

            var url= `/CRMNewMobile/latentCustomer/updateAcrmFCiLatentCustomer`
            /*this.currentDate = {

              "custName": this.textArea1,
//              手机号码
              "linkmanTel": this.data.LINKMANTEL,
//              证件号码
              "identNo":this.data.IDENTNO,

              "interestAmount":this.textAreaOUNT,

              "fundDemandTime":this.value1,
              "sourceChannel":this.textAreaNEL,
              "businessScope":this.textAreaOPE,
              "businessAddress":this.address,

              "followOpinion":this.values==""?this.data.FOLLOWOPINIONDESC:this.values,
//              "followOpinion":this.values,
//              客户类型
              "custType":this.data.CUSTTYPEVALUE,
//              证件类型
              "identType":this.data.IDENTTYPEVALUE,
              "customerRequired":this.textAreaESC,
              "guarantyStyle":this.textAreaYLE,
              "custId":this.data.CUSTID
            }*/
            console.log(this.currentDate)
            console.log(this.value1)
            console.log("cccccccccccccccc"+this.custId)
            this.$http.post(url,
              {
                  "identity":this.cookies.get('identity'),

                "custName": this.textArea1,
//              手机号码
                "linkmanTel": this.data.LINKMANTEL== undefined?'':this.data.LINKMANTEL,
//              证件号码
                "identNo":this.data.IDENTNO == undefined?'':this.data.IDENTNO,

                "interestAmount":this.textAreaOUNT == undefined?'':this.textAreaOUNT,

                "fundDemandTime":this.value1  ==  undefined?'':this.value1,
                "sourceChannel":this.textAreaNEL == undefined?'':this.textAreaNEL,
                "businessScope":this.textAreaOPE == undefined?'':this.textAreaOPE,
                "businessAddress":this.address == undefined?'':this.address,

                "followOpinion":this.values==""?this.data.FOLLOWOPINIONDESC:this.values,
//              "followOpinion":this.values,
//              客户类型
                "custType":this.data.CUSTTYPEVALUE,
//              证件类型
                "identType":this.data.IDENTTYPEVALUE == undefined?'': this.data.IDENTTYPEVALUE ,
                "customerRequired":this.textAreaESC == undefined?'': this.textAreaESC,
                "guarantyStyle":this.textAreaYLE == undefined?'': this.textAreaYLE,
                "custId":this.data.CUSTID
              },
              {
                emulateJSON:true
              }
            ).then(res => {
            /*  if(res.body.success == true){

                mui.alert(res.body.msg,function(){});
                this.$router.push('/job?num=3')
              }else{
                mui.alert(res.body.msg,function(){});
                this.test = true
              }*/

                if(this.$route.query.clintflag == "clientflag"){

               mui.alert(res.body.msg,function(){});
                  this.$router.push('/clientQianZai')
               }else{
               mui.alert(res.body.msg,function(){});
                  this.$router.push('/job?num=3')
               this.test = true
               }
            }).catch((error)=>{
              console.log(error);
            })
          }
        },
    }

</script>
<style lang="stylus" scoped>

  .mint-button--default{
    background-color: #fff !important;
    box-shadow:none !important;
    font-size:16px;
    color:#888888;
    display: inline-block;
  }

  #papersselsct,#F_CODEid,#optionsselect{
    color:rgb(185,193,207);
    font-size: 16px;
  }
  .DisNone{
    display: none;
  }
  .promiddlebig{
    padding-left: 10px;
    padding-right:20px;
    margin-top:10px;
    margin-bottom:0.5rem;
    background-color: #fff;
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: 5px solid rgb(248,249,251);
  }
  .promiddlebig select{
    width: 67%;
  }

  .productTitle {
    color: #222222 !important;
    font-family: 'PingFang SC';
    line-height: 40px;
    font-size: 16px;
  }

  .productWrite {
    padding-left:20px;
    color: #888888 !important;
    font-family: 'PingFang SC';
    line-height: 40px;
    font-size: 16px;
  }

  .productName {
    padding-left: 0.9rem;
    background-color: #fff;
    width: 100%;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;

  }
  .leftCt{
     display: inline-block;
     text-align: left !important;
     height: 40px;
     line-height: 40px;
     width: 100px;
     color: #808080 !important;
   }
  .leftClong{
    display: inline-block;
    /*height: 40px !important;*/
    width: 200px !important;
    text-align: left !important;
    line-height: 40px;
  }
  .oldshowellipsis{
    width: 14rem;
    display: inline-block;
    overflow:hidden ;
    text-align: left;
    /*white-space: nowrap;*/
    text-overflow :ellipsis

  }
  .btnshow{
    display: inline-block;
    width:240px;
    /*border: 1px solid #e5e5e5 !important;*/
    text-align: left !important;
    color:#000!important;
  }
  .longinput{
    /*height: 80px !important;*/
  }
textarea{
  color:#e5e5e5;
}
  .editor{
    position:fixed;
    right: 1rem;
    top:10px;
    z-index: 2008;
    color:rgb(235,55,35)
  }
  #cstcontent{
    margin-bottom: 3rem;
  }
  textarea{
    color:#000000;
  }
    .customer-input{
        width: 100%;
        height: 100%;
        background: #F6F8F8;
    }
    .customer{
        margin-top: 20px;
    }
    .content{
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        font-size: 0.9rem;
        color: #808080;
        background: #fff;
        border-top: 1px solid #E5E5E5;

    }
    input[type=text]{
        padding:0;
    }
    input[type=tel]{
        padding:0;
    }
    .content span{
        display: inline-block;
        text-align: center;
        line-height: 40px;
    }
    span input::-webkit-input-placeholder{
        /*text-align:right;*/
    }
    .mint-button--large{
      width: 65%;
      text-align: right;
      font-size: 17px;
    }

    span input{
        border: none;
        outline: none;
      /*text-align: right;*/
    }

  .other_footer{
    /*position: relative;
    z-index: 88;*/
    width: 100%;
    height: 2.16rem;
    border-top: 1px solid #EB3723;
  }

  .other_footer .cancel,.other_footer .keep{
    float:left;
    width:50%;
    height:100%;
    line-height:2.16rem;
    text-align:center;
  }
  .other_footer .cancel{
    color: #EB3723;
    background-color: #fff;
  }
  .other_footer .keep{
    height: 2.16rem;
    color: #fff;
    background-color: #EB3723;
  }
</style>
