<template>
    <view>
        <!-- pages/jsCase/cal2/index.wxml -->
        <calendar
            id="calendar"
            :isOpen="true"
            :selected="selectedDays"
            :lockDay="lockday"
            @select="cmfclick($event, { tagId: 'calendar' })"
            @getdate="getdate($event, { tagId: 'calendar' })"
            @checkall="checkall($event, { tagId: 'calendar' })"
            @clear="clear($event, { tagId: 'calendar' })"
        ></calendar>
    </view>
</template>

<script>
import calendar from '../components/calendar2/calendar';
// pages/jsCase/cal2/index.js
export default {
    components: {
        calendar
    },
    data() {
        return {
            selectedDays: [],
            lockday: ''
        };
    },
    methods: {
        /**
         * 点击日期时候触发的事件
         * bind:getdate
         */
        getdate(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log(e.detail);
        },

        /**
         * 点击全选触发的事件
         * bind:checkall
         */
        checkall(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log(e.detail.days);
        },

        /**
         * 点击确定按钮触发的事件
         * bind:select
         */
        cmfclick(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log(e.detail.selectDays);
        },

        /**
         * 点击清空事件
         * bind:clear
         */
        clear(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('要清空选中日期');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
