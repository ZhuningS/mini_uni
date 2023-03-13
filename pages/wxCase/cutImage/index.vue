<template>
    <!-- pages/wxCase/cutImage/index.wxml -->
    <view class="index_all_box">
        <view class="imgCut_header">
            <view class="imgCut_header_l" @tap="okCutImg">开始裁剪</view>
            <view class="imgCut_header_m" @tap="clickUpImg">点击上传图片</view>
            <view class="imgCut_header_r" @tap="okBtn">点击确认</view>
        </view>
        <!-- 选择裁剪模式 -->
        <view class="selectCutMode" v-if="alreay">
            <view :class="'selectCutMode_in ' + (cutType ? 'selectCutMode_in_act' : '')" @tap="etcType">等屏裁剪</view>
            <view :class="'selectCutMode_in ' + (!cutType ? 'selectCutMode_in_act' : '')" @tap="areaType">区域裁剪</view>
        </view>
        <view class="areaSelct_box" v-if="!cutType && alreay">
            <slider @change="areaChange" min="50" max="100" show-value :value="propor" />
        </view>
        <view class="cutImg_box" v-if="!prienFlag">
            <view class="cutImg_box_t">
                <image :src="cutImgUrl" mode="widthFix"></image>
            </view>
            <view class="clickCutImg_txt" @tap="againBtn">重新裁剪</view>
        </view>
        <view class="allCavans" v-if="prienFlag" :style="'width: ' + canvasW + 'px;height: ' + canvasH + 'px'">
            <canvas class="canvasSty" :style="'width: ' + canvasW + 'px;height: ' + canvasH + 'px'" canvas-id="cutImg" :disable-scroll="true" @touchmove="canvasMove"></canvas>
            <view class="allCavans_inbg" :style="'width: ' + canvasW + 'px;height:' + canvasH + 'px; background: url(' + img + ');background-size: 100% 100%'"></view>
        </view>
    </view>
</template>

