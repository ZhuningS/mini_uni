<template>
    <view>
        <!-- pages/wxCase/slot/index.wxml -->
        <slot-com :prop-a="dataFieldA" :prop-b="dataFieldB">
            <view slot="before">苏苏就是小苏苏将显示在 name="before"中的内容</view>
            <view slot="after">苏苏就是小苏苏将显示在 name="after"中的内容</view>
        </slot-com>
        <van-tabbar :active="active" @change="onChange">
            <van-tabbar-item icon="home-o">标签</van-tabbar-item>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
            <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar>
    </view>
</template>

<script>
import slotCom from '../components/slot/inex';
import vanTabbar from '@vant/weapp/tabbar/index';
import vanTabbarItem from '@vant/weapp/tabbar-item/index';
// pages/wxCase/slot/index.js
export default {
    components: {
        slotCom,
        vanTabbar,
        vanTabbarItem
    },
    data() {
        return {
            dataFieldA: '苏苏1',
            dataFieldB: '苏苏2',
            active: 0
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
    methods: {
        onChange(event) {
            // event.detail 的值为当前选中项的索引
            this.setData({
                active: event.detail
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
