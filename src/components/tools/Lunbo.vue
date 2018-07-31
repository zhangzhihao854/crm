<template>
    <div>
      <!--
      哪个页面使用轮播图就  <!--调用封装的轮播图组件-->
      <!--<Lunbo :lunboData="homeData"></Lunbo>
      然后  在 script 里面 import Lunbo from './../Tools/Lunbo.vue'
      然后 components: {
            Lunbo
        }
      -->
        <!--从mint-ui中导入的图片轮播图-->
        <!--<mt-swipe :auto="4000">-->
            <!--<mt-swipe-item class="slide1">1</mt-swipe-item>-->
            <!--<mt-swipe-item class="slide2">2</mt-swipe-item>-->
            <!--<mt-swipe-item class="slide3">3</mt-swipe-item>-->
        <!--</mt-swipe>-->

        <mt-swipe :auto="4000" >
            <mt-swipe-item class="slide1" v-for="(item,index) in lunboData" :key="index">
                <a :href="item.url">
                    <img :src="item.img" class="img">
                </a>
            </mt-swipe-item>
        </mt-swipe>

    </div>
</template>


<style scoped>
    .img{
        width: 100%;
        height: 100%;
    }
    .mint-swipe {
        height: 300px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
    }

    .mint-swipe-item {
        line-height: 300px;
    }

    .slide1 {
        background-color: #0089dc;
        color: #fff;
    }

    .slide2 {
        background-color: #ffd705;
        color: #000;
    }

    .slide3 {
        background-color: #ff2d4b;
        color: #fff;
    }
</style>

<script type=text/ecmascript-6>
    export default {
        // 接收父组件传来的值
        props:['lunboData']
    }
</script>

