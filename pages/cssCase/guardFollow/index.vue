<template>
    <!-- pages/cssCase/guardFollow/index.wxml -->
    <view v-if="!isShow">
        <view class="mask"></view>
        <view class="show_box">
            <view class="flex show_item">
                <view class="box_index">1</view>
                <view class="flex-row">
                    点击右上角
                    <view class="show_jiao flex-row">
                        <view></view>
                    </view>
                </view>
            </view>
            <view class="flex show_item">
                <view class="box_index">2</view>
                <view>点击"添加到我的小程序"</view>
            </view>
            <view class="flex show_item">
                <view class="box_index">3</view>
                <view>回到微信首页下拉列表中，找到我的小程序，打开苏苏的demo</view>
            </view>
            <view class="show_btn" @tap.stop.prevent="setEnter">记住了,我去试试</view>
        </view>
    </view>
</template>

<script>
// pages/cssCase/guardFollow/index.js
export default {
    data() {
        return {
            isShow: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        let flag = uni.getStorageSync('hasEnter');

        if (flag) {
            this.setData({
                isShow: true
            });
        }
    },
    methods: {
        setEnter() {
            this.setData({
                isShow: true
            });
            uni.setStorageSync('hasEnter', true);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
