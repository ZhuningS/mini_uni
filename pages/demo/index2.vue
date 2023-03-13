<template>
    <view>
        <view v-if="hasData">
            <view class="head">
                <text>顺丰快递 {{ wuliu_no }}</text>
                <text class="h_copy" @tap.stop.prevent="copyId">复制</text>
            </view>
            <view class="con">
                <block v-for="(item, index) in expresslist.list" :key="item.list">
                    <view class="l_item flex">
                        <view class="l_left">
                            <view class="l_2_img" v-if="item.status == 0">
                                <image src="/static/img/wuliu_icon2.png" class="l_2_img"></image>
                            </view>
                            <view v-else class="l_2_img flex-column">
                                <view class="l_circle"></view>
                            </view>
                        </view>
                        <view>
                            <text class="l_name">{{ item.status_name }} {{ item.time }}</text>
                            <view class="l_text line_ellipsis">{{ item.text }}</view>
                        </view>
                    </view>
                </block>
            </view>
        </view>
        <view v-else>
            <image src="/static/img/no_logistic.png" class="no_data"></image>
            <text class="no_tip">暂无数据</text>
        </view>

        <suspension></suspension>
    </view>
</template>

<script>
// pages/logistic/index.js
export default {
    data() {
        return {
            hasData: true,
            wuliu_no: '532465645645646',
            //物流情况
            expresslist: {
                list: [
                    {
                        status: 0,
                        //状态完成
                        status_name: '派送中',
                        text: '业务员苏苏（13211122211）正在为您派件，【95123 为顺丰快递外呼专属号码，请放心接听！】业务员周陆陆（13211122211）正在为您派件，【95123 为顺丰快递外呼专属号码，请放心接听！】',
                        time: '2020-06-20 18:33:42'
                    },
                    {
                        status: 1,
                        //
                        status_name: '运输中',
                        text: '业务员苏苏（13211122211）正在为您派件，【95123 为顺丰快递外呼专属号码，请放心接听！】',
                        time: '2020-06-20 18:33:42'
                    },
                    {
                        status: 1,
                        //状态完成
                        status_name: '已发货',
                        text: '业务员苏苏（13211122211）正在为您派件，【95123 为顺丰快递外呼专属号码，请放心接听！】',
                        time: '2020-06-20 18:33:42'
                    },
                    {
                        status: 1,
                        //状态完成
                        status_name: '配货中',
                        text: '业务员苏苏（13211122211）正在为您派件，【95123 为顺丰快递外呼专属号码，请放心接听！】',
                        time: '2020-06-20 18:33:42'
                    }
                ]
            }
        };
    },
    onLoad: function (options) {},
    onShow: function () {},
    methods: {
        copyId() {
            uni.setClipboardData({
                data: this.wuliu_no,

                success() {}
            });
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
