<template>
    <view>
        <!-- pages/wxCase/costomNav/index.wxml -->
        <view class="custom_head" :style="'height:' + navHeight + 'px;'">
            <view class="flex-row j_b" :style="'height:' + navObj + 'px;padding-top:' + navTop + 'px;padding-right:' + (navObjWid + 5) + 'px;'">
                <view class="head_store text_ellipsis">{{ store_name }}</view>
                <picker @change="bindPickerChange" :value="index" :range="storeList" range-key="name">
                    <view class="flex-row picker">
                        <text>切换名称</text>
                        <image src="/static/img/down_arr.png" />
                    </view>
                </picker>
            </view>
        </view>
        <view class="head" :style="'margin-top:' + navHeight + 'px'">
            <view class="head_bg"></view>
            <view style="padding-top: 40rpx">
                <swiper class="swiper_box" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000" :circular="true">
                    <swiper-item v-for="(item, index) in banner" :key="index">
                        <image @tap="clickImg" :src="item" mode="aspectFill"></image>
                    </swiper-item>
                </swiper>
            </view>
        </view>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            navHeight: app.globalData.navHeight,
            //导航栏高度
            navTop: app.globalData.navTop,
            //导航栏距顶部距离
            navObj: app.globalData.navObj,
            //胶囊的高度
            navObjWid: app.globalData.navObjWid,
            //胶囊宽度+距右距离
            storeList: [
                {
                    name: '苏苏的嘻嘻哈哈'
                },
                {
                    name: '猪猪的嘻嘻哈哈'
                },
                {
                    name: '可可的嘻嘻哈哈'
                }
            ],
            store_name: '',
            //店铺名称
            banner: [
                'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                'https://i.postimg.cc/mgsKJGLw/susu1.jpg',
                'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
            ]
        };
    },
    onLoad: function (options) {
        this.setData({
            store_name: this.storeList[0].name
        });
    },
    onShow: function () {},
    onReachBottom: function () {},
    methods: {
        bindPickerChange: function (e) {
            this.setData({
                store_name: this.storeList[e.detail.value].name
            });
        },

        clickImg() {
            console.log('占位：函数 clickImg 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
