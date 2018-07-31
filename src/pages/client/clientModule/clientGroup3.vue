<template>
  <div class="addUser">
    <addUserHead  @showShaiXuan="showShaiXuan"></addUserHead>
    <div class="split2"></div>
    <el-table v-loading="loading3"  v-show="loading" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <div :style="{height:divHeight+'px'}" ref="nav">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :auto-fill="isAutoFill" ref="loadmore"
                   :top-method="loadTop" :top-all-loaded="allLoaded" @top-status-change="handleBottomChange"
      >
        <div class="addList" v-for="(person,index) in groupList">
          <div class="user1">
            <input ref="disabledInput" name="checkbox" type="checkbox" class="icon3 kipchecked" :value="{'identity':this.identity,'custZhName':person.custName,'custId':person.custId,'custBaseId':this.groupId} ">
            <img  class="headImage" src="../../../../static/images/_s-icon_man_pressed@2x.png" alt="男生头像">
            <span class="name1" v-if="this.groupMemberType == '对公群组',this.SXflag = 1">{{person.personalName}}</span>
            <!--<span class="name1" v-if="this.typeFlag = 1,this.SXflag = 2">{{person.personalName}}</span>-->
            <span class="name1" v-if="this.groupMemberType == '零售群组',this.SXflag = 1">{{person.custName}}</span>
            <!--<span class="name1" v-if="this.typeFlag = 2,this.SXflag = 2">{{person.custName}}</span>-->
          </div>
        </div>
      </mt-loadmore>
    </div>
    <!--添加遮罩层-->
    <div class="mark" v-show="showThis"></div>
    <div class="infoWrap" v-show="showThis">
      <div>
        <div class="userInfo">
          <button class="btn1">客户名称</button>
          <el-input class="khmc" v-model="ScustName" ></el-input>
          <!--<input class="khmc" type="text" v-model="ScustName">-->
        </div>
        <div class="userInfo">
          <button class="btn1">资产规模</button>
          <!--<input type="text" class="first" v-model="amount1">-->
          <el-input class="first" v-model="amount1"></el-input>
          <span class="tit1">至</span>
          <!--<input type="text" class="last" v-model="amount2">-->
          <el-input class="last" v-model="amount2"></el-input>
          <span class="tit2">万元</span>
        </div>
        <div class="userInfo">
          <button class="btn1">存款日均</button>
          <!--<input type="text" class="first" v-model="depositeAvgY1">-->
          <el-input class="first" v-model="depositeAvgY1"></el-input>
          <span class="tit1">至</span>
          <!--<input type="text" class="last" v-model="depositeAvgY2">-->
          <el-input class="last" v-model="depositeAvgY2"></el-input>
          <span class="tit2">万元</span>
        </div>
        <div class="userInfo">
          <button class="btn1">贷款余额</button>
          <!--<input type="text" class="first" v-model="curAcBl1">-->
          <el-input class="first" v-model="curAcBl1"></el-input>
          <span class="tit1">至</span>
          <!--<input type="text" class="last" v-model="curAcBl2">-->
          <el-input class="last" v-model="curAcBl2"></el-input>
          <span class="tit2">万元</span>
        </div>
        <div class="empty"></div>
        <div class="btnWrap">
          <div class="reset" @click="Sempty">重置</div>
          <div class="confirm" @click="Yesshaixuan">确认</div>
        </div>
      </div>
    </div>
    <footer class="db">
      <div class="qx" @click="cancleChecked">取消</div>
      <div class="tj" @click="addMember">添加</div>
    </footer>
  </div>
