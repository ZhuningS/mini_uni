<template>
    <view>
        <!-- pages/wxCase/svgCircle/index.wxml -->
        <!-- <svg width="150px" height="150px" class="svg">
  <circle r="70" cy="75" cx="75" stroke-width="8" stroke="#EAEFF4" stroke-linejoin="round" stroke-linecap="round"
    fill="none" />
  <circle class="progress" r="70" cy="75" cx="75" stroke-width="8" stroke="#1593FF" stroke-linejoin="round"
    stroke-linecap="round" fill="none" stroke-dashoffset="0px" stroke-dasharray="471px" />
</svg> -->

        <!-- <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
</svg> -->

        <van-circle :value="30" :text="'完成率' + 76 + '%'" />
        <van-circle :value="value" stroke-width="6" text="宽度定制" />

        <van-circle :value="value" layer-color="#eeeeee" color="#ee0a24" text="颜色定制" />

        <van-circle :value="value" :color="gradientColor" text="渐变色" />

        <van-circle :value="value" color="#07c160" :clockwise="false" text="逆时针" />
        <van-circle :value="value" size="120" text="大小定制" />
    </view>
</template>

<script>
import vanCircle from '@vant/weapp/circle/index';
// pages/wxCase/svgCircle/index.js
export default {
    components: {
        vanCircle
    },
    data() {
        return {
            value: 25,
            gradientColor: {
                '0%': '#ffd01e',
                '100%': '#ee0a24'
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
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
