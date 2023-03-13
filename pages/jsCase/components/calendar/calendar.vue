<template>
    <!-- components/calendar/calendar.wxml -->
    <view class="calendar">
        <view class="title flex">
            <!-- 标题 -->
            <view class="cal_title">{{ cal_title }}</view>
            <view class="flex">
                <!-- 上个月 -->
                <view class="iconfont" @tap="lastMonth">
                    <view class="left-color" :style="'border-right-color:' + theme_color"></view>
                </view>
                <!-- 选择日期 -->
                <picker :value="selectDay.year + '-' + selectDay.month" @change="editMonth" mode="date" fields="month" class="year-month">
                    {{ selectDay.year }}年{{ selectDay.month > 9 ? selectDay.month : '0' + selectDay.month }}月
                </picker>
                <!-- 下个月 -->
                <view class="iconfont" @tap="nextMonth">
                    <view class="right-color" :style="'border-left-color:' + theme_color"></view>
                </view>
            </view>
        </view>

        <!-- 日历头部 -->
        <view class="flex-around calendar-week" :style="'background:' + color1 + ';color:' + color2">
            <view class="view">日</view>
            <view class="view">一</view>
            <view class="view">二</view>
            <view class="view">三</view>
            <view class="view">四</view>
            <view class="view">五</view>
            <view class="view">六</view>
        </view>

        <!-- 日历主体 -->
        <view class="flex-start flex-wrap calendar-main" :style="'height:' + (dateList.length / 7) * 80 + 'rpx'">
            <view class="day" v-for="(item, index) in dateList" :key="item.dateList">
                <view
                    :style="'background:' + (item.year === selectDay.year && item.month === selectDay.month && item.day === selectDay.day ? theme_color : '')"
                    :class="'bg ' + (item.year === selectDay.year && item.month === selectDay.month ? (item.day === selectDay.day ? 'select' : '') : 'other-month')"
                    @tap.stop.prevent="selectChange"
                    :data-day="item.day"
                    :data-year="item.year"
                    :data-month="item.month"
                    :data-date-string="item.dateString"
                >
                    {{ item.day }}
                    <view
                        :style="'background:' + theme_color"
                        :class="'spot ' + (item.year === selectDay.year && item.month === selectDay.month && item.day === selectDay.day ? 'spot_ative' : '')"
                        v-if="item.spot"
                    ></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// components/calendar/calendar.js
