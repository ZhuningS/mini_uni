<template>
    <view>
        <!-- pages/subPack/customIpt/index.wxml -->
        <view class="btn" @tap.stop.prevent="showCode">弹出输入框</view>
        <view class="mask" v-if="show_input" @tap.stop.prevent="closeModal"></view>
        <view class="dialog_pop03 flex-column" v-if="show_input">
            <view class="pop03_title">请输入XXXXXXXX</view>
            <view class="popo03_tip">(这是一个提示)</view>
            <view class="flex-row pop03_input">
                <block v-for="(item, index) in 4" :key="index">
                    <view class="pop03_item"></view>
                </block>
                <!-- 输入内容 -->
                <view class="pop3_code">{{ code }}</view>
                <!-- input输入框 -->
                <input class="pop03_text" :focus="true" type="number" confirm-type="done" maxlength="4" :value="code" @input="getCodeValue" />
            </view>
            <view class="pop03_btns flex-row">
                <view @tap.stop.prevent="closeModal">取消</view>
                <view>确定</view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/subPack/customIpt/index.js
export default {
    data() {
        return {
            show_input: false,
            code: ''
        };
    },
    onShow: function () {},
    methods: {
        //
        getCodeValue(e) {
            this.setData({
                code: e.detail.value
            });
        },

        closeModal() {
            this.setData({
                show_input: false
            });
        },

        showCode() {
            this.setData({
                show_input: true
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
