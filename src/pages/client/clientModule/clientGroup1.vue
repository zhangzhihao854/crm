<template>
  <div class="page2">
    <backHeader></backHeader>
    <div class="split"></div>
    <div class="newGroup">
      <div class="newtitle">
        <span class="newTit">群组名称</span>
        <span class="showTit">
             <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入"
                       v-model="custBaseName">
             </el-input>
          </span>
        <!--<span class="showTit">请输入</span>-->
        <!--<span class="shuxian">|</span>-->
      </div>
      <div class="split1"></div>
      <div class="newtype">
        <span class="newTit1">群组类型</span>
        <span class="showTit1">
             <el-select v-model="value" placeholder="请选择" @change="getqueryGroupType(value)" >
               <el-option v-for="item in typeoptions" :key="item.id" :label="item.fValue" :value="item.fCode" >{{item.fValue}}</el-option>
             </el-select>
          </span>

      </div>
    </div>

    <!--<el-button class="footer" @click.native="addGroup" :loading="addGrouploading">保存</el-button>-->
    <div class="footer" @click="addGroup" :loading="addGrouploading">保存</div>
  </div>
</template>
<script type=text/ecmascript-6>
  import backHeader from '../../../components/header/back-title-header.vue'
  import  mui from '../../../style/js/mui.min.js'
  import myBus from '../../../components/tools/myBus'
  export default{
      data(){
          return{
            custBaseName: '',
            value: [],
            typeoptions:[],

            /*客户群管理分页数据*/
            flag: 'a',
            count_a: 1,
            next_a: 2,
            prev_a:1,
            pageCount_a: 1,
            addGrouploading:false,
            addGroupflag:"",
            /*群组类型*/
            groupType:'',
          }
      },
      activated(){
        //      下拉框获取类型
        this.getqueryGroupType()
        this.custBaseName = ''
        this.value = ''
        this.addGroupflag = ''
        this.addGrouploading=false
        this.groupType = ''

      },
      methods: {
        //    获取客户群组类型
        getqueryGroupType(){
          var url='/CRMNewMobile/group/queryGroupType'
          this.$http.post(url,
            {
            "identity":this.cookies.get('identity')
            },
            {
              emulateJSON:true
            }
          ).then(
            res=>{
              this.typeoptions=res.body.ListData
            },
            res=>{
              console.log('messages出错')
            }
          )
        },

        //    添加客户群组
        addGroup(){
          this.addGrouploading=true
          /*判断用户输入内容是否为空*/
          if(this.custBaseName == ''){
            mui.alert('亲，请输入群组名称哦！')
            return false
          }
          if( this.value == ''){
            mui.alert('亲，请选择群组类型哦！')
            return false
          }
          if( this.addGroupflag=="abc"){
            console.log("重复点击了")
            return false

          }
          this.addGroupflag="abc"

          var url='/CRMNewMobile/group/addGroup'
          this.$http.post(url,
            {
              "identity":this.cookies.get('identity'),
              "custBaseName":this.custBaseName,
             /* "groupMemberType":this.value==3291943767?2:1*/
              "groupMemberType":this.value,
            },
            {
              emulateJSON:true
            }
          ).then(
            res=>{
              this.addGrouploading=false
              this.getqueryGroupList()
              this.$router.push('/clientUsersManage')
              this.$message({
                showClose: true,
                message: '新群组添加成功',
                type: 'success',
                duration: 1000
              });
            },
            res=>{
              this.addGrouploading=false
              console.log('messages出错')
              this.$router.push('/clientUsersManage')
              this.$message({
                showClose: true,
                message: '新群组添加失败',
                type: 'warning',
                duration: 1000
              });

            }
          )
        },
        //    查询客户群组列表
        getqueryGroupList(){
          this.loading2=true

          var url='/CRMNewMobile/group/queryGroupList'
          this.$http.post(url,
            {
             "identity":this.cookies.get('identity'),
              "pageNum": this.count_a
           },
            {
              emulateJSON:true
            }
          ).then(
            res=>{
              this.flag = 'a'
              this.next_a = res.body.data.next
              this.prev_a = res.body.data.prev
              this.pageCount_a = res.body.data.pageCount

              this.listdata=res.body.data.data
              this.loading2=false

            },
            res=>{
              console.log('messages出错')
            }
          )
        },

      },
      components: {
        backHeader,
      }
  }

</script>
<style lang="scss" scoped>
  /*// 设置第二个页面的样式*/
  .page2 .split{
    width: 100%;
    height: 0.83rem;
    background: #F8F9FB;
  }
  .page2 .newGroup{
    position: relative;
    width: 100%;
    background:rgba(255,255,255,1);
    line-height: 2.44rem;
  }
  .page2 .newtitle{
    width: 100%;
    height: 2.44rem;
  }
  .page2 .newtitle .newTit{
    position: absolute;
    left: 0.805rem;
    width:4rem;
    height:0.88rem;
    font-size:0.94rem;
    font-family:PingFangSC-Regular;
    color:rgba(34,34,34,1);
    /*line-height:60px;*/
  }
  .page2 .newtitle .showTit{
    position: absolute;
    right: 0.5rem;
    width:6rem;
    height:0.88rem;
    font-size:0.94rem;
    font-family:PingFangSC-Regular;
    color:rgba(136,136,136,1);
  }

  .page2 .newtitle .shuxian{
    position: absolute;
    right: 1.08rem;
    width:0.05rem;
    height:1.33rem;
    color:rgba(229,229,229,1);
  }
  .page2 .newtype{
    width: 100%;
    height: 2.44rem;
  }
  .page2 .newtype .newTit1{
    position: absolute;
    left: 0.805rem;
    width:4rem;
    height:0.88rem;
    font-size:0.94rem;
    font-family:PingFangSC-Regular;
    color:rgba(34,34,34,1);
    /*line-height:60px;*/
  }
  .page2 .newtype .showTit1{
    position: absolute;
    right:0.5rem;
    width:6rem;
    height:0.88rem;
    font-size:0.94rem;
    font-family:PingFangSC-Regular;
    color:rgba(136,136,136,1);
  }
  .page2 .newtype .shuxian1{
    position: absolute;
    right: 1.08rem;
    width:0.05rem;
    height:1.33rem;
    color:rgba(229,229,229,1);
  }
  .page2 .newGroup .split1{
    width: 100%;
    height: 0.55rem;
    background: #F8F9FB;
  }

  .footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height:2.77rem;
    text-align: center;
    line-height:2.77rem;
    background:rgba(242,48,48,1);
    font-size:0.88rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
  }
</style>
