<template>
    <view>
        <!-- pages/cssCase/cusCircleTab/index.wxml -->
        <view class="tabbar flex-row">
            <block v-for="(item, index) in 4" :key="index">
                <view class="bar flex-column">
                    <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" />
                    <text :class="index == 0 && 'ative'">菜单</text>
                </view>
            </block>
        </view>
        <view class="tabbar flex-row bg_balck">
            <block v-for="(item, index) in 5" :key="index">
                <view class="bar flex-column">
                    <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" />
                    <text style="color: var(--white)" :class="index == 0 && 'ative'">菜单</text>
                </view>
            </block>
        </view>
        <view class="tabbar flex-row">
            <block v-for="(item, index) in 5" :key="index">
                <view class="bar flex-column bar_center" v-if="index == 2">
                    <view class="bar_circle">
                        <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" />
                    </view>
                    <text>扫一扫</text>
                </view>

                <view class="bar flex-column" v-else>
                    <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" />
                    <text :class="index == 0 && 'ative'">菜单</text>
                </view>
            </block>
        </view>
        <view class="tabbar flex-row bg_balck">
            <block v-for="(item, index) in 5" :key="index">
                <view class="bar flex-column bar_center" v-if="index == 2">
                    <view class="bar_circle bg_balck">
                        <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" />
                    </view>
                    <text style="color: var(--white)">扫一扫</text>
                </view>

                <view class="bar flex-column" v-else>
                    <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" />
                    <text style="color: var(--white)" :class="index == 0 && 'ative'">菜单</text>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
// pages/cssCase/cusCircleTab/index.js
export default {
    data() {
        return {};
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
