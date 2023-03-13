<template>
    <view>
        <!-- pages/actualPage/steps/index.wxml -->
        <swiper class="swiper_box" :circular="true" @animationfinish="handleSwiper" :current="currentTab">
            <block v-for="(item, index) in swiper_box" :key="item.swiper_box">
                <swiper-item>
                    <view class="guide_box">
                        <view class="flex-row j_b">
                            <view class="flex-row">
                                <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="guide_icon"></image>
                                <text class="guide_title">{{ item.name }}</text>
                            </view>
                            <view class="guide_rule">苏苏测试</view>
                        </view>
                        <view class="guide_recent">
                            苏苏苏苏苏苏
                            <text>1200</text>
                        </view>
                        <view class="flex-row j_b line_box">
                            <view class="flex-column l">
                                <view class="grade_box">
                                    <text>苏苏一</text>
                                </view>
                                <view class="flex-column">
                                    <view :class="'grade_cir ' + (currGrade == 0 && 'grade0') + ' ' + ((currGrade == 1 || currGrade == 2) && 'grade1')">
                                        <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="bg_img z_index" />
                                    </view>
                                    <text class="grade_step">
                                        苏苏
                                        <text>1</text>
                                        倍
                                    </text>
                                </view>
                            </view>
                            <view class="flex-column l">
                                <view class="grade_box">
                                    <text>苏苏2</text>
                                </view>
                                <view class="flex-column">
                                    <view :class="'grade_cir ' + (currGrade == 2 && 'grade1')">
                                        <view v-if="currGrade == 0" class="grade_ce">1200</view>
                                        <view v-else class="grade_oth flex-row j_c">
                                            <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="bg_img z_index" />
                                            <text>1200</text>
                                        </view>
                                    </view>
                                    <text class="grade_step">
                                        啊呀呀
                                        <text>1.2</text>
                                        倍
                                    </text>
                                </view>
                            </view>
                            <view class="flex-column l">
                                <view class="grade_box">
                                    <text>苏苏3</text>
                                </view>
                                <view class="flex-column">
                                    <view class="grade_cir">
                                        <view v-if="currGrade == 0 || currGrade == 1" class="grade_ce">3000</view>
                                        <view v-else class="grade_oth flex-row j_c">
                                            <image src="https://i.postimg.cc/qRRLS16Q/susu0.jpg" class="bg_img z_index" />
                                            <text>3000</text>
                                        </view>
                                    </view>
                                    <text class="grade_step">
                                        苏苏
                                        <text>1.5</text>
                                        倍
                                    </text>
                                </view>
                            </view>
                        </view>
                    </view>
                </swiper-item>
            </block>
        </swiper>
        <view>
            <view class="title">苏苏苏说</view>
            <view class="val_box flex-row">
                <block v-for="(item, index) in task_list" :key="item.task_list">
                    <view class="flex-column" style="width: 20%">
                        <image :src="item.icon" class="va_icon" />
                        <view>{{ item.name }}</view>
                        <view class="va_num" v-if="index == 4">
                            <text>{{ currentTab == 0 ? '2' : currentTab == 1 ? '2.2' : '3' }}</text>
                            苏苏/次
                        </view>
                        <view class="va_num" v-else>
                            <text>{{ currentTab == 0 ? '1' : currentTab == 1 ? '1.2' : '1.5' }}</text>
                            苏苏/次
                        </view>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
// pages/actualPage/steps/index.js
export default {
    data() {
        return {
            swiper_box: [
                {
                    name: '专业导购'
                },
                {
                    name: '金牌导购'
                },
                {
                    name: '王牌导购'
                }
            ],
            task_list: [
                {
                    name: '每日签到',
                    icon: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg'
                },
                {
                    name: '每日签到',
                    icon: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg'
                },
                {
                    name: '每日签到',
                    icon: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg'
                },
                {
                    name: '每日签到',
                    icon: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg'
                },
                {
                    name: '每日签到',
                    icon: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg'
                }
            ],
            currentTab: 2,
            currGrade: 0 //当前等级 0-专业 1-金牌 2-王牌
        };
    },
    methods: {
        /**
         * swiper
         * @param {*} e
         */
        handleSwiper(e) {
            let { current, source } = e.detail;

            if (source === 'autoplay' || source === 'touch') {
                this.setData({
                    currentTab: current
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
