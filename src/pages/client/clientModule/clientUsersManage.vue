<template>
  <div class="usersManage">
    <div class="page1">
      <addHeader></addHeader>
      <split></split>
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
      <div class="contentWrap" :style="{height:divHeight+'px'}" ref="nav">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :auto-fill="isAutoFill" ref="loadmore"
                     :top-method="loadTop" :top-all-loaded="allLoaded" @top-status-change="handleBottomChange"
        >
          <ul>
            <li class="groupList" :id=item.id   v-for="item in listdata">
              <div class="group" v-touchstart v-touchmove>
                <div class="groupText">
                  <router-link   class="linkGroup"  :to="{path: '/clientGroup2',query:{name: item.custBaseName,id: item.id,type: item.groupMemberType}}">
                    <span class="listTitle" style="color: #333 !important;">{{item.custBaseName}}</span>
                    <span class="listType"  v-if="item.groupMemberType=='零售群组'" style="background-color:#1AAD19;">{{item.groupMemberType}}</span>
                    <span class="listType" v-else="item.groupMemberType=='对公群组'" style="background-color:#FA9D3B;">{{item.groupMemberType}}</span>
                    <span class="peopleCount">{{item.custBaseMemberNum}} 人</span>
                  </router-link>
                </div>
                <span class="btn-delete" v-on:click="deleteGroupById(item.id)">删除</span>
              </div>
            </li>
          </ul>
        </mt-loadmore>
      </div>

    </div>
  </div>
</template>

<script type=text/ecmascript-6>
  import myBus from '../../../components/tools/myBus'
  import addHeader  from '../../../components/header/add-header.vue'
  import split  from '../../../components/common/split/split.vue'
  import  mui from '../../../style/js/mui.min.js'
  export default {
    data() {
      return {
        listdata:[],
        loading2:true,
        identity: '',

        /*分页初始化数据*/
        allLoaded: false, //允许再次调用上拉函数
        isAutoFill: false, //是否自动触发下拉函数来填充满父盒子
        divHeight: 0, //父盒子合理的高度

        /*客户群管理分页数据*/
        count_a: 1,
        next_a: 2,
        prev_a:1,
        pageCount_a: 1,



        /*设置对公、零售已添加成员参数*/
        addDG: [],
        addLS: []
      };
    },
    created () {
      mui.init({
        swipeBack: false //启用右滑关闭功能
      })
    },
    activated(){
      this.listdata=[]
      this.loading2=true
      this.addmsg=""
      this.identity=this.cookies.get('identity');
      this.count_a = 1,
      this.getqueryGroupList()
      /*获取添加客户页面参数mark*/
      this.typemark = this.$route.query.mark
      myBus.$emit('getTabbarHeight', (h) => {
        this.divHeight = document.documentElement.clientHeight - h - this.$refs.nav.$el.offsetHeight;
      });
    },
    directives:{
      'touchstart':{
        update(el,binding){
          el.addEventListener("touchstart", function(e) {
            if (e.touches.length > 1) {
              return false;
            }
            this.startX = e.touches[0].clientX;
            this.startY= e.touches[0].clientY;

          }, false);
        }
      },
      'touchmove':{
        update(el,binding){
          el.addEventListener("touchmove", function(e) {
            if (e.touches.length > 1) {
              return false;
            }
            let endX = e.touches[0].clientX
            let endY = e.touches[0].clientY
            if(endY >this.startY){
              return false;
            }

            if(endX >this.startX){
              el.style.transform="translateX(0px)"
              el.style.transition="1s"
            }else if(endX <this.startX){
              el.style.transform="translateX(-70px)"
              el.style.transition="1s"
            }
          }, false);
        }
      }
    },
    methods: {

      /*点击page1群组列表项显示对应的群组信息，隐藏page1*/
      showGroup(name, id, type){
        /*获取群成员名称*/
        this.groupName = name
        /*获取群成员id*/
        this.groupId = id
        /*获取群类型参数*/
        this.groupMemberType = type
        this.$router.push('/clientGroup2')
        /*获取群成员数据接口*/
        this.showGroupMembers()
        /*将其他页面隐藏--新增*/
        this.addShow = false
      },
//    查询客户群组列表
      getqueryGroupList(){
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
      //    删除客户群组
      deleteGroupById(val){
        /*点击删除按钮，点击确定走接口*/
        var btnArray = ['确定', '取消'];
        mui.confirm('亲，确定要删除此群组吗？', '提示', btnArray, (e) => {
          if (e.index == 0) {
            var url='/CRMNewMobile/group/deleteGroupById'
            this.$http.post(url,
              {
              "identity":this.cookies.get('identity'),
              "id":val
              },
              {
                emulateJSON:true
              }
            ).then(res => {

              this.getqueryGroupList()
              /*初始化位移*/
              var groupArr = document.getElementsByClassName('group')
              for(var i =0;i<groupArr.length;i++){
                groupArr[i].style.transform = "translateX(0px)"
              }

            }).catch((error) => {

            })
          } else {
            /*初始化位移*/
            var groupArr = document.getElementsByClassName('group')
            for(var i =0;i<groupArr.length;i++){
              groupArr[i].style.transform = "translateX(0px)"
            }
          }

        })

      },
      //下一页
      moveBottom() {
        this.count_a = this.next_a
        if(this.count_a == this.pageCount_a){
          mui.toast('已至末尾页');
        }
        this.listdata=[]
        this.getqueryGroupList()
      },
      //前一页
      moveTop(){
        this.count_a = this.prev_a
        if(this.count_a == 1){
          mui.toast('已至最前页');
        }
        this.listdata=[]
        this.getqueryGroupList()
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
        this.moveBottom()
      },
      loadTop(){
        //通知组件的状态改变，从loadding进入pull
        this.$refs.loadmore.onTopLoaded();
//        var count=1
        //获取下一页的数据
        this.moveTop()
      },
    },

    components: {
      addHeader,
      split,
    }
  }
</script>

<style lang="scss" scoped>
  .groupList{
    width: 100%;
    height: 2.8rem;
    line-height: 2.8rem;
    border-bottom: 1px solid #E5E5E5;
  }
  .group{
    position: relative;
    width: 120%;
    height: 100%;
  }
  .groupText{
    width: 80%;
    height: 100%;
  }
  .btn-delete{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 70px;
    height: 100%;
    line-height: 2.4rem;
    text-align: center;
    background:rgba(255,59,48,1);
    font-size:0.94rem;
    font-family:PingFangSC-Regular;
    color: #fff;
  }

  .listTitle{
    margin-left: 1rem;
    font-size:0.94rem;
    font-family:PingFangSC-Regular;
    color:rgba(34,34,34,1);
  }
  .listType{
    display: inline-block;
    margin-left: 0.86rem;
    width:4.61rem;
    height:1.33rem;
    line-height: 1.33rem;
    background:rgba(26,173,25,1);
    border-radius: 0.27rem ;
    font-size:0.72rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
    text-align: center;
  }
  .peopleCount{
    float: right;
    display: inline-block;
    width:3rem;
    height:2.8rem;
    line-height: 2.8rem;
    font-size:0.94rem;
    font-family:Helvetica;
    color:rgba(136,136,136,1);
    text-align: center;
  }
</style>
