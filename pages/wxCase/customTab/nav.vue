<template>
    <view>
        <!-- pages/wxCase/customTab/nav.wxml -->
        <template name="nav">
            <view class="nav_link" @tap="fn">
                <button :class="'defalut_btn ' + (current == 0 ? '' : 'on_cor')">
                    <block v-if="style == 0">
                        <icon :class="'iconfont ' + ico + ' del_ico idx_ico'"></icon>
                        <text class="txt">{{ name }}</text>
                    </block>
                    <block v-if="style == 1">
                        <view class="plus_wp">
                            <image src="/static/pages/images/plus_ico.png" class="plus_ico" />
                        </view>
                        <text class="txt txt_fb">{{ name }}</text>
                    </block>
                </button>
            </view>
        </template>
    </view>
</template>

<script>
// pages/wxCase/customTab/nav.js
export default {
    data() {
        return {
            current: 0,
            style: 0,
            ico: '',
            name: ''
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
        fn() {
            console.log('占位：函数 fn 未声明');
        }
    }
};
</script>
<style>
@import './nav.css';
</style>
