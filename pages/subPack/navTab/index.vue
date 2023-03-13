<template>
    <view>
        <!-- pages/subPack/navTab/index.wxml -->
        <!-- <view class="hd">
  <block wx:for="{{navList}}" wx:key="navList">
    <view class="hd_flex {{nav_type == index ? 'hd_flex_on' : ''}}" catchtap="changeType" data-index="{{index}}">{{item}}</view>
  </block>
</view> -->
        <view class="head">
            <view class="hd">
                <block v-for="(item, index) in navList" :key="item.navList">
                    <view :class="'hd_flex ' + (nav_type == index ? 'hd_flex_on' : '')" @tap.stop.prevent="changeType" :data-index="index">
                        {{ item }}
                        <!-- <view class="line_checked {{nav_type == index&&'checked'}}"></view> -->
                    </view>
                </block>
            </view>
            <view style="height: 88rpx; width: 100%"></view>
        </view>
        <view class="container">
            <view :class="'box ' + (show && 'anim')" :style="'background-image: ' + bg_color"></view>
        </view>
        <view class="text" data-attr="transition+animation">transition+animation</view>
    </view>
</template>

<script>
// pages/subPack/navTab/index.js
export default {
    data() {
        return {
            navList: ['正在进行', '即将开始', '已结束'],
            nav_type: 0,
            list: [
                {
                    color: 'linear-gradient(to right, #a8edea 0%, #fed6e3 100%);'
                },
                {
                    color: 'linear-gradient(to right, #acb6e5 , #86fde8 );'
                },
                {
                    color: 'linear-gradient(to right, #ed4264 , #ffedbc );'
                }
            ],
            bg_color: 'linear-gradient(to right, #a8edea 0%, #fed6e3 100%)',
            show: false
        };
    },
    methods: {
        changeType: function (e) {
            let { index } = e.currentTarget.dataset;
            let { list } = this;
            if (this.type === index || index === undefined) {
                return false;
            } else {
                this.setData(
                    {
                        nav_type: index,
                        bg_color: list[index].color,
                        show: true
                    },
                    setTimeout(() => {
                        this.setData({
                            show: false
                        });
                    }, 600)
                );
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
