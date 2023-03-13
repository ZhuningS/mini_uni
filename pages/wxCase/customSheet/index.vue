<template>
    <view>
        <!-- pages/wxCase/customSheet/index.wxml -->
        <view class="show" @tap.stop.prevent="showPoster">点击显示弹框</view>
        <view class="mask" v-if="!show_poster" @tap.stop.prevent="closeModal"></view>
        <view class="share_btn" v-if="!show_poster">
            <view class="flex-row btn_list j_b">
                <button class="flex-column" open-type="share">
                    <image src="/static/img/share_icon.png"></image>
                    <text>分享海报给朋友</text>
                </button>
                <button class="flex-column" @tap.stop.prevent="downloadImg">
                    <image src="/static/pages/wxCase/img/download_icon.png"></image>
                    <text>保存海报至本地</text>
                </button>
            </view>
            <view class="btn_cancel" @tap.stop.prevent="closeModal">取消</view>
        </view>
        <view class="share_img" v-if="!show_poster">
            <image class="poster" :src="poster" :show-menu-by-longpress="true" mode="heightFix" />
        </view>
    </view>
</template>

<script>
// pages/wxCase/customSheet/index.js
import util from '../../../utils/util.js';
export default {
    data() {
        return {
            show_poster: true,
            poster: 'https://i.postimg.cc/k5cyysKQ/123123.png' //海报的url
        };
    },
    onLoad: function (options) {},
    onShow: function () {},
    onUnload: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    methods: {
        showPoster() {
            this.setData({
                show_poster: false
            });
        },

        // 关闭弹框
        closeModal() {
            this.setData({
                show_poster: true
            });
        },

        //相机授权
        isAuthorize() {
            return new Promise((resolve, reject) => {
                uni.authorize({
                    scope: 'scope.writePhotosAlbum'
                })
                    .then(() => {
                        resolve();
                    })
                    .catch(() => {
                        uni.getSetting().then((res) => {
                            if (!res.authSetting['scope.writePhotosAlbum']) {
                                uni.showModal({
                                    title: '是否授权保存到相册',
                                    content: '请确认授权，否则无法保存到相册',
                                    success: (res) => {
                                        if (res.confirm) {
                                            uni.openSetting();
                                        }
                                    }
                                });
                            }
                        });
                    });
            });
        },

        // 下载图片
        downloadImg() {
            let { poster } = this; // 下载文件不支持网络路径，需要先将网络路径转换为

            this.isAuthorize().then(() => {
                uni.getImageInfo({
                    src: poster,
                    success: (res) => {
                        let path = res.path;
                        uni.saveImageToPhotosAlbum({
                            filePath: path,
                            success: (res) => {
                                util.toolsFn.toastMsg('保存成功！');
                                this.setData({
                                    show_poster: true
                                });
                            },
                            fail: (res) => {
                                util.toolsFn.toastMsg('保存失败');
                            }
                        });
                    },

                    fail(res) {
                        util.toolsFn.toastMsg('保存失败');
                    }
                });
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