</template>
<script type=text/ecmascript-6>
  import addUserHead from '../../../components/header/add-user-header.vue'
  import  mui from '../../../style/js/mui.min.js'
  import myBus from '../../../components/tools/myBus'
  export default{
    data(){
      return{
        showThis: false,
        groupList: [],
        groupMemberType: '',
        /*   typeFlag: '',*/
        addPerson: [],
        custBaseId:'',
        /*        custId:'',*/
        custZhName: '',
        identity:'',
        val: [],
        addmsg:'',
        loading3: true,
        loading: true,
        groupId: '',
//        筛选方面的
        ScustName:'',
        amount1:'',
        amount2:'',
        depositeAvgY1:'',
        depositeAvgY2:'',
        curAcBl1:'',
        curAcBl2:'',
        Sflag:'',
        SXflag:'',

        /*分页初始化数据*/
        allLoaded: false, //允许再次调用上拉函数
        isAutoFill: false, //是否自动触发下拉函数来填充满父盒子
        divHeight: 0, //父盒子合理的高度

        /*对公群成员列表分页数据*/
        mark: 'c',
        count_c: 1,
        next_c: 2,
        prev_c:1,
        pageCount_c: 1,
        /*对私群成员列表分页数据*/
        count_d: 1,
        next_d: 2,
        prev_d:1,
        pageCount_d: 1,
        /*筛选群成员列表分页数据*/
        count_e: 1,
        next_e: 2,
        prev_e:1,
        pageCount_e: 1,

      }
    },
    activated(){
      this.groupList = []
      this.showThis = false
      this.loading3 = true
      this.loading = true
      this.groupId = this.$route.query.groupId;
      this.groupMemberType = this.$route.query.groupMemberType;
      //获取添加成员列表
      this.addNewGroup()
      /*清空选中要添加的客户列表*/
      this.val = []
      /*      /!*获取当前页面参数*!/
       this.typeFlag = this.$route.query.groupMemberType;*/

      /*初始化分页pageNum*/
      this.count_c =1;
      this.count_d = 1;
      this.count_e = 1;

      myBus.$emit('getTabbarHeight', (h) => {
        this.divHeight = document.documentElement.clientHeight - h - this.$refs.nav.$el.offsetHeight;
      });

    },
    created () {
      mui.init({
        swipeBack: false //启用右滑关闭功能
      })
    },
    methods: {
      /*点击筛选按钮，显示筛选页面*/
      showShaiXuan(){
        this.showThis = !this.showThis
        if(this.showThis == true){
          this.loading3 = false;
          this.ScustName = '';
          this.amount1 = '';
          this.amount2 = '';
          this.depositeAvgY1 = '';
          this.depositeAvgY2 = '';
          this.curAcBl1 = '';
          this.curAcBl2 = '';
        }
      },
      /*点击群组详情添加按钮，显示添加群组页面*/
      addNewGroup(){
        /*获取成员列表*/
        var url = `/CRMNewMobile/group/addGroupPresonList`;
        if(this.groupMemberType == '对公群组'){
          this.$http.post(url,
            /*  {"identity": this.cookies.get('identity'),data:{"pageNum": this.count_c, "flag": 1}}*/
            {
                "identity": this.cookies.get('identity'),
                "pageNum": this.count_c,
                "flag": 1,
                "custBaseId":this.groupId
            },
            {
              emulateJSON:true
            }
          ).then(res => {
            this.mark = 'c'
            /*没有数据则显示暂无数据*/
            if(res.body.data.data.length == 0){
              this.loading3 = false;
              this.loading = true
              this.groupList = []
            }else{
              this.loading3 = false;
              this.loading = false
              this.groupList = res.body.data.data
            }

            this.next_c = res.body.data.next
            this.prev_c = res.body.data.prev
            this.pageCount_c = res.body.data.pageCount

            /* var groupAllList = res.body.data.data;

             console.log(groupAllList.length + '呀')
             this.addDG = groupAllList;
             for(var i = 0; i<addDG.length; i++){
             for(var j = 0; j< this.groupMembers.length;j++){
             if(addDG[i].custName == this.groupMembers[j].custZhName){
             addDG[i].name = 'alreadyAdded';
             this.addDG.push(groupAllList[i])
             }
             }
             }
             console.log(this.addDG)
             this.groupList = groupAllList;
             console.log(this.groupList)
             */

          }).catch((error) => {
            console.log(error);
          })
        }else if(this.groupMemberType == '零售群组'){
          this.$http.post(url,
            /*          {"identity": this.cookies.get('identity'),data:{"pageNum": this.count_d, "flag": 2}}*/
            {
                "identity": this.cookies.get('identity'),
                "pageNum": this.count_d,
                "flag": 2,
                "custBaseId":this.groupId
            },
            {
              emulateJSON:true
            }
          ).then(res => {
            this.mark = 'd'
            this.next_d = res.body.data.next
            this.prev_d = res.body.data.prev
            this.pageCount_d = res.body.data.pageCount

            this.SXflag="1"
            /*没有数据则显示暂无数据*/
            if(res.body.data.data.length == 0){
              this.loading3 = false;
              this.loading = true
              this.groupList = []
            }else{
              this.loading3 = false;
              this.loading = false
              this.groupList = res.body.data.data
            }

            /*this.loading2=false*/

          }).catch((error) => {
            console.log(error);
          })
        }
      },
      //添加群成员
      addMember(){
        this.getCheckBoxRes("kipchecked")

        /*点击添加按钮，如果没有选客户，提示没有选客户*/
        if(this.val.length == 0){
          mui.alert('亲，您还未选择要添加的客户！')
          return false
        }

        /*获取群成员的id*/
        var url = `/CRMNewMobile/group/addGroupPreson`;
        console.log(this.val)

        this.$http.post(url,
          {
              "identity": this.cookies.get('identity'),
              "listArr":JSON.stringify(this.val),
          },
          {
            emulateJSON:true
          }
        ).then(res => {

          /*this.showGroupMembers()*/

          this.addmsg=res.body.success
          console.log(this.addmsg);
          /* mui.alert(res.body.msg,()=>{
           this.val = [];
           alert(this.val.length)
           });*/

          mui.alert('亲，添加群成员成功！',()=>{
            this.val = [];
            this.$router.go(-1)
          });

        }).catch((error) => {
          console.log(error);
        })
      },
      /*选中添加群成员*/
      getCheckBoxRes(className){
        var rdsObj   = document.getElementsByClassName(className);
        var vallist = new Array();
        var k= 0;
        console.log(rdsObj.length);

        for(var i = 0; i < rdsObj.length; i++){

          if(rdsObj[i].checked==true){
            var obj=new Object()
            if(this.groupMemberType == '对公群组'){
              obj.identity=this.identity
              obj.custZhName=this.groupList[i].custName
              obj.custId=this.groupList[i].custId
              obj.custBaseId=this.groupId
              vallist.push(obj)
              this.val=vallist
//              rdsObj[i].parentNode.style.display="none"
//              rdsObj[i].checked=false
              console.log(this.val)
            }else if(this.groupMemberType == '零售群组'){
              obj.identity=this.identity
              obj.custZhName=this.groupList[i].personalName
              obj.custId=this.groupList[i].custId
              obj.custBaseId=this.groupId
              vallist.push(obj)
              this.val=vallist
              console.log(this.val)
//              rdsObj[i].parentNode.style.display="none"
//              rdsObj[i].checked=false
            }

          }
        }
        console.log(this.val + "哈哈哈哈")
        return this.val;
      },
//    筛选客户
      Yesshaixuan(){
        /*清空选中状态*/
        var rdsObj   = document.getElementsByClassName("kipchecked");
        for(var i = 0; i < rdsObj.length; i++){
          if(rdsObj[i].checked==true){
            rdsObj[i].checked=false

          }
        }
        /*让删选页面隐藏,显示loading图*/
        this.showThis=false
        this.loading3 = true;
        this.loading = true
        this.groupList = []

        var url = `/CRMNewMobile/group/queryCustByCondition`;
        if(this.groupMemberType == '对公群组'){
          this.Sflag=1
        }else{
          this.Sflag=2
        }
        this.$http.post(url,
          {
            "identity": this.cookies.get('identity'),
            "pageNum": this.count_e,
            "flag": this.Sflag,
            "custName": this.ScustName,
            "amount1": this.amount1,
            "amount2": this.amount2,
            "depositeAvgY1": this.depositeAvgY1,
            "depositeAvgY2": this.depositeAvgY2,
            "curAcBl1": this.curAcBl1,
            "curAcBl2": this.curAcBl2,
            "custBaseId":this.groupId,
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          //this.showThis=false
          this.SXflag="2"

          this.mark = 'e'
          this.next_e = res.body.data.next
          this.prev_e = res.body.data.prev
          this.pageCount_e = res.body.data.pageCount


          /*没有数据则显示暂无数据*/
          if(res.body.data.data.length == 0){
            this.loading3 = false;
            this.loading = true
            this.groupList = []
          }else{
            this.loading3 = false;
            this.loading = false
            this.groupList = res.body.data.data
          }

          if(res.body.success == true){

            /* /!*点击确定按钮： 清空添加客户，筛选列表输入内容*!/
             this.ScustName = '';
             this.amount1 = '';
             this.amount2 = '';
             this.depositeAvgY1 = '';
             this.depositeAvgY2 = '';
             this.curAcBl1 = '';
             this.curAcBl2 = '';*/
          }


        }).catch((error) => {
          console.log(error);
        })
      },
//      筛选重置按钮
      Sempty(){
        this.ScustName=""
        this.amount1=""
        this.amount2=""
        this.depositeAvgY1=""
        this.depositeAvgY2=""
        this.curAcBl1=""
        this.curAcBl2=""
      },
      /*取消按钮，取消选中的成员*/
      cancleChecked(){
        var arr = document.getElementsByClassName('kipchecked')
        console.log(arr)
        var btnArray = ['取消', '确定'];
        mui.confirm('亲，确认取消吗？', '提示', btnArray, (e) => {
          if (e.index == 1) {
            for(var i= 0; i<arr.length; i++){
              arr[i].checked = false;
            }
            this.$router.go(-1)
          } else {

          }
        });

      },
      //下一页
      moveBottom2() {
        if(this.mark == 'c'){
          this.loading3 = true
          this.loading = true
          this.count_c = this.next_c
          this.groupList = []
          var rdsObj   = document.getElementsByClassName("kipchecked");
          for(var i = 0; i < rdsObj.length; i++){
            if(rdsObj[i].checked==true){
              rdsObj[i].checked=false
//            rdsObj[i].parentNode.style.display="none"

            }
          }
          this.addNewGroup()
        }else if(this.mark == 'd'){
          this.loading3 = true
          this.loading = true
          this.count_d = this.next_d
          this.groupList = []
          this.addNewGroup()
        }else if(this.mark == 'e'){
          this.loading3 = true
          this.loading = true
          this.count_e = this.next_e
          this.groupList = []
          this.Yesshaixuan()
        }

      },
      //前一页
      moveTop2(){
        if(this.mark == 'c'){
          this.loading3 = true
          this.loading = true
          this.count_c = this.prev_c
          this.groupList = []
          this.addNewGroup()
        }else if(this.mark == 'd'){
          this.loading3 = true
          this.loading = true
          this.count_d = this.prev_d
          this.groupList = []
          this.addNewGroup()
        }else if(this.mark == 'e'){
          this.loading3 = true
          this.loading = true
          this.count_e = this.prev_e
          this.groupList = []
          this.Yesshaixuan()
        }
      },
      /*分页子组件的方法：*/
      //获取当前刷新状态
      handleBottomChange(s) {
      },
      loadBottom() {
        //通知组件的状态改变，从loadding进入pull
        this.$refs.loadmore.onBottomLoaded();
//        var count=1
        //获取下一页的数据
        this.moveBottom2()
      },
      loadTop(){
        //通知组件的状态改变，从loadding进入pull
        this.$refs.loadmore.onTopLoaded();
//        var count=1
        //获取下一页的数据
        this.moveTop2()
      },

    },
    components: {
      addUserHead
    }
  }

