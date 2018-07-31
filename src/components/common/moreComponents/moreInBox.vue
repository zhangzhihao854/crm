<template>
  <div class='moreBox'>

    <div class="content" v-show="showContent">
      <div class="contsBox">
        <div class="descript">活动过程描述</div>
        <div class="moreBox2">
          <el-input v-model="activityinput" :disabled="inputdisabled" type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" resize="none" style='border-color: #FFFFFF;'>
          </el-input>
        </div>
      </div>
      <!--上传图片界面-->
      <div  class="imgsbox" v-show="buttonshow">
        <div class="descript">活动图片上传</div>
        <div class="imgBox">
          <el-upload
            ref="upload"
            action="/CRMNewMobile/marketing/teamReach"
            list-type="picture-card"
            :auto-upload = false
            :multiple=true
            :limit=6
            :data="upLoadData"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :onError="uploadError"
            :onSuccess="uploadSuccess"
            :beforeUpload="beforeAavatarUpload"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </div>
      <!--照片回显界面-->
      <div class="tbwrap">
        <el-row>
          <el-col :span="8"  v-for="item in photolists"   class="tbli" >
            <div class="grid-content bg-purple">
              <li @click="showBigImg(item.TB_PHOTOS_COMPRESS)">
<!--                <img :src="'http://221.195.137.135:8081/CRMNewMobile/file/downloadFile?filename=/'+item.TB_PHOTOS_COMPRESS" class="tbimg">-->
                <img :src="'http://222.223.182.30:1411/CRMNewMobile/file/downloadFile?filename=/'+item.TB_PHOTOS_COMPRESS" class="tbimg"><!--预生产-->
<!--                 <img :src="'http://www.crcbcrm.com/CRMNewMobile/file/downloadFile?filename=/'+item.TB_PHOTOS_COMPRESS" class="tbimg">-->

              </li>
            </div>
          </el-col>
        </el-row>

      </div>
      <!--底部按钮-->
      <div class="submitbottom" v-show="buttonshow">
        <el-button class="morebottom" @click='buttonImg' type="primary" :loading="buttonloading">提交</el-button>
      </div>
    </div>

    <!--大图预览-->
    <div id="bigImg" v-show="toggleShow" @click="closeImage">
<!--      <img :src="'http://221.195.137.135:8081/CRMNewMobile/file/downloadFile?filename=/'+ this.bigImageSrc" style="width: 100%; height: 100%;">-->
            <img :src="'http://222.223.182.30:1411/CRMNewMobile/file/downloadFile?filename=/'+ this.bigImageSrc +'&identity='+this.upLoadData.identity" style="width: 100%; height: 100%;"><!--预生产-->
<!--        <img :src="'http://www.crcbcrm.com/CRMNewMobile/file/downloadFile?filename=/'+ this.bigImageSrc" style="width: 100%; height: 100%;">-->
    </div>

  </div>
</template>

<script type=text/ecmascript-6>
  import  mui from '../../../style/js/mui.min.js'
  import moreBottom from '@/components/common/moreComponents/moreBottom'

  export default {
    components:{
      moreBottom
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        activityinput:'',
        formData:{},
        mymessage:'提交',
       /* upLoadData:{
          marktingId:this.$store.state.marktingId,
          identity:this.cookies.get('identity')
        },*/
        upLoadData:{
          marktingId:'',
          identity:'',
        },
        buttonloading:false,
        photolists:[],
        /*   buttonshow:true,
         inputdisabled:false*/

        buttonshow:false,
        inputdisabled:true,
        /*大图初始化不显示*/
        toggleShow: false,
        activeImage: '',
        bigImageSrc: '',
        //页面初始化显示内容
        showContent: true
      };
    },
    created(){
      mui.init({
        swipeBack: false //启用右滑关闭功能
      })
    },
    activated(){
      //清空已上传的图片
      this.$refs.upload.clearFiles();
      //this.upLoadData.marktingId=this.$store.state.marktingId
      this.activityinput=''
      this.dialogImageUrl=""
      this.photolists=[]

      /*赋值upLoadData*/
      this.upLoadData.identity = this.cookies.get('identity');
      this.upLoadData.marktingId = this.$store.state.marktingId;

      /*   this.buttonshow=true
       this.inputdisabled=false*/
      this.buttonshow = false,
        this.inputdisabled = true
      this.toggleShow = false
      this.showContent = true
      this.bigImageSrc = ''

      this.dialogVisible=false
      this.buttonloading=false
      var lilength=document.getElementsByClassName("el-upload-list__item is-success")
      if(lilength.length>0){
        $(".el-upload-list__item").remove();
      }
      this.photolist()
    },
    methods: {
      beforeAavatarUpload(file){
        const isLt2m = file.size/1024/1024<= 50;
        /*限制图片上传的大小*/
         /*if(!isLt2m){
         mui.alert("上传图片大小不得超过50M！", function() {});

         }*/
        //限制图片的类型
        const isJPEG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isJPG = file.type === 'image/jpg';
        if (!isJPEG && !isGIF && !isPNG && !isBMP && !isJPG) {
          this.$message({
            showClose: true,
            message: '亲，上传图片必须是JPEG/JPG/GIF/PNG/BMP格式!',
            type: 'error',
            duration: 1000
          });
          return false
        }
      },
      uploadError(err,file,fileList){
        this.$message({
          showClose: true,
          message: '上传失败！',
          type: 'error',
          duration: 1000
        });
      },
      uploadSuccess(response,file,fileList){
      /*  this.$message({
          showClose: true,
          message: '上传成功！',
          type: 'success',
          duration: 1000
        });*/
      },
      handleRemove(file, fileList) {

      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;

      },
      handleExceed(files, fileList){
        this.$message.warning('亲，最多只能上传6张图片哟！')
      },
      buttonImg(){

        if(this.activityinput==""){
          this.buttonloading=false
          mui.alert("请先输入活动描述哦亲！", function() {});

          return false
        }
        this.buttonloading=true
        //手动上传图片
        this.$refs.upload.submit();
        var url='/CRMNewMobile/marketing/teamReach2'
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
            "marktingId":this.$store.state.marktingId,
            "tbDescription":this.activityinput
          },
          {
            emulateJSON:true
          }
          ).then(
          res=>{

            console.log(res);
            this.$router.push("/moreMainPage")
            this.buttonloading=false;
            /*点击提交之后，只能显示回显的页面*/
            this.buttonshow=false
            this.inputdisabled=true

          },
          res=>{
            console.log('messages出错')
            this.buttonloading=false


          }
        )
      },

