<template>
    <!-- pages/wxCase/newsSwiper/index2.wxml -->
    <view class="box">
        <view class="box_i">
            <swiper
                class="swiper"
                :vertical="true"
                :autoplay="true"
                :circular="true"
                interval="3000"
                :style="'height: ' + (list.length > 6 ? '460' : list.length * 60) + 'rpx;'"
                :display-multiple-items="list.length > 6 ? 7 : list.length"
            >
                <block v-for="(item, idx) in list" :key="item.list">
                    <swiper-item>
                        <view class="flex item_sw" style="align-items: baseline">
                            <text :decode="true" class="record_time">{{ item.create_time }} &nbsp;&nbsp;&nbsp;</text>
                            <text :decode="true" class="record_name text_ellipsis">&nbsp;&nbsp;抽中了{{ item.prize_name }}</text>
                        </view>
                    </swiper-item>
                </block>
            </swiper>
        </view>
    </view>
</template>

<script>
// pages/wxCase/newsSwiper/index2.js
export default {
    data() {
        return {
            list: [
                {
                    create_time: '2021-1-1 12:00',
                    prize_name: '测试'
                },
                {
                    create_time: '2021-1-1 12:00',
                    prize_name: '测试'
                },
                {
                    create_time: '2021-1-1 12:00',
                    prize_name: '测试'
                },
                {
                    create_time: '2021-1-1 12:00',
                    prize_name: '测试'
                },
                {
                    create_time: '2021-1-1 12:00',
                    prize_name: '测试'
                },
                {
                    create_time: '2021-1-1 12:00',
                    prize_name: '测试'
                },
                {
                    create_time: '2021-1-1 12:00',
                    prize_name: '测试'
                },
                {
                    create_time: '2021-1-1 12:00',
                    prize_name: '测试'
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
@import './index2.css';
</style>
