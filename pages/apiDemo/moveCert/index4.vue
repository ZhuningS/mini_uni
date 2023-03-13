<template>
    <view>
        <!-- pages/apiDemo/moveCert/index4.wxml -->
        <input class="input font_14" placeholder-class="grey" type="text" placeholder="输入图形验证码" maxlength="4" v-model="guiCode" @input="bindinput" />
        <canvas class="guiCode" type="2d" id="guiCodeCanvas" @tap="guiCodeTap"></canvas>
    </view>
</template>

<script>
var guiCode = require('../utils/code');

const app = getApp();
export default {
    data() {
        return {
            guiCode: ''
        };
    },
    onLoad: function (options) {
        this.guiCode = new guiCode({
            el: '#guiCodeCanvas',
            width: 70,
            height: 50,
            createCodeImg: ''
        });
    },
    methods: {
        bindinput() {},

        /**
         * 刷新图形验证码
         */
        guiCodeTap() {
            this.guiCode.refresh();
        },

        /**
         * 验证图形验证码
         */
        validateGuiCode() {
            if (!this.guiCode) {
                uni.showToast({
                    title: '请输入图形验证码',
                    icon: 'none'
                });
                return;
            }

            let res = this.guiCode.validate(this.guiCode);

            if (!res) {
                uni.showToast({
                    title: '图形验证码错误',
                    icon: 'none'
                });
            }
        },

        /**
         * 立即验证按钮监听
         */
        toValidate() {
            //验证图形验证码
            this.validateGuiCode();
        }
    }
};
</script>
<style>
@import './index4.css';
</style>
