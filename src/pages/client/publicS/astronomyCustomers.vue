<template>
    <div class="moreInformBox">
       <back-Header :flag="flag"></back-Header>
        <div class="div">
            <input class="input" type="text" placeholder="请输入客户关联编号或描述" v-model="custName" @keyup.enter="handleIconClick" >
            <i class="el-icon-more" @click="showhide" ></i>
        </div>
        <div class="searchcontent" v-if="showdata" >
            <div class="contentright">
                <el-row>
                    <el-col :span="8"><div class="contentS1"><span class="span1">关联客户名称</span></div></el-col>
                    <el-col :span="16">
                        <div class="contentS1"><el-input v-model="custNameR" placeholder="请输入"></el-input></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8"><div class="contentS1"><span class="span1">关联客户编号</span></div></el-col>
                    <el-col :span="16">
                        <div class="contentS1"><el-input v-model="custNoR" placeholder="请输入"></el-input></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8"><div class="contentS1"><span class="span1">关联关系</span></div></el-col>
                    <el-col :span="16">
                        <div class="contentS1">
                            <select v-model="relationship" dir="rtl" style="width: 100%">
                                <option   value ="">请选择</option>
                                <option v-for="item in dataType" :value ="item.fCode">{{item.fValue}}</option>
                            </select>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8"><div class="contentS1"><span class="span1">关联描述</span></div></el-col>
                    <el-col :span="16">
                        <div class="contentS1"><el-input  v-model="rDesc" placeholder="请输入"></el-input></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8"><div class="contentS1"><span class="span1">创建日期</span></div></el-col>
                    <el-col :span="16">
                        <div class="contentS1"><!--<el-date-picker
                                class="inputdate"
                                v-model="creatDate"
                                format="yyyy-MM-dd"
                                default-value type="date" placeholder="" :picker-options="pickerOptions0"></el-date-picker>-->
                            <el-date-picker
                                    class="inputdate"
                                    v-model="creatDate"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    placeholder="">
                            </el-date-picker>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="el-row1">
                    <el-col :span="12"><div class="contentS2 fcol" @click="initData"><span>重置</span></div></el-col>
                    <el-col :span="12">
                        <div class="contentS2 borf"  @click="RelateByCondition"><span>查询</span></div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!--添加loading-->
        <el-table v-loading="loading2" v-show="loading2" element-loading-text="拼命加载中" style="width: 100%;z-index: 10"></el-table>
        <!--判断数据为空时，显示暂无数据-->
        <div v-show="showGL" style="text-align: center; margin-top: 20px">
          <div  style="width: 120px;height: 120px;text-align: center; margin: 0 35%;">
            <img style="width: 100%;height: 100%" src="../../../../static/images/192@2x.png" alt="">
          </div>
          <div style="margin-top: 20px;">暂时没有信息哦~</div>
        </div>
        <astronomyCustomers v-if="showdata1" :dataText="dataText"></astronomyCustomers>



    </div>
</template>

