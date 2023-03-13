<template>
    <view>
        <!-- pages/wxCase/wclound/index.wxml -->

        <!-- 黑胶唱片唱针部分 -->
        <view class="stylusBox" :style="'top: ' + -stylusW * 0.5 + 'px'">
            <view class="stylus_1" :style="'width: ' + stylusW + 'px; height: ' + stylusW + 'px'">
                <view class="stylus_2">
                    <view class="stylus_3"></view>
                    <view class="stylus_4" :style="'top: ' + stylusW * 0.8 + 'px'">
                        <view class="stylus_5">
                            <view class="stylus_6"></view>
                            <view class="stylus_7">
                                <view class="stylus_8">
                                    <view class="stylus_9 stylus_10"></view>
                                    <view class="stylus_9 stylus_11"></view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 黑胶唱片部分 -->
        <view class="level_1" :style="'width: ' + panW * 0.9 + 'px; height: ' + panW * 0.9 + 'px'">
            <view class="level_2">
                <view class="level_3">
                    <view class="level_3">
                        <view class="level_3">
                            <view class="level_3">
                                <view class="level_3">
                                    <view class="level_3">
                                        <view class="level_3">
                                            <view class="level_3">
                                                <view class="level_3">
                                                    <view class="level_3">
                                                        <view class="level_3">
                                                            <view class="level_3">
                                                                <view class="level_3 level_4">
                                                                    <view class="level_3 level_5">
                                                                        <image src="http://singerimg.kugou.com/uploadpic/softhead/400/20160715/20160715112816750.jpg"></image>
                                                                    </view>
                                                                </view>
                                                            </view>
                                                        </view>
                                                    </view>
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/wxCase/wclound/index.js
export default {
    data() {
        return {
            stylusW: 0,
            panW: 0
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
