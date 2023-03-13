<template>
    <view>
        <!-- pages/subPack/loading/index3.wxml -->
        <view class="tips">tips:些许案例是学习而来~</view>
        <view class="box">
            <view class="loader1"></view>
        </view>
        <view class="box">
            <view class="loader2"></view>
        </view>
        <view class="box">
            <view class="loader3"></view>
        </view>
        <view class="box">
            <view class="loader4">
                <view class="l-item"></view>
                <view class="l-item"></view>
                <view class="l-item"></view>
                <view class="l-item"></view>
            </view>
        </view>
        <view class="box">
            <view class="loader5">
                <view class="l-item"></view>
                <view class="l-item"></view>
                <view class="l-item"></view>
                <view class="l-item"></view>
            </view>
        </view>
        <view class="box">
            <view class="loader6">
                <view class="dot" :animation="alpha[0]"></view>
                <view class="dot" :animation="alpha[1]"></view>
                <view class="dot" :animation="alpha[2]"></view>
                <view class="dot" :animation="alpha[3]"></view>
                <view class="dot" :animation="alpha[4]"></view>
            </view>
        </view>
        <view class="box">
            <view class="loader7">
                <view style="--i: 1; --color: #82af77"></view>
                <view style="--i: 2; --color: #39b3d8"></view>
                <view style="--i: 3; --color: #416937"></view>
                <view style="--i: 4; --color: #84d488"></view>
            </view>
        </view>
        <view class="box">
            <view class="loader8">
                <view class="wave"></view>
            </view>
        </view>
        <view class="box">
            <view class="loader9">
                <view style="--i: 1; --color: #82a877"></view>
                <view style="--i: 2; --color: #39b3d8"></view>
                <view style="--i: 3; --color: #416937"></view>
                <view style="--i: 4; --color: #84d488"></view>
            </view>
        </view>
        <view class="box">
            <view class="loader10">
                <view class="a"></view>
                <view class="a"></view>
                <view class="a"></view>
                <view class="a"></view>
            </view>
        </view>
        <view class="box">
            <view class="loader11">
                <view class="box"></view>
                <view class="box"></view>
                <view class="box"></view>
                <view class="box"></view>
                <view class="box"></view>
                <view class="box"></view>
            </view>
        </view>

        <view class="box box1">
            <view class="loader12">
                <view class="s">
                    <view class="s1"></view>
                    <view class="s1"></view>
                    <view class="s1"></view>
                    <view class="s1"></view>
                </view>
            </view>
        </view>

        <view class="box">
            <view class="loader13"></view>
        </view>

        <view class="box">
            <view class="loader14"></view>
        </view>

        <view class="box box1">
            <view class="loader15"></view>
        </view>

        <view class="box">
            <view class="loader16"></view>
        </view>

        <view class="box box1">
            <view class="loader17"></view>
        </view>

        <view class="box box1">
            <view class="loader18">
                <view></view>
            </view>
        </view>

        <view class="box box1">
            <view class="loader19"></view>
        </view>

        <view class="box box2">
            <view class="loader20"></view>
            <view class="earth-orbit">
                <view class="moon"></view>
            </view>
        </view>

        <view class="box box2">
            <view class="loader21"></view>
            <view class="earth-orbit br1">
                <view class="moon br2"></view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/subPack/loading/index3.js
export default {
    data() {
        return {
            alpha: [1, 1, 1, 1, 1]
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var that = this;
        var _index = 0;
        var _alpha = that.alpha;
        var _speed = 300;
        var timer = setInterval(function () {
            var an_show = uni.createAnimation({});
            var an_hide = uni.createAnimation({});
            an_show.opacity(1).step({
                duration: _speed
            });
            an_hide.opacity(0).step({
                duration: _speed
            });
            _alpha[_index] = an_show;
            _alpha[_index == 0 ? 4 : _index - 1] = an_hide;
            that.setData({
                alpha: _alpha
            });

            if (_index == 4) {
                _index = 0;
            } else {
                _index = _index + 1;
            }
        }, _speed);
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
@import './index3.css';
</style>
