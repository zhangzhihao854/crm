<template>
    <div class="clientsMain">
      <el-table v-loading="loading2"  v-show="loading2" element-loading-text="拼命加载中" style="width: 100%">
      </el-table>
      <div v-show="loading">
        <clientHead :dataText="dataText"></clientHead>

        <div class="mainBox">
          <clientDetail v-for='(item,index) in choose' :item='item' :key='index' :custId="custId" ></clientDetail>
        </div>
      </div>
    </div>
</template>

<script>
  import clientHead from '@/components/common/clientComp/clientHead'
  import clientDetail from '@/components/common/clientComp/clientDetail'

  export default{
    components: {
      clientHead,
      clientDetail
    },
    data(){
      return {
        custId: '',
        dataText:{
          personalName:"",
          nationality:"",
          custId:"",
          GLflag:'',
          identType:"",
          identNo:"",
          loading2: true,
          loading: false,
        },
        choose: [{
          title: '客户信息首页',
          slides: [
            {
              src: require('../../../../static/images/client_icon_basic_pressed@3x.png'),
              content: '基本信息',
              linkPath: '/clientjichu?custId='
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
              linkPath: '/clientCunKuan?custId='

            },
            {
              src: require('../../../../static/images/client_icon_-equity_icon_rate__pressed@3x.png'),
              content: '股权信息',
              linkPath: '/clientGuQuan?custId='
            },
            {
              src: require('../../../../static/images/client_icon_-loans_icon_rate__pressed@3x.png'),
              content: '贷款情况',
              linkPath: '/clientDaiKuan?custId='
            },
          ]
        }, {
          title: '客户基础信息',
          slides: [
            {
              src: require('../../../../static/images/client_icon_basic_pressed@3x.png'),
              content: '基础信息',
              linkPath: '/clientinfo1?custId='
            },
            {
              src: require('../../../../static/images/client_icon_family_pressed@3x.png'),
              content: '家庭信息',
              linkPath: '/clientinfo2?custId='
            },
            {
              src: require('../../../../static/images/client_icon_preference_pressed@3x.png'),
              content: '客户偏好',
              linkPath: '/clientinfo3?custId='
            },
            {
              src: require('../../../../static/images/client_icon_affiliation_pressed@3x.png'),
              content: '归属信息',
              linkPath: '/clientinfo4?custId='
            },
            {
              src: require('../../../../static/images/client_icon_relation_pressed@3x.png'),
              content: '联系信息',
              linkPath: '/clientinfo5?custId='
            },
            {
              src: require('../../../../static/images/client_icon_relevance_pressed@3x.png'),
              content: '关联客户',
              //linkPath: '/clientjichu?custId='
              linkPath: '/clientCont?custId='
            },
            {
              src: require('../../../../static/images/client_icon_bank_pressed@3x.png'),
              content: '银行服务',
              //linkPath: '/clientjichu?custId='
              linkPath: '/clientCont?custId='
            },
            {
              src: require('../../../../static/images/client_icon_product_pressed@3x.png'),
              content: '产品意愿',
              //linkPath: '/clientjichu?custId='
              linkPath: '/clientCont?custId='
            },
          ],
        }, {
          title: '客户业务信息',
          slides: [
            {
              src: require('../../../../static/images/client_icon_survey_pressed@3x.png'),
              content: '业务概览',
              linkPath: '/clientYewuone?custId='
            },
            {
              src: require('../../../../static/images/client_icon_account_pressed@3x.png'),
              content: '账户信息',
              linkPath: '/clientYewutwo?custId='
            },
            {
              src: require('../../../../static/images/client_icon_account_pressed@3x.png'),
              content: '产品信息',
              //linkPath: '/clientYewuthree?custId=' 数据目前写死，没有接口
              linkPath: '/clientCont?custId='

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
            },
          ]
        },
          {
            title: '客户价值信息',
            slides: [
              {
                src: require('../../../../static/images/client_icon_clientele_pressed@3x.png'),
                content: '客户评级',
                linkPath: '/clientgongxianone?custId='
              },
              {
                src: require('../../../../static/images/client_icon_contribute_pressed@3x.png'),
                content: '客户贡献度',
                linkPath: '/clientgongxiantwo?custId='
              }
            ]
          },
          {
            title: '营销服务信息',
            slides: [
              {
                src: require('../../../../static/images/client_icon_warn_pressed@3x.png'),
                content: '提醒消息',
                linkPath: '/clientYingone?custId='
              },
              {
                src: require('../../../../static/images/client_icon_feedback_pressed@3x.png'),
                content: '反馈信息',
                linkPath: '/clientYingtwo?custId='
              }
            ]
          }]
      }
    },
    activated(){
      this.loading2=true,
      this.loading=false,
      this.dataText = {}
      this.custId = this.$route.query.custId;
      this.GLflag = this.$route.query.GLflag;
      console.log(this.custId)
      this.getThisCustName()
    },
    methods:{
      //获取客户信息
      getThisCustName(){
        if(this.GLflag=="零售"){
          var url = `/CRMNewMobile/client/querybaseInfoByCastId`
        }else if(this.GLflag=="对公"){
          var url = `/CRMNewMobile/pclient/queryBaseOrgByCustId`
        }else{
          var url = `/CRMNewMobile/client/querybaseInfoByCastId`
        }
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
        console.log(res.body.data)
//              alert(res.body.msg)
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
