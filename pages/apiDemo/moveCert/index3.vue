<template>
    <view>
        <!-- pages/apiDemo/moveCert/index3.wxml -->
        <button @tap="visidlisd">滑动验证</button>
        <!-- 滑动验证弹窗 -->
        <view class="slide_model" v-if="slidebel">
            <view>
                <view class="canvas_img">
                    <canvas v-if="!canfile_image" style="width: 300px; height: 104px" canvas-id="firstCanvas"></canvas>
                    <image v-if="canfile_image" class="canvas_srinl" :src="'/images/slideimage_' + canfile_index + '.jpg'"></image>
                    <view class="canvas_view" :style="'left:' + canfile_x + 'px;top:' + canfile_y + 'px;'"></view>
                    <image class="canfile_image" :style="'top:' + canfile_y + 'px;left:' + (slide_clientX > 250 ? 250 : slide_clientX) + 'px;'" :src="canfile_image"></image>
                </view>
                <view class="canvas_slide">
                    <view
                        class="canvas_width"
                        :style="
                            'width:' +
                            (slide_clientX > 260 ? 260 : slide_clientX) +
                            'px;' +
                            (slide_status == 2 ? 'background:#52CCBA;' : '') +
                            (slide_status == 3 ? 'background:#F57A7A;' : '')
                        "
                    ></view>
                    <view
                        class="canvas_kus"
                        @touchstart="slide_start"
                        @touchmove="slide_hmove"
                        @touchend="slide_chend"
                        :style="
                            'left:' +
                            (slide_clientX > 260 ? 260 : slide_clientX) +
                            'px;' +
                            (slide_status == 0 ? 'color: #333;' : '') +
                            (slide_status == 1 ? 'background:#1991FA;' : '') +
                            (slide_status == 2 ? 'background:#52CCBA;' : '') +
                            (slide_status == 3 ? 'background:#F57A7A;' : '')
                        "
                    >
                        <view v-if="slide_status < 2" class="cuIcon-back_android"></view>
                        <view v-if="slide_status == 2" class="cuIcon-check"></view>
                        <view v-if="slide_status == 3" class="cuIcon-close"></view>
                    </view>
                    <view v-if="slide_status == 0">拖动左边滑块完成上方拼图</view>
                </view>
                <view class="canvas_guil">
                    <view @tap="visidlisd" class="cuIcon-roundclose"></view>
                    <view @tap="slide_tap" class="cuIcon-refresh"></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            slidebel: false,
            //滑动弹窗
            canfile_image: '',
            //裁剪图片
            canfile_index: '',
            //图片返回 1 至 3 之间的数
            canfile_x: '',
            //x返回 60 至 240 之间的数
            canfile_y: '',
            //y返回 0 至 50 之间的数
            slide_clientX: 0,
            //移动位置
            slide_status: 0 //0 停止操作   1 触发长按   2 正确   3 错误
        };
    },
    methods: {
        // 弹窗
        visidlisd(e) {
            this.setData({
                slidebel: !this.slidebel
            });

            if (this.slidebel) {
                this.slide_tap();
            }
        },

        // 画布
        slide_tap(e) {
            var that = this;
            that.setData({
                canfile_index: Math.round(Math.random() * 2 + 1),
                canfile_x: Math.round(Math.random() * 180 + 60),
                canfile_y: Math.round(Math.random() * 54),
                canfile_image: ''
            });
            clearTimeout(that.timeoutID);
            that.timeoutID = setTimeout(function () {
                var context = uni.createCanvasContext('firstCanvas');
                context.width = 300;
                context.height = 104;
                context.drawImage('/images/slideimage_' + that.canfile_index + '/static/pages/apiDemo/moveCert/.jpg', 0, 0, context.width, context.height);
                context.draw(true, () => {
                    uni.canvasToTempFilePath({
                        x: that.canfile_x,
                        y: that.canfile_y,
                        width: 50,
                        height: 50,
                        canvasId: 'firstCanvas',
                        success: function (res) {
                            that.setData({
                                canfile_image: res.tempFilePath
                            });
                        }
                    });
                });
            }, 300);
        },

        // 滑动开始
        slide_start(e) {
            this.setData({
                slide_status: 1
            });
        },

        // 滑动中
        slide_hmove(e) {
            this.setData({
                slide_clientX: e.touches[0].clientX - 60 < 1 ? 0 : e.touches[0].clientX - 60
            });
        },

        //滑动结束
        slide_chend(e) {
            var that = this;
            var cliextX;

            if (that.slide_clientX < 1) {
                that.slide_status = 0;
                return false;
            }

            if (that.slide_clientX > 240) {
                cliextX = 240;
            } else {
                cliextX = that.slide_clientX;
            }

            if (that.canfile_x + 5 > cliextX && that.canfile_x - 5 < cliextX) {
                that.setData({
                    slide_status: 2,
                    slide_clientX: that.canfile_x
                });
                setTimeout(function () {
                    that.setData({
                        slidebel: false
                    });
                }, 1500);
            } else {
                that.setData({
                    slide_status: 3
                });
            }

            setTimeout(function () {
                that.setData({
                    slide_status: 0,
                    slide_clientX: 0
                });
            }, 1500);
        }
    }
};
</script>
<style>
@import './index3.css';
</style>
