<template>
    <view>
        <!-- pages/actualPage/list/index.wxml -->
        <view class="head_top"></view>
        <view class="head_tab flex-row j_c">
            <view class="flex-column flex_1 tab_item">
                <text class="tab_price">88.99</text>
                <text>今日收益</text>
            </view>
            <view class="flex-column flex_1 tab_item">
                <text class="tab_price">8899.99</text>
                <text>本月收益</text>
            </view>
            <view class="flex-column flex_1 tab_item">
                <text class="tab_price">88.99</text>
                <text>待提现收益</text>
            </view>
        </view>
        <view class="flex-row j_b tab_nv">
            <view class="flex-row">
                <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="nv_icon"></image>
                <text class="nv_text">规则说明</text>
            </view>
            <view class="flex-row">
                <view class="no_check flex-row" v-if="!checkd" @tap.stop.prevent="swithChange">
                    <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="check_icon"></image>
                </view>
                <view class="no_check checkd flex-row" v-else @tap.stop.prevent="swithChange">
                    <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="check_icon"></image>
                </view>
                <text class="nv_text">发放至导购账户</text>
            </view>
        </view>
        <view class="con">
            <view class="flex-row j_b mb36">
                <view class="flex-row tab_lsit">
                    <block v-for="(item, index) in tab_lsit" :key="item.list">
                        <view :class="'t_item ' + (index == curTab && 't_active')" @tap.stop.prevent="tabNav" :data-index="index">{{ item }}</view>
                    </block>
                </view>
                <view class="flex-row one_re j_c">
                    <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="c_icon"></image>
                    <text>一键领取</text>
                </view>
            </view>
            <view v-if="hasData">
                <block v-for="(item, index) in 20" :key="item.list">
                    <view class="c_item">
                        <view class="flex-row j_b">
                            <view class="flex">
                                <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" class="user_ava" />
                                <view class="user_name text_ellipsis">苏苏就是小苏苏</view>
                            </view>
                            <view class="item_staus error" v-if="false">提现失败</view>
                            <view class="item_staus" v-if="false">待提现</view>
                            <view class="item_staus flex-row" v-if="false">
                                <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="status_icon" />
                                <text>提现成功</text>
                            </view>
                            <view class="item_staus flex-row">
                                <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="status_icon" />
                                <text>提现等待中</text>
                            </view>
                        </view>
                        <view class="flex-row j_b item_time">
                            <view class="flex_1">出库流水号：1009028993</view>
                            <view>2022-01-10 18:00:00</view>
                        </view>
                        <view class="flex-row j_b">
                            <view>出库商品数量：9</view>
                            <view class="flex-row">
                                <view class="price">¥8.98</view>
                                <view class="flex-row one_re j_c" v-if="false">
                                    <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="c_icon"></image>
                                    <text>立即提现</text>
                                </view>
                            </view>
                        </view>
                        <view v-if="true" class="mt18">提现时间：2022-10-10 18:00:00</view>
                    </view>
                </block>
            </view>
            <view v-else class="flex-column">
                <image src="https://i.postimg.cc/pXDp6RXq/susu3.jpg" class="guide_none_img" mode="aspectFill" />
                <text class="guide_no_txt">暂无数据，抓紧去办理出库拿奖励吧~</text>
            </view>
        </view>
        <!-- 按钮 -->
        <image
            src="https://i.postimg.cc/pXDp6RXq/susu3.jpg"
            class="fix_btn"
            mode="aspectFill"
            :style="'top:' + buttonTop + 'px;left:' + buttonLeft + 'px;'"
            @touchmove.stop.prevent="buttonMove"
            @touchstart="buttonStart"
        />
    </view>
</template>

<script>
var startPoint;
export default {
    data() {
        return {
            checkd: false,
            tab_lsit: ['待领取', '已提现'],
            curTab: 0,
            hasData: true,
            //按钮位置参数
            buttonTop: 0,
            buttonLeft: 0,
            windowHeight: '',
            windowWidth: ''
        };
    },
    onLoad: function (options) {
        uni.getSystemInfo({
            success: (res) => {
                this.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth,
                    buttonTop: res.windowHeight * 0.6,
                    //这里定义按钮的初始位置
                    buttonLeft: res.windowWidth * 0.79 //这里定义按钮的初始位置
                });
            }
        });
    },
    onShow: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    methods: {
        swithChange() {
            this.setData({
                checkd: !this.checkd
            });
        },

        tabNav(e) {
            let { index } = e.currentTarget.dataset;

            if (this.curTab === index || index === undefined) {
                return false;
            } else {
                this.setData({
                    curTab: index
                });
            }
        },

        buttonStart: function (e) {
            startPoint = e.touches[0]; //获取拖动开始点
        },

        buttonMove: function (e) {
            var endPoint = e.touches[e.touches.length - 1]; //获取拖动结束点
            //计算在X轴上拖动的距离和在Y轴上拖动的距离

            var translateX = endPoint.clientX - startPoint.clientX;
            var translateY = endPoint.clientY - startPoint.clientY;
            startPoint = endPoint; //重置开始位置

            var buttonTop = this.buttonTop + translateY;
            var buttonLeft = this.buttonLeft + translateX; //判断是移动否超出屏幕

            if (buttonLeft + 50 >= this.windowWidth) {
                buttonLeft = this.windowWidth - 50;
            }

            if (buttonLeft <= 0) {
                buttonLeft = 0;
            }

            if (buttonTop <= 0) {
                buttonTop = 0;
            }

            if (buttonTop + 50 >= this.windowHeight) {
                buttonTop = this.windowHeight - 50;
            }

            this.setData({
                buttonTop: buttonTop,
                buttonLeft: buttonLeft
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
