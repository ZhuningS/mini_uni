<template>
    <view>
        <!-- pages/wxCase/scrollIntoView/detail.wxml -->
        <view class="header">
            <view :style="'background: ' + back + ';'" class="head_b"></view>
        </view>
        <view class="con">
            <view class="title">选择卡片</view>
            <scroll-view class="scroll" :scroll-x="true" :scroll-into-view="toView">
                <view style="padding: 10px 0">
                    <view
                        :id="'view' + index"
                        :class="'card_item ' + (index == current && 'opcity')"
                        :style="'background: ' + item.back + ';'"
                        @tap.stop.prevent="tap"
                        :data-index="index"
                        v-for="(item, index) in list"
                        :key="index"
                    >
                        <image src="/static/img/cart_select.png" v-if="index == current" class="show_icon"></image>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
// pages/wxCase/scrollIntoView/detail.js
export default {
    data() {
        return {
            back: '',
            current: '',
            list: [
                {
                    back: 'rgb(223, 177, 116)'
                },
                {
                    back: 'pink'
                },
                {
                    back: 'rgb(121, 60, 70)'
                },
                {
                    back: 'rgb(202, 81, 101)'
                }
            ],
            toView: ''
        };
    },
    onLoad: function (options) {
        let { index } = options;
        console.log(index);

        if (index != null) {
            this.setData({
                current: index,
                back: this.list[index].back,
                toView: 'view' + index
            });
        }
    },
    onShow: function () {
        let a = Number('1231');
        console.log(a);
        console.log(typeof a);
    },
    methods: {
        tap(e) {
            let { index } = e.currentTarget.dataset;
            this.setData({
                current: index,
                back: this.list[index].back
            });
        }
    }
};
</script>
<style>
@import './detail.css';
</style>
