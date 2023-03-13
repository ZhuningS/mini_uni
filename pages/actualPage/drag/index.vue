<template>
    <!-- pages/actualPage/drag/index.wxml -->
    <!-- buttonStart和buttonEnd一定不能用catch事件，否则按钮点击事件会失效 -->
    <view
        class="fix_btn"
        @tap="btnAction"
        @touchmove.stop.prevent="buttonMove"
        @touchstart="buttonStart"
        @touchend="buttonEnd"
        :style="'top:' + buttonTop + 'px;left:' + buttonLeft + 'px;'"
    >
        <image class="icon" src="https://i.postimg.cc/pXDp6RXq/susu3.jpg"></image>
    </view>
</template>

<script>
var startPoint;
export default {
    data() {
        return {
            //按钮位置参数
            buttonTop: 0,
            buttonLeft: 0,
            windowHeight: '',
            windowWidth: ''
        };
    },
    onLoad: function () {
        uni.getSystemInfo({
            success: (res) => {
                this.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth,
                    buttonTop: res.windowHeight * 0.6,
                    //这里定义按钮的初始位置
                    buttonLeft: res.windowWidth * 0.8
                });
            }
        });
    },
    methods: {
        btnAction() {},

        //按钮拖动事件
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
        },

        buttonEnd: function (e) {}
    }
};
</script>
<style>
@import './index.css';
</style>
