<template>
    <view>
        <!-- pages/cssCase/newTab/index.wxml -->
        <view class="mb20">
            <view class="head_tab_one">
                <block v-for="(item, index) in tab" :key="item.tab">
                    <view @tap.stop.prevent="navTab" :class="' head_item ' + (index == nav_type && 'head_item_active')" :data-index="index">{{ item.name }}</view>
                </block>
            </view>
        </view>
        <view class="mb20">
            <view class="head_tab_two">
                <block v-for="(item, index) in tab" :key="item.tab">
                    <view @tap.stop.prevent="navTab" :class="' head_item ' + (index == nav_type && 'head_item_active')" :data-index="index">{{ item.name }}</view>
                </block>
            </view>
        </view>
        <view class="mb20">
            <view class="head_tab_three">
                <block v-for="(item, index) in tab" :key="item.tab">
                    <view @tap.stop.prevent="navTab" :class="' head_item ' + (index == nav_type && 'head_item_active')" :data-index="index">{{ item.name }}</view>
                </block>
            </view>
        </view>
        <view class="mb20">
            <view class="head_tab head_tab_four">
                <block v-for="(item, index) in tab" :key="item.tab">
                    <view @tap.stop.prevent="navTab" :class="' head_item ' + (index == nav_type && 'head_item_active')" :data-index="index">{{ item.name }}</view>
                </block>
            </view>
        </view>
        <view class="mb20">
            <view class="head_tab">
                <block v-for="(item, index) in tab" :key="item.tab">
                    <view @tap.stop.prevent="navTab" :class="' head_item ' + (index == nav_type && 'head_item_active')" :data-index="index">{{ item.name }}</view>
                </block>
            </view>
            <view class="head_con"></view>
        </view>
    </view>
</template>

<script>
// pages/cssCase/newTab/index.js
export default {
    data() {
        return {
            tab: [
                {
                    name: '选项一'
                },
                {
                    name: '选项二'
                }
            ],
            nav_type: 0
        };
    },
    methods: {
        navTab(e) {
            let { index } = e.currentTarget.dataset;

            if (this.type === index || index === undefined) {
                return false;
            } else {
                this.setData({
                    nav_type: index
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
