<template>
  <div class="other">
    <back-header :title="title"></back-header>
    <div class="other_container">
      <!--<input type="text" class="other_container_input" maxlength="500" placeholder="请输入">-->
      <textarea class="other_container_input" v-model="text" placeholder="请输入" name="q"cols="30" rows="10" maxlength="500"></textarea>
    </div>
    <div class="other_footer">
      <div class="cancel" @click="open2" ><span>取消</span></div>
      <div class="keep" @click="getNewsListData()" ><span>保存</span></div>
    </div>
  </div>

</template>
<script>
  import BackHeader from '@/components/header/back-header'
  import {getTestData} from '../../../service/getData'
  import  mui from '../../../style/js/mui.min.js'
  import { MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        title: '其他内容',
        text:'',
        identity:this.cookies.get('identity'),
        test:true
      }
    },
    created(){
      //mui初始化
      mui.init({
        swipeBack: false //启用右滑关闭功能
      });
    },
    activated(){
      this.text = ''
      this.test = true
    },
    methods: {
      open2() {
        this.$confirm('是否放弃当前操作重新录入?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.text=''
      }).catch(() => {
        });
      },
      getNewsListData(){
        if(this.test == true){
          this.test = false
        }else{
          return false
        }
        var url= `/CRMNewMobile/report/addMobcrmTextcontent`
        //this.currentDate = {"text":this.text}
        console.log(this.currentDate)
        this.$http.post(url,
                {
                    "identity":this.cookies.get('identity'),
                     "text":this.text
                },
          {
            emulateJSON:true
          }
        ).then(res => {
        /*  MessageBox('提示', res.body.msg);*/
          this.$message({
            showClose: true,
            message: '亲，保存其他内容成功！',
            type: 'success',
            duration: 1000
          });
        this.text = ''
        this.$router.push('/job?date=date&flag=111')
      }).catch((error)=>{
          console.log(error);
      })
      }
    },
    components: {
      BackHeader
    }
  }
</script>

<style lang="stylus" scoped>
  .other{
    position: relative;
    width: 100%;
    background-color: #F6F8F8;
    overflow: hidden;
  }
  .other_container{
    margin-top: 1.5rem;
    width: 100%;
    height: 40%;
  }
  .other_container_input{
    width: 100%;
    height: 300px;
    outline:none;
    border:none;
    overflow:scroll;
    resize:none;
    font-size:1em;
    text-indent: 1em;
    padding-top: 0.5em;
  }
  .other_footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2.5rem;
    border-top: 1px solid #EB3723;
    line-height: 2.5rem;
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
