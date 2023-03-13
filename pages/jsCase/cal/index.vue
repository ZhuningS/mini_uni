<template>
    <view>
        <!-- pages/jsCase/cal/index.wxml -->
        <calendar @change="dateChange" defaultTime="" :spot="spot" cal_title="嘻日历" theme_color="#e07d50"></calendar>
    </view>
</template>

<script>
import calendar from '../components/calendar/calendar';
export default {
    components: {
        calendar
    },
    data() {
        return {
            hasData: true,
            spot: ['2021-11-18', '2021-11-16', '2021-11-5'],
            dateString: ''
        };
    },
    onLoad: function () {},
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
@import './index.css';
</style>
