<template>
    <view>
        <!-- pages/another/countdown/index.wxml -->
        <!-- 心跳 -->
        <view class="flex-column move-box">
            <image src="https://s3.bmp.ovh/imgs/2022/07/27/85dabf1d5821a98b.png" class="move-img"></image>
            <view class="move-text">苏苏</view>
        </view>
        <!-- 左右闪动 -->
        <view class="flex-column shake-box">
            <image src="https://s3.bmp.ovh/imgs/2022/07/27/6289fe4ab016c74a.png" class="move-img"></image>
            <view class="move-text">苏苏</view>
        </view>
        <!-- 上下闪动 -->
        <view class="flex-column jump-box">
            <image src="https://s3.bmp.ovh/imgs/2022/07/27/85dabf1d5821a98b.png" class="move-img"></image>
            <view class="move-text">苏苏</view>
        </view>
        <!-- 转圈 -->
        <view class="flex-column circle-box">
            <image src="https://s3.bmp.ovh/imgs/2022/07/27/6289fe4ab016c74a.png" class="move-img"></image>
            <view class="move-text">苏苏</view>
        </view>
        <!-- 掘金头像旋转 -->
        <view class="flex-column circle-box-h">
            <image src="https://s3.bmp.ovh/imgs/2022/07/27/60d3ff9dc964b141.png" class="move-img"></image>
            <view class="move-text">苏苏</view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
