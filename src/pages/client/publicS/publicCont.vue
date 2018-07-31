<template>
    <div class="clientsMain" >
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
      <div v-show="loading">
        <publicHead :dataText="dataText"></publicHead>
        <div class="mainBox">
          <publicDetail v-for='(item,index) in choose' :item='item' :key='index' :custId="custId" ></publicDetail>
        </div>
      </div>
    </div>
</template>
<script>
  import publicHead from '@/components/common/publicCom/publicHead'
  import publicDetail from '@/components/common/publicCom/publicDetail'

  export default{
    components: {
      publicHead,
      publicDetail
    },
    data(){
      return {
        custId: '',
        dataText:{
          custName:"",
          nationality:"",
          custId:"",
          identType:"",
          identNo:"",
          loading2:true,
          loading:false,
          isNotNullCust:''
        },
        choose: [{
          title: '客户信息首页',
          slides: [
            {
              src: require('../../../../static/images/client_icon_basic_pressed@3x.png'),
              content: '基本信息',
              linkPath: '/publicjichu?custId='
            },
            {
              src: require('../../../../static/images/client_icon_newest_pressed@3x.png'),
              content: '最新事件',
              linkPath: '/clientNew?custId='
            },
            {
              src: require('../../../../static/images/client_icon_rate_pressed@3x.png'),
              content: '本期评级',
              linkPath: '/clientPj?custId='
            },
            {
              src: require('../../../../static/images/client_icon_-deposit_icon_rate__pressed@3x.png'),
              content: '存款情况',
              linkPath: '/publicCunKuan?custId='
            },
            {
              src: require('../../../../static/images/client_icon_-equity_icon_rate__pressed@3x.png'),
              content: '股权信息',
              linkPath: '/publicGuQuan?custId='
            },
            {
              src: require('../../../../static/images/client_icon_-loans_icon_rate__pressed@3x.png'),
              content: '贷款情况',
              linkPath: '/publicDaiKuan?custId='
            }
          ]
        }, {
          title: '客户基础信息',
          slides: [
            {
              src: require('../../../../static/images/client_icon_basic_pressed@3x.png'),
              content: '基础信息',
              linkPath: '/publicinfo1?custId='
            },
            {
              src: require('../../../../static/images/public_icon_credentials_pressed@3x.png'),
              content: '证件信息',
              linkPath: '/publicinfo2?custId='
            },
            {
              src: require('../../../../static/images/client_icon_relevance_pressed@3x.png'),
              content: '关联客户',
              linkPath: '/astronomyCustomers?custId='
            },
            {
              src: require('../../../../static/images/public_icon_finance_pressed@3x.png'),
              //content: '财务信息',
              content: '归属信息',
              linkPath: '/clientinfo4?custId='
            },
            {
              src: require('../../../../static/images/public_icon_lawsuit_pressed@3x.png'),
              content: '诉讼信息',
              linkPath: '/publiclawsuit?custId='
            },
            {
              src: require('../../../../static/images/public_icon_keyPreson_pressed@3x.png'),
              content: '关键人信息',
              //linkPath: '/clientjichu?custId='
              linkPath: 'publicCont?custId='
            },
            {
              src: require('../../../../static/images/public_icon_executives_pressed@3x.png'),
              content: '高管信息',
              //linkPath: '/clientjichu?custId='
              linkPath: 'publicCont?custId='
            }
          ]
        }, {
          title: '客户业务信息',
          slides: [
            {
              src: require('../../../../static/images/client_icon_survey_pressed@3x.png'),
              content: '业务概览',
              linkPath: '/publicYewuone?custId='
            },
            {
              src: require('../../../../static/images/client_icon_account_pressed@3x.png'),
              content: '账户信息',
              linkPath: '/publicYewutwo?custId='
            },
            {
              src: require('../../../../static/images/public_icon_product_pressed@3x.png'),
              content: '产品信息',
              linkPath: '/publicYewuthree?custId='
            },
//        {src:require('../../../../static/images/client_icon_product02_pressed@3x.png'),content:'产品信息',linkPath:'/clientjichu'},
            {
              src: require('../../../../static/images/client_icon_assure_pressed@3x.png'),
              content: '担保信息',
              linkPath: '/clientdanbao?custId='
            },
            {
              src: require('../../../../static/images/client_icon_impower_pressed@3x.png'),
              content: '授信信息',
              linkPath: '/clientCredit?custId='
            },
            {
              src: require('../../../../static/images/client_icon_signed_pressed@3x.png'),
              content: '签约信息',
              linkPath: '/clientSign?custId='
            }
          ]
        },
          {
            title: '客户价值信息',
            slides: [
              {
                src: require('../../../../static/images/public_icon_contribute_pressed@3x.png'),
                content: '贡献度',
                linkPath: '/publicgongxiantwo?custId='
              },
              {
                src: require('../../../../static/images/public_icon_publicele_pressed@3x.png'),
                content: '客户评级',
                linkPath: '/publicgongxianone?custId='
              }
            ]
          },
          {
            title: '客户服务信息',
            slides: [
              {
                src: require('../../../../static/images/client_icon_warn_pressed@3x.png'),
                content: '客户提醒信息',
                linkPath: '/clientYingone?custId='
              },
              {
                src: require('../../../../static/images/public_icon_feedback_pressed@3x.png'),
                content: '客户反馈信息',
                linkPath: '/clientYingtwo?custId='
              }
            ]
          }]
      }
    },
    activated(){
      this.loading2=true,
     this.loading=false,
     this.isNotNullCust=""
      this.dataText = {};
      this.custId = this.$route.query.custId;
      console.log(this.custId);
      this.getThisCustName()
    },
    methods:{
      //获取客户信息
      getThisCustName(){
        var url = `/CRMNewMobile/pclient/queryBaseOrgByCustId`;
        this.$http.post(url,
          {
            "identity": this.cookies.get('identity'),
            "custId": this.custId
          },
          {
            emulateJSON:true
          }
        ).then(res => {
          console.log(res);
        this.loading2=false,
        this.loading=true,
        this.dataText = res.body.data;
        this.isNotNullCust=res.body.data.isNotNullCust
        console.log(this.isNotNullCust)
        console.log(res.body.data);
      }).catch((error) => {
          console.log(error);
      })
      }
    }
  }
</script>
<style lang="scss" scoped>
    .mainBox{
      width: 100%;
      margin-top: 1.02rem;
    }
</style>
