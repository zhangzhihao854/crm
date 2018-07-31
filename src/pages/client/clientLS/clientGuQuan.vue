<template>
    <div class="moreInformBox">
        <back-Header :title="title"></back-Header>
        <div class="containt">
            <client-text :dataText='dataText'></client-text>
        </div>

    </div>
</template>

<script>
    import BackHeader from '@/components/header/back-header'
    import clientText from '@/components/common/clientComp/clientGuQuan'


    export default {
        components:{
            BackHeader,
            clientText

        },
        data () {
            return {
                title:'股权信息',
                dataText:{}
            }
        },
        activated(){
            this.custId = this.$route.query.custId
            this.getThisGuQuanMsg()
        },
        methods:{
            //获取客户股权信息
            getThisGuQuanMsg(){
                var url = `/CRMNewMobile/business/queryRightsByCastId`
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
