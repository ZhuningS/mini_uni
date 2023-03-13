<template>
    <view>
        <!-- pages/wxCase/newsSwiper/index.wxml -->
        <!-- 展示一条数据 -->
        <view class="mb20">
            <view class="tip">展示一条数据</view>
            <view class="flex-row s_box">
                <image src="/static/pages/wxCase/img/tixing.png" class="tx"></image>
                <swiper
                    class="new_swiper"
                    :vertical="true"
                    :autoplay="true"
                    :circular="true"
                    interval="4000"
                    duration="1500"
                    display-multiple-items="1"
                    easing-function="easeInOutCubic"
                >
                    <block v-for="(item, idx) in 5" :key="idx">
                        <swiper-item>
                            <view class="sw_text text_ellipsis">这是一条消息提示消息提示~</view>
                        </swiper-item>
                    </block>
                </swiper>
                <image src="/static/pages/wxCase/img/left_arr.png" class="left_arr"></image>
            </view>
        </view>
        <!-- 展示两条数据 -->
        <view class="mb20">
            <view class="tip">展示两条数据</view>
            <view class="draw_bot">
                <view class="flex-row j_c">
                    <view class="line"></view>
                    <view class="bot_title flex-column">展示两条数据</view>
                    <view class="line"></view>
                </view>
                <swiper class="bot_swiper" :vertical="true" :autoplay="true" :circular="true" interval="3000" display-multiple-items="2">
                    <block v-for="(item, idx) in 3" :key="idx">
                        <swiper-item>
                            <view class="flex" style="align-items: baseline">
                                <text :decode="true">2021-11-25 &nbsp;&nbsp;&nbsp;17:38</text>
                                <text :decode="true" class="bot_text text_ellipsis">&nbsp;&nbsp;123</text>
                            </view>
                        </swiper-item>
                    </block>
                </swiper>
            </view>
        </view>

        <!-- 数据少于display-multiple-items设置的数，就会出现不显示数据情况， 展示不定长数据，当总的数据长度大于2时，展示3条，反之展示数组的长度 -->
        <view class="mb20">
            <view class="tip">展示3条数据</view>
            <view class="mb20" style="color: red; font-size: 25rpx">
                数据少于display-multiple-items设置的数，就会出现不显示数据情况， 展示不定长数据，当总的数据长度大于2时，展示3条，反之展示数组的长度
            </view>
            <view class="draw_bot">
                <view class="flex-row j_c">
                    <view class="line"></view>
                    <view class="bot_title flex-column">展示不定长数据</view>
                    <view class="line"></view>
                </view>
                <swiper class="bot_swiper" :vertical="true" :autoplay="true" :circular="true" interval="3000" :display-multiple-items="d_num">
                    <block v-for="(item, idx) in data_list" :key="idx">
                        <swiper-item>
                            <view class="flex" style="align-items: baseline">
                                <text :decode="true">2021-11-25 &nbsp;&nbsp;&nbsp;17:38</text>
                                <text :decode="true" class="bot_text text_ellipsis">&nbsp;&nbsp;123</text>
                            </view>
                        </swiper-item>
                    </block>
                </swiper>
            </view>
        </view>
    </view>
</template>

<script>
// pages/wxCase/newsSwiper/index.js
export default {
    data() {
        return {
            data_list: ['测试数据一', '测试数据2', '测试数据3', '测试数据4', '测试数据5', '测试数据6'],
            d_num: ''
        };
    },
    onLoad: function (options) {
        let len = this.data_list.length;
        console.log(len);
        this.setData({
            d_num: len > 2 ? 3 : len
        });
    },
    onShow: function () {},
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
