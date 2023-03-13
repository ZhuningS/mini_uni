<template>
    <view class="calendar">
        <!-- 显示当前年月日 -->
        <view class="calendar-title">
            <view class="item ctrl" @tap="lastMonthFun">{{ lastMonthFun }}</view>
            <view class="item title">{{ title }}</view>
            <view class="item ctrl" @tap="nextMonthFun">{{ nextMonthFun }}</view>
            <view class="item ctrl today" @tap="today">今天</view>
        </view>

        <!-- ============滚动展示============ -->
        <view v-if="toggleType != 'large'">
            <scroll-view :scroll-left="scrollLeft" scroll-x scroll-with-animation class="calendar-x">
                <view class="grid" v-for="(item, index) in thisMonthDays" :key="item.indx">
                    <view class="self" v-if="format === year + '-' + item.monthFormat + '-' + item.dateFormat"></view>

                    <view :class="'wrap ' + (select === year + '-' + item.monthFormat + '-' + item.dateFormat ? 'select' : '')" @tap="selectFun" :data-date="item.date">
                        {{ item.date }}
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- ============平铺展示============ -->
        <!-- 遍历星期 -->
        <view class="calendar-week" v-if="toggleType != 'mini'">
            <view class="item" v-for="(item, index) in weekText" :key="index">{{ item }}</view>
        </view>

        <view class="calendar-container" v-if="toggleType != 'mini'">
            <!-- 上个月占位格子 -->
            <view class="grid gray" v-for="(item, index) in empytGridsBefore" :key="index">{{ item }}</view>

            <!-- 当月格子 -->
            <view class="grid" v-for="(item, index) in thisMonthDays" :key="item.indx">
                <view class="self" v-if="format === year + '-' + item.monthFormat + '-' + item.dateFormat"></view>

                <view :class="'wrap ' + (select === year + '-' + item.monthFormat + '-' + item.dateFormat ? 'select' : '')" @tap="selectFun" :data-date="item.date">
                    {{ item.date }}
                </view>
            </view>

            <!-- 下个月占位格子 -->
            <view class="grid gray" v-for="(item, index) in empytGridsAfter" :key="index">{{ item }}</view>
        </view>
    </view>
</template>

