<template>
  <div id="title_header">
    <div id="wrap_title">
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style>
  #title_header{
    /*padding-top: 20px;*/
    height: 2.32rem;
    width: 100%;
    font-size: 1rem;
    font-family: "PingFang SC-Regular";
    line-height: 2.32rem;
    text-align: center;
    color: rgba(17,17,17,1);
    background-color: #fff;
    margin-bottom:0;
    position: fixed;
    top:0;
    left:0;
    z-index: 1000;

  }
</style>
