<template>
    <view>
        <calendar @sendObj="getCalendarData"></calendar>
    </view>
</template>

<script>
import calendar from '../components/calendar/calendar';
export default {
    components: {
        calendar
    },
    data() {
        return {};
    },
    onLoad: function () {},
    methods: {
        getCalendarData(e) {
            // 监听日历数据
            console.log(e.detail);
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
