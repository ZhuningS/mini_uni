<template>
    <view>
        <view class="content" v-if="isShowClone">
            <view class="box">
                <view class="calendar">
                    <view class="head-box">
                        <image class="icon" :src="cdn + '/calendar/date_selection_icon_left.png'"></image>
                        <picker class="val" mode="date" :value="date" @change="bindDateChange">
                            {{ canlender.year + '年' + canlender.month + '月' + (canlender.date ? canlender.date + '日' : '') + (canlender.day ? ' ' + canlender.day : '') }}
                        </picker>
                        <image class="icon" :src="cdn + '/calendar/date_selection_icon_right.png'"></image>
                        <view class="left" @tap="tapLeft"></view>
                        <view class="right" @tap="tapRight"></view>
                    </view>

                    <view class="select-box">
                        <view class="listing">
                            <view class="item">日</view>
                            <view class="item">一</view>
                            <view class="item">二</view>
                            <view class="item">三</view>
                            <view class="item">四</view>
                            <view class="item">五</view>
                            <view class="item">六</view>
                        </view>

                        <block v-for="(week, i) in canlender.weeks" :key="i">
                            <block v-for="(day, index) in week" :key="index">
                                <view class="item-box" :data-i="i" :data-index="index" @tap="getThisData">
                                    <view :class="'item ' + (day.click ? 'day_late' : '') + ' ' + (day.noDay ? 'day_no' : '')">{{ day.date }}</view>
                                </view>
                            </block>
                        </block>
                    </view>

                    <view class="time-box">
                        <view class="name">时间</view>
                        <picker class="time" mode="time" :value="canlender.time" @change="bindchange">{{ canlender.time }}</picker>
                    </view>
                </view>

                <view class="btn-box">
                    <view class="no" @tap="tapNo">取消</view>
                    <view class="yes" @tap="tapYes">确认</view>
                </view>
            </view>
        </view>

        <view class="alert-box" v-if="isShowAlert1">
            <view class="alert">
                <view class="title">
                    <text>提交的时间超过今天了\n请重新选择</text>
                </view>
                <view class="btn" @tap="closeAlert">好的</view>
            </view>
        </view>

        <view class="alert-box" v-if="isShowAlert2">
            <view class="alert">
                <view class="title">
                    <text>提交的时间早于宝宝出生日\n请重新选择</text>
                </view>
                <view class="btn" @tap="closeAlert">好的</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            cdn: 'https://chaozhenrihuajianhang.oss-cn-hangzhou.aliyuncs.com/test/xiaochengxu',

            canlender: {
                year: '',
                // 年
                month: '',
                // 月
                date: '',
                // 日
                day: '',
                // 周几
                weeks: [],
                // 数据
                time: '00:00'
            },

            isShowAlert1: false,

            // 提交的时间是否晚于今天
            // 提交的时间是否早与出生日期
            isShowAlert2: false,

            date: '',
            i: '',
            week: [],

            day: {
                click: false,
                noDay: false,
                date: ''
            },

            isShowClone: false,
            birthdayClone: ''
        };
    },
    props: {
        // 显示开关
        isShow: {
            type: Boolean,
            default: false
        },
        // 当前选中的时间 (2021-06-30) 不传递默认当前时间
        defaultTime: {
            type: String,
            default: ''
        },
        // 出生日期 不传递则不进行当前时间是否小于出生日期校验(2021-06-30)
        birthday: {
            type: String,
            default: ''
        },
        // 小时分钟
        time: {
            type: String,
            default: '00:00'
        }
    },
    beforeMount() {
        this.init();
        setTimeout(() => {}, 2000);
    },
    methods: {
        // 初始化
        init() {
            if (this.defaultTime) {
                let list = this.defaultTime.split('-');
                this.showThisDay(list[0], list[1], list[2]);
            } else {
                let _date = new Date();

                let year = _date.getFullYear();

                let month = _date.getMonth() + 1;

                let date = _date.getDate();

                this.showThisDay(year, month, date);
            }
        },

        /**
         *  刷新页面值
         */
        showThisDay(_year, _month, _date) {
            _year = parseInt(_year);
            _month = parseInt(_month);
            _date = parseInt(_date);
            let canlender = [];
            let year = _year;
            let month = _month;
            let firstDay = new Date(year, month - 1, 1).getDay();
            let lastMonthDays = []; // 上个月需要显示的天数

            for (let i = firstDay - 1; i >= 0; i--) {
                lastMonthDays.push({
                    year: year,
                    date: new Date(year, month - 1, -i).getDate(),
                    month: month - 1,
                    click: false,
                    noDay: true
                });
            }

            let currentMonthDys = []; //  这个月显示的天数进行判断  如果已经过去则没法点击

            for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
                let info = {
                    year: year,
                    month: month,
                    date: i,
                    day: 1,
                    noDay: false
                };

                if (i == _date) {
                    info.click = true;
                } else {
                    info.click = false;
                }

                currentMonthDys.push(info);
            }

            let nextMonthDays = []; // 下个月显示的天数

            let endDay = new Date(year, month, 0).getDay();

            for (let i = 1; i < 7 - endDay; i++) {
                nextMonthDays.push({
                    year: year,
                    date: i,
                    month: month + 1,
                    click: false,
                    noDay: true
                });
            }

            canlender = canlender.concat(lastMonthDays, currentMonthDys, nextMonthDays);
            let weeks = [];

            for (let i = 0; i < canlender.length; i++) {
                if (i % 7 == 0) {
                    weeks[parseInt(i / 7)] = new Array(7);
                }

                weeks[parseInt(i / 7)][i % 7] = canlender[i];
            }

            this.setData({
                'canlender.weeks': weeks,
                'canlender.year': _year,
                'canlender.month': _month
            });

            if (_date) {
                this.setData({
                    'canlender.date': _date,
                    'canlender.day': this.getWeek(`${_year}-${_month}-${_date}`)
                });
            } else {
                this.setData({
                    'canlender.date': '',
                    'canlender.day': ''
                });
            }
        },

        /**
         *  获取到当前天数
         */
        getThisData(e) {
            let { canlender } = this;
            let { i, index } = e.currentTarget.dataset;
            let item = canlender.weeks[i][index];

            if (!item.noDay) {
                for (let i of canlender.weeks) {
                    for (let j of i) {
                        j.click = false;
                    }
                }

                canlender.weeks[i][index].click = true;
                this.setData({
                    'canlender.weeks': canlender.weeks,
                    'canlender.year': item.year,
                    'canlender.month': item.month,
                    'canlender.date': item.date,
                    'canlender.day': this.getWeek(`${item.year}-${item.month}-${item.date}`)
                });
            }
        },

        /**
         *  选择日期
         */
        bindDateChange(e) {
            let dateArr = e.detail.value.split('-');
            let year = dateArr[0];
            let month = dateArr[1].substring(0, 1) == 0 || dateArr[1].substring(0, 1) == '0' ? dateArr[1].replace(/^[0-9]/, '') : dateArr[1];
            let date = dateArr[2].substring(0, 1) == 0 || dateArr[2].substring(0, 1) == '0' ? dateArr[2].replace(/^[0-9]/, '') : dateArr[2];
            this.showThisDay(year, month, date);
        },

        // 点击上一月
        tapLeft() {
            let { canlender } = this;

            if (canlender.month == 1) {
                // 减一年 12月
                canlender.year = canlender.year - 1;
                canlender.month = 12;
            } else {
                // 月份减一
                canlender.month = canlender.month - 1;
            }

            this.showThisDay(canlender.year, canlender.month, '');
        },

        // 点击下一月
        tapRight() {
            let { canlender } = this;

            if (canlender.month == 12) {
                // 加一年 1月
                canlender.year = canlender.year + 1;
                canlender.month = 1;
            } else {
                // 月份加一
                canlender.month = canlender.month + 1;
            }

            this.showThisDay(canlender.year, canlender.month, '');
        },

        /**
         * 是否为Null
         * @param object
         * @returns {Boolean}
         */
        isNull(object) {
            if (object == null || typeof object == 'undefined') {
                return true;
            }

            return false;
        },

        /**
         * 根据日期字符串获取星期几
         * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
         * @returns {String}
         */
        getWeek(dateString) {
            let date;

            if (this.isNull(dateString)) {
                date = new Date();
            } else {
                var dateArray = dateString.split('-');
                date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
            } //var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
            //return "星期" + weeks[date.getDay()];

            return '周' + '日一二三四五六'.charAt(date.getDay());
        },

        // 选时间
        bindchange(e) {
            this.setData({
                'canlender.time': e.detail.value
            });
        },

        // 关闭
        tapNo() {
            this.setData({
                isShowClone: false
            });
        },

        // 确定
        tapYes() {
            console.log('this.data', this);
            let { canlender, birthday, time } = this;

            if (!canlender.date) {
                uni.showToast({
                    title: '请选择日期',
                    icon: 'none'
                });
                return;
            } // 今天日期时间戳

            let date1 = Date.parse(new Date()); // 当前选中日期时间戳

            canlender.month = parseInt(canlender.month);
            canlender.date = parseInt(canlender.date);
            let m = canlender.month < 10 ? '0' + canlender.month : canlender.month;
            let d = canlender.date < 10 ? '0' + canlender.date : canlender.date;
            let date2 = Date.parse(new Date(`${canlender.year}/${m}/${d} ${time}`)); // 出生日期时间戳

            let list = birthday.split('-');
            list[1] = parseInt(list[1]);
            list[2] = parseInt(list[2]);

            if (list[1] < 10) {
                list[1] = '0' + list[1];
            } else {
                list[1] = list[1];
            }

            if (list[2] < 10) {
                list[2] = '0' + list[2];
            } else {
                list[2] = list[2];
            }

            let date3 = Date.parse(new Date(`${list[0]}/${list[1]}/${list[2]}`));

            if (date2 - date1 > 0) {
                // 选中时间晚于开始时间
                this.setData({
                    isShowAlert1: true
                });
            } else {
                if (birthday && date2 - date3 < 0) {
                    // 选中时间早于出生日期
                    this.setData({
                        isShowAlert2: true
                    });
                } else {
                    this.$emit('tapYes', {
                        detail: this.canlender
                    });
                    this.tapNo();
                }
            }
        },

        // 关闭弹窗
        closeAlert() {
            this.setData({
                isShowAlert1: false,
                isShowAlert2: false
            });
        }
    },
    watch: {
        defaultTime: {
            handler: function () {
                this.init();
            },

            immediate: true
        },

        birthday: {
            handler: function (e) {
                this.birthdayClone = this.deepClone(this.birthday);
                this.setData({
                    birthdayClone: e
                });
            },

            immediate: true
        },

        time: {
            handler: function (e) {
                if (e) {
                    this.setData({
                        'canlender.time': e
                    });
                }
            },

            immediate: true
        },

        isShow: {
            handler: function (newVal, oldVal) {
                this.isShowClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './date-selection.css';
</style>
