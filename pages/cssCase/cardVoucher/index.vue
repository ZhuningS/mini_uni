<template>
    <view>
        <!-- pages/cssCase/cardVoucher/index.wxml -->
        <!-- 样式1 -->
        <view class="card-box">
            <view class="card-name">苏苏就是小苏苏哇</view>
            <view class="card-banner">VIP</view>
            <view class="card-content">
                <text>剩余</text>
                <text>88888</text>
                <text>元</text>
            </view>
            <view class="flex-row j_c card-btm">
                <view class="flex-column j_c card-btm-item">
                    <text>已获得奖项</text>
                    <text>888个</text>
                </view>
                <view class="flex-column j_c card-btm-item">
                    <text>已出售</text>
                    <text>1008个</text>
                </view>
                <view class="flex-column j_c card-btm-item">
                    <text>已买入</text>
                    <text>999个</text>
                </view>
            </view>
        </view>
        <!-- 样式2 -->
        <view class="coupon-box flex">
            <view class="cou-banner">即将过期</view>
            <view class="cou-left flex-row j_c">
                <view>
                    <text>888</text>
                    <text>元</text>
                </view>
            </view>
            <view class="cou-right flex-row">
                <view>
                    <view>苏苏就是小苏苏哇--苏苏</view>
                    <view class="cou-right-time">剩余 23:59:59</view>
                </view>
            </view>
        </view>
        <!-- 样式3 -->
        <view class="card-3"></view>
        <!-- 样式4 -->
        <view class="card-4"></view>
    </view>
</template>

<script>
// pages/cssCase/cardVoucher/index.js
export default {
    data() {
        return {};
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
