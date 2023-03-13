<template>
    <view>
        <!-- pages/another/clockin/index.wxml -->
        <view class="gs_banner">
            <view class="gs_continue">
                <view>每日坚持签到</view>
                <view>
                    总共签到：
                    <text>{{ continuity }}</text>
                    天
                </view>
            </view>
        </view>
        <view class="gs_sign">
            <view class="gs_sign_box">
                <view class="gs_pillar">
                    <view class="gs_post">
                        <view></view>
                    </view>
                    <view class="gs_post">
                        <view></view>
                    </view>
                    <view class="gs_post">
                        <view></view>
                    </view>
                    <view class="gs_post">
                        <view></view>
                    </view>
                    <view class="gs_post">
                        <view></view>
                    </view>
                </view>
                <view class="gs_sign_day">
                    <image @tap="onshow" src="/static/pages/images/sign_icon.png"></image>
                    <view>
                        持续签到
                        <text>{{ continuity }}</text>
                        天
                    </view>
                </view>
                <view class="gs_sign_content">
                    <view class="gs_week">
                        <block v-for="(item, index) in week" :key="index">
                            <view class="gs_wook">
                                <view :style="'width: ' + sysW + 'px; height: ' + sysW + 'px; line-height: ' + sysW + 'px;'">{{ item.wook }}</view>
                            </view>
                        </block>
                    </view>
                    <view class="gs_week">
                        <block v-for="(item, index) in day" :key="index">
                            <view
                                :class="'gs_wook ' + (item.wook == getDate ? 'dateOn' : '')"
                                :style="'width: ' + sysW + 'px; height: ' + sysW + 'px; line-height: ' + sysW + 'px;'"
                                @tap="parseEventDynamicCode($event, item.src ? 'wenlin' : '')"
                                :data-index="index"
                            >
                                <view :id="item.src ? 'fuconl' : ''" :style="item.src && !item.check ? 'visibility: hidden;' : ''">
                                    {{ item.wook }}
                                </view>
                                <view class="gs_clocksucceed" v-if="item.src && !item.check">
                                    <image :src="item.src"></image>
                                </view>
                            </view>
                        </block>
                    </view>
                    <view class="gs_circle">
                        <view class="gs_incircle" :style="ornot ? 'background-color:#e7ebed;cursor:auto;' : ''">
                            <view class="gs_excircle" @tap="parseEventDynamicCode($event, ornot ? '' : 'dakainc')">
                                <view class="gs_innercircle" :style="ornot ? 'background-color:#ddd;' : ''">{{ ornot ? '已打卡' : '打卡' }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 弹出部分 -->
        <view class="gs_calendar" :style="'display:' + display">
            <view class="gs_bg" @tap="onhide"></view>
            <view class="gs_gs_calendar_box">
                <view class="canlendarBgView">
                    <view class="canlendarView">
                        <view class="canlendarTopView">
                            <view class="leftBgView" @tap="handleCalendar" data-handle="prev">
                                <view class="leftView">
                                    <text class="cuIcon-back"></text>
                                </view>
                            </view>
                            <view class="centerView">{{ cur_year || '--' }} 年 {{ cur_month || '--' }} 月</view>
                            <view class="rightBgView" @tap="handleCalendar" data-handle="next">
                                <view class="leftView">
                                    <text class="cuIcon-right"></text>
                                </view>
                            </view>
                        </view>
                        <view class="weekBgView">
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
                                :class="'dateView ' + (item.wook == getDate && judge == 1 ? 'dateOn' : '')"
                                @tap="parseEventDynamicCode($event, item.src ? 'wenldisp' : '')"
                                :data-index="index"
                                v-for="(item, index) in days"
                                :key="index"
                            >
                                <!-- data-idx="{{index}}" bindtap="dateSelectAction" -->

                                <view :style="item.src && !item.check ? 'visibility: hidden;' : ''" :id="item.src ? 'fuconl' : ''" class="datesView">{{ item.wook }}</view>

                                <view class="clocksucceed" v-if="item.src && !item.check">
                                    <image :src="item.src"></image>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="del">
                    <text @tap="onhide" class="cuIcon-close"></text>
                </view>
            </view>
        </view>
        <!-- 签到弹窗 -->
        <view class="load" :style="sign ? '' : 'top:calc((100vh - 750rpx)/2);opacity: 0;z-index:-1;'">
            <image class="load-imagae" src="/static/pages/images/register.png"></image>
            <view class="load-centent">
                <view>签到成功</view>
                <view>
                    持续签到
                    <span>{{ continuity }}</span>
                    天
                </view>
                <view @tap="popup">好的</view>
            </view>
        </view>
    </view>
</template>

<script>
//logs.js
const util = require('../../../utils/util.js');

export default {
    data() {
        return {
            sysW: null,
            lastDay: null,
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

            day: [],
            days: [],
            ornot: false,

            //今天是否签到
            continuity: 18,

            //签到天数
            //签到弹窗
            sign: false,

            judge: 0,
            todayIndex: '',
            weeks_ch: '',
            empytGrids: '',
            marLet: '',
            shuttime: [],
            opentime: [],
            currentTab: ''
        };
    },
    onLoad: function (options) {
        var that = this;
        this.setNowDate();
        this.getProWeekList();
        this.dataTime();
        var res = uni.getSystemInfoSync();
        this.setData({
            sysW: res.windowHeight / 12 - 5,
            //更具屏幕宽度变化自动设置宽度
            getDate: this.getDate,
            judge: 1,
            month: this.month
        });
        this.sigarr();
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
            const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
            this.calculateEmptyGrids(cur_year, cur_month);
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
            let getDate = this.getDate; //多少号

            let cur_year = this.cur_year; //年

            let cur_month = this.cur_month; //月

            let thisMonthDays = this.getThisMonthDays(year, month);

            for (let i = 1; i <= thisMonthDays; i++) {
                if (this.opentime[1] < month && month == this.shuttime[1]) {
                    //小于开始月份
                    this.days.push({
                        wook: i,
                        src: i <= getDate ? '/static/pages/images/newspaper.png' : ''
                    });
                } else if (this.opentime[1] == month && month == this.shuttime[1]) {
                    if (this.opentime[2] <= i && i <= this.shuttime[2]) {
                        this.days.push({
                            wook: i,
                            src: '/static/pages/images/newspaper.png'
                        });
                    } else {
                        this.days.push({
                            wook: i,
                            src: ''
                        });
                    }
                } else if (this.opentime[1] == month && month < this.shuttime[1]) {
                    this.days.push({
                        wook: i,
                        src: this.opentime[2] <= i ? '/static/pages/images/newspaper.png' : ''
                    });
                } else if (this.opentime[1] < month && month < this.shuttime[1]) {
                    this.days.push({
                        wook: i,
                        src: '/static/pages/images/newspaper.png'
                    });
                } else {
                    this.days.push({
                        wook: i,
                        src: ''
                    });
                }
            }

            this.setData({
                days: this.days
            });
        },

        //上下月
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
            this.setData({
                marLet: this.firstDay
            });
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

        //获取数组参数
        sigarr: function (e) {
            let that = this;
            let ornot = that.ornot ? 0 : 1; //当天是否签到

            let continuity = that.continuity; //连续签到天数

            let obinl = parseInt(util.getWeekByDate(new Date())); //今天周几

            let cur_year = that.cur_year; //年份

            let cur_month = that.cur_month - 1; //月份

            if (cur_month < 1) {
                //月份小于1年份减1
                cur_year = cur_year - 1;
                cur_month = 12;
            }

            let num = obinl < continuity ? obinl + 1 : continuity; //七日签到数组

            for (let i = 0; i < num; i++) {
                if (i <= obinl + 1) {
                    if (ornot == 0) {
                        if (0 <= obinl - i) {
                            that.day[obinl - i].src = '/static/pages/images/newspaper.png';
                        }
                    } else {
                        if (0 <= obinl - i - 1) {
                            that.day[obinl - i - 1].src = '/static/pages/images/newspaper.png';
                        }
                    }
                } else {
                    return false;
                }
            } //签到数组

            that.setData({
                day: that.day,
                //七天签到
                shuttime: [that.cur_year, that.cur_month, that.getDate - ornot] //结束签到时间
            });

            if (that.getDate < continuity) {
                //当前天数不够减去连续签到天数
                let qindao = continuity - that.getDate; //签到天数

                let rili = parseInt(that.getThisMonthDays(cur_year, cur_month)); //上月天数

                if (rili + that.getDate < continuity) {
                    //连续签到天数大于上个月加当前日期的和
                    cur_month = cur_month - 1;

                    if (cur_month < 1) {
                        cur_year = cur_year - 1;
                        cur_month = 12;
                    }

                    let guil = parseInt(that.getThisMonthDays(cur_year, cur_month)); //上月天数

                    that.setData({
                        opentime: [cur_year, cur_month, guil - (qindao - rili) + 1 - ornot] //开始签到时间
                    });
                } else {
                    that.setData({
                        opentime: [cur_year, cur_month, rili - qindao + 1 - ornot] //开始签到时间
                    });
                }
            } else {
                that.setData({
                    opentime: [that.cur_year, that.cur_month, that.getDate - continuity + 1 - ornot] //开始签到时间
                });
            }

            this.calculateDays(that.cur_year, that.cur_month); //数组获取
        },

        //打卡签到
        dakainc: function (e) {
            let that = this;
            let date = new Date();
            that.setData({
                ornot: true,
                continuity: that.continuity + 1,
                days: [],
                cur_year: date.getFullYear(),
                cur_month: date.getMonth() + 1,
                todayIndex: date.getDate(),
                judge: 1
            });
            that.dataTime(); //年月份排版

            that.calculateEmptyGrids(that.cur_year, that.cur_month); //年月份排版

            that.sigarr(); //获取数组参数

            that.popup(); //显示签到弹窗
        },

        //显示签到弹窗
        popup: function (e) {
            this.setData({
                sign: !this.sign
            });
        },

        //七日数组显示文字
        wenlin: function (e) {
            let index = e.currentTarget.dataset.index;

            if (this.day[index].check) {
                this.day[index].check = false;
            } else {
                this.day[index].check = true;
            }

            this.setData({
                day: this.day
            });
        },

        //数组显示文字
        wenldisp: function (e) {
            let index = e.currentTarget.dataset.index;

            if (this.days[index].check) {
                this.days[index].check = false;
            } else {
                this.days[index].check = true;
            }

            this.setData({
                days: this.days
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
            }
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
