<template>
    <view>
        <!-- pages/jsCase/onLoaction/index.wxml -->
        <view class="btn">获取当前地址</view>
        <input placeholder="请输入" @confirm="show" />
        <view class="btn_pop">获取当前地址</view>
    </view>
</template>

<script>
// pages/jsCase/onLoaction/index.js
export default {
    data() {
        return {};
    },
    onLoad: function () {
        //后台定位
        // wx.startLocationUpdateBackground({
        //   success(res) {
        //     console.log('开启后台定位', res)
        //   },
        //   fail(res) {
        //     console.log('开启后台定位失败', res)
        //   }
        // })
    },
    // // 这个函数 在 onLoad内触发 或 点击触发
    // async location() {
    //   const that = this;
    //   try {
    //     await that.getWxLocation()
    //   } catch (error) {
    //     wx.showModal({
    //       title: '温馨提示',
    //       tip: '获取权限失败，需要获取您的地理位置才能为您提供更好的服务！是否授权获取地理位置？',
    //       showCancel: true,
    //       confirmText: '前往设置',
    //       cancelText: '取消',
    //       sureCall() {
    //         that.toSetting()
    //       },
    //       cancelCall() {}
    //     })
    //     return
    //   }
    // },
    // // 获取位置信息
    // getWxLocation() {
    //   wx.showLoading({
    //     title: '定位中...',
    //     mask: true,
    //   })
    //   return new Promise((resolve, reject) => {
    //     const _locationChangeFn = (res) => {
    //       console.log('location change', res)
    //       wx.hideLoading()
    //       wx.offLocationChange(_locationChangeFn)
    //     }
    //     wx.startLocationUpdate({
    //       success: (res) => {
    //         wx.onLocationChange(_locationChangeFn)
    //         resolve()
    //       },
    //       fail: (err) => {
    //         reject()
    //       }
    //     })
    //   })
    // },
    // // 调起客户端小程序设置界面
    // toSetting() {
    //   wx.openSetting({
    //     success(res) {
    //       if (res.authSetting["scope.userLocation"]) {
    //         this.authorization()
    //       }
    //     }
    //   })
    // },
    onReady() {
        // //获取变化的地址
        // wx.onLocationChange(function (res) {
        //     console.log("location has change!")
        //     console.log(res)
        //   }),
        //   //通过不断刷新页面，来获取新的地址
        //   setTimeout(this.onReady, 1000)
    },
    methods: {
        show() {
            uni.showToast({
                title: 'xixihhasd a'
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
