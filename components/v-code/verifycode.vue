<template>
    <!-- components/verifycode/verifycode.wxml -->
    <view class="wx-verify-bg" v-if="isShow">
        <input class="key-input" :value="inputValue" type="text" :adjust-position="true" confirm-type="done" :focus="isFocus" @input="listenKeyInput" />
        <view class="wx-mask"></view>
        <view class="verify-view">
            <image :src="src" mode="aspectFill" class="icon" @tap.stop.prevent="closeView"></image>
            <text class="verify-title">{{ title }}</text>
            <text class="verify-content">{{ content }}</text>
            <view class="verify-code-view" @tap.stop.prevent="openKeyboard">
                <view :class="'verify-input-view ' + (index == 0 ? 'verify-input-view-first' : '')" v-for="(item, index) in codes" :key="item.codeKey">
                    <text class="verify-text">{{ item }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// components/verifycode/verifycode.js
export default {
    data() {
        return {
            isShow: false,
            isFocus: false,
            inputValue: '',
            src: '/static/img/close.png',
            phone: '13243898890',
            codes: ['', '', '', '', '', '']
        };
    },
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    props: {
        title: {
            type: String,
            default: '请输入邀请码'
        },
        content: {
            type: String,
            default: '已发送到手机号:'
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //展示
        showView({ phone, inputSuccess }) {
            this.inputSuccess = inputSuccess;
            var mPhone = phone.substr(0, 3) + '****' + phone.substr(7);
            this.setData({
                isShow: !this.isShow,
                phone: mPhone,
                isFocus: true,
                codes: ['', '', '', '', '', '']
            });
        },

        /**
         * 关闭组件
         */
        closeView() {
            this.setData({
                isShow: !this.isShow,
                isFocus: false
            });
        },

        /**
         * 点击输入框
         */
        openKeyboard: function () {
            this.setData({
                isFocus: true
            });
        },

        /**
         * 监听键盘输入
         */
        listenKeyInput: function (e) {
            var text = e.detail.value;
            var textLength = text.length;
            var codeArray = new Array();

            for (var i = 0; i < (textLength > 6 ? 6 : textLength); i++) {
                var code = text.substr(i, 1);
                codeArray[i] = code;
            }

            for (var i = codeArray.length; i < 6; i++) {
                codeArray.push('');
            }

            console.log(codeArray); //补齐codearray==》6个数

            this.setData({
                codes: codeArray
            });
            console.log(this.codes); //["1", "2", "3", "", "", ""]

            if (textLength > 5) {
                var returnString = text.substr(0, 6);
                this.inputSuccess(returnString);
                this.setData({
                    inputValue: ''
                }); //关闭的一瞬间 清空输入的状态
            }
        }
    }
};
</script>
<style>
@import './verifycode.css';
</style>
