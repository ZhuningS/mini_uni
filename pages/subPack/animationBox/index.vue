<template>
    <!-- pages/subPack/animationBox/index.wxml -->
    <view class="con">
        <!-- 标题 -->
        <view class="title">开奖啦，大家一起瓜分money吧</view>

        <!-- 动画盒子 -->
        <view class="box">
            <view class="circle" :animation="animationData1"></view>
            <view class="arrows" :animation="animationData1">
                <view class="arrow-1">
                    <image src="/static/img/arrow.png"></image>
                </view>
                <view class="arrow-2">
                    <image src="/static/img/arrow.png"></image>
                </view>
                <view class="arrow-3">
                    <image src="/static/img/arrow.png"></image>
                </view>
                <view class="arrow-4">
                    <image src="/static/img/arrow.png"></image>
                </view>
                <view class="arrow-5">
                    <image src="/static/img/arrow.png"></image>
                </view>
            </view>

            <view class="nums" :animation="animationData2">
                <view class="num1">1</view>
                <view class="num2">2</view>
                <view class="num3">3</view>
                <view class="num4">4</view>
                <view class="num5">5</view>
            </view>

            <view class="center" @tap.stop.prevent="toPart">
                <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg"></image>
            </view>
        </view>

        <!-- 卡片 -->
        <view class="card_box" :animation="animationData3">
            <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" class="card_box_image"></image>
            <view class="card_va flex-column">
                恭喜中奖
                <image src="/static/img/close_icon.png" class="close_icon" @tap.stop.prevent="init"></image>
            </view>
        </view>
    </view>
</template>

<script>
// pages/subPack/animationBox/index.js
export default {
    data() {
        return {
            animationData1: {},
            // 三个动画栈
            animationData2: {},
            animationData3: {}
        };
    },
    onLoad: function (options) {},
    onShow: function () {
        this.init();
    },
    methods: {
        init() {
            this.animation1 = uni.createAnimation({
                timingFunction: 'ease',
                duration: 50
            });
            this.animation2 = uni.createAnimation({
                timingFunction: 'ease',
                duration: 50
            });
            this.animation3 = uni.createAnimation({
                timingFunction: 'ease',
                duration: 50
            }); // 初始化

            this.animation1.opacity(0.2).step(); //scale必须放在opcity的后面

            this.animation2.scale(1).step({
                duration: 2000
            });
            this.animation3.scale(0).step(); // 导出动画栈

            this.animationData1 = this.animation1.export();
            this.animationData2 = this.animation2.export();
            this.animationData3 = this.animation3.export();
            this.setData({
                animationData1: this.animationData1,
                animationData2: this.animationData2,
                animationData3: this.animationData3
            });
        },

        toPart() {
            this.animation1.opacity(1).step();
            this.animation1.scale(0.1).step({
                duration: 2000,
                delay: 2900
            });
            this.animation2.rotate(360).step({
                duration: 3000
            });
            this.animation2.scale(0.1).step({
                duration: 2000
            });
            this.animation3.scale(1.2).step({
                duration: 1000,
                delay: 4000
            });
            this.animation3.scale(1).step({
                duration: 300
            }); // 导出动画栈

            this.animationData1 = this.animation1.export();
            this.animationData2 = this.animation2.export();
            this.animationData3 = this.animation3.export();
            this.setData({
                animationData1: this.animationData1,
                animationData2: this.animationData2,
                animationData3: this.animationData3
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
