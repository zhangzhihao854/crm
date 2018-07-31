<template>
    <div class='productdetails'>
      <!--v-for="item in sliderlistdata"-->
      <div class="redtop" >
        <div class="cpleft">
          <span class="cplx">产品类型 |  </span>
          <span class="cplx"> {{sliderlistdata.catlName}}</span>
        </div>
        <div class="cpmiddle">
          <p class="cplx">年华利率</p>
          <p class="cplx nhlv">{{sliderlistdata.rate}}</p>
          <p class="cplx" style="color:#FFDEDA">无风险,利率高!</p>
        </div>
        <div class="cpright">
          <span class="cplx">产品期限 |  </span>
          <span class="cplx"> {{sliderlistdata.limitTime}}</span>
        </div>
      </div>
      <div style="background-color:#F8F9FB;">
        <div class="productName protop" v-for="slide in slides1">
          <span class="productTitle">{{slide.Ptitle}}</span>
          <span class="productWrite">{{slide.Pwrite}}</span>
        </div>

        <div class="promiddlebig">
        <div class="productName promiddle" v-for="slide in slides2">
          <span class="productTitle">{{slide.Ptitle}}</span>
          <span class="productWrite">{{slide.Pwrite}}</span>
        </div>
      </div>


        <div class="productName probottom" v-for="slide in slides3">
          <span class="productTitle">{{slide.Ptitle}}</span>
          <span class="productWrite">{{slide.Pwrite}}</span>
        </div>

      </div>


  </div>

</template>

<script type=text/ecmascript-6>
  export default {
    data () {
      return {
        slides1:[
          {Ptitle:'产品编号:',Pwrite:'产品编号'},
          {Ptitle:'产品名称：',Pwrite:'产品名称'},
          {Ptitle:'产品生产日期：',Pwrite:'产品生产日期'},
          {Ptitle:'产品时效期：',Pwrite:'产品时效期'},
          {Ptitle:'产品描述：',Pwrite:'产品描述'},
          {Ptitle:'产品特征：',Pwrite:'产品特征'},
          ],

        slides2:[
          {Ptitle:'费率：',Pwrite:'费率'},
          {Ptitle:'所属条线：',Pwrite:'所属条线'},
          {Ptitle:'是否在售：',Pwrite:'是否在售'},
          {Ptitle:'风险等级：',Pwrite:'风险等级'},
          {Ptitle:'风险提示描述：',Pwrite:'风险提示描述'},
          {Ptitle:'担保要求描述：',Pwrite:'担保要求描述'},
          {Ptitle:'业务流程：',Pwrite:'业务流程'},
        ],
        slides3:[
          {Ptitle:'办理渠道:',Pwrite:'339'},
          {Ptitle:'办理条件:',Pwrite:'339'}
        ],
        sliderlistdata:{}
      }
    },
    activated(){
      this.sliderlistdata={}
//      this.slides1=[]
//      this.slides2=[]
//      this.slides3=[]
      this.productId=this.$route.query.productId
      console.log(this.productId);
      this.getidQueryProduct()

    },
    methods:{
      //     根据表头传的id 获取详情内容
      getidQueryProduct(){
        var url= `/CRMNewMobile/product/idQueryProduct`
        this.$http.post(url,
          {
            "identity": this.cookies.get('identity'),
            "productId": this.productId
          },
        {
          emulateJSON:true
        }
        ).then(
          res => {
            console.log("我是 silders数据内容");

//            产品编号
            this.slides1[0].Pwrite=res.body.data.productId
//            产品名称
            this.slides1[1].Pwrite=res.body.data.prodName
            //            产品生产日期
            this.slides1[2].Pwrite=res.body.data.prodStartDate
            //            产品时效期
            this.slides1[3].Pwrite=res.body.data.prodEndDate
            //            产品描述
            this.slides1[4].Pwrite=res.body.data.prodDesc
            //            产品特征
            this.slides1[5].Pwrite=res.body.data.prodCharact


            //            费率
            this.slides2[0].Pwrite=res.body.data.costRate
            //            所属条线
            this.slides2[1].Pwrite=res.body.data.stripLine
            //            是否在售
            this.slides2[2].Pwrite=res.body.data.prodState
            //            风险等级
            this.slides2[3].Pwrite=res.body.data.riskLevel
            //            风险提示描述
            this.slides2[4].Pwrite=res.body.data.dangerDisc
            //            担保要求描述
            this.slides2[5].Pwrite=res.body.data.assureDisc
            //            业务流程
            this.slides2[6].Pwrite=res.body.data.remark


            //            办理渠道
            this.slides3[0].Pwrite=res.body.data.unitname
            //            办理条件
            this.slides3[1].Pwrite=res.body.data.trialObject


            this.sliderlistdata=res.body.data

//            //            产品类别
//            this.slides4[0].Pwrite=res.body.data.catlName
//            //            产品期限
//            this.slides4[1].Pwrite=res.body.data.limitTime
//
//            //            利率
//            this.slides4[2].Pwrite=res.body.data.rate






          },
        res => {
          console.log(res)
        }
      )
      },
    },

    }
</script>

<style lang="scss" scoped>
  .redtop{
    height:10rem;
    background-color: #FF4E3B ;
    width:100%;
    position: relative;
  }
  .cplx{
    font-size:13px;
    color:#fff;
  }
  .cpleft,.cpmiddle,.cpright{
    display: inline-block;
    width: 32%;
    padding-left:10px;
    transform: translateY(-50%);
    position: absolute;
    top:50%
  }
  .cpleft{
    left: 0;
  }
  .cpmiddle{
    left:33%;
    text-align: center;
  padding-top:40px;
    .nhlv{
      font-size:33px;
      margin-top:25px;
      margin-bottom:25px;
    }
  }

  .cpright{
    right:0%;
  }

  .promiddlebig{
    margin-top:10px;
    margin-bottom:0.5rem;
  }
  .productdetails{
    width:100%;
    background: #FFFFFF;
    /*margin:0 auto;*/
    /*margin-top:10px;*/
    /*padding-left: 20px;*/
    /*padding-right: 20px;*/
    /*padding-top: 20px;*/

    .productTitle{
     color: #888888;
     font-family: 'PingFang SC';
     line-height: 40px;
     font-size:16px;
    }
    .productWrite{
     color: #222222;
     font-family: 'PingFang SC';
     line-height: 40px;
     font-size:16px;
    }
    .productName{
      padding-left:0.9rem;
      background-color: #fff;
      width: 100%;
      word-wrap:break-word;
      word-break:break-all;
      overflow: hidden;
    }
  }


</style>
