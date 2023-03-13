<template>
    <view>
        <!-- pages/effects/popMenu/index.wxml -->
        <image src="https://i.postimg.cc/Gpm5bmJz/image.png" :animation="a1" class="icon"></image>
        <image src="https://i.postimg.cc/dVshQb74/image.png" :animation="a2" class="icon"></image>
        <image src="https://i.postimg.cc/prQdRCRw/image.png" :animation="a3" class="icon"></image>
        <image src="https://i.postimg.cc/y89F9XfG/add.png" :animation="start" class="icon_new" @tap.stop.prevent="btnPop"></image>
    </view>
</template>

<script>
// pages/effects/popMenu/index.js
//获取应用实例
var app = getApp();
export default {
    data() {
        return {
            isShow: false,
            //是否已经弹出
            start: {},
            //旋转动画
            a1: {},
            a2: {},
            a3: {}
        };
    },
    methods: {
        btnPop() {
            this.setData({
                isShow: !this.isShow
            });

            if (this.isShow) {
                startPop.call(this);
            } else {
                endPop.call(this);
            }
        }
    }
}; //弹出动画

function startPop() {
    var start = uni.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
    });
    var a1 = uni.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
    });
    var a2 = uni.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
    });
    var a3 = uni.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
    });
    start.rotateZ(180).step();
    a2.translate(-120, 0).rotateZ(360).opacity(1).step();
    a3.translate(-65, 70).rotateZ(360).opacity(1).step();
    this.setData({
        start: start.export(),
        a1: a1.export(),
        a2: a2.export(),
        a3: a3.export()
    });
} //收回动画

function endPop() {
    var start = uni.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
    });
    var a1 = uni.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
    });
    var a2 = uni.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
    });
    var a3 = uni.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
    });
    start.rotateZ(0).step();
    a1.translate(0, 0).rotateZ(0).opacity(0).step();
    a2.translate(0, 0).rotateZ(0).opacity(0).step();
    a3.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
        start: start.export(),
        a1: a1.export(),
        a2: a2.export(),
        a3: a3.export()
    });
}
</script>
<style>
@import './index.css';
</style>
