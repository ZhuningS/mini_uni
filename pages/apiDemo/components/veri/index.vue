<template>
    <!-- pages/apiDemo/components/veri/index.wxml -->
    <!-- 滑动验证弹窗 -->
    <view class="slide_model" v-if="slidebel">
        <view class="slide_wrapper">
            <!-- 拼图图片部分 -->
            <view class="canvas_img" id="canvas_img">
                <!-- 背景图片 -->
                <canvas :style="'width: ' + canvas_width + 'px; height: ' + (canvas_width * 13) / 28 + 'px;'" canvas-id="firstCanvas" id="firstCanvas"></canvas>
                <!-- 被抠方块 -->
                <cover-view class="canvas_view" :style="'left:' + canfile_x + 'px;top:' + canfile_y + 'px;'"></cover-view>
                <!-- 可移动空格 -->
                <cover-image
                    class="canfile_image"
                    :style="'top:' + canfile_y + 'px;left:' + (slide_clientX > canvas_width - 50 ? canvas_width - 50 : slide_clientX) + 'px;'"
                    :src="canfile_image"
                ></cover-image>
            </view>
            <!-- 滑块 -->
            <view class="canvas_slide">
                <view
                    class="canvas_width"
                    :style="
                        'width:' +
                        (slide_clientX > canvas_width - 50 ? canvas_width - 50 : slide_clientX) +
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
                        (slide_clientX > canvas_width - 50 ? canvas_width - 50 : slide_clientX) +
                        'px; ' +
                        (slide_status == 0 ? 'color: #333;' : '') +
                        ' ' +
                        (slide_status == 1 ? 'background:#1991FA;' : '') +
                        ' ' +
                        (slide_status == 2 ? 'background:#52CCBA;' : '') +
                        ' ' +
                        (slide_status == 3 ? 'background:#F57A7A;' : '')
                    "
                >
                    <view v-if="slide_status < 2" :style="'background-image: ' + (slide_status == 0 ? 'url(/imgs/puzzle-uncheck.png)' : 'url(/imgs/puzzle-uncheck2.png)')"></view>
                    <view v-if="slide_status == 2">
                        <image src="/static/imgs/puzzle-checked.png" mode="aspectFit" style="width: 40rpx; height: 40rpx; margin-top: 10px"></image>
                    </view>
                    <view v-if="slide_status == 3">
                        <image src="/static/imgs/puzzle-fail.png" mode="aspectFit" style="width: 40rpx; height: 40rpx; margin-top: 10px"></image>
                    </view>
                </view>
                <view v-if="slide_status == 0 || slide_status == 1">拖动左边滑块完成上方拼图</view>
            </view>
            <!-- 底部按钮 -->
            <view class="canvas_guil">
                <image @tap="visidlisd" class="footer-icon" src="/static/imgs/puzzle-close.png" style="width: 50rpx; height: 50rpx"></image>
                <image @tap="slide_tap" class="footer-icon" src="/static/imgs/puzzle-fresh.png" style="width: 48rpx; height: 48rpx"></image>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            canvas_width: 0,
            slidebel: false,
            //滑动弹窗
            canfile_image: '',
            //裁剪图片
            canfile_x: '',
            //被抠方块的水平位置
            canfile_y: '',
            //被抠方块的垂直位置
            slide_clientX: 0,
            //移动位置
            slide_status: 0 //0 停止操作   1 触发长按   2 正确   3 错误
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        sildeBlockCont: {
            //接受父组件值
            type: String
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 弹窗
        visidlisd(e) {
            var that = this;
            this.setData({
                slidebel: !this.slidebel
            });

            if (this.slidebel) {
                if (this.canvas_width != 0) {
                    this.slide_tap();
                    return;
                }

                uni.nextTick(() => {
                    let query = this.createSelectorQuery();
                    query
                        .select('#canvas_img')
                        .boundingClientRect(function (rect) {
                            that.setData({
                                canvas_width: rect.width
                            });
                            that.slide_tap();
                        })
                        .exec();
                });
            }
        },

        // 画布
        slide_tap(e) {
            var that = this;
            var imgIndex = Math.round(Math.random() * 13 + 1);
            that.setData({
                canfile_x: Math.round(Math.random() * (this.canvas_width - 120) + 60),
                canfile_y: Math.round(Math.random() * ((this.canvas_width * 13) / 28 - 60)),
                canfile_image: ''
            });
            setTimeout(function () {
                var context = uni.createCanvasContext('firstCanvas', that);
                context.width = that.canvas_width;
                context.height = (that.canvas_width * 13) / 28; //  /imgs/puzzle-bg-${imgIndex}.jpg  为滑块背景图 从静态资源获取  如从接口获取可从that.properties.properties拿

                context.drawImage(`/imgs/puzzle-bg-${imgIndex}.jpg`, 0, 0, context.width, context.height);
                context.draw(false, () => {
                    uni.canvasToTempFilePath(
                        {
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
                        },
                        that
                    );
                });
            }, 50);
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
            var maxX = this.canvas_width - 60;

            if (that.slide_clientX < 1) {
                that.slide_status = 0;
                return false;
            }

            if (that.slide_clientX > maxX) {
                cliextX = maxX;
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
                }, 500);
                uni.showToast({
                    icon: 'success',
                    title: '验证成功'
                });
                that.$emit('puzzleVerify');
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
            }, 500);
        }
    },
    created() {
        // 在组件实例刚刚被创建时执行
    },
    mounted() {
        // 在组件在视图层布局完成后执行
        // console.log(this.properties.sildeBlockCont);
    }
};
</script>
<style>
@import './index.css';
</style>
