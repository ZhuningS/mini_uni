<template>
    <view>
        <!-- pages/another/subIndex/index.wxml -->
        <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px" :value="value" @change="bindChange">
            <picker-view-column>
                <view style="line-height: 50px; text-align: center" v-for="(item, index) in years" :key="item.years">{{ item }}年</view>
            </picker-view-column>
            <picker-view-column>
                <view style="line-height: 50px; text-align: center" v-for="(item, index) in months" :key="item.months">{{ item }}月</view>
            </picker-view-column>
            <picker-view-column>
                <view style="line-height: 50px; text-align: center" v-for="(item, index) in days" :key="item.days">{{ item }}日</view>
            </picker-view-column>
            <picker-view-column>
                <view class="icon-container">
                    <image class="picker-icon" src="/static/img/star-o.png" />
                </view>
                <view class="icon-container">
                    <image class="picker-icon" src="/static/img/star-o.png" />
                </view>
            </picker-view-column>
        </picker-view>
    </view>
</template>

<script>
// pages/another/subIndex/index.js
const date = new Date();
const years = [];
const months = [];
const days = [];

for (let i = 1990; i <= date.getFullYear(); i++) {
    years.push(i);
}

for (let i = 1; i <= 12; i++) {
    months.push(i);
}

for (let i = 1; i <= 31; i++) {
    days.push(i);
}

export default {
    data() {
        return {
            years,
            year: date.getFullYear(),
            months,
            month: 2,
            days,
            day: 2,
            value: [9999, 1, 1],
            isDaytime: true
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
        bindChange(e) {
            const val = e.detail.value;
            this.setData({
                year: this.years[val[0]],
                month: this.months[val[1]],
                day: this.days[val[2]],
                isDaytime: !val[3]
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
