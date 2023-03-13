<template>
    <view>
        <!-- pages/wxCase/downFile/index.wxml -->
        <view class="img_box">
            <block v-for="(item, index) in img_list" :key="index">
                <view class="img_item" @tap.stop.prevent="choseOne" :data-index="index">
                    <image :src="item.icon" class="img_img" />
                    <view :class="'item_check ' + (item.checked && 'checked')"></view>
                    <!-- 蒙层 -->
                    <view :class="' ' + (item.checked && 'item_mask')"></view>
                </view>
            </block>
        </view>
        <view class="btn" @tap.stop.prevent="saveTo">保存到相册</view>
    </view>
</template>

<script>
// pages/wxCase/downFile/index.js
import { writePhotosAlbum } from '../../../utils/util';
export default {
    data() {
        return {
            img_list: [
                {
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                },
                {
                    icon: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg'
                },
                {
                    icon: 'https://i.postimg.cc/pXDp6RXq/susu3.jpg'
                },
                {
                    icon: 'https://i.postimg.cc/XJmpTvCD/susu2.jpg'
                },
                {
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                },
                {
                    icon: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg'
                },
                {
                    icon: 'https://i.postimg.cc/pXDp6RXq/susu3.jpg'
                },
                {
                    icon: 'https://i.postimg.cc/XJmpTvCD/susu2.jpg'
                },
                {
                    icon: 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'
                },
                {
                    icon: 'https://i.postimg.cc/qRRLS16Q/susu0.jpg'
                }
            ],

            checkd_list: [],
            can_click: true
        };
    },
    methods: {
        choseOne(e) {
            let { index } = e.currentTarget.dataset;
            let { img_list } = this;
            img_list[index].checked = !img_list[index].checked;
            let checkd_list = img_list.filter((item) => {
                return item.checked && item;
            });
            this.setData({
                img_list,
                checkd_list
            });
        },

        saveTo() {
            if (this.checkd_list.length === 0) {
                return uni.showToast({
                    title: '请选择需要保存的图片',
                    icon: 'none'
                });
            }

            if (this.checkd_list.length > 9) {
                return uni.showToast({
                    title: '同时最多只能保存9张图片',
                    icon: 'none'
                });
            }

            if (this.can_click) {
                console.log(1111);
                this.can_click = false;
                var that = this;
                writePhotosAlbum(
                    function success() {
                        that.downForque(that.checkd_list)
                            .then((res) => {
                                uni.hideLoading();
                                uni.showToast({
                                    title: '下载完成',
                                    icon: 'none'
                                });
                                that.img_list.forEach((item) => {
                                    item.checked = false;
                                });
                                that.setData({
                                    img_list: that.img_list
                                });
                                that.checkd_list = [];
                                that.can_click = true;
                            })
                            .catch((err) => {
                                that.img_list.forEach((item) => {
                                    item.checked = false;
                                });
                                that.setData({
                                    img_list: that.img_list
                                });
                                that.checkd_list = [];
                                uni.hideLoading();
                                that.can_click = true;
                            });
                    },
                    function fail() {
                        uni.showToast({
                            title: '您拒绝了保存到相册',
                            icon: 'none'
                        });
                    }
                );
            }
        },

        // 队列
        downForque(urls) {
            let promise = Promise.resolve();
            urls.forEach((url, index) => {
                promise = promise.then(() => {
                    return this.download(url.icon, index);
                });
            });
            return promise;
        },

        download(url, index) {
            let length = this.checkd_list.length;
            return new Promise((resolve, reject) => {
                uni.downloadFile({
                    url: url,
                    success: function (res) {
                        var temp = res.tempFilePath;
                        uni.saveImageToPhotosAlbum({
                            filePath: temp,
                            success: function (res) {
                                uni.showLoading({
                                    title: '下载中(' + (index + 1) + '/' + length + ')'
                                });
                                resolve(res);
                            },
                            fail: function (err) {
                                reject(res);
                            }
                        });
                    },
                    fail: function (err) {
                        reject(err);
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
