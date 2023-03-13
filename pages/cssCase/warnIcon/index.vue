<template>
    <!-- pages/cssCase/warnIcon/index.wxml -->
    <view class="flex-column">
        <!-- 感叹号 -->
        <view class="circle flex-column">
            <view class="gantanhao"></view>
            <view class="points"></view>
        </view>
        <!-- 叉号 -->
        <view class="circle2 flex-column">
            <view class="line"></view>
        </view>

        <view class="btn">立即领取</view>

        <view class="btn1 flex-column pop_btn">
            <view class="btn_inner" @tap.stop.prevent="closeModal">我知道了</view>
        </view>
        <view class="ballon"></view>
        <view class="code_ball"><text>1</text></view>
        <!-- 箭头 -->
        <view class="left_arrow"></view>

        <!-- 白云 -->
        <view class="circle_yun"></view>

        <!-- 花朵 -->
        <view class="yellow">
            <view class="y"></view>
            <view class="d"></view>
        </view>
        <!-- 关闭按钮 -->
        <view class="close_icon"></view>
    </view>
</template>

<script>
// pages/cssCase/warnIcon/index.js
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
        closeModal() {
            console.log('占位：函数 closeModal 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