//      照片回显接口
      photolist(){
        var url='/CRMNewMobile/marketing/showTeamBuildList'
        this.$http.post(url,
          {
           "identity":this.cookies.get('identity'),
            "marktingId":this.$store.state.marktingId,
          },
          {
            emulateJSON:true
          }
        ).then(
          res=>{
            console.log(res);
            this.photolists=res.body.ListData
            if(res.body.data == null || res.body.data.TB_DESCRIPTION==""){
              this.buttonshow=true
              this.inputdisabled=false
            }else{//如果不为空 说明是已经提交过了，不显示提交按钮，活动描述disabled为true 不可编辑
              this.buttonshow=false
              this.inputdisabled=true
              this.activityinput=res.body.data.TB_DESCRIPTION
            }
            console.log(this.photolists);
          },
          res=>{
            console.log('messages出错')
          }
        )
      },
      //原图接口
      originalPhoto(){
        this.bigImageSrc = ''
        var url='/CRMNewMobile/marketing/queryTbPhotos'
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
            "activeImage": this.activeImage
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          /*点击图片显示对应的压缩后的大图*/
          this.bigImageSrc = res.body.ListData[0].TB_PHOTOS_COMPRESS;
          console.log( this.bigImageSrc)
        }).catch(err => {

        })
      },
      //点击显示大图
      showBigImg(activeImage){

        this.activeImage = activeImage
        this.toggleShow = true
        this.showContent = false
        //点击压缩图获取对应的原图
        this.originalPhoto()
      },
      closeImage(){

        this.toggleShow = !this.toggleShow
        if(this.toggleShow == true){
          this.showContent = false
        }else{
          this.showContent = true
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .tbli{
    display: inline-block;
    width: 33.3333%;
  }
  .tbimg{
    width:100px;
    height:100px;
  }
  .submitbottom{
    /*margin-top:100px;*/
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 99999;
  }
  .morebottom{
    /*position: fixed;*/
    width: 100%;
    height: 50px;
    background:#EB3723;
    color: #ffffff;
    text-align: center;
    line-height: 50px !important;
    bottom: 0;
    left: 0;
    /*z-index:999999;*/

  }

  .moreBox{
    margin-top: 15px;
    overflow: scroll;

    .descript{
      width:85%;
      height: 50px;
      border-bottom: 1px solid #E2E2E2;
      text-align: left;
      margin-left: 30px;
      margin-bottom: 20px;
      line-height: 50px;
    }
    .moreBox2{
      width: 100%;
      margin: 0 auto;
    }
    .el-upload-list--picture-card .el-upload-list__item{
      width: 100px;
      height: 100px;
    }
    .el-upload--picture-card{
      width: 100px;
      height: 100px;
    }
    .imgBox{
      margin-top:40px;
      margin-bottom: 100px;
    }
    .imgsbox{
      border: 1px solid #E2E2E2;
      width: 100%;
      /*height: 100%;*/
      background: #ffffff;
      /*padding-bottom: 50px;*/
    }
    .contsBox{
      background: #ffffff;
      margin-bottom: 20px;
      border: 1px solid #e2e2e2;
    }
    .el-textarea__inner{
      border-color: #ffffff!important;
      width: 88%;
    }
    .el-textarea__inner{
      margin-left: 20px;
    }
  }
  #bigImg{
    width: 100%;
    height: 100%;
  }
</style>
