<template>
    <div class="moreInformBox">
        <back-Header :title="title"></back-Header>
        <div class="containt">
          <!--判断数据为空时，显示暂无数据-->
          <div v-show="eventShow" style="text-align: center; ">
            <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
              <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
            </div>
            <div style="margin-top: 20px;">暂时没有信息哦~</div>
          </div>
          <!--添加loading-->
          <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%"> </el-table>
            <client-text :dataText='dataText' v-show="showInfor"></client-text>
        </div>
    </div>
</template>

<script>
    import BackHeader from '@/components/header/back-header'
    import clientText from '@/components/common/publicCom/publicDaiKuan'


    export default {
        components:{
            BackHeader,
            clientText
        },
        data () {
            return {
                title:'贷款情况',
//                dataText:{
//                    etlDate:'2017-11-11',
//                    curAcBl:'0',
//                    lastMonthBl:'0',
//                    lastMonthAvg:'0',
//                    lastAcBl:'0',
//                    lastYearAvg:'0'
//
//                }
                dataText:[],
                loading2:true,
                eventShow: false,
                showInfor: false
            }
        },
        activated(){
            this.loading2 = true;
            this.eventShow = false
            this.showInfor = false
            this.custId = this.$route.query.custId
            this.getThisGuQuanMsg();
        },
        methods:{
            //获取客户贷款信息
            getThisGuQuanMsg(){
                var url = `/CRMNewMobile/pclient/queryLoanOrgByCustId`
                this.$http.post(url,
                  {
                    "identity": this.cookies.get('identity'),
                    "custId": this.custId
                  },
                  {
                    emulateJSON:true
                  }
                ).then(res => {
                if(res.body.ListData.length == 0){
                  this.loading2 = false;
                  this.eventShow = true
                  this.showInfor = false
                  this.dataText = []
                 /* this.dataText=[{
                   etlDate2:'暂无数据',
                   creditSum:'0',
                   lastMonthBl:'0',
                   lastMonthAvg:'0',
                   lastAcBl:'0',
                   lastYearAvg:'0'

                    }]*/

                }else{
                  this.loading2 = false;
                  this.eventShow = false
                  this.showInfor = true
                  this.dataText = res.body.ListData;

                }

            }).catch((error) => {
                    console.log(error);
            })
            }
        }
    }
</script>

<style lang='scss' scoped>
    .moreInformBox{
        height:100%;
        width: 100%;

    .back_text span[data-v-a2006ea4] {
        width: 6em!important;
    }
    .containt{
        margin-top: 1rem;
        background: #FFFFFF;

    }
    }

</style>
