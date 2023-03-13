<template>
    <view>
        <!-- pages/cssCase/aButton/index.wxml -->
        <view class="tips">
            <view>学习案例</view>
            <!-- 源码地址https://codepen.io/Squidies/pen/eoxdNe -->
        </view>
        <view @tap.stop.prevent="click">
            <input id="egg-toggle" type="checkbox" />
            <label for="egg-toggle">
                <span id="egg" v-if="ischecked == undefined"></span>
                <span id="egg" v-else :class="ischecked ? 'flip' : 'unflip'"></span>
            </label>
        </view>
    </view>
</template>

<script>
// pages/cssCase/aButton/index.js
export default {
    data() {
        return {
            ischecked: undefined,
            undefined: ''
        };
    },
    onShow: function () {
        uni.hideHomeButton({}); // wx.hideHomeButton({
        //   success: function () {
        //     console.log("hide home success");
        //   },
        //   fail: function () {
        //     console.log("hide home fail");
        //   },
        //   complete: function () {
        //     console.log("hide home complete");
        //   },
        // });
    },
    methods: {
        click() {
            this.setData({
                ischecked: !this.ischecked
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
