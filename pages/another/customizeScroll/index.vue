<template>
    <!-- pages/another/customizeScroll/index.wxml -->
    <view class="content">
        <view class="but">
            <button @tap="tapMethod" data-type="1">方式1</button>
            <button @tap="tapMethod" data-type="2">方式2</button>
        </view>

        <!-- 直接修改微信样式方式，但ios的滚动条貌似无法自定义 -->
        <block v-if="type == 1">
            <view class="rule">
                <view class="title">活动规则</view>
                <view class="scroll-view">
                    <scroll-view scroll-y>
                        <view class="rule-image">
                            <image src="https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu/activityRule/rule.png" mode="widthFix"></image>
                        </view>
                    </scroll-view>
                </view>
                <view class="close" @tap="close">关闭</view>
            </view>
        </block>

        <!-- 自定义滚动条 -->
        <block v-if="type == 2">
            <view class="rule">
                <view class="title">活动规则</view>

                <view class="scroll-view hide" id="scroll-view">
                    <scroll-view scroll-y @scroll="bindscroll" :scroll-top="topPlace">
                        <view class="rule-image">
                            <image src="https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu/activityRule/rule.png" mode="widthFix" @load="bindload"></image>
                        </view>
                    </scroll-view>
                    <view class="scroll-bar">
                        <view class="progress" :style="'height:' + barH + '; top: ' + percent + ';'"></view>
                    </view>
                </view>

                <view class="close" @tap="close">关闭</view>
            </view>
        </block>
    </view>
</template>

<script>
export default {
    data() {
        return {
            type: 0,
            scrollViewHeight: 0,
            barH: 0,
            // 自定义滚动条 滑块
            percent: 0,
            // 自定义滚动条 距离顶部的距离
            topPlace: 0 // 滚动条滑动百分比
        };
    },
    onLoad() {},
    methods: {
        tapMethod(e) {
            this.setData({
                type: e.currentTarget.dataset.type
            });
        },

        bindload() {
            uni.createSelectorQuery()
                .select('#scroll-view')
                .boundingClientRect((rect) => {
                    this.setData({
                        topPlace: 1,
                        scrollViewHeight: rect.height
                    });
                })
                .exec();
        },

        bindscroll(e) {
            let scrollViewHeight = this.scrollViewHeight;
            console.log('容器高', scrollViewHeight);
            let h = e.detail.scrollHeight;
            console.log('总高', h);
            let t = e.detail.scrollTop;
            console.log('当前滑动距离', t);
            let barHt = (scrollViewHeight / h) * scrollViewHeight;
            let barTop = (t / (h - scrollViewHeight)) * (scrollViewHeight - barHt);
            let barTopBfb = (t / h) * 100;
            this.setData({
                barH: barHt + 'px',
                percent: barTop + 'px' // percent: barTopBfb + '%'
            });
        },

        close() {
            this.setData({
                type: 0
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
