<template>
  <div class="activityDetail">
    <div style="height:45px;margin-bottom:10px;background: #EEEEEE"><back-Header :title="title"></back-Header></div>
    <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
    </el-table>
    <!--<el-table :data="tableData"  style="width: 100%;">-->
      <!--&lt;!&ndash;type="index"&ndash;&gt;-->
      <!--<el-table-column  width="65" label="编号"></el-table-column>-->
      <!--&lt;!&ndash;property="obj"&ndash;&gt;-->
      <!--<el-table-column  label="参与对象" :width="tableWidth2"></el-table-column>-->


      <!--<el-table-column  label="存款目标金额" :width="tableWidth1" ></el-table-column>-->

        <!--<el-table-column  label="贷款目标户数" :width="tableWidth2"></el-table-column>-->
        <!--<el-table-column  label="贷款目标金额" :width="tableWidth1"></el-table-column>-->

        <!--<el-table-column  label="潜客开发数量" :width="tableWidth1"></el-table-column>-->


    <table>
      <tr>
        <th>编号</th>
        <th>参与对象</th>
        <th v-show="ck">存款目标金额</th>
        <th v-show="dk">贷款目标户数</th>
        <th v-show="dk">贷款目标金额</th>
        <th v-show="qk">潜客开发数量</th>
      </tr>
      <tr v-for="(item,index) in showlistdata">
        <td>{{index+1}}</td>
        <td>{{item.participateObjId}}</td>
        <td v-show="ck">{{item.depositTargetAmount}}</td>
        <td v-show="dk">{{item.loansCount}}</td>
        <td v-show="dk">{{item.loansTargetAmount}}</td>
        <td v-show="qk">{{item.diveCount}}</td>

      </tr>

    </table>


  </div>
</template>

<script type=text/ecmascript-6>
  import BackHeader from '@/components/header/back-header'
  export default {

    data () {
      return {
        title:'活动目标详情',
        flag:"1",
        ck: false,
        dk: false,
        qk: false,
        loading2:true,
        tableWidth1:document.documentElement.clientWidth*0.32,
        tableWidth:document.documentElement.clientWidth*0.26,
        tableWidth2:document.documentElement.clientWidth*0.3,
        tableData:[
        {
          obj:"小贷一组",
          num:"64",
          total:"2400,0000"
        },
        {
          obj:"小贷二组",
          num:"48",
          total:"1800,0000"
        },
        {
          obj:"小贷三组",
          num:"56",
          total:"2100,0000"
        },
        {
          obj:"河西支行",
          num:"16",
          total:"600,0000"
        }
        ,{
          obj:"南陈屯支行",
          num:"32",
          total:"1800,0000"
        },
        {
          obj:"运河支行",
          num:"24",
          total:"900,0000"
        },
        {
          obj:"渤海新区支行",
          num:"16",
          total:"600,0000"
        }
        ],
        type:"",
        showlistdata:[]


      }
    },
    activated(){
      this.ck=false
      this.dk=false
      this.qk=false
      this.loading2=true
      this.showlistdata=[]
      this.showDetaillist()
      this.type=this.$route.query.type
     if(this.type.indexOf("存款")>-1){
       this.ck=true
     }
      if(this.type.indexOf("贷款")>-1){
        this.dk=true
      }
      if(this.type.indexOf("潜客")>-1){
        this.qk=true
      }
    },
    components: {
      BackHeader,
    },
    methods:{
      showDetaillist(){
        var url = `/CRMNewMobile/marketing/queryActivityOBJ`
        this.$http.post(url,
          {
            "identity":this.cookies.get('identity'),
              "id":this.$store.state.marktingId
          },
          {
            emulateJSON:true
          }
        ).then(
          res => {
          this.showlistdata=res.body.ListData
          this.loading2=false

      },
        res => {
          console.log(res)
        }
      )
      },

  }
  }
</script>

<style lang="scss" scoped>
  table{
    width:100%;
    overflow: scroll;
  }
  table tr{
    width:600px !important;
  }
  table th{
    background-color: #EEEEEE;
    height:44px;
    width: 100px !important;
    font-size:0.83rem;
    font-weight: 400;
    color:#555;
    overflow: scroll;

  }
  table td{
    height:44px;
    width: 100px!important;
    font-size:0.83rem;
    font-weight: 400;
    color:#555;
    border-bottom: 1px solid #e2e2e2;
  }
  i{
    color:#B3B3B3;
  }
  .activityDetail{
    height:auto;
    /*height:100%;*/
    width: 600px !important;
    text-align: center;
    /*position:fixed;*/
    top:0;
    left:0;
    color:#555;
    overflow: scroll;

  .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div {
    /* background-color: #eef1f6; */
    color: #555;
}

.el-table th {
    white-space: nowrap;
    overflow: hidden;
    background-color: #eee !important;
    text-align: left;
}
td {
  text-align: center;
}
}

</style>
