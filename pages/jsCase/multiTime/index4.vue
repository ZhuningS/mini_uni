<template>
    <!-- pages/jsCase/multiTime/index4.wxml -->
    <view class="act_box">
        <view class="act_item flex j_b">
            <view class="nowp">
                <text class="require">*</text>
                开始时间：
            </view>
            <picker
                mode="multiSelector"
                :value="start_time"
                data-type="start_time"
                data-param="start_time_p"
                @change="changeDateTime"
                @columnchange="changeDateTimeColumn"
                :range="dateTimeArray"
            >
                <view class="flex-row act_right">
                    <text v-if="!start_time_p">请选择</text>
                    <text v-else class="sel_text">{{ start_time_p }}</text>
                </view>
            </picker>
        </view>
        <view class="act_item flex j_b">
            <view class="nowp">
                <text class="require">*</text>
                结束时间：
            </view>
            <picker
                mode="multiSelector"
                :value="end_time"
                data-type="end_time"
                data-param="end_time_p"
                @change="changeDateTime"
                @columnchange="changeDateTimeColumn"
                :range="dateTimeArray"
            >
                <view class="flex-row act_right">
                    <text v-if="!end_time_p">请选择</text>
                    <text v-else class="sel_text">{{ end_time_p }}</text>
                </view>
            </picker>
        </view>
    </view>
</template>

<script>
// pages/jsCase/multiTime/index4.js
var dateTimePicker = require('../util/dateTimer.js');

export default {
    data() {
        return {
            end_time: '',
            start_time: '',
            dateTimeArray: '',

            //时间数组
            startYear: 2000,

            //最小年份
            endYear: 2050,

            // 最大年份
            start_time_p: '',

            //显示的开始时间
            //显示的结束时间
            start_time_p: '',

            end_time_p: ''
        };
    },
    onLoad: function (options) {
        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.startYear, this.endYear);
        this.setData({
            start_time: obj.dateTime,
            end_time: obj.dateTime,
            dateTimeArray: obj.dateTimeArray
        });
    },
    methods: {
        /**
         * 选择时间
         * @param {*} e
         */
        changeDateTime(e) {
            let dateTimeArray = this.dateTimeArray;
            let { type, param } = e.currentTarget.dataset;
            this.param =
                dateTimeArray[0][e.detail.value[0]] +
                '-' +
                dateTimeArray[1][e.detail.value[1]] +
                '-' +
                dateTimeArray[2][e.detail.value[2]] +
                ' ' +
                dateTimeArray[3][e.detail.value[3]] +
                ':' +
                dateTimeArray[4][e.detail.value[4]] +
                ':' +
                dateTimeArray[5][e.detail.value[5]];
            this.type = e.detail.value;
        },

        changeDateTimeColumn(e) {
            var dateArr = this.dateTimeArray;
            var { type } = e.currentTarget.dataset;
            var arr = this[type];
            arr[e.detail.column] = e.detail.value;
            dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
            this.type = arr;
            this.setData({
                dateTimeArray: dateArr
            });
        }
    }
};
</script>
<style>
@import './index4.css';
</style>
