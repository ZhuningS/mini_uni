<template>
    <!-- pages/cssCase/iconFall/index.wxml -->
    <view @tap="handleTap">
        <canvas class="myCanvas" :style="'width: 100%; height:' + canvasHeight + 'px'" canvas-id="myCanvas"></canvas>
        <scroll-view class="scroll-view" :scroll-y="true" style="height: 100%"></scroll-view>
    </view>
</template>

<script>
// pages/newYear2/newYear2.js
var fall = require('../utils/fall.js');

const W = uni.getSystemInfoSync().windowWidth;
const H = uni.getSystemInfoSync().windowHeight;
const newYearImgs = [
    '/static/pages/cssCase/img/no_eye.png',
    '/static/pages/cssCase/img/no_eye.png',
    '/static/pages/cssCase/img/no_eye.png',
    '/static/pages/cssCase/img/no_eye.png'
];
export default {
    data() {
        return {
            canvasHeight: 0
        };
    },
    onLoad: function (options) {
        let ctx = uni.createCanvasContext('myCanvas');
        fall(ctx, W, H, newYearImgs, {
            // duration: 15,
            G: 2
        });
    },
    onShow: function () {
        this.setData({
            canvasHeight: H
        });
    },
    methods: {
        //点透canvas   pointer-events: none;
        handleTap() {
            console.log('点透canvas');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
