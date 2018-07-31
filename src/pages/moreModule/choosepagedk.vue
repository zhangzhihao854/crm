<template>
  <div class="temp">
    <back-Header :title="title" ></back-Header>
    <div class="mui-input-row mui-search">
      <!--<span class="mui-icon mui-icon-search"> </span>-->
      <input type="search" class="mui-input-clear" placeholder="请输入贷款客户名称" v-model="custName" @keyup.enter="valuedk">
    </div>
    <el-table v-loading="loading2"  v-show="loading" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <ul>
      <li class="mui-input-row mui-checkbox mui-left" v-for="item in chooseListdata">
        <label>
          <input name="checkbox" class="checkipt" type="checkbox" >
          <img class='imges' src="../../../static/images/_s-icon_woman_pressed@3x.png">
          <span class="clientText" style="font-size: 17px !important;color:#222222 !important;"> &nbsp;{{item.custName}}</span>
        </label>
      </li>
    </ul>

    <button type="button" class="mui-btn mui-btn-danger mui-btn-block" @click="fsvalue">确定</button>

  </div>
</template>

<style scoped>
  .mui-input-row{
    width: 100%;
    height: 50px;
    /*line-height: 50px;*/
    vertical-align: middle;
  }
  .mui-input-row .checkipt{
    margin-top: 8px;
  }
  .mui-input-row .imges{
    width: 23px;
    height: 23px;
    margin-top: -5px;
    vertical-align: middle;
  }
  .mui-input-row .clientText{
    display: inline-block;
    width: 250px;
    padding-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mui-input-clear{
    background: #F6F8F8;
  }
  .temp .mui-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    margin-bottom: 0 !important;
  }
  /*.mui-btn-block{
    position:fixed;
    bottom: 0;
    margin-bottom: 0px !important;
    height: 44px;
    line-height: 44px;
    padding: 0 !important;
  }
  .mui-checkbox{
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
  .mui-checkbox input[type=checkbox]:before, .mui-radio input[type=radio]:before{
    font-size:26px !important;
    line-height:35px !important;
  }
  .imges{
    vertical-align: middle;
  }
  .mui-checkbox.mui-left label, .mui-radio.mui-left label{
    padding-left:50px !important;
    line-height: 20px;
  }
  .el-checkbox{
    width: 92%;
  }
  .mui-input-clear{
    background-color: rgb(246,248,248);
  }
  ul{
    margin-bottom: 50px;
  }*/
</style>

<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
  export default{
    components:{
      BackHeader,

    },
    data(){
      return {
        title: '贷款客户选择',
        custName:'',
        chooseListdata:[],
        chooseval:[],
        loading2:true,
        loading:true
      }
    },
    activated(){
      this.loading2=true
      this.loading=true
      this.custName=""
      this.chooseListdata=[]
      this.chooseval=[]
      this.$store.state.markingdkdata=[]
      this.valuedk()
    },
    methods:{
      valuedk(){
        var url='/CRMNewMobile/marketing/queryBcustomer'
        this.$http.post(url,
          {
            "identity": this.cookies.get('identity'),
            "custName": this.custName,
          },
          {
            emulateJSON:true
          }
        ).then(
          res=>{
            console.log(res);
            this.chooseListdata=res.body.ListData
            if(res.body.ListData.length==0){
              this.loading2=false
              this.loading=true
            }else{
              this.loading2=false
              this.loading=false
            }
          },
          res=>{
            console.log('messages出错')

          }
        )
      },
      fsvalue(){
        this.getCheckBoxRes("checkipt")
        this.$store.state.markingdkdata=this.chooseval
        this.$router.push("moreLoansDetail")

      },
      /*选中添加群成员*/
      getCheckBoxRes(className){
        var rdsObj   = document.getElementsByClassName(className);
        this.chooseval=[]
        console.log(rdsObj.length);

        for(var i = 0; i < rdsObj.length; i++){

          if(rdsObj[i].checked==true){
            console.log(i)
            var obj=new Object()
            obj.custName=this.chooseListdata[i].custName
            obj.custId=this.chooseListdata[i].custId
            obj.id=this.chooseListdata[i].id
            obj.index=i
            obj.lsh=i+11
            this.chooseval.push(obj)

            console.log(this.chooseval);
//                rdsObj[i].parentNode.parentNode.parentNode.style.display="none"

          }
        }
        console.log(this.chooseval)
        return this.chooseval;
      }
    }
  }
</script>
