<template>
    <view>
        <!-- pages/jsCase/citySel/index.wxml -->
        <view :class="'head ' + (search && 'r_head')">
            <!-- 搜索框 -->
            <view class="flex-row">
                <view class="head_input">
                    <image src="/static/img/search_icon.png" class="search_icon"></image>
                    <input type="text" placeholder="搜索" placeholder-class="place_holder" @input="getValue" :value="search" />
                </view>
                <view class="sha_icon" @tap.stop.prevent="clear_input">取消</view>
            </view>
            <view class="flex-row head_curr" v-if="!search">
                <image src="/static/img/add_icon.png" class="h_c_icon" />
                <view>当前定位城市:{{ current_city }}</view>
            </view>
        </view>
        <scroll-view v-if="!search" :scroll-y="true" class="sy_container" :scroll-into-view="scrollViewId">
            <view class="hot_city">
                <view class="title">热门城市</view>
                <view class="flex-row flex-wrap box">
                    <block v-for="(item, index) in hot_city" :key="item.hot">
                        <view class="name" hover-class="sel_city" hover-stay-time="150">{{ item.name }}</view>
                    </block>
                </view>
            </view>
            <view class="all_city">
                <view v-if="item.data.length > 0" v-for="(item, index) in city_list" :key="item.city_list">
                    <view class="letter_name" :id="item.letter">{{ item.letter }}</view>

                    <view class="city">
                        <block v-for="(item0, index0) in item.data" :key="item0.data">
                            <view class="name flex-row" hover-class="city_hover" hover-stay-time="150">{{ item0.cityName }}</view>
                        </block>
                    </view>
                </view>
            </view>
        </scroll-view>
        <!-- 侧边选择索引 -->
        <view v-if="!search">
            <view
                class="fixed_bar"
                :style="'height: ' + barHeight + 'px;'"
                @touchstart.stop.prevent="touchStart"
                @touchmove.stop.prevent="touchMove"
                @touchend.stop.prevent="touchEnd"
                @touchcancel.stop.prevent="touchCancel"
            >
                <view :style="'height: ' + barHeight / 22 + 'px;'" v-for="(item, index) in city_list" :key="index">
                    <view
                        :class="'bar_item flex-column j_c ' + (curr == index && 'bar_item_active')"
                        :style="'width: ' + (barHeight / 22) * 0.75 + 'px;height: ' + (barHeight / 22) * 0.75 + 'px;'"
                    >
                        {{ item.letter }}
                    </view>
                </view>
            </view>
            <view v-if="showLetter && city_list[curr].letter" class="fixed_letter">{{ city_list[curr].letter }}</view>
        </view>
        <view v-if="search" class="result_list">
            <view v-if="result.length > 0">
                <block v-for="(item, index) in result" :key="item.result">
                    <view class="r_item" hover-stay-time="150" hover-class="r_item_hover">{{ item.name }}</view>
                </block>
            </view>
            <view v-else class="flex-column no_data">
                <image src="https://i.postimg.cc/7P00ckMG/image.png" />
                <view>请输入正确的城市名称呢</view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/jsCase/citySel/index.js
const { cityData } = require('./city.js');

export default {
    data() {
        return {
            current_city: '',
            search: '',

            hot_city: [
                {
                    name: '北京'
                },
                {
                    name: '上海'
                },
                {
                    name: '广州'
                },
                {
                    name: '长沙'
                },
                {
                    name: '张家口'
                },
                {
                    name: '杭州'
                },
                {
                    name: '西安'
                },
                {
                    name: '南京'
                },
                {
                    name: '苏州'
                }
            ],

            city_list: [],
            barHeight: 0,
            curr: -1,
            scrollViewId: '',
            barTop: 0,
            showLetter: false,

            //搜索结果
            result: [],

            letter: ''
        };
    },
    onLoad: function (options) {
        this.setData({
            current_city: options.currentCity || '南京',
            city_list: cityData
        });
        uni.getSystemInfo({
            success: (res) => {
                let winHeight = res.windowHeight;
                let barHeight = winHeight - (res.windowWidth / 750) * 300;
                this.setData({
                    barHeight: barHeight,
                    barTop: (res.windowWidth / 750) * 180
                });
            }
        });
    },
    methods: {
        /**
         * 获取value值
         * @param {*} e
         */
        getValue(e) {
            this.setData(
                {
                    search: e.detail.value
                },
                () => {
                    this.searchFun(e.detail.value);
                }
            );
        },

        /**
         * 搜索成功
         */
        searchFun(e) {
            let result = [];
            let { city_list } = this;
            city_list.forEach((item1) => {
                item1.data.forEach((item2) => {
                    if (item2.keyword.indexOf(e.toLocaleUpperCase()) !== -1) {
                        result.push({
                            name: item2.cityName
                        });
                    }
                });
            });
            this.setData({
                result
            });
        },

        /**
         * 清空验证码
         */
        clear_input() {
            this.setData({
                search: ''
            });
        },

        touch(e) {
            let pageY = e.touches[0].pageY;
            let index = Math.floor((pageY - this.barTop) / (this.barHeight / 22)); //向下取整

            let item = this.city_list[index];

            if (item) {
                this.setData({
                    scrollViewId: item.letter,
                    curr: index
                });
            }
        },

        touchStart(e) {
            this.setData({
                showLetter: true
            });
            this.touch(e);
        },

        touchMove(e) {
            this.touch(e);
        },

        touchEnd() {
            this.setData({
                showLetter: false
            });
        },

        touchCancel() {
            this.setData({
                showLetter: false
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
