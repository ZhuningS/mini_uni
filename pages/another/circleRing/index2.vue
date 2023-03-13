<template>
    <!-- pages/another/circleRing/index2.wxml -->
    <view class="flex-row j_b rows">
        <view class="wrap">
            <view class="circle-box">
                <canvas class="circle" style="width: 200px; height: 200px" canvas-id="canvasArcCir"></canvas>
                <canvas class="circle" style="z-index: -5; width: 200px; height: 200px" canvas-id="canvasCircle"></canvas>
                <view class="draw_btn" @tap.stop.prevent="parseEventDynamicCode($event, no_click ? 'drawCircle' : '')">开始</view>
            </view>
        </view>
    </view>
</template>

<script>
//获取应用实例
var app = getApp();
var timer;
export default {
    data() {
        return {
            no_click: true
        };
    },
    onReady: function () {
        //创建并返回绘图上下文context对象。
        var cxt_arc = uni.createCanvasContext('canvasCircle');
        cxt_arc.setLineWidth(6);
        cxt_arc.setStrokeStyle('#ececec');
        cxt_arc.setLineCap('round');
        cxt_arc.beginPath();
        cxt_arc.arc(100, 100, 96, 0, 2 * Math.PI, false);
        cxt_arc.stroke();
        cxt_arc.draw();
    },
    onUnload() {
        clearInterval(timer);
    },
    methods: {
        drawCircle() {
            // if (timer) {
            // clearInterval(timer);
            // }
            function drawArc(s, e) {
                var ctx = uni.createCanvasContext('canvasArcCir');
                ctx.setFillStyle('#000');
                ctx.clearRect(0, 0, 200, 200);
                ctx.draw();
                var x = 100;
                var y = 100;
                var radius = 96;
                ctx.setLineWidth(5);
                ctx.setStrokeStyle('orange');
                ctx.setLineCap('round');
                ctx.beginPath();
                ctx.arc(x, y, radius, s, e, false);
                ctx.stroke();
                ctx.draw();
            }

            var step = 1;
            var startAngle = 1.5 * Math.PI;
            var endAngle = 0;
            var animation_interval = 1000;
            var n = 60;
            var animation = () => {
                if (step <= n) {
                    endAngle = (step * 2 * Math.PI) / n + 1.5 * Math.PI;
                    drawArc(startAngle, endAngle);
                    step++;
                    this.setData({
                        no_click: false
                    });
                } else {
                    clearInterval(timer);
                    this.setData({
                        no_click: true
                    });
                }
            };

            timer = setInterval(animation, animation_interval);
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
