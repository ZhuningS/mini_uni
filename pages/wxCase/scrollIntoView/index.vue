<template>
    <view>
        <!-- pages/wxCase/scrollIntoView/index.wxml -->
        <view class="card">礼品</view>
        <view class="flex flex-wrap j_c">
            <block v-for="(item, index) in 4" :key="index">
                <view class="card_item" style="background: var(--va)" @tap.stop.prevent="toDetail" :data-index="index"></view>
            </block>
        </view>
    </view>
</template>

<script>
// pages/wxCase/scrollIntoView/index.js
export default {
    data() {
        return {};
    },
    methods: {
        toDetail(e) {
            let { index } = e.currentTarget.dataset;
            console.log(index);
            uni.navigateTo({
                url: '/pages/wxCase/scrollIntoView/detail?index=' + index
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
