<template>
    <view>
        <!-- pages/wxCase/bgImg/index.wxml -->
        <view v-if="fn == 1">
            <image
                class="bg"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-aa0e39f579e586cb84e57737d7fe4a32_hd.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638418698&t=fa53073da2b4f8928fb5ec5f4474a01a"
            ></image>
            <view class="susu">welcome to susu blog</view>
        </view>
        <view v-if="fn == 2">
            <image
                class="bg1"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-6fe02fca98e2b5e5d41ed0d206db3f1f_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638437301&t=7964813378f97508a545200f453d94ef"
            ></image>
            <view class="susu">welcome to susu blog</view>
        </view>
        <view v-if="fn == 3">
            <view class="susu">welcome to susu blog</view>
        </view>
    </view>
</template>

<script>
// pages/wxCase/bgImg/index.js
export default {
    data() {
        return {
            fn: 2
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
