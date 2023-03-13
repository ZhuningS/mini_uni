<template>
    <!-- pages/clockIn/index.wxml -->
    <view class="index">
        <!-- 用户信息 -->
        <view class="head">
            <view class="head_box flex-row">
                <view class="user_ava">
                    <open-data type="userAvatarUrl"></open-data>
                </view>
                <view>
                    <view class="user_name">
                        苏苏就是小苏苏
                        <text>早上好</text>
                    </view>
                    <view class="user_add">新的一天开始了~</view>
                </view>
            </view>
        </view>
        <view class="con">
            <view class="c_title">打卡记录时间和位置：</view>
            <!-- 上传图片 -->
            <view class="c_section">
                <view :class="'c_item  ' + (status == 1 ? 'ative' : '')">
                    上班打卡
                    <text v-if="status != 0">（打卡时间：{{ now_time_stop }}）</text>
                    <!-- 打卡位置 -->
                    <view v-if="status != 0" class="flex-row start_lo">
                        <image class="now_icon" src="/static/img/add0.png"></image>
                        <text class="now_location">当前位置：{{ current_address }}</text>
                    </view>
                </view>

                <view :class="'c_item ' + (imgUrl ? 'ative' : '')">
                    *拍照上传(必传)
                    <view class="start_end upload_box flex-column j_c" v-if="!imgUrl" @tap.stop.prevent="chooseImg">
                        <image src="/static/img/add.png" class="camera_icon" />
                        <text>点击上传图片</text>
                    </view>
                    <view class="start_end upload_box" v-else>
                        <image :src="imgUrl" class="clock_img" mode="aspectFill" @tap.stop.prevent="previewImg" />
                        <image src="/static/img/close1.png" class="del_icon" @tap.stop.prevent="deleteImg" v-if="status !== 1"></image>
                    </view>
                </view>
            </view>
            <!-- 打卡按钮 -->
            <view class="c_clock flex-column">
                <view :class="'clock_time flex-column j_c ' + (status == 1 ? 'c1' : '')" @tap.stop.prevent="clockInStart">
                    <text>上班打卡</text>
                    <text>{{ now_time }}</text>
                </view>
                <view :class="'clock_time_over flex-column j_c  ' + (status == 1 ? 'c2' : '')" @tap.stop.prevent="clockInStart">
                    <text>已打卡</text>
                    <text>{{ now_time_stop }}</text>
                </view>
            </view>
            <!-- 打卡地址 -->
            <view class="clock_address">
                <image src="/static/img/add0.png" class="add_icon" />
                <text>当前位置：{{ current_address }}</text>
                <text class="refresh" @tap.stop.prevent="refreshAdd">刷新</text>
            </view>
        </view>
    </view>
</template>

<script>
// pages/clockIn/index.js
import qqMapSdk from '../util/qqmap.js';
const app = getApp();
export default {
    data() {
        return {
            now_time: '',
            current_address: '',
            status: 0,
            //0---》上班未打卡 1----》上班已打卡
            now_time_stop: '',
            //已打卡时间
            imgUrl: '' //打卡照片
        };
    },
    onLoad: function (options) {
        this.getCurrentTime();
        this.getLocation();
        this.setData({
            now_time: this.getTime()
        });
    },
    onShow: function () {},
    methods: {
        // 上班打卡
        clockInStart() {
            if (!this.imgUrl) {
                return uni.showToast({
                    title: '尚未上传打卡照',
                    icon: 'error'
                });
            }

            if (!this.current_address) {
                return uni.showToast({
                    title: '未获取当前定位',
                    icon: 'error'
                });
            }

            uni.vibrateLong(); //使手机震动400ms

            this.setData(
                {
                    status: 1,
                    //上班已打卡
                    now_time_stop: this.now_time
                },
                uni.showToast({
                    title: '打卡成功',
                    icon: 'none'
                })
            );
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
        getUserAuth: function () {
            return new Promise((resolve, reject) => {
                uni.authorize({
                    scope: 'scope.userLocation'
                })
                    .then(() => {
                        resolve();
                    })
                    .catch(() => {
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
                    });
            });
        },

        getLocation: function () {
            uni.getLocation({
                type: 'gcj02',
                success: (res) => {
                    console.log('哈时代峰峻艾师傅的数据恢复就收到回复是的');
                    let { longitude, latitude } = res;
                    let locations = latitude + ',' + longitude; // 小程序坐标转地图坐标

                    this.translate(locations).then((res) => {
                        if (res.locations) {
                            latitude = res.locations[0].lat;
                            longitude = res.locations[0].lng;
                        }
                    });
                    qqMapSdk.reverseGeocoder({
                        location: {
                            latitude: latitude,
                            longitude: longitude
                        },
                        success: (res) => {
                            let current_address = res.result.address + res.result.formatted_addresses.recommend;
                            this.setData({
                                current_address
                            });
                            console.log(res);
                        },
                        fail: function (err) {
                            console.log(err);
                        }
                    });
                },
                fail: (res) => {
                    console.log(res);
                    this.getUserAuth();
                    uni.showToast({
                        title: '获取定位失败，请打开手机定位，重新进入！',
                        icon: 'none'
                    });
                }
            });
        },

        // 刷新
        refreshAdd() {
            this.getLocation();
        },

        // 地址转换
        translate(locations) {
            return new Promise((resolve, reject) => {
                let url = 'https://apis.map.qq.com/ws/coord/v1/translate';
                uni.request({
                    url,
                    method: 'GET',
                    data: {
                        locations,
                        type: 5,
                        //[默认]腾讯、google、高德坐标
                        key: 'CREBZ-B7PKX-GL44O-7ITDB-7UFU7-OLFDV'
                    },
                    success: (res) => resolve(res.data),
                    fail: (err) => reject(err)
                });
            });
        },

        chooseImg() {
            uni.chooseImage({
                count: 1,
                // 默认9
                sizeType: ['original', 'compressed'],
                // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'],
                // 可以指定来源是相册还是相机，默认二者都有
                success: (res) => {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    var tempFilePaths = res.tempFilePaths[0];
                    this.setData({
                        imgUrl: tempFilePaths
                    });
                }
            });
        },

        // 删除图片
        deleteImg: function (e) {
            this.setData({
                imgUrl: ''
            });
        },

        // 预览图片
        previewImg: function (e) {
            uni.previewImage({
                current: this.imgUrl,
                // 当前显示图片的http链接
                urls: [this.imgUrl] // 需要预览的图片http链接列表
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