<script>
export default {
    //初始默认为当前日期
    data() {
        return {
            //当月格子
            thisMonthDays: [],

            //上月格子
            empytGridsBefore: [],

            //下月格子
            empytGridsAfter: [],

            //显示日期
            title: '',

            //格式化日期
            format: '',

            year: 0,
            month: 0,
            date: 0,
            toggleType: 'large',
            scrollLeft: 0,

            //常量 用于匹配是否为当天
            YEAR: 0,

            MONTH: 0,
            DATE: 0,
            select: '',
            lastMonthFun: '',
            nextMonthFun: ''
        };
    },
    props: {
        defaultValue: {
            type: String,
            default: ''
        },
        //星期数组
        weekText: {
            type: Array,
            default: () => ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        },
        lastMonth: {
            type: String,
            default: '◀'
        },
        nextMonth: {
            type: String,
            default: '▶'
        }
    },
    mounted: function () {
        this.today();
    },
    methods: {
        //切换展示
        toggleTypeFun() {
            this.setData({
                toggleType: this.toggleType == 'mini' ? 'large' : 'mini'
            }); //初始化日历组件UI

            this.display(this.year, this.month, this.date);
        },

        //滚动模式
        //当年当月当天 滚动到制定日期 否则滚动到当月1日
        scrollCalendar(year, month, date) {
            console.log(year, month, date);
            var that = this;
            var scrollLeft = 0;
            uni.getSystemInfo({
                success(res) {
                    //切换月份时 date为0
                    if (date == 0) {
                        scrollLeft = 0; //切换到当年当月 滚动到当日

                        if (year == that.YEAR && month == that.MONTH) {
                            scrollLeft = that.DATE * 45 - res.windowWidth / 2 - 22.5;
                        }
                    } else {
                        // 点选具体某一天 滚到到指定日期
                        scrollLeft = date * 45 - res.windowWidth / 2 - 22.5;
                    }

                    that.setData({
                        scrollLeft: scrollLeft
                    });
                }
            });
        },

        //初始化
        display: function (year, month, date) {
            this.setData({
                year,
                month,
                date,
                title: year + '年' + this.zero(month) + '月'
            });
            this.createDays(year, month);
            this.createEmptyGrids(year, month); //滚动模糊 初始界面

            this.scrollCalendar(year, month, date);
        },
        //默认选中当天 并初始化组件
        today: function () {
            let DATE = this.defaultValue ? new Date(this.defaultValue) : new Date();
            let year = DATE.getFullYear();
            let month = DATE.getMonth() + 1;
            let date = DATE.getDate();
            let select = year + '-' + this.zero(month) + '-' + this.zero(date);
            this.setData({
                format: select,
                select: select,
                year: year,
                month: month,
                date: date,
                YEAR: year,
                MONTH: month,
                DATE: date
            }); //初始化日历组件UI

            this.display(year, month, date); //发送事件监听

            this.$emit('select', {
                detail: select
            });
        },
        //选择 并格式化数据
        selectFun: function (e) {
            let date = e.currentTarget.dataset.date;
            let select = this.year + '-' + this.zero(this.month) + '-' + this.zero(date);
            this.setData({
                title: this.year + '年' + this.zero(this.month) + '月' + this.zero(date) + '日',
                select: select,
                year: this.year,
                month: this.month,
                date: date
            }); //发送事件监听

            this.$emit('select', {
                detail: select
            }); //滚动日历到选中日期

            this.scrollCalendar(this.year, this.month, date);
        },
        //上个月
        lastMonthFun: function () {
            let month = this.month == 1 ? 12 : this.month - 1;
            let year = this.month == 1 ? this.year - 1 : this.year; //初始化日历组件UI

            this.display(year, month, 0);
        },
        //下个月
        nextMonthFun: function () {
            let month = this.month == 12 ? 1 : this.month + 1;
            let year = this.month == 12 ? this.year + 1 : this.year; //初始化日历组件UI

            this.display(year, month, 0);
        },
        //获取当月天数
        getThisMonthDays: function (year, month) {
            return new Date(year, month, 0).getDate();
        },
        // 绘制当月天数占的格子
        createDays: function (year, month) {
            let thisMonthDays = [];
            let days = this.getThisMonthDays(year, month);
            for (let i = 1; i <= days; i++) {
                thisMonthDays.push({
                    date: i,
                    dateFormat: this.zero(i),
                    monthFormat: this.zero(month),
                    week: this.weekText[new Date(Date.UTC(year, month - 1, i)).getDay()]
                });
            }

            this.setData({
                thisMonthDays
            }); // console.log('thisMonthDays', thisMonthDays)
        },
        //获取当月空出的天数
        createEmptyGrids: function (year, month) {
            let thisMonthDays = this.getThisMonthDays(year, month);
            let // 求出本月1号是星期几，本月前面空出几天，就是上月的日期
                // 0（周日） 到 6（周六）
                before = new Date(Date.UTC(year, month - 1, 1)).getDay();
            let // 后面空出的天数
                after = 7 - new Date(Date.UTC(year, month - 1, thisMonthDays)).getDay() - 1;
            let empytGridsBefore = [];
            let empytGridsAfter = []; //上月天数
            //当月天数
            let preMonthDays = month - 1 < 0 ? this.getThisMonthDays(year - 1, 12) : this.getThisMonthDays(year, month - 1); //前面空出日期

            for (let i = 1; i <= before; i++) {
                empytGridsBefore.push(preMonthDays - (before - i));
            } // 后面空出的日期

            for (let i = 1; i <= after; i++) {
                empytGridsAfter.push(i);
            }

            this.setData({
                empytGridsAfter,
                empytGridsBefore
            });
        },
        //补全0
        zero: function (i) {
            return i >= 10 ? i : '0' + i;
        }
    }
};
</script>
<style>
@import './calendar.css';
</style>
