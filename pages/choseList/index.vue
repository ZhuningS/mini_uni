<template>
    <view>
        <!-- pages/choseList/index.wxml -->
        <view class="head">
            <view class="top">
                <view class="head_month">
                    <picker mode="date" :value="date" start="2017-01" :end="endDate" @change="bindDateChange" fields="month">
                        <view class="picker">
                            {{ date }}
                            <image src="/static/img/down_icon.png"></image>
                        </view>
                    </picker>
                </view>
                <view class="head_input">
                    <image src="/static/img/search_icon.png" class="search_icon"></image>
                    <input type="text" placeholder="搜索" placeholder-class="place_holder" @confirm="getSearch" :value="search" />
                </view>
                <view class="sha_icon" @tap.stop.prevent="showDialogFun">筛选</view>
            </view>
            <view class="top_tab">
                <scroll-view class="tabbar" scroll-x>
                    <view :class="'tabbar_li ' + (type == index ? 'tabbar_li_on' : '')" :data-index="index" @tap="tabNav" v-for="(item, index) in navList" :key="item.key">
                        {{ item }}
                    </view>
                </scroll-view>
            </view>
        </view>
        <view v-if="hasData" class="con">
            <block v-for="(item, index) in 5" :key="index"></block>
        </view>
        <view v-else class="no_data">
            <image src="https://i.postimg.cc/Bv28vfkg/222.webp" class="n_img"></image>
            <view class="text_tip">~暂无数据~</view>
        </view>
        <!-- 筛选弹框 -->
        <view v-if="!showDialog">
            <view class="mask" @tap="closePop"></view>
            <view class="dialog">
                <scroll-view scroll-y style="height: 80%">
                    <view class="main_con">
                        <block v-for="(item, index) in choseList" :key="index">
                            <view class="dialog_item">
                                <view class="flex-row j_b d_title">
                                    <text class="d_name">{{ item.name }}:</text>
                                    <view class="d_status" v-if="item.isMore" @tap.stop.prevent="showMore" :data-index="index">
                                        展开
                                        <image src="/static/img/open_up.png" class="zhank_icon"></image>
                                    </view>
                                    <view class="d_status" v-if="item.isMore != undefined && !item.isMore" @tap.stop.prevent="showMore" :data-index="index">
                                        收起
                                        <image src="/static/img/clolse_down.png" class="zhank_icon"></image>
                                    </view>
                                </view>
                                <view class="flex d_chose">
                                    <block v-for="(item1, index1) in item.list" :key="index1">
                                        <view
                                            :class="'d_item ' + (item.isMore ? 'd_item_none' : '') + ' ' + (item1.chosed ? 'chosed' : '')"
                                            @tap.stop.prevent="choseOne"
                                            :data-index="index"
                                            :data-index1="index1"
                                        >
                                            {{ item1.value }}
                                        </view>
                                    </block>
                                </view>
                            </view>
                        </block>
                    </view>
                </scroll-view>
                <view class="d_bottom" v-if="tap">
                    <view class="d_view">
                        <view class="line"></view>
                        <view class="btn_text" @tap.stop.prevent="reset">重置</view>
                        <view class="btn_text" @tap.stop.prevent="obsubmit">确认</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            date: '时间',

            //用户选中的日期
            endDate: '',

            //当前日期
            navList: ['全部', '选项一', '选项二', '选项三', '选项四', '选项五'],

            type: 0,
            hasData: false,
            showDialog: true,

            //筛选弹框默认隐藏
            choseList: [],

            //筛选列表
            tap: false,

            search: '',
            undefined: ''
        };
    },
    onLoad: function (options) {
        this.getEndDate(); //获取当前的日期
    },
    onShow: function () {
        //获取筛选列表
        this.getChoseData();
    },
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    methods: {
        tabNav(e) {
            let { index } = e.currentTarget.dataset;

            if (this.type === index || index === undefined) {
                return false;
            } else {
                this.setData({
                    type: index
                });
            }
        },

        //显示弹框
        showDialogFun() {
            this.setData({
                showDialog: !this.showDialog,
                tap: false
            });
        },

        getChoseData() {
            let choseList = [
                {
                    name: '选项一',
                    list: [
                        {
                            id: 1,
                            value: '选项1-1'
                        },
                        {
                            id: 2,
                            value: '选项1-2'
                        },
                        {
                            id: 3,
                            value: '选项1-3'
                        },
                        {
                            id: 4,
                            value: '选项1-4'
                        },
                        {
                            id: 5,
                            value: '选项1-5'
                        }
                    ]
                },
                {
                    name: '选项二',
                    list: [
                        {
                            id: 1,
                            value: '选项2-1'
                        },
                        {
                            id: 2,
                            value: '选项2-2'
                        }
                    ]
                },
                {
                    name: '选项三',
                    list: [
                        {
                            id: 1,
                            value: '选项3-1'
                        },
                        {
                            id: 2,
                            value: '选项3-2'
                        },
                        {
                            id: 3,
                            value: '选项3-3'
                        },
                        {
                            id: 4,
                            value: '选项3-4'
                        }
                    ]
                }
            ];
            choseList.forEach((item) => {
                if (item.list.length >= 4) {
                    item.isMore = true;
                }
            });
            this.setData({
                choseList: choseList
            });
        },

        //展开收起
        showMore(e) {
            let { choseList } = this;
            let { index } = e.currentTarget.dataset;
            let choseInfo = choseList[index];
            choseInfo.isMore = !choseInfo.isMore;
            this.setData({
                choseList: choseList
            });
        },

        //选择 筛选项目
        choseOne(e) {
            let tap = true;
            let { index, index1 } = e.currentTarget.dataset;
            let { choseList } = this;
            let choseInfo = choseList[index];
            choseInfo.list.forEach((item, index) => {
                if (index == index1) {
                    item.chosed = true;
                } else {
                    item.chosed = false;
                }
            });
            this.setData({
                choseList,
                tap: tap
            });
        },

        //关闭弹框
        closePop() {
            this.setData({
                showDialog: true
            });
        },

        //获取当前日期
        getEndDate() {
            let endDate = this.endDate;
            let //结束日期
                date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
            endDate = year + '-' + month;
            this.setData({
                endDate //今年-这个月
            });
        },

        //获取年月
        bindDateChange: function (e) {
            this.setData({
                date: e.detail.value
            });
        },

        reset() {
            this.choseList.forEach((item) => {
                item.list.forEach((item1) => {
                    item1.chosed = false;
                });
            });
            this.setData({
                choseList: this.choseList,
                tap: false
            });
        },

        obsubmit() {
            this.setData({
                showDialog: true
            });
        },

        getSearch() {
            console.log('占位：函数 getSearch 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
