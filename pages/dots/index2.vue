<template>
    <view>
        <!-- pages/dots/index2.wxml -->
        <!-- indicator-active-color="#81C5F3" indicator-color="#999999" 默认情况 -->
        <swiper class="swiper-box" :current="swiperCurrent" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000" :circular="true">
            <swiper-item v-for="(item, index) in imgList" :key="index">
                <image :src="item" class="slide-image" mode="aspectFill"></image>
            </swiper-item>
        </swiper>

        <!-- 页码 -->
        <view class="swiper-box1">
            <swiper @animationfinish="monitorCurrent" :indicator-dots="false" :circular="true" :current="current" :autoplay="false">
                <block v-for="(item, index) in banner_list" :key="index">
                    <swiper-item>
                        <image :src="item" class="slide-image" mode="aspectFill"></image>
                    </swiper-item>
                </block>
            </swiper>
            <!-- 自定义轮播图进度点 -->
            <view class="dots_page">{{ current + 1 }}/{{ banner_list.length }}</view>
        </view>

        <!-- 进度 -->
        <view class="swiper-box1">
            <swiper @change="monitorCurrent1" :indicator-dots="false" :circular="true" :current="current1" :autoplay="autoplay1" :interval="interval1">
                <block v-for="(item, index) in banner_list" :key="index">
                    <swiper-item>
                        <image :src="item" class="slide-image" mode="aspectFill"></image>
                    </swiper-item>
                </block>
            </swiper>

            <view class="dots-parent">
                <block v-for="(item, index) in banner_list.length" :key="index">
                    <view class="progress-line-bg">
                        <view :class="current1 == index ? 'progress-line' : ''" :style="'width:' + progressNum + '%'"></view>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
// pages/dots/index2.js
export default {
    data() {
        return {
            current1: 0,
            autoplay1: true,

            // 轮播图自动切换时间间隔
            interval1: 5000,

            //轮播图进度条的计时器
            progressNumInterval: null,

            //轮播图进度条的进度
            progressNum: 0,

            current: 0,
            banner_list: [
                'https://i.postimg.cc/76br1jzJ/susu1.jpg',
                'https://i.postimg.cc/WzKK73vQ/20210729155755.jpg',
                'https://i.postimg.cc/qRRLS16Q/susu0.jpg',
                'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
            ],
            swiperCurrent: 0,
            imgList: [
                'https://i.postimg.cc/Bn1XpkSn/susu.jpg',
                'https://i.postimg.cc/Gm7KjGmN/111.jpg',
                'https://i.postimg.cc/Bv28vfkg/222.webp',
                'https://i.postimg.cc/65STLQNc/333.webp'
            ],
            autoplay: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // 初次执行顶部轮播图的进度条的进度点
        this.progressLineInterval();
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    onHide: function () {
        //关闭轮播图
        this.setData({
            autoplay: false
        }); // 清理进度条的计时器

        clearInterval(this.progressNumInterval);
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        //关闭轮播图
        this.setData({
            autoplay: false
        }); // 清理进度条的计时器

        clearInterval(this.progressNumInterval);
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        //轮播图切换
        swiperChange: function (e) {
            if (e.detail.source == 'touch' || e.detail.source == 'autoplay') {
                this.setData({
                    swiperCurrent: e.detail.current
                });
            }
        },

        monitorCurrent(e) {
            // 如果在 bindchange 的事件回调函数中使用 setData 改变 current 值，则有可能导致 setData 被不停地调用，因而通常情况下请在改变 current 值前检测 source 字段来判断是否是由于用户触摸引起。
            if (e.detail.source == 'touch' || e.detail.source == 'autoplay') {
                this.setData({
                    current: e.detail.current
                });
            }
        },

        monitorCurrent1(e) {
            if (e.detail.source == 'touch' || e.detail.source == 'autoplay') {
                // 二次执行顶部轮播图的小圆点的进度点
                this.progressLineInterval();
                this.setData({
                    current1: e.detail.current
                });
            }
        },

        //封装轮播图进度条计时器的方法
        progressLineInterval: function () {
            // 清理小圆点的计时器
            clearInterval(this.progressNumInterval); // 清理小圆点的进度

            this.setData({
                progressNum: 0
            });
            /**
             * 轮播图的切换时间为5秒，进度条的进度为1-100%，
             * 因为5000/100=50毫秒，所以每50毫秒就要执行1个进度点
             * 另外需要把计时器寄存在data{}对象上，否则会清理不掉上一个计时器
             * */

            this.progressNumInterval = setInterval(() => {
                let progressNum = this.progressNum; // console.log(progressNum)

                if (progressNum < 100) {
                    progressNum++;
                } else {
                    progressNum = 0; // 清理进度条的计时器

                    clearInterval(this.progressNumInterval);
                }

                this.setData({
                    progressNum: progressNum
                });
            }, 50);
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
