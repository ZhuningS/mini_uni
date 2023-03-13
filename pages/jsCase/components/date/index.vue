<template>
    <view>
        <!-- components/date/index.wxml -->
        <view class="mask" @tap.stop.prevent="tapNo" v-if="isShowClone"></view>
        <view class="content" v-if="isShowClone" @touchmove.stop.prevent="showture">
            <view class="box">
                <view class="calendar-box">
                    <view class="calendar-column">
                        <view class="listing" :style="'background: ' + color2 + ';'">
                            <view class="item" :style="'color: ' + theme_color + ';'">日</view>
                            <view class="item" :style="'color: ' + theme_color + ';'">一</view>
                            <view class="item" :style="'color: ' + theme_color + ';'">二</view>
                            <view class="item" :style="'color: ' + theme_color + ';'">三</view>
                            <view class="item" :style="'color: ' + theme_color + ';'">四</view>
                            <view class="item" :style="'color: ' + theme_color + ';'">五</view>
                            <view class="item" :style="'color: ' + theme_color + ';'">六</view>
                        </view>
                    </view>
                    <!-- bindscrolltoupper="getLastCalendar" upper-threshold="20" -->
                    <scroll-view scroll-y class="scroll-y" @scrolltolower="getCalendarNext" :scroll-into-view="currentDate">
                        <view class="calendar">
                            <block v-for="(item, index) in data" :key="item.data">
                                <view class="date" :id="'view' + index">{{ item.year }}年{{ item.month }}月</view>

                                <view class="select-box" :data-test="item.weeks.length">
                                    <block v-for="(week, i1) in item.weeks" :key="week.weeks">
                                        <block v-for="(day, i2) in week" :key="day.days">
                                            <block v-if="day.noDay">
                                                <!-- 月前月后补位 -->
                                                <view class="item-box"></view>
                                            </block>

                                            <block v-else-if="day.noLessMonth">
                                                <!-- 不可选择 -->
                                                <view class="item-box">
                                                    <view class="item day_no">{{ day.date }}</view>
                                                </view>
                                            </block>

                                            <block v-else-if="day.isStart && day.isEnd">
                                                <!-- 已选择【开始/结束】同为当天 -->
                                                <view
                                                    class="item-box day_late_bg_left_and_right"
                                                    @tap="getThisData"
                                                    data-title="已选择状态开始和结束"
                                                    :data-index="index"
                                                    :data-i1="i1"
                                                    :data-i2="i2"
                                                >
                                                    <view class="item" :style="'background: ' + theme_color + ';'">{{ day.date }}</view>
                                                    <view class="start">开始</view>
                                                    <view class="end">结束</view>
                                                </view>
                                            </block>

                                            <block v-else-if="day.isStart">
                                                <!-- 已选择【开始】 -->
                                                <block v-if="i2 == 6 || type == '已选择开始时间' || day.isBack">
                                                    <view
                                                        class="item-box day_late_bg_left_and_right"
                                                        @tap="getThisData"
                                                        data-title="已选择状态开始-消除背景"
                                                        :data-index="index"
                                                        :data-i1="i1"
                                                        :data-i2="i2"
                                                    >
                                                        <view class="item" :style="'background: ' + theme_color + ';'">{{ day.date }}</view>
                                                        <view class="start">开始</view>
                                                    </view>
                                                </block>
                                                <block v-else>
                                                    <view
                                                        class="item-box day_late_bg_left"
                                                        @tap="getThisData"
                                                        data-title="已选择状态开始"
                                                        :style="'background:linear-gradient(to right, #ffffff 50%, ' + color2 + ' 50%);'"
                                                        :data-index="index"
                                                        :data-i1="i1"
                                                        :data-i2="i2"
                                                    >
                                                        <view class="item" :style="'background: ' + theme_color + ';'">{{ day.date }}</view>
                                                        <view class="start">开始</view>
                                                    </view>
                                                </block>
                                            </block>

                                            <block v-else-if="day.isEnd">
                                                <!-- 已选择【结束】 -->
                                                <block v-if="i2 == 0 || day.isFront">
                                                    <view
                                                        class="item-box day_late_bg_left_and_right"
                                                        @tap="getThisData"
                                                        data-title="已选择状态结束-消除背景"
                                                        :data-index="index"
                                                        :data-i1="i1"
                                                        :data-i2="i2"
                                                    >
                                                        <view class="item" :style="'background: ' + theme_color + ';'">{{ day.date }}</view>
                                                        <view class="end">结束</view>
                                                    </view>
                                                </block>
                                                <block v-else>
                                                    <view
                                                        class="item-box day_late_bg_right"
                                                        @tap="getThisData"
                                                        data-title="已选择状态结束"
                                                        :style="'background: linear-gradient(to left, #ffffff 50%, ' + color2 + ' 50%);'"
                                                        :data-index="index"
                                                        :data-i1="i1"
                                                        :data-i2="i2"
                                                    >
                                                        <view class="item" :style="'background: ' + theme_color + ';'">{{ day.date }}</view>
                                                        <view class="end">结束</view>
                                                    </view>
                                                </block>
                                            </block>

                                            <block v-else-if="day.isMatter">
                                                <!-- 已选择【背景】 -->
                                                <block v-if="i2 == 0 && day.isBack">
                                                    <!-- 是第一个且是本月最后一天且一行就它一个 -->
                                                    <view
                                                        :style="'background: linear-gradient(to right, #ffffff 50%, ' + color2 + ' 50%);'"
                                                        class="item-box day_late_bg_left_start_and_right_end day_late_bg_left_start day_late_bg_left_start_and_right_end_and_back"
                                                        @tap="getThisData"
                                                        data-title="已选择状态背景-设置半边框"
                                                        :data-index="index"
                                                        :data-i1="i1"
                                                        :data-i2="i2"
                                                    >
                                                        <view class="item" :style="'background:' + color2">{{ day.date }}</view>
                                                    </view>
                                                </block>
                                                <block v-else-if="i2 == 6 && day.isFront">
                                                    <!-- 是第一个且是本月第一天且一行就它一个 -->
                                                    <!-- style="background: {{color2}};" -->
                                                    <view
                                                        class="item-box day_late_bg_left_start_and_right_end day_late_bg_left_start day_late_bg_left_start_and_right_end_and_front"
                                                        @tap="getThisData"
                                                        data-title="已选择状态背景-设置左右半边框"
                                                        :data-index="index"
                                                        :data-i1="i1"
                                                        :data-i2="i2"
                                                    >
                                                        <view class="item" :style="'background:' + color2">{{ day.date }}</view>
                                                    </view>
                                                </block>
                                                <block v-else-if="i2 == 0 || day.isFront">
                                                    <!-- 是第一个或者是否本月第一天 -->
                                                    <view
                                                        :style="'background: linear-gradient(to right, #ffffff 50%, ' + color2 + ' 50%);'"
                                                        class="item-box day_late_bg_left_start_and_right_end day_late_bg_left_start"
                                                        @tap="getThisData"
                                                        data-title="已选择状态背景-设置左半边框"
                                                        :data-index="index"
                                                        :data-i1="i1"
                                                        :data-i2="i2"
                                                    >
                                                        <view class="item" :style="'background:' + color2">{{ day.date }}</view>
                                                    </view>
                                                </block>
                                                <block v-else-if="i2 == 6 || day.isBack">
                                                    <!-- 是第一个且是本月最后一天 -->
                                                    <view
                                                        :style="'background: linear-gradient(to left, #ffffff 50%, ' + color2 + ' 50%);'"
                                                        class="item-box day_late_bg_left_start_and_right_end day_late_bg_right_end"
                                                        @tap="getThisData"
                                                        data-title="已选择状态背景-设置右半边框"
                                                        :data-index="index"
                                                        :data-i1="i1"
                                                        :data-i2="i2"
                                                    >
                                                        <view class="item" :style="'background: ' + color2 + ';'">{{ day.date }}</view>
                                                    </view>
                                                </block>
                                                <block v-else>
                                                    <view
                                                        :style="'background: ' + color2 + ';'"
                                                        class="item-box day_late_bg_left_start_and_right_end"
                                                        @tap="getThisData"
                                                        data-title="已选择状态背景"
                                                        :data-index="index"
                                                        :data-i1="i1"
                                                        :data-i2="i2"
                                                    >
                                                        <view class="item">{{ day.date }}</view>
                                                    </view>
                                                </block>
                                            </block>

                                            <!-- 未选择的时候 -->

                                            <block v-else>
                                                <!-- 可选择 -->
                                                <view class="item-box" @tap="getThisData" data-title="可选择" :data-index="index" :data-i1="i1" :data-i2="i2">
                                                    <view class="item">{{ day.date }}</view>
                                                </view>
                                            </block>
                                        </block>
                                    </block>
                                </view>
                            </block>
                        </view>
                    </scroll-view>
                </view>
                <view class="btn-box">
                    <view class="no" @tap="tapNo">取消</view>
                    <block v-if="type == '已选择结束时间'">
                        <view class="yes" @tap="tapYes" :style="'background: ' + theme_color + ';'">确认</view>
                    </block>
                    <block v-else>
                        <view class="yes hide" :style="'background: ' + theme_color + ';'">确认</view>
                    </block>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            currentDate: '',

            //scrollintoview的id
            year: '',

            // 年
            month: '',

            // 月
            date: '',

            // 日
            today: {},

            // 今天的年月日
            data: [
                // 容器
                // {
                //   year: '',
                //   month: '',
                //   date: '',
                //   weeks: [
                //     {
                //       year: '',
                //       month: '',
                //       date: '',
                //       noDay: true,// 是否可以选择
                //       noLessMonth: true,// 是否小于本月日期
                //       isStart: false,// 是否是开始状态
                //       isEnd: false,// 是否是结束状态
                //       isMatter: false,// 是否开始结束中间状态
                //       isFront: false,// 是否本月第一天
                //       isBack: false,// 是否本月最后一天
                //     }
                //   ],// 数据
                // }
            ],

            // 未选择 已选择开始时间 已选择结束时间
            type: '未选择',

            loop_num: '',
            color2: '',

            week: {
                weeks: ''
            },

            day: {
                days: '',
                noDay: '',
                noLessMonth: '',
                date: '',
                isStart: '',
                isEnd: '',
                isBack: '',
                isFront: '',
                isMatter: ''
            },

            i1: '',
            i2: '',
            isShowClone: false
        };
    },
    props: {
        // 是否展示日期选择
        isShow: {
            type: Boolean,
            default: false
        },
        // 开始时间
        timeStart: {
            type: String,
            default: ''
        },
        // 结束时间
        timeEnd: {
            type: String,
            default: ''
        },
        // 最小日期
        minDate: {
            type: String,
            default: '2018/1/1'
        },
        // 主题色
        theme_color: {
            type: String,
            default: '#2493F8'
        }
    },
    methods: {
        // 颜色转换
        hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                  }
                : null;
        },

        // rgba+透明度转换到是十六进制
        hexify(color) {
            var values = color
                .replace(/rgba?\(/, '')
                .replace(/\)/, '')
                .replace(/[\s+]/g, '')
                .split(',');
            var a = parseFloat(values[3] || 1);
            var r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255);
            var g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255);
            var b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
            return '#' + ('0' + r.toString(16)).slice(-2) + ('0' + g.toString(16)).slice(-2) + ('0' + b.toString(16)).slice(-2);
        },

        reset() {
            this.data.forEach((item, index) => {
                item.weeks.forEach((item1, index1) => {
                    item1.forEach((item2, index2) => {
                        item2.isStart = false;
                        item2.isEnd = false;
                        item2.isMatter = false;
                    });
                });
            });
            this.setData({
                data: this.data
            }); // this.triggerEvent('reset', {});
        },

        showture() {
            return false;
        },

        // 初始化
        init() {
            let _date = new Date(this.minDate); //最小日期

            let new_date = new Date(); //当前月

            let year = _date.getFullYear();

            let month = _date.getMonth() + 1;

            let date = _date.getDate();

            let month_num = this.MonthsBetw(_date, new_date);
            let currentDate = 'view' + month_num; // 初始化当月数据

            this.setData({
                currentDate: currentDate,
                year,
                month,
                date,
                today: {
                    year,
                    month,
                    date
                }
            });
            this.getCalendar(month_num);
        },

        // 计算最小时期与当前日期之前的时间差
        MonthsBetw(date1, date2) {
            let start = new Date(date1);
            let end = new Date(date2);
            let startYear = start.getFullYear();
            let startMonth = start.getMonth();
            let endYear = end.getFullYear();
            let endMonth = end.getMonth();
            let months = (endYear - startYear) * 12 + endMonth - startMonth;
            return months;
        },

        // 获取日历（每次获得半年的月份）
        async getCalendarNext(e) {
            for (let i = 0; i < 6; i++) {
                // set每月的数据
                this.data.push(await this.showThisDay(this.year, this.month, this.date));

                if (this.month == 12) {
                    // 加一年 1月
                    this.year = this.year + 1;
                    this.month = 1;
                } else {
                    // 月份加一
                    this.month = this.month + 1;
                }
            }

            this.setData({
                data: this.data
            }); // console.log('滚动的数据', this.data.data)
        },

        // 获取日历初始化
        async getCalendar(loop_num) {
            // console.log(loop_num)
            this.setData({
                loop_num: loop_num
            });

            for (let i = 0; i < loop_num + 1; i++) {
                // set每月的数据
                this.data.push(await this.showThisDay(this.year, this.month, this.date));

                if (this.month == 12) {
                    // 加一年 1月
                    this.year = this.year + 1;
                    this.month = 1;
                } else {
                    // 月份加一
                    this.month = this.month + 1;
                }
            }

            this.setData({
                data: this.data
            });
        },

        // 获取每月的数据
        showThisDay(_year, _month) {
            return new Promise((resolve, reject) => {
                let canlender = [];
                let year = _year;
                let month = _month;
                let firstDay = new Date(year, month - 1, 1).getDay();
                let lastMonthDays = []; // 上个月需要显示的天数

                for (let i = firstDay - 1; i >= 0; i--) {
                    lastMonthDays.push({
                        year: year,
                        date: parseInt(new Date(year, month - 1, -i).getDate()),
                        month: parseInt(month) - 1,
                        noDay: true
                    });
                }

                let currentMonthDys = [];
                let eachLast = new Date(year, month, 0).getDate(); //  这个月显示的天数进行判断  如果已经过去则没法点击

                for (let i = 1; i <= eachLast; i++) {
                    let info = {
                        year: year,
                        date: i,
                        month: month,
                        noDay: false,
                        isFront: i == 1 ? true : false,
                        isBack: i == eachLast ? true : false
                    };

                    if (this.today.year == year && this.today.month == month) {
                        if (i < this.today.date) {
                            // 是否小于本月日期
                            info.noLessMonth = true;
                        }
                    }

                    currentMonthDys.push(info);
                }

                let nextMonthDays = []; // 下个月显示的天数

                let endDay = new Date(year, month, 0).getDay();

                for (let i = 1; i < 7 - endDay; i++) {
                    nextMonthDays.push({
                        year: year,
                        date: i,
                        month: parseInt(month) + 1,
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

                let info = {
                    weeks: weeks,
                    year: _year,
                    month: _month
                };
                resolve(info);
            });
        },

        // 监听开始时间和结束时间修改
        setDate() {
            let item1 = this.timeStart.split('-');
            let _item1 = {
                year: item1[0],
                month: item1[1],
                date: item1[2]
            };
            let item2 = this.timeEnd.split('-');
            let _item2 = {
                year: item2[0],
                month: item2[1],
                date: item2[2]
            };

            for (let item of this.data) {
                for (let weeks of item.weeks) {
                    for (let i of weeks) {
                        let status1 = i.year == _item1.year && i.month == _item1.month && i.date == _item1.date;
                        let status2 = i.year == _item2.year && i.month == _item2.month && i.date == _item2.date;

                        if (status1 && status2) {
                            // 开始日期标记
                            i.isStart = true; // 结束日期标记

                            i.isEnd = true;
                        } else if (status1) {
                            // 开始日期标记
                            i.isStart = true;
                        } else if (status2) {
                            // 结束日期标记
                            i.isEnd = true;
                        } else {
                            i.isStart = false;
                            i.isEnd = false;
                        }
                    }
                }
            } // 开始结束中间日期状态标记

            this.editItem5(_item1, _item2);
            this.setData({
                type: '已选择结束时间',
                data: this.data
            });
        },

        // 清除日期
        clearDate() {
            return new Promise((resolve, reject) => {
                for (let item of this.data) {
                    for (let weeks of item.weeks) {
                        for (let i of weeks) {
                            i.isStart = false;
                            i.isEnd = false;
                            i.isMatter = false;
                        }
                    }
                }

                resolve();
            });
        },

        // 修改当前点击状态为'开始' type改为'已选择开始时间'
        editItem1(param) {
            let { index, i1, i2 } = param;
            this.data[index].weeks[i1][i2].isStart = true;
            this.setData({
                type: '已选择开始时间',
                data: this.data
            });
        },

        // 选择结束时间
        editItem2(param) {
            let { data } = this;
            let { index, i1, i2 } = param;

            if (getDate1() - getDate2() >= 0) {
                // 当前点击时间晚于或等于开始时间
                // 修改当前点击状态为'结束' 开始结束中间日期状态修改为'true' type改为'已选择结束时间'
                this.editItem3({
                    index,
                    i1,
                    i2
                });
            } else {
                // 当前点击时间早于开始时间
                // 修改之前开始状态改为'结束' 修改当前点击状态为'开始' 开始结束中间日期状态修改为'true' type改为'已选择结束时间'
                this.editItem4({
                    index,
                    i1,
                    i2
                });
            } // 当前选中日期时间戳

            function getDate1() {
                let item1 = data[index].weeks[i1][i2];

                let _month1 = item1.month < 10 ? '0' + item1.month : item1.month;

                let _date1 = item1.date < 10 ? '0' + item1.date : item1.date;

                let date1 = Date.parse(new Date(`${item1.year}-${_month1}-${_date1}`.replace(/-/g, '/')));
                return date1;
            } // 之前选中日期时间戳

            function getDate2() {
                let item2 = {};

                for (let item of data) {
                    for (let weeks of item.weeks) {
                        for (let i of weeks) {
                            if (i.isStart) {
                                item2 = i;
                            }
                        }
                    }
                }

                let _month2 = item2.month < 10 ? '0' + item2.month : item2.month;

                let _date2 = item2.date < 10 ? '0' + item2.date : item2.date;

                let date2 = Date.parse(new Date(`${item2.year}-${_month2}-${_date2}`.replace(/-/g, '/')));
                return date2;
            }
        },

        // 修改当前点击状态为'结束' 开始结束中间日期状态修改为'true' type改为'已选择结束时间'
        editItem3(param) {
            let { index, i1, i2 } = param; // 修改当前点击状态为'结束'

            this.data[index].weeks[i1][i2].isEnd = true;
            let _item1 = {};
            let _item2 = this.data[index].weeks[i1][i2];

            for (let item of this.data) {
                for (let weeks of item.weeks) {
                    for (let i of weeks) {
                        if (i.isStart) {
                            _item1 = i;
                        }
                    }
                }
            } // console.log('开始日期', _item1)
            // console.log('结束日期', _item2)
            // 开始结束中间日期状态修改为'true'

            this.editItem5(_item1, _item2);
            this.setData({
                type: '已选择结束时间',
                data: this.data
            });
        },

        // 修改之前开始状态改为'结束' 修改当前点击状态为'开始' 开始结束中间日期状态修改为'true' type改为'已选择结束时间'
        editItem4(param) {
            let { index, i1, i2 } = param;
            let _item1 = this.data[index].weeks[i1][i2];
            let _item2 = {};

            for (let item of this.data) {
                for (let weeks of item.weeks) {
                    for (let i of weeks) {
                        if (i.isStart) {
                            i.isStart = false; // 修改之前开始状态改为'结束'

                            i.isEnd = true;
                            _item2 = i;
                        }
                    }
                }
            } // console.log('开始日期', _item1)
            // console.log('结束日期', _item2)
            // 修改当前点击状态为'开始'

            this.data[index].weeks[i1][i2].isStart = true; // 开始结束中间日期状态修改为'true'

            this.editItem5(_item1, _item2);
            this.setData({
                type: '已选择结束时间',
                data: this.data
            });
        },

        // 开始结束中间日期状态修改为'true'
        editItem5(_item1, _item2) {
            for (let item of this.data) {
                for (let weeks of item.weeks) {
                    for (let i of weeks) {
                        // 筛选年范围
                        if (_item1.year == _item2.year) {
                            // 开始日期和结束日期在同一年(2021~2021)
                            if (i.month >= _item1.month && i.month <= _item2.month) {
                                // 筛选月范围
                                if (_item1.month == _item2.month) {
                                    // 开始日期和结束日期在同一月
                                    if (i.date > _item1.date && i.date < _item2.date) {
                                        i.isMatter = true;
                                    }
                                } else {
                                    // 不在同一月
                                    if (i.month == _item1.month) {
                                        // 开始日期当月
                                        if (i.date > _item1.date) {
                                            i.isMatter = true;
                                        }
                                    } else if (i.month == _item2.month) {
                                        // 结束日期当月
                                        if (i.date < _item2.date) {
                                            i.isMatter = true;
                                        }
                                    } else {
                                        // 开始日期和结束日期中包含的月
                                        i.isMatter = true;
                                    }
                                }
                            }
                        } else if (i.year == _item1.year) {
                            // 开始日期年(2021~2023 中的2021)
                            if (i.month > _item1.month) {
                                i.isMatter = true;
                            } else if (i.month == _item1.month && i.date > _item1.date) {
                                i.isMatter = true;
                            }
                        } else if (i.year == _item2.year) {
                            // 结束日期年(2021~2023 中的2023)
                            if (i.month < _item2.month) {
                                i.isMatter = true;
                            } else if (i.month == _item2.month && i.date < _item2.date) {
                                i.isMatter = true;
                            }
                        } else {
                            // 开始日期和结束日期包含的年(2021~2023 中的2022)
                            i.isMatter = true;
                        }
                    }
                }
            }
        },

        // 选择日期
        getThisData(e) {
            let { data, type } = this;
            let { title, index, i1, i2 } = e.currentTarget.dataset; // console.log('点击参数接收值:', {
            //   title,
            //   index,
            //   i1,
            //   i2
            // })
            // console.log('点击值:', data[index].weeks[i1][i2])
            // console.log('当前type:', type)

            switch (type) {
                case '未选择':
                    // 清除日期
                    this.clearDate().then(() => {
                        // 修改当前点击状态为'开始' type改为'已选择开始时间'
                        this.editItem1({
                            index,
                            i1,
                            i2
                        });
                    });
                    break;

                case '已选择开始时间':
                    // 选择结束时间
                    this.editItem2({
                        index,
                        i1,
                        i2
                    });
                    break;

                case '已选择结束时间':
                    // 清除日期
                    this.clearDate().then(() => {
                        // 修改当前点击状态为'开始' type改为'已选择开始时间'
                        this.editItem1({
                            index,
                            i1,
                            i2
                        });
                    });
                    break;
            }
        },

        // 关闭
        tapNo() {
            this.setData({
                isShowClone: false
            });
            this.$emit('tapNo', {
                detail: {}
            });
        },

        // 确定
        tapYes() {
            let start = {};
            let end = {};

            for (let item of this.data) {
                for (let weeks of item.weeks) {
                    for (let i of weeks) {
                        if (i.isStart) {
                            start = i;
                        }

                        if (i.isEnd) {
                            end = i;
                        }
                    }
                }
            }

            this.$emit('tapYes', {
                detail: {
                    start,
                    end
                }
            });
            this.tapNo();
        }
    },
    beforeMount() {
        this.init();
        let color = this.hexToRgb(this.theme_color);
        let new_color = '';
        let new_color1 = '';
        let color2;
        for (let i in color) {
            new_color += i;
            new_color1 += color[i] + ',';
        }

        color2 = this.hexify(new_color + '(' + new_color1 + '.1)');
        this.setData({
            color2
        });
    },
    watch: {
        timeStart: {
            handler: function (e) {
                if (this.data.length) {
                    this.setDate();
                } else {
                    setTimeout(() => {
                        this.setDate();
                    }, 50);
                }
            },

            immediate: true
        },

        timeEnd: {
            handler: function (e) {
                if (this.data.length) {
                    this.setDate();
                } else {
                    setTimeout(() => {
                        this.setDate();
                    }, 50);
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
@import './index.css';
</style>
