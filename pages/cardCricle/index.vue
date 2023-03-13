<template>
    <view>
        <!-- pages/cardCricle/index.wxml -->
        <view class="con">
            <view class="circle1"></view>
            <view class="circle2"></view>
            <view class="top1">第1个</view>
            <view class="top2 flex-row j_b">
                <view class="flex-column">
                    <text class="text1 color">晴朗</text>
                    <text class="text2">天气</text>
                </view>
                <view class="line"></view>
                <view class="flex-column">
                    <text class="text1 color">2021.6.23</text>
                    <text class="text2">日期</text>
                </view>
            </view>
            <view class="line2"></view>

            <view class="top3">
                <view class="title flex-row">
                    <view class="title1"></view>
                    <view class="flex-row j_b">
                        <view class="title2">你好</view>
                        <view class="title2">哈喽</view>
                    </view>
                </view>
                <view class="item" v-for="(item, index) in 2" :key="index">
                    <view class="title flex-row">
                        <view class="title1 text3 ft">巴啦啦能量</view>
                        <view class="flex-row j_b">
                            <view class="text3 color title2">优秀</view>
                            <view class="text3 color title2">良好嘻嘻</view>
                        </view>
                    </view>

                    <view class="title flex-row" v-for="(item, index1) in 2" :key="index1">
                        <view class="title1 text3">嗯嗯嗯</view>

                        <view class="flex-row j_b">
                            <view class="text3 title2">989999</view>
                            <view class="text3 title2">1000</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view class="con">
            <view class="circle3"></view>
            <view class="circle4"></view>
            <view class="circle5"></view>
            <view class="circle6"></view>
            <view class="top1">第2个</view>
            <view class="top2 flex-row j_b">
                <view class="flex-column">
                    <text class="text1 color">晴朗</text>
                    <text class="text2">天气</text>
                </view>
                <view class="line"></view>
                <view class="flex-column">
                    <text class="text1 color">2021.6.23</text>
                    <text class="text2">日期</text>
                </view>
            </view>
            <view class="line2"></view>

            <view class="top3">
                <view class="title flex-row">
                    <view class="title1"></view>
                    <view class="flex-row j_b">
                        <view class="title2">你好</view>
                        <view class="title2 title3">哈喽</view>
                    </view>
                </view>
                <view class="item" v-for="(item, index) in 2" :key="index">
                    <view class="title flex-row">
                        <view class="title1 text3 ft">巴啦啦能量</view>
                        <view class="flex-row j_b">
                            <view class="text3 color title2">优秀</view>
                            <view class="text3 color title2">良好</view>
                        </view>
                    </view>

                    <view class="title flex-row" v-for="(item, index1) in 2" :key="index1">
                        <view class="title1 text3">嗯嗯嗯</view>

                        <view class="flex-row j_b">
                            <view class="text3 title2">989999</view>
                            <view class="text3 title2">1000</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="up_kong"></view>
    </view>
</template>

<script>
// pages/cardCricle/index.js
export default {
    data() {
        return {
            selected: 0
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
    onShow: function () {
        //自定义的tabbar
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            });
        }
    },
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
