<template>
    <!-- pages/apiDemo/canvastoImg/index.wxml -->
    <view class="container">
        <canvas canvas-id="tempCanvas" :style="'background:#ed3;width:' + canvasWidth + 'px;height:' + canvasHeight + 'px;position:absolute;left:-999999px'"></canvas>
        <scroll-view style="width: 100%; height: 500px" scroll-y>
            <view class="frameBox" :data-index="index" @tap="chooseFrame" v-for="(item, index) in frameSrcs" :key="item.unique">
                <image :src="oriFile + item.src" mode="aspectFit"></image>

                <text>{{ item.title }}</text>
            </view>
        </scroll-view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            canvasWidth: 0,
            canvasHeight: 0,
            tempCtx: {},
            oriFile: 'cloud://normal-env-ta6-normal-e0924598/frame/',
            frameSrcs: [
                {
                    src: '/static/pages/apiDemo/canvastoImg/frame1.png',
                    title: '文艺小清新'
                },
                {
                    src: '/static/pages/apiDemo/canvastoImg/frame2.png',
                    title: 'Happy Birthday'
                },
                {
                    src: '/static/pages/apiDemo/canvastoImg/frame3.png',
                    title: '素描花环'
                },
                {
                    src: '/static/pages/apiDemo/canvastoImg/frame4.png',
                    title: '文艺小清新'
                },
                {
                    src: '/static/pages/apiDemo/canvastoImg/frame5.png',
                    title: '卡通小屋'
                },
                {
                    src: '/static/pages/apiDemo/canvastoImg/frame6.png',
                    title: '爱心相框'
                },
                {
                    src: '/static/pages/apiDemo/canvastoImg/frame7.png',
                    title: '心形云朵'
                },
                {
                    src: '/static/pages/apiDemo/canvastoImg/frame8.png',
                    title: '爱心花环'
                },
                {
                    src: '/static/pages/apiDemo/canvastoImg/frame9.png',
                    title: '拍立得相框'
                },
                {
                    src: '/static/pages/apiDemo/canvastoImg/frame10.png',
                    title: '文艺小清新'
                },
                {
                    src: '/static/pages/apiDemo/canvastoImg/frame11.png',
                    title: '贴纸'
                }
            ]
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var tempCtx = uni.createCanvasContext('tempCanvas');
        this.setData({
            tempCtx: tempCtx
        });
    },
    methods: {
        chooseFrame(e) {
            var that = this;
            var index = e.currentTarget.dataset.index;
            uni.chooseImage({
                count: 1,
                // 默认9
                sizeType: ['compressed'],
                // 指定只能为压缩图，首先进行一次默认压缩
                sourceType: ['album', 'camera'],
                // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    uni.showLoading({
                        title: '正在添加相框'
                    });
                    var tempFilePath = res.tempFilePaths[0];
                    wx.cloud.getTempFileURL({
                        fileList: [that.oriFile + that.frameSrcs[index].src],
                        success: (res) => {
                            console.log(res.fileList);
                            uni.getImageInfo({
                                src: res.fileList[0].tempFileURL,
                                success: (res) => {
                                    var frameData = res;
                                    that.setData({
                                        canvasWidth: frameData.width,
                                        canvasHeight: frameData.height
                                    });
                                    uni.getImageInfo({
                                        src: tempFilePath,
                                        success: (res) => {
                                            var photoData = res;
                                            console.log('相框', frameData);
                                            console.log('相片', photoData); //计算比例

                                            var widthRatio = photoData.width / frameData.width;
                                            var heightRatio = photoData.height / frameData.height; //先画照片

                                            if (widthRatio < heightRatio) {
                                                that.tempCtx.drawImage(
                                                    photoData.path,
                                                    0,
                                                    0,
                                                    photoData.width,
                                                    that.canvasHeight * widthRatio,
                                                    0,
                                                    0,
                                                    that.canvasWidth,
                                                    that.canvasHeight
                                                );
                                            } else {
                                                that.tempCtx.drawImage(
                                                    photoData.path,
                                                    0,
                                                    0,
                                                    that.canvasWidth * heightRatio,
                                                    photoData.height,
                                                    0,
                                                    0,
                                                    that.canvasWidth,
                                                    that.canvasHeight
                                                );
                                            } //再画相框

                                            that.tempCtx.drawImage(frameData.path, 0, 0, frameData.width, frameData.height, 0, 0, that.canvasWidth, that.canvasHeight);
                                            that.tempCtx.draw();
                                            var timeId = setTimeout(function () {
                                                console.log('延时1秒回调');
                                                uni.canvasToTempFilePath({
                                                    canvasId: 'tempCanvas',
                                                    fileType: 'jpg',
                                                    success: function (res) {
                                                        uni.hideLoading();
                                                        console.log(res.tempFilePath);
                                                        uni.previewImage({
                                                            urls: [res.tempFilePath]
                                                        });
                                                        clearTimeout(timeId);
                                                    }
                                                });
                                            }, 1000);
                                        }
                                    });
                                }
                            });
                        },
                        fail: console.error
                    });
                }
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
