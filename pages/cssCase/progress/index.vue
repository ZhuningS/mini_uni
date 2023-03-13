<template>
    <view>
        <!-- pages/cssCase/progress/index.wxml -->
        <view class="box">
            <view class="pink_pro" :style="'width:' + progress + '%'"></view>
        </view>
        <view class="box btn1" @tap.stop.prevent="prAdd" data-type="0">
            <view class="pink_pro" style="width: 100%">进度++</view>
        </view>

        <view class="box btn1" @tap.stop.prevent="prAdd" data-type="1">
            <view class="pink_pro" style="width: 100%">进度--</view>
        </view>
    </view>
</template>

<script>
// pages/cssCase/progress/index.js
export default {
    data() {
        return {
            progress: 50
        };
    },
    methods: {
        prAdd(e) {
            console.log(e);
            let { type } = e.currentTarget.dataset;
            let { progress } = this;

            if (type == 0) {
                progress = progress + 3;
            } else {
                progress = progress - 3;
            }

            if (progress >= 100 || progress <= 0) {
                return false;
            }

            this.setData({
                progress
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
