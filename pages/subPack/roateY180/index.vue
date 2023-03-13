<template>
    <!-- pages/subPack/roateY180/index.wxml -->
    <view class="main">
        <view class="box b1" @tap.stop.prevent="showb1" :style="styleA"></view>
        <view class="box b2" @tap.stop.prevent="showb2" :style="styleB"></view>
    </view>
</template>

<script>
// pages/subPack/roateY180/index.js
export default {
    data() {
        return {
            styleA: '',
            styleB: ''
        };
    },
    methods: {
        showb1() {
            this.setData({
                styleA: 'transform:rotateY(180deg)',
                styleB: 'transform:rotateY(0deg)'
            });
        },

        showb2() {
            this.setData({
                styleA: 'transform:rotateY(0deg)',
                styleB: 'transform:rotateY(-180deg)'
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
