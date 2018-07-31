<template>
    <div class="other">
        <back-header :title="title" :flag="flag"></back-header>
        <div class="other_container">
            <textarea class="other_container_input"  name="q"cols="30" rows="10" maxlength="500" disabled="disabled">{{data.text}}</textarea>
            <!--<span>{{data.text}}</span>-->
        </div>
    </div>

</template>
<script>
    import BackHeader from '@/components/header/back-header'
    import {getTestData} from '../../../service/getData'
    export default {
        components: {
            BackHeader
        },
        data () {
            return {
                title: '其他内容',
                data:{},
                id:"",
                flag:'4'
            }
        },

        created(){
            this.data.text = ''
        },
        methods:{
            // 进行网络请求
            /*getNewsListData () {
//                console.log()
                var url = "report/selectMobcrmTextcontentById";
                var params = {"data":{"id":this.id}};

                getTestData("POST",url,params).then((res)=>{
                    console.log("res:"+res)

                if(res){
                    this.data = res.data
                    console.log(this.data)
                }
            }).catch((error)=>{
                    console.log(error);
            })
            }*/
            getNewsListData(){
//                this.currentDate = id;
                var url= `/CRMNewMobile/report/selectMobcrmTextcontentById`
                //this.currentDate = {"id":this.id}
                console.log(this.currentDate)
                this.$http.post(url,
                        {
                            "identity":this.cookies.get('identity'),
                            "id":this.id
                        },
                        {
                          emulateJSON:true
                        }
                ).then(res => {
                    console.log(res);
                this.data = res.body.data
                console.log(this.data)

            }).catch((error)=>{
                    console.log(error);
            })
            }
        },
        activated(){
          this.id=this.$route.query.id
            this.data.text = ''
            this.getNewsListData()
          this.flag=this.$route.query.flag
          console.log("flag-------------"+this.flag);

        }
    }

</script>
<style lang="stylus" scoped>
    .other{
        position: relative;
        width: 100%;
        /*height: 665px;*/
        background-color: #F6F8F8;
        overflow: hidden;
    }
    .other_container{
        margin-top: 0.8rem;
        width: 100%;
        height: 40%;

    }
    .other_container_input{
        width: 100%;
        height: 400px;
        outline:none;
        border:none;
        overflow:hidden;
        resize:none;
        font-size:1em;
        text-indent: 1em;
        padding-top: 0.5em;
      padding-top: 1.5rem;
    }
</style>
</style>
