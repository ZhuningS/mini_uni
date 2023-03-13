<template>
    <view>
        <!-- pages/wxCase/exFont/index.wxml -->
        <view class="text mb20">苏苏就是小苏苏</view>
        <view v-if="show">
            <view class="text mb20 text1">苏苏就是小苏苏</view>
        </view>

        <view class="text mb20 text1">abcdddsdfhsdfd</view>
        <view class="text mb20 text2">苏苏就是小苏苏</view>
        <view class="text mb20 text2">susu is xiaosusu</view>
        <view class="text mb20 t3">s121231231231</view>
        <view class="text mb20 t4">s121231231231</view>
        <view class="text mb20">s121231231231</view>
    </view>
</template>

<script>
// pages/wxCase/exFont/index.js
export default {
    data() {
        return {
            show: false
        };
    },
    onLoad: function (options) {
        uni.loadFontFace({
            family: 'Bitstream Vera Serif Bold',
            source: 'url("https://sungd.github.io/Pacifico.ttf")',
            success: console.log
        }); // this.getFonts().then(() => {
        //   this.setData({
        //     show: true
        //   })
        // })
    },
    methods: {
        getFonts() {
            let Wof = uni.loadFontFace({
                family: 'Wof',
                source: 'url("https://gitee.com/susuhhhhhh/su-sus-picture/blob/master/%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E5%AD%97%E5%BF%83%E5%9D%8A%E6%A2%A6%E5%B9%BB%E5%93%A5%E7%89%B9%E4%BD%93(1).ttf")'
            });
            return Promise.all([Wof]).then((res) => {
                console.log(res);
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
