<template>
    <view>
        <!-- pages/wxCase/swiper_ve/index.wxml -->
        <image
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-6fe02fca98e2b5e5d41ed0d206db3f1f_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638437301&t=7964813378f97508a545200f453d94ef"
            class="head_bg"
        ></image>
        <swiper class="new_swiper" :vertical="true" :autoplay="true" :circular="true" interval="2000" duration="1500" display-multiple-items="1" easing-function="easeInOutCubic">
            <block v-for="(item, idx) in members" :key="idx">
                <swiper-item>
                    <view class="box_item">
                        <text>{{ item }} 参与了买一赠一活动</text>
                    </view>
                </swiper-item>

                <!-- 当仅有一条数据的时候，添加一条数据 实现滚动 -->

                <swiper-item v-if="members.length === 1">
                    <view class="box_item">
                        <text>{{ item }} 参与了买一赠一活动</text>
                    </view>
                </swiper-item>
            </block>
        </swiper>
    </view>
</template>

<script>
// pages/wxCase/swiper_ve/index.js
export default {
    data() {
        return {
            members: ['苏苏就是小苏苏超级大奖']
        };
    },
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
