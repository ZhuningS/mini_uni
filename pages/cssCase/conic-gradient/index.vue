<template>
    <view>
        <!-- <web-view src="https://blog.csdn.net/qq_48085286/article/details/119976079?spm=1001.2014.3001.5501"></web-view> -->
        <view class="title">圆环进度条</view>
        <view class="a" :style="'background-image: conic-gradient(from -180deg,#a8c992 ' + progressValue + '%,#ebebeb 0%)'">
            <text class="a-value">{{ progressValue }}%</text>
        </view>

        <view class="title">颜色彩盘</view>
        <view class="b"></view>

        <view class="title">饼图</view>
        <view class="c"></view>

        <view class="title">棋盘效果</view>
        <view class="d"></view>

        <view class="title">实现扇形扫描效果</view>
        <view class="e"></view>

        <view class="title">loading加载效果</view>
        <view class="f"></view>

        <view class="title">实现菱形背景图</view>
        <view class="g"></view>

        <view class="title">重复conic-gradient</view>
        <view class="h"></view>

        <view class="title">表盘信用分</view>
        <view class="back">
            <view class="dots"></view>
        </view>
    </view>
</template>

<script>
// pages/cssCase/conic-gradient/index.js
export default {
    data() {
        return {
            progressValue: 0
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let intervalId = setInterval(() => {
            if (this.progressValue < 100) {
                this.progressValue++;
                this.setData({
                    progressValue: this.progressValue
                });
            } else {
                clearInterval(intervalId);
            }
        }, 25);
    },
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
