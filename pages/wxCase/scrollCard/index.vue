<template>
    <!-- pages/wxCase/scrollCard/index.wxml -->
    <view class="box">
        <scroll-view :scroll-y="true" :scroll-with-animation="true" :scroll-into-view="scrollInToView" :scroll-top="scrollTop" @scroll="bindScroll" class="scrollcard">
            <view class="scrollcard-outter">
                <view class="scrollcard-inner">
                    <view id="topview" class="scrollcard-ctrl" @tap.stop.prevent="toTop" data-toview="topview">
                        <view class="scbar"></view>
                        <scroll-view :scroll-y="true" style="height: 94%">
                            <scroll-view scroll-x class="img_sc" v-for="(item, index) in 4" :key="index">
                                <view v-for="(item, index1) in 4" :key="item.idx">
                                    <image src="https://i.postimg.cc/XJmpTvCD/susu2.jpg" mode="as"></image>
                                </view>
                            </scroll-view>
                        </scroll-view>
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
//index.js
export default {
    data() {
        return {
            scrollInToView: '',
            scrollTop: 0
        };
    },
    methods: {
        toTop(e) {
            var view = this.scrollInToView ? '' : e.currentTarget.dataset.toview;
            console.log(view);
            this.setData({
                scrollInToView: view,
                scrollTop: 0
            });
        },

        bindScroll: function (e) {
            console.log(e.detail.scrollTop);
            this.setData({
                scrollInToView: ''
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
