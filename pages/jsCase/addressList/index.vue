<template>
    <view>
        <!-- pages/jsCase/addressList/index.wxml -->
        <view class="right-nav">
            <view
                @tap="getCurrentCode"
                :class="chooseIndex == index ? '.city-list-active' : ''"
                :style="'height:' + codeHeight + 'px'"
                :data-code="item.code"
                :data-index="index"
                v-for="(item, index) in cityList"
                :key="index"
            >
                {{ item.code }}
            </view>
        </view>

        <view :class="'city-layer ' + (isShowLayer ? '' : 'layer-hide')">
            {{ codeY }}
        </view>

        <view class="current-choose-city">当前选择机场：{{ chooseCity }}</view>
        <scroll-view class="city-scroll" :scroll-y="true" :scroll-into-view="codeY" :scroll-with-animation="true" :style="'height:' + cityHeight + 'px'" @scroll="scroll">
            <view class="city-box" v-for="(item, index) in cityList" :key="item.code">
                <view class="city-code" :id="item.code">{{ item.code }}</view>

                <view class="city-list" @tap="getChooseCity" :data-city="city" v-for="(city, index1) in item.cityList" :key="index1">
                    {{ city }}
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
var city_list = require('./city.js');

export default {
    data() {
        return {
            cityList: city_list.city,
            chooseCity: '您还未选择机场！',
            isShowLayer: false,
            chooseIndex: 0,
            codeY: 'A',
            codeHeight: null,
            cityHeight: null,
            city: ''
        };
    },
    onLoad(options) {
        var windowHeight = uni.getSystemInfoSync().windowHeight;
        this.setData({
            codeHeight: (windowHeight - 50) / this.cityList.length,
            cityHeight: windowHeight - 50
        });
    },
    methods: {
        getCurrentCode(e) {
            var self = this;
            this.setData({
                codeY: e.target.dataset.code,
                chooseIndex: e.target.dataset.index,
                isShowLayer: true
            });
            setTimeout(() => {
                self.setData({
                    isShowLayer: false
                });
            }, 500);
        },

        getChooseCity(e) {
            this.setData({
                chooseCity: e.target.dataset.city
            });
        },

        scroll() {
            console.log('占位：函数 scroll 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
