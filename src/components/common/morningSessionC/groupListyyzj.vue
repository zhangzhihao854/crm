<template>
  <div v-if="this.listData.length!=0" >
    <!--<ul class="mui-table-view" v-for="item in listData">-->
      <!--<li class="mui-table-view-cell mui-collapse"  >-->
        <!--<a class="mui-navigate-right">{{item.departmentName}}</a>-->
        <!--<div class="mui-collapse-content">-->
          <!--<ul v-for="key in item.account" >-->
            <!--<li class="list_l bac_boy" @click="goMorningSession(key.userName,key.accountCode)">-->
                <!--<span class="span1">{{key.userName}}</span>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
      <!--</li>-->
    <!--</ul>-->

        <div class="mui-collapse-content" >
          <ul>
            <li class="list_l bac_boy"v-for="item in listData"  @click="goMorningSession(item.userName,item.accountCode)">
              <span class="span1">{{item.userName}}</span>
            </li>
          </ul>
        </div>
  </div>
</template>

<script>
  import PersonalList from '@/components/common/morningSessionC/personalList'
  export default {
    components:{
      PersonalList
    },
    data(){
      return {
      }
    },
    props:{
      listData:{
        type:Array,
        default:[]
      },
      userName:{
        type:String,
        default:''
      }
    },
    methods:{
      goMorningSession (userName,accountCode) {
        console.log(JSON.stringify(this.listData))
        console.log(userName,accountCode)
        this.$router.push('/morningSessionfff?userName='+userName+'&accountCode='+accountCode+'&date=date')
      },
    }
  }

</script>
<style lang="stylus" scoped>
  .list_l{
    height: 2em;
    line-height: 2em;
    width: 100%;
  }
  .bac_boy{
    background: url("../../../../static/images/boy.png") no-repeat left center;
    background-position-x: .5em;
  }
  .bac_girl{
    background: url("../../../../static/images/girl.png") no-repeat left center;
    background-position-x: .5em;
  }
  .span1{
    margin-left: 2.5em;
    height: 2em;
    width: 100%;
  }
</style>
