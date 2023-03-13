<template>
    <view>
        <!-- pages/sendCode/index2.wxml -->
        <view class="head_top"></view>
        <image src="https://i.postimg.cc/WzKK73vQ/20210729155755.jpg" class="bg_img"></image>
        <view class="top flex-column">
            <image src="https://i.postimg.cc/Gm7KjGmN/111.jpg"></image>
            <text>~欢迎来到苏苏的码云~</text>
            <text>邀请码：HUSUSU</text>

            <view @tap.stop.prevent="showDialog" class="btn">填写邀请码</view>
        </view>

        <!-- 验证码组件 -->
        <verifycode id="verifycode" title="请输入邀请码哈" content="邀请码：HUSUSU" />

        <view class="flex-row j_b" style="margin-top: 60rpx; padding: 0 40rpx">
            <view class="st_icon s_bg0">苏苏1</view>
            <view class="st_icon s_bg0">苏苏2</view>
            <view class="st_icon s_bg0">苏苏3</view>
            <view class="st_icon1 s_bg0">苏苏4</view>
        </view>

        <view class="flex-row j_b" style="margin-top: 60rpx; padding: 0 40rpx">
            <view class="i right"></view>
            <view class="i left"></view>
            <view class="i up"></view>
            <view class="i down"></view>
        </view>
        <view class="flex-row j_b" style="margin-top: 60rpx; padding: 0 40rpx">
            <view class="box"></view>
            <view class="triangle-up"></view>
            <view class="triangle-down"></view>
            <view class="triangle-left"></view>
            <view class="triangle-right"></view>
            <view class="triangle-topleft"></view>
        </view>
        <view class="flex-row j_b" style="margin-top: 60rpx; padding: 0 40rpx">
            <view class="jux"></view>
            <view class="jux1"></view>
            <view class="jux2"></view>
            <view class="jux3"></view>
            <view class="jux4"></view>
        </view>
        <view class="flex-row j_b" style="margin-top: 60rpx; padding: 0 40rpx">
            <view class="jux5"></view>
            <view class="jux6"></view>
            <view class="jux7"></view>
            <view class="jux8"></view>
            <view class="jux9"></view>
        </view>
        <view class="flex-row j_b" style="margin-top: 60rpx; padding: 0 40rpx">
            <view class="c1"></view>
            <view class="tran"></view>
            <view class="main"></view>
        </view>

        <view class="flex-row center_btn"></view>

        <view class="trighht"></view>

        <button open-type="contact" class="c_btn">联系客服</button>
    </view>
</template>

<script>
import verifycode from '@/components/v-code/verifycode';
// pages/sendCode/index2.js
export default {
    components: {
        verifycode
    },
    data() {
        return {
            selected: 0,
            code: ''
        };
    },
    onTabItemTap(item) {
        console.log(12312312);
        uni.showToast({
            title: '苏苏来了'
        });
    },
    onLoad: function (options) {
        //选择组件对象
        this.verifycode = this.$mp.page.selectComponent('#verifycode').$vm;
        console.log('onload执行的不');
        console.log(
            `%c苏苏 `,
            ` color:red;
      font-size:25px;
 `
        );
    },
    onShow: function () {
        console.log('onShow执行的不'); //自定义的tabbar

        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 3
            });
        }
    },
    methods: {
        showDialog() {
            //弹出组件,此处必须把this重新赋予变量不然callback内部会提示找不到this
            var _this = this;

            _this.verifycode.showView({
                phone: '15200000000',
                inputSuccess: function (phoneCode) {
                    //调用组件关闭方法
                    _this.verifycode.closeView(); //设置数据

                    _this.setData({
                        code: phoneCode //验证码
                    });
                }
            });
        }
    }
};
</script>
<style>
@import './index2.css';
</style>
