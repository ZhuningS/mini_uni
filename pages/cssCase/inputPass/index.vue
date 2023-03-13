<template>
    <view>
        <!-- pages/cssCase/inputPass/index.wxml -->
        <view class="mb20">小程序的type木有password属性，但有password,判断是否是密码类型</view>
        <view class="flex-row j_b">
            <view class="flex-row fill_box">
                <text>密码：</text>
                <input type="text" :password="!open" placeholder="请输入密码" @focus="focusFun" @blur="blur" :class="focus ? 'ative' : ''" />
            </view>
            <image :src="open ? '../img/open_eye.png' : '../img/no_eye.png'" class="eye" @tap.stop.prevent="switchFun" />
        </view>
        <view class="flex-row j_b" style="margin-top: 50rpx">
            <view class="flex-row fill_box">
                <text>密2：</text>
                <input type="text" :value="pass" placeholder="请输入密码" @input="getValue" />
            </view>
            <image :src="open1 ? '../img/open_eye.png' : '../img/no_eye.png'" class="eye" @tap.stop.prevent="switch1" />
        </view>
    </view>
</template>

<script>
// pages/cssCase/inputPass/index.js
export default {
    data() {
        return {
            open: false,
            //默认不显示密码
            open1: false,
            //默认不显示密码
            focus: false,
            //是否获取焦点
            pass: '',
            pass1: ''
        };
    },
    methods: {
        switchFun() {
            this.setData({
                open: !this.open
            });
        },

        switch1() {
            this.setData({
                open1: !this.open1
            });

            if (this.open1) {
                this.setData({
                    pass: this.pass1
                });
            } else {
                this.setData({
                    pass: this.pass
                });
            }
        },

        focusFun() {
            this.setData({
                focus: true
            });
        },

        blur() {
            this.setData({
                focus: false
            });
        },

        getValue(e) {
            let pass1 = JSON.stringify(e.detail.value);
            let pass = e.detail.value.replace(/./g, '*');
            this.setData({
                pass1,
                pass
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
