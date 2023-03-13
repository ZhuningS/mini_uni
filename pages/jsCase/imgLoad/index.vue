<template>
    <view>
        <!-- pages/jsCase/imgLoad/index.wxml -->
        <image src="https://i.postimg.cc/k5cyysKQ/123123.png" @load="imageLoad" :style="'width:' + imgwidth + 'rpx; height:' + imgheight + 'rpx;'"></image>
    </view>
</template>

<script>
//获取应用实例
var app = getApp();
export default {
    data() {
        return {
            screenWidth: 0,
            screenHeight: 0,
            imgwidth: 0,
            imgheight: 0
        };
    },
    onLoad: function () {
        var that = this;
        uni.getSystemInfo({
            success: function (res) {
                console.log(res);
                that.setData({
                    screenHeight: res.windowHeight,
                    screenWidth: res.windowWidth
                });
            }
        });
    },
    methods: {
        imageLoad: function (e) {
            console.log(e);
            var that = this;
            var $width = e.detail.width;
            var //获取图片真实宽度
                $height = e.detail.height;
            var ratio = $width / $height; //图片的真实宽高比例
            var viewWidth = 750;
            var //设置图片显示宽度，
                viewHeight = 750 / ratio; //计算的高度值
            this.setData({
                imgwidth: viewWidth,
                imgheight: viewHeight
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
