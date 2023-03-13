<template>
    <view>
        <!-- pages/subPack/canvasPoster/index.wxml -->
        <button class="share_btn" open-type="getUserInfo" @getuserinfo="getUserInfo">点我生成分享图</button>
        <share-box :isCanDraw="isCanDraw" @initData="createShareImage" @close="handleClose" />
    </view>
</template>

<script>
import shareBox from '../components/shareBox/index';
// pages/subPack/canvasPoster/index.js
export default {
    components: {
        shareBox
    },
    data() {
        return {
            nickName: '',
            avatarUrl: '',
            isCanDraw: false
        };
    },
    onLoad: function (options) {
        this.setData({
            nickName: uni.getStorageSync('nickName') || '',
            avatarUrl: uni.getStorageSync('avatarUrl') || ''
        });
    },
    onShow: function () {},
    onShareAppMessage: function () {},
    methods: {
        // 获取用户信息
        getUserInfo(e) {
            if (e.detail.errMsg === 'getUserInfo:ok') {
                uni.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl);
                uni.setStorageSync('nickName', e.detail.userInfo.nickName);
                this.setData({
                    nickName: e.detail.userInfo.nickName,
                    avatarUrl: e.detail.userInfo.avatarUrl,
                    isCanDraw: !this.isCanDraw
                });
            }
        },

        handleClose() {
            this.setData({
                isCanDraw: !this.isCanDraw
            });
        },

        createShareImage() {}
    }
};
</script>
<style>
@import './index.css';
</style>
