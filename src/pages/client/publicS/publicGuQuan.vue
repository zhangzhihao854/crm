<template>
    <div class="moreInformBox">
        <back-Header :title="title"></back-Header>

        <div class="containt">
            <client-text :dataText='dataText'></client-text>
          <!--添加loading-->
          <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%"></el-table>
        </div>

    </div>
</template>

<script>
    import BackHeader from '@/components/header/back-header'
    import clientText from '@/components/common/publicCom/publicGuQuan'


    export default {
        components:{
            BackHeader,
            clientText
        },
        data () {
            return {
                title:'股权信息',
                dataText:[
                    /*{curAcBl:'',LastAcBl:'',curYearAvg:'',lastYearAvg:'',curMonthAvg:'',etlDate2:''}*/
                ],
                loading2: true,
            }
        },
        activated(){
            this.loading2 = true;
            this.custId = this.$route.query.custId;
            this.getThisGuQuanMsg()
        },
        methods:{
            //获取客户股权信息
            getThisGuQuanMsg(){
                var url = `/CRMNewMobile/pclient/queryStockOrgByCustId`;
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
                this.dataText=[
                  {"etlDate2":'暂无数据',curAcBl:'0',LastAcBl:'0',curYearAvg:'0',
                    lastYearAvg:'0', curMonthAvg:'0'
                  }

                ]
                }else{
                  this.loading2 = false;
                  this.dataText = res.body.ListData;
                }



            }).catch((error) => {
                    console.log(error);
            })
            }
        }
    }
</script>

<style lang='scss'>
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
