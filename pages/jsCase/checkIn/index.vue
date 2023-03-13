<template>
    <view>
        <!-- pages/actCheckIn/index.wxml -->
        <view class="c_clock flex-column">
            <view :class="'clock_time flex-column j_c ' + (status == 1 ? 'c1' : '')" @tap.stop.prevent="clockInStart">
                <text>即刻签到</text>
                <text>{{ now_time }}</text>
            </view>
            <view :class="'clock_time_over flex-column j_c  ' + (status == 1 ? 'c2' : '')">
                <text>已打卡</text>
                <text>{{ now_time_stop }}</text>
            </view>
        </view>
        <view class="now_date">当前时间：{{ today_date }} {{ now_time }}</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            now_time: '',
            status: 0,

            //0---》上班未打卡 1----》上班已打卡
            //已打卡时间
            now_time_stop: '',

            today_date: ''
        };
    },
    onLoad: function (options) {
        this.getCurrentTime();
        this.setData({
            now_time: this.getTime(),
            today_date: this.formatDate(new Date())
        });
    },
    onShow: function () {},
    methods: {
        // 签到打卡
        clockInStart() {
            uni.vibrateLong(); //使手机震动400ms

            this.setData(
                {
                    status: 1,
                    //上班已打卡
                    now_time_stop: this.now_time
                },
                uni.showToast({
                    title: '签到成功',
                    icon: 'none'
                })
            );
        },

        getCurrentTime: function () {
            var time = setInterval(() => {
                this.setData({
                    now_time: this.getTime()
                });
            }, 1000);
        },

        getTime() {
            let dateTime = '';
            let hh = new Date().getHours();
            let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
            dateTime = hh + ':' + mf + ':' + ss;
            return dateTime;
        },

        // 获取当前的日期
        formatDate(timestamp) {
            var date = new Date(timestamp);
            var YY = date.getFullYear() + '-';
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return YY + MM + DD;
        }
    }
};
</script>
<style>
@import './index.css';
</style>
