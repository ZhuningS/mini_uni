<template>
    <view>
        <!-- pages/jsCase/fixChose/index.wxml -->
        <view class="head_fix" id="fix_box">
            <scroll-view :scroll-x="true" class="head_scroll">
                <block v-for="(item, index) in select_list" :key="item.select_list">
                    <view :class="'head_item ' + (index == choseType ? 'active' : '')" @tap.stop.prevent="tabSelect" :data-index="index">
                        <text>{{ item.name }}</text>
                        <image :src="index == choseType ? '/img/down_icon.png' : '/img/down_icon.png'" />
                    </view>
                </block>
            </scroll-view>
            <view class="head_result" v-if="show_chose">
                <view class="flex con_title j_b">
                    <view class="flex-row head_list">
                        <view class="item_sele" v-if="sel_list.start_time || sel_list.end_time">{{ sel_list.start_time }}至{{ sel_list.end_time }}</view>
                    </view>
                    <view class="reset" @tap.stop.prevent="reset">重置</view>
                </view>
                <view class="result_tip">查询结果共计：{{ total }}位</view>
            </view>
        </view>
        <view class="con" :style="'margin-top:' + (!show_chose ? fix_top + 10 : fix_top) + 'px'">
            <!-- 有数据 -->
            <view class="me_list" v-if="hasData">
                <block v-for="(item, index) in 10" :key="item.listData">
                    <view class="m_item flex-row j_b" @tap.stop.prevent="goJump" :data-phone="item.phone">
                        <view class="flex">
                            <image src="https://i.postimg.cc/mgsKJGLw/susu1.jpg" class="user_ava" />
                            <view class="user_info">
                                <view class="flex-row">
                                    <view class="u_name text_ellipsis">苏苏小苏苏</view>
                                    <view class="u_phone text_ellipsis">12312131111</view>
                                    <view class="status new_me">测试数据</view>
                                </view>
                                <view class="u_time">注册时间：2022-1-20</view>
                                <view>注册来源：测试</view>
                            </view>
                        </view>
                    </view>
                </block>
            </view>
            <!-- 无数据 -->
            <view v-else class="flex-column none"></view>
        </view>
        <!-- 时间选择弹框 -->
        <!-- minDate最小时间 默认为2018/1/1,日期格式为yyyy/mm/dd ,最小时间和当前日期尽量不要相差太大,无最大日期,在触底时每次加载6个月 -->
        <date
            :isShow="choseType == 0"
            :timeStart="sel_list.start_time"
            minDate="2019/1/1"
            :timeEnd="sel_list.end_time"
            @tapYes="dateSubmit($event, { tagId: 'date' })"
            @tapNo="closeModal($event, { tagId: 'date' })"
            id="date"
        />
    </view>
</template>

<script>
import date from '../components/date/index';
// pages/jsCase/fixChose/index.js
import util from '../util/utils';
export default {
    components: {
        date
    },
    data() {
        return {
            select_list: [
                {
                    name: '查询时间'
                },
                {
                    name: '查本月'
                },
                {
                    name: '近30天'
                },
                {
                    name: '指定日期'
                }
            ],

            hasData: true,
            choseType: undefined,

            //选中的弹框类型
            sel_list: {
                start_time: '',
                end_time: ''
            },

            show_chose: false,

            //是否展示筛选项
            total: 0,

            fix_top: ''
        };
    },
    onLoad: function (options) {},
    onReady: function () {
        var query = uni.createSelectorQuery();
        query.select('#fix_box').boundingClientRect();
        query.exec((res) => {
            var height = res[0].height; // 获取高度

            this.setData({
                fix_top: height
            });
        });
    },
    onShow: function () {
        let date = this.getRangDate();
        this.setData({
            show_chose: true,
            'sel_list.start_time': date.startDate,
            'sel_list.end_time': date.endDate
        });
    },
    methods: {
        /**
         * 获取本月开始和结束日期
         * @returns {{endDate: string, startDate: string}}
         */
        getRangDate() {
            var firstDate = new Date();
            var startDate = firstDate.getFullYear() + '-' + (firstDate.getMonth() + 1 < 10 ? '0' : '') + (firstDate.getMonth() + 1) + '-' + '01';
            var date = new Date();
            var currentMonth = date.getMonth();
            var nextMonth = ++currentMonth;
            var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
            var oneDay = 1000 * 60 * 60 * 24;
            var lastDate = new Date(nextMonthFirstDay - oneDay);
            var endDate =
                lastDate.getFullYear() +
                '-' +
                (lastDate.getMonth() + 1 < 10 ? '0' : '') +
                (lastDate.getMonth() + 1) +
                '-' +
                (lastDate.getDate() < 10 ? '0' : '') +
                lastDate.getDate();
            return {
                startDate,
                endDate
            };
        },

        tabSelect(e) {
            let { index } = e.currentTarget.dataset;

            if (this.choseType === index || index === undefined) {
                return false;
            } else {
                this.setData({
                    choseType: index
                });
            }

            if (index == 1) {
                var now = new Date(); //当前日期

                var nowMonth = now.getMonth(); //当前月

                var nowYear = now.getFullYear(); //当前年
                //本月开始时间

                var monthStartDate = new Date(nowYear, nowMonth, 1); //本月结束时间

                var monthEndDate = new Date(nowYear, nowMonth + 1, 0);
                var beginTime = util.formatDate(Date.parse(monthStartDate));
                var endTime = util.formatDate(Date.parse(monthEndDate));
            } else if (index == 2) {
                var myDate = new Date(); //获取今天日期

                var nowDate = new Date(myDate.setDate(myDate.getDate() - 29));
                var year = nowDate.getFullYear();
                var month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
                var day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
                var beginTime = year + '-' + month + '-' + day;
                var endTime = util.toolsFn.getNowTime(2);
            } else if (index == 3) {
                var beginTime = '2022-1-15';
                var endTime = '2022-2-4';
            }

            if (index != 0) {
                this.$mp.page.selectComponent('#date').$vm.reset();
                console.log(beginTime, endTime);
                this.setData(
                    {
                        show_chose: true,
                        'sel_list.start_time': beginTime,
                        'sel_list.end_time': endTime
                    },
                    () => {
                        uni.pageScrollTo({
                            scrollTop: 0
                        });
                        this.onReady();
                    }
                );
            }
        },

        // 选择查询时间
        dateSubmit(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            let { start, end } = e.detail;
            let beginTime = `${start.year}-${start.month}-${start.date}`;
            let endTime = `${end.year}-${end.month}-${end.date} `;

            if (!start.year || !end.year) {
                return uni.showToast({
                    title: '请选择查询时间',
                    icon: 'none'
                });
            }

            this.setData(
                {
                    show_chose: true,
                    'sel_list.start_time': beginTime,
                    'sel_list.end_time': endTime
                },
                function () {
                    uni.pageScrollTo({
                        scrollTop: 0
                    });
                }
            );
            this.closeModal();
            this.onReady();
        },

        // 关闭弹框
        closeModal(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            this.setData({
                choseType: 'no'
            });
        },

        // 重置
        reset() {
            this.setData(
                {
                    sel_list: {
                        start_time: '',
                        end_time: ''
                    },
                    show_chose: false,
                    //不展示筛选项
                    choseType: null
                },
                function () {
                    uni.pageScrollTo({
                        scrollTop: 0
                    });
                }
            );
            this.onReady(); // 触发日期组件的重置日期方法

            this.$mp.page.selectComponent('#date').$vm.reset();
        },

        goJump() {
            console.log('占位：函数 goJump 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
