<template>
    <view>
        <!-- pages/cssCase/btnAnim/index.wxml -->
        <view class="box">
            <view class="tbox" @touchstart="recodeClick" @touchend="recodeEnd">
                <image src="/static/pages/cssCase/img/reciord.png" class="record_icon" />
                <view class="ripple"></view>
                <view class="ripple" :animation="animationData1"></view>
                <view class="ripple" :animation="animationData2"></view>
            </view>
        </view>

        <view class="btn confirm bubble" @touchstart="audioPlay">点击按钮</view>

        <view class="box1">
            <view class="tbox1" @touchstart="recodeClick1" @touchend="recodeEnd1">
                <image src="/static/pages/cssCase/img/reciord.png" class="record_icon" />
                <view class="ripple1"></view>
                <view :class="'ripple1 ' + (animationStatus1 ? 'rippleAnimation1' : '')"></view>
                <view :class="'ripple1 ' + (animationStatus1 ? 'rippleAnimation2' : '')"></view>
                <view :class="'ripple1 ' + (animationStatus1 ? 'rippleAnimation3' : '')"></view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/cssCase/btnAnim/index.js
export default {
    data() {
        return {
            animationData1: '',
            animationData2: '',
            animationStatus: false,
            animationStatus1: false
        };
    },
    methods: {
        animationFun: function (animationData) {
            if (!this.animationStatus) {
                return;
            }

            var animation = uni.createAnimation({
                duration: 1000
            });
            animation.opacity(0).scale(2, 2).step();
            this[`${animationData}`] = animation.export();
        },

        animationEnd: function (animationData) {
            var animation = uni.createAnimation({
                duration: 0
            });
            animation.opacity(1).scale(1, 1).step();
            this[`${animationData}`] = animation.export();
        },

        recodeEnd: function () {
            //动画1结束
            var animation1 = uni.createAnimation({
                duration: 0
            });
            animation1.opacity(1).scale(1, 1).step(); //动画2结束

            var animation2 = uni.createAnimation({
                duration: 0
            });
            animation2.opacity(1).scale(1, 1).step();
            this.setData({
                animationData1: animation1.export(),
                animationData2: animation2.export(),
                animationStatus: false
            });
        },

        recodeClick: function () {
            this.setData({
                animationStatus: true
            });
            this.animationFun('animationData1');
            setTimeout(() => {
                this.animationFun('animationData2');
            }, 500);
            setTimeout(() => {
                this.animationRest();
            }, 1000);
        },

        animationRest: function () {
            //动画重置
            this.animationEnd('animationData1');
            setTimeout(() => {
                this.animationEnd('animationData2');
            }, 500);
            setTimeout(() => {
                if (this.animationStatus) {
                    this.recodeClick();
                }
            }, 100);
        },

        recodeEnd1: function () {
            this.setData({
                animationStatus1: false
            });
        },

        recodeClick1: function () {
            this.setData({
                animationStatus1: true
            });
        },

        audioPlay() {
            console.log('占位：函数 audioPlay 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
