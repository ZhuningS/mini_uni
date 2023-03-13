<template>
    <view>
        <!-- pages/wxCase/loadingBar/index.wxml -->
        <button class="btn" @tap="action">加载按钮</button>
        <view class="progress" v-if="scwidth != 0" style="top: 0px">
            <view class="progress-bar" :style="'transform: translate3d(-' + (100 - scwidth) + '%, 0px, 0px);'"></view>
            <view class="progress-spinner"></view>
        </view>
        <view class="load_circle" v-if="scwidth != 0"></view>
        <!-- canvas -->
        <view class="loading-warp">
            <canvas class="canvas" canvas-id="canvasCircle"></canvas>
            <canvas class="canvas-mask" canvas-id="canvasRing"></canvas>
            <view class="rate">{{ step }}%</view>
        </view>
        <!-- 还有锥形渐变 -->
    </view>
</template>

<script>
// pages/wxCase/loadingBar/index.js
export default {
    data() {
        return {
            scwidth: 0,
            flag: false,
            step: 0
        };
    },
    onReady: function () {
        var that = this;
        var cxt = uni.createCanvasContext('canvasCircle');
        cxt.setLineWidth(6);
        cxt.setStrokeStyle('#eaeaea');
        cxt.setLineCap('round');
        cxt.beginPath();
        cxt.arc(100, 100, 96, 0, 2 * Math.PI, false);
        cxt.stroke();
        cxt.draw(); //加载动画

        var steps = 1;
        var startAngle = 1.5 * Math.PI;
        var endAngle = 0;
        var speed = 100;
        var sec = 100;
        function drawing(s, e) {
            var context = uni.createCanvasContext('canvasRing');
            context.setLineWidth(6);
            context.setStrokeStyle('orange');
            context.setLineCap('round');
            context.beginPath();
            context.arc(100, 100, 96, s, e, false);
            context.stroke();
            context.draw();
        }

        function drawLoading() {
            if (steps < 101) {
                that.setData({
                    step: steps
                });
                endAngle = (steps * 2 * Math.PI) / speed + startAngle;
                drawing(startAngle, endAngle);
                steps++;
            } else {
                clearInterval(this.interval);
            }
        }

        this.interval = setInterval(drawLoading, sec);
    },
    methods: {
        action() {
            if (!this.flag) {
                this.setData({
                    scwidth: this.scwidth + 3,
                    flag: true
                });

                if (this.scwidth < 100) {
                    setTimeout(() => {
                        this.actionDack();
                    }, 100);
                } else {
                    this.setData({
                        scwidth: 0
                    });
                }
            }
        },

        actionDack() {
            this.setData({
                scwidth: this.scwidth + 3
            });

            if (this.scwidth < 100) {
                setTimeout(() => {
                    this.actionDack();
                }, 100);
            } else {
                this.setData({
                    scwidth: 0,
                    flag: false
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