</script>
<style lang="scss" scoped>
  /*设置遮罩层父元素的宽高*/
  .addUser{
    width: 100%;
    height: 100%;
  }
  .addUser .split2{
    width: 100%;
    height: 0.6rem;
    background-color: #F6F8F8;
    border-top: 1px solid #ECECEC;
    border-bottom: 1px solid #ECECEC;
  }
  .addUser .addList .user1{
    width: 100%;
    height: 2.4rem;
    line-height: 2.4rem;
    background:rgba(255,255,255,1);
    border-bottom: 1px solid #E5E5E5;
    white-space: nowrap !important;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .addUser .addList .user1 .icon3{
    display: inline-block;
    vertical-align: middle;
    width: 0.9rem;
    height: 0.9rem;
    border: 1px solid #B6B6B6;
    border-radius: 100%;
    margin-left: 0.8rem;
  }
  .addUser .addList .user1 .headImage{
    width:1.27rem;
    height:1.27rem;
    vertical-align: middle;
    margin-left: 0.5rem;
  }
  .addUser .addList .user1 .name1{
    font-size:0.94rem;
    font-family:PingFangSC-Regular;
    color:rgba(34,34,34,1);
    margin-left: 5px;
  }
  /*设置底部样式*/
  .addUser .db{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2.75rem;
  }
  .addUser .db .qx{
    background-color: #fff;
    float: left;
    width: 50%;
    height: 2.75rem;
    line-height: 2.75rem;;
    font-size:0.88rem;
    font-family:PingFangSC-Regular;
    color:rgba(242,48,48,1);
    border-top: 1px solid #F23030;
    box-sizing: border-box;
    text-align: center;
  }
  .addUser .db .tj{
    float: left;
    font-size:0.88rem;
    width: 50%;
    height: 2.75rem;
    line-height: 2.75rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
    background-color: #F23030;
    text-align: center;
  }
  .addUser .userInfo{
    width: 100%;
    height: 2.75rem;
    line-height: 2.75rem;
    background:rgba(255,255,255,1);
    border-bottom: 1px solid #EEE;
  }
  .addUser .userInfo .btn1{
    width: 4.58rem;
    height: 1.6rem;
    background:rgba(230,230,230,1);
    border-radius: 8px;
    font-size: 0.77rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    margin-left: 1rem;
    margin-right: 1.5rem;
    vertical-align: middle;
  }
  .addUser .userInfo .khmc{
    width: 10rem;
    height:1.3rem;
    background:rgba(255,255,255,1);
    border-radius: 5px;
  }
  .addUser .first{
    width: 3.6rem;
    height: 1.3rem;
    background:rgba(255,255,255,1);
    border-radius: 5px ;
  }
  .addUser .last{
    width: 3.6rem;
    height: 1.3rem;
    background:rgba(255,255,255,1);
    border-radius: 5px ;
  }
  .addUser .tit1{
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    font-size:0.88rem;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
  }
  .addUser .tit2{
    font-size:0.88rem;
    font-family:PingFangSC-Regular;
    color:rgba(153,153,153,1);
  }
  .addUser .empty{
    width: 100%;
    height: 3rem;
    background-color: #F8F9FB;
  }
  .addUser .btnWrap{
    width: 100%;
    height: 2.16rem;
    line-height: 2.16rem;
    text-align: center;
    font-size: 1rem;
    font-family:PingFangSC-Regular;
  }
  .addUser .btnWrap .reset{
    float: left;
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    border-top: 1px solid #EB3723;
    color:rgba(235,55,35,1);
    background:rgba(255,255,255,1);
  }
  .addUser .btnWrap .confirm{
    float: left;
    width: 50%;
    height: 100%;
    color:rgba(255,255,255,1);
    background-color: #EB3723;
  }
  .addUser .infoWrap{
    width: 100%;
    /*margin-top: 44px;*/
    position: absolute;
    top: 44px;

    z-index: 2000;
  }
  /*添加遮罩层*/
  .addUser .mark{
    width:100%;
    height:100%;
    background: rgba(153,153,153,0.4);
    position: fixed;
    left: 0;
    top: 44px;
    z-index: 99;
  }

</style>
