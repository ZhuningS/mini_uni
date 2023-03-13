<template>
    <view>
        <!-- pages/effects/snows/index.wxml -->
        <scroll-view :scroll-y="true">
            <!-- 页面内容 -->
        </scroll-view>
        <view>
            <image
                src="/static/pages/effects/img/snow.png"
                :style="'left:' + snows[index] + 'rpx'"
                :animation="animation[index]"
                class="snow"
                :data-index="index"
                v-for="(item, index) in snows"
                :key="index"
            ></image>
        </view>
    </view>
</template>

<script>
// pages/effects/snows/index.js
var i = 0;
export default {
    data() {
        return {
            snows: [],
            animation: [],
            dateTime: ''
        };
    },
    onLoad: function (options) {},
    onShow: function () {
        this.initSnow();
        this.snows = [];
        this.animation = [];
        let j = 50;

        while (j--) this.snows.push(Math.floor(Math.random() * 700));

        this.setData({
            snows: this.snows
        });
    },
    onHide: function () {
        clearTimeout(this.dateTime);
        this.setData({
            snows: [],
            animation: []
        });
    },
    onUnload: function () {
        clearTimeout(this.dateTime);
        this.setData({
            snows: [],
            animation: []
        });
    },
    methods: {
        initSnow: function () {
            setTimeout(
                function () {
                    let animation = uni.createAnimation({});
                    animation.translateY(804).opacity(1).step({
                        duration: 4000
                    });
                    animation.translateY(0).opacity(1).step({
                        duration: 0
                    });
                    this['animation[' + i + ']'] = animation.export();
                    this['snows[' + i + ']'] = Math.floor(Math.random() * 700);
                    i++;

                    if (i == 50) {
                        i = 0;
                    }
                }.bind(this),
                500
            );
            var dateTime = setTimeout(
                function () {
                    this.initSnow();
                }.bind(this),
                100
            );
            this.setData({
                dateTime
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
