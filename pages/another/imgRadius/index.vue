<template>
    <view>
        <!-- pages/another/imgRadius/index.wxml -->
        <view class="mb20">方法一:不推荐，图片适配不好,被放的很大</view>
        <view style="overflow: hidden" class="flex-column">
            <view class="imgbox">
                <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" class="im" mode="aspectFill"></image>
            </view>
        </view>
        <view class="mb20">方法二:border-radius</view>
        <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" mode="aspectFill" class="box" />

        <view class="mb20">border-radius设置</view>
        <view class="a"></view>
        <view class="b"></view>
        <view class="c"></view>
        <view class="d"></view>
    </view>
</template>

<script>
// pages/another/imgRadius/index.js
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
