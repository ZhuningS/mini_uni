<template>
    <view>
        <!-- pages/jsCase/multiTime/index3.wxml -->
        <view class="tui-picker-content">
            <view class="tui-picker-name">时间选择器（选择时分）</view>
            <picker mode="time" :value="time" start="09:00" end="17:30" @change="changeTime">
                <view class="tui-picker-detail">午饭时间111: {{ time }}</view>
            </picker>
        </view>

        <view class="tui-picker-content">
            <view class="tui-picker-name">日期选择器（选择年月日）</view>
            <picker mode="date" :value="date" start="2017-10-01" end="2017-10-08" @change="changeDate">
                <view class="tui-picker-detail">国庆出游2222: {{ date }}</view>
            </picker>
        </view>

        <view class="tui-picker-content">
            <view class="tui-picker-name">日期时间选择器（精确到秒）</view>
            <picker mode="multiSelector" :value="dateTime" @change="changeDateTime" @columnchange="changeDateTimeColumn" :range="dateTimeArray">
                <view class="tui-picker-detail">
                    选择日期时间3333: {{ dateTimeArray[0][dateTime[0]] }}-{{ dateTimeArray[1][dateTime[1]] }}-{{ dateTimeArray[2][dateTime[2]] }}
                    {{ dateTimeArray[3][dateTime[3]] }}:{{ dateTimeArray[4][dateTime[4]] }}:{{ dateTimeArray[5][dateTime[5]] }}
                </view>
            </picker>
        </view>
        <view class="tui-picker-content">
            <view class="tui-picker-name">日期时间选择器（精确到分）</view>
            <picker mode="multiSelector" :value="dateTime1" @change="changeDateTime1" @columnchange="changeDateTimeColumn1" :range="dateTimeArray1">
                <view class="tui-picker-detail">
                    选择日期时间444: {{ dateTimeArray1[0][dateTime1[0]] }}-{{ dateTimeArray1[1][dateTime1[1]] }}-{{ dateTimeArray1[2][dateTime1[2]] }}
                    {{ dateTimeArray1[3][dateTime1[3]] }}:{{ dateTimeArray1[4][dateTime1[4]] }}
                </view>
            </picker>
        </view>
    </view>
</template>

<script>
var dateTimePicker = require('../util/dateTimer.js');

export default {
    data() {
        return {
            date: '2018-10-01',
            time: '12:00',
            dateTimeArray: null,
            dateTime: null,
            dateTimeArray1: null,
            dateTime1: null,
            startYear: 2000,
            endYear: 2050
        };
    },
    onLoad() {
        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.startYear, this.endYear);
        var obj1 = dateTimePicker.dateTimePicker(this.startYear, this.endYear); // 精确到分的处理，将数组的秒去掉

        var lastArray = obj1.dateTimeArray.pop();
        var lastTime = obj1.dateTime.pop();
        this.setData({
            dateTime: obj.dateTime,
            dateTimeArray: obj.dateTimeArray,
            dateTimeArray1: obj1.dateTimeArray,
            dateTime1: obj1.dateTime
        });
    },
    methods: {
        changeDate(e) {
            this.setData({
                date: e.detail.value
            });
        },

        changeTime(e) {
            this.setData({
                time: e.detail.value
            });
        },

        changeDateTime(e) {
            this.setData({
                dateTime: e.detail.value
            });
        },

        changeDateTime1(e) {
            this.setData({
                dateTime1: e.detail.value
            });
        },

        changeDateTimeColumn(e) {
            var arr = this.dateTime;
            var dateArr = this.dateTimeArray;
            arr[e.detail.column] = e.detail.value;
            dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
            this.setData({
                dateTimeArray: dateArr,
                dateTime: arr
            });
        },

        changeDateTimeColumn1(e) {
            var arr = this.dateTime1;
            var dateArr = this.dateTimeArray1;
            arr[e.detail.column] = e.detail.value;
            dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
            this.setData({
                dateTimeArray1: dateArr,
                dateTime1: arr
            });
        }
    }
};
</script>
<style>
@import './index3.css';
</style>
