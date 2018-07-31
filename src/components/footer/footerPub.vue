<template>
  <div>
      <div class="footerdiv">
        <!--<input type="button" value="提交考试" >-->
        <el-button type="info" @click="submitResult()">提交考试</el-button>
        <!--<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>-->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          size="large"
          top="30%"
          :before-close="handleClose">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
  </div>
</template>

<script>
export default {
  name:'footerPub',
  components:{

  },
  data () {
    return {
      dataList :[],
      dialogVisible:false,
    }
  },
  methods:{
    submitResult (){
//       this.dialogVisible = true;
       this.$emit("goSubmit");
    },
    handleClose (){
//      this.$message('这是一条消息提示');
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
//          this.$message({
//            type: 'info',
//            message: `action: ${ action }`
//          });
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.footerdiv{
  height: 3em;
  line-height: 3em;
  background-color: #ddd;
  color: #000;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  input{
    width:30%;
    background-color: cadetblue;
    font-size:1.2rem;
    height: 80%;
    color: #00ffff;
    border-radius: 5px;
  }
}
</style>