<script>
    import BackHeader from '@/components/header/back-header'
    import astronomyCustomers from '@/components/common/publicCom/astronomyCustomers'
    export default {
        components:{
            BackHeader,
            astronomyCustomers
        },
        data(){
            return {
                flag:'10',
                loading2:true,
                showdata:false,
                showdata1:false,
                custName:'',
                custNameR:'',//关联客户名称
                custNoR:'',//关联客户编号
                relationship:'',//关联关系
                rDesc:'',//关联描述
                creatDate:'',//关联日期
                pickerOptions0: {
                    disabledDate(time) {
                        //console.log(time)
                        if(time){
                            return time.getTime() < Date.now() - 8.64e7;
                        }else{
                            return  Date.now();
                        }
                    }
                },
                dataText:[],
                custId: '',
              /*设置暂无数据信封是否显示*/
                showGL:false
            }
        },
        activated(){
            /*初始化： 筛选弹框隐藏, “客户关联名称”折叠面板显示*/
            this.showdata = false;
            this.showdata1 = false;
            this.loading2=true
            this.showGL = false
            this.initData()
            this.custId = this.$route.query.custId;
            //this.custId ="0085300721";
            this.getSelectListData();
            this.typeAstornomy();
        },
        methods:{
            initData(){
                this.custNameR='';//关联客户名称
                this.custName='';//模糊搜索客户名称
                this.custNoR='';//关联客户编号
                this.relationship='';//关联关系
                this.rDesc='';//关联描述
                this.creatDate='';//关联日期
            },
            //关联关系
            typeAstornomy(){
                var url = `/CRMNewMobile/pclient/queryPubRelate`;
                this.$http.post(url,
                  {"identity": this.cookies.get('identity')},
                  {
                    emulateJSON:true
                  }
                ).then(res => {
                this.loading2=false
                this.dataType = res.body.ListData;
            }).catch((error) => {
                    console.log(error);
            })
            },
            //模糊搜索
            handleIconClick(){
              this.loading2=true
              this.dataText=[]
                var url = `/CRMNewMobile/pclient/queryFrameRelateByCondition`;
                this.$http.post(url,
                        {
                          "identity": this.cookies.get('identity'),
                          "custId": this.custId,
                          "param" :this.custName
                        },
                        {
                          emulateJSON:true
                        }
                ).then(res => {
                //没有数据
                if(res.body.ListData.length==0){
                  //loading图消失
                  this.loading2=false
                  this.dataText= []
                  //显示暂无数据的信封
                  this.showGL = true
                  //列表不显示
                  this.showdata1 = false
                }else{
                //有数据
                  this.loading2=false
                  //不显示暂无数据的信封
                  this.showGL = false
                  //显示列表
                  this.showdata1 = true
                  //获取数据
                  this.dataText = res.body.ListData;
                }
            }).catch((error) => {
                    console.log(error);
            })
            },
            showhide(){
                this.showdata = !this.showdata;
                this.showdata1 = !this.showdata1;
                this.loading2 = false;
            },
            //条件查询
            RelateByCondition(){
                this.showdata =false;
              this.loading2=true
                //创建时间日期格式转换
                var d = new Date(this.creatDate);
                var dd=d.getDate()<10?('0'+d.getDate()):d.getDate();
                var mm = (d.getMonth() + 1)<10?('0'+(d.getMonth() + 1)):(d.getMonth() + 1);
                var creatDate1=d.getFullYear() + '-' + mm + '-' + dd;
                var url = `/CRMNewMobile/pclient/queryRelateByCondition`;
                this.$http.post(url,
                        {
                            "identity": this.cookies.get('identity'),
                            "custId": this.custId,
                            "custNameR": this.custNameR,
                            "custNoR":this.custNoR,
                            "relationship":this.relationship,
                            "rDesc":this.rDesc,
                            "creatDate":creatDate1
                        },
                        {
                          emulateJSON:true
                        }
                ).then(res => {
                   if(res.body.ListData.length == 0){
                     this.loading2=false
                     this.dataText = []
                     this.showGL = true
                     this.showdata1 = false
                   }else{
                     this.loading2=false
                     this.showGL = false
                     this.showdata1 = true;
                     this.dataText = res.body.ListData;

                   }
            }).catch((error) => {
                    console.log(error);
            })
            },
            //查询关联客户
            getSelectListData(){
                var url = `/CRMNewMobile/pclient/queryRelateByCustId`;
                this.$http.post(url,
                        {
                            "identity": this.cookies.get('identity'),
                            "custId": this.custId
                        },
                        {
                          emulateJSON:true
                        }
                ).then(res => {
                if(res.body.ListData.length==0){
                  this.loading2 = false;
                  this.dataText = []
                  this.showGL = true
                  this.showdata1 = false;
                }else{
                  this.loading2 = false;
                  this.dataText = res.body.ListData;
                  this.showGL = false
                  this.showdata1 = true;
                }

            }).catch((error) => {
                    console.log(error);
            })
            }
        }
    }

</script>
<style lang="stylus" scoped>
    .moreInformBox{
        height:100%;
        width: 100%;
    .back_text span[data-v-a2006ea4] {
        width: 6em!important;
    }
    }
    /*.div{
        height: 2.38rem;
        line-height: 2.38rem;
    }*/
    .div .el-input__inner{
        height: 1.5rem !important;
        width:12rem !important;
        background-color: rgba(248,249,251,1) !important;
        outline:none !important;
        margin-bottom: 0;
    }
    .div .moreInformBox [class^=el-icon-]{
        position: absolute !important;
        top:0rem !important;
        left: 10rem !important;
        z-index: 999;
    }
    .el-icon-more{
        color: #EB3723;
        position: absolute !important;
        top:0.8rem !important;
        right: 0.8rem !important;
        z-index: 999;
    }

    .input{
        position: absolute;
        top:0.43rem;
        left: 4.3rem;
        z-index: 88;
        outline:none !important;
        font-size: 0.69rem;
    }
    .searchcontent{
        /*position: absolute;*/
        top:2.5rem;
        left: 0;
        width: 100%;
        height: 93%;
        background-color: rgba(223,224,225,0.4);
        z-index: 2011;
    }
    .contentright{
        height: 50%;
        width: 100%;
        background-color: #fff;
        /*float: right;*/

    }
    .contentS{
        height: 3rem;
        line-height: 3rem;
        /*background-color: #00ee00;*/
        font-size: 1rem;
        font-weight: 100;
        font-family:PingFangSC-Regular;
    }
    .contentS1{
        height: 2.55rem;
        line-height: 2.55rem;
        /*background-color: #00ee00;*/
        font-size: 0.88rem;
        font-family:PingFangSC-Regular;
        z-index: 88;
    }
    .contentS2{
        box-sizing: border-box;
        height: 2.3rem;
        line-height: 2.3rem;
        text-align: center;
        font-size: 0.94rem;
        font-family:PingFangSC-Regular;
    }
    .span1{
        margin-left: 0.88rem;
    }
    .contentright .el-row{
        border-bottom: 1px solid #E2E2E2;
    }
    .contentright .el-row:last-child{
        border-bottom: none;
    }
    .el-row1{
        margin-top: 10%;
    }
    .borf{
        background-color: #EB3723;
        color: #fff;
    }
    .fcol{
        background-color: #fff;
        color: #EB3723;
        box-sizing: border-box;
        border-top: 1px solid #EB3723;
        border-left: 1px solid #EB3723;
    }
    select option {
        direction: ltr;
        width: 4rem;
    }
    select {
        appearance:none;
        -moz-appearance: none; /* Firefox */
        -webkit-appearance:none; /* Safari 和 Chrome */
    }
</style>
