<template>
    <view>
        <!-- pages/sendCode2/index.wxml -->
        <view class="con">
            <view class="title">
                请输入
                <text>{{ phone }}</text>
                收到的短信验证码
            </view>

            <view class="code_box">
                <view class="content">
                    <block v-for="(item, index) in Length" :key="index">
                        <input class="iptbox" :value="Value.length >= index + 1 ? Value[index] : ''" disabled :password="ispassword" @tap.stop.prevent="Tap" />
                    </block>
                </view>

                <input name="password" :password="ispassword" class="ipt" :maxlength="Length" :focus="isFocus" :value="Value" @input="getVaule" />
                <view :class="'btn ' + (isCan ? '' : 'no-btn')" @tap="submit">确定</view>
            </view>
        </view>

        <view class="copy">
            <view>复制粘贴</view>
            <view class="code" @tap="copy">{{ copyCode }}</view>
            <!-- <text user-select='true' bindlongtap='copy'>这是一段可以复制的文本</text> -->
        </view>

        <!-- <input placeholder="请输入" adjust-position="true"/> -->
    </view>
</template>

<script>
// pages/sendCode2/index.js
export default {
    data() {
        return {
            phone: '132****6678',
            Length: 6,
            //输入框个数
            isFocus: true,
            //聚焦
            Value: '',
            //输入的内容
            ispassword: true,
            //是否密文显示 true为密文， false为明文。
            isCan: false,
            //是否可以提交
            copyCode: '234238',
            currentIndex: 0
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
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
        getVaule(e) {
            var value = e.detail.value;
            this.setData({
                Value: value,
                isCan: value.length === 6
            });
        },

        Tap() {
            this.setData({
                isFocus: true
            });
        },

        /**
         * 长按复制
         */
        copy: function (e) {
            uni.setClipboardData({
                data: this.copyCode,
                success: function (res) {
                    uni.getClipboardData({
                        success: function (res) {
                            // wx.showToast({
                            //   title: '复制成功'
                            // })
                        }
                    });
                }
            });
        },

        submit() {
            console.log('占位：函数 submit 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