export default {
    data() {
        return {
            dateList: [],

            //日历主体渲染数组
            selectDay: {
                year: '',
                month: '',
                day: ''
            },

            //选中时间
            //展开
            open: true,

            color1: '',
            color2: ''
        };
    }
    /**
     * 组件的属性列表
     */,
    props: {
        spot: {
            type: Array,
            default: () => []
        },
        defaultTime: {
            type: String,
            default: ''
        },
        cal_title: {
            type: String,
            default: '日历'
        },
        spots: {
            type: Array,
            default: () => []
        },
        theme_color: {
            type: String,
            default: '#3179CB'
        }
    },
    /**
     * 组件的方法列表
     */
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

        /**
         * 时间戳转化为年 月 日 时 分 秒
         * time: 需要被格式化的时间，可以被new Date()解析即可
         * format：格式化之后返回的格式，年月日时分秒分别为Y, M, D, h, m, s，这个参数不填的话则显示多久前
         */
        formatTime(time, format) {
            function formatNumber(n) {
                n = n.toString();
                return n[1] ? n : '0' + n;
            }

            function getDate(time, format) {
                const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
                const returnArr = [];
                const date = new Date(time);
                returnArr.push(date.getFullYear());
                returnArr.push(formatNumber(date.getMonth() + 1));
                returnArr.push(formatNumber(date.getDate()));
                returnArr.push(formatNumber(date.getHours()));
                returnArr.push(formatNumber(date.getMinutes()));
                returnArr.push(formatNumber(date.getSeconds()));

                for (const i in returnArr) {
                    format = format.replace(formateArr[i], returnArr[i]);
                }

                return format;
            }

            function getDateDiff(time) {
                let r = '';
                const ft = new Date(time);
                const nt = new Date();
                const nd = new Date(nt);
                nd.setHours(23);
                nd.setMinutes(59);
                nd.setSeconds(59);
                nd.setMilliseconds(999);
                const d = parseInt((nd - ft) / 86400000);

                switch (true) {
                    case d === 0:
                        const t = parseInt(nt / 1000) - parseInt(ft / 1000);

                        switch (true) {
                            case t < 60:
                                r = '刚刚';
                                break;

                            case t < 3600:
                                r = parseInt(t / 60) + '分钟前';
                                break;

                            default:
                                r = parseInt(t / 3600) + '小时前';
                        }

                        break;

                    case d === 1:
                        r = '昨天';
                        break;

                    case d === 2:
                        r = '前天';
                        break;

                    case d > 2 && d < 30:
                        r = d + '天前';
                        break;

                    default:
                        r = getDate(time, 'Y-M-D');
                }

                return r;
            }

            if (!format) {
                return getDateDiff(time);
            } else {
                return getDate(time, format);
            }
        },

        //picker设置月份
        editMonth(e) {
            const arr = e.detail.value.split('-');
            const year = parseInt(arr[0]);
            const month = parseInt(arr[1]);
            this.setMonth(year, month);
        },

        //上月切换按钮点击
        lastMonth() {
            const lastMonth = new Date(this.selectDay.year, this.selectDay.month - 2);
            const year = lastMonth.getFullYear();
            const month = lastMonth.getMonth() + 1;
            this.setMonth(year, month);
        },

        //下月切换按钮点击
        nextMonth() {
            const nextMonth = new Date(this.selectDay.year, this.selectDay.month);
            const year = nextMonth.getFullYear();
            const month = nextMonth.getMonth() + 1;
            this.setMonth(year, month);
        },

        //设置月份
        setMonth(setYear, setMonth, setDay) {
            if (this.selectDay.year !== setYear || this.selectDay.month !== setMonth) {
                const day = Math.min(new Date(setYear, setMonth, 0).getDate(), this.selectDay.day);
                const time = new Date(setYear, setMonth - 1, setDay ? setDay : day);
                const data = {
                    selectDay: {
                        year: setYear,
                        month: setMonth,
                        day: setDay ? setDay : day,
                        dateString: this.formatTime(time, 'Y-M-D')
                    }
                };

                if (!setDay) {
                    data.open = true;
                }

                console.log(this);
                this.setData(data);
                this.dateInit(setYear, setMonth);
                this.setSpot();
                this.$emit('change', {
                    detail: this.selectDay
                });
            }
        },

        //展开收起
        openChange() {
            this.setData({
                open: !this.open
            });
            this.$emit('aaa', {
                detail: {
                    a: 0
                }
            });
            this.dateInit();
            this.setSpot();
        },

        //设置日历底下是否展示小圆点
        setSpot() {
            const timeArr = this.spot.map((item) => {
                return this.formatTime(item, 'Y-M-D');
            });
            this.dateList.forEach((item) => {
                if (timeArr.indexOf(item.dateString) !== -1) {
                    item.spot = true;
                } else {
                    item.spot = false;
                }
            });
            this.setData({
                dateList: this.dateList
            });
        },

        //日历主体的渲染方法
        dateInit(setYear = this.selectDay.year, setMonth = this.selectDay.month) {
            let dateList = []; //需要遍历的日历数组数据

            let now = new Date(setYear, setMonth - 1); //当前月份的1号

            let startWeek = now.getDay(); //目标月1号对应的星期

            let dayNum = new Date(setYear, setMonth, 0).getDate(); //当前月有多少天

            let forNum = Math.ceil((startWeek + dayNum) / 7) * 7; //当前月跨越的周数

            if (this.open) {
                //展开状态，需要渲染完整的月份
                for (let i = 0; i < forNum; i++) {
                    const now2 = new Date(now);
                    now2.setDate(i - startWeek + 1);
                    let obj = {};
                    obj = {
                        day: now2.getDate(),
                        month: now2.getMonth() + 1,
                        year: now2.getFullYear(),
                        dateString: this.formatTime(now2, 'Y-M-D')
                    };
                    dateList[i] = obj;
                }
            } else {
                //非展开状态，只需要渲染当前周
                for (let i = 0; i < 7; i++) {
                    const now2 = new Date(now); //当前周的7天

                    now2.setDate(Math.ceil((this.selectDay.day + startWeek) / 7) * 7 - 6 - startWeek + i);
                    let obj = {};
                    obj = {
                        day: now2.getDate(),
                        month: now2.getMonth() + 1,
                        year: now2.getFullYear(),
                        dateString: this.formatTime(now2, 'Y-M-D')
                    };
                    dateList[i] = obj;
                }
            }

            this.setData({
                dateList: dateList
            });
        },

        //一天被点击时
        selectChange(e) {
            const year = e.currentTarget.dataset.year;
            const month = e.currentTarget.dataset.month;
            const day = e.currentTarget.dataset.day;
            const dateString = e.currentTarget.dataset.dateString;
            const selectDay = {
                year: year,
                month: month,
                day: day,
                dateString: dateString
            };
            console.log(selectDay);

            if (this.selectDay.year !== year || this.selectDay.month !== month) {
                this.setMonth(year, month, day);
            } else if (this.selectDay.day !== day) {
                this.setData({
                    selectDay: selectDay
                });
                this.$emit('change', {
                    detail: this.selectDay
                });
            }
        }
    },
    beforeMount() {
        let now = this.defaultTime ? new Date(this.defaultTime) : new Date();
        let selectDay = {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate(),
            dateString: this.formatTime(now, 'Y-M-D')
        };
        this.setMonth(selectDay.year, selectDay.month, selectDay.day);
        let color = this.hexToRgb(this.theme_color);
        let new_color = '';
        let new_color1 = '';
        let color1;
        let color2;
        for (let i in color) {
            new_color += i;
            new_color1 += color[i] + ',';
        }

        color1 = new_color + '(' + new_color1 + '.3)';
        color2 = new_color + '(' + new_color1 + '1)';
        this.setData({
            color1,
            //色值1
            color2
        });
    },
    watch: {
        spot: {
            handler: function (spot) {
                this.setSpot();
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
@import './calendar.css';
</style>
