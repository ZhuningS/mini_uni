<template>
    <view>
        <!-- pages/wxCase/popCust/index.wxml -->
        <view class="mask" @touchmove.stop.prevent="catmove"></view>
        <view class="box" @touchmove.stop.prevent="catmove">
            <view class="g_box flex-column">
                <view class="g_tab flex j_a">
                    <view :class="'tab-item ' + (currentTab == 0 ? 'on' : '')" data-current="0" @tap="swichNav">选项一</view>
                    <view :class="'tab-item ' + (currentTab == 1 ? 'on' : '')" data-current="1" @tap="swichNav">选项二</view>
                </view>
                <view class="c_box flex-row">
                    <image src="/static/pages/wxCase/img/1.png" class="con_title_bg" />
                    <view class="c_box_border">
                        <block v-if="hasData">
                            <view class="c_title flex-row j_a">
                                <view class="w2">排名</view>
                                <view class="w4">昵称</view>
                                <view class="w4">得分</view>
                            </view>
                            <scroll-view :scroll-y="true" class="con_scroll">
                                <block v-for="(item, index) in 17" :key="item.list">
                                    <view class="c_item flex j_a">
                                        <view class="c_index text_ellipsis">{{ index + 1 }}</view>
                                        <view class="name text_ellipsis">如***风</view>
                                        <view class="chose text_ellipsis">87389</view>
                                    </view>
                                </block>
                            </scroll-view>
                        </block>
                        <block v-else></block>
                    </view>
                </view>
                <view class="flex-row">
                    <image src="/static/pages/wxCase/img/now_text.png" class="now_text" />
                    <text class="font_text">---</text>
                </view>
                <!-- 关闭按钮 -->
                <image src="/static/pages/wxCase/img/close11.png" class="close_icon"></image>
            </view>
        </view>
    </view>
</template>

<script>
// pages/wxCase/popCust/index.js
export default {
    data() {
        return {
            currentTab: 0,
            hasData: true
        };
    },
    onLoad: function (options) {},
    methods: {
        catmove() {
            return false;
        },

        swichNav: function (e) {
            var that = this;

            if (this.currentTab === e.target.dataset.current) {
                return false;
            } else {
                that.setData({
                    currentTab: e.target.dataset.current
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
