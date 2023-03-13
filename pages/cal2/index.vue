<template>
    <!-- pages/cal2/index.wxml -->
    <view class="calendar">
        <view class="top_bg">
            <view class="cale_month flex-row j_b">
                <view @tap.stop.prevent="toLastMon">
                    <image src="/static/img/de_icon3.png" class="cale_img"></image>
                </view>
                <view>{{ months[monthIndex] }}</view>
                <view @tap.stop.prevent="toNextMon">
                    <image src="/static/img/de_icon2.png" class="cale_img"></image>
                </view>
            </view>
            <view class="cale_week flex-row j_b">
                <block v-for="(item, index) in weekArr" :key="index">
                    <view>{{ item }}</view>
                </block>
            </view>
        </view>

        <view class="box1" :style="'width: ' + sysW * 7 + 'rpx'">
            <block v-for="(item, index) in arr" :key="index">
                <!-- height: {{ sysW }}rpx; line-height: {{ sysW }}rpx;  {{ index == 0 ? "margin-left:" + sysW * marLet + "rpx;" : "" }} -->

                <view
                    :class="'isrela flex-column ' + (item.chosed ? 'chosed' : '')"
                    @tap.stop.prevent="choseOneDay"
                    :data-day="item.day"
                    :style="'width: ' + sysW + 'rpx;margin-left:' + (index == 0 ? sysW * marLet : '') + 'rpx;'"
                    :key="item"
                >
                    <!-- 图片 -->
                    <view v-if="item.isbook == 1" class="book isbook">
                        <image src="/static/img/wuliu_gou.png" class="book_img"></image>
                    </view>

                    <view v-if="item.isbook == 0">{{ item.day }}</view>

                    <view v-if="item.isbook == 2" class="book waitbook">
                        <image src="/static/img/wuliu_dai.png" class="book_img1"></image>
                    </view>

                    <view v-if="item.isbook == 3" class="book stopbook">
                        <image src="/static/img/wuliu_stop.png" class="book_img2"></image>
                    </view>
                    <!-- 文字 -->
                    <view v-if="item.isbook == 1" class="peis_text1">
                        <view>已配送</view>
                    </view>
                    <view v-if="item.isbook == 0" class="peis_text1"></view>

                    <view v-if="item.isbook == 2" class="peis_text1 color1">
                        <view>待配送</view>
                    </view>

                    <view v-if="item.isbook == 3" class="peis_text1 color2">
                        <view>已暂停</view>
                    </view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
// pages/cal2/index.js
import cal from './cal.js';
export default {
    data() {
        return {
            // 日历
            arr: [],
            sysW: 92,
            marLet: '',
            //左边边距
            weekArr: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            monthIndex: '',
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月 '],
            booklist: ['4', '5', '11'],
            //配送完成
            waitList: ['19', '12', '18'],
            //等待配送，
            stopList: ['26', '25'],
            //暂停配送
            chosedMonth: '' //当前选中的月份
        };
    },
    onShow: function () {
        var date = new Date();
        this.getTime(date); //获取时间

        this.setData({
            chosedMonth: date
        });
    },
    methods: {
        getTime(date) {
            this.dataTime(date); //先清空数组，根据得到今月的最后一天日期遍历 得到所有日期

            if (this.arr) {
                this.arr = [];
            }

            for (var i = 0; i < this.lastDay; i++) {
                var obj = {};
                obj.day = i + 1;
                obj.isbook = 0; //无状态

                obj.chosed = false; //选中的状态为false  当true之后 显示选中的边框

                this.arr.push(obj);
                this.booklist.forEach((item) => {
                    if (this.arr[i].day == item) {
                        this.arr[i].isbook = 1; //已经配送完毕的
                    }
                });
                this.waitList.forEach((item) => {
                    if (this.arr[i].day == item) {
                        this.arr[i].isbook = 2; //等待配送完毕的
                    }
                });
                this.stopList.forEach((item) => {
                    if (this.arr[i].day == item) {
                        this.arr[i].isbook = 3; //暂停配送完毕的
                    }
                });
            }

            this.setData({
                marLet: this.firstDay,
                arr: this.arr,
                monthIndex: this.monthIndex
            });
        },

        //选择某一天
        choseOneDay(e) {
            //设置选中的边框效果
            let day = e.currentTarget.dataset.day;
            this.arr.forEach((item) => {
                if (item.day == day) {
                    item.chosed = true;
                } else {
                    item.chosed = false;
                }
            }); //根据日期 进行了数据的查询

            this.setData({
                arr: this.arr
            });
        },

        //上个月
        toLastMon() {
            let date = this.chosedMonth;
            date.setMonth(date.getMonth() - 1);
            console.log(date);
            this.getTime(date);
            this.setData({
                chosedMonth: date
            });
        },

        //下个月
        toNextMon() {
            let date = this.chosedMonth;
            date.setMonth(date.getMonth() + 1);
            this.getTime(date);
            this.setData({
                chosedMonth: date
            });
        },

        //获取日历相关参数
        dataTime: function (date) {
            //   var date = new Date('2021-7-2');
            var year = date.getFullYear();
            var month = date.getMonth(); //0（一月） 到 11（十二月）

            var months = date.getMonth() + 1; //这个是当前的月份

            this.monthIndex = month; //当前月份的索引

            this.getDate = date.getDate(); //获取当前的日期 8号

            var d = new Date(year, months, 0); //Wed Jun 30 2021 00:00:00 GMT+0800 (中国标准时间)  2021年6月30日 周三

            this.lastDay = d.getDate(); //这是当前月份的所有天数 30

            let firstDay = new Date(year, month, 1); //Tue Jun 01 2021 00:00:00 GMT+0800 (中国标准时间)

            this.firstDay = firstDay.getDay(); // 第一天开始前的位置
        }
    }
};
</script>
<style>
@import './index.css';
</style>
