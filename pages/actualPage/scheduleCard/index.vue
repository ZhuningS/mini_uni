<template>
    <view>
        <!-- pages/actualPage/scheduleCard/index.wxml -->
        <view class="flex-row head">
            <view class="head-left flex-column j_c">
                <image src="https://s3.bmp.ovh/imgs/2022/07/27/6289fe4ab016c74a.png" class="head-icon" />
                <text class="head-left-text one">第</text>
                <text class="head-left-text two">周</text>
                <text class="head-curr-week">{{ currentWeek }}</text>
            </view>
            <view class="head-right flex-row j_b">
                <view class="flex-column j_c" v-for="(item, index) in weekList" :key="item.list">
                    <text :class="'head-week ' + (item.isCurr && 'head-right-curr')">{{ item.week }}</text>

                    <text :class="' ' + (item.isCurr && 'head-right-curr')">{{ item.isCurr ? '今天' : item.day }}</text>
                </view>
            </view>
        </view>
        <view class="container flex-row mb20">
            <view class="container-left flex-column j_b">
                <block v-for="(item, index) in time.one" :key="item.list">
                    <view class="flex-column j_c">
                        <text class="con-title">{{ item.index }}</text>
                        <text>{{ item.timeStart }}</text>
                        <text>{{ item.timeEnd }}</text>
                    </view>
                </block>
            </view>
            <view class="container-right flex col j_c">
                <view class="flex-row mb10">
                    <view
                        class="con-item flex-column j_c"
                        :style="'background: ' + item.color + ';'"
                        @tap.stop.prevent="parseEventDynamicCode($event, item.type ? 'getDetail' : '')"
                        :data-item="item"
                        v-for="(item, index) in schedule.one"
                        :key="item.list"
                    >
                        <text class="con-item-subj line_ellipsis">{{ item.sub }}</text>

                        <text class="line_ellipsis">{{ item.tec }}</text>

                        <text class="line_ellipsis">{{ item.add }}</text>
                    </view>
                </view>
                <view class="flex-row">
                    <view
                        class="con-item flex-column j_c"
                        :style="'background: ' + item.color + ';'"
                        @tap.stop.prevent="parseEventDynamicCode($event, item.type ? 'getDetail' : '')"
                        :data-item="item"
                        v-for="(item, index) in schedule.two"
                        :key="item.list"
                    >
                        <text class="con-item-subj">{{ item.sub }}</text>

                        <text>{{ item.tec }}</text>

                        <text>{{ item.add }}</text>
                    </view>
                </view>
                <image src="https://s3.bmp.ovh/imgs/2022/07/27/85dabf1d5821a98b.png" class="con-icon" />
            </view>
        </view>
        <view class="container flex-row mb20">
            <view class="container-left left1">
                <block v-for="(item, index) in time.two" :key="item.list">
                    <view class="flex-column j_c">
                        <text class="con-title">{{ item.index }}</text>
                        <text>{{ item.timeStart }}</text>
                        <text>{{ item.timeEnd }}</text>
                    </view>
                </block>
            </view>
            <view class="container-right right1 flex col j_c">
                <view class="flex-row">
                    <view
                        class="con-item flex-column j_c"
                        :style="'background: ' + item.color + ';'"
                        @tap.stop.prevent="parseEventDynamicCode($event, item.type ? 'getDetail' : '')"
                        :data-item="item"
                        v-for="(item, index) in schedule.three"
                        :key="item.list"
                    >
                        <text class="con-item-subj line_ellipsis">{{ item.sub }}</text>

                        <text class="line_ellipsis">{{ item.tec }}</text>

                        <text class="line_ellipsis">{{ item.add }}</text>
                    </view>
                </view>
                <image src="https://s3.bmp.ovh/imgs/2022/07/27/85dabf1d5821a98b.png" class="con-icon" />
            </view>
        </view>
        <view class="container flex-row">
            <view class="container-left left1">
                <block v-for="(item, index) in time.three" :key="item.list">
                    <view class="flex-column j_c">
                        <text class="con-title">{{ item.index }}</text>
                        <text>{{ item.timeStart }}</text>
                        <text>{{ item.timeEnd }}</text>
                    </view>
                </block>
            </view>
            <view class="container-right right1 flex col j_c">
                <view class="flex-row">
                    <view
                        class="con-item flex-column j_c"
                        :style="'background: ' + item.color + ';'"
                        @tap.stop.prevent="parseEventDynamicCode($event, item.type ? 'getDetail' : '')"
                        :data-item="item"
                        v-for="(item, index) in schedule.four"
                        :key="item.list"
                    >
                        <text class="con-item-subj line_ellipsis">{{ item.sub }}</text>

                        <text class="line_ellipsis">{{ item.tec }}</text>

                        <text class="line_ellipsis">{{ item.add }}</text>
                    </view>
                </view>
                <image src="https://s3.bmp.ovh/imgs/2022/07/27/85dabf1d5821a98b.png" class="con-icon" />
            </view>
        </view>
        <!-- 详情弹框 -->
        <view class="mask" v-if="isShow" @tap.stop.prevent="close"></view>
        <view :class="'modal flex-column j_c ' + (isShow ? 'show' : 'noShow')" :style="'background: ' + current.color + ';'">
            <view>{{ current.sub }}</view>
            <view>{{ current.add }}</view>
            <view>{{ current.tec }}</view>
        </view>
    </view>
