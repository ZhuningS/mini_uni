<template>
    <view>
        <!-- pages/cssCase/dengpao/index.wxml -->
        <view :class="'con ' + (off ? 'off' : '')" @tap.stop.prevent="close">
            <view :class="'box ' + (off ? 'off' : '')">
                <view :class="'box_view ' + (off ? 'off' : '')"></view>
            </view>
        </view>
        <view class="susu">welcome to susu blog</view>
        <view class="bottom">
            <view :class="'shadow ' + (off ? 'off' : '')"></view>
        </view>
    </view>
</template>

<script>
// pages/cssCase/dengpao/index.js
export default {
    data() {
        return {
            off: false //是否关闭灯泡
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
    methods: {
        close() {
            this.setData({
                off: !this.off
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
