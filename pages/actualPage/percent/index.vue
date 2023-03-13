<template>
    <view>
        <!-- pages/actualPage/percent/index.wxml -->
        <view class="con_box">
            <block v-for="(item, index) in task_list" :key="item.task_list">
                <view class="c_item flex-row j_b">
                    <view class="flex">
                        <image :src="item.icon" class="item_icon" />
                        <view>
                            <view class="flex-row mb20">
                                <text class="item_name">{{ item.name }}</text>
                                <text class="item_num">+{{ item.num }}</text>
                                <text>{{ item.name_val }}</text>
                            </view>
                            <view class="flex-row" v-if="item.name != '会员积分'">
                                <view class="item_basic">
                                    <view class="prgress" :style="'width:' + (item.progress / item.total) * 100 + '%'"></view>
                                </view>
                                <view class="item_pro">
                                    <text>{{ item.progress }}</text>
                                    /{{ item.total }}
                                </view>
                            </view>
                            <view v-else>会员扫码获得的橙长值无上限喔～</view>
                        </view>
                    </view>
                    <view class="item_url item_over" v-if="item.name != '会员积分' && item.progress == item.total">已完成</view>
                    <view class="item_url" :data-url="item.url" v-else>{{ item.url_text }}</view>
                </view>
            </block>
        </view>

        <view class="btn" @tap.stop.prevent="proAdd">进度++</view>
        <view class="btn" @tap.stop.prevent="proAdd">进度++</view>
        <view class="btn" @tap.stop.prevent="proAdd">进度++</view>
        <view class="btn" @tap.stop.prevent="proAdd">进度++</view>
        <view style="text-align: center">已经到底了</view>
        <view style="text-align: center">已经到底了</view>
        <view style="text-align: center">已经到底了</view>
    </view>
</template>

<script>
// pages/actualPage/percent/index.js
export default {
    data() {
        return {
            task_list: [
                {
                    name: '每日签到',
                    num: 8,
                    progress: 0,
                    total: 8,
                    url: '',
                    icon: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg',
                    url_text: '点击签到'
                },
                {
                    name: '会员纳新',
                    num: 2,
                    progress: 2,
                    total: 12,
                    url: '',
                    icon: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg',
                    url_text: '去纳新'
                },
                {
                    name: '素材转发',
                    num: 2,
                    progress: 20,
                    total: 20,
                    url: '',
                    icon: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg',
                    url_text: '去转发'
                },
                {
                    name: '商品出库',
                    num: 2,
                    progress: 6,
                    total: 20,
                    url: '',
                    icon: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg',
                    url_text: '去出库'
                },
                {
                    name: '会员积分',
                    num: 2,
                    url: '',
                    icon: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg',
                    url_text: '去完成'
                }
            ]
        };
    },
    methods: {
        proAdd() {
            let { task_list } = this;
            task_list.forEach((item) => {
                if (item.progress <= item.total) {
                    item.progress += 1;
                }
            });
            this.setData({
                task_list
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