</template>

<script>
// pages/actualPage/scheduleCard/index.js
import { getCurrWeekList, formateDate } from '../utils/tools';
export default {
    data() {
        return {
            currentWeek: 10,
            time: {
                one: [
                    {
                        index: 1,
                        timeStart: '08:00',
                        timeEnd: '08:45'
                    },
                    {
                        index: 2,
                        timeStart: '08:55',
                        timeEnd: '09:40'
                    },
                    {
                        index: 3,
                        timeStart: '09:50',
                        timeEnd: '10:45'
                    },
                    {
                        index: 4,
                        timeStart: '10:50',
                        timeEnd: '11:35'
                    }
                ],
                two: [
                    {
                        index: 5,
                        timeStart: '13:30',
                        timeEnd: '14:15'
                    },
                    {
                        index: 6,
                        timeStart: '14:25',
                        timeEnd: '15:10'
                    }
                ],
                three: [
                    {
                        index: 7,
                        timeStart: '15:20',
                        timeEnd: '16:05'
                    },
                    {
                        index: 8,
                        timeStart: '16:15',
                        timeEnd: '17:00'
                    }
                ]
            },
            schedule: {
                one: [
                    {
                        sub: '编译原理',
                        add: 'B202',
                        tec: '苏苏苏',
                        color: '#fad0c4',
                        type: 1 //0-无  1-有
                    },
                    {
                        sub: '',
                        add: '',
                        tec: '',
                        color: '',
                        type: 0
                    },
                    {
                        sub: '操作系统',
                        add: 'N502',
                        tec: '苏苏苏',
                        color: '#ff9a9e',
                        type: 1
                    },
                    {
                        sub: '',
                        add: '',
                        tec: '',
                        color: '',
                        type: 0
                    },
                    {
                        sub: '',
                        add: '',
                        tec: '',
                        color: '',
                        type: 0
                    }
                ],
                two: [
                    {
                        sub: '',
                        add: '',
                        tec: '',
                        color: '',
                        type: 0
                    },
                    {
                        sub: '大学物理',
                        add: 'B202',
                        tec: '苏苏苏',
                        color: '#fda085',
                        type: 1 //0-无  1-有
                    },
                    {
                        sub: '概率',
                        add: 'B202',
                        tec: '苏苏苏',
                        color: '#fbc2eb',
                        type: 1 //0-无  1-有
                    },
                    {
                        sub: '',
                        add: '',
                        tec: '',
                        color: '',
                        type: 0
                    },
                    {
                        sub: '线性代数',
                        add: 'B202',
                        tec: '苏苏苏',
                        color: 'pink',
                        type: 1 //0-无  1-有
                    }
                ],
                three: [
                    {
                        sub: '',
                        add: '',
                        tec: '',
                        color: '',
                        type: 0
                    },
                    {
                        sub: '',
                        add: '',
                        tec: '',
                        color: '',
                        type: 0
                    },
                    {
                        sub: '软件工程',
                        add: 'B202',
                        tec: '苏苏苏',
                        color: '#a7a6cb',
                        type: 1 //0-无  1-有
                    },
                    {
                        sub: '安卓',
                        add: 'B202',
                        tec: '苏苏苏',
                        color: '#6991c7',
                        type: 1 //0-无  1-有
                    },
                    {
                        sub: '',
                        add: '',
                        tec: '',
                        color: '',
                        type: 0
                    }
                ],
                four: [
                    {
                        sub: '软件测试',
                        add: 'B202',
                        tec: '苏苏苏',
                        color: '#ebc0fd',
                        type: 1 //0-无  1-有
                    },
                    {
                        sub: '数据库系统概述',
                        add: 'B202',
                        tec: '苏苏苏',
                        color: '#fddb92',
                        type: 1 //0-无  1-有
                    },
                    {
                        sub: '',
                        add: '',
                        tec: '',
                        color: '',
                        type: 0
                    },
                    {
                        sub: '',
                        add: '',
                        tec: '',
                        color: '',
                        type: 0
                    },
                    {
                        sub: '',
                        add: '',
                        tec: '',
                        color: '',
                        type: 0
                    }
                ]
            },
            weekList: [],
            isShow: false,
            current: {
                color: '',
                sub: '',
                add: '',
                tec: ''
            }
        };
    },
    onShow() {
        let time = new Date();
        let list = getCurrWeekList(time);
        let weekList = [];
        list.forEach((item) => {
            weekList.push({
                day: [item.split('-')[1], item.split('-')[2]].join('-'),
                week: '星期' + '日一二三四五六'.charAt(new Date(item).getDay()),
                isCurr: formateDate(time) == item
            });
        });
        this.setData({
            weekList
        });
    },
    methods: {
        getDetail(e) {
            let { item } = e.currentTarget.dataset;
            console.log(item);
            this.setData({
                current: item,
                isShow: true
            });
        },

        close() {
            this.setData({
                isShow: false
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