<script>
// pages/wxCase/cutImage/index.js
export default {
    data() {
        return {
            canvasW: '',
            canvasH: '',
            img: '',
            cutH: '',
            cutImgUrl: '',
            prienFlag: false,
            alreay: false,
            cutX: '',
            cutY: '',
            nowCutW: '',
            nowCutH: '',
            cutType: false,
            propor: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var that = this;
        const ctx = uni.createCanvasContext('cutImg');
        ctx.setGlobalAlpha(0.4);
        var aa = 'https://i.postimg.cc/mgsKJGLw/susu1.jpg'; //获取当前屏幕宽度

        var phoneW = 350; // Number(util.nowPhoneWH()[0]*90)/100;

        var cutH = 150;
        uni.getImageInfo({
            src: aa,
            success: function (res) {
                var w = phoneW;
                var h = (phoneW / Number(res.width)) * Number(res.height);
                ctx.save();
                ctx.drawImage(aa, 0, 0, w, h);
                ctx.restore();
                ctx.setFillStyle('red');
                ctx.fillRect(0, 0, phoneW, cutH);
                ctx.draw();
                that.setData({
                    canvasW: w,
                    canvasH: h,
                    img: aa,
                    cutH: cutH
                });
            }
        });
    },
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
        // 点击确认裁剪图片
        okCutImg: function () {
            var that = this;
            var canvasW = that.canvasW;
            var canvasH = that.canvasH;
            var nowCutW = that.cutType ? canvasW : that.nowCutW;
            var nowCutH = that.cutType ? that.cutH : that.nowCutH;
            var cutX = that.cutX;
            var cutY = that.cutY;
            const ctx = uni.createCanvasContext('cutImg');
            ctx.setGlobalAlpha(1);
            ctx.drawImage(that.img, 0, 0, canvasW, canvasH);
            ctx.draw();
            uni.canvasToTempFilePath({
                x: cutX,
                y: cutY,
                width: nowCutW,
                height: nowCutH,
                destWidth: nowCutW,
                destHeight: nowCutH,
                canvasId: 'cutImg',
                success: function (res) {
                    console.log(res.tempFilePath);
                    var aa = res.tempFilePath;
                    that.setData({
                        cutImgUrl: aa,
                        prienFlag: false,
                        alreay: false
                    });
                }
            });
        },

        // 点击红框开始移动
        canvasMove: function (e) {
            var that = this;
            var canvasW = that.canvasW;
            var canvasH = that.canvasH;
            var nowCutW = that.cutType ? canvasW : that.nowCutW;
            var nowCutH = that.cutType ? that.cutH : that.nowCutH;
            var touches = e.touches[0];
            var x = touches.x;
            var y = touches.y - Number(nowCutH) / 2;

            if (that.cutType) {
                x = 0;
            } else {
                x = x - Number(nowCutW) / 2;
            }

            that.setData({
                cutX: x,
                cutY: y
            });
            const ctx = uni.createCanvasContext('cutImg');
            ctx.setGlobalAlpha(0.4);
            ctx.drawImage(that.img, 0, 0, canvasW, canvasH);
            ctx.setFillStyle('red');
            ctx.fillRect(x, y, nowCutW, nowCutH);
            ctx.draw();
        },

        //等屏裁剪
        etcType: function () {
            var that = this;
            var propor = 100;
            var canvasW = that.canvasW;
            var canvasH = that.canvasH;
            var cutH = that.cutH;
            var nowCutW = (Number(canvasW) * propor) / 100;
            var nowCutH = (Number(cutH) * propor) / 100;
            const ctx = uni.createCanvasContext('cutImg');
            ctx.setGlobalAlpha(0.4);
            ctx.drawImage(that.img, 0, 0, canvasW, canvasH);
            ctx.setFillStyle('red');
            ctx.fillRect(0, 0, nowCutW, nowCutH);
            ctx.draw();
            that.setData({
                nowCutW: nowCutW,
                nowCutH: nowCutH,
                cutType: true
            });
        },

        areaType: function () {
            var that = this;
            var propor = that.propor;
            var canvasW = that.canvasW;
            var canvasH = that.canvasH;
            var cutH = that.cutH;
            var nowCutW = (Number(canvasW) * propor) / 100;
            var nowCutH = (Number(cutH) * propor) / 100;
            const ctx = uni.createCanvasContext('cutImg');
            ctx.setGlobalAlpha(0.4);
            ctx.drawImage(that.img, 0, 0, canvasW, canvasH);
            ctx.setFillStyle('red');
            ctx.fillRect(0, 0, nowCutW, nowCutH);
            ctx.draw();
            that.setData({
                nowCutW: nowCutW,
                nowCutH: nowCutH,
                cutType: false
            });
        },

        areaChange: function (e) {
            var that = this;
            var propor = e.detail.value;
            var canvasW = that.canvasW;
            var canvasH = that.canvasH;
            var cutH = that.cutH;
            var nowCutW = (Number(canvasW) * propor) / 100;
            var nowCutH = (Number(cutH) * propor) / 100;
            const ctx = uni.createCanvasContext('cutImg');
            ctx.setGlobalAlpha(0.4);
            ctx.drawImage(that.img, 0, 0, canvasW, canvasH);
            ctx.setFillStyle('red');
            ctx.fillRect(that.cutX || 0, that.cutY || 0, nowCutW, nowCutH);
            ctx.draw();
            that.setData({
                nowCutW: nowCutW,
                nowCutH: nowCutH,
                propor: propor
            });
        },

        // 重新裁剪
        againBtn: function () {
            var that = this;
            var data = that;
            this.setData({
                prienFlag: true,
                alreay: true
            });
            const ctx = uni.createCanvasContext('cutImg');
            ctx.setGlobalAlpha(0.4);
            ctx.drawImage(data.img, 0, 0, data.canvasW, data.canvasH);
            ctx.setFillStyle('red');
            ctx.fillRect(that.cutX || 0, that.cutY || 0, data.nowCutW || data.canvasW, data.nowCutH || data.cutH);
            ctx.draw();
        },

        clickUpImg() {
            console.log('占位：函数 clickUpImg 未声明');
        },

        okBtn() {
            console.log('占位：函数 okBtn 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
