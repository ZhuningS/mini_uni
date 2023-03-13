<template>
    <view>
        <!-- pages/cal2/index2.wxml -->
        <calendar @change="dateChange" :spot="spot" defaultTime=""></calendar>
        <view class="date-string">当前选中的日期是：{{ dateString }}</view>
    </view>
</template>

<script>
import calendar from '@/components/calendar/calendar';
// pages/cal2/index2.js
export default {
    components: {
        calendar
    },
    data() {
        return {
            dateString: '',
            spot: ['2021/11/6', '2020/8/9', '2020/8/20', '2020/9/12']
        };
    },
    onLoad: function (options) {},
    onShow: function () {},
    methods: {
        dateChange(e) {
            this.setData({
                dateString: e.detail.dateString
            });
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
