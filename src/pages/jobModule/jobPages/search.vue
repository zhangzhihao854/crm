<template>
  <div class="search_input" @click="onBlur($event)">
    <header class="mui-bar mui-bar-nav">
      <span class="mui-icon mui-icon-search"> </span>
      <input class="my-autocomplete" id="input" type="text" placeholder="请输入" v-model="custName" @keyup.enter ="getNewsListData">
      <span class="search-back" @click="goSearchPages(flag)">取消</span>
    </header>

    <!--添加loading-->
    <el-table v-loading="loading2"  v-show="loading" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
      <ul v-if="listDate!=null"  class="search-ul">
        <li v-for="item in listDate" @click="gopersonal(item.CUSTID,item.CUSTNAME)" class="search-li">{{item.CUSTNAME}} </li>
      </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getTestData} from '../../../service/getData'
  import { MessageBox } from 'mint-ui';
  import  mui from '../../../style/js/mui.min.js'

  export default {
      data() {
        return {
          custName:'',
          listDate:[],
          identity:this.cookies.get('identity'),
          flag:'',
          loading2:true
        }
      },
      activated(){
        this.loading2=false;
        this.loading = false;
        this.custName=""
        this.listDate=""
        this.inieDate()
//        alert(this.flag)
      },
      methods: {
        onBlur(event){
           if(event.target.id!='input')
          {
            document.activeElement.blur();
            document.getElementById("input").blur();
            this.getNewsListData()
          }

        },
        inieDate(){
          this.flag=this.$route.query.num
        },
        getNewsListData(){
          this.loading = true;
          this.loading2= true;
          this.listDate = [];
          var url= `/CRMNewMobile/loan/selectData`
         // this.currentDate = {"custName":this.custName}
          this.$http.post(url,
                  { "identity":this.cookies.get('identity'), "custName":this.custName},
            {
              emulateJSON:true
            }
          ).then(res => {

            /*如果没有搜索到数据，给出温馨提示*/
            if(res.body.ListData.length == 0 || res.body.ListData[0]== null){
              /*this.$message({
                message: '亲，没有找到相关数据！',
                type: 'success',
                showClose: true,
                duration: 1000
              });*/
              this.loading = true;
              this.loading2 = false;
            }else{
              this.loading = false;
              this.loading2 = false;
              this.listDate = res.body.ListData
            }


        }).catch((error)=>{
            console.log(error);
            this.loading2=false;
        })
        },
        goSearchPages(num){
//          alert("search:"+num)
          this.$router.push('/loan_schedule?num='+num)
        },
        gopersonal(custId,custName){
          this.$router.push('/personal?custId='+custId+'&custName='+custName+'&num='+this.flag)
        }
      }

    }

</script>
<style lang="stylus" scoped>
  .search_input .mui-bar{
    height: 64px;
    padding-top: 20px;
    background-color: #fff;
    line-height:2.32rem;
    position: relative;
    box-shadow: none !important;
    border-bottom: 1px solid #e5e5e5;
  }
  .search_input{
    background-color: #fff;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;

  }
  .my-autocomplete{
    width: 80%;
    height: 1.8rem;
    padding-left: 1.2rem;
    /*margin-left: 0.2rem;*/
  }
  .mui-icon-search{
    position: absolute !important;
    left: 0.8rem;
    top: 34px;
    color:#888;
    font-size: 1rem !important;
    margin-right: 1rem !important;
    padding-top: 0 !important;
  }
  .search-back{
    color: #888;
    position: absolute;
    right: 1rem;
  }
  .search-ul{
    list-style: none;
    background-color: #fff;
    width: 100%;
  }
  .search-li{
    height: 2em;
    border-bottom: 1px solid #e5e5e5;
    padding-left: 1em;
    margin-top: .5em;
    color:#555 ;
  }
</style>
