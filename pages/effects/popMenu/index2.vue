<template>
    <view>
        <!-- pages/effects/popMenu/index2.wxml -->
        <image src="https://i.postimg.cc/Gpm5bmJz/image.png" :class="'icon ' + (isShow ? 'a1' : 'a10')"></image>
        <image src="https://i.postimg.cc/dVshQb74/image.png" :class="'icon ' + (isShow ? 'a2' : 'a20')"></image>
        <image src="https://i.postimg.cc/prQdRCRw/image.png" :class="'icon ' + (isShow ? 'a3' : 'a30')"></image>
        <image src="https://i.postimg.cc/y89F9XfG/add.png" :class="'icon_new ' + (isShow ? 'a0' : 'a00')" @tap.stop.prevent="btnPop"></image>
    </view>
</template>

<script>
// pages/effects/popMenu/index.js
//获取应用实例
var app = getApp();
export default {
    data() {
        return {
            isShow: null //是否已经弹出
        };
    },
    methods: {
        btnPop() {
            this.setData({
                isShow: !this.isShow
            });
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
