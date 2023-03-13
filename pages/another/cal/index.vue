<template>
    <view>
        <!-- pages/another/cal/index.wxml -->
        <view class="con_sign">
            <view class="con_sign_box">
                <view class="con_pillar">
                    <view class="con_post" v-for="(item, index) in 5" :key="index">
                        <view></view>
                    </view>
                </view>
                <view class="con_sign_day">
                    <image @tap="onshow" src="https://i.postimg.cc/mgsKJGLw/susu1.jpg"></image>
                    <view>
                        持续签到
                        <text>2</text>
                        天
                    </view>
                </view>
                <view class="con_sign_content">
                    <view class="con_week" id="week">
                        <block v-for="(item, index) in week" :key="index">
                            <view class="con_wook">
                                <view :style="'width: ' + sysW + 'px; height: ' + sysW + 'px; line-height: ' + sysW + 'px;'">{{ item.wook }}</view>
                            </view>
                        </block>
                    </view>
                    <view class="con_week">
                        <block v-for="(item, index) in day" :key="index">
                            <view class="con_wook" :style="'width: ' + sysW + 'px; height: ' + sysW + 'px; line-height: ' + sysW + 'px;'">
                                <view :class="item.wook == getDate ? 'dateOn' : ''">{{ item.wook }}</view>
                                <view class="con_clocksucceed" v-if="item.src">
                                    <image :src="item.src"></image>
                                </view>
                            </view>
                        </block>
                    </view>
                    <view class="con_circle">
                        <view class="con_incircle">
                            <view class="con_excircle">
                                <view class="con_innercircle">
                                    <view class="con_btn">
                                        <text>打卡</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="con_calendar" :style="'display:' + display">
            <view class="con_bg" @tap="onhide"></view>
            <view class="con_con_calendar_box">
                <view class="canlendarBgView">
                    <view class="canlendarView">
                        <view class="canlendarTopView">
                            <view class="leftBgView" @tap="handleCalendar" data-handle="prev">
                                <view class="leftView">
                                    <image src="/static/img/de_icon3.png"></image>
                                </view>
                            </view>
                            <view class="centerView">{{ cur_year || '--' }} 年 {{ cur_month || '--' }} 月</view>
                            <view class="rightBgView" @tap="handleCalendar" data-handle="next">
                                <view class="rightView">
                                    <image src="/static/img/de_icon2.png"></image>
                                </view>
                            </view>
                        </view>
                        <view class="weekBgView" id="week_pop">
                            <view
                                :style="'width: ' + sysW + 'px; height: ' + sysW + 'px; line-height: ' + sysW + 'px;'"
                                class="weekView"
                                :data-idx="index"
                                v-for="(item, index) in weeks_ch"
                                :key="index"
                            >
                                {{ item }}
                            </view>
                        </view>
                        <view class="dateBgView">
                            <view v-if="hasEmptyGrid" class="dateEmptyView" :data-idx="index" v-for="(item, index) in empytGrids" :key="index"></view>
                            <view
                                :style="(index == 0 ? 'margin-left:' + sysW * marLet + 'px;' : '') + 'width: ' + sysW + 'px; height: ' + sysW + 'px; line-height: ' + sysW + 'px;'"
                                class="dateView"
                                :data-idx="index"
                                @tap="dateSelectAction"
                                v-for="(item, index) in days"
                                :key="index"
                            >
                                <view :class="'datesView ' + (item.item == getDate && judge == 1 ? 'dateOn' : '') + '}'">{{ item.item }}</view>

                                <view class="clocksucceed" v-if="item.src">
                                    <image :src="item.src"></image>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="del" @tap="onhide">
                    <image src="/static/img/close1.png"></image>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            sysW: 47,
            lastDay: null,
            firstDay: null,
            year: null,
            hasEmptyGrid: false,
            cur_year: '',
            cur_month: '',
            firstDay: null,
            getDate: null,
            month: null,
            display: 'none',

            week: [
                {
                    wook: '一'
                },
                {
                    wook: '二'
                },
                {
                    wook: '三'
                },
                {
                    wook: '四'
                },
                {
                    wook: '五'
                },
                {
                    wook: '六'
                },
                {
                    wook: '日'
                }
            ],

            day: [
                {
                    wook: '',
                    src: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                },
                {
                    wook: ''
                },
                {
                    wook: ''
                },
                {
                    wook: ''
                },
                {
                    wook: ''
                },
                {
                    wook: ''
                },
                {
                    wook: ''
                }
            ],

            days: [
                {
                    src: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                }
            ],

            marLet: '',
            judge: 0,
            todayIndex: '',
            weeks_ch: '',
            empytGrids: '',
            src: '',
            currentTab: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var that = this;
        this.setNowDate();
        this.getProWeekList();
        this.dataTime();
        var res = uni.getSystemInfoSync();
        this.setData({
            marLet: this.firstDay,
            getDate: this.getDate,
            judge: 1,
            month: this.month
        });
        /**
         * 获取系统信息
         */

        console.log(that.month);
    },
    onReady: function () {
        // px
        // let query = wx.createSelectorQuery();
        // query.select('.content').boundingClientRect(rect => {
        //   let height = rect.height;
        //   console.log(height);
        // }).exec();
        // rpx
        // let query = wx.createSelectorQuery();
        // query.select('.content').boundingClientRect(rect => {
        //   let clientHeight = rect.height;
        //   let clientWidth = rect.width;
        //   let ratio = 750 / clientWidth;
        //   let height = clientHeight * ratio;
        //   console.log(height);
        // }).exec();
        setTimeout(() => {
            let query = uni.createSelectorQuery();
            query
                .select('#week')
                .boundingClientRect((rect) => {
                    let width = rect.width;
                    this.setData({
                        sysW: width / 7
                    });
                })
                .exec();
        }, 300);
    },
    methods: {
        getProWeekList: function () {
            let that = this;
            let date = new Date();
            let dateTime = date.getTime(); // 获取现在的时间

            let dateDay = date.getDay(); // 获取现在的

            let oneDayTime = 24 * 60 * 60 * 1000; //一天的时间

            let proWeekList;
            let weekday;

            for (let i = 0; i < 7; i++) {
                let time = dateTime - (dateDay - 1 - i) * oneDayTime;
                proWeekList = new Date(time).getDate(); //date格式转换为yyyy-mm-dd格式的字符串

                weekday = 'day[' + i + '].wook';
                that.weekday = proWeekList;
            }
        },

        dateSelectAction: function (e) {
            let cur_day = e.currentTarget.dataset.idx;
            this.setData({
                todayIndex: cur_day
            });
            console.log(`点击的日期:${this.cur_year}年${this.cur_month}月${cur_day + 1}日`);
        },

        setNowDate: function () {
            const date = new Date();
            const cur_year = date.getFullYear();
            const cur_month = date.getMonth() + 1;
            const todayIndex = date.getDate();
            console.log(`日期：${todayIndex}`);
            const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
            this.calculateEmptyGrids(cur_year, cur_month);
            this.calculateDays(cur_year, cur_month);
            this.setData({
                cur_year: cur_year,
                cur_month: cur_month,
                weeks_ch,
                todayIndex
            });
        },

        getThisMonthDays(year, month) {
            return new Date(year, month, 0).getDate();
        },

        getFirstDayOfWeek(year, month) {
            return new Date(Date.UTC(year, month - 1, 1)).getDay();
        },

        calculateEmptyGrids(year, month) {
            const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
            let empytGrids = [];

            if (firstDayOfWeek > 0) {
                for (let i = 0; i < firstDayOfWeek; i++) {
                    empytGrids.push(i);
                }

                this.setData({
                    hasEmptyGrid: true,
                    empytGrids
                });
            } else {
                this.setData({
                    hasEmptyGrid: false,
                    empytGrids: []
                });
            }
        },

        calculateDays(year, month) {
            let days = [];
            let weekday;
            const thisMonthDays = this.getThisMonthDays(year, month);

            for (let i = 1; i <= thisMonthDays; i++) {
                // days[i].push(i);
                weekday = 'days[' + (i - 1) + '].item';
                this.weekday = i;
                this.setData({
                    src: ''
                });
            }
        },

        handleCalendar(e) {
            const handle = e.currentTarget.dataset.handle;
            const cur_year = this.cur_year;
            const cur_month = this.cur_month;
            this.setData({
                days: []
            });

            if (handle === 'prev') {
                let newMonth = cur_month - 1;
                let newYear = cur_year;

                if (newMonth < 1) {
                    newYear = cur_year - 1;
                    newMonth = 12;
                }

                this.calculateDays(newYear, newMonth);
                this.calculateEmptyGrids(newYear, newMonth);
                let firstDay = new Date(newYear, newMonth - 1, 1);
                this.firstDay = firstDay.getDay();
                this.setData({
                    cur_year: newYear,
                    cur_month: newMonth,
                    marLet: this.firstDay
                });

                if (this.month == newMonth) {
                    this.setData({
                        judge: 1
                    });
                } else {
                    this.setData({
                        judge: 0
                    });
                }
            } else {
                let newMonth = cur_month + 1;
                let newYear = cur_year;

                if (newMonth > 12) {
                    newYear = cur_year + 1;
                    newMonth = 1;
                }

                this.calculateDays(newYear, newMonth);
                this.calculateEmptyGrids(newYear, newMonth);
                let firstDay = new Date(newYear, newMonth - 1, 1);
                this.firstDay = firstDay.getDay();
                this.setData({
                    cur_year: newYear,
                    cur_month: newMonth,
                    marLet: this.firstDay
                });

                if (this.month == newMonth) {
                    this.setData({
                        judge: 1
                    });
                } else {
                    this.setData({
                        judge: 0
                    });
                }
            }
        },

        dataTime: function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            var months = date.getMonth() + 1; //获取现今年份

            this.year = year; //获取现今月份

            this.month = months; //获取今日日期

            this.getDate = date.getDate(); //最后一天是几号

            var d = new Date(year, months, 0);
            this.lastDay = d.getDate(); //第一天星期几

            let firstDay = new Date(year, month, 1);
            this.firstDay = firstDay.getDay();
        },

        onshow: function () {
            this.setData({
                display: 'block'
            });
        },

        onhide: function () {
            this.setData({
                display: 'none'
            });
        },

        //滑动切换
        swiperTab: function (e) {
            var that = this;
            that.setData({
                currentTab: e.detail.current
            });
        },

        //点击切换
        clickTab: function (e) {
            var that = this;

            if (this.currentTab === e.target.dataset.current) {
                return false;
            } else {
                that.setData({
                    currentTab: e.target.dataset.current
                });
            } // console.log(that.data.nubmerLength)
        },

        upper: function (e) {
            console.log(e);
        },

        lower: function (e) {
            console.log(e);
        },

        scroll: function (e) {
            console.log(e);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
