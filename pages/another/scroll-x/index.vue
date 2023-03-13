<template>
    <view>
        <!-- pages/another/scroll-x/index.wxml -->
        <!-- currentTab < 4 ? 0 : currentTab - 3  保证滑动的时候 有一部分是在一屏内 -->
        <scroll-view class="scroll-wrapper" scroll-x :scroll-with-animation="true" :scroll-into-view="'item' + (currentTab < 4 ? 0 : currentTab - 3)">
            <view class="navigate-item" :id="'item' + index" :data-index="index" @tap="tabNav" v-for="(item, index) in tabList" :key="index">
                <view :class="'names ' + (currentTab === index ? 'active' : '')">{{ item.name }}</view>

                <view :class="'currtline ' + (currentTab === index ? 'active' : '')" v-if="currentTab === index"></view>
            </view>
        </scroll-view>
        <swiper :indicator-dots="false" @change="handleSwiper" :current="currentTab">
            <block v-for="(item, index) in tabList" :key="index">
                <swiper-item style="overflow: scroll">
                    <view class="tab_title">tab{{ currentTab + 1 }}内容</view>
                    <scroll-view
                        scroll-y
                        refresher-enabled
                        refresher-background="#F6F7F8"
                        :refresher-triggered="isRefresh"
                        @refresherrefresh="refresherpulling"
                        @scrolltolower="handleTolower"
                    >
                        <view class="swiper-item" v-for="(item, index1) in 20" :key="index1">第{{ index + 1 }}条数据~</view>
                    </scroll-view>
                </swiper-item>
            </block>
        </swiper>
    </view>
</template>

<script>
// pages/another/scroll-x/index.js
export default {
    data() {
        return {
            isRefresh: false,
            currentTab: 0,
            tabList: [
                {
                    name: 'tab一'
                },
                {
                    name: 'tab二'
                },
                {
                    name: 'tab三'
                },
                {
                    name: 'tab四'
                },
                {
                    name: 'tab五'
                },
                {
                    name: 'tab六'
                },
                {
                    name: 'tab七'
                }
            ]
        };
    },
    onLoad: function (options) {},
    onShow: function () {},
    methods: {
        tabNav(e) {
            let currentTab = e.currentTarget.dataset.index;
            this.setData({
                currentTab
            });
        },

        handleSwiper(e) {
            let { current, source } = e.detail;

            if (source === 'autoplay' || source === 'touch') {
                const currentTab = current;
                this.setData({
                    currentTab
                });
            }
        },

        handleTolower(e) {
            uni.showToast({
                title: '到底啦'
            });
        },

        refresherpulling() {
            uni.showLoading({
                title: '刷新中'
            });
            setTimeout(() => {
                this.setData({
                    isRefresh: false
                });
                uni.showToast({
                    title: '加载完成'
                });
            }, 1500);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
