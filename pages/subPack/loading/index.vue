<template>
    <view>
        <!-- pages/subPack/loading/index.wxml -->
        <view class="title">样式一：</view>
        <view class="ring">
            <view>sss</view>
            <view class="line"></view>
        </view>

        <view class="title">样式二：</view>
        <view class="box">
            <view class="loading">
                <view></view>
                <view></view>
                <view></view>
                <view></view>
                <view></view>
                <view></view>
                <view></view>
                <view></view>
            </view>
        </view>
        <view class="title">样式三：</view>
        <view class="box">
            <view class="circle-line">
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
            </view>
        </view>
        <view class="title">样式四：</view>
        <view class="box">
            <view class="circle-line1">
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
            </view>
        </view>
        <view class="title">样式五：</view>
        <view class="box">
            <view class="circle-line-spin">
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
            </view>
        </view>
        <view class="title">样式六：</view>
        <view class="box">
            <view class="circle-line2">
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
                <text></text>
            </view>
        </view>
        <view class="title">样式七：</view>
        <view class="box">
            <view class="circle_bx">
                <view></view>
            </view>
        </view>
        <view class="title">样式8：</view>
        <view class="box">
            <view class="loader-dots">
                <view></view>
                <view></view>
                <view></view>
                <view></view>
                <view></view>
            </view>
        </view>
        <view class="title">样式9：</view>
        <view class="box">
            <view class="loader-rainbow">
                <view class="loader-inner">
                    <view class="loader-line-wrap">
                        <view class="loader-line"></view>
                    </view>
                    <view class="loader-line-wrap">
                        <view class="loader-line"></view>
                    </view>
                    <view class="loader-line-wrap">
                        <view class="loader-line"></view>
                    </view>
                    <view class="loader-line-wrap">
                        <view class="loader-line"></view>
                    </view>
                    <view class="loader-line-wrap">
                        <view class="loader-line"></view>
                    </view>
                </view>
            </view>
        </view>

        <view class="title">样式10：</view>
        <view class="box">
            <view class="loader-line">
                <view class="bar"></view>
                <view class="bar"></view>
                <view class="bar"></view>
                <view class="bar"></view>
                <view class="bar"></view>
                <view class="ball"></view>
            </view>
        </view>
        <view class="title">样式11：(不是css写的，是一张gif)</view>
        <view class="box">
            <view class="wrapper">
                <view class="rubik-loader"></view>
            </view>
        </view>
        <view class="title">样式12：</view>
        <view class="box">
            <view>
                <view class="stick"></view>
                <view class="stick"></view>
                <view class="stick"></view>
                <view class="stick"></view>
                <view class="stick"></view>
                <view class="stick"></view>
                <view class="loading_text">Loading...</view>
            </view>
        </view>
        <view class="title">样式13：</view>
        <view class="box1">
            <view class="tan-loader">
                <view class="binary"></view>
                <view class="binary"></view>
                <view class="getting-there">LOADING...</view>
            </view>
        </view>

        <view class="title">样式14：</view>
        <view class="box">
            <view class="css-heart"></view>
        </view>
        <view class="title">样式15：</view>
        <view class="box">
            <view class="circle-spin">
                <text>加载中</text>
            </view>
        </view>
        <view class="title">样式16：</view>
        <view class="box">
            <view class="circle-add">
                <text class="a1"></text>
                <text class="a1"></text>
                <text class="a1"></text>
                <text class="a1"></text>
                <text class="a1"></text>
                <text class="a1"></text>
                <text class="a1"></text>
                <text class="a1"></text>
            </view>
        </view>
        <view class="title">样式17：</view>
        <view class="load1">
            <view class="rect1"></view>
            <view class="rect2"></view>
            <view class="rect3"></view>
            <view class="rect4"></view>
            <view class="rect5"></view>
        </view>

        <view class="title">样式18：</view>
        <view class="load1-circle">
            <view class="rect1"></view>
            <view class="rect2"></view>
            <view class="rect3"></view>
            <view class="rect4"></view>
            <view class="rect5"></view>
        </view>
    </view>
</template>

<script>
// pages/subPack/loading/index.js
export default {
    data() {
        return {
            progressValue: 0
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
