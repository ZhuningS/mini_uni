<template>
    <view>
        <!-- pages/jsCase/addressMap/index.wxml -->
        <map id="map" :latitude="latitude" :longitude="longitude" style="width: 100%; height: 600rpx"></map>
    </view>
</template>

<script>
// pages/jsCase/addressMap/index.js
export default {
    data() {
        return {
            latitude: '',
            longitude: '',
            nation: '',
            province: '',
            city: '',
            district: '',
            street: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
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
        // 获取地址
        getUserLocation: function () {
            let that = this;
            uni.getSetting({
                success: (res) => {
                    // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
                    // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
                    // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
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
                        //调用wx.getLocation的API
                        that.getLocation();
                    } else {
                        //调用wx.getLocation的API
                        that.getLocation();
                    }
                }
            });
        },

        getLocation: function () {
            const that = this;
            uni.getLocation({
                type: 'wgs84',
                altitude: true,
                isHighAccuracy: true,
                highAccuracyExpireTime: 2000,
                success: function (res) {
                    console.log(res);
                    that.setData({
                        latitude: res.latitude,
                        longitude: res.longitude
                    }); // 构建请求地址
                    // 逆解析接口 /ws/geocoder/v1

                    var qqMapApi = 'http://apis.map.qq.com/ws/geocoder/v1/' + '?location=' + that.latitude + ',' + that.longitude + '&key=' + 'your key' + '&get_poi=1';
                    that.sendRequest(qqMapApi);
                },
                fail: function () {
                    uni.showToast({
                        title: '获取位置信息失败',
                        icon: 'none'
                    });
                }
            });
        },

        sendRequest: function (qqMapApi) {
            const that = this;
            uni.request({
                url: qqMapApi,
                header: {
                    'Content-Type': 'application/json'
                },
                data: {},
                method: 'GET',
                success: (res) => {
                    console.log(res);

                    if (res.statusCode == 200 && res.data.status == 0) {
                        // 从返回值中提取需要的业务地理信息数据 国家、省、市、县区、街道
                        that.setData({
                            nation: res.data.result.address_component.nation
                        });
                        that.setData({
                            province: res.data.result.address_component.province
                        });
                        that.setData({
                            city: res.data.result.address_component.city
                        });
                        that.setData({
                            district: res.data.result.address_component.district
                        });
                        that.setData({
                            street: res.data.result.address_component.street
                        });
                    }
                }
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
