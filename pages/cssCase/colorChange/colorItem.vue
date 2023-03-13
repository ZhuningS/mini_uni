<template>
    <!-- pages/cssCase/colorChange/colorItem.wxml -->

    <view class="box" :style="'height:' + Height + 'px'">
        <view class="boxitem" :style="'background-color:' + item" :data-color="item" @tap="copycolor" v-for="(item, index) in colors" :key="index"></view>
    </view>
</template>

<script>
// pages/functions/color/choice/choice.js
const app = getApp();
export default {
    data() {
        return {
            Height: app.globalData.Height,
            //屏幕高度
            colors: '' //颜色集合
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData({
            colors: JSON.parse(options.color).colors
        });
    },
    methods: {
        copycolor: function (e) {
            uni.setClipboardData({
                data: e.currentTarget.dataset.color,
                success: (res) => {
                    uni.showToast({
                        title: e.currentTarget.dataset.color,
                        duration: 1000,
                        icon: 'none'
                    });
                }
            });
        }
    }
};
</script>
<style>
@import './colorItem.css';
</style>
