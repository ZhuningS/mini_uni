<template>
    <!-- pages/cssCase/sunset/index.wxml -->
    <view class="con">
        <view class="sun"></view>
        <view
            class="rise"
            :style="
                'bottom:' +
                (160 + 4 * index) +
                'px;animation-delay: ' +
                item.delay +
                's;width:' +
                item.width +
                'px;height:' +
                item.height +
                'px;animation-duration: ' +
                item.duration +
                's;'
            "
            v-for="(item, index) in box"
            :key="index"
        ></view>
    </view>
</template>

<script>
// pages/cssCase/sunset/index.js
export default {
    data() {
        return {
            box: []
        };
    },
    onLoad: function (options) {
        let box = [];

        for (let i = 0; i < 46; i++) {
            box.push({
                name: i
            });
        }

        box.map((item) => {
            item.delay = -Math.random() * 4;
            item.width = 80 + ~~(Math.random() * 100);
            item.height = 8 + ~~(Math.random() * 7);
            item.duration = 3 + Math.random() * 3;
            return item;
        });
        this.setData({
            box
        });
    },
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
