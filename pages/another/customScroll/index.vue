<template>
    <view>
        <!-- pages/another/customScroll/index.wxml -->
        <!-- 垂直滚动，这里必须设置高度 -->
        <scroll-view :scroll-y="true" style="height: 200px; margin-bottom: 50px">
            <view style="background: #e08282; width: 100%; height: 100px"></view>
            <view style="background: #e4861b; width: 100%; height: 100px"></view>
            <view style="background: #c8c8df; width: 100%; height: 100px"></view>
            <view style="background: #e6a275; width: 100%; height: 100px"></view>
        </scroll-view>
        <!--  white-space
  normal: 正常无变化(默认处理方式.文本自动处理换行.假如抵达容器边界内容会转到下一行)
  pre: 保持HTML源代码的空格与换行,等同与pre标签
  nowrap: 强制文本在一行,除非遇到br换行标签
  pre-wrap: 同pre属性,但是遇到超出容器范围的时候会自动换行
  pre-line: 同pre属性,但是遇到连续空格会被看作一个空格
  inherit: 继承
-->
        <!-- 水平滚动 -->
        <scroll-view :scroll-x="true" style="width: 750rpx; white-space: nowrap; display: flex">
            <!-- display: inline-block -->
            <view style="background: #e08282; width: 200px; height: 100px; display: inline-block"></view>
            <view style="background: #e4861b; width: 200px; height: 100px; display: inline-block"></view>
            <view style="background: #c8c8df; width: 200px; height: 100px; display: inline-block"></view>
            <view style="background: #e6a275; width: 200px; height: 100px; display: inline-block"></view>
        </scroll-view>
    </view>
</template>

<script>
// pages/another/customScroll/index.js
export default {
    data() {
        return {
            list: [
                {
                    name: '回家的诱惑',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                },
                {
                    name: '鱿鱼游戏',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                },
                {
                    name: '主君的太阳',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                },
                {
                    name: '地陷',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                },
                {
                    name: '寄生虫',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                },
                {
                    name: '紧急救援',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                },
                {
                    name: '逆行者',
                    price: '888',
                    sell_price: '9.9',
                    star_date: '2021.10.1',
                    end_date: '2021.10.8'
                }
            ]
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
