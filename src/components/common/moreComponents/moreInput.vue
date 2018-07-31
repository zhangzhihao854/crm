<template>
   <div>
	 <div class="content" v-for='item in slides'>
        <span>{{item.context}}</span>
        <span><input type="text"  placeholder="请输入" maxlength="500" ></span>
      </div>
   </div>
</template>

<script>

  export default {
    data () {
      return {
         slides:[{context:'后续追踪事项'},{context:'下次活动改进措施'},{context:'备注'}]
      }
      }

  }
</script>

<style scoped>
.content{
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    font-size: 16px;
    margin-top: 20px;
    color: #808080;
    background: #fff;
    border-top: 1px solid #F6F8F8;
    /*border-bottom: 1px solid #F6F8F8*/
  }
  input[type=text]{
    padding:0;
    border:none !important;
    color:#888888;
  }
  /* input[type=tel]{
    padding:0;
  } */
  .content span{
    display: inline-block;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
</style>
