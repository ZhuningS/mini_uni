<template>
    <view>
        <!-- pages/effects/audioCust/index.wxml -->
        <image :src="checked ? '../img/stop.png' : '../img/play.png'" :class="'music ' + (!checked && 'circle')" @tap.stop.prevent="checkMusic"></image>
        <view @tap.stop.prevent="toNext" class="btn">去下一个页面</view>
        <view class="fix_img"></view>
    </view>
</template>

<script>
// pages/effects/audioCust/index.js
export default {
    data() {
        return {
            checked: false
        };
    },
    onShow: function () {
        this.player(uni.getBackgroundAudioManager());
    },
    // 页面卸载时候暂停播放（不加页面将一直播放）
    onUnload: function () {
        uni.getBackgroundAudioManager().stop();
    },
    // 小程序隐藏时候暂停播放（不加页面将一直播放）
    onHide() {
        uni.getBackgroundAudioManager().stop();
    },
    methods: {
        checkMusic() {
            console.log(11);
            this.setData({
                checked: !this.checked
            });

            if (this.checked) {
                uni.getBackgroundAudioManager().pause();
            } else {
                this.player(uni.getBackgroundAudioManager());
            }
        },

        player(e) {
            e.title = '苏苏的音乐';
            e.src = 'http://music.163.com/song/media/outer/url?id=36587407.mp3'; //音乐播放结束后继续播放此音乐，循环不停的播放

            e.onEnded(() => {
                this.player(uni.getBackgroundAudioManager());
            });
        },

        toNext() {
            uni.navigateTo({
                url: '/pages/jsCase/draw/index'
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
