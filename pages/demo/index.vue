<template>
    <view>
        <!-- parse <template is="skeleton" v-if="loading"></template> -->
        <block name="skeleton">
            <view class="sk-container">
                <view class="con1 flex-row">
                    <view>
                        <image class="order_icon sk-image"></image>
                    </view>
                    <view class="w_text">
                        <view class="item sk-transparent sk-text-14-2857-353 sk-text">订单编号：1q213232132</view>
                        <view class="item sk-transparent sk-text-14-2857-280 sk-text">物流公司：顺丰</view>
                        <view class="item sk-transparent sk-text-14-2857-810 sk-text">物流单号：73584y357349</view>
                    </view>
                </view>
                <view class="con4">
                    <view class="con4_top1 sk-transparent sk-text-14-2857-463 sk-text" style="background-position-x: 50%">物流信息</view>
                    <view class="con4_top3 flex">
                        <view class="con4_text">
                            <text class="con4_time sk-transparent sk-text-14-2857-817 sk-text">0 2020-06-20 18:33:42</text>
                            <view class="line_ellipsis text sk-transparent sk-text-14-2857-428 sk-text">
                                【揭阳市】已离开 广东揭阳分拨中心：发往啦啦啦啦说的话凤凰大：发往啦啦啦啦说的话凤凰大啦啦说的话凤凰大厦附近收到回复的就是
                            </view>
                            <view class="con4_icon">
                                <image class="chek_img sk-image"></image>
                            </view>
                        </view>
                    </view>
                    <view class="con4_top3 flex">
                        <view class="con4_text">
                            <text class="con4_time no sk-transparent sk-text-14-2857-554 sk-text">1 2020-06-20 18:33:42</text>
                            <view class="line_ellipsis text sk-transparent sk-text-14-2857-74 sk-text">
                                【揭阳市】已离开 广东揭阳分拨中心：发往啦啦啦啦说的话凤凰大厦附近收到回复的就是
                            </view>
                            <view class="con4_icon">
                                <image class="chek_img sk-image"></image>
                                <view class="line"></view>
                            </view>
                        </view>
                    </view>
                    <view class="con4_top3 flex">
                        <view class="con4_text">
                            <text class="con4_time no sk-transparent sk-text-14-2857-949 sk-text">1 2020-06-20 18:33:42</text>
                            <view class="line_ellipsis text sk-transparent sk-text-14-2857-157 sk-text">
                                【揭阳市】已离开 广东揭阳分拨中心：发往啦啦啦啦说的话凤凰大厦附近收到回复的就是
                            </view>
                            <view class="con4_icon">
                                <image class="chek_img sk-image"></image>
                                <view class="line"></view>
                            </view>
                        </view>
                    </view>
                    <view class="con4_top3 flex">
                        <view class="con4_text">
                            <text class="con4_time no sk-transparent sk-text-14-2857-862 sk-text">1 2020-06-20 18:33:42</text>
                            <view class="line_ellipsis text sk-transparent sk-text-14-2857-988 sk-text">
                                【揭阳市】已离开 广东揭阳分拨中心：发往啦啦啦啦说的话凤凰大厦附近收到回复的就是
                            </view>
                            <view class="con4_icon">
                                <image class="chek_img sk-image"></image>
                                <view class="line"></view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="suspension sk-pseudo sk-pseudo-circle">
                    <view class="suspen_title">
                        <image class="sk-image"></image>
                    </view>
                    <view class="suspen_title">
                        <image class="sk-image"></image>
                    </view>
                </view>
            </view>
        </block>
        <view v-else>
            <!-- 物流区 -->
            <view class="con1 flex-row">
                <view>
                    <image src="/static/img/order_icon5.png" class="order_icon"></image>
                </view>
                <view class="w_text">
                    <view class="item">订单编号：{{ expresslist.order_no }}</view>
                    <view class="item">物流公司：{{ expresslist.de_company }}</view>
                    <view class="item">物流单号：{{ expresslist.wuliu_no }}</view>
                </view>
            </view>
            <view class="con4" v-if="expresslist.list.length > 0">
                <view class="con4_top1">物流信息</view>
                <!-- 物流列表 -->
                <view class="con4_top3 flex" v-for="(item, index) in expresslist.list" :key="index">
                    <view class="con4_text">
                        <text :class="'con4_time ' + (index == 0 ? '' : 'no')">{{ item.status }} {{ item.time }}</text>

                        <view class="line_ellipsis text">{{ item.text }}</view>

                        <view class="con4_icon">
                            <image v-if="item.display == 0" :src="item.status == 1 ? '/img/w_icon4.png' : '/img/wuliu_icon2.png'" class="chek_img"></image>
                            <image v-if="item.display == 1" :src="item.status == 1 ? '/img/wuliu_icon3.png' : '/img/w_icon3.png'" class="chek_img"></image>
                            <image v-if="item.display == 2" :src="item.status == 1 ? '/img/wuliu_icon4.png' : '/img/w_icon2.png'" class="chek_img"></image>
                            <image v-if="item.display == 3" :src="item.status == 1 ? '/img/wuliu_icon5.png' : '/img/w_icon1.png'" class="chek_img"></image>
                            <view class="line" v-if="index != 0"></view>
                            <!-- 当第二个开始有一条物流的横线 -->
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 悬浮按钮 -->
        <view class="suspension">
            <view class="suspen_title">
                <image src="/static/img/suspen_icon01.png"></image>
            </view>
            <view class="suspen_title">
                <image src="/static/img/suspen_icon02.png"></image>
            </view>
        </view>
    </view>
</template>

<script>
// pages/logistics/index.js
export default {
    data() {
        return {
            aa: 0,
            loading: true,
            //物流情况
            expresslist: {
                order_no: '1q213232132',
                de_company: '顺丰',
                wuliu_no: '73584y357349',
                list: [
                    {
                        status: 0,
                        //状态完成
                        display: '0',
                        //已签收
                        status_name: '已签收',
                        text: '【揭阳市】已离开 广东揭阳分拨中心：发往啦啦啦啦说的话凤凰大：发往啦啦啦啦说的话凤凰大啦啦说的话凤凰大厦附近收到回复的就是',
                        time: '2020-06-20 18:33:42'
                    },
                    {
                        status: 1,
                        //
                        display: '1',
                        status_name: '待取件',
                        text: '【揭阳市】已离开 广东揭阳分拨中心：发往啦啦啦啦说的话凤凰大厦附近收到回复的就是',
                        time: '2020-06-20 18:33:42'
                    },
                    {
                        status: 1,
                        //状态完成
                        display: '2',
                        status_name: '派送中',
                        text: '【揭阳市】已离开 广东揭阳分拨中心：发往啦啦啦啦说的话凤凰大厦附近收到回复的就是',
                        time: '2020-06-20 18:33:42'
                    },
                    {
                        display: '3',
                        status: 1,
                        //状态完成
                        status_name: '运输中',
                        text: '【揭阳市】已离开 广东揭阳分拨中心：发往啦啦啦啦说的话凤凰大厦附近收到回复的就是',
                        time: '2020-06-20 18:33:42'
                    }
                ]
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        setTimeout(() => {
            this.setData({
                loading: false
            });
        }, 1500);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    methods: {
        aaFun() {
            console.log(111);
            this.setData({
                aa: 1
            });
        },

        blur() {
            this.setData({
                aa: 0
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
