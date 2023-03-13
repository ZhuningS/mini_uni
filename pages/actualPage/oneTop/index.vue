<template>
    <view>
        <!-- pages/actualPage/oneTop/index.wxml -->
        <view class="fix_btn" v-if="!no_scroll" @tap="goTop">
            <image class="icon" src="https://i.postimg.cc/NFDWnd3H/image.png"></image>
        </view>
        <block v-for="(item, index) in 40" :key="item.list">
            <view class="item">{{ index + 1 }}.苏苏</view>
        </block>
    </view>
</template>

<script>
// pages/actualPage/oneTop/index.js
export default {
    data() {
        return {
            no_scroll: true
        };
    },
    onLoad: function (options) {},
    onShow: function () {},
    onPageScroll: function (e) {
        if (e.scrollTop > 200) {
            this.setData({
                no_scroll: false
            });
        } else {
            this.setData({
                no_scroll: true
            });
        }
    },
    methods: {
        goTop: function (e) {
            if (uni.pageScrollTo) {
                uni.pageScrollTo({
                    scrollTop: 0
                });
            } else {
                uni.showModal({
                    title: '提示',
                    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
