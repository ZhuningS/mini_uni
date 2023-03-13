<template>
    <!-- pages/jsCase/clock/index.wxml -->
    <!-- pages/clockIn/index.wxml -->
    <view class="index">
        <view class="head">
            <view class="head_box flex-row">
                <view class="user_ava">
                    <open-data type="userAvatarUrl"></open-data>
                </view>
                <view>
                    <view class="user_name">
                        苏苏就是小苏苏
                        <text>工号：100020000</text>
                    </view>
                    <view class="user_add">南京新街口门店</view>
                </view>
            </view>
        </view>
        <view class="con">
            <view class="c_title">打卡记录时间和位置：</view>
            <view class="c_section">
                <view class="c_item">
                    上班打卡
                    <text v-if="status != 0">（打卡时间：{{ now_time_stop }}）</text>
                    <!-- 打卡位置 -->
                    <view v-if="status != 0" class="flex-row start_lo">
                        <image class="now_icon" src="/static/img/add_icon.png"></image>
                        <text class="now_location">当前位置：广治万科中心</text>
                    </view>
                </view>

                <view class="c_item">
                    下班打卡
                    <text v-if="status == 3">（打卡时间：{{ now_time_stop_end }}）</text>
                    <!-- 打卡位置 -->
                    <view v-if="status == 3" class="flex-row start_end">
                        <image class="now_icon" src="/static/img/add_icon.png"></image>
                        <text class="now_location">当前位置：广治万科中心</text>
                    </view>
                </view>
            </view>
            <view class="c_clock flex-column">
                <view class="clock_time flex-column j_c" :animation="animationData" @tap.stop.prevent="clockInStart" v-if="status == 0">
                    <text>上班打卡</text>
                    <text>{{ now_time }}</text>
                </view>
                <view class="clock_time_over flex-column j_c" @tap.stop.prevent="clockInStart" v-if="status == 1">
                    <text>已打卡</text>
                    <text>{{ now_time_stop }}</text>
                </view>
                <view class="clock_time flex-column j_c" @tap.stop.prevent="clockInEnd" v-if="status == 2">
                    <text>下班打卡</text>
                    <text>{{ now_time }}</text>
                </view>
                <view class="clock_time_over flex-column j_c" @tap.stop.prevent="clockInStart" v-if="status == 3">
                    <text>已打卡</text>
                    <text>{{ now_time_stop_end }}</text>
                </view>
                <view class="clock_address">
                    <image src="/static/img/add_icon.png" class="add_icon" />
                    <text>当前位置：{{ current_address }}</text>
                    <text class="refresh">刷新</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/clockIn/index.js
export default {
    data() {
        return {
            now_time: '',
            current_address: '',
            status: 0,
            //0---》上班未打卡 1----》上班已打卡 2-----下班未打卡》
            now_time_stop: '',
            //已打卡时间
            now_time_stop_end: '',
            //下班已打卡时间
            animationData: '' //打卡动画栈
        };
    },
    onLoad: function (options) {
        this.getCurrentTime();
        this.getUserLocation();
        this.setData({
            now_time: this.getTime()
        });
    },
    onShow: function () {},
    methods: {
        // 上班打卡
        clockInStart() {
            uni.vibrateLong(); //使手机震动400m

            let animationData = uni.createAnimation({
                timingFunction: 'ease-in',
                duration: 1000
            });
            animationData.rotateY(180).step(); // 导出动画栈

            this.setData(
                {
                    animationData: animationData.export()
                },
                setTimeout(() => {
                    this.setData(
                        {
                            status: 1,
                            //上班已打卡
                            now_time_stop: this.now_time
                        },
                        setTimeout(() => {
                            this.setData({
                                status: 2
                            });
                        }, 3000)
                    );
                }, 1000)
            );
        },

        // 下班打卡
        clockInEnd() {
            this.setData({
                status: 3,
                //上班已打卡
                now_time_stop_end: this.now_time
            });
        },

        getCurrentTime: function () {
            var time = setInterval(() => {
                this.setData({
                    now_time: this.getTime()
                });
            }, 1000);
        },

        getTime() {
            let dateTime = '';
            let hh = new Date().getHours();
            let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
            dateTime = hh + ':' + mf + ':' + ss;
            return dateTime;
        },

        // 获取当前的地址
        getUserLocation: function () {
            let that = this;
            uni.getSetting({
                success: (res) => {
                    if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
                        uni.showModal({
                            title: '请求授权当前位置',
                            content: '需要获取您的地理位置，请确认授权',
                            success: function (res) {
                                if (res.cancel) {
                                    uni.showToast({
                                        title: '拒绝授权',
                                        icon: 'none',
                                        duration: 1000
                                    });
                                } else if (res.confirm) {
                                    uni.openSetting({
                                        success: function (dataAu) {
                                            if (dataAu.authSetting['scope.userLocation'] == true) {
                                                //再次授权，调用wx.getLocation的API
                                                that.getLocation();
                                            } else {
                                                uni.showToast({
                                                    title: '授权失败',
                                                    icon: 'none',
                                                    duration: 1000
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    } else if (res.authSetting['scope.userLocation'] == undefined) {
                        that.getLocation();
                    } else {
                        that.getLocation();
                    }
                }
            });
        },

        getLocation: function () {
            uni.getLocation({
                type: 'wgs84',
                success: (res) => {
                    console.log(res);
                    const latitude = res.latitude;
                    const longitude = res.longitude; //  调用腾讯地图sdk获取到当前的地址
                }
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
