<template>
    <view>
        <!-- pages/actualPage/scrollGap/index.wxml -->
        <swiper class="swiper" :circular="false" :vertical="true" :current="currentIndex" @change="choiceCurrent" @transition="transition" @animationfinish="animationfinish">
            <swiper-item>
                <view class="activity-video-header">
                    <image :src="muted ? '../img/vioce-none.png' : '../img/vioce-open.png'" class="muted_icon" @tap.stop.prevent="mutedTap" />
                    <view class="vioce-again" @tap.stop.prevent="closeVioce">跳过</view>
                </view>
                <view class="activity-video">
                    <video
                        id="myVideo"
                        class="video"
                        :src="activityAnimation"
                        :controls="false"
                        :loop="true"
                        :muted="muted"
                        object-fit="cover"
                        :show-center-play-btn="false"
                        :enable-progress-gesture="false"
                        :style="'height: ' + (currentIndex == 0 ? windowWidth * 1.88 + 'px' : windowHeight + 'px')"
                        @ended="handleVideoEnd"
                    ></video>
                    <view class="activity-video-icon">
                        <image src="/static/img/clolse_down.png" class="u-icon"></image>
                        <view>上滑关闭</view>
                    </view>
                </view>
            </swiper-item>
            <swiper-item>
                <view class="info-box">苏苏苏苏苏</view>
            </swiper-item>
        </swiper>

        <!-- bindtransition： swiper-item 的位置发生改变时会触发 transition 事件，event.detail = {dx: dx, dy: dy} -->
    </view>
</template>

<script>
// pages/actualPage/scrollGap/index.js
const app = getApp();
export default {
    data() {
        return {
            currentIndex: 0,
            muted: true,
            activityAnimation: ' https://static.51dh.com.cn/dbp/12/98/4494bd8a6e0fcd4a992f25a42bea28f8d1fb.mp4',
            windowWidth: app.globalData.windowWidth,
            windowHeight: app.globalData.windowHeight
        };
    },
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
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
        mutedTap() {
            this.setData({
                muted: !this.muted
            });
        },

        choiceCurrent(e) {
            let { currentIndex } = this;
            setTimeout(() => {
                currentIndex = e.detail.current;
                this.setData({
                    currentIndex
                });
            }, 300);
        },

        transition() {
            if (this.currentIndex == 0) {
                this.muted = false;
            }

            if (this.currentIndex == 1) {
                this.muted = true;
            }

            this.setData({
                muted: this.muted
            });
        },

        animationfinish() {
            console.log('占位：函数 animationfinish 未声明');
        },

        closeVioce() {
            console.log('占位：函数 closeVioce 未声明');
        },

        handleVideoEnd() {
            console.log('占位：函数 handleVideoEnd 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
