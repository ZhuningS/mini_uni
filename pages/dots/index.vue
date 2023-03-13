<template>
    <!-- pages/dots/index.wxml -->
    <view class="top">
        <swiper :current="swiperCurrent" @change="swiperChange" :circular="true" :autoplay="autoplay" :interval="interval" :duration="duration">
            <block v-for="(item, index) in imgList" :key="item.imgList">
                <swiper-item>
                    <image :src="item.img" :data-src="item.img" class="img_goodcover" @tap="previewImage"></image>
                </swiper-item>
            </block>
        </swiper>
        <!-- 指示点 -->
        <view class="dots flex-row">
            <block v-for="(item, index) in imgList.length" :key="index">
                <view :class="index == swiperCurrent ? 'active' : 'dot'" :data-index="index"></view>
            </block>
        </view>
    </view>
</template>

<script>
// pages/dots/index.js
export default {
    data() {
        return {
            autoplay: true,
            //是否自动切换
            interval: 3000,
            //自动切换时间间隔,3s
            duration: 1000,
            //  滑动动画时长1s
            swiperCurrent: '',
            imgList: [
                {
                    img: 'https://i.postimg.cc/Bn1XpkSn/susu.jpg'
                },
                {
                    img: 'https://i.postimg.cc/Gm7KjGmN/111.jpg'
                },
                {
                    img: 'https://i.postimg.cc/Bv28vfkg/222.webp'
                },
                {
                    img: 'https://i.postimg.cc/65STLQNc/333.webp'
                }
            ]
        };
    },
    methods: {
        //  previewImage(e) {
        //   let currentUrl = e.currentTarget.dataset.src;
        //   let urls = this.data.imgList
        //   wx.previewImage({
        //     current: currentUrl, // 当前显示图片的http链接
        //     urls: urls// 需要预览的图片http链接列表
        //   })
        // },
        swiperChange: function (e) {
            this.setData({
                swiperCurrent: e.detail.current
            });
        },
        /*
         * 图片预览
         * @param e
         */ previewImage() {
            console.log('占位：函数 previewImage 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
