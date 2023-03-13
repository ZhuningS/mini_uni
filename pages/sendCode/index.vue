<template>
    <view>
        <!-- pages/sendCode/index.wxml -->
        <view class="con">
            <view class="title">
                请输入
                <text>{{ phone }}</text>
                收到的短信验证码
            </view>
            <view class="code">
                <input type="number" placeholder="" :value="code" @input="intFun" maxlength="6" @focus="getFocus" @blur="getBlur" :focus="true" confirm-type="done" />
                <view class="code_show">
                    {{ code }}
                    <view class="code_line01"></view>
                    <view class="code_line02"></view>
                </view>
                <view class="placeHolder" v-if="isShow">请输入6位验证码</view>
            </view>
            <view :class="'get_text ' + (isClick ? 'countdown' : '')" @tap="sendCode">{{ CodeText }}</view>
        </view>

        <view :class="'btn ' + (isCan ? '' : 'no-btn')" @tap="submit">确定</view>

        <view class="input_2">
            <view class="input">{{ code }}</view>
            <view class="flex-row i1">
                <view class="line" v-for="(item, index) in 6" :key="index"></view>
            </view>
        </view>

        <view class="last_tip" @tap.stop.prevent="tocode2">下一个样式</view>
    </view>
</template>

<script>
// pages/sendCode/index.js
export default {
    data() {
        return {
            phone: '13287653342',
            //手机号
            isCan: false,
            //是否可以提交
            code: '',
            //验证码
            isShow: true,
            //是否显示input框的提示文字
            count: 60,
            //倒计时
            num: 60,
            //常量，倒计时秒数，通常定义为60秒
            CodeText: '获取验证码',
            //在‘获取验证码’和‘重新获取验证码’之间切换
            isClick: false //是否点击了（重新）获取验证码
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var mPhone = this.phone.substr(0, 3) + '****' + this.phone.substr(7);
        this.setData({
            phone: mPhone
        });
    },
    methods: {
        //倒计时
        countDown() {
            let count = this.count;
            let timer = setInterval(() => {
                if (--count >= 0) {
                    this.setData({
                        count,
                        isClick: true,
                        CodeText: '（' + count + 's）重新获取'
                    });

                    if (this.count == 0) {
                        clearInterval(timer);
                        this.setData({
                            count: this.num,
                            isClick: false,
                            CodeText: '重新获取验证码'
                        });
                    }
                }
            }, 1000);
        },

        //获取验证码
        intFun: function (e) {
            let val = e.detail.value;
            let isShow = this.isShow;
            if (val.length == 0) {
                isShow = true;
            } else {
                isShow = false;
            }

            this.setData({
                code: val,
                isCan: val.length === 6,
                isShow
            });
        },

        //输入框聚焦时触发
        getFocus() {
            this.setData({
                isShow: false
            });
        },

        //输入框失去焦点时触发
        getBlur() {
            let isShow = this.isShow;

            if (this.code.length == 0) {
                isShow = true;
            } else {
                isShow = false;
            }

            this.setData({
                isShow
            });
        },

        submit: function () {
            let code = this.code;

            if (code.length < 6) {
                uni.showToast({
                    title: '请输入验证码',
                    icon: 'none'
                });
                return;
            } else {
                //进行操作
            }
        },

        //发送验证码
        sendCode() {
            if (!this.isClick) {
                this.setData({
                    count: this.num,
                    isClick: true,
                    CodeText: '（' + this.num + 's）重新获取'
                });
                this.countDown(); //倒计时
            }
        },

        tocode2() {
            uni.navigateTo({
                url: '/pages/sendCode2/index'
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
