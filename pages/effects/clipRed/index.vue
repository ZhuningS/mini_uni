<template>
    <view>
        <!-- pages/effects/clipRed/index.wxml -->
        <view class="flex">
            <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" class="user_avatar" />
            <view class="wallet_box" @tap.stop.prevent="showFun">
                <view class="flex-row j_c">
                    <image src="/static/pages/effects/img/red.png" class="red_icon" />
                    <view>恭喜发财，大吉大利</view>
                </view>
                <view class="wallet_tip">微信红包</view>
            </view>
        </view>
        <!-- 红包弹框 -->
        <view class="mask" v-if="show"></view>
        <view class="red_box flex-column" :animation="animationData" v-if="show">
            <view class="top flex-column" :animation="animationData1">
                <view class="flex-row">
                    <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" class="user_avatar_dia" />
                    <view>小苏苏的红包</view>
                </view>
                <view class="text">恭喜发财，大吉大利</view>
                <view class="top_radius">
                    <view class="open" @tap.stop.prevent="open" v-if="not_open">開</view>
                    <view v-else class="anim-rotate">
                        <view class="roate_box" style="transform: translateZ(-3px)">開</view>
                        <view class="roate_box roate_box_center" :style="'transform:translateZ(' + (index - 3) + 'px)'" v-for="(item, index) in 5" :key="index"></view>
                        <view class="roate_box roate_box_center" style="transform: translateZ(3px)">開</view>
                    </view>
                </view>
            </view>
            <view class="bottom" :animation="animationData2">
                <view class="line"></view>
                <view class="bottom_box"></view>
            </view>
            <image src="/static/img/close_icon.png" class="close_icon" @tap.stop.prevent="closeModal" />
        </view>
    </view>
</template>

<script>
// pages/effects/clipRed/index.js
export default {
    data() {
        return {
            show: false,
            not_open: true,
            animationData: {},
            animationData1: {},
            animationData2: {}
        };
    },
    methods: {
        closeModal() {
            this.slideIn(1);
            setTimeout(() => {
                this.setData({
                    show: false
                });
            }, 200);
        },

        showFun() {
            uni.showLoading({
                title: '加载中...',
                mask: true
            });
            setTimeout(() => {
                this.setData(
                    {
                        show: true
                    },
                    () => {
                        this.slideIn(0);
                    }
                );
                uni.hideLoading();
            }, 500);
        },

        slideIn(e) {
            var animation = uni.createAnimation({
                duration: 200,
                //动画的持续时间 默认400ms
                timingFunction: 'linear' //动画的效果 默认值是linear
            });
            this.animation = animation;

            if (e == 0) {
                this.animation.translate('-50%', '-50%').step();
            } else {
                this.animation.translate('-50%', '100%').step();
            }

            this.setData({
                animationData: this.animation.export()
            });
        },

        open() {
            this.setData(
                {
                    not_open: false
                },
                () => {
                    setTimeout(() => {
                        this.setData({
                            not_open: true
                        });
                        this.fadeOut(() => {
                            let animation = uni.createAnimation({
                                duration: 0,
                                timingFunction: 'step-end'
                            });
                            let animation1 = uni.createAnimation({
                                duration: 0,
                                timingFunction: 'step-end'
                            });
                            animation.opacity(1).step();
                            animation1.opacity(1).step();
                            this.setData({
                                show: false,
                                animationData1: animation.export(),
                                animationData2: animation1.export()
                            });
                        });
                    }, 1000);
                }
            );
        },

        fadeOut(fun) {
            var animation1 = uni.createAnimation({
                duration: 500,
                timingFunction: 'ease-in-out'
            });
            var animation2 = uni.createAnimation({
                duration: 500,
                timingFunction: 'linear'
            });
            animation1.translateY('-350%').step();
            animation2.translateY('300%').step();
            this.setData({
                animationData1: animation1.export(),
                animationData2: animation2.export()
            });
            setTimeout(() => {
                fun();
            }, 400);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
