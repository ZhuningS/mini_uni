<template>
    <view>
        <!-- pages/cssCase/rotateBall/index.wxml -->
        <view class="tips">学习案例</view>
        <view class="container circle">
            <view class="box1 circle center"></view>
            <view class="box2 circle center"></view>
            <view class="box3 circle center"></view>
            <view class="box4 circle center"></view>
            <view class="box5 circle center"></view>
            <view class="box6 circle">
                <view class="coil" style="--i: 0"></view>
                <view class="coil" style="--i: 1"></view>
                <view class="coil" style="--i: 2"></view>
                <view class="coil" style="--i: 3"></view>
                <view class="coil" style="--i: 4"></view>
                <view class="coil" style="--i: 5"></view>
                <view class="coil" style="--i: 6"></view>
                <view class="coil" style="--i: 7"></view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/cssCase/rotateBall/index.js
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
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
