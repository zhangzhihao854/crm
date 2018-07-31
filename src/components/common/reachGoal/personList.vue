<template>
    <div class="temp">
      <!--<ul class="mui-table-view myperson">我的客户</ul>-->
      <div class="mui-table-view myperson">我的客户</div>
      <ul class="personList">
        <li class="person" v-for="item in listData" @click="goClientDetail(item.CUST_TYPE,item.CUSTID)">
          <span id="img"><img src="../../../../static/images/boy.png" alt=""></span>
          <span id="info">{{item.COUSTNAME}}</span>
          <span class="mui-fr"><img src="../../../../static/images/ESC.png" alt=""></span>
        </li>
      </ul>
    <!--  <ul class="mui-table-view">
        <li class="mui-table-view-cell" v-for="item in listData">
          <span id="img"><img src="../../../../static/images/boy.png" alt=""></span>
          <span id="info">{{item.COUSTNAME}}</span>
          <span class="mui-fr"><img src="../../../../static/images/ESC.png" alt=""></span>
        </li>
      </ul>-->
    </div>
</template>
<script type=text/ecmascript-6>
  export default{
    props:["listData"],
    methods:{
      goClientDetail(type,custId){
          //零售
          if(type == '2'){
            this.$router.push('/clientCont?custId='+custId)
          }else if(type == '1'){
              //对公
            this.$router.push('/publicCont?custId='+custId)
          }
      }
    }
  }
</script>

<style scoped>
.temp{
    margin-top:70px;
}
.myperson{
  height:2.5em;
  line-height:2.5em;
  padding-left:1em;
}
.personList .person{
  height: 2.4rem;
  width: 100%;
  line-height: 2.4rem;
  border-bottom: 1px solid #E2E2E2;
}
.personList .person #img{
  vertical-align: middle;
  margin-left: 0.8rem;
  margin-right: 0.5rem;
}
.personList .person #info{
  font-size:0.9rem;
  font-family:PingFangSC-Regular;
  color:rgba(51,51,51,1);
}
.personList .person .mui-fr{
  float: right;
  margin-right: 0.8rem;
}

/*.mui-fr{
  float: right;
}
#img{
  vertical-align: middle;
}
  .mui-table-view-cell:after{
    left: 0px !important;
  }
  #info{
    font-size:0.94rem;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
  }
  .mui-table-view-cell{
    height:2.5em;
  }*/

</style>


