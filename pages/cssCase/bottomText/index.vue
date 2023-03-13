<template>
    <!-- pages/cssCase/bottomText/index.wxml -->
    <view class="flex-column j_b" style="min-height: 100vh">
        <view class="tabList flex j_a">
            <block v-for="(item, index) in tabList" :key="item.tabList">
                <view class="flex-column">
                    <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="work3_img"></image>
                    <view>{{ item.name }}</view>
                </view>
            </block>
        </view>
        <view class="last_tip">小程序案例,创作不易，喜欢的点个关注吧</view>
    </view>
</template>

<script>
// pages/cssCase/bottomText/index.js
export default {
    data() {
        return {
            tabList: [
                {
                    name: '关注'
                },
                {
                    name: 'star'
                },
                {
                    name: 'fork'
                }
            ]
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
