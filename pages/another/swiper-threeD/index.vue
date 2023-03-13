<template>
    <view>
        <!-- pages/another/swiper-threeD/index.wxml -->
        <swiper
            class="swiper"
            :current="swiperCurrent"
            circular
            previous-margin="100"
            next-margin="100"
            @animationfinish="swiperChange"
            :circular="true"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
        >
            <swiper-item class="item" :wx:index="index" v-for="(item, index) in banner_list" :key="item.list">
                <image :src="item" :class="swiperCurrent == index ? 'active' : 'no-active'" modex="heightFix" />
            </swiper-item>
        </swiper>
        <!-- 进度条跳动 -->
        <view class="load1">
            <view class="rect1"></view>
            <view class="rect2"></view>
            <view class="rect3"></view>
            <view class="rect4"></view>
            <view class="rect5"></view>
        </view>
        <!-- 来回滑动 -->
        <view class="scroll">
            <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg"></image>
        </view>
        <!-- 360度转圈圈 -->
        <view>
            <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="circle"></image>
        </view>
        <!-- 放大图片 -->
        <view>
            <image src="https://i.postimg.cc/76br1jzJ/susu1.jpg" class="scaleImg"></image>
        </view>
        <!-- 无限反转 -->
        <view class="f_reverse"></view>

        <!-- 进度条 -->
        <view class="loading-row">
            <view class="loading-cell">
                <view class="circle-line">
                    <text></text>
                    <text></text>
                    <text></text>
                    <text></text>
                    <text></text>
                    <text></text>
                    <text></text>
                    <text></text>
                </view>
            </view>
            <view class="loading-cell">
                <view class="circle-line-spin">
                    <text></text>
                    <text></text>
                    <text></text>
                    <text></text>
                    <text></text>
                    <text></text>
                    <text></text>
                    <text></text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/another/swiper-threeD/index.js
export default {
    data() {
        return {
            autoplay: true,
            //是否自动切换
            interval: 3000,
            //自动切换时间间隔,3s
            duration: 500,
            //  滑动动画时长1s
            swiperCurrent: 0,
            banner_list: [
                'https://i.postimg.cc/76br1jzJ/susu1.jpg',
                'https://i.postimg.cc/WzKK73vQ/20210729155755.jpg',
                'https://i.postimg.cc/qRRLS16Q/susu0.jpg',
                'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
            ]
        };
    },
    onLoad: function (options) {},
    // swiperChange: function (e) {
    //   if (e.detail.source == "touch" || e.detail.source == "autoplay") {
    //     console.log(e.detail.current)
    //     if(e.detail.current==0){
    //       let swiperError = this.data.swiperError
    //       swiperError += 1
    //       this.setData({swiperError: swiperError })
    //       if (swiperError >= 3) { //在开关被触发3次以上
    //           console.error(this.data.swiperError)
    //           this.setData({ swiperCurrent: this.data.preIndex });//，重置current为正确索引
    //           this.setData({swiperError: 0})
    //       }
    //     }else{
    //       this.setData({preIndex: e.detail.current });
    //       this.setData({swiperError: 0})
    //     }
    //   }
    // },
    onShow: function () {},
    methods: {
        swiperChange(e) {
            if (e.detail.source == 'touch' || e.detail.source == 'autoplay') {
                this.setData({
                    swiperCurrent: e.detail.current
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
