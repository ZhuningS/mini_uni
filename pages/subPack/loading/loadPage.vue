<template>
    <!-- pages/subPack/loading/loadPage.wxml -->
    <view class="container">
        <view class="title">苏苏来了</view>
        <view class="content">
            <view class="hd" :style="'transform:rotateZ(' + angle + 'deg);'">
                <open-data class="logo" type="userAvatarUrl"></open-data>
                <image class="wave" src="/static/pages/subPack/img/wave.png" mode="aspectFill"></image>
                <image class="wave wave-bg" src="/static/pages/subPack/img/wave.png" mode="aspectFill"></image>
            </view>
            <view class="bd">
                <view class="smalltitle">HUANYINGNI~</view>
                <view class="confirm-btn">
                    <button open-type="getUserInfo" lang="zh_CN">关注一下~</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            year: '',
            angle: ''
        };
    },
    onLoad: function () {
        this.setData({
            year: new Date().getFullYear()
        });
    },
    onShow: function () {},
    onReady: function () {},
    methods: {}
};
</script>
<style>
@import './loadPage.css';
</style>
