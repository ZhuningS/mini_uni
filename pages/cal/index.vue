<template>
    <!-- 日历 -->
    <view class="calendar">
        <view class="cale_month flex-row j_b">
            <view @tap.stop.prevent="toLastMon">
                <image src="/static/img/de_icon3.png" class="cale_img"></image>
            </view>
            <view>{{ year }}.{{ months[monthIndex] }}</view>
            <view @tap.stop.prevent="toNextMon">
                <image src="/static/img/de_icon2.png" class="cale_img"></image>
            </view>
        </view>
        <view class="cale_week flex-row j_b">
            <block v-for="(item, index) in weekArr" :key="index">
                <view>{{ item }}</view>
            </block>
        </view>
        <view class="box1" :style="'width: ' + sysW * 7 + 'rpx'">
            <block v-for="(item, index) in arr" :key="index">
                <view
                    class="isrela flex-column"
                    :style="'width: ' + sysW + 'rpx; height: ' + sysW + 'rpx; line-height:' + sysW + 'rpx; margin-left:' + (index == 0 ? sysW * marLet : '') + 'rpx;'"
                >
                    <view v-if="item.isbook == 1" class="book isbook">{{ item.day }}</view>
                    <view v-if="item.isbook == 0">{{ item.day }}</view>
                    <view v-if="item.isbook == 2" class="book waitbook">{{ item.day }}</view>
                    <view v-if="item.isbook == 3" class="book stopbook">{{ item.day }}</view>
                    <!-- 当前日期 -->
                    <view v-if="item.day === getToday" class="dot"></view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            getToday: '',

            //当前日期
            chosedMonth: '',

            arr: [],
            sysW: 92,
            marLet: '',

            //左边边距
            weekArr: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

            monthIndex: '',
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December '],
            booklist: ['5', '12'],

            //状态一
            waitList: ['19'],

            //状态二
            //状态三
            stopList: ['26'],

            year: ''
        };
    },
    onShow: function (options) {
        var date = new Date();
        this.getTime(date); //获取时间

        this.setData({
            chosedMonth: date
        });
    },
    methods: {
        //上个月
        toLastMon() {
            let date = this.chosedMonth;
            date.setMonth(date.getMonth() - 1);
            let getToday = '';

            if (new Date().getMonth() == date.getMonth()) {
                getToday = new Date().getDate();
            }

            this.getTime(date);
            this.setData({
                chosedMonth: date,
                getToday: getToday
            });
        },

        //下个月
        toNextMon() {
            let date = this.chosedMonth;
            date.setMonth(date.getMonth() + 1);
            let getToday = '';

            if (new Date().getMonth() == date.getMonth()) {
                // -11
                getToday = new Date().getDate();
            }

            this.getTime(date);
            this.setData({
                chosedMonth: date,
                getToday: getToday
            });
        },

        //获取日历相关参数
        dataTime: function (date) {
            //   var date = new Date('2021-7-2');
            var year = date.getFullYear();
            var month = date.getMonth(); //0（一月） 到 11（十二月）

            var months = date.getMonth() + 1; //这个是当前的月份

            this.year = year; //当前的年份

            this.monthIndex = month; //当前月份的索引

            this.getToday = date.getDate(); //获取当前的日期 8号

            var d = new Date(year, months, 0); //Wed Jun 30 2021 00:00:00 GMT+0800 (中国标准时间)  2021年6月30日 周三

            this.lastDay = d.getDate(); //这是当前月份的所有天数 30

            let firstDay = new Date(year, month, 1); //Tue Jun 01 2021 00:00:00 GMT+0800 (中国标准时间)

            this.firstDay = firstDay.getDay(); // 第一天开始前的位置
        },

        getTime(date) {
            this.dataTime(date); //先清空数组，根据得到今月的最后一天日期遍历 得到所有日期

            if (this.arr) {
                this.arr = [];
            }

            for (var i = 0; i < this.lastDay; i++) {
                var obj = {};
                obj.day = i + 1;
                obj.isbook = 0; //无状态

                this.arr.push(obj);
                this.booklist.forEach((item) => {
                    if (this.arr[i].day == item) {
                        this.arr[i].isbook = 1; //状态一
                    }
                });
                this.waitList.forEach((item) => {
                    if (this.arr[i].day == item) {
                        this.arr[i].isbook = 2; //状态2
                    }
                });
                this.stopList.forEach((item) => {
                    if (this.arr[i].day == item) {
                        this.arr[i].isbook = 3; //状态3
                    }
                });
            }

            this.setData({
                marLet: this.firstDay,
                arr: this.arr,
                monthIndex: this.monthIndex,
                getToday: this.getToday,
                year: this.year
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
