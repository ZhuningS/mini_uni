<template>
    <!-- pages/jsCase/shaing/index.wxml -->
    <view @tap="btnFun">点击</view>
</template>

<script>
// pages/jsCase/shaing/index.js
export default {
    data() {
        return {};
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        btnFun: function () {
            // wx.vibrateShort();  // 1、使手机震动15ms,仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
            //或者
            uni.vibrateLong(); // 2、使手机震动400ms
        }
    }
};
</script>
<style>
@import './index.css';
</style>
