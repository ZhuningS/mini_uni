<template>
    <view>
        <!-- pages/cssCase/cardTrans/index.wxml -->
        <view class="card">
            <view class="t_box">
                <view class="top">
                    <view class="title">
                        <span></span>
                        <text>苏苏</text>
                        <span></span>
                    </view>
                    <view class="tips"></view>
                </view>
            </view>
            <view class="b_box">
                <view class="bottom"></view>
            </view>
        </view>

        <!-- new -->
        <view class="card">
            <view class="t_box">
                <view class="top">
                    <view class="title">
                        <span></span>
                        <text>活动规则</text>
                        <span></span>
                    </view>
                    <view class="tips">
                        <rich-text :nodes="activity.b_rules"></rich-text>
                    </view>
                </view>
            </view>
            <view class="b_box">
                <view class="bottom"></view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/cssCase/cardTrans/index.js
export default {
    data() {
        return {
            activity: {
                b_rules: ''
            }
        };
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
