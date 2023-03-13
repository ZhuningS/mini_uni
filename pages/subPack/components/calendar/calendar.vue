<template>
    <view class="calendar">
        <view class="tit">
            <view class="pre" @tap="gotoPreMonth">{{ '<' }}</view>
            <view class="current">{{ currentYearClone }}年{{ currentMonthClone }}月</view>
            <view class="next" @tap="gotoNextMonth">{{ '>' }}</view>
        </view>
        <view class="content">
            <view>日</view>
            <view>一</view>
            <view>二</view>
            <view>三</view>
            <view>四</view>
            <view>五</view>
            <view>六</view>
            <view :class="item.month == 'current' ? '' : 'gray'" v-for="(item, index) in allArr" :key="index">{{ item.date }}</view>
        </view>
    </view>
</template>

<script>
// components/calendar/calendar.js
export default {
    data() {
        return {
            currentMonthDateLen: 0,

            // 当月天数
            preMonthDateLen: 0,

            // 当月中，上月多余天数
            // 当月所有数据
            allArr: [],

            currentYearClone: '',
            currentMonthClone: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        currentYear: {
            // 当前显示的年
            type: Number,
            default: new Date().getFullYear()
        },
        currentMonth: {
            // // 当前显示的月
            type: Number,
            default: new Date().getMonth() + 1
        }
    },
    mounted() {
        this.getAllArr();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 获取某年某月总共多少天
        getDateLen(year, month) {
            let actualMonth = month - 1;
            let timeDistance = +new Date(year, month) - +new Date(year, actualMonth);
            return timeDistance / (1000 * 60 * 60 * 24);
        },

        // 获取某月1号是周几
        getFirstDateWeek(year, month) {
            return new Date(year, month - 1, 1).getDay();
        },

        // 上月 年、月
        preMonth(year, month) {
            if (month == 1) {
                return {
                    year: --year,
                    month: 12
                };
            } else {
                return {
                    year: year,
                    month: --month
                };
            }
        },

        // 下月 年、月
        nextMonth(year, month) {
            if (month == 12) {
                return {
                    year: ++year,
                    month: 1
                };
            } else {
                return {
                    year: year,
                    month: ++month
                };
            }
        },

        // 获取当月数据，返回数组
        getCurrentArr() {
            let currentMonthDateLen = this.getDateLen(this.currentYear, this.currentMonth); // 获取当月天数

            let currentMonthDateArr = []; // 定义空数组

            if (currentMonthDateLen > 0) {
                for (let i = 1; i <= currentMonthDateLen; i++) {
                    currentMonthDateArr.push({
                        month: 'current',
                        // 只是为了增加标识，区分上下月
                        date: i
                    });
                }
            }

            this.setData({
                currentMonthDateLen
            });
            return currentMonthDateArr;
        },

        // 获取当月中，上月多余数据，返回数组
        getPreArr() {
            let preMonthDateLen = this.getFirstDateWeek(this.currentYear, this.currentMonth); // 当月1号是周几 == 上月残余天数）

            let preMonthDateArr = []; // 定义空数组

            if (preMonthDateLen > 0) {
                let { year, month } = this.preMonth(this.currentYear, this.currentMonth); // 获取上月 年、月

                let date = this.getDateLen(year, month); // 获取上月天数

                for (let i = 0; i < preMonthDateLen; i++) {
                    preMonthDateArr.unshift({
                        // 尾部追加
                        month: 'pre',
                        // 只是为了增加标识，区分当、下月
                        date: date
                    });
                    date--;
                }
            }

            this.setData({
                preMonthDateLen
            });
            return preMonthDateArr;
        },

        // 获取当月中，下月多余数据，返回数组
        getNextArr() {
            let nextMonthDateLen = 42 - this.preMonthDateLen - this.currentMonthDateLen; // 下月多余天数

            let nextMonthDateArr = []; // 定义空数组

            if (nextMonthDateLen > 0) {
                for (let i = 1; i <= nextMonthDateLen; i++) {
                    nextMonthDateArr.push({
                        month: 'next',
                        // 只是为了增加标识，区分当、上月
                        date: i
                    });
                }
            }

            return nextMonthDateArr;
        },

        // 整合当月所有数据
        getAllArr() {
            let preArr = this.getPreArr();
            let currentArr = this.getCurrentArr();
            let nextArr = this.getNextArr();
            let allArr = [...preArr, ...currentArr, ...nextArr];
            this.setData({
                allArr
            });
            let sendObj = {
                currentYear: this.currentYear,
                currentMonth: this.currentMonth,
                allArr: allArr
            }; // console.log(sendObj)

            this.$emit('sendObj', {
                detail: sendObj
            });
        },

        // 点击 上月
        gotoPreMonth() {
            let { year, month } = this.preMonth(this.currentYear, this.currentMonth);
            this.setData({
                currentYearClone: year,
                currentMonthClone: month
            });
            this.getAllArr();
        },

        // 点击 下月
        gotoNextMonth() {
            let { year, month } = this.nextMonth(this.currentYear, this.currentMonth);
            this.setData({
                currentYearClone: year,
                currentMonthClone: month
            });
            this.getAllArr();
        }
    },
    watch: {
        currentYear: {
            handler: function (newVal, oldVal) {
                this.currentYearClone = newVal;
            },

            immediate: true
        },

        currentMonth: {
            handler: function (newVal, oldVal) {
                this.currentMonthClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './calendar.css';
</style>
