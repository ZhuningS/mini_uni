<template>
    <view>
        <!-- pages/wxCase/popCustom/index.wxml -->
        <view class="box" @tap.stop.prevent="show">弹出一个弹框</view>
        <view class="codeBox" v-if="!isShow" @tap.stop.prevent="hide">
            <view id="hide">
                <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" />
            </view>
        </view>
    </view>
</template>

<script>
// pages/wxCase/popCustom/index.js
export default {
    data() {
        return {
            isShow: true,
            a: {}
        };
    },
    methods: {
        show() {
            this.setData({
                isShow: false
            });
        },

        hide() {
            // var a = wx.createAnimation({
            //   duration: 500,
            //   timingFunction: 'ease-out'
            // })
            // a.scale(1.08, 1.08).opacity(1).rotateZ(40).scale(0.6).step();
            this.setData({
                // a: a.export(),
                isShow: true
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
