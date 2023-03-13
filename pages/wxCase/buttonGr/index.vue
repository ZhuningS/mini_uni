<template>
    <view>
        <!-- pages/wxCase/buttonGr/index.wxml -->
        <view class="a"></view>
        <view class="b"></view>
        <view class="c"></view>
        <view class="d">sss</view>
        <view class="e">苏苏小苏苏</view>
        <view class="f"></view>
        <view class="g"></view>
        <view class="i"></view>

        <!-- 多组头像 -->
        <view class="ava_grop">
            <view class="avatar" style="background-image: url(https://i.postimg.cc/mgsKJGLw/susu1.jpg)" v-for="(item, index) in 4" :key="index"></view>
        </view>
        <view class="ava_grop">
            <view class="avatar" style="background-image: url(https://i.postimg.cc/mgsKJGLw/susu1.jpg)" v-for="(item, index) in 4" :key="index"></view>
        </view>
        <!-- 按钮 -->
        <button class="gray">苏苏小苏苏</button>
        <!-- switch -->
        <switch class="sw"></switch>
    </view>
</template>

<script>
// pages/wxCase/buttonGr/index.js
export default {
    data() {
        return {
            avatar: [
                'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
                'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
                'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
                'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
            ]
        };
    },
    onLoad: function (options) {
        console.log(this.randomRange(21, 23));
    },
    methods: {
        randomRange(lower, upper) {
            return Math.floor(Math.random() * (upper - lower)) + lower;
        }
    }
};
</script>
<style>
@import './index.css';
</style>
