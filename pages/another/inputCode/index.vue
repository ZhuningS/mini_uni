<template>
    <!-- pages/another/inputCode/index.wxml -->
    <view class="blocks">
        <view class="block">
            <view v-if="!numList.length" class="cursor"></view>
            <text v-if="numList.length">{{ numList[0] }}</text>
        </view>
        <view class="block">
            <view v-if="numList.length === 1" class="cursor"></view>
            <text v-if="numList.length >= 2">{{ numList[1] }}</text>
        </view>
        <view class="block">
            <view v-if="numList.length === 2" class="cursor"></view>
            <text v-if="numList.length >= 3">{{ numList[2] }}</text>
        </view>
        <view class="block">
            <view v-if="numList.length === 3" class="cursor"></view>
            <text v-if="numList.length >= 4">{{ numList[3] }}</text>
        </view>
        <view class="block">
            <view v-if="numList.length === 4" class="cursor"></view>
            <text v-if="numList.length >= 5">{{ numList[4] }}</text>
        </view>
        <view class="block">
            <view v-if="numList.length === 5" class="cursor"></view>
            <text v-if="numList.length >= 6">{{ numList[5] }}</text>
        </view>
        <input type="number" maxlength="6" :focus="true" :auto-focus="true" @input="getValue" />
    </view>
</template>

<script>
// pages/another/inputCode/index.js
export default {
    data() {
        return {
            numList: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var a;
        var b;
        a = new Array(0, 1, 2, 3, 4);
        b = a.join('');
        console.log(b);
        var s = 'abc,abcd,aaa';
        var ss = s.split(',');
        console.log(ss);
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
    methods: {
        getValue(e) {
            let value = e.detail.value;
            console.log(value);
            value.split(',');
            console.log(value);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
