<template>
    <view>
        <!-- pages/actualPage/countdown/index.wxml -->
        <view class="flex-row time-box j_c">
            <view class="time-item">{{ left_time_list[0] }}</view>
            天
            <view class="time-item">{{ left_time_list[1] }}</view>
            时
            <view class="time-item">{{ left_time_list[2] }}</view>
            分
            <view class="time-item">{{ left_time_list[3] }}</view>
            秒
        </view>

        <view class="flex-row time-box j_c">
            <view class="flex-row">
                <block v-for="(item, index) in left_time_list_date[0]" :key="item.list">
                    <view class="time-item1">{{ item }}</view>
                </block>
                <text>天</text>
            </view>
            <view class="flex-row">
                <block v-for="(item, index) in left_time_list_date[1]" :key="item.list">
                    <view class="time-item1">{{ item }}</view>
                </block>
                <text>时</text>
            </view>
            <view class="flex-row">
                <block v-for="(item, index) in left_time_list_date[2]" :key="item.list">
                    <view class="time-item1">{{ item }}</view>
                </block>
                <text>分</text>
            </view>
            <view class="flex-row">
                <block v-for="(item, index) in left_time_list_date[3]" :key="item.list">
                    <view class="time-item1">{{ item }}</view>
                </block>
                <text>秒</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            left_time: '',
            //活动剩余时间的秒数
            timer: '',
            //倒计时定时器
            left_time_list: [],
            //剩余秒数转换 天，小时 分 秒
            left_time_list_date: []
        };
    },
    onShow: function () {
        this.getLeftTime('2023/08/03 11:20:00');
    },
    onUnload() {
        if (this.timer) {
            console.log('销毁计时器');
            clearInterval(this.timer);
        }
    },
    methods: {
        /**
         * 定时器，计算剩下时间
         * @param {*} end_time
         */
        getLeftTime(end_time) {
            let left_time = this.getTimestap(end_time);
            this.initDate(left_time);
            this.timer = setInterval(() => {
                if (left_time-- === 0) {
                    this.setData({
                        left_time: 0,
                        left_time_list: this.formatSeconds(0)
                    });
                    clearInterval(this.timer);
                } else {
                    this.initDate(left_time);
                }
            }, 1000);
        },

        /**
         * 初始化数据
         */
        initDate(e) {
            let left_time_list = this.formatSeconds(e);
            let left_time_list_date = this.formatDate(JSON.stringify(left_time_list));
            this.setData({
                left_time: e,
                left_time_list,
                left_time_list_date
            });
        },

        /**
         * 获取指定时间-当前时间的秒数
         * @param {*} end_time
         */
        getTimestap(end_time) {
            // 当前时间
            var currentTime = parseInt(new Date().getTime() / 1000); // 未来时间

            var futureTime = parseInt(new Date(end_time.replace(/-/g, '/')).getTime() / 1000); //ios无法解析

            return futureTime <= currentTime ? 0 : futureTime - currentTime;
        },

        /**
         * 毫秒-天-时-分-秒
         * @param {*} value
         */
        formatSeconds(value) {
            let time = [];
            let day = parseInt(value / 86400);
            let hour = parseInt((value % 86400) / 3600);
            let min = parseInt(((value % 86400) % 3600) / 60);
            let sec = parseInt(((value % 86400) % 3600) % 60);
            if (day > 0) {
                time[0] = this.addZero(day);
            } else {
                time[0] = this.addZero(0);
            }

            if (hour > 0) {
                time[1] = this.addZero(hour);
            } else {
                time[1] = this.addZero(0);
            }

            if (min > 0) {
                time[2] = this.addZero(min);
            } else {
                time[2] = this.addZero(0);
            }

            if (sec > 0) {
                time[3] = this.addZero(sec);
            } else {
                time[3] = this.addZero(0);
            }

            return time;
        },

        /**
         * 拆分数组-天-时-分-秒
         * @param {*} e
         */
        formatDate(e) {
            let list = JSON.parse(e);

            for (let i = 0; i < list.length; i++) {
                list[i] = list[i].toString().split('');
            }

            return list;
        },

        /**
         * 补0
         * @param {*} num
         */
        addZero(num) {
            return num < 10 ? '0' + num : num;
        }
    }
};
</script>
<style>
@import './index.css';
</style>
